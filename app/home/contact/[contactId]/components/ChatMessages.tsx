import { IContacts, IMessage } from "@/lib/types";
import SingleMessage from "./SingleMessage";
import { useEffect, useRef, useState } from "react";
import { getMessages } from "@/redux/reducers/getMessages";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import EmptyMessage from "../../../components/EmptyMessage";
import { Socket } from "socket.io-client";
import { setMessages, setSocketMessage } from "@/redux/chatSlice";
import FileMessage from "./FileMessage";
import axios from "axios";
import useSWR, { SWRConfig } from "swr";
import { BASE_URL_SERVER } from "@/lib/BASE_URL";
interface ChatMessagesProps {
  receiverUser: IContacts | null;
  socket: {
    current: Socket | null;
  };
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  receiverUser,
  socket,
}) => {
  const dispatch = useAppDispatch();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const messages = useAppSelector((state) => state.chatSlice.messages);
  const mainComponent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const componentHeight = mainComponent.current?.scrollHeight;
    mainComponent.current?.scrollTo(0, componentHeight || 0);
  }, [receiverUser, messages]);

  useEffect(() => {
    if(receiverUser){
      dispatch(
        getMessages({
          senderId: currentUser.id,
          receiverId: receiverUser?.id,
        }),
        );
      }
  }, [receiverUser]);
  return (
    <main
      className="flex flex-col gap-2 py-5 px-20 overflow-auto"
      ref={mainComponent}
    >
      {messages?.length === 0 ? (
        <EmptyMessage />
      ) : (
        messages?.map((message: IMessage) => {
          if (message.type === "file")
            return <FileMessage key={message.id} message={message} />;
          return <SingleMessage message={message} key={message.id} />;
        })
      )}
    </main>
  );
};

export default ChatMessages;
