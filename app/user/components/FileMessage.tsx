import { IMessage } from "@/lib/types"
import { RiArrowDropDownLine } from "react-icons/ri"
import { format } from "date-fns"
import axios from "axios"
import { BASE_URL_SERVER } from "@/lib/BASE_URL"
import Dropdown from "@/components/Dropdown"
import { useEffect, useState } from "react"
import Modal from "@/components/Modal"
import { useRouter } from "next/navigation"
import { currentUser } from "@/lib/currentUser"
import Image from "next/image"
import ImageModal from "@/components/ImageModal"

interface FileMessageProps {
  message: IMessage,
}

export interface IdropdownOptions {
  title: string,
  onClick: () => void,
}

const FileMessage: React.FC<FileMessageProps> = ({
  message
}) => {

  const router = useRouter();
  const [messageType, setMessageType] = useState("sent");
  const [loading, setLoading] = useState(false);
  const [editMessage, setEditMessage] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openImage, setOpenImage] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL_SERVER}/api/message/delete-message`, {
        params: { messageId: message.id }
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
  const handleDownload = async () => {
    try {
      await axios.get(`${BASE_URL_SERVER}/api/message/download-file/${message.id}`)
    }
    catch (e) {
      console.log(`Error in handleDownload ${e}`);
    }
  }
  const dropdownOptions: IdropdownOptions[] = [
    {
      title: "Delete",
      onClick: handleDelete
    },
    {
      title: 'download',
      onClick: handleDownload
    }

  ]
  useEffect(() => {
    if (currentUser.id !== message.senderId) {
      setMessageType('received');
    }
  }, []);

  const handleImageClick = () => {
    setOpenImage(true);
  }
  const handleMenu = () => {
    setOpenDropdown(prev => !prev)
  }
  //changing imageUrl, if the image is coming through socket server then message.message else if coming from server then ->
  const imageUrl = message.message ? message.message : `${BASE_URL_SERVER}/api/message/get-file/${message.id}`;

  ////////////////////////////////////////////////////////////////////////////////////
  return (
    <>

      <main
        className={`
        relative
        bg-slate-700
        px-2
        py-1
        rounded-md
        w-fit
        max-w-[50%] 
        gap-8 
        transition 
        ease-in-out
        ${messageType === 'received' && 'ml-auto'}   
        `}>
        <figure
          onClick={handleImageClick}
          id="message"
          className="relative self-center size-60 cursor-pointer">
          <Image fill src={imageUrl} alt="sendImage" className="object-contain" />
        </figure>
        <section className="flex items-center">
          <h1 className="text-[12px] whitespace-nowrap text-neutral-400">
            {format(message.createdAt, "hh mm")}
          </h1>
          <RiArrowDropDownLine
            id="dropdownButton"
            className="text-2xl ml-auto cursor-pointer mt-auto"
            onClick={handleMenu}
          />
          {
            openDropdown
            &&
            <Dropdown
              options={dropdownOptions}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            />
          }
        </section>
      </main>
      {
        openDialog &&
        <Modal
          value={editMessage}
          setValue={setEditMessage}
          title="Edit message"
          setOpenDialog={setOpenDialog}
          loading={loading}
        />
      }
      {
        openImage &&
        <ImageModal
          setOpenImage={setOpenImage}
          imageUrl={imageUrl}
          imageId={message.id}
        />
      }

    </>
  )
}

export default FileMessage