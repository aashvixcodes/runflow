import OpenAI from "openai";
import { SYSTEM_INSTRUCTION } from "./providers";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_FINETUNED_MODEL = process.env.OPENAI_FINETUNED_MODEL;

function getClient() {
    if (!OPENAI_API_KEY) {
        throw new Error("OPENAI_API_KEY is not configured. Please add it to your .env.local file.");
    }
    return new OpenAI({ apiKey: OPENAI_API_KEY });
}

/**
 * Generate a component using OpenAI GPT-4o-mini.
 * Supports both text-only and image+text prompts.
 */
export async function generateWithOpenAI(
    prompt: string,
    image?: string
): Promise<string> {
    const client = getClient();

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
        { role: "system", content: SYSTEM_INSTRUCTION },
    ];

    if (image) {
        messages.push({
            role: "user",
            content: [
                {
                    type: "text",
                    text: `Based on the following design image, generate a React + TypeScript + TailwindCSS component. Additional instructions: ${prompt}`,
                },
                {
                    type: "image_url",
                    image_url: { url: `data:image/png;base64,${image}` },
                },
            ],
        });
    } else {
        messages.push({ role: "user", content: prompt });
    }

    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.7,
        max_tokens: 4096,
    });

    let text = response.choices[0]?.message?.content || "";

    // Clean markdown code fences if present
    text = text.replace(/^```(?:tsx?|jsx?|typescript|javascript)?\n?/gm, "");
    text = text.replace(/```$/gm, "");
    text = text.trim();

    return text;
}

/**
 * Generate a component using a fine-tuned OpenAI model.
 * Falls back to gpt-4o-mini if no fine-tuned model is configured.
 */
export async function generateWithFineTuned(
    prompt: string
): Promise<string> {
    const client = getClient();

    const model = OPENAI_FINETUNED_MODEL || "gpt-4o-mini";

    if (!OPENAI_FINETUNED_MODEL) {
        console.warn("[AI] OPENAI_FINETUNED_MODEL not set, falling back to gpt-4o-mini");
    }

    const response = await client.chat.completions.create({
        model,
        messages: [
            { role: "system", content: SYSTEM_INSTRUCTION },
            { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 4096,
    });

    let text = response.choices[0]?.message?.content || "";

    text = text.replace(/^```(?:tsx?|jsx?|typescript|javascript)?\n?/gm, "");
    text = text.replace(/```$/gm, "");
    text = text.trim();

    return text;
}
