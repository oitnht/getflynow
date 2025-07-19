import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Plane, Menu } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Plane className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">FlightTools</h1>
            </div>
          </Link>
          
          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-left px-3 py-2 rounded-md text-sm font-medium text-primary bg-primary/10 transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("tools")}
                  className="text-left px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  Tools
                </button>
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-left px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  Features
                </button>
                <Link href="/help-center">
                  <Button variant="ghost" className="justify-start mt-4">Help Center</Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => scrollToSection("home")}
              className="px-3 py-2 rounded-md text-sm font-medium text-primary bg-primary/10 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("tools")}
              className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              Tools
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              Features
            </button>
            <Link href="/help-center">
              <Button variant="ghost" className="ml-4">Help</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
