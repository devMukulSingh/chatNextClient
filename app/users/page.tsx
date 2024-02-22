'use client'
import Button from "@/components/Button"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation";

const UsersPage = () => {
  const handleLogout = ( ) => {
    signOut({callbackUrl:'/'});
  }
  return (
    <div>
      <Button onClick={ handleLogout }>
        Logout
      </Button>
    </div>
  )
}

export default UsersPage