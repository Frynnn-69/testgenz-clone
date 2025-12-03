"use client";

import { useState } from "react";
import { Box, Flex, Badge, Image, Portal } from "@chakra-ui/react";
import { ShareButtons } from "./ShareButtons";

export interface ResultCardProps {
  weatherType: string;
  traits: string[];
  imageSrc: string;
  onShare?: () => void;
  onDownloadPDF?: () => void;
}

/**
 * ResultCard component
 * Renders a visual card with the weather poster image and personality traits
 * - Shows poster image based on weather type
 * - Click on poster to view fullscreen modal
 * - Displays traits as badges/labels
 * - Styled according to weather type
 *
 * Requirements: 1.3
 */
export const ResultCard = ({
  weatherType,
  traits,
  imageSrc,
  onShare,
  onDownloadPDF,
}: ResultCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Map weather type to color scheme
  const getColorScheme = (type: string): string => {
    const colorMap: Record<string, string> = {
      sunny: "orange",
      rainy: "blue",
      stormy: "purple",
      cloudy: "gray",
    };
    return colorMap[type.toLowerCase()] || "orange";
  };

  // Map weather type to background gradient
  const getBackgroundGradient = (type: string): string => {
    const gradientMap: Record<string, string> = {
      sunny: "linear(to-br, orange.100, yellow.50)",
      rainy: "linear(to-br, blue.100, cyan.50)",
      stormy: "linear(to-br, purple.100, pink.50)",
      cloudy: "linear(to-br, gray.100, gray.50)",
    };
    return (
      gradientMap[type.toLowerCase()] || "linear(to-br, orange.100, yellow.50)"
    );
  };

  const colorScheme = getColorScheme(weatherType);

  return (
    <>
      <Box
        bg="white"
        borderRadius="xl"
        boxShadow="lg"
        overflow="hidden"
        mb={0}
        w="100%"
        display="flex"
        flexDirection="column"
        height="100%"
      >
        {/* Poster Image Section */}
        <Box
          bgGradient={getBackgroundGradient(weatherType)}
          p={{ base: 2, md: 3 }}
          textAlign="center"
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          onClick={() => setIsModalOpen(true)}
          _hover={{ opacity: 0.95 }}
          transition="opacity 0.15s"
          title="Klik untuk memperbesar"
        >
          <Image
            src={imageSrc}
            alt={`${weatherType} personality type`}
            maxW="100%"
            maxH="100%"
            width="auto"
            height="auto"
            objectFit="contain"
            borderRadius="md"
          />
        </Box>

        {/* Traits Section */}
        <Box p={4} bg="white">
          <Flex gap={2} flexWrap="wrap" justifyContent="center">
            {traits.map((trait, index) => (
              <Badge
                key={index}
                colorScheme={colorScheme}
                variant="subtle"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="sm"
                fontWeight="medium"
              >
                {trait}
              </Badge>
            ))}
          </Flex>
        </Box>

        {/* Action Buttons (moved inside card to keep spacing consistent) */}
        <Box
          p={4}
          bg="white"
          borderTopWidth={1}
          borderColor="gray.50"
          display="flex"
          justifyContent="center"
        >
          <ShareButtons
            onShare={onShare ?? (() => {})}
            onDownloadPDF={onDownloadPDF ?? (() => {})}
          />
        </Box>
      </Box>

      {/* Fullscreen Modal */}
      {isModalOpen && (
        <Portal>
          <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="blackAlpha.800"
            zIndex={9999}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => setIsModalOpen(false)}
            cursor="pointer"
            p={4}
          >
            {/* Close button */}
            <Box
              position="absolute"
              top={4}
              right={4}
              color="white"
              fontSize="2xl"
              fontWeight="bold"
              cursor="pointer"
              _hover={{ color: "gray.300" }}
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </Box>

            {/* Poster Image */}
            <Image
              src={imageSrc}
              alt={`${weatherType} personality type`}
              maxH="90vh"
              maxW="90vw"
              objectFit="contain"
              borderRadius="lg"
              onClick={(e) => e.stopPropagation()}
            />
          </Box>
        </Portal>
      )}
    </>
  );
};
