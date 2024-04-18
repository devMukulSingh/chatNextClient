"use client";
import Button from "@/components/Button";
import { BASE_URL_CLIENT, BASE_URL_SERVER } from "@/lib/BASE_URL";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LuLogOut } from "react-icons/lu";
import SearchBar from "./SearchBar";
import { currentUser } from "@/lib/currentUser";

const SidebarHeader = () => {
  const router = useRouter();

  const profileImage = currentUser?.profileImage || "/blankProfilePic.png";
  const handleLogout = async () => {
    await axios.get(`${BASE_URL_SERVER}/api/auth/logout-user`);
    await axios.get(`${BASE_URL_CLIENT}/api/user`);
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <main className=" h-20 p-5 gap-5  w-full flex justify-between rounded-md ">
      <SearchBar placeholder="Search or start a new chat" />
      <Button onClick={handleLogout}>
        <LuLogOut className="" />
        {/* Logout */}
      </Button>
      <figure className="relative h-10 w-10">
        <Image fill src={profileImage} alt="profileImage" className="rounded-full" />
      </figure>
    </main>
  );
};

export default SidebarHeader;
