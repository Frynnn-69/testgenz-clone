import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TestSectionProps {
  onComplete: (results: Record<string, number>) => void;
}

const questions = [
  {
    id: 1,
    question: "Bagaimana cara kamu berinteraksi dalam pertemuan sosial?",
    options: [
      {
        text: "Aktif berbicara dan mudah berteman dengan orang baru",
        temperament: "sunny",
      },
      {
        text: "Memimpin percakapan dan mengambil keputusan",
        temperament: "stormy",
      },
      {
        text: "Mendengarkan lebih banyak dan berpikir mendalam",
        temperament: "rainy",
      },
      {
        text: "Tenang dan mengikuti alur percakapan",
        temperament: "cloudy",
      },
    ],
  },
  {
    id: 2,
    question: "Bagaimana kamu menghadapi tantangan atau masalah?",
    options: [
      {
        text: "Tetap optimis dan mencari cara kreatif",
        temperament: "sunny",
      },
      {
        text: "Langsung mengambil tindakan dan mencari solusi cepat",
        temperament: "stormy",
      },
      {
        text: "Menganalisis detail dan merencanakan dengan hati-hati",
        temperament: "rainy",
      },
      {
        text: "Tenang dan sabar menunggu situasi membaik",
        temperament: "cloudy",
      },
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

const TestSection = ({ onComplete }: TestSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
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
      onComplete(newAnswers);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <p className="text-center mt-2 text-sm text-muted-foreground">
            Pertanyaan {currentQuestion + 1} dari {questions.length}
          </p>
        </div>

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
      </div>
    </section>
  );
};

export default TestSection;
