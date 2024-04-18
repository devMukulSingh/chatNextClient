"use client";
import { IContacts } from "@/lib/types";
import { setReceiverUser } from "@/redux/chatSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SingleContactProps {
  contact: IContacts;
}

const SingleContact: React.FC<SingleContactProps> = ({ contact }) => {
  const receiverProfileImg = contact?.profileImage || "/blankProfilePic.png";
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.chatSlice.receiverUser);

  const handleClick = () => {
    router.push(`/home/contact/${contact.id}`);
    dispatch(setReceiverUser(contact));
  };
  return (
    <main
      onClick={handleClick}
      className={`
      ${selected?.id === contact.id ? "bg-slate-700 shadow-none rounded-none" : ""} 
        w-full 
        flex
         hover:bg-slate-700 
         hover:shadow-none 
         rounded-lg 
         hover:rounded-none
         gap-5 
         px-5 
         py-5 
         cursor-pointer 
         shadow-slate-700 
         shadow-md
         `}
    >
      <figure className="relative size-10">
        <Image
          src={receiverProfileImg}
          alt="profileimage"
          fill
          className="rounded-full"
        />
      </figure>
      <section>
        <h1 className="text-lg">{contact.name}</h1>
        <h1 className="text-sm text-neutral-400">hey,hello how r you</h1>
      </section>
      <p className="ml-auto text-sm text-neutral-400">12:23</p>
      <p></p>
    </main>
  );
};

export default SingleContact;
