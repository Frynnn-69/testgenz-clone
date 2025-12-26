// API handler for test submission
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { ExtendedTestResult, AnalysisResponse, UserData, Answer } from "@/types";
import { saveTestResult, saveTestResultToHistory } from "@/lib/localStorage";
import { getCurrentUser } from "@/lib/userAuth";

interface UseTestSubmitReturn {
  isSubmitting: boolean;
  submitError: string | null;
  submitTest: (answers: Record<number, string>) => Promise<void>;
}

export function useTestSubmit(): UseTestSubmitReturn {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submitTest = useCallback(async (answers: Record<number, string>) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const formattedAnswers: Answer[] = Object.entries(answers).map(([key, value]) => ({
      questionId: parseInt(key, 10),
      value: value,
    }));

    const userData: UserData = getCurrentUser() || {
      nama: "Tester",
      email: undefined,
    };

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: formattedAnswers,
          userData: userData,
        }),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error || "Gagal menganalisis jawaban.");
      }

      const result: AnalysisResponse = await response.json();

      // Create test result object
      const testResult: ExtendedTestResult = {
        weatherType: result.result,
        analysis: result.analysis,
        analysisTitle: result.analysisTitle,
        analysisShortTitle: result.analysisShortTitle,
        analysisBody: result.analysisBody,
        userData: userData,
        timestamp: new Date().toISOString(),
        temperaments: result.temperaments,
        developmentAreas: result.developmentAreas,
        careerRecommendations: result.careerRecommendations,
      };

      // Save to localStorage
      saveTestResult(testResult);
      saveTestResultToHistory(testResult);

      router.push("/result");
    } catch (err) {
      setIsSubmitting(false);
      const errorMessage = err instanceof Error
        ? err.message
        : "Terjadi kesalahan saat memproses hasil tes.";
      setSubmitError(errorMessage);
      console.error("Error analyzing test:", err);
    }
  }, [router]);

  return {
    isSubmitting,
    submitError,
    submitTest,
  };
}
