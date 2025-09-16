
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

export async function callGemini(prompt: string): Promise<string> {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: "You are a helpful and expert tech consultant. Provide concise, accurate, and insightful answers. Format your response for a terminal output.",
            }
        });

        // Use the .text property for direct text access
        const text = response.text;
        
        if (text) {
            return text;
        } else {
            return "The AI returned an empty response. Please try rephrasing your question.";
        }

    } catch (error) {
        console.error("Gemini API call failed:", error);
        if (error instanceof Error) {
            return `Error calling Gemini API: ${error.message}. Please check API key and network connection.`;
        }
        return "An unknown error occurred while contacting the Gemini API.";
    }
}
