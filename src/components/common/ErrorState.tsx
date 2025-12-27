"use client";

import { Box, Container, VStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import { COLORS } from "@/lib/constants/theme";

interface ErrorStateProps {
  error?: string | null;
}

export const ErrorState = ({ error }: ErrorStateProps) => {
  const router = useRouter();

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={COLORS.background}
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
};
