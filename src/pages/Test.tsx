import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/commons/Navbar";
import Footer from "@/components/commons/Footer";

const questions = [
  {
    id: 1,
    question: "Bagaimana cara kamu berinteraksi dalam pertemuan sosial?",
    options: [
      { text: "Aktif berbicara dan mudah berteman dengan orang baru", temperament: "sunny" },
      { text: "Memimpin percakapan dan mengambil keputusan", temperament: "stormy" },
      { text: "Mendengarkan lebih banyak dan berpikir mendalam", temperament: "rainy" },
      { text: "Tenang dan mengikuti alur percakapan", temperament: "cloudy" },
    ],
  },
  {
    id: 2,
    question: "Bagaimana kamu menghadapi tantangan atau masalah?",
    options: [
      { text: "Tetap optimis dan mencari cara kreatif", temperament: "sunny" },
      { text: "Langsung mengambil tindakan dan mencari solusi cepat", temperament: "stormy" },
      { text: "Menganalisis detail dan merencanakan dengan hati-hati", temperament: "rainy" },
      { text: "Tenang dan sabar menunggu situasi membaik", temperament: "cloudy" },
    ],
  },
  {
    id: 3,
    question: "Apa yang paling menggambarkan gaya kerjamu?",
    options: [
      { text: "Spontan dan fleksibel", temperament: "sunny" },
      { text: "Efisien dan fokus pada hasil", temperament: "stormy" },
      { text: "Terorganisir dan perfeksionis", temperament: "rainy" },
      { text: "Stabil dan konsisten", temperament: "cloudy" },
    ],
  },
  {
    id: 4,
    question: "Bagaimana kamu menunjukkan emosi?",
    options: [
      { text: "Ekspresif dan mudah terlihat", temperament: "sunny" },
      { text: "Tegas dan langsung", temperament: "stormy" },
      { text: "Tertutup dan mendalam", temperament: "rainy" },
      { text: "Tenang dan jarang terlihat", temperament: "cloudy" },
    ],
  },
  {
    id: 5,
    question: "Apa yang memotivasi kamu dalam hidup?",
    options: [
      { text: "Kesenangan dan pengalaman baru", temperament: "sunny" },
      { text: "Pencapaian dan kekuasaan", temperament: "stormy" },
      { text: "Kesempurnaan dan kedalaman", temperament: "rainy" },
      { text: "Ketenangan dan harmoni", temperament: "cloudy" },
    ],
  },
];

const Test = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showUserForm, setShowUserForm] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState<Record<string, number>>({
    sunny: 0,
    stormy: 0,
    rainy: 0,
    cloudy: 0,
  });

  const handleAnswer = (temperament: string) => {
    const newAnswers = { ...answers, [temperament]: answers[temperament] + 1 };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowUserForm(true);
    }
  };

  const handleSubmitUser = () => {
    if (!username.trim()) return;
    
    // Save to testResults for backward compatibility
    localStorage.setItem("testResults", JSON.stringify(answers));
    
    // Save to history array with user info
    const newHistoryItem = {
      id: Date.now().toString(),
      results: answers,
      timestamp: Date.now(),
      username: username.trim(),
      email: email.trim(),
    };
    
    const existingHistory = localStorage.getItem("testHistory");
    const history = existingHistory ? JSON.parse(existingHistory) : [];
    history.unshift(newHistoryItem);
    localStorage.setItem("testHistory", JSON.stringify(history));
    
    window.dispatchEvent(new Event("resultsUpdated"));
    navigate("/results");
  };

  const progress = showUserForm ? 100 : ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-8">
            <Progress value={progress} className="h-2" />
            <p className="text-center mt-2 text-sm text-muted-foreground">
              {showUserForm ? "Hampir selesai!" : `Pertanyaan ${currentQuestion + 1} dari ${questions.length}`}
            </p>
          </div>

          {showUserForm ? (
            <Card className="p-8 animate-fade-in">
              <h2 className="text-2xl font-bold mb-2 text-foreground text-center">
                Selamat! Tes Selesai 🎉
              </h2>
              <p className="text-muted-foreground text-center mb-6">
                Masukkan nama dan email untuk melihat hasil
              </p>
              <div className="space-y-4 max-w-md mx-auto">
                <div className="space-y-2">
                  <Label htmlFor="username">Nama Lengkap *</Label>
                  <Input
                    id="username"
                    placeholder="Masukkan nama kamu"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email (opsional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Masukkan email kamu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12"
                  />
                </div>
                <Button
                  onClick={handleSubmitUser}
                  disabled={!username.trim()}
                  className="w-full h-12 bg-earth-dark hover:bg-earth-accent text-white rounded-full mt-4"
                >
                  Lihat Hasil Saya
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-8 animate-fade-in">
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                {questions[currentQuestion].question}
              </h2>
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(option.temperament)}
                    variant="outline"
                    className="w-full text-left p-6 h-auto hover:bg-earth-light hover:border-earth-dark transition-all duration-300"
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Test;