"use client";

import { Box, Heading, Text, VStack } from "@chakra-ui/react";

interface ResultContentProps {
  weatherType: string;
  analysis: string;
  userName: string;
}

export const ResultContent = ({
  weatherType,
  analysis,
  userName,
}: ResultContentProps) => {
  return (
    <VStack gap={6} align="stretch" width="100%">
      <Box>
        <Text fontSize="lg" color="gray.600" mb={2}>
          Halo, {userName}!
        </Text>
        <Heading as="h1" size="2xl" mb={4}>
          Tipe Kepribadian: {weatherType}
        </Heading>
      </Box>

      <Box>
        <Text
          fontSize="md"
          lineHeight="1.8"
          color="gray.700"
          whiteSpace="pre-wrap"
        >
          {analysis}
        </Text>
      </Box>
    </VStack>
  );
};
