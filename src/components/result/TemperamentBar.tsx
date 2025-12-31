"use client";

import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";

export interface TemperamentBarProps {
  name: string;
  percentage: number;
  color: string;
  index?: number;
}

export const TemperamentBar = ({
  name,
  percentage,
  color,
  index = 0,
}: TemperamentBarProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const normalizedPercentage = Math.max(0, Math.min(100, percentage));
  const animationDelay = index * 0.15;

  return (
    <Box 
      width="100%" 
      mb={5}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      cursor="default"
    >
      <style jsx global>{`
        @keyframes fillBar {
          from { width: 0%; }
          to { width: ${normalizedPercentage}%; }
        }
      `}</style>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end"
        mb={2}
      >
        <Text 
          fontSize="sm" 
          fontWeight="bold" 
          color="gray.700"
          letterSpacing="wide"
        >
          {name}
        </Text>
        <Text
          fontSize="md"
          fontWeight="bold"
          transition="color 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
          color={isHovered ? color : "gray.400"}
        >
          {Math.round(normalizedPercentage)}%
        </Text>
      </Box>

      <Box 
        h="8px" 
        bg="gray.100" 
        borderRadius="full" 
        overflow="visible" 
        boxShadow="inner"
      >
        <Box
          h="100%"
          bg={color}
          borderRadius="full"
          width={`${normalizedPercentage}%`}
          css={{
            animation: `fillBar 1s cubic-bezier(0.4, 0, 0.2, 1) ${animationDelay}s backwards`,
          }}
          boxShadow={isHovered ? `0 0 10px 1px ${color}` : "none"} 
          transition="box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
        />
      </Box>
    </Box>
  );
};
