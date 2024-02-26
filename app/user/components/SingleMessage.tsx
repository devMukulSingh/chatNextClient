import { IMessage } from "@/lib/types"
import { RiArrowDropDownLine } from "react-icons/ri"
import { format } from "date-fns"
import axios from "axios"
import { BASE_URL_SERVER } from "@/lib/BASE_URL"
import Dropdown from "@/components/Dropdown"
import {  useState } from "react"
import Modal from "@/components/Modal"
import { useRouter } from "next/navigation"

interface SingleMessageProps {
  message: IMessage,
}

export interface IdropdownOptions {
  title: string,
  onClick: () => void,
}

const SingleMessage: React.FC<SingleMessageProps> = ({
  message
}) => {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [editMessage, setEditMessage] = useState("");

  const [openDropdown, setOpenDropdown] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.message);
    setOpenDropdown(false);
  }

  const handleOpenDialog = () => {
    setOpenDialog(true);
  }
  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL_SERVER}/api/message/delete-message`, {
        params:{ messageId: message.id}
      })
      setOpenDropdown(false);
      router.refresh();
    }
    catch (e) {
      console.log(`Error in handleDelete ${e}`);
    }
    finally {
      setLoading(false);
    }
  }
  const dropdownOptions: IdropdownOptions[] = [
    {
      title: "Copy",
      onClick: handleCopy
    },
    {
      title: "Edit",
      onClick: handleOpenDialog
    },
    {
      title: "Delete",
      onClick: handleDelete
    }

  ]
  const handleEdit = async () => {
    try {
      await axios.patch(`${BASE_URL_SERVER}/api/message/edit-message`, {
        data:{
          message: editMessage,
          id: message.id
        }
      })
    }
    catch (e) {
      console.log(`Error in handleEdit ${e}`);
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      {
        openDialog &&
        <Modal
          onConform={handleEdit}
          value={editMessage}
          setValue={setEditMessage}
          title="Edit message"
          setOpenDialog={setOpenDialog}
          loading={loading}
        />
      }
      <main
        className="bg-slate-700 flex px-2 h-10 rounded-md w-fit max-w-1/2 gap-8 transition ease-in-out">
        <h1 className="self-center">{message?.message}</h1>
        <section className=" ml-auto">
          <h1 className="text-[12px] break-all line-clamp-3 text-neutral-400 ml-auto mt-auto">
            {message && format(message?.createdAt, "hh mm")}
          </h1>
          <RiArrowDropDownLine
            id="dropdownButton"
            className="text-xl ml-auto cursor-pointer"
            onClick={() => setOpenDropdown(prev => !prev)}
          />
          {openDropdown && <Dropdown options={dropdownOptions} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />}
        </section>
      </main>



    </>
  )
}

export default SingleMessage