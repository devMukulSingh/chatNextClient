import React from 'react'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import ChatFooter from './ChatFooter'

const ChatSection = () => {
  return (
    <main className='w-full h-full flex flex-col'>
      <ChatHeader/>
      <ChatMessages/>
      <ChatFooter/>
    </main>
  )
}

export default ChatSection