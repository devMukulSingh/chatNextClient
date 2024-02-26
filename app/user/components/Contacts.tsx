import { getContacts } from "@/actions/getContacts"
import SingleContact from "./SingleContact"
import { IContacts } from "@/lib/types";

const Contacts = async() => {

  const contacts:IContacts[] = await getContacts();
  
  return (
    <main className='overflow-auto rounded-md flex flex-col min-w-[25rem] h-full'>
        {
          contacts?.map( (contact) => (
            <SingleContact contact={contact} key={contact.id}/>
          ))
        }

    </main>
  )
}

export default Contacts