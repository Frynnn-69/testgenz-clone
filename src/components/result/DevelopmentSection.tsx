"use client";

import { Box, Heading, List, Text } from "@chakra-ui/react";

export interface DevelopmentSectionProps {
  areas: string[];
}

// Default development areas as fallback
const DEFAULT_DEVELOPMENT_AREAS = ["Fokus", "Konsistensi", "Detail"];

/**
 * DevelopmentSection component
 * Renders the "Area Pengembangan" section with bullet points
 * - Header with seedling icon (🌱)
 * - Bullet points with orange color
 * - Ensures minimum 3 items with fallback to defaults
 *
 * Requirements: 3.1, 3.2, 3.3
 */
export const DevelopmentSection = ({ areas }: DevelopmentSectionProps) => {
  // Ensure minimum 3 items - use provided areas or fallback to defaults
  const displayAreas =
    areas && areas.length >= 3
      ? areas
      : areas && areas.length > 0
        ? [...areas, ...DEFAULT_DEVELOPMENT_AREAS.slice(0, 3 - areas.length)]
        : DEFAULT_DEVELOPMENT_AREAS;

  return (
    <Box bg="white" borderRadius="xl" boxShadow="lg" p={6} width="100%">
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
        <Box as="span" role="img" aria-label="seedling">
          🌱
        </Box>
        Area Pengembangan
      </Heading>

      <List.Root gap={2} listStyle="none">
        {displayAreas.map((area, index) => (
          <List.Item
            key={`${area}-${index}`}
            display="flex"
            alignItems="center"
            color="gray.700"
          >
            <Box
              as="span"
              w={2}
              h={2}
              borderRadius="full"
              bg="orange.800"
              mr={3}
              flexShrink={0}
            />
            <Text>{area}</Text>
          </List.Item>
        ))}
      </List.Root>
    </Box>
  );
};
