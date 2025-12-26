import { Box, Text, Stack } from "@chakra-ui/react";
import { ChoiceButton } from "./ChoiceButton";
import type {Option } from "@/lib/questions";

interface QuestionCardProps {
  question: string;
  choices: Option[];
  selectedChoice?: string;
  onSelectChoice: (label: string) => void;
}

export const QuestionCard = ({
  question,
  choices,
  selectedChoice,
  onSelectChoice,
}: QuestionCardProps) => {
  return (
    <Box
      width="100%"
      maxW="4xl"
      bg="white"
      borderRadius="2xl"
      p={8}
      shadow="sm"
      border="1px solid"
      borderColor="gray.100"
    >
      <Stack align="stretch" gap={6}>
        <Text
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          color="gray.900"
          lineHeight="shorter"
        >
          {question}
        </Text>

        {/* Choices */}
        <Stack gap={3} mt={4}>
          {choices.map((option: Option) => (
            <ChoiceButton
              key={option.id}
              label={option.id}
              text={option.text}
              isSelected={selectedChoice === option.id}
              onClick={() => onSelectChoice(option.id)}
            />
          ))}
        </Stack>

        <Text fontSize="sm" color="gray.500" textAlign="center" mt={4}>
          Pilih jawaban yang paling kamu banget!
        </Text>
      </Stack>
    </Box>
  );
};
