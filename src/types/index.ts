export interface Answer {
  questionId: number;
  value: string; // ID Opsi ("A", "B", "C", "D")
}

export interface UserData {
  nama: string;
  email?: string;
}

// response endpoint /api/analyze
export interface AnalysisResponse {
  result: string; 
  analysis: string; 
  analysisTitle?: string; // First-sentence title parsed from AI summary
  analysisShortTitle?: string; 
  analysisBody?: string; // Remaining narrative parsed from AI summary
  temperaments: TemperamentScore[]; 
  developmentAreas: string[]; 
  careerRecommendations: string[]; 
}

export interface ErrorResponse {
  error: string;
}

// Interface for test result stored in localStorage
export interface TestResult {
  weatherType: string; // "Sunny" | "Rainy" | "Stormy" | "Cloudy"
  analysis: string; // AI-generated summary
  analysisTitle?: string;
  analysisShortTitle?: string; 
  analysisBody?: string; 
  userData: UserData;
  timestamp: string; 
}

export interface ExtendedTestResult extends TestResult {
  temperaments: TemperamentScore[]; 
  developmentAreas: string[]; 
  careerRecommendations: string[]; 
}

export interface TemperamentScore {
  name: string;
  percentage: number;
  color?: string; 
}