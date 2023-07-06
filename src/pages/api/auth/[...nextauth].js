import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../../database/connectDB";

const adminEmails = ["vshubham799@gmail.com"];

export default NextAuth({
  // Configure one or more authentication providers

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session(session) {
      if (session && adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
    },
  },
  adapter: MongoDBAdapter(clientPromise),
});

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401);
    res.end();
    throw "not an admin";
  }
}
