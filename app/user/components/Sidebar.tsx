import Contacts from "./Contacts";
import SidebarHeader from "./SidebarHeader";

const Sidebar = () => {


    return (
        <main className="flex flex-col gap-5 w-[30rem]">
            <SidebarHeader />
            <Contacts/>
        </main>
    )
}

export default Sidebar