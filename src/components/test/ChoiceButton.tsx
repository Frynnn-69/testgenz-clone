import { Box, Text } from "@chakra-ui/react";
import { COLORS } from "@/lib/constants/theme";

interface ChoiceButtonProps {
  label: string;
  text: string;
  isSelected?: boolean;
  onClick: () => void;
}

export const ChoiceButton = ({
  label,
  text,
  isSelected = false,
  onClick,
}: ChoiceButtonProps) => {
  return (
    <Box
      as="button"
      width="100%"
      display="flex"
      alignItems="flex-start"
      gap={3}
      p={4}
      borderRadius="lg"
      border="1px solid"
      borderColor={isSelected ? COLORS.primary : "gray.200"}
      bg={isSelected ? "#EDE2D4" : "white"}
      textAlign="left"
      transition="all 0.2s"
      _hover={{
        borderColor: COLORS.primary,
        bg: "#EDE2D4",
        transform: "translateY(-2px)",
        shadow: "sm",
      }}
      _active={{
        transform: "translateY(0)",
      }}
      onClick={onClick}
      cursor="pointer"
    >
      <Text
        fontSize="md"
        fontWeight="semibold"
        color={COLORS.primary}
        flexShrink={0}
      >
        {label}.
      </Text>
      <Text fontSize="md" color="gray.800" lineHeight="tall">
        {text}
      </Text>
    </Box>
  );
};
