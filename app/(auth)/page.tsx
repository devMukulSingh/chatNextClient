"use client"
import {  Field, FieldValues, useForm } from "react-hook-form";
import {
  SubmitHandler,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";

export default function Auth() {

  const [type, setType] = useState("signin")

  const schema = z.object({
    email:z.string().email(),
    password : z.string().min(6),
    name : z.string().min(3).optional(),
  })

  type formSchema = z.infer<typeof schema>

  const { handleSubmit, register, } = useForm<formSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data:FieldValues) => {
    console.log("data",data);
  }

  const handleToggler = () => {
    if(type==="signin"){
      setType("signup");
    }
    else if(type==="signup"){
      setType("signin");
    }
  }
  return (
    <main className="flex h-screen w-screen justify-center items-center">
      <section className="flex flex-col gap-5 px-10 py-20 border bg-slate-100">
        <h1 className="text-2xl font-bold">
          { type==="signin" ? "Signin" : "SignUp"}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="flex flex-col gap-5">
            {
              type==="signup" &&
              <Input 
              register={register}
              name="name"
              placeholder="Full Name"
              />
            }
            <Input 
              register={register}
              type="email"
              name="email"
              placeholder="Enter email"
              />
              <Input 
              register={register}
              type="password"
              name="password"
              placeholder="Enter password"
              />
              <Button type="submit">
                { type==="signin" ? "Signin" : "SignUp"}
              </Button>
            </div>
        </form>
        <h1
          onClick = { handleToggler } 
          className="hover:underline cursor-pointer">
            {
              type==="signin" ? "New to Messenger? SignUp"
              :
              "Already have an account? Signin" 
            }
          
        </h1>
      </section>
    </main>

  );
}
