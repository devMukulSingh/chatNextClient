"use client";
import Image from "next/image";
import SearchBar from "./commons/SearchBar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IContacts } from "@/lib/types";

interface ChatHeaderProps {
  receiverUser: IContacts | null;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ receiverUser }) => {
  const image =
    "https://lh3.googleusercontent.com/a/ACg8ocKpWZffOwLfdPRCRKfFYdW36Fnda6Zo_jKH3AOYWvf3FA=s360-c-no";
  return (
    <main className="flex justify-between gap-5 bg-slate-800 items-center w-full p-5 h-20">
      <section className="flex gap-2 items-center">
        <figure className="relative size-10">
          <Image src={image} alt="profileImage" fill className="rounded-full" />
        </figure>
        <h1 className="whitespace-nowrap">{receiverUser?.name}</h1>
      </section>
      <SearchBar placeholder="Search messages" />
      <BsThreeDotsVertical size={20} />
    </main>
  );
};

export default ChatHeader;
