"use client";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import { BASE_URL_SERVER } from "@/lib/BASE_URL";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";

async function sendRequest(
  url: string,
  { arg }: { arg: { email: string; otp: string } },
) {
  return await axios.patch(url, {
    email: arg.email,
    otp: arg.otp,
  });
}

const VerifyPage = () => {
  const router = useRouter();
  const email = useSearchParams().get("email") || "";
  const [otp, setOtp] = useState("");
  const { trigger, isMutating } = useSWRMutation(
    `${BASE_URL_SERVER}/api/auth/verify-otp`,
    sendRequest,
  );
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await trigger({ email, otp });
      toast.success("Otp verified successfully");
      await axios.post(`/api/user`, {
        token: res.data.token,
      });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      router.push(`/home`);
    } catch (e: any) {
      console.log(e);

      if (e.status === 500) {
        toast.error(`Something went wrong`);
      } else {
        toast.error(e.response.data.error);
      }
      console.log(`Error in onSubmit ${e}`);
      console.log(e.response);
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-950">
      <div
        className="
        w-[25rem]
       bg-slate-800 
       rounded-md 
       px-5
       py-10
        text-white 
        flex 
        flex-col 
        items-center
        justify-center      
        gap-5"
      >
        <h1 className="text-3xl font-semibold ">Verify your email</h1>
        <h1 className="text-center">Enter the 4 digit code sent to {email}</h1>

        <form onSubmit={onSubmit} className="h-full">
          <div className="flex flex-col h-full gap-5">
            <div className="flex flex-col gap-3 mt-5">
              <label htmlFor="otp">Code</label>
              <input
                disabled={isMutating}
                value={otp}
                name="otp"
                type="password"
                className="text-black outline-none px-3 rounded-md py-3 bg-slate-400"
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <Button disabled={isMutating} type="submit" className="mt-auto">
              Verify
              {isMutating && <Loader />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyPage;
