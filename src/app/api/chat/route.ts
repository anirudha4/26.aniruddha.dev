import { google } from "@ai-sdk/google";
import { convertToModelMessages, stepCountIs, streamText, tool, UIMessage } from "ai";
import { readFile } from "fs/promises";
import path from "path";
import { z } from "zod";

const PENDO_TRACK_URL = "https://data.pendo-dev.pendo-dev.com/data/track";
const PENDO_INTEGRATION_KEY = "d7740d17-2a59-4556-9032-7f7534568fac";

async function pendoTrackServerEvent(
    event: string,
    properties: Record<string, unknown>,
    context?: { ip?: string; userAgent?: string; url?: string }
) {
    try {
        await fetch(PENDO_TRACK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-pendo-integration-key": PENDO_INTEGRATION_KEY,
            },
            body: JSON.stringify({
                type: "track",
                event,
                visitorId: "system",
                accountId: "system",
                timestamp: Date.now(),
                properties,
                context,
            }),
        });
    } catch (err) {
        console.error("Pendo server-side track error:", err);
    }
}

export const POST = async (req: Request) => {
    const body = await req.json();
    const { messages }: { messages: UIMessage[], id: string } = body;

    pendoTrackServerEvent("chat_api_called", {
        message_count: messages.length,
        model_name: "gemini-2.5-flash-lite-preview-09-2025",
    }, {
        userAgent: req.headers.get("user-agent") || undefined,
        url: req.url,
    });

    const aboutMe = await readFile(path.join(process.cwd(), 'about-me.md'), 'utf-8');
    console.log("aboutMe length:", aboutMe.length);

    const result = await streamText({
        system: `
You are Anirudha's Portfolio Assistant, a friendly and professional AI representative for Anirudha Gandhare's portfolio website.

## Your Role
You help visitors learn more about Anirudha - his experience, skills, projects, and professional background.

## Context About Anirudha
${aboutMe}

## Conversation Flow
1. **First Interaction**: If this is the beginning of the conversation and you don't know the visitor's name, ALWAYS start by asking: "Hi! I'm Anirudha's portfolio assistant. Before we begin, may I know who I'm speaking with?"

2. **After Getting Their Name**: Greet them warmly and let them know you're here to answer questions about Anirudha. When a user provides their name or identity, use the identity_provided tool to record it.

3. **Answering Questions**: Only answer questions related to:
   - Anirudha's professional experience and work history
   - His skills, expertise, and technical background
   - His projects (Alfred, One App, etc.)
   - His education and career journey
   - Contact information and how to reach him
   - His interests and professional philosophy

## What You Should NOT Do
- Do NOT answer questions unrelated to Anirudha or his professional work
- Do NOT provide general programming help, coding assistance, or technical support
- Do NOT engage in conversations about topics unrelated to Anirudha's portfolio
- Do NOT write code, debug, or provide development services

If someone asks something outside your scope, politely respond:
"I'm here specifically to help you learn about Anirudha and his work. For other questions, I'd recommend reaching out to him directly at aniruddha.gandhare@gmail.com or checking out general resources."

## Tone & Style
- Professional yet friendly and approachable
- Enthusiastic about Anirudha's work and achievements
- Concise and clear in your responses
- Use proper formatting for readability
- Be helpful in connecting visitors with Anirudha if they're interested in collaboration

Remember: Your primary goal is to showcase Anirudha's expertise and help visitors understand why he'd be a great fit for their project or opportunity.`,
        model: google('gemini-2.5-flash-lite-preview-09-2025'),
        messages: await convertToModelMessages(messages),
        toolChoice: 'auto',
        tools: {
            identity_provided: tool({
                description: 'Call this tool when a user mentions their name or provides their identity. Use this to record visitor information.',
                inputSchema: z.object({
                    name: z.string().describe('The name or identity the user provided'),
                    context: z.string().optional().describe('Additional context about how they introduced themselves'),
                }),
                execute: async ({ name, context }) => {
                    console.log('=== IDENTITY PROVIDED ===');
                    console.log('Name:', name);
                    if (context) {
                        console.log('Context:', context);
                    }
                    console.log('Timestamp:', new Date().toISOString());
                    console.log('========================');

                    await pendoTrackServerEvent("chat_visitor_identity_provided", {
                        visitor_name: name,
                        context: context || "",
                        timestamp: new Date().toISOString(),
                    });

                    return { success: true, message: `Identity recorded: ${name}` };
                },
            }),
        },
        stopWhen: stepCountIs(5)
    });

    return result.toUIMessageStreamResponse();
}