"use client";

import { Box, Text, Heading } from "@chakra-ui/react";

export interface ResultHeaderProps {
  weatherType: string;
  subtitle: string;
  colorScheme: string; // "orange" | "blue" | "purple" | "gray"
  userName?: string; // Nama user dari localStorage
}

/**
 * ResultHeader component
 * Renders the header section with user name, weather type, and subtitle
 * - User name (or "Kamu") followed by "adalah" in gray
 * - Weather type name with color matching the colorScheme
 * - Subtitle description below the weather type
 * 
 * Requirements: 1.1, 1.2
 */
export const ResultHeader = ({ weatherType, subtitle, colorScheme, userName }: ResultHeaderProps) => {
  // Map colorScheme to Chakra color token
  const getColorToken = (scheme: string): string => {
    const colorMap: Record<string, string> = {
      orange: "orange.500",
      blue: "blue.500",
      purple: "purple.500",
      gray: "gray.500"
    };
    return colorMap[scheme] || "orange.500";
  };

  // Display name: use userName if available, otherwise "Kamu"
  const displayName = userName || "Kamu";

  return (
    <Box textAlign="center" mb={6}>
      <Text
        fontSize="lg"
        color="gray.600"
        fontWeight="medium"
        mb={1}
      >
        {displayName} adalah
      </Text>
      
      <Heading
        as="h1"
        fontSize={{ base: "3xl", md: "4xl" }}
        fontWeight="bold"
        color={getColorToken(colorScheme)}
        mb={2}
      >
        {weatherType.toUpperCase()}
      </Heading>
      
      <Text
        fontSize="md"
        color="gray.500"
        fontStyle="italic"
      >
        {subtitle}
      </Text>
    </Box>
  );
};
