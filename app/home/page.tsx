import { redirect } from "next/navigation";
import { isAuthenticated } from "@/actions/isAuthenticated";
import EmptyChat from "./contact/components/EmptyChat";

const UsersPage = async ({ params }: { params: { userId: string } }) => {
  const res = await isAuthenticated();

  // if (!res) redirect("/");

  return (
    <main className="flex w-[calc(100vw-30rem)]">
      <EmptyChat />
    </main>
  );
};

export default UsersPage;
