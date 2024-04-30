"use client";
import { IContacts, IMessage } from "@/lib/types";
import SingleMessage from "./SingleMessage";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import EmptyMessage from "../../../components/EmptyMessage";
import { Socket } from "socket.io-client";
import FileMessage from "./FileMessage";
import axios from "axios";
import { BASE_URL_SERVER } from "@/lib/BASE_URL";
import { currentUser } from "@/lib/currentUser";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  // const messages = useAppSelector((state) => state.chatSlice.messages);
  const mainComponent = useRef<HTMLDivElement>(null);
  // console.log(socket.current);

  const {
    data: messages,
    isLoading,
    error,
    isError,
  } = useQuery({
    // retry:false,
    queryKey: ["chatMessages", receiverUser?.id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${BASE_URL_SERVER}/api/message/get-messages`,
        {
          params: {
            senderId: currentUser.id,
            receiverId: receiverUser?.id,
          },
          headers:{
            Authorization:currentUser.token
          }
        },
      );
      return data;
    },
    refetchOnWindowFocus: false,
    initialData: () => {
      return queryClient.getQueryData(["chatMessages"]);
    },
    refetchOnMount: true,
    staleTime: Infinity,
  });
  useEffect(() => {
    const componentHeight = mainComponent.current?.scrollHeight;
    mainComponent.current?.scrollTo(0, componentHeight || 0);
  }, [receiverUser, messages]);
  if (isError) console.log(error);

  // useEffect(() => {
  //   if (receiverUser) {
  //     dispatch(
  //       getMessages({
  //         senderId: currentUser.id,
  //         receiverId: receiverUser?.id,
  //       }),
  //     );
  //   }
  // }, [receiverUser]);
  return (
    <main
      className="flex flex-col gap-2 py-5 px-20 overflow-auto h-full  "
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
