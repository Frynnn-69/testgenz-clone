import { Card } from "@/components/ui/card";
import { Brain, Heart, Lightbulb, Users } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Kenali Dirimu Lebih Dalam",
    description:
      "Pahami kekuatan dan keunikan kepribadianmu untuk memaksimalkan potensi diri",
  },
  {
    icon: Heart,
    title: "Tingkatkan Relasi",
    description:
      "Bangun hubungan yang lebih bermakna dengan memahami dinamika kepribadian",
  },
  {
    icon: Lightbulb,
    title: "Temukan Passion-mu",
    description:
      "Discover karir dan hobi yang sesuai dengan temperamen dominanmu",
  },
  {
    icon: Users,
    title: "Berkembang Bersama",
    description:
      "Join komunitas GrowGenZ untuk bertumbuh bersama Gen Z dan Milenial lainnya",
  },
];

const AboutSection = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-background to-muted"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-earth-dark">
            Yuk, Kenalan dengan Empat Temperamen! 🎭
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Setiap orang itu unik! Teori empat temperamen membantu kamu memahami
            <span className="text-earth-dark font-semibold">
              {" "}
              pola perilaku, cara berpikir, dan reaksi emosional
            </span>{" "}
            yang berbeda pada setiap individu. Ready to discover yours?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Hapus card temperaments */}
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12 text-earth-dark">
            Kenapa Harus Ikut Tes Ini? 🤔
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-xl transition-all duration-300 bg-background border-2 hover:border-earth-light group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-earth-light mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-earth-dark" />
                </div>
                <h4 className="font-bold mb-2 text-earth-dark">
                  {feature.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Card className="p-10 bg-gradient-to-r from-earth-light/50 to-earth-accent/30 border-2 border-earth-light">
            <h3 className="text-3xl font-bold mb-4 text-earth-dark">
              Siap Menemukan Jati Dirimu? 🚀
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
              Tes ini dirancang khusus untuk{" "}
              <span className="font-semibold text-earth-dark">
                Gen Z dan Milenial
              </span>{" "}
              yang ingin lebih memahami diri sendiri, meningkatkan relasi, dan
              menemukan karir yang tepat.
              <span className="block mt-2 font-semibold">
                Hanya 5 menit untuk hasil yang life-changing!
              </span>
            </p>
            <div className="flex gap-4 justify-center text-sm text-muted-foreground">
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
