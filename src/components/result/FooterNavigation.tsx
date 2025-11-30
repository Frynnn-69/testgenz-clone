"use client";

import { Button, HStack, Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export interface FooterNavigationProps {
  onBackToHome?: () => void;
  onRetakeTest?: () => void;
}

/**
 * FooterNavigation component
 * Renders footer navigation with two buttons:
 * - "Kembali ke Beranda" with home icon, outline style
 * - "Ulangi Tes" with refresh icon, filled brown/orange style
 * 
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5
 */
export const FooterNavigation = ({
  onBackToHome,
  onRetakeTest,
}: FooterNavigationProps) => {
  const router = useRouter();

  const handleBackToHome = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      router.push("/");
    }
  };

  const handleRetakeTest = () => {
    if (onRetakeTest) {
      onRetakeTest();
    } else {
      router.push("/test");
    }
  };

  return (
    <HStack
      gap={4}
      width="100%"
      justify="center"
      flexWrap="wrap"
      py={6}
      mt={4}
    >
      {/* Kembali ke Beranda - outline style */}
      <Button
        variant="outline"
        colorPalette="orange"
        onClick={handleBackToHome}
        size="lg"
        fontWeight="medium"
        borderRadius="xl"
      >
        <Box as="span" mr={2}>
          {/* Home Icon (SVG) */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </Box>
        Kembali ke Beranda
      </Button>

      {/* Ulangi Tes - filled brown/orange style */}
      <Button
        variant="solid"
        bg="orange.700"
        color="white"
        _hover={{ bg: "orange.800" }}
        onClick={handleRetakeTest}
        size="lg"
        fontWeight="medium"
        borderRadius="xl"
      >
        <Box as="span" mr={2}>
          {/* Refresh Icon (SVG) */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
        </Box>
        Ulangi Tes
      </Button>
    </HStack>
  );
};
