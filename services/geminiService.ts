/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import { GoogleGenAI } from "@google/genai";

// We assume process.env.API_KEY is available as per instructions.
// In a real Vite app, this might be import.meta.env.VITE_API_KEY, 
// but sticking to instructions: process.env.API_KEY
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export async function generateBadgeAdvice(query: string, useThinking: boolean): Promise<string> {
  try {
    const modelId = useThinking ? 'gemini-3-pro-preview' : 'gemini-2.5-flash-lite';
    
    const config: any = {
      temperature: 0.7,
    };

    if (useThinking) {
      // High budget for complex reasoning about badge strategies
      config.thinkingConfig = { thinkingBudget: 32768 };
    }

    const systemInstruction = `You are an expert on GitHub Profile Achievements and Badges. 
    Your goal is to help users earn badges like Pull Shark, Galaxy Brain, YOLO, etc.
    Provide clear, actionable, and accurate advice. 
    If a badge is retired, tell them.
    If a user asks for a strategy, give step-by-step instructions.
    Be encouraging and professional.`;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: [
        { role: 'user', parts: [{ text: query }] }
      ],
      config: {
        ...config,
        systemInstruction,
      }
    });

    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error while fetching the badge advice. Please check your API key or try again later.";
  }
}
