import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TestResult, ExtendedTestResult } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Ensures a TestResult has all ExtendedTestResult fields with defaults.
 * Used by localStorage to guarantee consistency.
 */
export function applyExtendedDefaults(
  result: TestResult | ExtendedTestResult
): ExtendedTestResult {
  return {
    ...result,
    temperaments: (result as ExtendedTestResult).temperaments || [],
    developmentAreas: (result as ExtendedTestResult).developmentAreas || [],
    careerRecommendations: (result as ExtendedTestResult).careerRecommendations || [],
  };
}
