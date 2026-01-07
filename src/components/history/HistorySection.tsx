"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getTestResultHistory } from "@/lib/localStorage";
import { ExtendedTestResult, TestResult } from "@/types";
import { HistoryContent } from "./HistoryCard";
import { useRouter } from "next/navigation";
import { deleteTestResultFromHistory } from "@/lib/localStorage";

const HistorySection = () => {
    const router = useRouter();
    const [history, setHistory] = useState<ExtendedTestResult[]>([]);
    const [isVisible, setIsVisible] = useState(false);

    const loadHistory = () => {
        const historyData = getTestResultHistory();
        if (historyData && historyData.length > 0) {
            setHistory(historyData);
            setIsVisible(true);
        } else {
            setHistory([]);
            setIsVisible(false);
        }
    };

    useEffect(() => {
        loadHistory();

        window.addEventListener("storage", loadHistory);
        window.addEventListener("resultsUpdated", loadHistory);

        return () => {
            window.removeEventListener("storage", loadHistory);
            window.removeEventListener("resultsUpdated", loadHistory);
        };
    }, []);

    const handleView = (result: TestResult) => {
        // Navigate to result page with the selected test result
        router.push(`/result?timestamp=${result.timestamp}`);
    };

    const handleDelete = (timestamp: string) => {
        deleteTestResultFromHistory(timestamp);
        loadHistory();
        // Dispatch event to update Navbar
        window.dispatchEvent(new Event("resultsUpdated"));
    };
    
    const handleRetake = () => {
        router.push("/test");
    };

    if (!isVisible || history.length === 0) return null;

    return (

        <section id="history" className="py-10 md:py-16 bg-background relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                 <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-earth-light/5 to-transparent" />
                 <div className="absolute bottom-0 left-0 w-96 h-96 bg-earth-accent/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative bg-[#FDFBF7] rounded-[2.5rem] shadow-xl shadow-earth-dark/5 border border-earth-mid/10 overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-earth-light/10 rounded-full blur-[80px] pointer-events-none" />
                
                    <HistoryContent 
                        history={history}
                        onView={handleView} 
                        onDelete={handleDelete}
                        onRetake={handleRetake}
                        hideBackButton={true}
                        className="py-12 md:py-16 px-6 md:px-12" 
                        customTitle={
                            <div className="space-y-2 mb-2">
                                <span className="inline-block px-3 py-2 rounded-full bg-earth-mid/10 text-earth-dark text-xs font-semibold tracking-wider uppercase mb-2">
                                   <span className="w-1.5 h-1.5 rounded-full bg-earth-accent animate-pulse inline-block mr-2 mb-0.5" />
                                  Arsip Perjalananmu
                                </span>
                
                                <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                                    Riwayat Tes{" "}
                                    <span className="bg-gradient-to-r from-earth-dark to-earth-accent bg-clip-text text-transparent">
                                        Kepribadianmu
                                    </span>
                                </h2>
                            </div>
                        }
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default HistorySection;