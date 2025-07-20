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
      <div className="py-3 bg-muted/30">
        <div className="max-w-7xl mx-auto mobile-spacing text-center">
          <AdBanner 
            slot="home-top-banner" 
            format="horizontal"
            className="max-w-4xl mx-auto"
          />
        </div>
      </div>
      
      <section id="tools" className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto mobile-spacing">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 mobile-text-balance">
              Essential Travel Tools
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mobile-text-balance">
              Streamline your travel planning with our comprehensive suite of tools designed for modern travelers.
            </p>
          </div>

          <ToolNavigation />
          
          {/* Stats Section moved here with colors */}
          <div className="mt-8 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <div className="text-center bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600">150K+</div>
              <div className="text-sm sm:text-base text-blue-500 mt-1 sm:mt-2">Active Users</div>
            </div>
            <div className="text-center bg-green-50 rounded-lg p-4 border border-green-100">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600">2M+</div>
              <div className="text-sm sm:text-base text-green-500 mt-1 sm:mt-2">Searches</div>
            </div>
            <div className="text-center bg-purple-50 rounded-lg p-4 border border-purple-100">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600">190+</div>
              <div className="text-sm sm:text-base text-purple-500 mt-1 sm:mt-2">Countries</div>
            </div>
            <div className="text-center bg-orange-50 rounded-lg p-4 border border-orange-100">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-600">50+</div>
              <div className="text-sm sm:text-base text-orange-500 mt-1 sm:mt-2">Airlines</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Bottom Ad */}
      <div className="py-4 bg-muted/20">
        <div className="max-w-7xl mx-auto mobile-spacing text-center">
          <AdBanner 
            slot="tools-bottom-banner" 
            format="horizontal"
            className="max-w-4xl mx-auto"
          />
        </div>
      </div>

      <FeaturesSection />

      {/* Bottom Rectangle Ad */}
      <div className="py-6 bg-muted/10">
        <div className="max-w-7xl mx-auto mobile-spacing text-center">
          <AdBanner 
            slot="home-bottom-rect" 
            format="rectangle"
            className="mx-auto"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
