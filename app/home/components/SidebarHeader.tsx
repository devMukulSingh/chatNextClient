"use client";
import Button from "@/components/Button";
import { BASE_URL_CLIENT, BASE_URL_SERVER } from "@/lib/BASE_URL";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LuLogOut } from "react-icons/lu";
import SearchBar from "./commons/SearchBar";

const SidebarHeader = () => {
  const router = useRouter();

  const image =
    "https://lh3.googleusercontent.com/a/ACg8ocKpWZffOwLfdPRCRKfFYdW36Fnda6Zo_jKH3AOYWvf3FA=s360-c-no";
  const handleLogout = async () => {
    await axios.get(`${BASE_URL_SERVER}/api/auth/logout-user`);
    await axios.get(`${BASE_URL_CLIENT}/api/user`);
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <main className=" h-20 p-5 gap-5  w-full flex justify-between rounded-md ">
      <figure className="relative h-10 w-10">
        <Image fill src={image} alt="profileImage" className="rounded-full" />
      </figure>
      <SearchBar placeholder="Search or start a new chat" />
      <Button onClick={handleLogout}>
        <LuLogOut className="" />
        {/* Logout */}
      </Button>
    </main>
  );
};

export default SidebarHeader;
