"use client"

import clsx from "clsx"

interface ButtonProps{
    children? :React.ReactNode,
    className? : string,
    type?:"button" | "submit" | "reset" 
}

const Button:React.FC<ButtonProps> = ({
    children,
    className,
    type
}) => {
  return (
    <button
      type={type}
      className={clsx(`
          text-white
          flex 
          items-center 
          h-10 
          p-4
          rounded-md
          bg-[#1B1464]
          hover:bg-[#0652DD]
          justify-center
          `,
          className
          )
        }
        >
        {children}
    </button>
  )
}

export default Button