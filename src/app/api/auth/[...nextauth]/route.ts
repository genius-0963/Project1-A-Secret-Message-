import NextAuth from "next-auth/next"; 
import { AuthOptions } from "next-auth";
import { authOption } from "./option";

const hendler = NextAuth(authOption)
 export {hendler as GET , hendler as POST}
 