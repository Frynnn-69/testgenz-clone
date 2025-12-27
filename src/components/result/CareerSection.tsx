"use client";

import { Box, Heading, Flex, Text } from "@chakra-ui/react";

export interface CareerSectionProps {
  careers: string[];
}

export const CareerSection = ({ careers }: CareerSectionProps) => {
  const displayCareers = careers && careers.length > 0 ? careers : [];

  const primaryColor = "#8F6E56";

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
        <Box as="span" role="img" aria-label="briefcase">
          💼
        </Box>
        Karir yang Cocok
      </Heading>

      <Flex flexWrap="wrap" gap={3}>
        {displayCareers.map((career, index) => (
          <Flex
            key={`${career}-${index}`}
            align="center"
            bg="white"
            border="1px solid"
            borderColor={primaryColor}
            color={primaryColor}
            px={5}
            py={2.5}
            rounded="full"
            cursor="default"
            transition="all 0.25s ease"
            fontWeight="bold"
            fontSize="sm"
            shadow="sm"
            _hover={{
              bg: primaryColor,
              color: "white",
              transform: "translateY(-4px) scale(1.05)",
              shadow: "lg",
            }}
          >
            <Text>{career}</Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};
