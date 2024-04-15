"use client";
import clsx from "clsx";
import { UseFormRegister } from "react-hook-form";

export type FieldValues = {
  email: string;
  password: string;
  name?: string ;
  profileImage?:any
};

interface InputProps {
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  type?: string;
  name: "email" | "password" | "name" | "profileImage";
  disabled?: boolean;
  className?: string;
  hidden?: boolean;
  id?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  name,
  register,
  type,
  disabled,
  className,
  hidden,
  id,
}) => {
  return (
    <input
      id={id}
      hidden={hidden}
      disabled={disabled}
      className={clsx(
        `bg-slate-400 rounded-md p-3 focus:outline-none disabled:pointer-events-none`,
        className
      )}
      type={type}
      {...register(name)}
      placeholder={placeholder}
    />
  );
};

export default Input;
