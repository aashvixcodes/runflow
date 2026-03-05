import { NextRequest, NextResponse } from "next/server";
import { generateWithGemini } from "@/lib/ai/gemini";
import { generateWithOpenAI, generateWithFineTuned } from "@/lib/ai/openai";
import { searchSimilarComponents } from "@/lib/ai/providers";
import type { AIRequest, AIResponse, AIError } from "@/lib/ai/providers";

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as AIRequest;

        // Validate input
        if (!body.prompt || typeof body.prompt !== "string") {
            return NextResponse.json(
                { error: "Prompt is required and must be a string." } satisfies AIError,
                { status: 400 }
            );
        }

        if (!body.model) {
            return NextResponse.json(
                { error: "Model selection is required." } satisfies AIError,
                { status: 400 }
            );
        }

        const validModels = ["gemini-flash", "gemini-pro", "openai", "finetuned"];
        if (!validModels.includes(body.model)) {
            return NextResponse.json(
                {
                    error: `Invalid model. Must be one of: ${validModels.join(", ")}`,
                } satisfies AIError,
                { status: 400 }
            );
        }

        // Future: search for similar components via RAG
        const _similarComponents = await searchSimilarComponents(body.prompt);

        let code: string;

        switch (body.model) {
            case "gemini-flash":
                code = await generateWithGemini(body.prompt, body.image, "gemini-2.5-flash");
                break;
            case "gemini-pro":
                code = await generateWithGemini(body.prompt, body.image, "gemini-2.5-pro-preview-05-06");
                break;
            case "openai":
                code = await generateWithOpenAI(body.prompt, body.image);
                break;
            case "finetuned":
                code = await generateWithFineTuned(body.prompt);
                break;
            default:
                return NextResponse.json(
                    { error: "Unsupported model." } satisfies AIError,
                    { status: 400 }
                );
        }

        return NextResponse.json({ code } satisfies AIResponse);
    } catch (error: unknown) {
        console.error("[AI Generate Error]", error);

        const message =
            error instanceof Error ? error.message : "An unexpected error occurred.";

        return NextResponse.json(
            {
                error: "AI generation failed.",
                details: message,
            } satisfies AIError,
            { status: 500 }
        );
    }
}
