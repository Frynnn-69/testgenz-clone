// handle user actions (share & download PDF)
import { useCallback } from "react";

interface UseResultActionsReturn {
  handleShare: (weatherType: string) => void;
  handleDownloadPDF: (weatherType: string) => void;
}

export function useResultActions(): UseResultActionsReturn {
  const handleShare = useCallback((weatherType: string) => {
    const shareData = {
      title: `Hasil Tes: ${weatherType}`,
      text: `Saya adalah tipe ${weatherType}! Cek hasil tes kepribadian saya.`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`).then(() => {
        alert("Link berhasil disalin ke clipboard!");
      }).catch(() => {
        console.error("Failed to copy to clipboard");
      });
    }
  }, []);

  const handleDownloadPDF = useCallback((weatherType: string) => {
    const link = document.createElement("a");
    link.href = `/weather/${weatherType.toLowerCase()}.png`;
    link.download = `${weatherType}-personality-result.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return {
    handleShare,
    handleDownloadPDF,
  };
}
