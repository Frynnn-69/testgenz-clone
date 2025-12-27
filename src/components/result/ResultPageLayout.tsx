"use client";

import { useRef, useLayoutEffect } from "react";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { ExtendedTestResult } from "@/types";
import { useResultData } from "@/hooks/useResultData";
import { useResultActions } from "@/hooks/useResultActions";
import { ResultHeader } from "./ResultHeader";
import { ResultCard } from "./ResultCard";
import { TemperamentSection } from "./TemperamentSection";
import { DevelopmentSection } from "./DevelopmentSection";
import { CareerSection } from "./CareerSection";
import { FooterNavigation } from "./FooterNavigation";
import { getWeatherMetadata } from "./weatherMetadata";
import { COLORS } from "@/lib/constants/theme";

export interface ResultPageLayoutProps {
  testResult: ExtendedTestResult;
}

export const ResultPageLayout = ({ testResult }: ResultPageLayoutProps) => {
  const {
    subtitle,
    traits,
    description,
    temperamentsWithColors,
    developmentAreas,
    careerRecommendations,
  } = useResultData(testResult);

  const { handleShare, handleDownloadPDF } = useResultActions();

  const leftColRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);

  // Sync column heights di desktop
  useLayoutEffect(() => {
    const syncHeights = () => {
      const left = leftColRef.current;
      const right = rightColRef.current;
      if (!left || !right) return;

      left.style.minHeight = "";
      right.style.minHeight = "";

      if (window.innerWidth >= 768) {
        const lh = left.getBoundingClientRect().height;
        const rh = right.getBoundingClientRect().height;
        const max = Math.max(lh, rh);
        left.style.minHeight = `${max}px`;
        right.style.minHeight = `${max}px`;
      }
    };

    syncHeights();
    const ro = new ResizeObserver(syncHeights);
    if (leftColRef.current) ro.observe(leftColRef.current);
    if (rightColRef.current) ro.observe(rightColRef.current);
    window.addEventListener("resize", syncHeights);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", syncHeights);
    };
  }, []);

  const metadata = getWeatherMetadata(testResult.weatherType);

  return (
    <Box
      minH="100vh"
      bg={COLORS.background}
      py={{ base: 6, md: 10 }}
      px={{ base: 4, md: 8 }}
    >
      <Box maxW="1200px" mx="auto">
        <Box mb={4}>
          <ResultHeader
            weatherType={testResult.weatherType}
            subtitle={subtitle}
            titleOverride={testResult.analysisTitle}
            fullTitle={testResult.analysisTitle}
            userName={testResult.userData?.nama}
          />
        </Box>

        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={{ base: 6, md: 8 }}
          alignItems="stretch"
        >
          {/* Left Column */}
          <GridItem ref={leftColRef}>
            <Box display="flex" flexDirection="column" height="100%">
              <ResultCard
                weatherType={testResult.weatherType}
                traits={traits}
                imageSrc={
                  metadata?.imageSrc ||
                  `/weather/${testResult.weatherType.toLowerCase()}.png`
                }
                onShare={() => handleShare(testResult.weatherType)}
                onDownloadPDF={() => handleDownloadPDF(testResult.weatherType)}
              />
            </Box>
          </GridItem>

          {/* Right Column */}
          <GridItem ref={rightColRef}>
            <Box display="flex" flexDirection="column" gap={6} height="100%">
              {/* Chart Section */}
              <TemperamentSection temperaments={temperamentsWithColors} />

              <DevelopmentSection areas={developmentAreas} />
              <Box mb={{ base: 1, md: 2 }}>
                <CareerSection careers={careerRecommendations} />
              </Box>

              <Box flex="0.15" minH="2px" />

              {/* Narrative Box */}
              <Box
                bg="white"
                borderRadius="xl"
                boxShadow="md"
                p={6}
                position="relative"
                overflow="hidden"
                border="2px solid"
                borderColor="transparent"
                transition="all 0.3s ease"
                cursor="default"
                _hover={{
                  borderColor: COLORS.primary,
                  boxShadow: `0 0 24px ${COLORS.primary}40, 0 4px 12px rgba(0,0,0,0.1)`,
                  transform: "scale(1.01)",
                }}
              >
                <Box
                  position="absolute"
                  left={{ base: 6, md: 8 }}
                  top={{ base: 6, md: 8 }}
                  transform="translateY(-20%)"
                  zIndex={1}
                  color="orange.800"
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="bold"
                  lineHeight={1}
                >
                  &ldquo;
                </Box>

                <Box pl={{ base: 8, md: 10 }} pr={4}>
                  <Text
                    color="gray.800"
                    fontSize={{ base: "md", md: "lg" }}
                    lineHeight="taller"
                    fontStyle="normal"
                    zIndex={2}
                  >
                    {description}
                  </Text>
                  <Box mt={2} textAlign="right">
                    <Text fontSize="sm" color="gray.500">
                      — Ringkasan Kepribadian
                    </Text>
                  </Box>
                </Box>

                <Box
                  position="absolute"
                  right={0}
                  top={0}
                  bottom={0}
                  width={{ base: 2, md: 3 }}
                  bg="orange.800"
                  opacity={0.6}
                />
              </Box>
            </Box>
          </GridItem>
        </Grid>

        <FooterNavigation />
      </Box>
    </Box>
  );
};
