import { Box, Button } from "@chakra-ui/react";

interface FinishButtonProps {
  onClick: () => void;
}

export const FinishButton = ({ onClick }: FinishButtonProps) => {
  return (
    <Box display="flex" justifyContent="center" maxW="4xl" mx="auto">
      <Button
        colorPalette="blue"
        size="lg"
        onClick={onClick}
        fontWeight="medium"
        px={12}
      >
        Selesai
      </Button>
    </Box>
  );
};

