import { TestResult, ExtendedTestResult } from "@/types";

// Validasi test result (weatherType, analysis, timestamp, userData & format)
function validateBaseFields(data: unknown): data is TestResult {
  if (!data || typeof data !== "object") return false;

  const result = data as Record<string, unknown>;

  if (typeof result.weatherType !== "string" || !result.weatherType) return false;
  if (typeof result.analysis !== "string" || !result.analysis) return false;
  if (typeof result.timestamp !== "string" || !result.timestamp) return false;

  if (!result.userData || typeof result.userData !== "object") return false;
  
  const userData = result.userData as Record<string, unknown>;
  if (typeof userData.nama !== "string" || !userData.nama) return false;
  
  if (userData.email !== undefined && typeof userData.email !== "string") {
    return false;
  }

  return true;
}

// wrapper validateBaseFields
export function validateTestResult(data: unknown): data is TestResult {
  return validateBaseFields(data);
}

//future needs
export function validateExtendedTestResult(data: unknown): data is ExtendedTestResult {
  if (!validateBaseFields(data)) return false;

  const extData = data as unknown as Record<string, unknown>;

  if (!Array.isArray(extData.temperaments)) return false;

  for (const temp of extData.temperaments) {
    if (!temp || typeof temp !== "object") return false;
    const t = temp as Record<string, unknown>;
    if (typeof t.name !== "string" || !t.name) return false;
    if (typeof t.percentage !== "number" || t.percentage < 0 || t.percentage > 100) {
      return false;
    }
  
    if (t.color !== undefined && typeof t.color !== "string") return false;
  }

  if (!Array.isArray(extData.developmentAreas)) return false;
  if (!Array.isArray(extData.careerRecommendations)) return false;

  return true;
}
