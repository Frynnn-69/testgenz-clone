"use client";

import { Box, Text, Heading } from "@chakra-ui/react";

export interface ResultHeaderProps {
  weatherType: string;
  subtitle: string;
  colorScheme: string; // "orange" | "blue" | "purple" | "gray"
  userName?: string; // Nama user dari localStorage
  titleOverride?: string; // Optional AI-provided title to display instead of weatherType
  fullTitle?: string; // Full AI-provided title for tooltip (if different)
}

/**
 * ResultHeader component
 * Improved visual styling:
 * - Use solid color headline for reliable contrast (gradient can sometimes be invisible)
 * - Add subtle text shadow as fallback to improve legibility on light backgrounds
 * - Decorative underline under subtitle
 * - Tooltip shows full title on hover
 */
export const ResultHeader = ({
  weatherType,
  subtitle,
  colorScheme,
  userName,
  titleOverride,
  fullTitle,
}: ResultHeaderProps) => {
  // Color tokens and gradients mapped by scheme
  const colorMap: Record<string, string> = {
    orange: "orange.500",
    blue: "blue.500",
    purple: "purple.500",
    gray: "gray.500",
  };

  const gradientMap: Record<string, string> = {
    orange: "linear(to-r, orange.500, pink.400)",
    blue: "linear(to-r, blue.500, cyan.400)",
    purple: "linear(to-r, purple.500, pink.400)",
    gray: "linear(to-r, gray.700, gray.500)",
  };

  const displayName = userName || "Kamu";
  const headingContent = titleOverride
    ? titleOverride
    : weatherType.toUpperCase();
  const tooltipLabel = fullTitle || headingContent;
  // keep gradientMap for potential future use but prefer a solid color for visibility
  const gradient = gradientMap[colorScheme] || gradientMap.orange;
  const colorToken = colorMap[colorScheme] || colorMap.orange;
  // Project brown accent used for subtitle and small accents
  const brownAccent = "#6B3A2A";
  const tesAksen = "#008000";

  return (
    <Box textAlign="center" mb={6} px={{ base: 4, md: 0 }}>
      <Heading
        as="h1"
        fontSize={{ base: "2xl", md: "5xl" }}
        fontWeight="extrabold"
        mb={2}
        whiteSpace="normal"
        lineHeight={1.02}
        color={colorToken}
        // subtle shadow improves contrast in case the background is very light or gradient fails
        textShadow="0 1px 0 rgba(255,255,255,0.6), 0 6px 18px rgba(0,0,0,0.06)"
        title={tooltipLabel}
      >
        {headingContent}
      </Heading>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Text
          fontSize="md"
          color={brownAccent}
          fontStyle="italic"
          fontWeight="semibold"
          mb={2}
          px={3}
          py={0.5}
          borderRadius="md"
        >
          {subtitle}
        </Text>

        {/* Decorative underline to give more visual weight to the header (project brown) */}
        <Box
          width={{ base: "100px", md: "160px" }}
          height="8px"
          borderRadius="full"
          bg="orange.800"
          opacity={0.12}
          boxShadow={`0 6px 20px orange.800`}
        />
      </Box>
    </Box>
  );
};
