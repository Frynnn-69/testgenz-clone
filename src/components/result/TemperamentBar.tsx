"use client";

import { Box, Progress, Text } from "@chakra-ui/react";

export interface TemperamentBarProps {
  name: string;
  percentage: number;
  color: string;
}

/**
 * TemperamentBar component
 * Renders a single progress bar for one temperament type
 * - Label on the left, percentage on the right
 * - Supports different colors per temperament
 * - Handles 0% with empty progress bar
 * 
 * Requirements: 2.3, 2.4, 2.5
 */
export const TemperamentBar = ({
  name,
  percentage,
  color,
}: TemperamentBarProps) => {
  // Ensure percentage is within valid range (0-100)
  const normalizedPercentage = Math.max(0, Math.min(100, percentage));
  
  // Extract color palette from Chakra color token (e.g., "orange.400" -> "orange")
  const colorPalette = color.split(".")[0];

  return (
    <Box width="100%" mb={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Text fontSize="sm" fontWeight="medium" color="gray.700">
          {name}
        </Text>
        <Text fontSize="sm" color="gray.600">
          {Math.round(normalizedPercentage)}%
        </Text>
      </Box>
      <Progress.Root value={normalizedPercentage} size="sm" colorPalette={colorPalette}>
        <Progress.Track bg="gray.200" borderRadius="full" height="8px">
          <Progress.Range borderRadius="full" />
        </Progress.Track>
      </Progress.Root>
    </Box>
  );
};
