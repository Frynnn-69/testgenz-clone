"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  Text,
  Stack,
} from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { saveUserData, getCurrentUser } from "@/lib/userAuth";
import { updateHistoryUserName } from "@/lib/localStorage";

export default function PreTestForm() {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setNama(user.nama);
      if (user.email) setEmail(user.email);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nama || nama.trim() === "") {
      toaster.create({
        title: "Nama wajib diisi",
        type: "error",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);

    const userData = {
      nama: nama.trim(),
      email: email && email.trim() !== "" ? email.trim() : undefined,
    };

    try {
      const currentUser = getCurrentUser();
      const nameChanged = currentUser && currentUser.nama !== userData.nama;

      saveUserData(userData);

      if (nameChanged) {
        updateHistoryUserName(userData.nama);
      }

      setTimeout(() => {
        setIsLoading(false);
        router.push("/test");
      }, 1000);
    } catch (err) {
      setIsLoading(false);
      toaster.create({ title: "Gagal menyimpan data", type: "error" });
    }
  };

  // --- PALET WARNA (Earth Tone) ---
  const colors = {
    primary: "#8F6E56", // Coklat Utama
    hover: "#755943", // Coklat Gelap (Hover)
    bg: "white", // Card Background
    textMain: "#171717",
    textMuted: "#737373",
    border: "#E5E5E5",
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      width="100%"
      maxW="450px"
      bg={colors.bg}
      borderRadius="2xl"
      p={{ base: 6, md: 8 }}
      shadow="2xl"
      border="1px solid"
      borderColor={colors.border}
      position="relative"
      zIndex={10}
    >
      <VStack gap={6} align="stretch">
        <Box textAlign="center">
          <Heading
            as="h1"
            size="lg"
            fontWeight="bold"
            color={colors.primary}
            mb={2}
          >
            Tes Tipe Cuaca
          </Heading>
          <Text fontSize="md" color={colors.textMuted} lineHeight="tall">
            Kamu tipe yang cerah seperti matahari, atau tenang seperti hujan?
          </Text>
        </Box>

        <Stack gap={5}>
          {/* Input Nama */}
          <Field.Root required width="full">
            <Field.Label color={colors.textMain} fontWeight="medium" mb={1.5}>
              Nama Panggilan
            </Field.Label>
            <Input
              variant="subtle" // Style lebih soft/transparan
              size="lg"
              placeholder="Contoh: Budi"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              // BACKGROUND TRANSPARAN (Abu tipis)
              bg="whiteAlpha.300"
              color={colors.textMain}
              borderRadius="lg"
              _placeholder={{ color: "gray.400" }}
              // Focus state tetap Coklat
              _focus={{
                bg: "white",
                borderColor: colors.primary,
                boxShadow: `0 0 0 1px ${colors.primary}`,
                outline: "none",
              }}
              transition="all 0.2s"
            />
          </Field.Root>

          {/* Input Email */}
          <Field.Root width="full">
            <Field.Label color={colors.textMain} fontWeight="medium" mb={1.5}>
              Email{" "}
              <Text as="span" color="gray.400" fontWeight="normal">
                (Opsional)
              </Text>
            </Field.Label>
            <Input
              type="email"
              variant="subtle"
              size="lg"
              placeholder="email@kamu.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // BACKGROUND TRANSPARAN
              bg="blackAlpha.50"
              color={colors.textMain}
              borderRadius="lg"
              _placeholder={{ color: "gray.400" }}
              _focus={{
                bg: "white",
                borderColor: colors.primary,
                boxShadow: `0 0 0 1px ${colors.primary}`,
                outline: "none",
              }}
              transition="all 0.2s"
            />
          </Field.Root>
        </Stack>

        <Button
          type="submit"
          size="lg"
          width="full"
          loading={isLoading}
          loadingText="Menganalisa..."
          bg={colors.primary}
          color="white"
          fontWeight="bold"
          borderRadius="full"
          mt={2}
          _hover={{
            bg: colors.hover,
            transform: "translateY(-2px)",
            shadow: "md",
          }}
          _active={{
            transform: "translateY(0)",
          }}
          transition="all 0.2s"
        >
          Mulai Tes
        </Button>
      </VStack>
    </Box>
  );
}
