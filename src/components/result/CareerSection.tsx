"use client";

import { Box, Heading, Flex, Text } from "@chakra-ui/react";

export interface CareerSectionProps {
  careers: string[];
}

// Default career recommendations as fallback
const DEFAULT_CAREERS = ["Marketing", "Sales", "Entertainment", "Public Relations"];

/**
 * CareerSection component
 * Renders the "Karir yang Cocok" section with career tags/badges
 * - Header with briefcase icon (💼)
 * - Tags/badges with orange border
 * - Ensures minimum 4 items with fallback to defaults
 * 
 * Requirements: 4.1, 4.2, 4.3
 */
export const CareerSection = ({ careers }: CareerSectionProps) => {
  // Ensure minimum 4 items - use provided careers or fallback to defaults
  const displayCareers = careers && careers.length >= 4 
    ? careers 
    : careers && careers.length > 0
      ? [...careers, ...DEFAULT_CAREERS.slice(0, 4 - careers.length)]
      : DEFAULT_CAREERS;

  return (
    <Box
      bg="white"
      borderRadius="xl"
      boxShadow="lg"
      p={6}
      width="100%"
    >
      <Heading
        as="h3"
        fontSize="lg"
        fontWeight="semibold"
        color="gray.700"
        mb={4}
        display="flex"
        alignItems="center"
        gap={2}
      >
        <Box as="span" role="img" aria-label="briefcase">💼</Box>
        Karir yang Cocok
      </Heading>
      
      <Flex flexWrap="wrap" gap={2}>
        {displayCareers.map((career, index) => (
          <Box
            key={`${career}-${index}`}
            px={3}
            py={1.5}
            borderRadius="full"
            border="2px solid"
            borderColor="orange.500"
            bg="white"
          >
            <Text
              fontSize="sm"
              fontWeight="medium"
              color="gray.700"
            >
              {career}
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
