"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button as TailwindButton } from "@/components/ui/tailwind-button";
import { cn } from "@/lib/utils/cn";
import { Menu, Github } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [hasResults, setHasResults] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const checkResults = () => {
      // Check if either single result or history exists
      const savedResult = localStorage.getItem("testgenz_result");
      const savedHistory = localStorage.getItem("testgenz_history");
      setHasResults(!!savedResult || !!savedHistory);
    };

    checkResults();
    window.addEventListener("storage", checkResults);
  
    const handleResultsUpdate = () => checkResults();
    window.addEventListener("resultsUpdated", handleResultsUpdate);

    return () => {
      window.removeEventListener("storage", checkResults);
      window.removeEventListener("resultsUpdated", handleResultsUpdate);
    };
  }, [pathname]);

  // Smart Scroll Logic
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
           setIsVisible(false);
        } else {
           setIsVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);



  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform",
        isVisible ? "translate-y-0" : "-translate-y-full",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-earth-mid/10 shadow-sm py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="group">
            <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-earth-dark to-earth-accent bg-clip-text text-transparent transition-all group-hover:opacity-80" style={{ fontFamily: 'var(--font-syne)' }}>
              Test4temP
            </h1>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#home"
              className="text-sm font-medium text-muted-foreground hover:text-earth-dark transition-colors relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-earth-dark transition-all duration-300 group-hover:w-full" />
            </Link>
            
            <Link
              href="/#about"
              className="text-sm font-medium text-muted-foreground hover:text-earth-dark transition-colors relative group"
            >
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-earth-dark transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              href={hasResults ? "/#history" : "/history"}
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-earth-dark transition-colors"
            >
              History
              <span 
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-125",
                  hasResults 
                    ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-pulse" 
                    : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse"
                )}
              />
            </Link>

            {/* Divider */}
            <div className="w-0.5 h-6 bg-border/80" />

            <a
              href="https://github.com/Frynnn-69/testgenz-clone"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-2.5 rounded-full bg-white hover:bg-gray-50 text-[#24292f] transition-all duration-300 transform hover:scale-105 shadow-sm border border-[#d0d7de]"
              aria-label="GitHub Repository"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Menu Button (Simple)*/}
          <div className="md:hidden">
            <TailwindButton variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </TailwindButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
