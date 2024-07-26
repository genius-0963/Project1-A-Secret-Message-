import { getServerSession

 } from "next-auth";
 import { authOption } from "../auth/[...nextauth]/option";
 import dbConnect from "@/lib/dbConnect";
 import UserModel from "@/model/user";
 import { User } from "next-auth";


 export async  function Post (request: Request){
    await dbConnect()

    const session = await getServerSession(authOption)
     const user : User   = session?.user  as User

     if(!session || !session.user){
        return Response.json(
            {
                success : false ,
                message: "You are not logged in"
                },
                {
                    status: 401
                    }
                
        )

     }
     const userId =user._id;
      const {acceptMessages } = await request.json()
       try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {isAcceptingMessage  : acceptMessages},
            {new : true}


        )
        if(!updatedUser){
            return Response.json(
                {
                    success : false ,
                    message: "failed to update the user status to accept messages "
                    },
                    {
                        status: 401
                        }
                    )

        }
        return Response.json(
            {
                success : true  ,
                message: "Message acceptions status updayed sucessesfully "
                },
                {
                    status: 200
                    }
                )
        
       } catch (error) {
        console.log("failed to update the user status to accept messages  ")
        return Response.json(
            {
                success : false ,
                message: "failed to update the user status to accept messages "
                },
                {
                    status: 500
                    }
                )
            }
        
       
 }
 export async function  GET(request:Request){
    await dbConnect()
    const session = await getServerSession(authOption)
    const user : User   = session?.user  as User

    if(!session || !session.user){
       return Response.json(
           {
               success : false ,
               message: "You are not logged in"
               },
               {
                   status: 401
                   }
               
       )

    }
    const userId =user._id;

    const findUser =  await UserModel.findById(userId)

    if(!findUser){
        return Response.json(
            {
                success : false ,
                message: "user not found  "
                },
                {
                    status: 404
                    }
                )
    }
    const userStatus = findUser.status
    if(userStatus === "accept"){
        return Response.json(
            {
                success : true ,
                message: "user is already accepting messages "
                },
                {
                    status: 200
                    }
                    )
                    }
                    
    }

    
