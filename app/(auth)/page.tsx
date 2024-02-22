"use client"
import { FieldValues, useForm } from "react-hook-form";
import {
  SubmitHandler,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Error from "./Error";

export default function Auth() {

  const router = useRouter();
  const [type, setType] = useState("signin");
  const [loading, setLoading] = useState(false);

  const schema = z.object({
    email: z.string().email({
      message: "Enter enter valid email"
    }),
    password: z.string().min(6, {
      message: 'Password must be minimum 6 characters'
    }),
    name: z.string().min(3, {
      message: 'Name must be min 3 characters',
    }).max(30, {
      message: 'Name must be max 30 characters'
    }).optional(),
  })

  type formSchema = z.infer<typeof schema>

  const { handleSubmit, register, formState: { errors } } = useForm<formSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    try {
      setLoading(true);
      if (type === 'signup') {
        await axios.post(`/api/user`, data);
        signIn('credentials', data);

      }
      else if (type === 'signin') {
        const callback = await signIn('credentials', {
          ...data,
          redirect: false,
        });
        if (callback?.error) {
          toast.error(`Invalid Credentials`);
        }

        if (callback?.ok && !callback?.error) {
          toast.success(`Login success`);
          router.push('/users');
        }
      }
    } catch (e) {
      console.log(`Error in onsubmit ${e}`);
      toast.error(`Something went wrong `)
    }
    finally {
      setLoading(false);
    }


  }

  const handleToggler = () => {
    if (type === "signin") {
      setType("signup");
    }
    else if (type === "signup") {
      setType("signin");
    }
  }
  const handleClick = async (action: string) => {

    setLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error(`Invalid credentials`);
        }
        if (callback?.ok && !callback?.error) {
          toast.success(`Login sucess`);
        }
      })
      .finally(() => setLoading(false))
  }
  return (
    <main className="flex h-screen w-screen justify-center items-center">
      <section className="flex flex-col gap-5 px-5 py-14 border bg-slate-100 shadow-2xl">
        <h1 className="text-2xl font-bold">
          {type === "signin" ? "Signin" : "SignUp"}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="flex flex-col gap-5">
            {
              type === "signup" &&
              <>
                <Input
                  register={register}
                  name="name"
                  placeholder="Full Name"
                />
                <Error error={errors.name?.message} />
              </>
            }
            <Input
              register={register}
              type="email"
              name="email"
              placeholder="Enter email"
              disabled={loading}
            />
            <Error error={errors.email?.message} />
            <Input
              disabled={loading}
              register={register}
              type="password"
              name="password"
              placeholder="Enter password"
            />
            <Error error={errors.password?.message} />

            <Button disabled={loading} type="submit">
              {type === "signin" ? "Signin" : "SignUp"}
            </Button>
          </div>
        </form>
        <h1
          onClick={handleToggler}
          className="hover:underline cursor-pointer text-sm text-neutral-500">
          {
            type === "signin" ? "New to Messenger? SignUp"
              :
              "Already have an account? Signin"
          }

        </h1>
        <h1 className="text-slate-700 text-center">
          or Continue with
        </h1>
        <div className="flex gap-2">
          <Button
            disabled={loading}
            variant="ghost"
            onClick={() => handleClick("google")}
            className="gap-3"
          >
            <FaGoogle size={20} />
            Continue with Google
          </Button>
          <Button
            disabled={loading}
            variant="ghost"
            className="gap-3"
            onClick={() => handleClick("github")}
          >
            <FaGithub size={20} />
            Continue with Github
          </Button>
        </div>
      </section>
    </main>

  );
}
