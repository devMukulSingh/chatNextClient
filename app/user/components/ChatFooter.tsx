"use client";
import Button from "@/components/Button";
import { BASE_URL_SERVER } from "@/lib/BASE_URL";
import { IContacts } from "@/lib/types";
import { setSocketMessage } from "@/redux/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import axios from "axios";
import React, { useRef, useState } from "react";
import { BiPlus, BiSend } from "react-icons/bi";
import { Socket, io } from "socket.io-client";

interface ChatFooterProps {
  receiverUser: IContacts | null;
  socket: {
    current: Socket | null;
  };
}

const ChatFooter: React.FC<ChatFooterProps> = ({ receiverUser, socket }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const dispatch = useAppDispatch();
  const sender: IContacts = JSON.parse(
    localStorage.getItem("currentUser") || "{}",
  );

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleMessageSend();
    }
  };

  const handleMessageSend = async () => {
    dispatch(
      setSocketMessage({
        message,
        receiverId: receiverUser?.id,
        senderId: sender.id,
        createdAt: Date.now(),
      }),
    );
    if (message.length !== 0) {
      socket.current?.emit("send-msg", {
        message,
        receiverId: receiverUser?.id,
        senderId: sender.id,
        createdAt: Date.now(),
      });

      try {
        const res = await axios.post(
          `${BASE_URL_SERVER}/api/message/post-message`,
          {
            receiverId: receiverUser?.id,
            senderId: sender.id,
            message,
          },
        );
        setMessage("");
      } catch (e) {
        console.log(`Error in handleMessageSend ${e}`);
      }
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files?.[0]);

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }

    const { data: res } = await axios.post(
      `${BASE_URL_SERVER}/api/message/upload-file`,
      formData,
      {
        params: {
          senderId: sender.id,
          receiverId: receiverUser?.id,
          type: "file",
        },
      },
    );
    console.log(res);
    dispatch(
      setSocketMessage({
        type: "file",
        senderId: sender.id,
        receiverId: receiverUser?.id,
        message: res.path,
        createdAt: Date.now(),
      }),
    );

    socket.current?.emit("send-msg", {
      type: "file",
      message: res.path,
      receiverId: receiverUser?.id,
      senderId: sender.id,
      createdAt: Date.now(),
    });
  };
  /////////////////////////////////////////////////////////////////////
  return (
    <main className="flex gap-5 mt-auto items-center  bg-slate-800 h-20 px-10 py-5">
      <Button className="w-fit" onClick={() => inputRef.current?.click()}>
        <BiPlus className="cursor-pointer text-3xl" />
      </Button>
      <input
        name="file"
        type="file"
        ref={inputRef}
        onChange={(e) => handleFileUpload(e)}
        className="hidden"
      />
      <input
        value={message}
        onKeyUp={(e) => onKeyUp(e)}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        className="bg-slate-700 outline-none rounded-md w-full h-full px-5"
      />

      <BiSend className="cursor-pointer text-2xl" onClick={handleMessageSend} />
    </main>
  );
};

export default ChatFooter;
