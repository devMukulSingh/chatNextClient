import Sidebar from "../components/Sidebar";
import ChatSection from "../components/ChatSection";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/actions/isAuthenticated";

const UsersPage = async(
  {params}:{ params : {userId:string}}
) => {

    const res = await isAuthenticated();
    
    if(!res) redirect('/');

  return (
    <main className="bg-slate-900 h-screen text-white flex ">
      <Sidebar/>
      <ChatSection/>
      {/* <EmptyChat/> */}
    </main>
  )
}

export default UsersPage