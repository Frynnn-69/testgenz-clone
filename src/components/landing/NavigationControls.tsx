"use client";

import { cn } from "@/lib/utils/cn";

interface NavigationControlsProps {
  totalItems: number;
  activeIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onDotClick: (index: number) => void;
  itemLabels: string[];
}

export function NavigationControls({
  totalItems,
  activeIndex,
  onNext,
  onPrev,
  onDotClick,
  itemLabels
}: NavigationControlsProps) {
  return (
    <div className="flex flex-col items-center gap-3 shrink-0">
      
      {/* UP Arrow */}
      <button
        onClick={onPrev}
        className="w-8 h-8 rounded-full border border-muted-foreground/20 hover:border-primary hover:bg-primary/5 flex items-center justify-center transition-colors"
        aria-label="Previous"
      >
        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* Vertical Dots */}
      <div className="flex flex-col gap-3 py-2">
        {Array.from({ length: totalItems }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onDotClick(idx)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              idx === activeIndex
                ? "bg-foreground scale-125 ring-4 ring-foreground/10 shadow-sm"
                : "bg-muted-foreground/30 hover:bg-earth-dark/50 hover:scale-110"
            )}
            aria-label={`Go to ${itemLabels[idx]}`}
          >
            <span className="sr-only">{itemLabels[idx]}</span>
          </button>
        ))}
      </div>

      {/* DOWN Arrow */}
      <button
        onClick={onNext}
        className="w-8 h-8 rounded-full border border-muted-foreground/20 hover:border-primary hover:bg-primary/5 flex items-center justify-center transition-colors"
        aria-label="Next"
      >
        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
}
