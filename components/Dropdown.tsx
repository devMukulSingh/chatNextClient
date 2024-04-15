"use client";

import clsx from "clsx";
import { useEffect } from "react";

export interface DropdownProps {
  options: {
    title: string;
    onClick: () => void;
  }[];
  openDropdown: boolean;
  setOpenDropdown: (args0: boolean) => void;
  messageType?: string;
  messageStatus?: string;
  className?:string
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  openDropdown,
  setOpenDropdown,
  messageType,
  messageStatus,
  className
}) => {
  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (
        e.target.id !== "dropdown" &&
        e.target.id !== "dropdownButton" &&
        e.target.id !== "imageUploder"
      ) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("click", (e) => handleOutsideClick(e));

    return () => {
      document.removeEventListener("click", (e) => handleOutsideClick(e));
    };
  }, []);
  return (
    <>
    {
      openDropdown &&
      <div
      id="dropdown"
      className={clsx(`bg-slate-800 
      z-50
      overflow-visible 
      rounded-md 
      absolute 
      py-5 
      min-w-32
      
      text-neutral-300
      ${messageStatus === "received" ? "right-[40%]" : "left-[40%]"}
      ${messageType === "file" ? "bottom-[10%] right-0  " : "top-[80%]"}
      `,className)}
      >
      {options.map((option) => (
        <ul key={option.title}>
              <li
                onClick={option.onClick}
                className="
                flex 
                items-center 
                cursor-pointer 
                hover:bg-slate-900 
                h-10 
                w-full 
                px-5"
              >
                {option.title}
              </li>
            </ul>
          ))}
        </div>
      
      }
        
      </>
  );

};

export default Dropdown;
