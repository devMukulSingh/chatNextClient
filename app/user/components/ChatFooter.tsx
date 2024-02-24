'use client'
import React from 'react'
import { BiPlus, BiSend } from 'react-icons/bi'

const ChatFooter = () => {
  const handleMessageSend = () => {

  }
  return (
    <main className='flex gap-5 mt-auto items-center  bg-slate-800 h-20 px-10 py-5'>
      <BiPlus className='cursor-pointer text-5xl'/>
      <input 
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