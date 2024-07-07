import{z} from "zod"

export const verifySchema = z.object({
    code: z.string().length(6,"Varification code must be at 6 charater")
})