import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Plane, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Plane className="text-white w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">FlightTools</h1>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#tools" className="text-gray-600 hover:text-sky-500 transition-colors duration-200">Tools</a>
            <a href="#about" className="text-gray-600 hover:text-sky-500 transition-colors duration-200">About</a>
            <a href="#contact" className="text-gray-600 hover:text-sky-500 transition-colors duration-200">Contact</a>
          </nav>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-600 hover:text-sky-500"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-2">
              <a href="#tools" className="text-gray-600 hover:text-sky-500 transition-colors duration-200 py-2">Tools</a>
              <a href="#about" className="text-gray-600 hover:text-sky-500 transition-colors duration-200 py-2">About</a>
              <a href="#contact" className="text-gray-600 hover:text-sky-500 transition-colors duration-200 py-2">Contact</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
