'use client'
import Button from "@/components/Button"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation";

const UsersPage = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  }
  return (
    <div className="bg-slate-900 h-screen">
      <Button onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}

export default UsersPage