import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getTestResultHistory, deleteTestResultFromHistory } from "@/lib/localStorage";
import type { TestResult } from "@/types";

export function useHistory() {
  const router = useRouter();
  const [history, setHistory] = useState<TestResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHistory = () => {
      try {
        const results = getTestResultHistory();
        setHistory(results);
      } catch (error) {
        console.error("Failed to load history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
    
    // Listen for new results added
    window.addEventListener("resultsUpdated", loadHistory);
    return () => window.removeEventListener("resultsUpdated", loadHistory);
  }, []);

  const handleDelete = (timestamp: string) => {
    deleteTestResultFromHistory(timestamp);
    setHistory((prev) => prev.filter((result) => result.timestamp !== timestamp));
  };

  const handleView = (result: TestResult) => {
    // Save this result as current and navigate to result page
    localStorage.setItem("testgenz_result", JSON.stringify(result));
    router.push("/result");
  };

  return {
    history,
    isLoading,
    handleDelete,
    handleView,
  };
}
