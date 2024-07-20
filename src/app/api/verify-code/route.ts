import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/user';

export async function  POST(request:Request){
    await dbConnect()

    try {
        const {username , code} = await request.json()
        const decodedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({username:decodedUsername})
        if(!user){
            return new Response(
            JSON.stringify({
                success: false,
                message: ' user not found  ',
            }),
            { status: 500 }
            );
        }
        const isCodeValid = user.verified=== code
        const isCodeExpired = new Date(user.verifyCodeExpiry) > new Date()
        if(!isCodeValid || !isCodeExpired){
            return new Response(
                JSON.stringify({
                    success: false,
                    message: ' code is not valid or expired ',
                    }),
                    { status: 500 }
                    );
                }
                if(isCodeValid && isCodeExpired){
                    user.verified = true

                    user.verifiedAt = new Date()
                    user.verifiedCode = null
                    user.verifiedCodeExpiry = null
                    await user.save()
                    return new Response(
                        JSON.stringify({
                            success: true,
                            message: ' your account is verified  ',
                            }),
                            { status: 200 }
                            );
                }else if(!isCodeValid){
                    return new Response(
                        JSON.stringify({
                            success: false ,
                            message: 'Your code is invalied please enter a new code  ',
                            }),
                            { status: 200 }
                            );

                }else if(!isCodeExpired){
                    return new Response(
                        JSON.stringify({
                            success: true ,
                            message: 'you sucessfully login ',
                            }),
                            { status: 200 }
                            );
                }    
    } catch (error) {
        console.log('error in verifying user :', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Internal server error',
      }),
      { status: 500 }
    );
  }
}
        
    

