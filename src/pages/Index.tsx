import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/commons/Navbar";
import Footer from "@/components/commons/Footer";
import HeroWithVisual from "@/components/landing/HeroWithVisual";
import AboutSection from "@/components/landing/AboutSection";
import HistorySection from "@//components/landing/HistorySection";

const Index = () => {
  const navigate = useNavigate();
  const [hasHistory, setHasHistory] = useState(false);

  useEffect(() => {
    const checkHistory = () => {
      const history = localStorage.getItem("testHistory");
      setHasHistory(!!history && JSON.parse(history).length > 0);
    };

    checkHistory();
    window.addEventListener("resultsUpdated", checkHistory);
    return () => window.removeEventListener("resultsUpdated", checkHistory);
  }, []);

  const handleStartTest = () => {
    navigate("/test");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <HeroWithVisual onStartTest={handleStartTest} />

      {hasHistory && <HistorySection onRetake={handleStartTest} />}

      <AboutSection />

      <Footer />
    </div>
  );
};

export default Index;
