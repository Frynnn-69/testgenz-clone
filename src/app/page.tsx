"use client";

import { Suspense, useState, useEffect, startTransition } from "react";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Button,
  Container,
  Heading,
  VStack,
  Text,
  HStack,
  Icon,
} from "@chakra-ui/react";
import PreTestForm from "@/components/test/PreTestForm";
import { toaster } from "@/components/ui/toaster";

function HomeContent() {
  const searchParams = useSearchParams();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "auth_required") {
      queueMicrotask(() => {
        startTransition(() => {
          toaster.create({
            title: "Akses Ditolak",
            description: "Silakan isi data diri terlebih dahulu untuk memulai tes",
            type: "error",
            duration: 4000,
          });
        });
      });
    }
  }, [searchParams]);

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, #0f0c29, #302b63, #24243e)"
      color="white"
      position="relative"
      overflow="hidden"
    >
      {/* Background decoration */}
      <Box
        position="absolute"
        top="-20%"
        right="-10%"
        w="500px"
        h="500px"
        bg="purple.500"
        opacity={0.1}
        borderRadius="full"
        filter="blur(100px)"
      />
      <Box
        position="absolute"
        bottom="-20%"
        left="-10%"
        w="400px"
        h="400px"
        bg="teal.500"
        opacity={0.1}
        borderRadius="full"
        filter="blur(100px)"
      />

      <Container maxW="container.lg" py={20} position="relative" zIndex={1}>
        <VStack gap={12} textAlign="center">
          {/* Hero Section */}
          <VStack gap={6}>
            <Text fontSize="lg" color="teal.300" fontWeight="medium">
              🌤️ Tes Kepribadian Cuaca
            </Text>
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
              fontWeight="bold"
              lineHeight="shorter"
            >
              Temukan Tipe Cuaca
              <br />
              <Text as="span" color="teal.400">
                Kepribadianmu
              </Text>
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="gray.400"
              maxW="600px"
            >
              Apakah kamu cerah seperti matahari, tenang seperti hujan, atau
              penuh energi seperti badai? Ikuti tes singkat ini untuk mengetahui!
            </Text>
          </VStack>

          {/* CTA Buttons */}
          <HStack gap={4} flexWrap="wrap" justify="center">
            <Button
              size="lg"
              colorPalette="teal"
              px={8}
              py={6}
              fontSize="lg"
              onClick={() => setShowModal(true)}
            >
              🚀 Mulai Tes Sekarang
            </Button>
            <Button
              size="lg"
              variant="outline"
              colorPalette="whiteAlpha"
              px={8}
              py={6}
              fontSize="lg"
              onClick={() => setShowModal(true)}
            >
              👤 Login / Daftar
            </Button>
          </HStack>

          {/* Features */}
          <HStack
            gap={8}
            flexWrap="wrap"
            justify="center"
            mt={8}
            color="gray.400"
          >
            <VStack>
              <Text fontSize="2xl">⏱️</Text>
              <Text fontSize="sm">5 Menit</Text>
            </VStack>
            <VStack>
              <Text fontSize="2xl">📊</Text>
              <Text fontSize="sm">Hasil Akurat</Text>
            </VStack>
            <VStack>
              <Text fontSize="2xl">🎯</Text>
              <Text fontSize="sm">Gratis</Text>
            </VStack>
          </HStack>
        </VStack>
      </Container>

      {/* Modal Overlay */}
      {showModal && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="blackAlpha.700"
          backdropFilter="blur(8px)"
          zIndex={100}
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={4}
          onClick={() => setShowModal(false)}
        >
          <Box onClick={(e) => e.stopPropagation()} position="relative">
            {/* Close button */}
            <Button
              position="absolute"
              top={-3}
              right={-3}
              size="sm"
              borderRadius="full"
              colorPalette="gray"
              onClick={() => setShowModal(false)}
              zIndex={101}
            >
              ✕
            </Button>
            <PreTestForm />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <Box
          minH="100vh"
          bg="#0f0c29"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="white">Loading...</Text>
        </Box>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
