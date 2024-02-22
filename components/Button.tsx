"use client"

import clsx from "clsx"

interface ButtonProps {
  variant?: string
  onClick?: () => void
  children?: React.ReactNode,
  className?: string,
  type?: "button" | "submit" | "reset",
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  type,
  onClick,
  variant,
  disabled
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
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
        `${variant === "ghost" ? 'bg-white text-neutral-700 hover:bg-slate-300' : ''}`,
        className
      )

      }
    >
      {children}
    </button>
  )
}

export default Button