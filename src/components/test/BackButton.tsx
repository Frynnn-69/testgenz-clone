import { Button, Flex } from "@chakra-ui/react";

interface BackButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const BackButton = ({ onClick, disabled = false }: BackButtonProps) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      disabled={disabled}
      size="md"
      fontWeight="normal"
      color="gray.700"
      bg="transparent"
      _hover={{ 
        bg: "blue.50",
        color: "blue.600",
        "& .arrow-icon": {
          transform: "translateX(-4px)",
          color: "blue.600"
        }
      }}
      transition="all 0.2s ease-in-out"
      px={3}
      py={2}
      position="relative"
    >
      <Flex align="center" gap={2}>
        <span 
          className="arrow-icon"
          style={{
            fontSize: "1.125rem",
            transition: "all 0.2s ease-in-out",
            display: "inline-block"
          }}
        >
          ←
        </span>
        <span>Pertanyaan Sebelumnya</span>
      </Flex>
    </Button>
  );
};

