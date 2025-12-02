import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import logo from "@/assets/growgenz-logo.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
  }, [location]);

  const handleStartTest = () => {
    navigate("/test");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <img 
              src={logo} 
              alt="GrowGenZ Logo" 
              className="h-8 w-8 md:h-10 md:w-10 object-contain transition-transform group-hover:scale-110" 
            />
            <span className="text-lg md:text-2xl font-bold text-earth-dark">GrowGenZ</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-earth-dark ${
                location.pathname === "/" ? "text-earth-dark" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            {hasResults && (
              <Link
                to="/results"
                className={`text-sm font-medium transition-colors hover:text-earth-dark ${
                  location.pathname === "/results" ? "text-earth-dark" : "text-muted-foreground"
                }`}
              >
                Hasil
              </Link>
            )}
            <a
              href="/#about"
              className="text-sm font-medium transition-colors hover:text-earth-dark text-muted-foreground"
            >
              About Us
            </a>
          </div>

          {/* Desktop CTA Button */}
          <Button
            onClick={handleStartTest}
            className="hidden md:flex bg-earth-dark hover:bg-earth-accent text-white px-6 rounded-full transition-all duration-300 hover:scale-105"
          >
            Mulai Tes
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-8">
                <Link
                  to="/"
                  className={`text-lg font-medium transition-colors hover:text-earth-dark ${
                    location.pathname === "/" ? "text-earth-dark" : "text-muted-foreground"
                  }`}
                >
                  Home
                </Link>
                {hasResults && (
                  <Link
                    to="/results"
                    className={`text-lg font-medium transition-colors hover:text-earth-dark ${
                      location.pathname === "/results" ? "text-earth-dark" : "text-muted-foreground"
                    }`}
                  >
                    Hasil
                  </Link>
                )}
                <a
                  href="/#about"
                  className="text-lg font-medium transition-colors hover:text-earth-dark text-muted-foreground"
                >
                  About Us
                </a>
                <Button
                  onClick={handleStartTest}
                  className="bg-earth-dark hover:bg-earth-accent text-white px-6 py-6 rounded-full transition-all duration-300 mt-4"
                >
                  Mulai Tes
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
