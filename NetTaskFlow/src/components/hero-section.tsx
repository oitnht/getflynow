import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToTools = () => {
    const element = document.getElementById("tools");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto mobile-spacing">
        <div className="text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground mb-6 mobile-text-balance">
            Your Complete
            <span className="text-primary block lg:inline lg:ml-4">Travel Companion</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 mobile-text-balance">
            From finding promo codes to checking visa requirements, FlightTools provides everything you need for seamless travel planning.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Button 
              onClick={scrollToTools}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold"
              size="lg"
            >
              Explore Tools
            </Button>
            <Button 
              variant="outline"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold"
              size="lg"
            >
              Watch Demo
            </Button>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">150K+</div>
            <div className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">2M+</div>
            <div className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">Searches</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">190+</div>
            <div className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">50+</div>
            <div className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">Airlines</div>
          </div>
        </div>
      </div>
    </section>
  );
}
