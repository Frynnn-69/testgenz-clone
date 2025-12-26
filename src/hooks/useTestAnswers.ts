// handle test answers
import { useState, useCallback } from "react";

interface UseTestAnswersReturn {
  answers: Record<number, string>;
  currentQuestionIndex: number;
  selectAnswer: (questionId: number, label: string, isLastQuestion: boolean) => void;
}

export function useTestAnswers(): UseTestAnswersReturn {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const selectAnswer = useCallback((questionId: number, label: string, isLastQuestion: boolean) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: label,
    }));

    if (!isLastQuestion) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 300);
    }
  }, []);

  return {
    answers,
    currentQuestionIndex,
    selectAnswer,
  };
}
