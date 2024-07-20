import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/user';
import { z } from 'zod';
import { usernameValidation } from '@/app/schemas/signUpSchema';
import { ifError } from 'assert';

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  
  
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get('username') || '',
    };

    // Validation with zod
    const result = UsernameQuerySchema.safeParse(queryParam);
    if (!result.success) {
      const usernameError = result.error.format();
      return new Response(
        JSON.stringify({
          success: false,
          message: usernameError.username?._errors || [],
        }),
        { status: 400 }
      );
    }

    const { username } = result.data;

    // Check if a verified user with the username already exists
    const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true });
    if (existingVerifiedUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'This username is verified. Please choose another username.',
        }),
        { status: 400 }
      );
    }

    // Check if any user with the username exists
    const user = await UserModel.findOne({ username });
    if (user) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Username already taken',
        }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Username is available',
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log('Checking username error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Internal server error',
      }),
      { status: 500 }
    );
  }
}

