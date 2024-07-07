import dbConeect from "@/lib/dbConnect"
import UserModel from "@/model/user"
import bcrypt from "bcryptjs"

import { sendVerifiationEmail } from "@/app/helpers/sendVerificationEmail"

export async function POST(request:Request) {
    await dbConeect()

    try {
        const {username,email,passward}= await request.json()
         const existingUserVerifiedByUserNmae=  await UserModel.findOne({
            username,
            isVerified: true 


         })
         if(existingUserVerifiedByUserNmae){
            return Response.json({
                success: false,
                message: "Username Is Already Taken"
            },{status:400} )
         }
         const existingUserByEmail= await UserModel.findOne({email})
         const verifyCode= Math.floor(10000 + Math.random()*90000).toString()
         if(existingUserByEmail){ 
           if(existingUserByEmail.isAcceptingMessage)
            return Response.json({
        success: true,
        message: "Email Is Already Taken",

        },{status:500})
        else {
            const hasedPassward = await  bcrypt.hash(passward,10)
            existingUserByEmail.password= hasedPassward;
            existingUserByEmail.verifyCode= verifyCode;
            existingUserByEmail.verifyCodeExpiry= new Date(Date.now()+3600000)
        }

         }
         else{
              const hasedPassward = await bcrypt.hash(passward,10)
              const expiryDate = new Date()
              expiryDate.setHours(expiryDate.getHours()+1)
         }
         const  newUser = new UserModel({
            username,
            email,
            passward:passward,
            isverified: false,
            isAcceptingMessage: true,
            messages: []
            
            
         })
         await newUser.save()
         const emailRespnse= await sendVerifiationEmail(
            email,
            username,
            verifyCode
            )
            if(!emailRespnse.sucess){
                return Response.json({
                     success: false,
                message: email.Response

                },{status:500})

            }
            return Response.json({
                     success:true ,
                message: "user Regester sucessfully please verify your Email "

                },{status:500})
            
         





        
    } catch (error) {
        console.log("Error REgestering User", error)
        return Response.json(
            {
                message: "Error Registering User",
                success: false,
            },
            {
                status: 500,
            
            }
        )
        
    }
    
}