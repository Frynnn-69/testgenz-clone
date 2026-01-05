"use client";

import { useState, useEffect, useCallback } from "react";
import { Sun, Cloud, CloudRain, CloudLightning } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { NavigationControls } from "./NavigationControls";

import { TEMPERAMENT_METADATA } from "@/lib/constants/temperamentMetadata";

const weatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
  stormy: CloudLightning,
};

const weatherTypes = Object.keys(TEMPERAMENT_METADATA).map((key) => {
  const data = TEMPERAMENT_METADATA[key];
  return {
    id: key,
    icon: weatherIcons[key as keyof typeof weatherIcons],
    title: data.name,
    emoji: data.emoji,
    temperament: data.temperament,
    tagline: data.tagline,
    description: data.description,
    traitsAbout: data.traitsAbout,
    strengths: data.strengths,
    bgGradient: data.bgGradient,
    accentColor: data.accentColor,
    barColor: data.barColor,
    cardBg: data.cardBg,
    iconBg: data.iconBg,
  };
});

const AboutSection = () => {
  const [activeWeather, setActiveWeather] = useState(weatherTypes[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = useCallback(() => {
    setActiveIndex((current) => {
        const nextIndex = (current + 1) % weatherTypes.length;
        setActiveWeather(weatherTypes[nextIndex]);
        return nextIndex;
    });
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((current) => {
        const prevIndex = (current - 1 + weatherTypes.length) % weatherTypes.length;
        setActiveWeather(weatherTypes[prevIndex]);
        return prevIndex;
    });
  }, []);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    setActiveWeather(weatherTypes[index]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") handlePrev();
      if (e.key === "ArrowDown") handleNext();
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleNext, handlePrev]);

  // Calculate indices for 3-card stack
  const prevIndex = (activeIndex - 1 + weatherTypes.length) % weatherTypes.length;
  const nextIndex = (activeIndex + 1) % weatherTypes.length;

  const cardVariants: Variants = {
    above: {
      scale: 0.85,
      opacity: 0.4,
      y: -140,
      zIndex: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    center: {
      scale: 1,
      opacity: 1,
      y: 0,
      zIndex: 10,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    below: {
      scale: 0.85,
      opacity: 0.4,
      y: 140,
      zIndex: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };


  const renderCard = (weather: typeof weatherTypes[0], variant: "above" | "center" | "below") => (
    <motion.div
      key={weather.id}
      variants={cardVariants}
      initial={variant}
      animate={variant}
      className={cn(
        "absolute inset-x-0 p-6 md:p-8 rounded-2xl border-2 transition-all",
        variant === "center" 
          ? `${weather.cardBg} border-transparent shadow-xl` 
          : `${weather.cardBg} border-border/50 cursor-pointer hover:scale-95 hover:opacity-60`,
        variant === "center" && "cursor-grab active:cursor-grabbing"
      )}
      drag={variant === "center" ? "y" : false}
      dragElastic={0.2}
      dragMomentum={true}
      onDragEnd={(_, info) => {
        if (variant === "center") {
          const swipeThreshold = 30;
          if (info.velocity.y < -500 || info.offset.y < -swipeThreshold) {
            handleNext();
          } else if (info.velocity.y > 500 || info.offset.y > swipeThreshold) {
            handlePrev();
          }
        }
      }}
      onClick={() => {
        if (variant === "above") handlePrev();
        if (variant === "below") handleNext();
      }}
    >
      <div className="flex items-start gap-5">
        <div 
          className={cn(
            "rounded-xl flex items-center justify-center shrink-0 transition-all duration-300",
            variant === "center" ? "w-16 h-16 md:w-20 md:h-20" : "w-14 h-14 md:w-16 md:h-16",
            weather.iconBg
          )}
        >
          <weather.icon 
            className={cn(
              "transition-all duration-300",
              variant === "center" ? "w-8 h-8 md:w-10 md:h-10" : "w-6 h-6 md:w-8 md:h-8",
              weather.accentColor
            )} 
          />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className={cn(
              "font-bold text-foreground",
              variant === "center" ? "text-xl md:text-2xl" : "text-lg md:text-xl"
            )}>
              {weather.title} {weather.emoji}
            </h3>
            {/* Active badge */}
          </div>
          <p className={cn(
            "text-muted-foreground",
            variant === "center" ? "text-sm md:text-base" : "text-xs md:text-sm"
          )}>
            {weather.tagline} • {weather.temperament}
          </p>
        </div>
      </div>

      {variant === "center" && (
        <div className={`absolute bottom-0 left-0 right-0 h-1.5 ${weather.barColor} rounded-b-2xl opacity-80`} />
      )}
    </motion.div>
  );

  return (
    <section id="about" className="py-12 md:py-20 px-4 md:px-8 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-earth-light to-earth-accent text-earth-dark text-md font-semibold mb-4">
            🌤️ Kenapa Cuaca?
          </span>
          <h2 className="text-7xl md:text-6xl lg:text-5xl font-bold text-foreground mb-4">
            Kepribadianmu, <span className="bg-gradient-to-r from-earth-dark to-earth-accent bg-clip-text text-transparent">Dimetaforakan</span>
          </h2>
          <p className="text-muted-foreground text-2xl md:text-lg max-w-2xl mx-auto">
            Pilih tipe cuaca untuk melihat karakteristiknya ✨
          </p>
        </motion.div>

        {/* Content Panel*/}
        <motion.div
           initial={{ opacity: 0, scale: 0.95, y: 40 }}
           whileInView={{ opacity: 1, scale: 1, y: 0 }}
           viewport={{ once: false, margin: "-100px" }}
           transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            
            {/* Left Side */}
            <div className="lg:sticky lg:top-8 order-2 lg:order-1">
              <div 
                className={cn(
                  "relative rounded-3xl p-8 md:p-10 transition-all duration-500 ease-out",
                  "h-[520px] md:h-[580px]",
                  "bg-card border border-border/60 shadow-sm overflow-hidden"
                )}
              >
                <div 
                  key={activeWeather.id + "-icon"}
                  className="absolute top-6 right-6 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-earth-light/50 backdrop-blur-sm flex items-center justify-center animate-fade-in border border-earth-mid/20 shadow-sm z-10"
                >
                  <activeWeather.icon 
                    className={cn(
                      "w-10 h-10 md:w-12 md:h-12 transition-all duration-300 opacity-90",
                      activeWeather.accentColor
                    )} 
                  />
                </div>

                <div 
                  key={activeWeather.id + "-content"}
                  className="animate-fade-in h-full overflow-y-auto pr-4 -mr-4 pb-8 scrollbar-thin scrollbar-thumb-earth-mid/30 scrollbar-track-transparent hover:scrollbar-thumb-earth-mid/50"
                >
                  {/* Title */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl md:text-5xl">{activeWeather.emoji}</span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-earth-mid/10 text-foreground/70 border border-earth-mid/20">
                        {activeWeather.temperament}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2 tracking-tight">
                      {activeWeather.title}
                    </h3>
                    <p className={cn("text-xl font-semibold italic mt-2", activeWeather.accentColor)}>
                      <span className="opacity-50 text-2xl mr-1">&ldquo;</span>
                      {activeWeather.tagline}
                      <span className="opacity-50 text-2xl ml-1">&rdquo;</span>
                    </p>
                  </div>

                  {/* Description (Quote Style) */}
                  <div className={cn("relative pl-6 border-l-4 mb-8", activeWeather.accentColor.replace('text-', 'border-'))}>
                    <p className="text-foreground/90 leading-relaxed text-lg font-medium italic">
                      &quot;{activeWeather.description}&quot;
                    </p>
                  </div>

                  {/* Traits */}
                  <div className="mb-8">
                    <h4 className="text-xs font-bold text-foreground/60 mb-4 uppercase tracking-widest">
                      Karakteristik
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeWeather.traitsAbout.map((trait, idx) => (
                        <span
                          key={trait}
                          className="px-4 py-2 text-sm font-semibold rounded-xl border-2 border-earth-mid/20 bg-earth-mid/5 text-foreground hover:bg-earth-mid/10 hover:border-earth-mid/40 transition-all cursor-default"
                          style={{ animationDelay: `${idx * 50}ms` }}
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Strengths */}
                  <div>
                    <h4 className="text-xs font-bold text-foreground/60 mb-4 uppercase tracking-widest">
                      Kelebihan
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {activeWeather.strengths.map((strength, idx) => (
                        <div 
                          key={strength}
                          className="flex items-center gap-3 p-3 rounded-xl bg-earth-light/20 border border-earth-mid/10 hover:border-earth-mid/30 transition-colors group"
                          style={{ animationDelay: `${idx * 50}ms` }}
                        >
                          <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors group-hover:opacity-100 opacity-70", activeWeather.barColor)}>
                             <span className="text-white text-[10px] font-bold">✓</span>
                          </div>
                          <span className="text-sm font-medium text-foreground/80">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-tr-full bg-earth-mid/5 blur-2xl" />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FDFBF7] to-transparent pointer-events-none z-20" />
              </div>
            </div>

            {/* Right Side */}
            <div className="order-1 lg:order-2 flex items-center justify-center w-full">
              <div className="flex items-center gap-8 md:gap-12 pl-4">
                
                <div className="relative w-[340px] md:w-[480px] h-[300px] md:h-[340px] shrink-0 flex items-center justify-center">
                  {renderCard(weatherTypes[prevIndex], "above")}
                  {renderCard(weatherTypes[activeIndex], "center")}
                  {renderCard(weatherTypes[nextIndex], "below")}
                </div>

                <NavigationControls
                  totalItems={weatherTypes.length}
                  activeIndex={activeIndex}
                  onNext={handleNext}
                  onPrev={handlePrev}
                  onDotClick={handleDotClick}
                  itemLabels={weatherTypes.map(w => w.title)}
                />
            </div>
          </div>
        </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
