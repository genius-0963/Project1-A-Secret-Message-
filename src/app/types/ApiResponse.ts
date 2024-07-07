import { Message } from "postcss" 
export interface ApiResponse{
    sucess: Boolean,
    message:string,
    isAcceptingMessage?: Boolean,
    messages?: Array<Message>

}