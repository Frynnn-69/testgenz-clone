"use client";

import { Box, Text, Heading } from "@chakra-ui/react";

export interface ResultHeaderProps {
  weatherType: string;
  subtitle: string;
  colorScheme: string; // "orange" | "blue" | "purple" | "gray"
  userName?: string; // Nama user dari localStorage
  titleOverride?: string; // Optional AI-provided title to display instead of weatherType
  fullTitle?: string; // Full AI-provided title for tooltip (if different)
}

export const ResultHeader = ({
  weatherType,
  subtitle,
  colorScheme,
  userName,
  titleOverride,
  fullTitle,
}: ResultHeaderProps) => {
  // Color tokens and gradients mapped by scheme
  const colorMap: Record<string, string> = {
    orange: "orange.500",
    blue: "blue.500",
    purple: "purple.500",
    gray: "gray.500",
  };

  const gradientMap: Record<string, string> = {
    orange: "linear(to-r, orange.500, pink.400)",
    blue: "linear(to-r, blue.500, cyan.400)",
    purple: "linear(to-r, purple.500, pink.400)",
    gray: "linear(to-r, gray.700, gray.500)",
  };

  const displayName = userName || "Kamu";
  const headingContent = titleOverride
    ? titleOverride
    : weatherType.toUpperCase();
  const tooltipLabel = fullTitle || headingContent;

  const gradient = gradientMap[colorScheme] || gradientMap.orange;
  const colorToken = colorMap[colorScheme] || colorMap.orange;

  const primaryColor = "#8F6E56";

  return (
    <Box textAlign="center" mb={8} px={{ base: 4, md: 0 }} pt={2}>
      <Heading
        as="h1"
        fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
        fontWeight="800"
        mb={4}
        lineHeight={1.2}
        color={primaryColor} // Override warna jadi Coklat
        title={tooltipLabel}
        letterSpacing="tight"
        fontStyle="italic"
      >
        {headingContent}
      </Heading>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Text
          fontSize={{ base: "lg", md: "xl" }} // Diperbesar sedikit (sebelumnya md)
          color="gray.600"
          fontWeight="bold" // Font ganti jadi Bold (sebelumnya Italic Semibold)
          mb={1} // Jarak ke garis bawah
          px={3}
          letterSpacing="wide" // Sedikit renggang biar elegan
        >
          {subtitle}
        </Text>

        {/* Decorative Underline (Style Lama yang dikembalikan) */}
        <Box
          width={{ base: "120px", md: "180px" }} // Lebar disesuaikan text yang membesar
          height="6px" // Sedikit lebih tipis biar manis
          borderRadius="full"
          bg={primaryColor} // Warna Coklat
          opacity={0.3} // Transparansi agar tidak terlalu harsh
          boxShadow={`0 4px 12px ${primaryColor}`} // Glow efek coklat
        />
      </Box>
    </Box>
  );
};
