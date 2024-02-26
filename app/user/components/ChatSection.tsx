"use client"
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import ChatFooter from './ChatFooter'
import { useAppSelector } from '@/redux/hooks'
import EmptyChat from './EmptyChat'

const ChatSection = () => {

  const receiverUser = useAppSelector(state => state.chatSlice.receiverUser);

  return (
    <>
      {
        receiverUser && Object.keys(receiverUser).length > 0 ?
          <main className='w-full h-full flex flex-col'>
            <ChatHeader receiverUser={receiverUser} />
            <ChatMessages receiverUser={receiverUser} />
            <ChatFooter receiverUser={receiverUser} />
          </main>
          :
          <EmptyChat />
      }
    </>
  )
}

export default ChatSection