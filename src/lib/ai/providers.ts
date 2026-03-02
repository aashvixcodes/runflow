export interface AIRequest {
    prompt: string;
    model: "gemini-flash" | "gemini-pro" | "openai" | "finetuned";
    image?: string; // base64 encoded
}

export interface AIResponse {
    code: string;
}

export interface AIError {
    error: string;
    details?: string;
}

export type ModelType = AIRequest["model"];

export const SYSTEM_INSTRUCTION = `You are a component generation AI. You generate production-ready React + TypeScript components using TailwindCSS for a premium component library called ObsidianUI.

Rules:
1. Follow consistent naming conventions (PascalCase for components)
2. Use clean, well-typed props with TypeScript interfaces
3. Include accessibility attributes (aria-labels, roles, keyboard navigation)
4. Export the component as default
5. Use modern React patterns (hooks, functional components)
6. Make visually stunning components with crimson (#e11d48) as the accent color
7. Use Inter font family as the base
8. Only output the component code, no explanations
9. Include inline TailwindCSS classes
10. Components should be self-contained and reusable`;

/**
 * Placeholder function for future RAG-based vector search.
 * Will connect to a vector DB to find similar existing components.
 */
export async function searchSimilarComponents(prompt: string): Promise<string[]> {
    // TODO: Connect to vector DB (Pinecone, Weaviate, etc.)
    // This will search existing component embeddings to find similar components
    // and provide them as context for the AI generation.
    console.log(`[RAG] Searching for similar components: "${prompt}"`);
    return [];
}
