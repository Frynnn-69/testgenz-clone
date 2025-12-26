"use client";

import { Suspense, useState, useEffect, startTransition } from "react";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  HStack,
} from "@chakra-ui/react";
import Button from "@/components/common/Button";
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

  // --- PALET WARNA (Earth Tone) ---
  const primaryColor = "#8F6E56"; // Coklat Utama
  const bgColor = "#FDF8F3";      // Krem Background (Sama kayak Result Page)

  return (
    <Box
      minH="100vh"
      bg={bgColor} // GANTI: Background jadi Krem
      color="gray.800" // GANTI: Teks jadi gelap
      position="relative"
      overflow="hidden"
    >
      {/* Background decoration (Diubah jadi warna soft/pastel) */}
      <Box
        position="absolute"
        top="-20%"
        right="-10%"
        w="500px"
        h="500px"
        bg="orange.200" // GANTI: Purple -> Orange Soft
        opacity={0.3}
        borderRadius="full"
        filter="blur(100px)"
      />
      <Box
        position="absolute"
        bottom="-20%"
        left="-10%"
        w="400px"
        h="400px"
        bg="yellow.100" // GANTI: Teal -> Yellow Soft
        opacity={0.4}
        borderRadius="full"
        filter="blur(100px)"
      />

      <Container maxW="container.lg" py={20} position="relative" zIndex={1}>
        <VStack gap={12} textAlign="center">
          {/* Hero Section */}
          <VStack gap={6}>
            <Text fontSize="lg" color={primaryColor} fontWeight="bold" letterSpacing="wide">
              🌤️ Tes Kepribadian Cuaca
            </Text>
            
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
              fontWeight="900"
              lineHeight="shorter"
              color="gray.800"
            >
              Temukan Tipe Cuaca
              <br />
              <Text as="span" color={primaryColor}> {/* Highlight Coklat */}
                Kepribadianmu
              </Text>
            </Heading>
            
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="gray.600"
              maxW="600px"
              lineHeight="tall"
            >
              Apakah kamu cerah seperti matahari, tenang seperti hujan, atau
              penuh energi seperti badai? Ikuti tes singkat ini untuk
              mengetahui!
            </Text>
          </VStack>

          {/* CTA Buttons */}
          <HStack gap={4} flexWrap="wrap" justify="center">
            <Button
              size="lg"
              bg={primaryColor}
              color="white"
              px={8}
              py={7} // Tombol agak tinggi biar gagah
              fontSize="lg"
              fontWeight="bold"
              borderRadius="full"
              _hover={{ bg: "#755943", transform: "translateY(-2px)", shadow: "lg" }}
              transition="all 0.2s"
              onClick={() => setShowModal(true)}
            >
              🚀 Mulai Tes Sekarang
            </Button>
            
          </HStack>

          {/* Features (Ikon Stats) */}
          <HStack
            gap={10}
            flexWrap="wrap"
            justify="center"
            mt={10}
            color="gray.500"
          >
            <VStack gap={1}>
              <Text fontSize="3xl">⏱️</Text>
              <Text fontSize="sm" fontWeight="medium">5 Menit</Text>
            </VStack>
            <VStack gap={1}>
              <Text fontSize="3xl">📊</Text>
              <Text fontSize="sm" fontWeight="medium">Hasil Akurat</Text>
            </VStack>
            <VStack gap={1}>
              <Text fontSize="3xl">🎯</Text>
              <Text fontSize="sm" fontWeight="medium">Gratis</Text>
            </VStack>
          </HStack>
        </VStack>
      </Container>

      {/* Modal Overlay (PreTestForm) */}
      {showModal && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="blackAlpha.600" // Overlay gelap transparan biar fokus ke form putih
          backdropFilter="blur(5px)"
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
              top={-4}
              right={-4}
              size="sm"
              borderRadius="full"
              bg="white"
              color="gray.500"
              shadow="md"
              _hover={{ bg: "gray.100", color: "red.500" }}
              onClick={() => setShowModal(false)}
              zIndex={101}
            >
              ✕
            </Button>
            
            {/* Form Component (Sudah putih dari step sebelumnya) */}
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
          bg="#FDF8F3"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="orange.800" fontWeight="bold">Loading...</Text>
        </Box>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
