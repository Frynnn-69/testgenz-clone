import { NextResponse } from "next/server";
import { getPersonalityAnalysis } from "@/lib/aiResponseHandler";
import type {
  Answer,
  UserData,
  AnalysisResponse,
  ErrorResponse,
  TemperamentScore,
} from "@/types/index";

// Weather type colors for UI display
const WEATHER_COLORS: { [key: string]: string } = {
  Sunny: "orange.400",
  Stormy: "red.500",
  Rainy: "blue.500",
  Cloudy: "green.400",
};

interface RequestBody {
  answers: Answer[];
  userData: UserData;
}

export async function POST(
  request: Request,
): Promise<NextResponse<AnalysisResponse | ErrorResponse>> {
  try {
    const body: RequestBody = await request.json();
    const { answers, userData } = body;

    // Validation
    if (
      !answers ||
      !Array.isArray(answers) ||
      answers.length === 0 ||
      !userData ||
      typeof userData !== "object" ||
      !userData.nama ||
      typeof userData.nama !== "string"
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid input: Missing or malformed answers or user data (name is required).",
        },
        { status: 400 },
      );
    }

    const {
      weatherType,
      uniqueSummary,
      analysisTitle,
      analysisShortTitle,
      analysisBody,
      temperamentScores,
      developmentAreas,
      careerRecommendations,
    } = await getPersonalityAnalysis(answers, userData);

    console.log("AI analysis parsed (server):", {
      analysisTitle,
      analysisShortTitle,
      analysisBody,
    });

    // Convert weather scores to array format with colors
    const temperaments: TemperamentScore[] = [
      {
        name: "Sunny",
        percentage: temperamentScores.Sunny,
        color: WEATHER_COLORS.Sunny,
      },
      {
        name: "Stormy",
        percentage: temperamentScores.Stormy,
        color: WEATHER_COLORS.Stormy,
      },
      {
        name: "Rainy",
        percentage: temperamentScores.Rainy,
        color: WEATHER_COLORS.Rainy,
      },
      {
        name: "Cloudy",
        percentage: temperamentScores.Cloudy,
        color: WEATHER_COLORS.Cloudy,
      },
    ];

    const responseData: AnalysisResponse = {
      result: weatherType,
      analysis: uniqueSummary,
      analysisTitle,
      analysisShortTitle,
      analysisBody,
      temperaments,
      developmentAreas,
      careerRecommendations,
    };
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error in /api/analyze POST handler:", error);
    const message =
      error instanceof Error
        ? error.message
        : "An unknown error occurred during analysis.";

    const errorResponse: ErrorResponse = { error: message };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
