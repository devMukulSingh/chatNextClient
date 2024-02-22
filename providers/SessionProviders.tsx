"use client"

import { SessionProvider } from "next-auth/react"

const SessionProviders = ({
    children
}: {children : React.ReactNode}) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  ) 
}

export default SessionProviders