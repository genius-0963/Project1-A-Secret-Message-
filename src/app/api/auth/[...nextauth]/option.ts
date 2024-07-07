import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";

export const authOption: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                identifier: { label: "Email or Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any) {
                await dbConnect();
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier },
                        ],
                    });

                    if (!user) {
                        throw new Error("No user found with the provided identifier");
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                    if (!isPasswordCorrect) {
                        throw new Error("Password is incorrect");
                    }

                    return user;
                } catch (err: any) {
                    throw new Error(err.message || "Authorization failed");
                }
            },
        }),
    ],
    callbacks:{
        async session({ session, user, token }) {
            if(token ){
                session.user = token
                


            }
      return session
    },
    async jwt({ token, user, }) {
        if (user) {
            token._id = user._id?.toString ()
            token.isVerified = user.isVerified
            token.isAcceptingMessage = user.isAccptingMessage
            token.username = user.username
        
        }
      return token
    },


    },
    pages:{ 
        signIn: '/signin',
        signOut: '/auth/signout',
    },
    session: {
        strategy: "jwt",

    },
    secret:process.env.NEXTAUTH_SECRET,
    

    
};

