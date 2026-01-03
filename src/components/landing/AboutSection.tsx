"use client";

import { useState, useEffect } from "react";
import { Sun, Cloud, CloudRain, CloudLightning } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { NavigationControls } from "./NavigationControls";

const weatherTypes = [
  {
    id: "sunny",
    icon: Sun,
    title: "Sunny",
    emoji: "☀️",
    temperament: "Sanguinis",
    tagline: "The Life of the Party",
    description: "Ceria, optimis, dan penuh energi! Kamu adalah jiwa dari setiap pesta. Mudah bergaul dan selalu bisa mencairkan suasana. Orang-orang suka berada di sekitarmu karena energi positifmu yang menular.",
    traits: ["Ekstrovert", "Antusias", "Kreatif", "Spontan", "Ekspresif", "Optimis"],
    strengths: ["Public speaking", "Networking", "Brainstorming", "Motivating others"],
    bgGradient: "from-amber-100 via-yellow-50 to-orange-50",
    accentColor: "text-amber-500",
    cardBg: "bg-gradient-to-br from-amber-50 to-yellow-100",
    iconBg: "bg-amber-100",
  },
  {
    id: "cloudy",
    icon: Cloud,
    title: "Cloudy",
    emoji: "☁️",
    temperament: "Phlegmatis",
    tagline: "The Peacemaker",
    description: "Tenang, damai, dan konsisten. Kamu adalah pendengar yang baik dan selalu bisa diandalkan dalam situasi apapun. Kehadiranmu membawa ketenangan bagi orang-orang di sekitarmu.",
    traits: ["Sabar", "Diplomat", "Stabil", "Penengah", "Loyal", "Supportive"],
    strengths: ["Mediating conflicts", "Deep listening", "Consistent work", "Team harmony"],
    bgGradient: "from-slate-100 via-gray-50 to-blue-50",
    accentColor: "text-slate-500",
    cardBg: "bg-gradient-to-br from-slate-50 to-gray-100",
    iconBg: "bg-slate-100",
  },
  {
    id: "rainy",
    icon: CloudRain,
    title: "Rainy",
    emoji: "🌧️",
    temperament: "Melankolis",
    tagline: "The Deep Thinker",
    description: "Dalam, analitis, dan detail-oriented. Kamu punya kepekaan tinggi dan selalu memikirkan segala sesuatu secara mendalam. Hasil kerjamu selalu berkualitas tinggi karena perhatianmu pada detail.",
    traits: ["Perfeksionis", "Sensitif", "Terorganisir", "Loyal", "Analitis", "Thoughtful"],
    strengths: ["Problem solving", "Quality control", "Research", "Creative arts"],
    bgGradient: "from-blue-100 via-sky-50 to-indigo-50",
    accentColor: "text-blue-500",
    cardBg: "bg-gradient-to-br from-blue-50 to-sky-100",
    iconBg: "bg-blue-100",
  },
  {
    id: "stormy",
    icon: CloudLightning,
    title: "Stormy",
    emoji: "⛈️",
    temperament: "Koleris",
    tagline: "The Natural Leader",
    description: "Tegas, ambisius, dan penuh determinasi. Kamu adalah pemimpin alami yang tidak takut mengambil keputusan besar. Visi dan drive-mu menginspirasi orang lain untuk mengikuti arahanmu.",
    traits: ["Pemimpin", "Tegas", "Goal-oriented", "Mandiri", "Decisive", "Visioner"],
    strengths: ["Leadership", "Decision making", "Strategic planning", "Crisis management"],
    bgGradient: "from-purple-100 via-violet-50 to-fuchsia-50",
    accentColor: "text-purple-500",
    cardBg: "bg-gradient-to-br from-purple-50 to-violet-100",
    iconBg: "bg-purple-100",
  },
];

const AboutSection = () => {
  const [activeWeather, setActiveWeather] = useState(weatherTypes[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % weatherTypes.length;
    setActiveIndex(nextIndex);
    setActiveWeather(weatherTypes[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + weatherTypes.length) % weatherTypes.length;
    setActiveIndex(prevIndex);
    setActiveWeather(weatherTypes[prevIndex]);
  };

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
  }, [activeIndex]);

  // Calculate indices for 3-card stack
  const prevIndex = (activeIndex - 1 + weatherTypes.length) % weatherTypes.length;
  const nextIndex = (activeIndex + 1) % weatherTypes.length;

  const cardVariants = {
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
          ? `${weather.cardBg} border-primary/30 shadow-xl` 
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
        {/* Icon */}
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
            {variant === "center" && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary text-primary-foreground">
                Active
              </span>
            )}
          </div>
          <p className={cn(
            "text-muted-foreground",
            variant === "center" ? "text-sm md:text-base" : "text-xs md:text-sm"
          )}>
            {weather.tagline} • {weather.temperament}
          </p>
        </div>
      </div>

      {/* Progress bar for active */}
      {variant === "center" && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-b-2xl" />
      )}
    </motion.div>
  );

  return (
    <section className="py-12 md:py-20 px-4 md:px-8 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent text-muted-foreground text-sm font-medium mb-4">
            🌤️ Kenapa Cuaca?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Kepribadianmu, <span className="text-primary">Dimetaforakan</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Pilih tipe cuaca untuk melihat karakteristiknya ✨
          </p>
        </div>

        {/* Split View Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          
          {/* Left Side - Display Panel (Sticky on desktop) - FIXED HEIGHT */}
          <div className="lg:sticky lg:top-8 order-2 lg:order-1">
            <div 
              className={cn(
                "relative rounded-3xl p-8 md:p-10 transition-all duration-500 ease-out",
                "h-[520px] md:h-[580px]",
                "bg-gradient-to-br overflow-hidden",
                activeWeather.bgGradient
              )}
            >
              {/* Floating Icon */}
              <div 
                key={activeWeather.id + "-icon"}
                className="absolute -top-6 -right-6 md:top-6 md:right-6 w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-background/80 backdrop-blur-sm shadow-xl flex items-center justify-center animate-fade-in"
              >
                <activeWeather.icon 
                  className={cn(
                    "w-12 h-12 md:w-16 md:h-16 transition-all duration-300",
                    activeWeather.accentColor
                  )} 
                />
              </div>

              {/* Content - Scrollable if overflow */}
              <div 
                key={activeWeather.id + "-content"}
                className="animate-fade-in h-full overflow-y-auto pr-2 scrollbar-thin"
              >
                {/* Title */}
                <div className="mb-6">
                  <span className="text-4xl md:text-5xl mb-2 block">{activeWeather.emoji}</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                    {activeWeather.title}
                  </h3>
                  <p className={cn("text-lg font-medium", activeWeather.accentColor)}>
                    {activeWeather.tagline}
                  </p>
                  <span className="text-sm text-muted-foreground">
                    ({activeWeather.temperament})
                  </span>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {activeWeather.description}
                </p>

                {/* Traits */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                    Karakteristik
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeWeather.traits.map((trait, idx) => (
                      <span
                        key={trait}
                        className="px-3 py-1.5 text-sm font-medium rounded-full bg-background/70 text-foreground backdrop-blur-sm"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Strengths */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                    Kelebihan
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {activeWeather.strengths.map((strength, idx) => (
                      <div 
                        key={strength}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <span className={activeWeather.accentColor}>✓</span>
                        {strength}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative circles */}
              <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full bg-background/20 blur-xl" />
              <div className="absolute top-1/2 right-4 w-16 h-16 rounded-full bg-background/30 blur-lg" />
            </div>
          </div>

          {/* Right Side - Card Stack with Right Controls */}
          <div className="order-1 lg:order-2 flex items-center justify-center w-full">
            <div className="flex items-center gap-8 md:gap-12 pl-4">
              
              {/* 3-Card Stack Container - Sleek Fixed Dimensions */}
              <div className="relative w-[340px] md:w-[480px] h-[300px] md:h-[340px] shrink-0 flex items-center justify-center">
                {renderCard(weatherTypes[prevIndex], "above")}
                {renderCard(weatherTypes[activeIndex], "center")}
                {renderCard(weatherTypes[nextIndex], "below")}
              </div>

              {/* Navigation Controls Component - Separate Column */}
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
      </div>
    </section>
  );
};

export default AboutSection;
