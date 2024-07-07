import 'next-auth'
import { DefaultSession, DefaultUser } from 'next-auth'


declare module  'next-auth'{
    interface User{
        _id: string
        isVerified?: boolean
        email: string
        isAccptingMessage?: boolean
        username ?: string


    }
    interface session {
        user: {
            _id?: string
            isVerified?: boolean
            email: string
            isAccptingMessage?: boolean
            username ?: string

        }& DefaultSession['user']
    }

}
declare module 'Next-auth/jwt'{
    interface JWT {
        _id?: string
        isVerified?: boolean
        email: string
        isAccptingMessage?: boolean
        username ?: string
        
        
    }
}
