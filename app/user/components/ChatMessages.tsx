import { IContacts, IMessage } from '@/lib/types'
import SingleMessage from './SingleMessage'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL_SERVER } from '@/lib/BASE_URL'

interface ChatMessagesProps {
  receiverUser: IContacts | null
}
const ChatMessages:React.FC<ChatMessagesProps> = ({
  receiverUser
}) => {

  const [messages, setMessages] = useState<IMessage[]>([]);

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  useEffect( () => {

   const getMessages = async() => {
    
      try{

          const { data } =  await axios.get(`${BASE_URL_SERVER}/api/message/get-messages`,{
              params:{
                  senderId:currentUser.id,
                  receiverId:receiverUser?.id
              }
          });
          setMessages(data);
      }
      catch(e){
          console.log(`Error in getMessages ${e}`);
          
      }
  }
  getMessages();
  },[receiverUser])

  
  return (
    <main className='flex flex-col gap-2 p-5'>
      {
        messages.map( (message:IMessage) => (
          <SingleMessage message={message} key={message.id}/>
          ))
      }
    </main>
  )
}

export default ChatMessages