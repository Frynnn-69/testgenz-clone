"use client";

import Image from "next/image";
import { Button as TailwindButton } from "@/components/ui/tailwind-button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface HeroProps {
  onStartTest: () => void;
}

const Hero = ({ onStartTest }: HeroProps) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 md:pt-16 px-4 bg-gradient-to-b from-background via-earth-light/5 to-background overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-6 md:space-y-8"
          >
            <div className="inline-flex items-center justify-center">
              <span className="bg-gradient-to-r from-earth-light to-earth-accent px-3 py-1 sm:px-4 sm:py-2 rounded-full text-earth-dark font-semibold text-[10px] sm:text-xs md:text-sm text-center leading-snug max-w-xs sm:max-w-sm">
                🎯 Tes Psikologi Gratis untuk Gen Z & Milenial
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
              Discover Your True Self dengan{" "}
              <span className="bg-gradient-to-r from-earth-dark to-earth-accent bg-clip-text text-transparent">
                Tes Temperamen
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              Cuma butuh{" "}
              <span className="font-bold text-earth-dark">5 menit</span> untuk
              mengetahui kepribadian dominanmu:{" "}
              <span className="font-semibold">Sunny</span>,{" "}
              <span className="font-semibold">Stormy</span>,
              <span className="font-semibold"> Rainy</span>, atau{" "}
              <span className="font-semibold">Cloudy</span>. Hasil yang akurat
              dan berguna untuk self-development! 🚀
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <TailwindButton
                onClick={onStartTest}
                size="lg"
                className="bg-earth-dark hover:bg-earth-accent text-white px-8 md:px-10 py-6 md:py-7 text-base md:text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-xl group w-full sm:w-auto"
              >
                Mulai Tes Sekarang
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </TailwindButton>
            </div>
              <div className="flex flex-wrap gap-4 md:gap-8 text-xs md:text-sm text-muted-foreground pt-2 md:pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>100% Gratis</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Hasil Instant</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Tanpa Registrasi</span>
                </div>
              </div>
            </motion.div>

          {/* Right Column */}
          <div
            className="relative animate-fade-in h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] mt-8 lg:mt-0"
            style={{ animationDelay: "300ms" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-earth-light/30 via-earth-accent/20 to-primary/30 rounded-full blur-3xl animate-pulse" />

            <div className="absolute top-4 sm:top-8 md:top-12 left-1/2 -translate-x-1/2 z-30 animate-float">
              <div className="relative bg-white rounded-xl md:rounded-2xl px-4 py-3 md:px-6 md:py-4 shadow-2xl border-2 border-earth-light max-w-[240px] sm:max-w-[280px] md:max-w-sm">
                <p className="text-xs sm:text-sm md:text-base font-semibold text-earth-dark text-center">
                  Yuk, cari tahu kepribadianmu! Mulai tes sekarang! 🎯
                </p>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-white" />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[14px] border-t-earth-light" />
              </div>
            </div>

            {/* Sparkle Effects */}
            <div
              className="absolute top-16 sm:top-20 right-4 sm:right-8 md:right-12 w-3 h-3 md:w-4 md:h-4 bg-yellow-400 rounded-full animate-ping opacity-75"
              style={{ animationDelay: "0s", animationDuration: "2s" }}
            />
            <div
              className="absolute top-24 sm:top-32 right-12 sm:right-20 md:right-32 w-2 h-2 md:w-3 md:h-3 bg-yellow-300 rounded-full animate-ping opacity-75"
              style={{ animationDelay: "1s", animationDuration: "3s" }}
            />
            <div
              className="absolute top-12 sm:top-16 left-4 sm:left-8 md:left-12 w-2 h-2 bg-yellow-500 rounded-full animate-ping opacity-75"
              style={{ animationDelay: "0.5s", animationDuration: "2.5s" }}
            />

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[220px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[380px] z-20">
              <Image
                src="/gen-z-characters.png"
                alt="Gen Z Characters"
                width={380}
                height={380}
                className="w-full h-auto drop-shadow-2xl"
                style={{
                  animation: "gentleBounce 3s ease-in-out infinite",
                }}
                priority
              />
            </div>

            {/* Decorative Circles */}
            <div
              className="absolute bottom-12 sm:bottom-16 left-2 sm:left-4 md:left-8 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-earth-light/20 rounded-full blur-xl animate-pulse"
              style={{ animationDelay: "0s", animationDuration: "4s" }}
            />
            <div
              className="absolute bottom-16 sm:bottom-24 right-4 sm:right-8 md:right-16 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-earth-accent/20 rounded-full blur-2xl animate-pulse"
              style={{ animationDelay: "1s", animationDuration: "5s" }}
            />

            {/* Stats Badge */}
            <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 bg-background/95 backdrop-blur-md border-2 border-earth-light rounded-xl md:rounded-2xl px-3 sm:px-4 md:px-6 py-2 md:py-3 shadow-xl z-30 hover:scale-105 transition-transform">
              <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-center whitespace-nowrap">
                <span className="text-earth-dark">10,000+</span> orang telah
                menemukan diri mereka
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
