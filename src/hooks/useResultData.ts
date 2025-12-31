// prepare & transform result data
import { useMemo } from "react";
import { ExtendedTestResult } from "@/types";
import { getTemperamentMetadata } from "@/lib/constants/temperamentMetadata";
import { applyTemperamentColors } from "@/lib/utils/resultHelpers";

interface UseResultDataReturn {
  subtitle: string;
  traits: string[];
  description: string;
  temperamentsWithColors: Array<{
    name: string;
    percentage: number;
    color?: string; // Optional to match TemperamentScore
  }>;
  developmentAreas: string[];
  careerRecommendations: string[];
}

export function useResultData(testResult: ExtendedTestResult): UseResultDataReturn {
  return useMemo(() => {
    const metadata = getTemperamentMetadata(testResult.weatherType);
    
    const subtitle = metadata?.subtitle || "Tipe Kepribadian";
    const traits = metadata?.traits || [];

    const description =
      testResult.analysisBody || metadata?.description || testResult.analysis;

    const temperamentsWithColors = applyTemperamentColors(testResult.temperaments || []);
    const developmentAreas =
      testResult.developmentAreas?.length > 0
        ? testResult.developmentAreas
        : metadata?.defaultDevelopmentAreas || [];

    const careerRecommendations =
      testResult.careerRecommendations?.length > 0
        ? testResult.careerRecommendations
        : metadata?.defaultCareers || [];

    return {
      subtitle,
      traits,
      description,
      temperamentsWithColors,
      developmentAreas,
      careerRecommendations,
    };
  }, [testResult]);
}
