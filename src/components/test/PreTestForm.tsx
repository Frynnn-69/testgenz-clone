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
import { COLORS } from "@/lib/constants/theme";

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
      saveUserData(userData);

      setTimeout(() => {
        setIsLoading(false);
        router.push("/test");
      }, 1000);
    } catch {
      setIsLoading(false);
      toaster.create({ title: "Gagal menyimpan data", type: "error" });
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      width="100%"
      maxW="450px"
      bg="white"
      borderRadius="2xl"
      p={{ base: 6, md: 8 }}
      shadow="2xl"
      border="1px solid"
      borderColor="#E5E5E5"
      position="relative"
      zIndex={10}
    >
      <VStack gap={6} align="stretch">
        <Box textAlign="center">
          <Heading
            as="h1"
            size="lg"
            fontWeight="bold"
            color={COLORS.primary}
            mb={2}
          >
            Tes Tipe Cuaca
          </Heading>
          <Text fontSize="md" color="#737373" lineHeight="tall">
            Kamu tipe yang cerah seperti matahari, atau tenang seperti hujan?
          </Text>
        </Box>

        <Stack gap={5}>
          <Field.Root required width="full">
            <Field.Label color="#171717" fontWeight="medium" mb={1.5}>
              Nama Panggilan
            </Field.Label>
            <Input
              variant="subtle"
              size="lg"
              placeholder="Contoh: Budi"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              bg="whiteAlpha.300"
              color="#171717"
              borderRadius="lg"
              _placeholder={{ color: "gray.400" }}
              _focus={{
                bg: "white",
                borderColor: COLORS.primary,
                boxShadow: `0 0 0 1px ${COLORS.primary}`,
                outline: "none",
              }}
              transition="all 0.2s"
            />
          </Field.Root>

          <Field.Root width="full">
            <Field.Label color="#171717" fontWeight="medium" mb={1.5}>
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
              bg="blackAlpha.50"
              color="#171717"
              borderRadius="lg"
              _placeholder={{ color: "gray.400" }}
              _focus={{
                bg: "white",
                borderColor: COLORS.primary,
                boxShadow: `0 0 0 1px ${COLORS.primary}`,
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
          bg={COLORS.primary}
          color="white"
          fontWeight="bold"
          borderRadius="full"
          mt={2}
          _hover={{
            bg: COLORS.primaryHover,
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
