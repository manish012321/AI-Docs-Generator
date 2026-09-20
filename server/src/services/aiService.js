import { GoogleGenerativeAI } from "@google/generative-ai";
import { getPrompt } from "./prompt.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const FREE_MODELS = [
  "gemini-3.6-flash",
  "gemini-3.5-flash-lite",
  "gemini-2.5-flash",
];

const runPrompt = async (prompt) => {
  let lastError = null;
  for (const modelName of FREE_MODELS) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.log(`Model ${modelName} failed: ${error.message}`);
      lastError = error;
    }
  }
  throw new Error("AI generation failed: " + lastError?.message);
};


export const generateStructuredDoc = async (documentType, rawText) => {
  const prompt = getPrompt(documentType, rawText);
  const text = await runPrompt(prompt);
  const cleaned = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
};


export const generateDocument = async (documentType, rawText) => {
  const prompt = getPrompt(documentType, rawText);
  const text = await runPrompt(prompt);
  return text.replace(/```/g, "").trim();
};