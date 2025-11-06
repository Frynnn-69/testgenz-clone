"use client";

import { Box, Container, Text } from "@chakra-ui/react";
import {
  ProgressBar,
  QuestionCard,
  LoadingOverlay,
  BackButton,
  FinishButton,
} from "@/components/test";
import { useTestLogic } from "@/lib/testLogic";

// Helper function untuk menentukan section berdasarkan nomor soal
const getSection = (questionNumber: number): string => {
  if (questionNumber <= 10) return "BAGIAN 1";
  if (questionNumber <= 20) return "BAGIAN 2";
  return "BAGIAN 3";
};

export const QuestionContainer = () => {
  const {
    currentQuestionIndex,
    isLoading,
    error,
    currentQuestion,
    totalQuestions,
    isLastQuestion,
    isAnswered,
    answers,
    handleSelectChoice,
    handleBack,
    handleFinish,
  } = useTestLogic();

  // Jika belum ada data, tampilkan loading atau error
  if (isLoading) {
    return <LoadingOverlay message="Memuat pertanyaan..." />;
  }

  if (error || !currentQuestion) {
    return (
      <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
        <Box textAlign="center" p={8}>
          <Text fontSize="xl" color="red.500" mb={4}>
            {error || "Tidak ada pertanyaan tersedia"}
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <>
      {isLoading && <LoadingOverlay message="Memproses..." />}
      
      <Box minH="100vh" bg="gray.50" py={8}>
        <Container maxW="5xl">
          {/* Back Button - hanya muncul jika bukan pertanyaan pertama */}
          {currentQuestionIndex > 0 && (
            <Box mb={4}>
              <BackButton onClick={handleBack} />
            </Box>
          )}

          {/* Progress Bar */}
          <ProgressBar
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
          />

          {/* Question Card */}
          <Box display="flex" justifyContent="center" mb={8}>
            <QuestionCard
              section={getSection(currentQuestionIndex + 1)}
              question={currentQuestion.question}
              choices={currentQuestion.choices}
              selectedChoice={answers[currentQuestion.id]}
              onSelectChoice={handleSelectChoice}
            />
          </Box>

          {/* Button Selesai - hanya muncul di pertanyaan terakhir dan sudah dijawab */}
          {isLastQuestion && isAnswered && (
            <FinishButton onClick={handleFinish} />
          )}
        </Container>
      </Box>
    </>
  );
};

