"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw, Download, Share2 } from "lucide-react";
import Navbar from "@/components/commons/Navbar";
import Footer from "@/components/commons/Footer";

const temperamentInfo = {
  sunny: {
    name: "Sunny",
    color: "temperament-sanguinis",
    colorHex: "#F59E0B",
    subtitle: "Si Pemikir yang Detail",
    image: "/src/assets/Sunny.png",
    traits: [
      "Analitis dan berpikir kritis",
      "Thoughtful dan mendalam",
      "Loyal dan setia",
      "Detail dan terorganisir",
    ],
    strengths: ["Analitis", "Organized", "Artistic", "Creative"],
    development: ["Overthinking", "Perfeksionis", "Sensitif"],
    careers: ["Research", "Accounting", "Engineering", "Writing"],
  },
  stormy: {
    name: "Stormy",
    color: "temperament-koleris",
    colorHex: "#EF4444",
    subtitle: "Si Natural Leader",
    image: "/src/assets/Stormy.png",
    traits: [
      "Tegas dan decisive",
      "Ambisius",
      "Efisien dan produktif",
      "Percaya diri",
    ],
    strengths: [
      "Kepemimpinan yang kuat",
      "Decisive dan berani mengambil risiko",
      "Goal-oriented dan fokus",
      "Problem solver yang efektif",
    ],
    development: [
      "Kurang empati dan terlalu dominan",
      "Impatient dan mudah frustrasi",
      "Workaholic dan mengabaikan relasi",
    ],
    careers: [
      "Management & Leadership",
      "Entrepreneurship",
      "Law & Politics",
      "Engineering & Architecture",
      "Project Management",
      "Sales & Business Development",
    ],
  },
  rainy: {
    name: "Rainy",
    color: "temperament-melankolis",
    colorHex: "#8B6F47",
    subtitle: "Si Pemikir yang Detail",
    image: "/src/assets/Rainy.png",
    traits: [
      "Analitis dan berpikir kritis",
      "Thoughtful dan mendalam",
      "Loyal dan setia",
      "Detail dan terorganisir",
    ],
    strengths: [
      "Analitis dan detail-oriented",
      "Thoughtful dengan standar tinggi",
      "Organized dan sistematis",
      "Artistic dan creative",
    ],
    development: [
      "Overthinking dan terlalu kritis",
      "Perfeksionis berlebihan",
      "Sensitivitas tinggi dan mudah tersinggung",
    ],
    careers: [
      "Research & Analysis",
      "Accounting & Finance",
      "Engineering & Architecture",
      "Writing & Editing",
      "Art & Design",
      "Quality Assurance",
    ],
  },
  cloudy: {
    name: "Cloudy",
    color: "temperament-plegmatis",
    colorHex: "#10B981",
    subtitle: "Si Peace Maker",
    image: "/src/assets/Cloudy.png",
    traits: ["Tenang dan stable", "Sabar", "Diplomatis", "Reliable"],
    strengths: [
      "Calm dan tidak mudah panik",
      "Patient dan diplomatic",
      "Good listener",
      "Consistent dan dapat diandalkan",
    ],
    development: [
      "Procrastination dan kurang inisiatif",
      "Menghindari konflik berlebihan",
      "Kesulitan mengatakan tidak",
    ],
    careers: [
      "Counseling & Therapy",
      "Human Resources",
      "Nursing & Healthcare",
      "Administration",
      "Customer Service",
      "Education & Teaching",
    ],
  },
};

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<Record<string, number> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk kontrol modal
  const [modalImage, setModalImage] = useState(""); // State untuk menyimpan URL gambar

  useEffect(() => {
    const savedResults = localStorage.getItem("testResults");
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!results) return null;

  const dominant = Object.entries(results).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0];
  const info = temperamentInfo[dominant as keyof typeof temperamentInfo];
  const total = Object.values(results).reduce((sum, val) => sum + val, 0);

  // Fungsi untuk membuka modal dan menampilkan gambar besar
  const openModal = (imageSrc: string) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-earth-light/10">
      <Navbar />

      <section className="pt-20 pb-20 px-4 md:pt-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-start mb-8">
            <div className="lg:sticky lg:top-24 animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-earth-light/20 to-earth-accent/20 rounded-3xl blur-3xl" />
                <Card className="relative p-4 sm:p-6 md:p-8 border-2 border-earth-light/50">
                  <div className="text-center mb-4 md:mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
                      Kamu adalah
                    </h1>
                    <h2
                      className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2"
                      style={{ color: info.colorHex }}
                    >
                      {info.name}
                    </h2>
                    <p className="text-muted-foreground font-medium">
                      {info.subtitle}
                    </p>
                  </div>

                  {/* Menampilkan Gambar dan membuka modal saat diklik */}
                  <div className="text-center mb-6">
                    <img
                      src={info.image}
                      alt={info.name}
                      className="mx-auto mb-4 w-80 rounded-lg shadow-lg cursor-pointer"
                      onClick={() => openModal(info.image)} // Menambahkan event click untuk membuka modal
                    />
                  </div>

                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Bagikan Hasil
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Unduh PDF
                    </Button>
                  </div>
                </Card>
              </div>
            </div>

            {/* Right Column - Detail */}
            <div
              className="space-y-6 animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              {/* Komposisi Temperamen */}
              <Card className="p-8 border-2 border-border">
                <h3 className="text-xl font-bold mb-6">
                  Komposisi Temperamen Kamu
                </h3>
                <div className="space-y-4">
                  {Object.entries(results)
                    .sort(([, a], [, b]) => b - a)
                    .map(([key, value]) => {
                      const tempInfo =
                        temperamentInfo[key as keyof typeof temperamentInfo];
                      return (
                        <div key={key}>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-semibold capitalize">
                              {key}
                            </span>
                            <span className="text-sm font-bold">
                              {Math.round((value / total) * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                            <div
                              className="h-3 rounded-full transition-all duration-1000 ease-out"
                              style={{
                                width: `${(value / total) * 100}%`,
                                backgroundColor: tempInfo.colorHex,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </Card>

              {/* Area Pengembangan */}
              <Card className="p-8 border-2 border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-xl">🌱</span>
                  </div>
                  <h3 className="text-xl font-bold">Area Pengembangan</h3>
                </div>
                <ul className="space-y-3">
                  {info.development.map((dev, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">
                        {dev}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Karir yang Cocok */}
              <Card className="p-8 border-2 border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xl">💼</span>
                  </div>
                  <h3 className="text-xl font-bold">Karir yang Cocok</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {info.careers.map((career, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full text-sm font-medium border-2"
                      style={{
                        backgroundColor: `${info.colorHex}15`,
                        borderColor: `${info.colorHex}40`,
                        color: info.colorHex,
                      }}
                    >
                      {career}
                    </span>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              size="lg"
              className="rounded-full hover:bg-earth-light"
            >
              <Home className="mr-2 h-5 w-5" />
              Kembali ke Beranda
            </Button>
            <Button
              onClick={() => {
                localStorage.removeItem("testResults");
                window.dispatchEvent(new Event("resultsUpdated"));
                navigate("/test");
              }}
              size="lg"
              className="bg-earth-dark hover:bg-earth-accent rounded-full"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Ulangi Tes
            </Button>
          </div>
        </div>
      </section>

      {/* Modal untuk melihat gambar lebih besar */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div className="bg-white p-4 rounded-lg">
            <img
              src={modalImage}
              alt="Enlarged"
              className="w-[80vw] h-[80vh] object-contain"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Results;
