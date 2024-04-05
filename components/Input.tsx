"use client";
import clsx from "clsx";
import { UseFormRegister } from "react-hook-form";

type FieldValues = {
  email: string;
  password: string;
  name?: string;
};

interface InputProps {
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  type?: string;
  name: "email" | "password" | "name";
  disabled?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  name,
  register,
  type,
  disabled,
  className,
}) => {
  return (
    <input
      disabled={disabled}
      className={clsx(
        `bg-slate-400 rounded-md p-3 focus:outline-none disabled:pointer-events-none`,
        className,
      )}
      type={type}
      {...register(name)}
      placeholder={placeholder}
    />
  );
};

export default Input;
