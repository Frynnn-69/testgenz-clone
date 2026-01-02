"use client";

import { useTestResult } from "@/hooks/useTestResult";
import { CapybaraLoader } from "@/components/common/CapybaraLoader";
import { ErrorState } from "@/components/common/ErrorState";
import { ResultPageLayout } from "@/components/result/ResultPageLayout";

export const ResultClient = () => {
  const { testResult, isLoading, error } = useTestResult();

  if (isLoading) {
    return <CapybaraLoader message="Mengambil hasil..." />;
  }

  if (error || !testResult) {
    return <ErrorState message={error || "We couldn't find your test result. Please complete the test to see your personality analysis."} />;
  }
  return <ResultPageLayout testResult={testResult} />;
}
