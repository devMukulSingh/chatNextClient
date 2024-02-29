import { IContacts, IMessage } from '@/lib/types'
import SingleMessage from './SingleMessage'
import { useEffect, useRef, useState } from 'react'
import { getMessages } from '@/redux/reducers/getMessages'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import EmptyMessage from './commons/EmptyMessage'
import { Socket } from 'socket.io-client'
import { setSocketMessage } from '@/redux/chatSlice'
import FileMessage from './FileMessage'

interface ChatMessagesProps {
  receiverUser: IContacts | null,
  socket: {
    current: Socket | null
  }
}
const ChatMessages: React.FC<ChatMessagesProps> = ({
  receiverUser,
  socket
}) => {

  const dispatch = useAppDispatch();
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const messages = useAppSelector(state => state.chatSlice.messages);
  
  const mainComponent = useRef<HTMLDivElement>(null);
  
 

  useEffect(() => {

    const componentHeight = mainComponent.current?.scrollHeight;
    mainComponent.current?.scrollTo(0,componentHeight||0);
  }, [receiverUser,messages])

  useEffect(() => {
    dispatch(getMessages({
      senderId: currentUser.id,
      receiverId: receiverUser?.id
    }))
  }, [receiverUser]);



  return (
    <main className='flex flex-col gap-2 p-5 overflow-auto' ref={mainComponent}>
      {
        messages?.length === 0 ?
          <EmptyMessage />
          :
          messages?.map((message) => {
            if(message.type==='file') return <FileMessage message={message}/>
            return(
              <SingleMessage message={message} key={message.id} />
              )
            })
      }
    </main>
  )
}

export default ChatMessages