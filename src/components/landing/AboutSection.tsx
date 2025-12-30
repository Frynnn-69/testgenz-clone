"use client";

import { Card } from "@/components/ui/card";
import { Brain, Heart, Lightbulb, Users } from "lucide-react";

const temperaments = [
  {
    name: "Sanguinis",
    color: "temperament-sanguinis",
    emoji: "☀️",
    title: "Si Sosial Butterfly",
    description: "Energik, ekspresif, dan selalu menjadi pusat perhatian! Kamu adalah orang yang membawa keceriaan ke mana pun kamu pergi.",
    keywords: ["Ceria", "Sosial", "Optimis"],
  },
  {
    name: "Koleris",
    color: "temperament-koleris",
    emoji: "🔥",
    title: "Si Natural Leader",
    description: "Tegas, ambisius, dan selalu mencapai target! Kamu lahir untuk memimpin dan menginspirasi orang lain.",
    keywords: ["Tegas", "Ambisius", "Pemimpin"],
  },
  {
    name: "Melankolis",
    color: "temperament-melankolis",
    emoji: "🌙",
    title: "Si Pemikir Mendalam",
    description: "Analitis, kreatif, dan perfeksionis! Kamu melihat dunia dengan perspektif yang unik dan penuh makna.",
    keywords: ["Analitis", "Kreatif", "Detail"],
  },
  {
    name: "Plegmatis",
    color: "temperament-plegmatis",
    emoji: "🌿",
    title: "Si Peace Maker",
    description: "Tenang, harmonis, dan penuh empati! Kamu adalah sosok yang menenangkan dan selalu ada untuk orang lain.",
    keywords: ["Tenang", "Sabar", "Harmonis"],
  },
];

const features = [
  {
    icon: Brain,
    title: "Kenali Dirimu Lebih Dalam",
    description: "Pahami kekuatan dan keunikan kepribadianmu untuk memaksimalkan potensi diri",
  },
  {
    icon: Heart,
    title: "Tingkatkan Relasi",
    description: "Bangun hubungan yang lebih bermakna dengan memahami dinamika kepribadian",
  },
  {
    icon: Lightbulb,
    title: "Temukan Passion-mu",
    description: "Discover karir dan hobi yang sesuai dengan temperamen dominanmu",
  },
  {
    icon: Users,
    title: "Berkembang Bersama",
    description: "Join komunitas GrowGenZ untuk bertumbuh bersama Gen Z dan Milenial lainnya",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in" style={{ animationDelay: "150ms" }}>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-earth-dark">
            Yuk, Kenalan dengan Empat Temperamen! 🎭
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Setiap orang itu unik! Teori empat temperamen membantu kamu memahami
            <span className="text-earth-dark font-semibold"> pola perilaku, cara berpikir, dan reaksi emosional</span> yang
            berbeda pada setiap individu. Ready to discover yours?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {temperaments.map((temperament, index) => (
            <Card
              key={index}
              className="p-6 md:p-8 hover:shadow-2xl transition-all duration-500 bg-background border-2 hover:border-earth-light group animate-fade-in"
              style={{ animationDelay: `${index * 120 + 200}ms` }}
            >
              <div className="text-center mb-4">
                <div className="text-5xl md:text-7xl mb-4 group-hover:scale-110 transition-transform">
                  {temperament.emoji}
                </div>
                <h3 className={`text-2xl md:text-3xl font-bold mb-2 text-${temperament.color}`}>
                  {temperament.name}
                </h3>
                <p className="text-xs md:text-sm text-earth-dark font-semibold mb-3">{temperament.title}</p>
              </div>
              <p className="text-center text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">
                {temperament.description}
              </p>
              <div className="flex gap-2 justify-center flex-wrap">
                {temperament.keywords.map((keyword, idx) => (
                  <span key={idx} className="bg-earth-light/30 px-3 py-1 rounded-full text-xs font-medium text-earth-dark">
                    {keyword}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="mb-12 md:mb-16 animate-fade-in" style={{ animationDelay: "250ms" }}>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-earth-dark">
            Kenapa Harus Ikut Tes Ini? 🤔
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-5 md:p-6 text-center hover:shadow-xl transition-all duration-500 bg-background border-2 hover:border-earth-light group animate-fade-in"
                style={{ animationDelay: `${index * 120 + 300}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-earth-light mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 md:w-8 md:h-8 text-earth-dark" />
                </div>
                <h4 className="font-bold mb-2 text-earth-dark text-sm md:text-base">{feature.title}</h4>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center animate-fade-in" style={{ animationDelay: "400ms" }}>
          <Card className="p-8 md:p-10 bg-gradient-to-r from-earth-light/50 to-earth-accent/30 border-2 border-earth-light max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-earth-dark">
              Siap Menemukan Jati Dirimu? 🚀
            </h3>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
              Tes ini dirancang khusus untuk <span className="font-semibold text-earth-dark">Gen Z dan Milenial</span> yang
              ingin lebih memahami diri sendiri, meningkatkan relasi, dan menemukan karir yang tepat.
              <span className="block mt-2 font-semibold">Hanya 5 menit untuk hasil yang life-changing!</span>
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-xs md:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✨</span>
                <span>100% Gratis</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                <span>Hasil Akurat</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                <span>Super Cepat</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
