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

const ChatSection = () => {
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
      dispatch(setSocketMessage(message));
    });

    return () => {
      socket.current?.off("receive-msg");
    };
  }, [socket.current]);

  return (
    <>
      <main className="w-full h-screen flex flex-col">
        <ChatHeader receiverUser={receiverUser} />
        <ChatMessages receiverUser={receiverUser} socket={socket} />
        <ChatFooter receiverUser={receiverUser} socket={socket} />
      </main>
    </>
  );
};

export default ChatSection;
