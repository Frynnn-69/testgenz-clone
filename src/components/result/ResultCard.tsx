"use client";

import { useState } from "react";
import { Box, Badge, Image, Portal, HStack } from "@chakra-ui/react";
import { ShareButtons } from "./ShareButtons";
import { COLORS } from "@/lib/constants/theme";

export interface ResultCardProps {
  weatherType: string;
  traits: string[];
  imageSrc: string;
  onShare?: (weatherType: string) => void;
  onDownloadPDF?: () => void;
}

// Card dengan poster image + traits
export const ResultCard = ({
  weatherType,
  traits,
  imageSrc,
  onShare,
  onDownloadPDF,
}: ResultCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getBackgroundGradient = (type: string): string => {
    const gradientMap: Record<string, string> = {
      sunny: "linear(to-br, orange.100, yellow.50)",
      rainy: "linear(to-br, blue.100, cyan.50)",
      stormy: "linear(to-br, purple.100, pink.50)",
      cloudy: "linear(to-br, gray.100, gray.50)",
    };
    return (
      gradientMap[type.toLowerCase()] || "linear(to-br, orange.100, yellow.50)"
    );
  };

  return (
    <>
      <Box
        bg="white"
        borderRadius="xl"
        boxShadow="lg"
        overflow="hidden"
        mb={0}
        w="100%"
        display="flex"
        flexDirection="column"
        height="100%"
      >
        {/* Poster Image Section */}
        <Box
          bgGradient={getBackgroundGradient(weatherType)}
          p={{ base: 2, md: 3 }}
          textAlign="center"
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          onClick={() => setIsModalOpen(true)}
          _hover={{ opacity: 0.95 }}
          transition="opacity 0.15s"
          title="Klik untuk memperbesar"
        >
          <Image
            src={imageSrc}
            alt={`${weatherType} personality type`}
            maxW="100%"
            maxH="100%"
            width="auto"
            height="auto"
            objectFit="contain"
            borderRadius="md"
          />
        </Box>

        {/* Traits Section */}
        <HStack justify="center" gap={3} wrap="wrap">
          {traits.map((trait, index) => (
            <Badge
              key={index}
              px={4}
              py={1.5}
              rounded="full"
              bg="#FAFAFA"
              color={COLORS.primary}
              border="1px solid"
              borderColor={COLORS.primary}
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="wide"
              textTransform="uppercase"
              shadow="sm"
              transition="all 0.2s ease"
              _hover={{
                bg: COLORS.primary,
                color: "white",
                transform: "translateY(-2px)",
                shadow: "md",
              }}
            >
              {trait}
            </Badge>
          ))}
        </HStack>

        <Box
          p={4}
          bg="white"
          borderTopWidth={1}
          borderColor="gray.50"
          display="flex"
          justifyContent="center"
        >
          <ShareButtons
            onShare={() => onShare?.(weatherType)}
            onDownloadPDF={onDownloadPDF ?? (() => {})}
          />
        </Box>
      </Box>

      {isModalOpen && (
        <Portal>
          <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="blackAlpha.800"
            zIndex={9999}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => setIsModalOpen(false)}
            cursor="pointer"
            p={4}
          >
            
            <Box
              position="absolute"
              top={4}
              right={4}
              color="white"
              fontSize="2xl"
              fontWeight="bold"
              cursor="pointer"
              _hover={{ color: "gray.300" }}
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </Box>

            <Image
              src={imageSrc}
              alt={`${weatherType} personality type`}
              maxH="90vh"
              maxW="90vw"
              objectFit="contain"
              borderRadius="lg"
              onClick={(e) => e.stopPropagation()}
            />
          </Box>
        </Portal>
      )}
    </>
  );
};
