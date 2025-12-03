"use client";

import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { getWeatherMetadata } from "@/components/result/weatherMetadata";

interface ResultContentProps {
  weatherType: string;
  analysis: string;
  userName: string;
}

/**
 * Parse AI analysis into a title (first sentence) and the remaining body.
 * Fallback to metadata subtitle if parsing fails.
 */
function parseAnalysis(analysis: string, weatherType: string) {
  const metadata = getWeatherMetadata(weatherType);
  const subtitleFallback =
    metadata?.subtitle || `Tipe Kepribadian: ${weatherType}`;

  if (!analysis || typeof analysis !== "string") {
    return { title: subtitleFallback, body: "" };
  }

  // Trim and remove surrounding quotes
  const text = analysis
    .trim()
    .replace(/^["“”']+|["“”']+$/g, "")
    .trim();

  // Try to split into first sentence and the rest (keep punctuation)
  const match = text.match(/^(.+?[.!?])\s*([\s\S]*)$/);
  if (match) {
    const first = match[1].trim();
    const rest = (match[2] || "").trim();
    const title = first || subtitleFallback;
    const body = rest || "";
    return { title, body };
  }

  // If no clear sentence terminator, split by newline as a fallback
  const parts = text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length >= 2) {
    return { title: parts[0], body: parts.slice(1).join(" ") };
  }

  // Last resort: use metadata subtitle as title and whole text as body
  return { title: subtitleFallback, body: text };
}

export const ResultContent = ({
  weatherType,
  analysis,
  userName,
}: ResultContentProps) => {
  const { title, body } = parseAnalysis(analysis, weatherType);
  const metadata = getWeatherMetadata(weatherType);

  return (
    <VStack gap={6} align="stretch" width="100%">
      <Box>
        <Text fontSize="lg" color="gray.600" mb={2}>
          Halo, {userName}!
        </Text>
        <Heading as="h1" size="2xl" mb={2}>
          {title}
        </Heading>
        {metadata?.subtitle && (
          <Text fontSize="md" color="gray.500" mb={4}>
            {metadata.subtitle}
          </Text>
        )}
      </Box>

      <Box>
        <Text
          fontSize="md"
          lineHeight="1.8"
          color="gray.700"
          whiteSpace="pre-wrap"
        >
          {body || analysis}
        </Text>
      </Box>
    </VStack>
  );
};
