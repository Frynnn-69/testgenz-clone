"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { History, Clock, RefreshCw, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import type { TestResult } from "@/types";
import { getTemperamentCardInfo } from "@/lib/constants/temperamentMetadata";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { formatDate } from "@/lib/utils/dateFormatter";

interface HistoryClientProps {
  history: TestResult[];
  onView: (result: TestResult) => void;
  onDelete: (timestamp: string) => void;
  onRetake: () => void;
  hideBackButton?: boolean;
  customTitle?: React.ReactNode;
  className?: string; 
}

export function HistoryContent({ history, onView, onDelete, onRetake, hideBackButton = false, customTitle, className }: HistoryClientProps) {
  const [selectedResult, setSelectedResult] = useState<TestResult | null>(null);
  const { visibleItems, itemRefs } = useScrollAnimation(history.length);

  if (history.length === 0) {
    return (
      <section className={className || "py-20 px-4 bg-muted/30"}>
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-xl text-muted-foreground mb-4">Belum ada riwayat tes</p>
          <p className="text-sm text-muted-foreground mb-6">
            Yuk mulai tes kepribadianmu dan temukan tipe temperamen yang cocok denganmu!
          </p>
          <button
            onClick={onRetake}
            className="group relative px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-300 inline-flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
            <span className="font-medium text-gray-700 group-hover:text-gray-900">Mulai Tes Pertama</span>
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Mulai tes baru
            </div>
          </button>
        </div>
      </section>
    );
  }

  const selectedInfo = selectedResult
    ? getTemperamentCardInfo(selectedResult.weatherType)
    : null;

  return (
    <section className={className || "py-20 px-4 bg-muted/30"}>
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <History className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">
              Riwayat Tes
            </span>
          </div>
          {customTitle ? customTitle : (
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Riwayat Tes Kepribadianmu
            </h2>
          )}
          <p className="text-muted-foreground">
            Kamu sudah melakukan {history.length} kali tes. Klik untuk melihat detail.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {history.map((item, index) => {
            const itemInfo = getTemperamentCardInfo(item.weatherType);
            const isVisible = visibleItems.has(index);

            return (
              <div
                key={item.timestamp}
                ref={(el) => { itemRefs.current[index] = el; }}
                className={`transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card className="p-4 md:p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 rounded-3xl border border-border/60 hover:border-border/80 group relative min-h-[120px]">
                  <div 
                    className="flex items-center justify-between gap-4 cursor-pointer h-full"
                    onClick={() => setSelectedResult(item)}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${itemInfo?.color || 'bg-gray-100'} border-2 ${itemInfo?.borderColor || 'border-transparent'} text-2xl flex-shrink-0 transition-colors`}
                      >
                        {itemInfo?.icon || "❓"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg text-foreground truncate">
                          {item.userData.nama}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate">
                          {item.userData.email || "Email tidak tersedia"}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1 flex-wrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${itemInfo?.color || 'bg-gray-100'} ${itemInfo?.textColor} border ${itemInfo?.borderColor || 'border-gray-200'}`}
                          >
                            {itemInfo?.name || item.weatherType}
                          </span>
                          <span className="hidden sm:inline opacity-50">•</span>
                          <div className="hidden sm:flex items-center gap-1 opacity-70">
                            <Clock className="w-3 h-3" />
                            <span>{formatDate(item.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span
                        className={`hidden md:inline-flex px-3 py-1 rounded-full text-sm font-bold ${itemInfo?.color || 'bg-gray-100'} ${itemInfo?.textColor} border ${itemInfo?.borderColor || 'border-gray-200'}`}
                      >
                        Tes #{history.length - index}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(item.timestamp);
                        }}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Hapus hasil tes"
                      >
                        <Trash2 size={18} />
                      </button>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {!hideBackButton && (
            <button
              onClick={() => window.history.back()}
            className="group relative px-8 py-3.5 bg-white border border-gray-200 rounded-full hover:border-earth-mid/50 hover:shadow-lg hover:shadow-earth-light/20 transition-all duration-300 flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-earth-dark transition-colors duration-300" />
            <span className="font-medium text-gray-600 group-hover:text-earth-dark transition-colors duration-300">Kembali</span>
          </button>
          )}
          
          <button
            onClick={onRetake}
            className="group relative px-8 py-3.5 bg-white border border-gray-200 rounded-full hover:border-earth-mid/50 hover:shadow-lg hover:shadow-earth-light/20 transition-all duration-300 flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5 text-gray-400 group-hover:text-earth-dark transition-colors duration-300" />
            <span className="font-medium text-gray-600 group-hover:text-earth-dark transition-colors duration-300">Ulangi Tes</span>
          </button>
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog
        open={!!selectedResult}
        onOpenChange={() => setSelectedResult(null)}
      >
        <DialogContent className="max-w-lg mx-4">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              Hasil Tes Kepribadian
            </DialogTitle>
          </DialogHeader>

          {selectedResult && selectedInfo && (
            <div className="space-y-6 py-4">
              <div className="text-center">
                <div
                  className={`inline-flex w-16 h-16 rounded-full items-center justify-center ${selectedInfo.color} border-2 mb-4 text-3xl`}
                >
                  {selectedInfo.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {selectedResult.userData.nama}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {selectedResult.userData.email}
                </p>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${selectedInfo.color} border`}
                >
                  {selectedInfo.name}
                </span>
                <p className="text-muted-foreground text-sm mt-3">
                  {selectedInfo.description}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {selectedInfo.traits.map((trait, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-muted rounded-full text-sm font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>

              {selectedResult.analysis && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-foreground">{selectedResult.analysis}</p>
                </div>
              )}

              <p className="text-center text-xs text-muted-foreground">
                <Clock className="w-3 h-3 inline mr-1" />
                {formatDate(selectedResult.timestamp)}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onView(selectedResult);
                    setSelectedResult(null);
                  }}
                  className="flex-1 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-300 font-medium text-gray-700 hover:text-gray-900"
                >
                  Lihat Detail Lengkap
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
