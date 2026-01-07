"use client";

import { Suspense } from "react";
import { ResultClient } from "@/components/result/ResultClient";
import { CapybaraLoader } from "@/components/common/CapybaraLoader";

export default function ResultPage() { 
  return (
    <Suspense fallback={<CapybaraLoader message="Memuat halaman..." />}>
      <ResultClient />
    </Suspense>
  );
}
