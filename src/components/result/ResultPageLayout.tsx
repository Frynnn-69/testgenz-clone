"use client";

import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { ExtendedTestResult } from "@/types";
import { ResultHeader } from "./ResultHeader";
import { ResultCard } from "./ResultCard";
import { ShareButtons } from "./ShareButtons";
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
  const description = metadata?.description || testResult.analysis;
  
  // Ensure weather types have colors
  const temperamentsWithColors = testResult.temperaments?.map(t => ({
    ...t,
    color: t.color || TEMPERAMENT_COLORS[t.name] || "gray.400"
  })) || [
    { name: "Sunny", percentage: 25, color: TEMPERAMENT_COLORS.Sunny },
    { name: "Stormy", percentage: 25, color: TEMPERAMENT_COLORS.Stormy },
    { name: "Rainy", percentage: 25, color: TEMPERAMENT_COLORS.Rainy },
    { name: "Cloudy", percentage: 25, color: TEMPERAMENT_COLORS.Cloudy }
  ];

  // Get development areas with fallback
  const developmentAreas = testResult.developmentAreas?.length > 0
    ? testResult.developmentAreas
    : metadata?.defaultDevelopmentAreas || [];

  // Get career recommendations with fallback
  const careerRecommendations = testResult.careerRecommendations?.length > 0
    ? testResult.careerRecommendations
    : metadata?.defaultCareers || [];

  // Share handlers (placeholder implementations)
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Hasil Tes Kepribadian: ${testResult.weatherType}`,
        text: `Saya adalah ${testResult.weatherType}! ${subtitle}`,
        url: window.location.href
      }).catch(() => {
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
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={{ base: 6, md: 8 }}
        >
          {/* Left Column - Main Result */}
          <GridItem>
            <Box>
              <ResultHeader
                weatherType={testResult.weatherType}
                subtitle={subtitle}
                colorScheme={colorScheme}
                userName={testResult.userData?.nama}
              />
              
              <ResultCard
                weatherType={testResult.weatherType}
                traits={traits}
                imageSrc={metadata?.imageSrc || `/weather/${testResult.weatherType.toLowerCase()}.png`}
              />
              
              {/* Description */}
              <Box
                bg="white"
                borderRadius="xl"
                boxShadow="lg"
                p={6}
                mb={6}
              >
                <Text
                  color="gray.700"
                  fontSize="md"
                  lineHeight="tall"
                >
                  {description}
                </Text>
              </Box>
              
              <ShareButtons
                onShare={handleShare}
                onDownloadPDF={handleDownloadPDF}
              />
            </Box>
          </GridItem>

          {/* Right Column - Details */}
          <GridItem>
            <Box display="flex" flexDirection="column" gap={6}>
              <TemperamentSection temperaments={temperamentsWithColors} />
              <DevelopmentSection areas={developmentAreas} />
              <CareerSection careers={careerRecommendations} />
            </Box>
          </GridItem>
        </Grid>

        {/* Footer Navigation */}
        <FooterNavigation />
      </Box>
    </Box>
  );
};
