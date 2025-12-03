"use client";

import { Box, Heading } from "@chakra-ui/react";
import { TemperamentBar } from "./TemperamentBar";
import { TemperamentScore } from "@/types";

export interface TemperamentSectionProps {
  temperaments: TemperamentScore[];
}

/**
 * TemperamentSection component
 * Renders the "Komposisi Temperamen Kamu" section with 4 progress bars
 * - Header with section title
 * - 4 TemperamentBar components for Sanguinis, Koleris, Melankolis, Plegmatis
 * - Card styling with background and shadow
 *
 * Requirements: 2.1, 2.2
 */
export const TemperamentSection = ({
  temperaments,
}: TemperamentSectionProps) => {
  return (
    <Box bg="white" borderRadius="xl" boxShadow="lg" p={6} width="100%">
      <Heading
        as="h3"
        fontSize="lg"
        fontWeight="semibold"
        color="gray.700"
        mb={4}
      >
        Komposisi Cuaca Kamu
      </Heading>

      <Box>
        {temperaments.map((temperament) => (
          <TemperamentBar
            key={temperament.name}
            name={temperament.name}
            percentage={temperament.percentage}
            color={temperament.color}
          />
        ))}
      </Box>
    </Box>
  );
};
