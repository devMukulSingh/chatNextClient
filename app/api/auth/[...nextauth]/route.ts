import { prisma } from "@/lib/prisma"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret : process.env.GOOGLE_SECRET as string,
    }),
    // ...add more providers here
  ],
  debug: process.env.NODE_ENV === 'development',
  session : {
    strategy: "jwt",
  },
  secret:process.env.NEXTAUTH_SECRET
}
  //@ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};