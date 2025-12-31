import groq from "./groqClient";
import { analyzePersonality, TemperamentScores } from "./temperamentLogic";
import { getTemperamentMetadata } from "@/lib/constants/temperamentMetadata";
import { FALLBACK_DATA } from "@/lib/constants/fallback";
import type { Answer, UserData } from "@/types/index";

const MODEL_NAME = "llama-3.1-8b-instant";

// Configuration constants for AI processing
const CONFIG = {
  ANSWER_CONTEXT_LIMIT: 5,      // Number of answers to include in prompt
  SUMMARY_MAX_TOKENS: 200,       // Max tokens for summary generation
  SUMMARY_TEMPERATURE: 0.8,      // Creativity level for summary
  EXTENDED_MAX_TOKENS: 300,      // Max tokens for extended analysis
  EXTENDED_TEMPERATURE: 0.7,     // Creativity level for extended data
  SHORT_TITLE_MAX_WORDS: 5,      // Max words in short title
  AI_TIMEOUT_MS: 15000,          // Timeout for AI calls (15 seconds)
};

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

/**
 * Wraps an AI call with timeout protection.
 * Rejects if the call takes longer than CONFIG.AI_TIMEOUT_MS.
 */
async function callWithTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = CONFIG.AI_TIMEOUT_MS
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error(`AI call timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]);
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

/**
 * Removes markdown code block markers from AI responses.
 * Handles ```json, ```, and other variations.
 */
function cleanMarkdownResponse(text: string): string {
  let cleaned = text.trim();
  
  // Remove opening code block markers
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.slice(3);
  }
  
  // Remove closing code block markers
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.slice(0, -3);
  }
  
  return cleaned.trim();
}

/**
 * Parses AI-generated summary into title and body components.
 * Uses multiple fallback strategies for robustness.
 */
function parseAISummary(
  rawSummary: string,
  weatherType: string
): { title: string; body: string } {
  const cleanedSummary = rawSummary
    .trim()
    .replace(/^[\"""']+|[\"""']+$/g, "")
    .trim();

  let title = "";
  let body = "";

  // Split by sentence terminator (., !, ?)
  const sentenceMatch = cleanedSummary.match(/^(.+?[.!?])\s*([\s\S]*)$/);
  if (sentenceMatch) {
    title = sentenceMatch[1].trim();
    body = (sentenceMatch[2] || "").trim();
    console.log("Parsed AI summary into title/body (sentence):", { title, body });
    return { title, body };
  }

  // Split by newline
  const parts = cleanedSummary
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length >= 2) {
    title = parts[0];
    body = parts.slice(1).join(" ");
    console.log("Parsed AI summary into title/body (newline):", { title, body });
    return { title, body };
  }

  // Split by comma
  if (cleanedSummary.includes(",")) {
    const idx = cleanedSummary.indexOf(",");
    title = cleanedSummary.slice(0, idx + 1).trim();
    body = cleanedSummary.slice(idx + 1).trim();
    console.log("Parsed AI summary into title/body (comma):", { title, body });
    return { title, body };
  }

  // Use metadata fallback
  const metadata = getTemperamentMetadata(weatherType);
  title =
    metadata?.subtitle ||
    metadata?.name ||
    `Tipe Kepribadian: ${weatherType}`;
  body = cleanedSummary;
  console.warn("AI summary parsing fallback used (metadata):", { fallbackTitle: title });
  
  return { title, body };
}

/**
 * Derives a shortened version of the full title for UI display.
 * Removes common prefixes and limits to MAX_WORDS.
 */
function deriveShortTitle(fullTitle: string, weatherType: string): string {
  if (!fullTitle || typeof fullTitle !== "string") {
    const metadata = getTemperamentMetadata(weatherType);
    return metadata?.name || `Tipe ${weatherType}`;
  }

  const cleaned = fullTitle
    .trim()
    .replace(/^[\"""']+|[\"""']+$/g, "")
    .trim();

  // Remove common leading phrases like "You are" or "You're"
  const withoutPrefix = cleaned
    .replace(/^(You\s+are|You're|You\'re)\s+/i, "")
    .trim();

  // Take first up to MAX_WORDS
  const words = withoutPrefix.split(/\s+/).filter(Boolean);
  const short = words.slice(0, CONFIG.SHORT_TITLE_MAX_WORDS).join(" ");

  // Append ellipsis if original is longer
  return short.length < withoutPrefix.length ? `${short}…` : short;
}


/**
 * Generates comprehensive personality analysis using Groq AI.
 * 
 * Flow:
 * 1. Analyzes temperament scores from user answers
 * 2. Calls AI for personalized narrative (2-sentence summary)
 * 3. Calls AI for development areas + career recommendations
 * 4. Falls back to static data if AI fails
 * 
 * @param answers - User's test responses (question ID + chosen value)
 * @param userData - User profile information (name, etc.)
 * @returns Complete analysis with weather type, parsed narrative, and recommendations
 * @throws Error if both AI and fallback mechanisms fail
 */
export async function getPersonalityAnalysis(
  answers: Answer[],
  userData: UserData,
): Promise<ExtendedAnalysisResult> {
  // Get weather type and temperament scores
  const { weatherType, temperamentScores } = analyzePersonality(answers);

  const answerSummary = answers
    .map((a) => `- Q${a.questionId}: chose "${a.value}"`)
    .slice(0, CONFIG.ANSWER_CONTEXT_LIMIT)
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

    // Parallelize both AI calls for better performance
    // Use allSettled to handle partial failures gracefully
    const [summaryResult, extendedResult] = await Promise.allSettled([
      // Call 1: Summary 
      callWithTimeout(
        groq.chat.completions.create({
          messages: [{ role: "user", content: summaryPrompt }],
          model: MODEL_NAME,
          temperature: CONFIG.SUMMARY_TEMPERATURE,
          max_tokens: CONFIG.SUMMARY_MAX_TOKENS,
          top_p: 1,
        })
      ),
      // Call 2: Extended analysis 
      callWithTimeout(
        groq.chat.completions.create({
          messages: [{ role: "user", content: extendedPrompt }],
          model: MODEL_NAME,
          temperature: CONFIG.EXTENDED_TEMPERATURE,
          max_tokens: CONFIG.EXTENDED_MAX_TOKENS,
          top_p: 1,
        })
      ),
    ]);

    // Process summary result
    if (summaryResult.status === "fulfilled") {
      uniqueSummary =
        summaryResult.value.choices[0]?.message?.content?.trim() || "";

      if (uniqueSummary) {
        const parsed = parseAISummary(uniqueSummary, weatherType);
        analysisTitle = parsed.title;
        analysisBody = parsed.body;
        analysisShortTitle = deriveShortTitle(analysisTitle, weatherType);
        console.log("Derived short title (server):", analysisShortTitle);
        console.log("Groq call successful. Summary obtained.");
      } else {
        console.warn("Groq returned an empty summary.");
        throw new Error("AI did not return a summary.");
      }
    } else {
      console.warn("Summary AI call failed:", summaryResult.reason);
      throw new Error("Failed to get AI summary");
    }

    // Process extended analysis result (optional, uses fallback on failure)
    if (extendedResult.status === "fulfilled") {
      const extendedResponse =
        extendedResult.value.choices[0]?.message?.content?.trim() || "";

      if (extendedResponse) {
        try {
          const cleanedResponse = cleanMarkdownResponse(extendedResponse);
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
        } catch (parseError) {
          console.warn(
            "Failed to parse extended analysis, using fallback data:",
            parseError
          );
        }
      }
    } else {
      console.warn(
        "Extended analysis AI call failed, using fallback data:",
        extendedResult.reason
      );
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
    throw new Error(
      `Failed to generate AI analysis using ${MODEL_NAME}: ${errorMessage}`
    );
  }
}
