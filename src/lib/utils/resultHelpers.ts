import { TestResult, ExtendedTestResult, TemperamentScore } from "@/types";
import { getWeatherMetadata } from "@/components/result/weatherMetadata";
import { CHART_COLORS } from "@/lib/constants/theme";

const PSYCHOLOGY_TO_WEATHER: { [key: string]: string } = {
  Sanguinis: "Sunny",
  Koleris: "Stormy",
  Melankolis: "Rainy",
  Plegmatis: "Cloudy",
};

// Default temperaments - colors will be replaced by applyTemperamentColors
const DEFAULT_TEMPERAMENTS: TemperamentScore[] = [
  { name: "Sunny", percentage: 25, color: CHART_COLORS.inactive },
  { name: "Stormy", percentage: 25, color: CHART_COLORS.inactive },
  { name: "Rainy", percentage: 25, color: CHART_COLORS.inactive },
  { name: "Cloudy", percentage: 25, color: CHART_COLORS.inactive },
];

// Migrate old psychology names to weather names
function migrateTemperamentNames(temperaments: TemperamentScore[]): TemperamentScore[] {
  return temperaments.map((t) => ({
    ...t,
    name: PSYCHOLOGY_TO_WEATHER[t.name] || t.name,
  }));
}

// defaults for missing data + migrate old temperament names
export function applyExtendedDefaults(result: TestResult): ExtendedTestResult {
  const metadata = getWeatherMetadata(result.weatherType);
  const existingResult = result as Partial<ExtendedTestResult>;

  let temperaments = existingResult.temperaments;
  if (!Array.isArray(temperaments) || temperaments.length === 0) {
    temperaments = DEFAULT_TEMPERAMENTS;
  } else {
    temperaments = migrateTemperamentNames(temperaments);
  }

  // Use weatherMetadata defaults
  let developmentAreas = existingResult.developmentAreas;
  if (!Array.isArray(developmentAreas) || developmentAreas.length === 0) {
    developmentAreas = metadata?.defaultDevelopmentAreas || [];
  }

  let careerRecommendations = existingResult.careerRecommendations;
  if (!Array.isArray(careerRecommendations) || careerRecommendations.length === 0) {
    careerRecommendations = metadata?.defaultCareers || [];
  }

  return {
    ...result,
    temperaments,
    developmentAreas,
    careerRecommendations,
  };
}

// colors based on highest percentage
export function applyTemperamentColors(temperaments: TemperamentScore[]): TemperamentScore[] {
  if (!temperaments || temperaments.length === 0) return [];

  const maxPercentage = Math.max(...temperaments.map(t => t.percentage));

  return temperaments.map(t => ({
    ...t,
    color: t.percentage === maxPercentage ? CHART_COLORS.active : CHART_COLORS.inactive,
  }));
}
