import { Resend } from "resend";
import VerificationEmail from "@/app/helpers/emails/VerificationEmail"
import { ApiResponse } from "../types/ApiResponse";
import { string } from "zod";
import { promises } from "dns";
import { resend } from "../../lib/resend";
import { optimizeImage } from "next/dist/server/image-optimizer";
import SendVerificationEmail from "@/app/helpers/emails/VerificationEmail";

export async function sendVerifiationEmail(
    email:string,
    username:string,
    verifyCode:string
):Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'verifiation Code for your account ',
            react:SendVerificationEmail(),
          });
        return{sucess:true ,message: 'verifiation Email Send Sucessfully '
        }
        
    } catch (emailError) {
        console.log("Error sending an Email",emailError)
        return{sucess:false ,message: 'feild to send verifiation '
        }
        
    }
}
    

  