"use client";

import { Button, HStack, Box } from "@chakra-ui/react";

export interface ShareButtonsProps {
  onShare: () => void;
  onDownloadPDF: () => void;
}

/**
 * ShareButtons component
 * Renders share and download PDF buttons with outline variant
 * - "Bagikan Hasil" button with share icon
 * - "Unduh PDF" button with download icon
 *
 * Requirements: 1.5
 */
export const ShareButtons = ({ onShare, onDownloadPDF }: ShareButtonsProps) => {
  return (
    <HStack gap={4} width="100%" justify="center" flexWrap="wrap">
      <Button
        variant="outline"
        colorPalette="orange"
        onClick={onShare}
        size="lg"
        fontWeight="medium"
        borderRadius="xl"
      >
        <Box as="span" mr={2}>
          {/* Share Icon (SVG) */}
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
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </Box>
        Bagikan Hasil
      </Button>
      <Button
        variant="outline"
        colorPalette="orange"
        onClick={onDownloadPDF}
        size="lg"
        fontWeight="medium"
        borderRadius="xl"
      >
        <Box as="span" mr={2}>
          {/* Download Icon (SVG) */}
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
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </Box>
        Unduh PDF
      </Button>
    </HStack>
  );
};
