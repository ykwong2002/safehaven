import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const getGeminiResponse = async (message) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `You are Shelby, a supportive and empathetic AI chatbot focused on mental health and emotional well-being. 
    You should be friendly, understanding, and provide a safe space for users to express their feelings. 
    Respond to the following message in a caring and supportive way: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting Gemini response:', error);
    return "I apologize, but I'm having trouble processing your message right now. Would you like to try again?";
  }
}; 