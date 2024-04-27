"use client";
import { BsX } from "react-icons/bs";
import Portal from "@/lib/HOC/Portal";
import Image from "next/image";
import { useState } from "react";
import Dropdown from "./Dropdown";
import { BASE_URL_SERVER } from "@/lib/BASE_URL";
import { LuDownload } from "react-icons/lu";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ImageModal {
  setOpenImage: (arg0: boolean) => void;
  imageUrl: string;
  imageId: string;
}

const ImageModal: React.FC<ImageModal> = ({
  setOpenImage,
  imageUrl,
  imageId,
}) => {
  const handleDownload = () => {
    try {
      const link = document.createElement("a");
      link.href = `${BASE_URL_SERVER}/api/message/download-file/${imageId}`;
      link.click();
    } catch (e) {
      console.log(`Error in handleDownload ${e}`);
    }
  };
  const dropdownOptions = [
    {
      title: "Download",
      onClick: handleDownload,
    },
  ];
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <>
      <Portal>
        <main
          id="image-modal"
          className="z-50 bg-slate-950 justify-center bg-opacity-50 flex flex-col fixed items-center w-screen h-screen"
        >
          <section className="ml-auto flex gap-5 items-center">
            {/* <Link
              href={`${BASE_URL_SERVER}/api/message/download-file/${imageId}`} > */}
              <LuDownload className="cursor-pointer text-3xl text-white hover:bg-slate-700 rounded-md" />
            {/* </Link> */}
            <BsX
              onClick={() => setOpenImage(false)}
              className="text-6xl cursor-pointer  text-white"
            />
          </section>
          <figure id="inner-modal" className="relative size-3/4">
            <Image
              src={imageUrl}
              fill
              alt="imageMessage"
              className="object-contain"
            />
          </figure>
        </main>
      </Portal>
      {openDropdown && (
        <Dropdown
          options={dropdownOptions}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
        />
      )}
    </>
  );
};

export default ImageModal;
