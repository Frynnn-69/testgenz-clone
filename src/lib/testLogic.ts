import { useState, useEffect } from "react";
import { fetchQuestions, Question } from "@/lib/api/questions";

export interface UseTestLogicReturn {
  questionsData: Question[];
  currentQuestionIndex: number;
  answers: { [key: number]: string };
  isLoading: boolean;
  error: string | null;
  currentQuestion: Question | null;
  totalQuestions: number;
  isLastQuestion: boolean;
  isAnswered: boolean;
  handleSelectChoice: (label: string) => void;
  handleBack: () => void;
  handleFinish: () => Promise<void>;
}

export const useTestLogic = (): UseTestLogicReturn => {
  const [questionsData, setQuestionsData] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch questions dari API saat component mount
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const questions = await fetchQuestions({ limit: 25 });
        setQuestionsData(questions);
      } catch (err) {
        setError("Gagal memuat pertanyaan. Silakan refresh halaman.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const currentQuestion = questionsData[currentQuestionIndex] || null;
  const totalQuestions = questionsData.length;
  const isLastQuestion = currentQuestionIndex === questionsData.length - 1;
  const isAnswered = currentQuestion ? answers[currentQuestion.id] !== undefined : false;

  const handleSelectChoice = (label: string) => {
    if (!currentQuestion) return;

    // Simpan jawaban
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: label,
    };
    setAnswers(newAnswers);

    // Auto pindah ke pertanyaan berikutnya setelah 300ms
    setTimeout(() => {
      if (currentQuestionIndex < questionsData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }, 300);
  };

  const handleBack = () => {
    // Kembali ke pertanyaan sebelumnya
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinish = async () => {
    // Simulasi submit - nanti bisa diganti dengan API call ke /api/analyze
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Test selesai! Jawaban: " + JSON.stringify(answers));
      // TODO: Implement API call ke /api/analyze
    }, 2000);
  };

  return {
    questionsData,
    currentQuestionIndex,
    answers,
    isLoading,
    error,
    currentQuestion,
    totalQuestions,
    isLastQuestion,
    isAnswered,
    handleSelectChoice,
    handleBack,
    handleFinish,
  };
};

