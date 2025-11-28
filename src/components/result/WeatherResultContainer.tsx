"use client";

import { TestResult } from "@/types";
import { SunnyResult } from "./SunnyResult";
import { RainyResult } from "./RainyResult";
import { StormyResult } from "./StormyResult";
import { CloudyResult } from "./CloudyResult";
import { Box, Container, Text, Button, VStack } from "@chakra-ui/react";

interface WeatherResultContainerProps {
  testResult: TestResult;
}

export const WeatherResultContainer = ({
  testResult,
}: WeatherResultContainerProps) => {
  const { weatherType, analysis, userData, timestamp } = testResult;

  // Normalize weather type to handle case variations
  const normalizedWeatherType = weatherType.toLowerCase();

  // Conditional rendering based on weather type
  switch (normalizedWeatherType) {
    case "sunny":
      return (
        <SunnyResult
          weatherType={weatherType}
          analysis={analysis}
          userData={userData}
          timestamp={timestamp}
        />
      );
    case "rainy":
      return (
        <RainyResult
          weatherType={weatherType}
          analysis={analysis}
          userData={userData}
          timestamp={timestamp}
        />
      );
    case "stormy":
      return (
        <StormyResult
          weatherType={weatherType}
          analysis={analysis}
          userData={userData}
          timestamp={timestamp}
        />
      );
    case "cloudy":
      return (
        <CloudyResult
          weatherType={weatherType}
          analysis={analysis}
          userData={userData}
          timestamp={timestamp}
        />
      );
    default:
      // Handle invalid weather type gracefully
      return (
        <Box position="relative" minHeight="100vh" width="100%">
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="gray.50"
            zIndex={-1}
          />
          <Container maxW="container.md" py={12}>
            <Box
              bg="white"
              borderRadius="xl"
              boxShadow="xl"
              p={8}
              borderWidth="2px"
              borderColor="red.400"
            >
              <VStack gap={6} alignItems="center">
                <Text fontSize="2xl" fontWeight="bold" color="red.600">
                  Invalid Weather Type
                </Text>
                <Text fontSize="md" color="gray.600" textAlign="center">
                  The weather type &quot;{weatherType}&quot; is not recognized.
                  Please retake the test to get a valid result.
                </Text>
                <Button
                  colorScheme="blue"
                  size="lg"
                  onClick={() => {
                    window.location.href = "/test";
                  }}
                >
                  Retake Test
                </Button>
              </VStack>
            </Box>
          </Container>
        </Box>
      );
  }
};
