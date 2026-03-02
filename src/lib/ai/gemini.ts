import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { SYSTEM_INSTRUCTION } from "./providers";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

function getClient() {
    if (!GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not configured. Please add it to your .env.local file.");
    }
    return new GoogleGenerativeAI(GEMINI_API_KEY);
}

const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
];

/**
 * Generate a component using Google Gemini.
 * Supports both text-only and image+text prompts.
 */
export async function generateWithGemini(
    prompt: string,
    image?: string,
    modelVariant: "gemini-1.5-flash" | "gemini-1.5-pro" = "gemini-1.5-flash"
): Promise<string> {
    const client = getClient();
    const model = client.getGenerativeModel({
        model: modelVariant,
        systemInstruction: SYSTEM_INSTRUCTION,
        safetySettings,
    });

    let result;

    if (image) {
        // Image + text prompt (multimodal)
        const imagePart = {
            inlineData: {
                mimeType: "image/png",
                data: image,
            },
        };

        result = await model.generateContent([
            `Based on the following design image, generate a React + TypeScript + TailwindCSS component. Additional instructions: ${prompt}`,
            imagePart,
        ]);
    } else {
        // Text-only prompt
        result = await model.generateContent(prompt);
    }

    const response = result.response;
    let text = response.text();

    // Clean markdown code fences if present
    text = text.replace(/^```(?:tsx?|jsx?|typescript|javascript)?\n?/gm, "");
    text = text.replace(/```$/gm, "");
    text = text.trim();

    return text;
}
