"use client";

import { Button as TailwindButton } from "@/components/ui/tailwind-button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background via-border/5 to-earth-light/20">
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mx-auto space-y-8 md:space-y-10"
        >
          <div className="space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-earth-mid/10 text-earth-dark text-xs font-bold tracking-widest uppercase mb-2">
              Siap Mengenal Dirimu?
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
              Temukan Cuaca <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-earth-dark to-earth-accent bg-clip-text text-transparent">
                Kepribadianmu
              </span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Hanya butuh 5 menit untuk memahami pola pikir, kekuatan, dan cara terbaikmu berinteraksi dengan dunia.
            </p>
          </div>

          <div className="pt-2">
            <TailwindButton
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              size="lg"
              className="bg-earth-dark hover:bg-earth-accent text-white px-10 py-7 text-xl rounded-full transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl shadow-earth-dark/20 group"
            >
              Mulai Tes Gratis
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </TailwindButton>
          </div>
        </motion.div>
      </div>
      
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-earth-light/20 blur-[100px] rounded-full opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-earth-accent/10 blur-[120px] rounded-full opacity-50 pointer-events-none" />
    </section>
  );
};

export default CTASection;
