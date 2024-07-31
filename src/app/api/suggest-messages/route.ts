import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: { json: () => PromiseLike<{ messages: any; }> | { messages: any; }; }) {
    try {
        const prompt = "Create a list of three open-ended and engaging questions for an anonymous messaging app. These questions should be separated by '|'. The questions should be suitable for a stable and diverse audience, avoiding personal and sensitive topics, and relevant to normal conditions.";

        const { messages } = await req.json();

        const response = await openai.create.Chat.Completion({
            model: 'gpt-4-turbo',
            max_tokens: 400,
            stream: true,
            messages: [{ role: "user", content: prompt }],
        });

        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);

    } catch (error) {
        if (error instanceof OpenAI.APIError) {
            const { name, status, message, headers } = error;
            return NextResponse.json({
                name, status, headers, message
            }, { status });
        } else {
            console.error("An unexpected error occurred");
            throw error;
        }
    }
}
