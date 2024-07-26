import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/option";// Corrected to match the import
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOption);
    const user: User = session?.user as User;

    if (!session || !session.user) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Not Authorized",
            }),
            {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }

    const userId = new mongoose.Types.ObjectId(user._id);
    try {
        const userAggregation = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: "$messages" },
            { $sort: { "messages.createdAt": -1 } }, // Corrected sort syntax
            {
                $group: {
                    _id: "$_id",
                    messages: { $push: "$messages" },
                },
            },
        ]);

        if (!userAggregation || userAggregation.length === 0) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "User not found",
                }),
                {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                messages: userAggregation[0].messages,
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error(error); // Log the error for debugging
        return new Response(
            JSON.stringify({
                success: false,
                message: "An error occurred",
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
