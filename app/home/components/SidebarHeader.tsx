"use client";
import Button from "@/components/Button";
import { BASE_URL_CLIENT, BASE_URL_SERVER } from "@/lib/BASE_URL";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LuLogOut } from "react-icons/lu";
import SearchBar from "./SearchBar";
import { currentUser } from "@/lib/currentUser";
import { useState } from "react";
import useSWR from "swr";

const fetcher = ( (url:string) => axios.get(url).then( (res) => res.data) )
const SidebarHeader = () => {
  const router = useRouter();
  const profileImage = currentUser?.profileImage || "/blankProfilePic.png";
  const [isFetching, setIsFetching] = useState(false);
  const { isLoading,error} = useSWR(
    isFetching?`${BASE_URL_SERVER}/api/auth/logout-user` : null,
    fetcher
  );
  const { isLoading:isLoading2,error:error2 } = useSWR(isFetching?`${BASE_URL_CLIENT}/api/user`:null, fetcher);
  const handleLogout = async () => {
    setIsFetching(true);
    localStorage.removeItem("token");
    router.push("/");
  };
  if(error || error2){
    console.log("Error in logout",error,error2);
  }
  return (
    <div className=" h-20 p-5 gap-5  w-full flex justify-between rounded-md ">
      <SearchBar placeholder="Search or start a new chat" />
      <Button
        disabled={isLoading || isLoading2} 
        onClick={handleLogout}>
        <LuLogOut className="" />
      </Button>
      <figure className="relative h-10 w-10">
        <Image
          fill
          src={profileImage}
          alt="profileImage"
          className="rounded-full"
        />
      </figure>
    </div>
  );
};

export default SidebarHeader;
