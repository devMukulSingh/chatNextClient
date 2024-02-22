"use client"
import {  UseFormRegister } from 'react-hook-form'

type FieldValues = {
    email:string,
    password:string,
    name? : string
}

interface InputProps{
    placeholder?:string,
    register:UseFormRegister<FieldValues>,
    type?: string,
    name: "email" | "password" | "name",
    disabled?:boolean,
}

const Input:React.FC<InputProps> = ({
    placeholder,
    name,
    register,
    type,
    disabled
}) => {
  return (
    <input 
        disabled={disabled}
        className='p-3 focus:outline-none'
        type={type}
        {...register(name)}
        placeholder={placeholder}
    />
  )
}

export default Input