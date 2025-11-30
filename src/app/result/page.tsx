"use client";

import { useState, useEffect } from "react";
import { Box, Container, VStack, Text, Button, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ExtendedTestResult } from "@/types";
import { getTestResult } from "@/lib/localStorage";
import { ResultPageLayout } from "@/components/result/ResultPageLayout";
import { getWeatherMetadata, TEMPERAMENT_COLORS } from "@/components/result/weatherMetadata";

/**
 * Apply fallback values for missing fields using weather metadata
 * Ensures all required fields are present for ResultPageLayout
 * Requirements: 1.1, 1.3, 1.4, 2.1, 3.1, 4.1, 6.1
 */
function applyFallbacks(result: ExtendedTestResult): ExtendedTestResult {
  const metadata = getWeatherMetadata(result.weatherType);
  
  // Ensure weather types have valid data
  let temperaments = result.temperaments;
  if (!Array.isArray(temperaments) || temperaments.length === 0) {
    temperaments = [
      { name: "Sunny", percentage: 25, color: TEMPERAMENT_COLORS.Sunny },
      { name: "Stormy", percentage: 25, color: TEMPERAMENT_COLORS.Stormy },
      { name: "Rainy", percentage: 25, color: TEMPERAMENT_COLORS.Rainy },
      { name: "Cloudy", percentage: 25, color: TEMPERAMENT_COLORS.Cloudy },
    ];
  } else {
    // Ensure each weather type has a color
    temperaments = temperaments.map(t => ({
      ...t,
      color: t.color || TEMPERAMENT_COLORS[t.name] || "gray.400"
    }));
  }
  
  // Ensure developmentAreas has at least 3 items (Requirement 3.3)
  let developmentAreas = result.developmentAreas;
  if (!Array.isArray(developmentAreas) || developmentAreas.length < 3) {
    developmentAreas = metadata?.defaultDevelopmentAreas || ["Fokus", "Konsistensi", "Detail"];
  }
  
  // Ensure careerRecommendations has at least 4 items (Requirement 4.3)
  let careerRecommendations = result.careerRecommendations;
  if (!Array.isArray(careerRecommendations) || careerRecommendations.length < 4) {
    careerRecommendations = metadata?.defaultCareers || ["Marketing", "Sales", "Entertainment", "Public Relations"];
  }
  
  return {
    ...result,
    temperaments,
    developmentAreas,
    careerRecommendations,
  };
}

export default function ResultPage() {
  const router = useRouter();
  const [testResult, setTestResult] = useState<ExtendedTestResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Read data from localStorage on component mount
    try {
      const result = getTestResult();
      
      if (!result) {
        setError("No test result found. Please complete the test first.");
      } else {
        // Apply fallbacks for missing fields using weather metadata
        const resultWithFallbacks = applyFallbacks(result);
        setTestResult(resultWithFallbacks);
      }
    } catch (err) {
      console.error("Error loading test result:", err);
      setError("Failed to load test result. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="#FDF8F3"
      >
        <VStack gap={4}>
          <Spinner size="xl" color="orange.500" />
          <Text fontSize="lg" color="gray.600">
            Loading your results...
          </Text>
        </VStack>
      </Box>
    );
  }

  // Error state - no data available
  if (error || !testResult) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="#FDF8F3"
        px={4}
      >
        <Container maxW="container.md">
          <Box
            bg="white"
            borderRadius="xl"
            boxShadow="xl"
            p={{ base: 6, md: 8 }}
            borderWidth="2px"
            borderColor="red.400"
          >
            <VStack gap={6} alignItems="center">
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="bold"
                color="red.600"
                textAlign="center"
              >
                No Test Result Found
              </Text>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color="gray.600"
                textAlign="center"
              >
                {error || "We couldn't find your test result. Please complete the test to see your personality analysis."}
              </Text>
              <VStack gap={3} width="100%">
                <Button
                  colorScheme="orange"
                  size="lg"
                  width={{ base: "100%", md: "auto" }}
                  onClick={() => router.push("/test")}
                >
                  Start Test
                </Button>
                <Button
                  variant="outline"
                  colorScheme="gray"
                  size="lg"
                  width={{ base: "100%", md: "auto" }}
                  onClick={() => router.push("/")}
                >
                  Back to Home
                </Button>
              </VStack>
            </VStack>
          </Box>
        </Container>
      </Box>
    );
  }

  // Valid data - render new ResultPageLayout with 2-column design
  // Requirements: 1.1, 1.3, 1.4, 2.1, 3.1, 4.1, 6.1
  return <ResultPageLayout testResult={testResult} />;
}
