import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Free Gemini models — tried in order until one works
const FREE_MODELS = [
    "gemini-3.6-flash",
    "gemini-2.5-flash",
    "gemini-2.0-flash",
];

const getPrompt = (rawText) => `
You are an expert business process consultant and SOP writer with 20 years of experience.

Transform the following raw process description into a highly detailed, professional Standard Operating Procedure.

RAW PROCESS:
${rawText}

REQUIREMENTS:
- Minimum 5 to 8 detailed steps
- Each step description must be 2 to 3 sentences explaining exactly what to do
- Assign realistic specific job roles to each step
- Add warnings for risks, compliance issues, or critical actions
- Use professional business language
- Steps must flow logically from start to finish

Return ONLY this exact JSON, no markdown, no backticks, no explanation:
{
  "title": "Professional specific SOP title",
  "overview": "2-3 sentence overview of what this SOP covers and why it matters",
  "steps": [
    {
      "step": 1,
      "title": "Short step title",
      "description": "Detailed 2-3 sentence description of exactly what to do",
      "role": "Specific job title responsible",
      "warning": "Critical warning or null",
      "duration": "Estimated time e.g. 5 minutes"
    }
  ]
}
`;

export const generateSOP = async (rawText) => {
    const prompt = getPrompt(rawText);
    let lastError = null;

    for (const modelName of FREE_MODELS) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent(prompt);
            const text = result.response.text();
            const cleaned = text.replace(/```json|```/g, "").trim();
            return JSON.parse(cleaned);
        } catch (error) {
            console.log(`Model ${modelName} failed: ${error.message}`);
            lastError = error;
            continue;
        }
    }

    throw new Error("AI generation failed: " + lastError?.message);
};