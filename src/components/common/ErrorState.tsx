"use client";

import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Fredoka } from "next/font/google";
import { IoPlay, IoHome } from "react-icons/io5";
import PreTestForm from "@/components/test/PreTestForm";
import "./ErrorState.css";

const fredoka = Fredoka({ 
  subsets: ["latin"],
  weight: ["500"]
});

interface ErrorStateProps {
  message?: string;
}

export const ErrorState = ({ message }: ErrorStateProps) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleStartTest = () => {
    setShowModal(true);
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg="#d9c1a6"
      px={4}
      gap={8}
    >
      <div className="error_tv_wrapper">
        <div className="error_tv_main">
          <div className="error_antenna">
            <div className="error_antenna_shadow" />
            <div className="error_a1" />
            <div className="error_a1d" />
            <div className="error_a2" />
            <div className="error_a2d" />
          </div>
          <div className="error_tv">
            <div className="error_curve">
              <svg className="error_curve_svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 189.929 189.929" xmlSpace="preserve">
                <path d="M70.343,70.343c-30.554,30.553-44.806,72.7-39.102,115.635l-29.738,3.951C-5.442,137.659,11.917,86.34,49.129,49.13
        C86.34,11.918,137.664-5.445,189.928,1.502l-3.95,29.738C143.041,25.54,100.895,39.789,70.343,70.343z" />
              </svg>
            </div>
            <div className="error_display_div">
              <div className="error_screen_out">
                <div className="error_screen_out1">
                  <div className="error_screen">
                    <span className="error_notfound_text">
                      NO TEST RESULT FOUND!
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="error_lines">
              <div className="error_line1" />
              <div className="error_line2" />
              <div className="error_line3" />
            </div>
            <div className="error_buttons_div">
              <div className="error_b1"><div /></div>
              <div className="error_b2" />
              <div className="error_speakers">
                <div className="error_g1">
                  <div className="error_g11" />
                  <div className="error_g12" />
                  <div className="error_g13" />
                </div>
                <div className="error_g" />
                <div className="error_g" />
              </div>
            </div>
          </div>
          <div className="error_bottom">
            <div className="error_base1" />
            <div className="error_base2" />
            <div className="error_base3" />
          </div>
        </div>
      </div>

      <div className="error_remote_control">
        <button 
          className="error_remote_button error_remote_button_secondary"
          onClick={() => router.push("/")}
        >
          <IoHome className="error_remote_icon" />
          <span>Home</span>
        </button>
        <button 
          className="error_remote_button error_remote_button_primary"
          onClick={handleStartTest}
        >
          <IoPlay className="error_remote_icon" />
          <span>Start</span>
        </button>
      </div>

      {message && (
        <Text 
          color="#5d4536" 
          fontSize="3xl"
          fontWeight="500"
          textAlign="center"
          className={fredoka.className}
          mt={-4}
        >
          {message}
        </Text>
      )}

      {/* Modal Overlay (PreTestForm) */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="relative">
            <button
              className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-white text-gray-500 shadow-md hover:bg-gray-100 hover:text-red-500 transition-colors z-[101] flex items-center justify-center font-bold"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <PreTestForm />
          </div>
        </div>
      )}
    </Box>
  );
};
