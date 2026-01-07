// fetch test result dari localStorage
import { useState, useEffect } from "react";
import { ExtendedTestResult } from "@/types";
import { getTestResult, getTestResultByTimestamp } from "@/lib/localStorage";
import { applyExtendedDefaults } from "@/lib/utils/resultHelpers";

interface UseTestResultReturn {
  testResult: ExtendedTestResult | null;
  isLoading: boolean;
  error: string | null;
}

export function useTestResult(timestamp?: string): UseTestResultReturn {
  const [testResult, setTestResult] = useState<ExtendedTestResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // If timestamp provided, get specific result from history
      const result = timestamp 
        ? getTestResultByTimestamp(timestamp)
        : getTestResult();

      if (!result) {
        setError("No test result found. Please complete the test first.");
      } else {
        const resultWithFallbacks = applyExtendedDefaults(result);
        setTestResult(resultWithFallbacks);
      }
    } catch (err) {
      console.error("Error loading test result:", err);
      setError("Failed to load test result. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [timestamp]);

  return { testResult, isLoading, error };
}
