import groq from "./groqClient";
import { analyzePersonality, TemperamentScores } from "./temperamentLogic";
import type { Answer, UserData } from "@/types/index";

const MODEL_NAME = "llama-3.1-8b-instant";

export interface ExtendedAnalysisResult {
  weatherType: string;
  uniqueSummary: string;
  temperamentScores: TemperamentScores;
  developmentAreas: string[];
  careerRecommendations: string[];
}

function createSummaryPrompt(
  weatherType: string,
  userData: UserData,
  answerSummary: string,
): string {
  return `You are a creative psychologist analyzing a personality test based on the Four Temperaments (Sanguine=Sunny, Choleric=Stormy, Melancholic=Rainy, Phlegmatic=Cloudy).
The user, ${userData.nama}, has been determined to have the primary weather type: ${weatherType}.

Based on their specific answers below, generate a creative and insightful 2-sentence personality summary (around 30-50 words).

IMPORTANT:
1.  Start with a unique "Weather Title" based on their type (e.g., "You are the Soothing Afternoon Rain..." or "You are the Unpredictable Summer Storm...").
2.  The second sentence MUST be a personalized description that creatively explains WHY, connecting their metaphor to their personality traits (e.g., "...bringing quiet reflection and deep analysis to everything you touch." or "...full of passionate energy that can change the mood in an instant.").
3.  Do NOT add any extra text, greetings, or explanations. Only provide the 2-sentence summary.

User's key answers:
${answerSummary}

Generate the 2-sentence summary now:`;
}

function createExtendedPrompt(
  weatherType: string,
  temperamentScores: TemperamentScores,
): string {
  return `Based on the weather personality type ${weatherType} with composition:
- Sunny: ${temperamentScores.Sunny}%
- Stormy: ${temperamentScores.Stormy}%
- Rainy: ${temperamentScores.Rainy}%
- Cloudy: ${temperamentScores.Cloudy}%

Generate a JSON response with development areas and career recommendations:
{
  "developmentAreas": ["area1", "area2", "area3"],
  "careerRecommendations": ["career1", "career2", "career3", "career4"]
}

RULES:
1. developmentAreas: 3 specific areas for personal growth based on weaknesses (in Indonesian)
2. careerRecommendations: 4-5 specific career paths that match strengths
3. Return ONLY valid JSON, no extra text

Generate JSON now:`;
}

// Fallback data based on weather type
const FALLBACK_DATA: { [key: string]: { developmentAreas: string[]; careerRecommendations: string[] } } = {
  Sunny: {
    developmentAreas: ["Fokus dan konsentrasi", "Konsistensi dalam pekerjaan", "Manajemen waktu"],
    careerRecommendations: ["Marketing", "Sales", "Public Relations", "Entertainment", "Event Organizer"]
  },
  Rainy: {
    developmentAreas: ["Mengurangi overthinking", "Menerima ketidaksempurnaan", "Mengelola sensitivitas"],
    careerRecommendations: ["Research", "Accounting", "Engineering", "Writing", "Data Analysis"]
  },
  Stormy: {
    developmentAreas: ["Kesabaran dengan orang lain", "Empati dan mendengarkan", "Fleksibilitas"],
    careerRecommendations: ["Management", "Entrepreneurship", "Law", "Politics", "Business Development"]
  },
  Cloudy: {
    developmentAreas: ["Mengambil inisiatif", "Asertivitas dalam komunikasi", "Motivasi diri"],
    careerRecommendations: ["Counseling", "Human Resources", "Teaching", "Healthcare", "Customer Service"]
  }
};

export async function getPersonalityAnalysis(
  answers: Answer[],
  userData: UserData,
): Promise<ExtendedAnalysisResult> {
  // Get weather type and temperament scores
  const { weatherType, temperamentScores } = analyzePersonality(answers);

  const answerSummary = answers
    .map((a) => `- Q${a.questionId}: chose "${a.value}"`)
    .slice(0, 5) // 5 jawaban pertama untuk konteks
    .join("\n");

  // Create prompts
  const summaryPrompt = createSummaryPrompt(weatherType, userData, answerSummary);
  const extendedPrompt = createExtendedPrompt(weatherType, temperamentScores);

  let uniqueSummary = "";
  let developmentAreas = FALLBACK_DATA[weatherType]?.developmentAreas || FALLBACK_DATA.Cloudy.developmentAreas;
  let careerRecommendations = FALLBACK_DATA[weatherType]?.careerRecommendations || FALLBACK_DATA.Cloudy.careerRecommendations;

  try {
    console.log(`Attempting to call Groq model: ${MODEL_NAME}...`);

    // First call: Get the 2-sentence summary
    const summaryCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: summaryPrompt }],
      model: MODEL_NAME,
      temperature: 0.8,
      max_tokens: 200,
      top_p: 1,
    });

    uniqueSummary = summaryCompletion.choices[0]?.message?.content?.trim() || "";

    if (!uniqueSummary) {
      console.warn("Groq returned an empty summary.");
      throw new Error("AI did not return a summary.");
    }

    console.log("Groq call successful. Summary obtained.");

    // Second call: Get development areas and career recommendations
    try {
      const extendedCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: extendedPrompt }],
        model: MODEL_NAME,
        temperature: 0.7,
        max_tokens: 300,
        top_p: 1,
      });

      const extendedResponse = extendedCompletion.choices[0]?.message?.content?.trim() || "";

      if (extendedResponse) {
        // Clean up response - remove markdown code blocks if present
        let cleanedResponse = extendedResponse;
        if (cleanedResponse.startsWith("```json")) {
          cleanedResponse = cleanedResponse.slice(7);
        }
        if (cleanedResponse.startsWith("```")) {
          cleanedResponse = cleanedResponse.slice(3);
        }
        if (cleanedResponse.endsWith("```")) {
          cleanedResponse = cleanedResponse.slice(0, -3);
        }
        cleanedResponse = cleanedResponse.trim();

        const parsed = JSON.parse(cleanedResponse);

        if (Array.isArray(parsed.developmentAreas) && parsed.developmentAreas.length >= 3) {
          developmentAreas = parsed.developmentAreas;
        }
        if (Array.isArray(parsed.careerRecommendations) && parsed.careerRecommendations.length >= 4) {
          careerRecommendations = parsed.careerRecommendations;
        }

        console.log("Extended analysis obtained.");
      }
    } catch (extendedError) {
      console.warn("Failed to get extended analysis, using fallback data:", extendedError);
      // Use fallback data (already set above)
    }

    return {
      weatherType,
      uniqueSummary,
      temperamentScores,
      developmentAreas,
      careerRecommendations,
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error(`Error calling Groq AI (${MODEL_NAME}):`, errorMessage);
    throw new Error(`Failed to generate AI analysis using ${MODEL_NAME}.`);
  }
}
