'use client'
import { BASE_URL_SERVER } from '@/lib/BASE_URL'
import { IContacts } from '@/lib/types'
import axios from 'axios'
import React, { useState } from 'react'
import { BiPlus, BiSend } from 'react-icons/bi'

interface ChatFooterProps{
  receiverUser:IContacts | null
}

const ChatFooter:React.FC<ChatFooterProps> = ({
  receiverUser
}) => {

  const sender:IContacts = JSON.parse(localStorage.getItem('currentUser') || '{}')
  
  const [message, setMessage] = useState("");

  const onKeyUp = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key==='Enter'){
      handleMessageSend();
    }
  }
  const handleMessageSend = async() => {
    try{
      const res = await axios.post(`${BASE_URL_SERVER}/api/message/post-message`,{
        receiverId : receiverUser?.id,
        senderId : sender.id,
        message,
      });
      setMessage("");
    }
    catch(e){
      console.log(`Error in handleMessageSend ${e}`);
    }
  }
  return (
    <main className='flex gap-5 mt-auto items-center  bg-slate-800 h-20 px-10 py-5'>
      <BiPlus className='cursor-pointer text-5xl'/>
      <input 
      value={message}
      onKeyUp={ (e) => onKeyUp(e) }
      onChange={ (e) => setMessage(e.target.value)}
      placeholder='Type a message'
      className='bg-slate-700 outline-none rounded-md w-full h-full px-5'
      />
      <BiSend 
      className='cursor-pointer text-2xl'
      onClick={ handleMessageSend }
      />
    </main>
  )
}

export default ChatFooter