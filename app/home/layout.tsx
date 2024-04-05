import Sidebar from "./components/Sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen  text-white bg-slate-900">
      <Sidebar />
      {children}
    </div>
  );
}
