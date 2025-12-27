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
    return <ErrorState error={error} />;
  }
  return <ResultPageLayout testResult={testResult} />;
}
