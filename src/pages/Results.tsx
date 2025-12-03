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
    icon: "☀️",
    color: "temperament-sunny",
    image: "/src/assets/Sunny.png",
    colorHex: "#F59E0B",
    subtitle: "Si Ceria yang Optimis",
    description:
      "Sunny adalah pribadi yang ceria, optimis, dan penuh energi. Mereka mudah bergaul dan selalu membawa keceriaan ke sekitarnya.",
    traits: [
      "Optimis dan ceria",
      "Ekspresif dan spontan",
      "Sosial dan mudah berteman",
      "Kreatif dan antusias",
    ],
    strengths: [
      "Mudah beradaptasi",
      "Komunikator yang baik",
      "Memotivasi orang lain",
      "Berpikir kreatif",
    ],
    development: [
      "Kurang fokus pada detail",
      "Mudah bosan",
      "Terlalu impulsif",
    ],
    careers: [
      "Marketing & PR",
      "Entertainment",
      "Sales",
      "Event Planning",
      "Teaching",
      "Customer Service",
    ],
  },
  stormy: {
    name: "Stormy",
    icon: "⛈️",
    color: "temperament-stormy",
    image: "/src/assets/Stormy.png",
    colorHex: "#EF4444",
    subtitle: "Si Pemimpin yang Tegas",
    description:
      "Stormy adalah pribadi yang tegas, ambisius, dan berorientasi pada hasil. Mereka adalah pemimpin alami yang tidak takut mengambil tantangan.",
    traits: [
      "Tegas dan decisive",
      "Ambisius",
      "Efisien dan produktif",
      "Percaya diri",
    ],
    strengths: [
      "Kepemimpinan yang kuat",
      "Berani mengambil risiko",
      "Goal-oriented",
      "Problem solver",
    ],
    development: [
      "Kurang sabar",
      "Terlalu dominan",
      "Mengabaikan perasaan orang lain",
    ],
    careers: [
      "Management",
      "Entrepreneurship",
      "Law & Politics",
      "Project Management",
      "Business Development",
    ],
  },
  rainy: {
    name: "Rainy",
    icon: "🌧️",
    color: "temperament-rainy",
    image: "/src/assets/Rainy.png",
    colorHex: "#3B82F6",
    subtitle: "Si Pemikir yang Mendalam",
    description:
      "Rainy adalah pribadi analitis yang menghargai detail, kualitas, dan kesempurnaan. Mereka mendalam dalam pemikiran dan memiliki standar tinggi.",
    traits: [
      "Analitis dan kritis",
      "Thoughtful dan mendalam",
      "Loyal dan setia",
      "Detail dan terorganisir",
    ],
    strengths: [
      "Detail-oriented",
      "Standar tinggi",
      "Sistematis",
      "Artistic dan creative",
    ],
    development: [
      "Overthinking",
      "Perfeksionis berlebihan",
      "Sensitivitas tinggi",
    ],
    careers: [
      "Research & Analysis",
      "Accounting & Finance",
      "Engineering",
      "Writing & Editing",
      "Art & Design",
    ],
  },
  cloudy: {
    name: "Cloudy",
    icon: "☁️",
    color: "temperament-cloudy",
    image: "/src/assets/Cloudy.png",
    colorHex: "#10B981",
    subtitle: "Si Damai yang Tenang",
    description:
      "Cloudy adalah pribadi yang tenang, damai, dan sabar. Mereka adalah pendengar yang baik dan mampu menjadi mediator yang efektif.",
    traits: ["Tenang dan stable", "Sabar", "Diplomatis", "Reliable"],
    strengths: [
      "Tidak mudah panik",
      "Diplomatic",
      "Good listener",
      "Dapat diandalkan",
    ],
    development: [
      "Kurang inisiatif",
      "Menghindari konflik",
      "Kesulitan mengatakan tidak",
    ],
    careers: [
      "Counseling",
      "Human Resources",
      "Healthcare",
      "Administration",
      "Education",
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
          <div className="grid lg:grid-cols-2 gap-8 md:gap-10 items-start mb-8 justify-items-center">
            {/* Left Column - 3D Visual */}
            <div
              className="lg:sticky lg:top-24 w-full max-w-md mx-auto animate-fade-in"
              style={{ animationDelay: "150ms" }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-earth-light/20 to-earth-accent/20 rounded-3xl blur-3xl" />
                <Card className="relative p-4 sm:p-6 md:p-8 border-2 border-earth-light/50">
                  <div className="text-center mb-3 sm:mb-4 md:mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-earth-light to-earth-accent mb-2 sm:mb-3 md:mb-4">
                      <span className="text-2xl sm:text-3xl md:text-4xl">
                        🧠
                      </span>
                    </div>
                    <h1 className="text-base sm:text-lg md:text-2xl font-bold mb-1">
                      Kamu adalah
                    </h1>
                    <h2
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1"
                      style={{ color: info.colorHex }}
                    >
                      {info.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium px-2">
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

                  <p className="text-center text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6 px-2">
                    {info.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs sm:text-sm"
                    >
                      <Share2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Bagikan Hasil
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs sm:text-sm"
                    >
                      <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Unduh PDF
                    </Button>
                  </div>
                </Card>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-4 sm:space-y-6 w-full max-w-md lg:max-w-xl mx-auto">
              {/* Komposisi Temperamen */}
              <Card
                className="p-4 sm:p-6 md:p-8 border-2 border-border w-full animate-fade-in"
                style={{ animationDelay: "220ms" }}
              >
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center">
                  Komposisi Temperamen Kamu
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {Object.entries(results)
                    .sort(([, a], [, b]) => b - a)
                    .map(([key, value]) => {
                      const tempInfo =
                        temperamentInfo[key as keyof typeof temperamentInfo];
                      return (
                        <div key={key}>
                          <div className="flex justify-between mb-1.5 sm:mb-2">
                            <span className="text-xs sm:text-sm font-semibold capitalize">
                              {key}
                            </span>
                            <span className="text-xs sm:text-sm font-bold">
                              {Math.round((value / total) * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5 sm:h-3 overflow-hidden">
                            <div
                              className="h-2.5 sm:h-3 rounded-full transition-all duration-1000 ease-out"
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

              {/* Kekuatan */}
              <Card
                className="p-4 sm:p-6 md:p-8 border-2 border-border w-full animate-fade-in"
                style={{ animationDelay: "260ms" }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 justify-center sm:justify-start">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg sm:text-xl">👍</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-center sm:text-left">
                    Kekuatan Kamu
                  </h3>
                </div>
                <ul className="space-y-2 sm:space-y-3">
                  {info.strengths.map((strength, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 sm:mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground leading-relaxed text-left">
                        {strength}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Area Pengembangan */}
              <Card
                className="p-4 sm:p-6 md:p-8 border-2 border-border w-full animate-fade-in"
                style={{ animationDelay: "300ms" }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 justify-center sm:justify-start">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg sm:text-xl">🌱</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-center sm:text-left">
                    Area Pengembangan
                  </h3>
                </div>
                <ul className="space-y-2 sm:space-y-3">
                  {info.development.map((dev, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 sm:mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground leading-relaxed text-left">
                        {dev}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Karir yang Cocok */}
              <Card
                className="p-4 sm:p-6 md:p-8 border-2 border-border w-full animate-fade-in"
                style={{ animationDelay: "340ms" }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 justify-center sm:justify-start">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg sm:text-xl">💼</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-center sm:text-left">
                    Karir yang Cocok
                  </h3>
                </div>
                <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 sm:gap-2">
                  {info.careers.map((career, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border-2"
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
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8 px-2 sm:px-4">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              size="lg"
              className="rounded-full hover:bg-earth-light text-sm sm:text-base w-full sm:w-auto"
            >
              <Home className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Kembali ke Beranda
            </Button>
            <Button
              onClick={() => {
                localStorage.removeItem("testResults");
                window.dispatchEvent(new Event("resultsUpdated"));
                navigate("/test");
              }}
              size="lg"
              className="bg-earth-dark hover:bg-earth-accent rounded-full text-sm sm:text-base w-full sm:w-auto"
            >
              <RefreshCw className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
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
