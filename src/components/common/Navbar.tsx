"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button as TailwindButton } from "@/components/ui/tailwind-button";
import { Menu } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [hasResults, setHasResults] = useState(false);

  useEffect(() => {
    const checkResults = () => {
      const savedResults = localStorage.getItem("testResults");
      setHasResults(!!savedResults);
    };

    checkResults();
    window.addEventListener("storage", checkResults);
    
    // Custom event untuk update navbar
    const handleResultsUpdate = () => checkResults();
    window.addEventListener("resultsUpdated", handleResultsUpdate);

    return () => {
      window.removeEventListener("storage", checkResults);
      window.removeEventListener("resultsUpdated", handleResultsUpdate);
    };
  }, [pathname]);

  const handleStartTest = () => {
    router.push("/test");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            <Image
              src="/growgenz-logo.png"
              alt="GrowGenZ Logo"
              width={40}
              height={40}
              className="h-8 w-8 md:h-10 md:w-10 object-contain transition-transform group-hover:scale-110"
              priority
            />
            <span className="text-lg md:text-2xl font-bold text-earth-dark">GrowGenZ</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-earth-dark ${
                pathname === "/" ? "text-earth-dark" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            {hasResults && (
              <Link
                href="/results"
                className={`text-sm font-medium transition-colors hover:text-earth-dark ${
                  pathname === "/results" ? "text-earth-dark" : "text-muted-foreground"
                }`}
              >
                Hasil
              </Link>
            )}
            <a
              href="#about"
              className="text-sm font-medium transition-colors hover:text-earth-dark text-muted-foreground"
            >
              About Us
            </a>
          </div>

          <TailwindButton
            onClick={handleStartTest}
            className="hidden md:flex bg-earth-dark hover:bg-earth-accent text-white px-6 rounded-full transition-all duration-300 hover:scale-105"
          >
            Mulai Tes
          </TailwindButton>

          {/* Mobile Menu - Simplified without Sheet */}
          <div className="md:hidden">
            <TailwindButton variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </TailwindButton>
          </div>
          {/* Mobile menu drawer - TODO: Add proper mobile menu */}
          <div className="hidden">
              <div className="flex flex-col gap-6 mt-8">
                <Link
                  href="/"
                  className={`text-lg font-medium transition-colors hover:text-earth-dark ${
                    pathname === "/" ? "text-earth-dark" : "text-muted-foreground"
                  }`}
                >
                  Home
                </Link>
                {hasResults && (
                  <Link
                    href="/results"
                    className={`text-lg font-medium transition-colors hover:text-earth-dark ${
                      pathname === "/results" ? "text-earth-dark" : "text-muted-foreground"
                    }`}
                  >
                    Hasil
                  </Link>
                )}
                <a
                  href="#about"
                  className="text-lg font-medium transition-colors hover:text-earth-dark text-muted-foreground"
                >
                  About Us
                </a>
                <TailwindButton
                  onClick={handleStartTest}
                  className="bg-earth-dark hover:bg-earth-accent text-white px-6 py-6 rounded-full transition-all duration-300 mt-4"
                >
                  Mulai Tes
                </TailwindButton>
              </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
