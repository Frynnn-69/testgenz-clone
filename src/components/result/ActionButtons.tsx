"use client";

import { Button, HStack } from "@chakra-ui/react";

interface ActionButtonsProps {
  onBackToHome: () => void;
  onRetakeTest: () => void;
}

export const ActionButtons = ({
  onBackToHome,
  onRetakeTest,
}: ActionButtonsProps) => {
  return (
    <HStack gap={4} width="100%" justify="center" mt={8}>
      <Button
        variant="outline"
        colorPalette="gray"
        onClick={onBackToHome}
        size="lg"
        fontWeight="medium"
      >
        Kembali ke Beranda
      </Button>
      <Button
        variant="solid"
        colorPalette="blue"
        onClick={onRetakeTest}
        size="lg"
        fontWeight="medium"
      >
        Ulang Tes
      </Button>
    </HStack>
  );
};
