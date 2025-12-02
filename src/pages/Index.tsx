import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/commons/Navbar";
import Footer from "@/components/commons/Footer";
import HeroWithVisual from "@/components/landing/HeroWithVisual";
import AboutSection from "@/components/landing/AboutSection";
import ResultSection from "@/components/landing/ResultSection";

const Index = () => {
  const navigate = useNavigate();
  const [testResults, setTestResults] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    const savedResults = localStorage.getItem("testResults");
    if (savedResults) {
      setTestResults(JSON.parse(savedResults));
    }
  }, []);

  const handleStartTest = () => {
    navigate("/test");
  };

  const handleRetakeTest = () => {
    localStorage.removeItem("testResults");
    window.dispatchEvent(new Event("resultsUpdated"));
    navigate("/test");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <HeroWithVisual onStartTest={handleStartTest} />

      {testResults && (
        <ResultSection results={testResults} onRetake={handleRetakeTest} />
      )}

      <AboutSection />

      <Footer />
    </div>
  );
};

export default Index;
