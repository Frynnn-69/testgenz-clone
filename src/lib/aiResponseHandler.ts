import groq from "./groqClient";
import { analyzePersonality, TemperamentScores } from "./temperamentLogic";
import { getWeatherMetadata } from "@/components/result/weatherMetadata";
import type { Answer, UserData } from "@/types/index";

const MODEL_NAME = "llama-3.1-8b-instant";

export interface ExtendedAnalysisResult {
  weatherType: string;
  uniqueSummary: string;
  // Optional structured fields derived from the AI summary
  analysisTitle?: string;
  analysisShortTitle?: string;
  analysisBody?: string;
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

Generate EXACTLY two sentences with the following strict rules:

1) First sentence (SHORT TITLE, in English): Provide a concise "Weather Title" phrase (preferably 3-6 words) that starts like "You are ..." or a short imaginative phrase in English. Keep it short and punchy — think headline/label, not a long sentence.
2) Second sentence (BODY, in Bahasa Indonesia): Provide a friendly, simple narrative in Indonesian (around 15-35 words) that explains WHY that title fits the user. Avoid heavy technical terms; use conversational, easy-to-read language.
3) Return only the two sentences. Do NOT add any extra text, lists, or commentary.

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
const FALLBACK_DATA: {
  [key: string]: {
    developmentAreas: string[];
    careerRecommendations: string[];
  };
} = {
  Sunny: {
    developmentAreas: [
      "Fokus dan konsentrasi",
      "Konsistensi dalam pekerjaan",
      "Manajemen waktu",
    ],
    careerRecommendations: [
      "Marketing",
      "Sales",
      "Public Relations",
      "Entertainment",
      "Event Organizer",
    ],
  },
  Rainy: {
    developmentAreas: [
      "Mengurangi overthinking",
      "Menerima ketidaksempurnaan",
      "Mengelola sensitivitas",
    ],
    careerRecommendations: [
      "Research",
      "Accounting",
      "Engineering",
      "Writing",
      "Data Analysis",
    ],
  },
  Stormy: {
    developmentAreas: [
      "Kesabaran dengan orang lain",
      "Empati dan mendengarkan",
      "Fleksibilitas",
    ],
    careerRecommendations: [
      "Management",
      "Entrepreneurship",
      "Law",
      "Politics",
      "Business Development",
    ],
  },
  Cloudy: {
    developmentAreas: [
      "Mengambil inisiatif",
      "Asertivitas dalam komunikasi",
      "Motivasi diri",
    ],
    careerRecommendations: [
      "Counseling",
      "Human Resources",
      "Teaching",
      "Healthcare",
      "Customer Service",
    ],
  },
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
  const summaryPrompt = createSummaryPrompt(
    weatherType,
    userData,
    answerSummary,
  );
  const extendedPrompt = createExtendedPrompt(weatherType, temperamentScores);

  let uniqueSummary = "";
  // Parsed fields for structured summary (title, short title, and body)
  let analysisTitle = "";
  let analysisShortTitle = "";
  let analysisBody = "";
  let developmentAreas =
    FALLBACK_DATA[weatherType]?.developmentAreas ||
    FALLBACK_DATA.Cloudy.developmentAreas;
  let careerRecommendations =
    FALLBACK_DATA[weatherType]?.careerRecommendations ||
    FALLBACK_DATA.Cloudy.careerRecommendations;

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

    uniqueSummary =
      summaryCompletion.choices[0]?.message?.content?.trim() || "";

    if (!uniqueSummary) {
      console.warn("Groq returned an empty summary.");
      throw new Error("AI did not return a summary.");
    }

    // Server-side parsing: extract first sentence as title, remainder as body.
    const cleanedSummary = uniqueSummary
      .replace(/^["“”']+|["“”']+$/g, "")
      .trim();
    let title = "";
    let body = "";

    // Try to split by first sentence terminator (., !, ?)
    const sentenceMatch = cleanedSummary.match(/^(.+?[.!?])\s*([\s\S]*)$/);
    if (sentenceMatch) {
      title = sentenceMatch[1].trim();
      body = (sentenceMatch[2] || "").trim();
      console.log("Parsed AI summary into title/body (server):", {
        title,
        body,
      });
    } else {
      // Fallbacks: newline, comma, or metadata
      const parts = cleanedSummary
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      if (parts.length >= 2) {
        title = parts[0];
        body = parts.slice(1).join(" ");
        console.log("Parsed AI summary by newline into title/body (server):", {
          title,
          body,
        });
      } else if (cleanedSummary.includes(",")) {
        const idx = cleanedSummary.indexOf(",");
        title = cleanedSummary.slice(0, idx + 1).trim();
        body = cleanedSummary.slice(idx + 1).trim();
        console.log("Parsed AI summary by comma into title/body (server):", {
          title,
          body,
        });
      } else {
        const metadata = getWeatherMetadata(weatherType);
        title =
          metadata?.subtitle ||
          metadata?.name ||
          `Tipe Kepribadian: ${weatherType}`;
        body = cleanedSummary;
        console.warn(
          "AI summary parsing fallback used (server): using metadata title",
          { fallbackTitle: title },
        );
      }
    }

    analysisTitle = title;
    analysisBody = body;

    // Derive a compact short title for UI (safety net)
    try {
      const derive = (fullTitle: string) => {
        if (!fullTitle || typeof fullTitle !== "string") return "";
        const cleaned = fullTitle
          .trim()
          .replace(/^["“”']+|["“”']+$/g, "")
          .trim();
        // Remove common leading phrases like "You are" or "You're"
        const withoutPrefix = cleaned
          .replace(/^(You\s+are|You're|You\'re)\s+/i, "")
          .trim();
        // Take first up to 5 words
        const words = withoutPrefix.split(/\s+/).filter(Boolean);
        const MAX_WORDS = 5;
        const short = words.slice(0, MAX_WORDS).join(" ");
        // Append ellipsis if original is longer than our short
        return short.length < withoutPrefix.length ? `${short}…` : short;
      };

      analysisShortTitle = derive(analysisTitle);
      if (!analysisShortTitle) {
        // As final fallback, use a metadata name or the first few words of body
        const metadata = getWeatherMetadata(weatherType);
        analysisShortTitle =
          metadata?.name ||
          (analysisBody
            ? analysisBody.split(/\s+/).slice(0, 4).join(" ") + "…"
            : `Tipe ${weatherType}`);
      }

      console.log("Derived short title (server):", analysisShortTitle);
    } catch (err) {
      console.warn("Failed to derive short title, ignoring:", err);
      analysisShortTitle =
        analysisTitle ||
        (getWeatherMetadata(weatherType)?.name ?? `Tipe ${weatherType}`);
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

      const extendedResponse =
        extendedCompletion.choices[0]?.message?.content?.trim() || "";

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

        if (
          Array.isArray(parsed.developmentAreas) &&
          parsed.developmentAreas.length >= 3
        ) {
          developmentAreas = parsed.developmentAreas;
        }
        if (
          Array.isArray(parsed.careerRecommendations) &&
          parsed.careerRecommendations.length >= 4
        ) {
          careerRecommendations = parsed.careerRecommendations;
        }

        console.log("Extended analysis obtained.");
      }
    } catch (extendedError) {
      console.warn(
        "Failed to get extended analysis, using fallback data:",
        extendedError,
      );
      // Use fallback data (already set above)
    }

    return {
      weatherType,
      uniqueSummary,
      analysisTitle,
      analysisShortTitle,
      analysisBody,
      temperamentScores,
      developmentAreas,
      careerRecommendations,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(`Error calling Groq AI (${MODEL_NAME}):`, errorMessage);
    throw new Error(`Failed to generate AI analysis using ${MODEL_NAME}.`);
  }
}
