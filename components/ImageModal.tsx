"use client";
import { BsX } from "react-icons/bs";
import Portal from "@/lib/HOC/Portal";
import Image from "next/image";
import { useState } from "react";
import Dropdown from "./Dropdown";
import { LuDownload } from "react-icons/lu";
import { downloadFile } from "@/lib/useDownload";

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

  const dropdownOptions = [
    {
      title: "Download",
      onClick: () => downloadFile(imageUrl)
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
            <LuDownload
              onClick={() => downloadFile(imageUrl)}
              className="cursor-pointer text-3xl text-white hover:bg-slate-700 rounded-md"
            />
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
