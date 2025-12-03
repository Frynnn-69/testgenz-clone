export interface Answer {
  questionId: number;
  value: string; // ID Opsi ("A", "B", "C", "D")
}

export interface UserData {
  nama: string;
  email?: string;
}

// Tipe untuk respons dari endpoint /api/analyze
export interface AnalysisResponse {
  result: string; // Nama tipe cuaca (e.g., "Sunny", "Rainy")
  analysis: string; // Kalimat unique summary dari AI
  analysisTitle?: string; // First-sentence title parsed from AI summary
  analysisShortTitle?: string; // Compact short title (derived) for UI
  analysisBody?: string; // Remaining narrative parsed from AI summary
  temperaments: TemperamentScore[]; // Temperament composition breakdown
  developmentAreas: string[]; // Areas to improve
  careerRecommendations: string[]; // Suitable career recommendations
}

export interface ErrorResponse {
  error: string;
}

// Interface for test result stored in localStorage
export interface TestResult {
  weatherType: string; // "Sunny" | "Rainy" | "Stormy" | "Cloudy"
  analysis: string; // AI-generated summary
  analysisTitle?: string; // Parsed first-sentence title from AI summary
  analysisShortTitle?: string; // Compact short title (derived) for UI
  analysisBody?: string; // Remaining narrative parsed from AI summary
  userData: UserData; // User information
  timestamp: string; // ISO 8601 format
}

// Interface for temperament score breakdown
export interface TemperamentScore {
  name: string; // "Sanguinis" | "Koleris" | "Melankolis" | "Plegmatis"
  percentage: number; // 0-100
  color: string; // Chakra color token (e.g., "orange.400")
}

// Extended test result with temperament breakdown and recommendations
export interface ExtendedTestResult extends TestResult {
  temperaments: TemperamentScore[]; // Temperament composition breakdown
  developmentAreas: string[]; // Areas to improve
  careerRecommendations: string[]; // Suitable career recommendations
}
