import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { publicRequest } from "./lib/requests";
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

        try {
          const r = await publicRequest.post('/auth/login', {
            email: credentials.email,
            password: credentials.password
          });
          console.log(r.data)
          user = r.data.access_token ? {
            id: r.data.id,
            name: r.data.name,
            email: r.data.email,
            role: r.data.role,
            phoneNumber: r.data.phone,
            access_token: r.data.access_token
          } : null

        }
        catch (error: unknown) {
          // Instead of throwing errors, return null
          console.error("Login error:", error);
          return null;
        }
        
        // If no user was found, return null instead of throwing an error
        if (!user) {
          return null;
        }
        
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
      console.log('access token', session.user.access_token)
      // console.log("From Session Callback", session);
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async redirect({ url, baseUrl }) {
      // Handle any redirects
      return  baseUrl;
    },
    
  },
  secret: process.env.NEXTAUTH_SECRET,
  
  pages: {
    signIn: "/auth/login",
    // Add an error page to handle displaying errors in your login form
    error: "/auth/login", 
  },
});
