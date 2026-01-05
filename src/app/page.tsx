"use client";

import { Suspense, useState, useEffect, startTransition } from "react";
import { useSearchParams } from "next/navigation";
import { CapybaraLoader } from "@/components/common/CapybaraLoader";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Hero from "@/components/landing/HeroSection";
import HistorySection from "@/components/history/HistorySection";
import AboutSection from "@/components/landing/AboutSection";
import CTASection from "@/components/landing/CTASection";
import PreTestForm from "@/components/test/PreTestForm";
import { toaster } from "@/components/ui/toaster";

function HomeContent() {
  const searchParams = useSearchParams();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "auth_required") {
      queueMicrotask(() => {
        startTransition(() => {
          toaster.create({
            title: "Akses Ditolak",
            description: "Silakan isi data diri terlebih dahulu untuk memulai tes",
            type: "error",
            duration: 4000,
          });
        });
      });
    }
  }, [searchParams]);

  const handleStartTest = () => {
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <Hero onStartTest={handleStartTest} />

      <HistorySection />

      <AboutSection />

      <CTASection />

      <Footer />

      {/* Modal Overlay (PreTestForm) */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="relative">
            <button
              className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-white text-gray-500 shadow-md hover:bg-gray-100 hover:text-red-500 transition-colors z-[101] flex items-center justify-center font-bold"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <PreTestForm />
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={<CapybaraLoader/>}
    >
      <HomeContent />
    </Suspense>
  );
}
