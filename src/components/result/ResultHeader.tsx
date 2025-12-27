"use client";

import { Box, Text, Heading } from "@chakra-ui/react";
import { COLORS } from "@/lib/constants/theme";

export interface ResultHeaderProps {
  weatherType: string;
  subtitle: string;
  titleOverride?: string;
  fullTitle?: string;
  userName?: string;
}

export const ResultHeader = ({
  weatherType,
  subtitle,
  titleOverride,
  fullTitle,
}: ResultHeaderProps) => {
  const headingContent = titleOverride
    ? titleOverride
    : weatherType.toUpperCase();
  const tooltipLabel = fullTitle || headingContent;

  return (
    <Box textAlign="center" mb={8} px={{ base: 4, md: 0 }} pt={2}>
      <Heading
        as="h1"
        fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
        fontWeight="800"
        mb={4}
        lineHeight={1.2}
        color={COLORS.primary}
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
          fontSize={{ base: "lg", md: "xl" }}
          color="gray.600"
          fontWeight="bold"
          mb={1}
          px={3}
          letterSpacing="wide"
        >
          {subtitle}
        </Text>

        <Box
          width={{ base: "120px", md: "180px" }}
          height="6px"
          borderRadius="full"
          bg={COLORS.primary}
          opacity={0.3}
          boxShadow={`0 4px 12px ${COLORS.primary}`}
        />
      </Box>
    </Box>
  );
};
