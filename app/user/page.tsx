import Sidebar from "./components/Sidebar";
import ChatSection from "./components/ChatSection";
import EmptyChat from "./components/EmptyChat";

const UsersPage = () => {

  return (
    <main className="bg-slate-900 h-screen text-white flex ">
      <Sidebar/>
      <ChatSection/>
      {/* <EmptyChat/> */}
    </main>
  )
}

export default UsersPage