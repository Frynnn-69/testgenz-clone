"use client";

import { Box, Heading } from "@chakra-ui/react";
import { TemperamentBar } from "./TemperamentBar";
import { TemperamentScore } from "@/types";

export interface TemperamentSectionProps {
  temperaments: TemperamentScore[];
}

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
        {temperaments.map((temperament, index) => (
          <TemperamentBar
            key={temperament.name}
            name={temperament.name}
            percentage={temperament.percentage}
            color={temperament.color || "gray.400"}
            index={index}
          />
        ))}
      </Box>
    </Box>
  );
};
