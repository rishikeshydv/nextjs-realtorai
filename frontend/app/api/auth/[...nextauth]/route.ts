import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dotenv from 'dotenv';
import bcrypt from "bcrypt";
// import { GetUserByEmail, SaveGoogle,CheckGoogle } from "@/prisma/authentication";
import { GetUserByEmail } from "@/prisma/authentication";
dotenv.config();

const handler = NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
          }),
          CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: "Credentials",
            credentials: {
              email: {},
              password: {},
            },
            async authorize(credentials, req) {
              //WRITE YOUR DATABASE LOGIC
              try { 
                if (!credentials || !credentials.email || !credentials.password) {
                  return null; // Invalid credentials
                }
                const user = await GetUserByEmail(credentials.email);
                if (!user) {
                  return null; // User not found
                }

                const isPasswordCorrect = await bcrypt.compare(
                  credentials.password,
                  user.password
                );
                if (!isPasswordCorrect) {
                  return null; // Incorrect password
                }

                return {
                  id: "", // Ensure 'id' is included
                  email: user.email,
                  name: "", // Optionally include 'name' if available
                  image: "", // Optionally include 'image' if available
                };

              } catch (e) {
                console.log(e)
              }

                console.log(credentials)
                console.log(req)
              return null;
            },
          }),   
    ],

    callbacks: {
      // async signIn({user,account}){
      //   if (user && user.email && account && account.provider === "google") {
      //     //check if the user in the database
      //     const res = await CheckGoogle(user.email)
      //     if (res !== "User Found"){
      //       const res = await SaveGoogle(user.email)
      //       console.log(res)
      //     }
      //     //if not exist, create user
      //     console.log(user)

      //   }

      //   return true
      // },
      async jwt({ token, user }) {
        // Persist user data in the token during sign in
        if (user) {
            token.userId = user.id as string; // Ensure 'id' is a string
            token.name = user.name;
        }
        return token;
    },
    async session({ session, token }) {
        // Add user data to the session
        if (session.user) {
            session.user.name = token.name;
        }
        return session;
    },
    }
})

export {handler as GET, handler as POST}