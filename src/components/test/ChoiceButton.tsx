import { Box, Text } from "@chakra-ui/react";

interface ChoiceButtonProps {
  label: string;
  text: string;
  isSelected?: boolean;
  onClick: () => void;
}

export const ChoiceButton = ({
  label,
  text,
  isSelected = false,
  onClick,
}: ChoiceButtonProps) => {
  // Warna Design System (Earth Tone)
  const colors = {
    primary: "#8F6E56", // Coklat (Border/Text)
    bgSelected: "#EDE2D4", // Krem (Background saat dipilih/hover)
  };

  return (
    <Box
      as="button"
      width="100%"
      display="flex"
      alignItems="flex-start"
      gap={3}
      p={4}
      borderRadius="lg"
      border="1px solid"
      // UBAH: Logic warna border (Blue -> Coklat)
      borderColor={isSelected ? colors.primary : "gray.200"}
      // UBAH: Logic warna background (Blue.50 -> Krem)
      bg={isSelected ? colors.bgSelected : "white"}
      textAlign="left"
      transition="all 0.2s"
      _hover={{
        borderColor: colors.primary, // Hover border jadi Coklat
        bg: colors.bgSelected, // Hover bg jadi Krem
        transform: "translateY(-2px)",
        shadow: "sm",
      }}
      _active={{
        transform: "translateY(0)",
      }}
      onClick={onClick}
      cursor="pointer"
    >
      {/* UBAH: Warna Label (A, B, C...) jadi Coklat */}
      <Text
        fontSize="md"
        fontWeight="semibold"
        color={colors.primary}
        flexShrink={0}
      >
        {label}.
      </Text>
      <Text fontSize="md" color="gray.800" lineHeight="tall">
        {text}
      </Text>
    </Box>
  );
};
