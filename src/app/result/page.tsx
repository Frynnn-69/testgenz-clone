"use client";

import { useState, useEffect } from "react";
import { Box, Container, VStack, Text, Button, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { TestResult } from "@/types";
import { getTestResult } from "@/lib/localStorage";
import { WeatherResultContainer } from "@/components/result";

export default function ResultPage() {
  const router = useRouter();
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Read data from localStorage on component mount
    try {
      const result = getTestResult();
      
      if (!result) {
        setError("No test result found. Please complete the test first.");
      } else {
        setTestResult(result);
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
        bg="gray.50"
      >
        <VStack gap={4}>
          <Spinner size="xl" color="blue.500" />
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
        bg="gray.50"
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
                  colorScheme="blue"
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

  // Valid data - render weather result container
  return (
    <Box minHeight="100vh" bg="gray.50">
      <WeatherResultContainer testResult={testResult} />
    </Box>
  );
}
