"use client";

import { Box, Heading, List, Text } from "@chakra-ui/react";

export interface DevelopmentSectionProps {
  areas: string[];
}

export const DevelopmentSection = ({ areas }: DevelopmentSectionProps) => {
  // areas should always come with fallbacks from useResultData
  const displayAreas = areas && areas.length > 0 ? areas : [];

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
