"use client";

import { forwardRef } from "react";
import { Button as ChakraButton } from "@chakra-ui/react";
import type { ButtonProps } from "@chakra-ui/react";
import { COLORS } from "@/lib/constants/theme";

export type CustomButtonProps = ButtonProps;

const Button = forwardRef<HTMLButtonElement, CustomButtonProps>((props, ref) => {
  return (
    <ChakraButton
      ref={ref}
      bg={COLORS.primary} 
      size="lg" 
      fontWeight="bold"
      borderRadius="xl" 
      _hover={{ bg: COLORS.primaryHover, transform: "translateY(-2px)", shadow: "lg" }}
              transition="all 0.2s"

      {...props}
    >
      {props.children}
    </ChakraButton>
  );
});

Button.displayName = "Button";

export default Button;
