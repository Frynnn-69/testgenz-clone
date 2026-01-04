"use client";
const Footer = () => {
  return (
    <footer className="bg-earth-light/20 py-12 border-t border-earth-mid/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground/80 font-medium">
              © 2025 Test4temP. All Rights Reserved.
            </p>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="p-2 rounded-full hover:bg-earth-mid/10 text-muted-foreground hover:text-earth-dark transition-all duration-300">
              <span className="sr-only">Instagram</span>
              <i className="fab fa-instagram text-lg"></i>
            </a>
            <a href="#" className="p-2 rounded-full hover:bg-earth-mid/10 text-muted-foreground hover:text-earth-dark transition-all duration-300">
              <span className="sr-only">Twitter</span>
              <i className="fab fa-twitter text-lg"></i>
            </a>
            <a href="#" className="p-2 rounded-full hover:bg-earth-mid/10 text-muted-foreground hover:text-earth-dark transition-all duration-300">
              <span className="sr-only">LinkedIn</span>
              <i className="fab fa-linkedin text-lg"></i>
            </a>
            <a href="#" className="p-2 rounded-full hover:bg-earth-mid/10 text-muted-foreground hover:text-earth-dark transition-all duration-300">
              <span className="sr-only">Email</span>
              <i className="fas fa-envelope text-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
