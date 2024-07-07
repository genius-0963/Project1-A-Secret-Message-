import{z} from "zod"

export const messageSchema = z.object({
    context : z.string().min(10,"message must be in 10 charater ")
    .max(300,"message must be in 300 charater "),
    

    

})