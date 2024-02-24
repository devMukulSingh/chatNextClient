import Image from "next/image";
import SearchBar from "./commons/SearchBar";
import { BiMenu } from "react-icons/bi";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";

const ChatHeader = () => {
  const image ='https://lh3.googleusercontent.com/a/ACg8ocKpWZffOwLfdPRCRKfFYdW36Fnda6Zo_jKH3AOYWvf3FA=s360-c-no'
  return (
    <main className='flex justify-between gap-5 bg-slate-800 items-center w-full p-5 h-20'>
      <figure className='relative size-10'>
      <Image 
        src={image}
        alt="profileImage" 
        fill
        className="rounded-full"
        />
      </figure>
        <SearchBar placeholder="Search messages"/>
        <BsThreeDotsVertical size={20}/>
    </main>
  )
}

export default ChatHeader