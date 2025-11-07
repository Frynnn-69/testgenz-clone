import { Box, Text } from "@chakra-ui/react";

interface BackButtonProps {
  onClick: () => void;
}

export const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      cursor="pointer"
      onClick={onClick}
      transition="all 0.2s"
      color="gray.700"
      _hover={{
        color: "blue.500",
      }}
      mb={6}
      width="fit-content"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="xl"
      >
        ←
      </Box>
      <Text fontSize="md" fontWeight="medium">
        Kembali
      </Text>
    </Box>
  );
};

