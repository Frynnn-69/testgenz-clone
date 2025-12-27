"use client";

import Link from "next/link";
import { Flex, IconButton } from "@chakra-ui/react";
import { HiHome, HiRefresh, HiClock } from "react-icons/hi";
import { COLORS } from "@/lib/constants/theme";

export const FooterNavigation = () => {
  return (
    <Flex
      justify="center"
      align="center"
      gap={5}
      py={6}
      px={4}
      maxW="450px"
      mx="auto"
      mt={8}
    >

      <IconButton
        asChild
        size="xl"
        variant="outline"
        borderColor={COLORS.primary}
        color={COLORS.primary}
        borderWidth="2px"
        borderRadius="xl"
        _hover={{
          bg: COLORS.primary,
          color: "white",
          transform: "translateY(-2px)",
          shadow: "lg",
        }}
        _active={{
          transform: "translateY(0)",
        }}
        transition="all 0.2s"
      >
        <Link href="/" title="Kembali ke Beranda" aria-label="Kembali ke Beranda">
          <HiHome size={26} />
        </Link>
      </IconButton>

      <IconButton
        asChild
        size="xl"
        bg={COLORS.primary}
        color="white"
        borderRadius="xl"
        _hover={{
          bg: COLORS.primaryHover,
          transform: "translateY(-2px)",
          shadow: "lg",
        }}
        _active={{
          transform: "translateY(0)",
        }}
        transition="all 0.2s"
      >
        <Link href="/test" title="Ulangi Tes" aria-label="Ulangi Tes">
          <HiRefresh size={26} />
        </Link>
      </IconButton>

      <IconButton
        asChild
        size="xl"
        variant="outline"
        borderColor={COLORS.primary}
        color={COLORS.primary}
        borderWidth="2px"
        borderRadius="xl"
        _hover={{
          bg: COLORS.primary,
          color: "white",
          transform: "translateY(-2px)",
          shadow: "lg",
        }}
        _active={{
          transform: "translateY(0)",
        }}
        transition="all 0.2s"
      >
        <Link href="/history" title="Lihat Riwayat" aria-label="Lihat Riwayat">
          <HiClock size={26} />
        </Link>
      </IconButton>
    </Flex>
  );
};
