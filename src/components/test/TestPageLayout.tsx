"use client";

import { Box, Container, Alert } from "@chakra-ui/react";
import Button from "@/components/common/Button";
import { ProgressBar, QuestionCard } from "@/components/test";
import { CapybaraLoader } from "@/components/common/CapybaraLoader";
import type { Question } from "@/lib/questions";

interface TestPageLayoutProps {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<number, string>;
  isSubmitting: boolean;
  submitError: string | null;
  onSelectAnswer: (questionId: number, label: string, isLastQuestion: boolean) => void;
  onSubmit: (answers: Record<number, string>) => Promise<void>;
}

export const TestPageLayout = ({
  questions,
  currentQuestionIndex,
  answers,
  isSubmitting,
  submitError,
  onSelectAnswer,
  onSubmit,
}: TestPageLayoutProps) => {
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const isAnswered = answers[currentQuestion.id] !== undefined; 
  // bug: kalo user pilih jawaban yang sama berturu2 1-end A semua, bakal error Runtime TypeError: Cannot read properties of undefined (reading 'id')

  const handleSelectChoice = (label: string) => {
    onSelectAnswer(currentQuestion.id, label, isLastQuestion);
  };

  return (
    <>
      {isSubmitting && <CapybaraLoader message="Memproses hasil..." />}

      <Box minH="100vh" bg="gray.50" py={8}>
        <Container maxW="5xl">
          {submitError && (
            <Alert.Root status="error" mb={6}>
              <Alert.Indicator />
              <Alert.Title>Error</Alert.Title>
              <Alert.Description>{submitError}</Alert.Description>
            </Alert.Root>
          )}

          <ProgressBar
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
          />

          <Box display="flex" justifyContent="center" mb={8}>
            <QuestionCard
              question={currentQuestion.text}
              choices={currentQuestion.options}
              selectedChoice={answers[currentQuestion.id]}
              onSelectChoice={handleSelectChoice}
            />
          </Box>

          {isLastQuestion && isAnswered && (
            <Box display="flex" justifyContent="center" maxW="4xl" mx="auto">
              <Button
                size="lg"
                onClick={() => onSubmit(answers)}
                fontWeight="medium"
                px={12}
              >
                Selesai
              </Button>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};
