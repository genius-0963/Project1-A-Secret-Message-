import UserModel from "@/model/user";

UserModel
import dbConnect from "@/lib/dbConnect";
import {Message } from "@/model/user";
export async function POST (request : Request ){
    await  dbConnect()
    const {username , content}  = await request.json()
    try {
        const user = await UserModel.findOne({username})
        if (!user) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "user not found ",
                }),
                {
                    status: 404,
                    
                }
            )
            if (!user.isAcceptingMessage) {
                return new Response(
                    JSON.stringify({
                        success: false,
                        message: "user is not accepting the messages ",
                    }),
                    {
                        status: 401,
                        
                    }
                )
                
            }


            
        }
        const newMessage = {content ,createdAt : new Date()}
        user.message.push(newMessage)
        await user.save()
        
    } catch (error) {
        
    }

}
