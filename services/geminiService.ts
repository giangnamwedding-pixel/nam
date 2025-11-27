
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this context, we assume the key is provided by the environment.
  console.warn("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });
const model = 'gemini-2.5-flash-image';

export const generateImageWithGemini = async (
  prompt: string,
  base64Image?: string,
  mimeType?: string
): Promise<string> => {
  try {
    const parts: any[] = [];
    if (base64Image && mimeType) {
        parts.push({
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
        });
    }
    parts.push({ text: prompt });

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: parts,
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const imagePart = response.candidates?.[0]?.content?.parts?.find(p => 'inlineData' in p && p.inlineData);
    if (imagePart && 'inlineData' in imagePart && imagePart.inlineData) {
      return imagePart.inlineData.data;
    } else {
      throw new Error("No image data found in the API response.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Rethrow a more user-friendly error or handle it as needed
    throw new Error("Failed to generate image with Gemini API.");
  }
};
