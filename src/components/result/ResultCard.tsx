"use client";

import { Box, Flex, Badge, Image } from "@chakra-ui/react";

export interface ResultCardProps {
  weatherType: string;
  traits: string[];
  imageSrc: string;
}

/**
 * ResultCard component
 * Renders a visual card with the weather poster image and personality traits
 * - Shows poster image based on weather type
 * - Displays traits as badges/labels
 * - Styled according to weather type
 * 
 * Requirements: 1.3
 */
export const ResultCard = ({ weatherType, traits, imageSrc }: ResultCardProps) => {
  // Map weather type to color scheme
  const getColorScheme = (type: string): string => {
    const colorMap: Record<string, string> = {
      sunny: "orange",
      rainy: "blue",
      stormy: "purple",
      cloudy: "gray"
    };
    return colorMap[type.toLowerCase()] || "orange";
  };

  // Map weather type to background gradient
  const getBackgroundGradient = (type: string): string => {
    const gradientMap: Record<string, string> = {
      sunny: "linear(to-br, orange.100, yellow.50)",
      rainy: "linear(to-br, blue.100, cyan.50)",
      stormy: "linear(to-br, purple.100, pink.50)",
      cloudy: "linear(to-br, gray.100, gray.50)"
    };
    return gradientMap[type.toLowerCase()] || "linear(to-br, orange.100, yellow.50)";
  };

  const colorScheme = getColorScheme(weatherType);

  return (
    <Box
      bg="white"
      borderRadius="xl"
      boxShadow="lg"
      overflow="hidden"
      mb={6}
    >
      {/* Poster Image Section */}
      <Box
        bgGradient={getBackgroundGradient(weatherType)}
        p={{ base: 4, md: 6 }}
        textAlign="center"
        minH={{ base: "350px", md: "450px" }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src={imageSrc}
          alt={`${weatherType} personality type`}
          maxH={{ base: "320px", md: "420px" }}
          width="auto"
          objectFit="contain"
        />
      </Box>

      {/* Traits Section */}
      <Box p={4} bg="white">
        <Flex
          gap={2}
          flexWrap="wrap"
          justifyContent="center"
        >
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
    </Box>
  );
};
