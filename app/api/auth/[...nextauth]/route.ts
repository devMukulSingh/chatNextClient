import { prisma } from "@/lib/prisma"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import bcrypt from "bcrypt";

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
    CredentialsProvider({
      name:'credentials',
      credentials:{
        email : { label:'email',type:'text'},
        password : { label:'password', type:'password'}
      },
      async authorize(credentials){
        if(!credentials?.email || !credentials?.password ){
          throw new Error('Invalid Credentials');
        }

        const user = await prisma.user.findUnique({
          where:{
            email:credentials.email
          }
        });

        if(!user || !user.password){
          throw new Error('Invalid credentials');
        };

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password,
        )

        if(!isCorrectPassword){
          throw new Error('Invalid Credentials');
        }

        return user;
      }
    })
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