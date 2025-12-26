import { Box, Text } from "@chakra-ui/react";
import { Fredoka } from "next/font/google";
import "./CapybaraLoader.css";

const fredoka = Fredoka({ 
  subsets: ["latin"],
  weight: ["500"]
});

interface CapybaraLoaderProps {
  message?: string;
}

export const CapybaraLoader = ({ message }: CapybaraLoaderProps) => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      bg="#d9c1a6"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={4}
      zIndex={9999}
    >
      <div className="capybaraloader">
        <div className="capybara">
          <div className="capyhead">
            <div className="capyear">
              <div className="capyear2" />
            </div>
            <div className="capyear" />
            <div className="capymouth">
              <div className="capylips" />
              <div className="capylips" />
            </div>
            <div className="capyeye" />
            <div className="capyeye" />
          </div>
          <div className="capyleg" />
          <div className="capyleg2" />
          <div className="capyleg2" />
          <div className="capy" />
        </div>
        <div className="loader">
          <div className="loaderline" />
        </div>
      </div>
      {message && (
        <Text 
          color="#5d4536" 
          fontSize="3xl"
          fontWeight="500"
          mt={6}
          className={fredoka.className}
        >
          {message}
        </Text>
      )}
    </Box>
  );
};
