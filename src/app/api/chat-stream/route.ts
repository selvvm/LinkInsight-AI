import { ragChat } from "@/lib/rag-chat";
import { NextRequest } from "next/server";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";

export const POST = async (req: NextRequest) => {
    try {
        // Log the raw request body
        console.log("Received request");

        const body = await req.json();
        console.log("Parsed request body:", body);

        // Validate the body format
        if (!body || typeof body !== "object") {
            console.error("Invalid request body format");
            return new Response(JSON.stringify({ error: "Invalid request body" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Correct destructuring to match the actual keys in the request body
        const { messages, sessionId } = body;
        console.log("Messages:", messages, "SessionID:", sessionId);

        // Check if the messages is an array and not empty
        if (!Array.isArray(messages) || messages.length === 0) {
            console.error("Invalid messages format or empty messages array");
            return new Response(JSON.stringify({ error: "Messages must be a non-empty array" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const lastMessage = messages[messages.length - 1];
        console.log("Last message:", lastMessage);

        // Check if the last message has content of type string
        if (!lastMessage || typeof lastMessage.content !== "string") {
            console.error("Invalid last message or content type");
            return new Response(JSON.stringify({ error: "Last message must have a content property of type string" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Call the chat function
        const response = await ragChat.chat(lastMessage.content, { streaming: true, sessionID: sessionId });
        console.log("Chat response:", response);

        return aiUseChatAdapter(response);
    } catch (error) {
        console.error("Error in POST handler:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};
