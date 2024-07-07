import{z} from "zod"

export const usernameValidation = z
    .string()
    .min(2, "username must be atlest 2 charaters ")
    .max(20, "username must be at most 20 charaters ")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        , " username not contain special charater ")


        export const signUpSchema = z.object ({
            username: usernameValidation,
            email: z.string().email("Invalid email"),
            password: z.string().min(6, "Passward must be atlest 6 charater ")


        })