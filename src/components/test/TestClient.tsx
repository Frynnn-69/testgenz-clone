"use client";

import { useTestAuth, useTestQuestions, useTestAnswers, useTestSubmit } from "@/hooks";
import { CapybaraLoader } from "@/components/common/CapybaraLoader";
import { ErrorState } from "@/components/common/ErrorState";
import {TestPageLayout} from "@/components/test/TestPageLayout"

export const TestClient = () => {
  const { isAuthenticated } = useTestAuth();
  const { questions, isLoading: questionsLoading, error: questionsError } = useTestQuestions(isAuthenticated);
  const { answers, currentQuestionIndex, selectAnswer } = useTestAnswers();
  const { isSubmitting, submitError, submitTest } = useTestSubmit();

  if (isAuthenticated === false) {
    return null;
  }

  if (questionsLoading || isAuthenticated === null) {
    return <CapybaraLoader message="Memuat pertanyaan..." />;
  }

  if (questionsError || questions.length === 0) {
    return <ErrorState error={questionsError || "Tidak ada pertanyaan tersedia"} />;
  }

  return (
    <TestPageLayout
      questions={questions}
      currentQuestionIndex={currentQuestionIndex}
      answers={answers}
      isSubmitting={isSubmitting}
      submitError={submitError}
      onSelectAnswer={selectAnswer}
      onSubmit={submitTest}
    />
  );
};
