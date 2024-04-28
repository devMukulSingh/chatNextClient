"use client";
import Button from "@/components/Button";
import { BASE_URL_SERVER } from "@/lib/BASE_URL";
import { currentUser } from "@/lib/currentUser";
import { IContacts, IMessage } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import axios from "axios";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { BiPlus, BiSend } from "react-icons/bi";
import { Socket, io } from "socket.io-client";
import useSWRMutation from "swr/mutation";
import {useQueryClient,  } from "@tanstack/react-query";

interface ChatFooterProps {
  receiverUser: IContacts | null;
  socket: {
    current: Socket | null;
  };
}
interface Iarg {
  formData: FormData;
  params: {
    senderId: string | undefined;
    receiverId: string | undefined;
    type: string;
  };
}

async function sendRequest(
  url: string,
  {
    arg,
  }: {
    arg: Iarg;
  },
) {
  return await axios.post(url, arg.formData, {
    params: arg.params,
  });
}
const ChatFooter: React.FC<ChatFooterProps> = ({ receiverUser, socket }) => {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  const {
    data: res,
    isMutating,
    trigger,
    error,
  } = useSWRMutation(`${BASE_URL_SERVER}/api/message/upload-file`, sendRequest);

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleMessageSend();
    }
  };

  const handleMessageSend = async () => {
    const currentMessage = message;
    setMessage("");
    const previousMessages: IMessage[] | undefined = queryClient.getQueryData([
      "chatMessages",
      receiverUser?.id,
    ]);

    if (currentMessage !== "") {
      if (previousMessages) {
        queryClient.setQueryData(
          ["chatMessages", receiverUser?.id],
          [
            ...previousMessages,
            {
              message: currentMessage,
              receiverId: receiverUser?.id,
              senderId: currentUser.id,
              createdAt: Date.now(),
              updatedAt: Date.now(),
              type: "text",
            },
          ],
        );
      }

      if (message !== "") {
        socket.current?.emit("send-msg", {
          message: currentMessage,
          receiverId: receiverUser?.id,
          senderId: currentUser.id,
          createdAt: Date.now(),
        });

        try {
          const res = await axios.post(
            `${BASE_URL_SERVER}/api/message/post-message`,
            {
              receiverId: receiverUser?.id,
              senderId: currentUser.id,
              message: currentMessage,
            },
          );
        } catch (e) {
          console.log(`Error in handleMessageSend ${e}`);
        }
      }
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let formData: FormData;
    if (e.target.files) {
      if (e.target.files[0].size > 5000000) {
        toast.error("Maximum 5 Mb file size allowed");
        return;
      }
      if (!e.target.files[0].type.includes("image")) {
        toast.error("Only images allowed");
        return;
      }
      formData = new FormData();
      formData.append("file", e.target?.files?.[0]);
      const params = {
        senderId: currentUser.id,
        receiverId: receiverUser?.id,
        type: "file",
      };
      const { data } = await trigger({ formData, params });
      
      const previousMessages: IMessage[] | undefined = queryClient.getQueryData(
        ["chatMessages", receiverUser?.id],
      );
      if (previousMessages) {
        queryClient.setQueryData(
          ["chatMessages", receiverUser?.id],
          [
            ...previousMessages,
            {
              message: data,
              receiverId: receiverUser?.id,
              senderId: currentUser.id,
              createdAt: Date.now(),
              updatedAt: Date.now(),
              type: "file",
            },
          ]
        );
      }
      socket.current?.emit("send-msg", {
        type: "file",
        message: data,
        receiverId: receiverUser?.id,
        senderId: currentUser.id,
        createdAt: Date.now(),
      });
    }
  };
  if (error) {
    console.error(error);
    console.log(`Error in handleFile Upload`);
  }

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

// const { data: res } = await axios.post(
//   `${BASE_URL_SERVER}/api/message/upload-file`,
//   formData,
//   {
//     params: {
//       senderId: currentUser.id,
//       receiverId: receiverUser?.id,
//       type: "file",
//     },
//   }
// );
