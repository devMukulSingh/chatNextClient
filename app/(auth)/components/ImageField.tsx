'use client'
import Dropdown from '@/components/Dropdown';
import Input, { FieldValues } from '@/components/Input'
import Image from 'next/image';
import React, { ChangeEvent, FC,  useState } from 'react'
import { Controller,  ControllerRenderProps,  Field,  UseFormReturn } from 'react-hook-form';
import ImageGallery from './ImageGallery';

interface ImageFieldProps {
  form:UseFormReturn<FieldValues>
}

const ImageField:FC<ImageFieldProps> = ({
form
}) => {

  const [profileImg, setProfileImg] = useState<any>("");
  const [showImg, setShowImg] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openLibrary , setOpenLibrary  ] = useState(false);
  console.log(form.getValues());
  
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
    {
      title: "Choose from library",
      onClick: () => setOpenLibrary(true),
    },

  ];
  const onChange = (
      e: ChangeEvent<HTMLInputElement>,
      field: ControllerRenderProps<FieldValues, "profileImage">
    ) => {
      const image = e?.target?.files?.[0];
      
      //Converting to base64
      if(image){
        console.log(image);
        const fileReader = new FileReader();
        fileReader.onloadend = function(e){
          setShowImg(true);
          field.onChange(e?.target?.result || "");
          setProfileImg(e?.target?.result || "");
        }
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
            className="rounded-full" 
            src={profileImg} 
            alt="" 
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
      </div>
    </>
  );
}

export default ImageField