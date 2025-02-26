import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { publicRequest } from "./lib/requests";
import bcrypt from "bcryptjs";
import { User } from "./types/user";
import axios from "axios";

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
        console.log(
          "From Auth Provider++++++++++++++++++++++++++++++++++++++++++"
        );
        const rawData = `email=${credentials.email}&password=${credentials.password}`;
        // logic to salt and hash password
        // const pwHash = await bcrypt.hash(credentials.password as string, 10);
        // logic to verify if the user exists
        // user = await publicRequest.post("/auth/login",  {
        //   email: credentials.email,
        //   password: credentials.password,
        // });
console.log(credentials)
        try {
          const response = await axios.post(
            "http://localhost:3000/authhhhhhhhhhhhhhh/logiiiiiiiiiin",
            {
              email: credentials.email,
              password: credentials.password,
            },
            
          );
          user = response.data; // Assuming your backend returns the user object in the response data
        } catch (error) {
          console.error("Login failed:", error);
          throw new Error("Invalid credentials.");
        }

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
    async session({ session, token, user }) {
        console.log("From Session Callback++++++++++++++++++++++++++++++++++++++++++")
      return {
        ...session,
        user: {
          ...session.user,
          ...user,
        },
      };
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});
