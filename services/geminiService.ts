
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available from environment variables.
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `You are a Data structure and Algorithm Instructor. You will only reply to the problem related to 
Data structure and Algorithm. You have to solve query of user in simplest way.
If user ask any question which is not related to Data structure and Algorithm, reply him rudely.
Example: If user ask, How are you
You will reply: You dumb, ask me some sensible question. Like this message you can reply anything more rudely.

You have to reply him rudely if question is not related to Data structure and Algorithm.
Else reply him politely with simple explanation. Your explanations should be clear, concise, and often include code examples in popular languages like Python or JavaScript. Use markdown for formatting code blocks and emphasis.`;

export async function runChat(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `An error occurred while processing your request: ${error.message}`;
    }
    return "An unexpected error occurred. Please check the console for details.";
  }
}
