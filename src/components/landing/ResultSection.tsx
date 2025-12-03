import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface ResultSectionProps {
  results: Record<string, number>;
  onRetake: () => void;
}

const temperamentInfo = {
  sunny: {
    name: "Sunny",
    color: "temperament-sunny",
    image: "/src/assets/Sunny.png",
    description:
      "Kepribadian yang ceria, optimis, dan sosial. Kamu mudah bergaul dan menikmati kehadiran orang lain.",
    traits: ["Antusias", "Ekspresif", "Spontan", "Sosial"],
  },
  stormy: {
    name: "Stormy",
    color: "temperament-stormy",
    image: "/src/assets/Stormy.png",
    description:
      "Kepribadian yang tegas, ambisius, dan berorientasi pada tujuan. Kamu adalah pemimpin alami.",
    traits: ["Tegas", "Ambisius", "Efisien", "Percaya diri"],
  },
  rainy: {
    name: "Rainy",
    color: "temperament-rainy",
    image: "/src/assets/Rainy.png",
    description:
      "Kepribadian yang analitis, perfeksionis, dan mendalam. Kamu menghargai kualitas dan detail.",
    traits: ["Analitis", "Perfeksionis", "Sensitif", "Kreatif"],
  },
  cloudy: {
    name: "Cloudy",
    color: "temperament-cloudy",
    image: "/src/assets/Cloudy.png",
    description:
      "Kepribadian yang tenang, sabar, dan damai. Kamu adalah pendengar yang baik dan mediator alami.",
    traits: ["Tenang", "Sabar", "Diplomatis", "Stabil"],
  },
};

const ResultSection = ({ results, onRetake }: ResultSectionProps) => {
  const dominant = Object.entries(results).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0];
  const info = temperamentInfo[dominant as keyof typeof temperamentInfo];

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">Hasil Tes Kepribadianmu</h2>
          <p className="text-xl text-muted-foreground">
            Temperamen dominan kamu adalah
          </p>
        </div>

        <Card>
          <div className="text-center mb-6">
            <h3 className={`text-5xl font-bold mb-4 text-${info.color}`}>
              {info.name}
            </h3>
            <p className="text-lg text-muted-foreground">{info.description}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {info.traits.map((trait, index) => (
              <div key={index} className="bg-muted rounded-lg p-4 text-center">
                <p className="font-semibold">{trait}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <h4 className="font-semibold mb-4">Skor Temperamen:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(results).map(([key, value]) => (
                <div key={key} className="text-center">
                  <p className="text-sm text-muted-foreground capitalize">
                    {key}
                  </p>
                  <p className="text-2xl font-bold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="text-center">
          <Button
            onClick={onRetake}
            variant="outline"
            className="hover:bg-earth-light"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Ulangi Tes
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResultSection;
