"use client";

import { Box, Progress, Text } from "@chakra-ui/react";

export interface TemperamentBarProps {
  name: string;
  percentage: number;
  color: string; // Bisa menerima Hex (#8F6E56) atau Token (orange.400)
}

export const TemperamentBar = ({
  name,
  percentage,
  color,
}: TemperamentBarProps) => {
  // Pastikan range 0-100
  const normalizedPercentage = Math.max(0, Math.min(100, percentage));

  return (
    <Box width="100%" mb={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Text fontSize="sm" fontWeight="semibold" color="gray.700">
          {name}
        </Text>
        <Text fontSize="sm" color="gray.500" fontWeight="medium">
          {Math.round(normalizedPercentage)}%
        </Text>
      </Box>

      {/* Progress Bar dengan Custom Color */}
      <Progress.Root value={normalizedPercentage} size="sm">
        <Progress.Track bg="gray.100" borderRadius="full" height="8px">
          {/* Override warna background langsung dari props color */}
          <Progress.Range
            bg={color}
            borderRadius="full"
            transition="width 0.5s ease-in-out" // Animasi halus
          />
        </Progress.Track>
      </Progress.Root>
    </Box>
  );
};
