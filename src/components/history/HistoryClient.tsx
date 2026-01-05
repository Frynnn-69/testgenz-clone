"use client";

import { CapybaraLoader } from "@/components/common/CapybaraLoader";

import { useHistory } from "@/hooks/useHistory";
import { HistoryContent } from "./HistoryCard";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { useRouter } from "next/navigation";

export function HistoryClient() {
  const router = useRouter();
  const { history, isLoading, handleDelete, handleView } = useHistory();

  const handleRetake = () => {
    router.push("/test");
  };

  if (isLoading) {
    return <CapybaraLoader message="Memuat riwayat..." />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HistoryContent
          history={history}
          onView={handleView}
          onDelete={handleDelete}
          onRetake={handleRetake}
        />
      </main>
      <Footer />
    </div>

    //   <div className="min-h-screen bg-background">
    //   <Navbar />
    //     <HistoryContent
    //       history={history}
    //       onView={handleView}
    //       onDelete={handleDelete}
    //       onRetake={handleRetake}
    //     />
    // </div>
  );
}
