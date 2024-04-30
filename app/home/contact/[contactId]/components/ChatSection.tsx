"use client";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatFooter from "./ChatFooter";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import EmptyChat from "../../components/EmptyChat";
import { BASE_URL_SERVER } from "@/lib/BASE_URL";
import { Socket, io } from "socket.io-client";
import { useCallback, useEffect, useRef } from "react";
import { currentUser } from "@/lib/currentUser";
import { setSocket, setSocketMessage } from "@/redux/chatSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IMessage } from "@/lib/types";

const ChatSection = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const receiverUser = useAppSelector((state) => state.chatSlice.receiverUser);
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io(BASE_URL_SERVER);
    socket.current.emit("add-user", currentUser.id);
    return () => {
      socket.current?.off("add-user");
    };
  }, []);

  useEffect(() => {
    socket.current?.on("receive-msg", (message) => {
      const prevMessages: IMessage[] | undefined = queryClient.getQueryData([
        "chatMessages",
        receiverUser?.id,
      ]);
      if (prevMessages)
        queryClient.setQueryData(
          ["chatMessages", receiverUser?.id],
          [...prevMessages, message],
        );
    });

    return () => {
      socket.current?.off("receive-msg");
    };
  }, [socket.current]);

  return (
    <>
      <div className="w-full h-screen flex flex-col">
        <ChatHeader receiverUser={receiverUser} />
        <ChatMessages receiverUser={receiverUser} socket={socket} />
        <ChatFooter receiverUser={receiverUser} socket={socket} />
      </div>
    </>
  );
};

export default ChatSection;
