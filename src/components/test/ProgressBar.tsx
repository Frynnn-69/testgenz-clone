import { Box, Progress, Text } from "@chakra-ui/react";

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

export const ProgressBar = ({
  currentQuestion,
  totalQuestions,
}: ProgressBarProps) => {
  const percentage = (currentQuestion / totalQuestions) * 100;

  return (
    <Box width="100%" mb={8}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Text fontSize="sm" color="gray.600">
          Pertanyaan {currentQuestion} dari {totalQuestions}
        </Text>
        <Text fontSize="sm" color="gray.600" fontWeight="medium">
          {Math.round(percentage)}%
        </Text>
      </Box>

      {/* size="sm" TETAP (tidak diperbesar) */}
      <Progress.Root value={percentage} size="sm">
        <Progress.Track bg="gray.200" borderRadius="full">
          {/* Ubah warna fill menjadi Coklat */}
          <Progress.Range bg="#8F6E56" borderRadius="full" />
        </Progress.Track>
      </Progress.Root>
    </Box>
  );
};
