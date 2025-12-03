"use client";

import { useEffect, useRef, useLayoutEffect } from "react";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { ExtendedTestResult } from "@/types";
import { ResultHeader } from "./ResultHeader";
import { ResultCard } from "./ResultCard";
import { TemperamentSection } from "./TemperamentSection";
import { DevelopmentSection } from "./DevelopmentSection";
import { CareerSection } from "./CareerSection";
import { FooterNavigation } from "./FooterNavigation";
import { getWeatherMetadata, TEMPERAMENT_COLORS } from "./weatherMetadata";

export interface ResultPageLayoutProps {
  testResult: ExtendedTestResult;
}

/**
 * ResultPageLayout component
 * Main container with 2-column responsive grid layout
 * - Left column: ResultHeader, ResultCard, description, ShareButtons
 * - Right column: TemperamentSection, DevelopmentSection, CareerSection
 * - Background cream/beige (#FDF8F3)
 * - Responsive: 2 columns on desktop, 1 column on mobile
 *
 * Requirements: 6.1, 6.2, 6.3, 6.4
 */
export const ResultPageLayout = ({ testResult }: ResultPageLayoutProps) => {
  // Get weather metadata for defaults and display info
  const metadata = getWeatherMetadata(testResult.weatherType);

  // Use metadata defaults if data is missing
  const subtitle = metadata?.subtitle || "Tipe Kepribadian";
  const colorScheme = metadata?.colorScheme || "orange";
  const traits = metadata?.traits || [];
  // Prefer AI-provided body if available; otherwise fall back to metadata description or stored analysis
  const description =
    testResult.analysisBody || metadata?.description || testResult.analysis;

  // Ensure weather types have colors
  const temperamentsWithColors = testResult.temperaments?.map((t) => ({
    ...t,
    color: t.color || TEMPERAMENT_COLORS[t.name] || "gray.400",
  })) || [
    { name: "Sunny", percentage: 25, color: TEMPERAMENT_COLORS.Sunny },
    { name: "Stormy", percentage: 25, color: TEMPERAMENT_COLORS.Stormy },
    { name: "Rainy", percentage: 25, color: TEMPERAMENT_COLORS.Rainy },
    { name: "Cloudy", percentage: 25, color: TEMPERAMENT_COLORS.Cloudy },
  ];

  // Get development areas with fallback
  const developmentAreas =
    testResult.developmentAreas?.length > 0
      ? testResult.developmentAreas
      : metadata?.defaultDevelopmentAreas || [];

  // Get career recommendations with fallback
  const careerRecommendations =
    testResult.careerRecommendations?.length > 0
      ? testResult.careerRecommendations
      : metadata?.defaultCareers || [];

  // Refs for left/right columns so we can sync heights on desktop
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);

  // Debug: log AI analysis title/body on mount to help diagnose header visibility
  useEffect(() => {
    console.log(
      "ResultPageLayout mount - analysisTitle:",
      testResult.analysisTitle,
      "analysis:",
      testResult.analysis,
    );
  }, [testResult.analysisTitle, testResult.analysis]);

  // Use layout effect + ResizeObserver to keep both columns equal height on larger screens.
  // This avoids stretching the left column width-wise; instead we match vertical size.
  useLayoutEffect(() => {
    const syncHeights = () => {
      const left = leftColRef.current;
      const right = rightColRef.current;
      if (!left || !right) {
        // Debug: note if one of the elements is missing and current window width
        console.debug("syncHeights: missing element", {
          leftExists: !!left,
          rightExists: !!right,
          innerWidth: typeof window !== "undefined" ? window.innerWidth : null,
        });
        return;
      }

      // Reset minHeight to allow natural recalculation
      left.style.minHeight = "";
      right.style.minHeight = "";

      const lh = left.getBoundingClientRect().height;
      const rh = right.getBoundingClientRect().height;
      const max = Math.max(lh, rh);

      // Debug: output measured heights and window width to help diagnose mismatch
      console.debug("syncHeights measurements", {
        leftHeight: lh,
        rightHeight: rh,
        appliedHeight: max,
        innerWidth: typeof window !== "undefined" ? window.innerWidth : null,
      });

      // Only apply on desktop width to avoid mobile stacking problems
      if (window.innerWidth >= 768) {
        left.style.minHeight = `${max}px`;
        right.style.minHeight = `${max}px`;
        // Debug: confirm minHeight applied
        console.debug("syncHeights applied minHeight", {
          minHeight: `${max}px`,
        });
      } else {
        left.style.minHeight = "";
        right.style.minHeight = "";
        // Debug: mobile - cleared minHeight
        console.debug("syncHeights cleared minHeight for mobile", {
          innerWidth: window.innerWidth,
        });
      }
    };

    // Initial sync
    syncHeights();

    // Observe both columns for content changes
    const roLeft = new ResizeObserver(syncHeights);
    const roRight = new ResizeObserver(syncHeights);
    if (leftColRef.current) roLeft.observe(leftColRef.current);
    if (rightColRef.current) roRight.observe(rightColRef.current);

    // Also sync on window resize
    window.addEventListener("resize", syncHeights);

    return () => {
      roLeft.disconnect();
      roRight.disconnect();
      window.removeEventListener("resize", syncHeights);
    };
  }, [testResult.analysisTitle, testResult.analysis]);

  // Share handlers (placeholder implementations)
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Hasil Tes Kepribadian: ${testResult.weatherType}`,
          text: `Saya adalah ${testResult.weatherType}! ${subtitle}`,
          url: window.location.href,
        })
        .catch(() => {
          // User cancelled or share failed
        });
    }
  };

  const handleDownloadPDF = () => {
    // TODO: Implement PDF download functionality
    console.log("Download PDF clicked");
  };

  return (
    <Box
      minH="100vh"
      bg="#FDF8F3"
      py={{ base: 6, md: 10 }}
      px={{ base: 4, md: 8 }}
    >
      <Box maxW="1200px" mx="auto">
        {/* Header full-width on top */}
        <Box mb={4}>
          <ResultHeader
            weatherType={testResult.weatherType}
            subtitle={subtitle}
            colorScheme={colorScheme}
            userName={testResult.userData?.nama}
            titleOverride={
              testResult.analysisTitle ??
              `Tipe Kepribadian: ${testResult.weatherType}`
            }
            fullTitle={testResult.analysisTitle}
          />
        </Box>

        {/* Two-column content beneath header */}
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={{ base: 6, md: 8 }}
          alignItems="stretch"
          gridAutoRows={{ base: "auto", md: "1fr" }}
        >
          {/* Left Column: poster/card and actions */}
          <GridItem ref={leftColRef}>
            {/* make the left column a flex column so the card can grow to match right column height */}
            <Box display="flex" flexDirection="column" height="100%">
              {/* allow ResultCard to take available vertical space */}
              <Box flex="1" display="flex" flexDirection="column">
                <ResultCard
                  weatherType={testResult.weatherType}
                  traits={traits}
                  imageSrc={
                    metadata?.imageSrc ||
                    `/weather/${testResult.weatherType.toLowerCase()}.png`
                  }
                  onShare={handleShare}
                  onDownloadPDF={handleDownloadPDF}
                />
              </Box>
            </Box>
          </GridItem>

          {/* Right Column - Details */}
          <GridItem ref={rightColRef}>
            {/* ensure right column stretches so both columns match height */}
            <Box display="flex" flexDirection="column" gap={6} height="100%">
              <TemperamentSection temperaments={temperamentsWithColors} />
              <DevelopmentSection areas={developmentAreas} />
              <Box mb={{ base: 1, md: 2 }}>
                <CareerSection careers={careerRecommendations} />
              </Box>

              {/* small flexible spacer so narrative sits close under career section */}
              <Box flex="0.15" minH="2px" />

              {/* Narrative moved into right column so it lines up with left column */}
              <Box
                bg="white"
                borderRadius="xl"
                boxShadow="lg"
                p={{ base: 4, md: 6 }}
                position="relative"
                overflow="hidden"
              >
                {/* Decorative left quote mark - moved right to sit near text and reduced size */}
                {/* Decorative left quote mark - larger and bolder for emphasis (kept position) */}
                <Box
                  position="absolute"
                  left={{ base: 6, md: 8 }}
                  top={{ base: 6, md: 8 }}
                  transform="translateY(-2%)"
                  zIndex={1}
                  color="orange.800"
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="bold"
                  lineHeight={1}
                >
                  “
                </Box>

                {/* Content area with reduced left padding so text sits closer to quote */}
                <Box pl={{ base: 4, md: 6 }} pr={4}>
                  <Text
                    color="gray.800"
                    fontSize={{ base: "md", md: "lg" }}
                    lineHeight="taller"
                    fontStyle="normal"
                    zIndex={2}
                  >
                    {description}
                  </Text>

                  {/* Attribution / subtle caption */}
                  <Box mt={1} textAlign="right">
                    <Text fontSize="sm" color="gray.500">
                      — Ringkasan Kepribadian
                    </Text>
                  </Box>
                </Box>

                {/* Right-side decorative vertical bar for emphasis */}
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

        {/* Narrative has been moved into the right column so it aligns with the left column.
            Kept this placeholder comment to indicate where the block was removed. */}
        {/* Footer Navigation */}
        <FooterNavigation />
      </Box>
    </Box>
  );
};
