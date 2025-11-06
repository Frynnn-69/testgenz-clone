import { Button, Box } from "@chakra-ui/react";

interface FinishButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const FinishButton = ({ onClick, disabled = false }: FinishButtonProps) => {
  return (
    <Box display="flex" justifyContent="center" maxW="4xl" mx="auto">
      <Button
        colorPalette="blue"
        size="lg"
        onClick={onClick}
        disabled={disabled}
        fontWeight="medium"
        px={12}
        py={6}
        fontSize="lg"
        borderRadius="lg"
        _hover={{
          transform: "translateY(-2px)",
          shadow: "lg",
        }}
        _active={{
          transform: "translateY(0)",
        }}
        transition="all 0.2s ease-in-out"
      >
        Selesai
      </Button>
    </Box>
  );
};

