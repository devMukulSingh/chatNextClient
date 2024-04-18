"use client";
import { FieldValues } from "@/components/Input";
import { images } from "@/lib/constants";
import Portal from "@/lib/HOC/Portal";
import Image from "next/image";
import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { BiX } from "react-icons/bi";

interface ImageGalleryProps {
  setProfileImg: (image: string) => void;
  openLibrary: boolean;
  setOpenLibrary: (arg0: boolean) => void;
  setShowImg: (arg0: boolean) => void;
  form?: UseFormReturn<FieldValues>;
}

const ImageGallery: FC<ImageGalleryProps> = ({
  setProfileImg,
  openLibrary,
  setOpenLibrary,
  setShowImg,
  form,
}) => {
  const handleImageSelect = (image: string) => {
    setProfileImg(image);
    form?.setValue("profileImage", image);
    setShowImg(true);
    setOpenLibrary(false);
  };
  
  return (
    <Portal>
      {openLibrary && (
        <div
          className="flex
          z-50 
          items-center 
          justify-center
          absolute
          h-full
          w-full 
          "
        >
          <div
            className="
          bg-slate-400
          rounded-md 
          "
          >
            <div>
              <BiX
                size={40}
                onClick={() => setOpenLibrary(false)}
                className="cursor-pointer ml-auto"
              />
            </div>

            <div
              className="p-5
            gap-5 
            grid grid-cols-2 
            lg:grid-cols-6 
            md:grid-cols-4"
            >
              {images.map((image: string, index) => (
                <figure
                  key={index}
                  className="
                    cursor-pointer 
                    relative 
                    w-[10rem] 
                    h-[10rem]
                    "
                >
                  <Image
                    className="
                    hover:scale-110 
                    transition 
                    hover:shadow-xl 
                    rounded-full
                    shadow-2xl
                    "
                    fill
                    src={image}
                    alt="galleryImg"
                    onClick={() => handleImageSelect(image)}
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      )}
    </Portal>
  );
};

export default ImageGallery;
