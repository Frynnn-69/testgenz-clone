import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  onStartTest: () => void;
}

const Hero = ({ onStartTest }: HeroProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 px-4 bg-gradient-to-b from-background to-earth-light/10">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: "150ms" }}>
            <div className="inline-block mb-4">
              <span className="bg-earth-light px-6 py-2 rounded-full text-earth-dark font-semibold text-sm">
                🎯 Tes Psikologi Gratis untuk Gen Z & Milenial
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold text-foreground leading-tight">
              Discover Your True Self dengan{" "}
              <span className="text-earth-dark bg-gradient-to-r from-earth-dark to-earth-accent bg-clip-text text-transparent">
                Tes Temperamen
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Cuma butuh <span className="font-bold text-earth-dark">5 menit</span> untuk mengetahui
              kepribadian dominanmu: <span className="font-semibold">Sanguinis</span>, <span className="font-semibold">Koleris</span>,
              <span className="font-semibold"> Melankolis</span>, atau <span className="font-semibold">Plegmatis</span>.
              Hasil yang akurat dan berguna untuk self-development! 🚀
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={onStartTest}
                size="lg"
                className="bg-earth-dark hover:bg-earth-accent text-white px-10 py-7 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-xl group"
              >
                Mulai Tes Sekarang
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground pt-4">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
