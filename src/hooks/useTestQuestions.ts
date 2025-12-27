// fetch questions from API
import { useState, useEffect, useCallback, useMemo } from "react";
import type { Question } from "@/lib/questions";

interface UseTestQuestionsReturn {
  questions: Question[];
  isLoading: boolean;
  error: string | null;
}

export function useTestQuestions(isAuthenticated: boolean | null): UseTestQuestionsReturn {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadQuestions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch("/api/questions");
      if (!response.ok) {
        throw new Error("Gagal mengambil data dari server");
      }
      
      const data = await response.json();
      setQuestions(data);
    } catch (err) {
      setError("Gagal memuat pertanyaan. Silakan refresh halaman.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated === true) {
      loadQuestions();
    }
  }, [isAuthenticated, loadQuestions]);

  const memoizedQuestions = useMemo(() => questions, [questions]);

  return { 
    questions: memoizedQuestions, 
    isLoading, 
    error 
  };
}
