import { IMessage } from "@/lib/types";
import { RiArrowDropDownLine } from "react-icons/ri";
import { format } from "date-fns";
import axios from "axios";
import { BASE_URL_SERVER } from "@/lib/BASE_URL";
import Dropdown from "@/components/Dropdown";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import { currentUser } from "@/lib/currentUser";
import Image from "next/image";
import ImageModal from "@/components/ImageModal";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import { downloadFile } from "@/lib/useDownload";

interface FileMessageProps {
  message: IMessage;
}
export interface IdropdownOptions {
  title: string;
  onClick: () => void;
}

const FileMessage: React.FC<FileMessageProps> = ({ message }) => {
  const router = useRouter();
  const [messageStatus, setMessageStatus] = useState("sent");
  const [editMessage, setEditMessage] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openImage, setOpenImage] = useState(false);

  async function sendRequest(url: string) {
    return axios.delete(url, {
      params: { messageId: message.id },
      headers: {
        Authorization: currentUser.token,
      },
    });
  }

  const { data, error, isMutating, trigger } = useSWRMutation(
    `${BASE_URL_SERVER}/api/message/delete-message`,
    sendRequest,
  );
  const handleDelete = async () => {
    trigger();
    setOpenDropdown(false);
    router.refresh();
  };

  const dropdownOptions: IdropdownOptions[] = [
    {
      title: "Delete",
      onClick: handleDelete,
    },
    {
      title: "download",
      onClick: () => downloadFile(imageUrl),
    },
  ];
  useEffect(() => {
    if (currentUser.id !== message.senderId) {
      setMessageStatus("received");
    }
  }, []);

  const handleImageClick = () => {
    setOpenImage(true);
  };
  const handleMenu = () => {
    setOpenDropdown((prev) => !prev);
  };
  const imageUrl = message.message;
  if (error) {
    console.log(error);
    console.log(`Error in delete file message ${error} `);
  }
  ////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <div
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
        ${messageStatus === "received" && "ml-auto"}   
        `}
      >
        <figure
          onClick={handleImageClick}
          id="message"
          className="relative 
          self-center  
          cursor-pointer
          w-[15rem]
          h-[15rem]
          "
        >
          <Image
            fill
            src={imageUrl}
            alt="sendImage"
            className="object-contain"
            quality={50}
          />
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
          {openDropdown && (
            <Dropdown
              options={dropdownOptions}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              messageStatus={messageStatus}
              messageType={message.type}
            />
          )}
        </section>
      </div>
      {openDialog && (
        <Modal
          value={editMessage}
          setValue={setEditMessage}
          title="Edit message"
          setOpenDialog={setOpenDialog}
          loading={isMutating}
        />
      )}
      {openImage && (
        <ImageModal
          setOpenImage={setOpenImage}
          imageUrl={imageUrl}
          imageId={message.id}
        />
      )}
    </>
  );
};

export default FileMessage;
