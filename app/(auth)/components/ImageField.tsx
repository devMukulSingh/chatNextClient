"use client";
import Dropdown from "@/components/Dropdown";
import Input, { FieldValues } from "@/components/Input";
import Image from "next/image";
import React, { ChangeEvent, FC, useState } from "react";
import {
  Controller,
  ControllerRenderProps,
  Field,
  UseFormReturn,
} from "react-hook-form";
import ImageGallery from "./ImageGallery";
import Error from "../Error";
import toast from "react-hot-toast";

interface ImageFieldProps {
  form: UseFormReturn<FieldValues>;
}

const ImageField: FC<ImageFieldProps> = ({ form }) => {
  const [profileImg, setProfileImg] = useState<any>("");
  const [showImg, setShowImg] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openLibrary, setOpenLibrary] = useState(false);

  const handleUploadFromPc = () => {
    const inputElem = document.getElementById("imageInput");
    inputElem?.click();
  };
  const removeProfileImg = () => {
    setProfileImg("");
    setShowImg(false);
  };
  const options = [
    {
      title: "Choose from PC",
      onClick: handleUploadFromPc,
    },
    // {
    //   title: "Choose from library",
    //   onClick: () => setOpenLibrary(true),
    // },
  ];
  const onChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FieldValues, "profileImage">
  ) => {
    const image = e?.target?.files?.[0];
    field.onChange(image);
    if (image) {
      if (image?.size > 5000000) {
        toast.error("Maximum 5 MB picture allowed");
        return;
      }
        if (!image?.type.includes("image")) {
          toast.error("Only images allowed");
          return;
        }
        console.log(image);
        
      //Converting to base64
      const fileReader = new FileReader();
      fileReader.onloadend = function (e) {
        setShowImg(true);
        setProfileImg(e?.target?.result || "");
      };
      fileReader.readAsDataURL(image);
    }
  };

  return (
    <>
      <ImageGallery
        form={form}
        setShowImg={setShowImg}
        setOpenLibrary={setOpenLibrary}
        openLibrary={openLibrary}
        setProfileImg={setProfileImg}
      />
      <div
        className="
      flex
      flex-col
      gap-3
      items-center
      "
      >
        <figure
          id="imageUploder"
          className="
        bg-slate-400
        flex
        flex-col
        justify-center
        items-center
        relative
        rounded-full 
        border 
        w-[10rem] 
        h-[10rem] 
        cursor-pointer"
          onClick={() => setOpenDropdown((prev) => !prev)}
        >
          <h1>Choose a picture</h1>
          <Dropdown
            className="w-[12rem]"
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            options={options}
          />
          {showImg && (
            <Image
              id="image"
              className="rounded-full"
              src={profileImg}
              alt="profileImg"
              fill
            />
          )}
          <Controller
            name="profileImage"
            control={form.control}
            render={({ field }) => (
              <input
                {...field}
                value={field.value?.filename}
                id="imageInput"
                hidden={true}
                type="file"
                onChange={(e) => onChange(e, field)}
              />
            )}
          ></Controller>
        </figure>
        <label htmlFor="image">Profile picture</label>
        <Error error={form.formState.errors.name?.message} />
      </div>
    </>
  );
};

export default ImageField;
