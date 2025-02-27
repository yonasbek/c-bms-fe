import { JWT } from 'next-auth/jwt';
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { publicRequest } from "./lib/requests";
import bcrypt from "bcryptjs";
import { User } from "./types/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        let user: User | null = null;

        try{
          const r = await publicRequest.post('/auth/login', {
                  email:credentials.email,
                  password:credentials.password
                });
                // console.log(r.data)
             user= r.data.access_token ?{
              id:'01',
              name:'Tinsaee',
              email:'email@email.com',
              role:'manager',
              phoneNumber:'0123456789',
              access_token:r.data.access_token
            }:null

              }
        catch (error) {
          // console.error("Login failed:", error);
          throw new Error("Invalid credentials.");
        }
        
        // logic to salt and hash password
        // const pwHash = await bcrypt.hash(credentials.password as string, 10);
        // logic to verify if the user exists
        // user = await publicRequest.post("/auth/login",  {
        //   email: credentials.email,
        //   password: credentials.password,
        // });
// console.log(credentials)
       

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.");
        }
        // return user object with their profile data
        return user;
      },
    }),
  ],
  session: { strategy: "jwt" },

  callbacks: {
    async session({ session, token, }) {
      if(token.sub && session.user){
        session.user.id = token.sub;
      }
      if(token.role && session.user){
        session.user.role = token.role as string;
        session.user.phoneNumber = token.phoneNumber as string;
        session.user.access_token = token.access_token as string;
      }
      console.log("From Session Callback", session);
      return session;

      //   console.log("From Session Callback", user);
      // return {
      //   ...session,
      //   user: {
      //     ...session.user,
      //     id: token.id as string,
      //     role: token.role as string,
      //     phoneNumber: token.phoneNumber as string,
      //     access_token: token.access_token as string,
        
      //   },
      // };
    },
    async jwt({ token,user }) {
      if (user) {
        token.role = user.role;
        token.phoneNumber = user.phoneNumber;
        token.access_token = user.access_token;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      // Always redirect to the baseUrl (home page)
      return baseUrl;
    },
    
  },
  secret: process.env.NEXTAUTH_SECRET,
  
  pages: {
    signIn: "/auth/login",
  },
});
