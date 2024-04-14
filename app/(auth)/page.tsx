"use client";
import { FieldValues, useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Error from "./Error";
import { BASE_URL_SERVER } from "@/lib/BASE_URL";
import { BASE_URL_CLIENT } from "@/lib/BASE_URL";

import { RiLoaderFill } from "react-icons/ri";

export default function Auth() {
  const router = useRouter();
  const [type, setType] = useState("signin");
  const [loading, setLoading] = useState(false);

  const schema = z.object({
    email: z.string().email({
      message: "Enter enter valid email",
    }),
    password: z.string().trim().min(6, {
      message: "Password must be minimum 6 characters",
    }),
    name: z
      .string().trim()
      .min(3, {
        message: "Name must be min 3 characters",
      })
      .max(30, {
        message: "Name must be max 30 characters",
      })
      .optional(),
  });

  type formSchema = z.infer<typeof schema>;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data:FieldValues) => {
    try {
      setLoading(true);
      if (type === "signup") {
        await axios.post(`${BASE_URL_SERVER}/api/auth/send-otp`,data);
        router.push(`/verify-otp?email=${data.email}`);

      } else if (type === "signin") {
        const res = await axios.get(`${BASE_URL_SERVER}/api/auth/check-user`, {
          params: data,
        });
        await axios.post(`/api/user`, {
          token: res.data.token,
        });
        router.push(`/home`);
        localStorage.setItem("currentUser", JSON.stringify(res.data));
      }
    } catch (e) {
      console.log(`Error in onsubmit ${e}`);
      toast.error(`Something went wrong `);
    } finally {
      setLoading(false);
    }
  };

  const handleToggler = () => {
    if (type === "signin") {
      setType("signup");
    } else if (type === "signup") {
      setType("signin");
    }
  };

  return (
    <main className="flex h-screen w-screen justify-center items-center bg-slate-950">
      <section
        className={`text-white flex flex-col gap-5 w-[23rem] px-10 pb-10 pt-8 ${type === "signup" ? "h-[32rem]" : "h-[28rem]"} bg-slate-800 shadow-2xl rounded-md`}
      >
        <h1 className="text-2xl font-bold">
          {type === "signin" ? "Signin" : "SignUp"}
        </h1>
        <form  onSubmit={handleSubmit(onSubmit)} className="h-full">
          <div className="flex flex-col gap-2 h-full">
            {type === "signup" && (
              <>
                <label htmlFor="name">Full name</label>
                <Input
                  className=""
                  register={register}
                  name="name"
                  placeholder="Full Name"
                />
                <Error error={errors.name?.message} />
              </>
            )}
            <label htmlFor="email">Email</label>
            <Input
              register={register}
              type="email"
              name="email"
              placeholder="Enter email"
              disabled={loading}
            />
            <Error error={errors.email?.message} />

            <label htmlFor="password">Password</label>
            <Input
              disabled={loading}
              register={register}
              type="password"
              name="password"
              placeholder="Enter password"
            />
            <Error error={errors.password?.message} />

            <div className="mt-auto flex flex-col gap-5">
              <Button
                className="flex gap-3 items-center w-full"
                disabled={loading}
                type="submit"
              >
                {type === "signin" ? "Signin" : "SignUp"}
                {loading && <RiLoaderFill size={25} className="animate-spin" />}
              </Button>
              <h1
                aria-disabled={loading}
                onClick={handleToggler}
                className={`${loading ? "pointer-events-none opacity-30" : ""} hover:underline cursor-pointer text-sm text-neutral-200`}
              >
                {type === "signin"
                  ? "New to Messenger? SignUp"
                  : "Already have an account? Signin"}
              </h1>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
