"use client";

import { Button, HStack, Box, Text } from "@chakra-ui/react";
import { COLORS } from "@/lib/constants/theme";

export interface ShareButtonsProps {
  onShare: () => void;
  onDownloadPDF: () => void;
}

export const ShareButtons = ({ onShare, onDownloadPDF }: ShareButtonsProps) => {
  return (
    <HStack gap={4} width="100%" justify="center" flexWrap="wrap">
      <Button
        variant="outline"
        onClick={onShare}
        size="lg"
        fontWeight="medium"
        borderRadius="xl"
        borderColor={COLORS.primary}
        transition="all 0.2s"
        _hover={{
        bg: "#EDE2D4",
        transform: "translateY(-2px)",
        shadow: "sm",
      }}
      >
        <Box as="span" mr={2}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            color={COLORS.primary}
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </Box>

        <Text fontSize="md" color="gray.800" lineHeight="tall">
          Bagikan Hasil
        </Text>
        
      </Button>
      <Button
        variant="outline"
        // colorPalette="orange"
        onClick={onDownloadPDF}
        size="lg"
        fontWeight="medium"
        borderRadius="xl"
        borderColor={COLORS.primary}
        transition="all 0.2s"
        _hover={{
        bg: "#EDE2D4",
        transform: "translateY(-2px)",
        shadow: "sm",
      }}
      >
        <Box as="span" mr={2}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            color={COLORS.primary}
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </Box>
        <Text fontSize="md" color="gray.800" lineHeight="tall">
          Unduh PDF
        </Text>
      </Button>
    </HStack>
  );
};
