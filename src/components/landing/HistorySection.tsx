import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { History, Clock, RefreshCw, ChevronRight } from "lucide-react";

interface TestResult {
  id: string;
  results: Record<string, number>;
  timestamp: number;
  username?: string;
  email?: string;
}

interface HistorySectionProps {
  onRetake: () => void;
}

const temperamentInfo = {
  sunny: {
    name: "Sunny",
    icon: "☀️",
    image: "/src/assets/Sunny.png",
    color: "bg-amber-100 text-amber-800 border-amber-300",
    description: "Kepribadian yang ceria, optimis, dan sosial.",
    traits: ["Antusias", "Ekspresif", "Spontan", "Sosial"],
  },
  stormy: {
    name: "Stormy",
    icon: "⛈️",
    image: "/src/assets/Stormy.png",
    color: "bg-red-100 text-red-800 border-red-300",
    description:
      "Kepribadian yang tegas, ambisius, dan berorientasi pada tujuan.",
    traits: ["Tegas", "Ambisius", "Efisien", "Percaya diri"],
  },
  rainy: {
    name: "Rainy",
    icon: "🌧️",
    image: "/src/assets/Rainy.png",
    color: "bg-blue-100 text-blue-800 border-blue-300",
    description: "Kepribadian yang analitis, perfeksionis, dan mendalam.",
    traits: ["Analitis", "Perfeksionis", "Sensitif", "Kreatif"],
  },
  cloudy: {
    name: "Cloudy",
    icon: "☁️",
    image: "/src/assets/Cloudy.png",
    color: "bg-green-100 text-green-800 border-green-300",
    description: "Kepribadian yang tenang, sabar, dan damai.",
    traits: ["Tenang", "Sabar", "Diplomatis", "Stabil"],
  },
};

const HistorySection = ({ onRetake }: HistorySectionProps) => {
  const [history, setHistory] = useState<TestResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<TestResult | null>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const loadHistory = () => {
      const saved = localStorage.getItem("testHistory");
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    };

    loadHistory();
    window.addEventListener("resultsUpdated", loadHistory);
    return () => window.removeEventListener("resultsUpdated", loadHistory);
  }, []);

  // IntersectionObserver for scroll animations
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set([...prev, index]));
              observer.unobserve(entry.target);
            }
          },
          { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [history]);

  const getDominantTemperament = (results: Record<string, number>) => {
    return Object.entries(results).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (history.length === 0) return null;

  const dominant = selectedResult
    ? getDominantTemperament(selectedResult.results)
    : null;
  const info = dominant
    ? temperamentInfo[dominant as keyof typeof temperamentInfo]
    : null;

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <History className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">
              Riwayat Tes
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Riwayat Tes Kepribadianmu
          </h2>
          <p className="text-muted-foreground">
            Kamu sudah melakukan {history.length} kali tes. Klik untuk melihat
            detail.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {history.map((item, index) => {
            const itemDominant = getDominantTemperament(item.results);
            const itemInfo =
              temperamentInfo[itemDominant as keyof typeof temperamentInfo];
            const isVisible = visibleItems.has(index);

            return (
              <div
                key={item.id}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card
                  onClick={() => setSelectedResult(item)}
                  className="p-4 md:p-6 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border-2 hover:border-primary/30 group"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${itemInfo.color} border-2 text-2xl`}
                      >
                        {itemInfo.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">
                          {item.username || "Pengguna"}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {item.email || "Email tidak tersedia"}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${itemInfo.color} border`}
                          >
                            {itemInfo.name}
                          </span>
                          <span>•</span>
                          <Clock className="w-3 h-3" />
                          {formatDate(item.timestamp)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`hidden md:inline-flex px-3 py-1 rounded-full text-sm font-medium ${itemInfo.color} border`}
                      >
                        Tes #{history.length - index}
                      </span>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            onClick={onRetake}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Ambil Tes Baru
          </Button>
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog
        open={!!selectedResult}
        onOpenChange={() => setSelectedResult(null)}
      >
        <DialogContent className="max-w-lg mx-4">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              Hasil Tes Kepribadian
            </DialogTitle>
          </DialogHeader>

          {selectedResult && info && (
            <div className="space-y-6 py-4">
              <div className="text-center">
                <div
                  className={`inline-flex w-16 h-16 rounded-full items-center justify-center ${info.color} border-2 mb-4 text-3xl`}
                >
                  {info.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {selectedResult.username || "Pengguna"}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {selectedResult.email || "Email tidak tersedia"}
                </p>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${info.color} border`}
                >
                  {info.name}
                </span>
                <p className="text-muted-foreground text-sm mt-3">
                  {info.description}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {info.traits.map((trait, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-muted rounded-full text-sm font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {Object.entries(selectedResult.results).map(([key, value]) => {
                  const tempInfo =
                    temperamentInfo[key as keyof typeof temperamentInfo];
                  return (
                    <div
                      key={key}
                      className="text-center p-3 bg-muted rounded-lg"
                    >
                      <p className="text-xs text-muted-foreground mb-1">
                        {tempInfo?.name || key}
                      </p>
                      <p className="text-xl font-bold text-foreground">
                        {value}
                      </p>
                    </div>
                  );
                })}
              </div>

              <p className="text-center text-xs text-muted-foreground">
                <Clock className="w-3 h-3 inline mr-1" />
                {formatDate(selectedResult.timestamp)}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HistorySection;
