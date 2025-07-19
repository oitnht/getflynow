import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ToolNavigation from "@/components/tool-navigation";
import FeaturesSection from "@/components/features-section";
import Footer from "@/components/footer";
import AdBanner from "@/components/AdBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-muted">
      <Header />
      <HeroSection />
      
      {/* Top Banner Ad */}
      <div className="py-4 bg-muted/30">
        <div className="max-w-7xl mx-auto mobile-spacing text-center">
          <AdBanner 
            slot="1234567890" 
            format="horizontal"
            className="max-w-4xl mx-auto"
          />
        </div>
      </div>
      
      <section id="tools" className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto mobile-spacing">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 mobile-text-balance">
              Essential Travel Tools
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mobile-text-balance">
              Streamline your travel planning with our comprehensive suite of tools designed for modern travelers.
            </p>
          </div>

          <ToolNavigation />
        </div>
      </section>

      {/* Middle Rectangle Ad */}
      <div className="py-8 bg-background">
        <div className="max-w-7xl mx-auto mobile-spacing text-center">
          <AdBanner 
            slot="2345678901" 
            format="rectangle"
            style={{ width: '300px', height: '250px' }}
            className="mx-auto"
          />
        </div>
      </div>

      <FeaturesSection />
      <Footer />
    </div>
  );
}
