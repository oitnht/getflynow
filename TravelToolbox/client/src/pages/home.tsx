import { Tags, Briefcase, FileText, Radar, Calculator, Route } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/home/hero-section";
import ToolCard from "@/components/home/tool-card";
import StatisticsSection from "@/components/home/statistics-section";
import AdSenseBanner from "@/components/home/adsense-banner";

export default function Home() {
  const tools = [
    {
      title: "Promo Code Finder",
      description: "Discover active discount codes and promotional offers from major airlines and booking platforms.",
      icon: Tags,
      href: "/promo-codes",
      gradientColors: "bg-gradient-to-r from-green-400 to-blue-500"
    },
    {
      title: "Baggage Rules Lookup",
      description: "Check baggage allowances, restrictions, and fees for different airlines and ticket types.",
      icon: Briefcase,
      href: "/baggage-rules",
      gradientColors: "bg-gradient-to-r from-purple-400 to-pink-500"
    },
    {
      title: "Visa Checker",
      description: "Verify visa requirements and entry regulations for your destination country.",
      icon: FileText,
      href: "/visa-checker",
      gradientColors: "bg-gradient-to-r from-yellow-400 to-orange-500"
    },
    {
      title: "Delay Radar",
      description: "Track real-time flight delays, cancellations, and airport disruptions worldwide.",
      icon: Radar,
      href: "/delay-radar",
      gradientColors: "bg-gradient-to-r from-red-400 to-red-500"
    },
    {
      title: "Airline Fee Explorer",
      description: "Compare hidden fees, seat selection costs, and extra charges across airlines.",
      icon: Calculator,
      href: "/fee-explorer",
      gradientColors: "bg-gradient-to-r from-indigo-400 to-purple-500"
    },
    {
      title: "Layover Planner",
      description: "Plan your layover time with airport guides, activities, and connection information.",
      icon: Route,
      href: "/layover-planner",
      gradientColors: "bg-gradient-to-r from-teal-400 to-blue-500"
    }
  ];

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      <AdSenseBanner position="top" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSection />
        
        <section id="tools" className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Flight Tools</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive suite of travel tools designed to save you time and money on your next journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <ToolCard key={index} {...tool} />
            ))}
          </div>
        </section>
        
        <StatisticsSection />
      </main>
      
      <AdSenseBanner position="bottom" />
      <Footer />
    </div>
  );
}
