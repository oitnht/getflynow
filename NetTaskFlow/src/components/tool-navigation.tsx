import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Ticket, Luggage, Radar, Calculator, MapPin, ArrowRight } from "lucide-react";

const tools = [
  {
    title: "Visa Checker",
    description: "Check visa requirements between 190+ countries with detailed information",
    icon: Shield,
    href: "/visa-checker",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    badge: "249 Countries"
  },
  {
    title: "Promo Code Finder",
    description: "Find verified discount codes and promotional offers for major airlines",
    icon: Ticket,
    href: "/promo-finder",
    color: "text-green-600", 
    bgColor: "bg-green-100",
    badge: "50+ Airlines"
  },
  {
    title: "Baggage Rules",
    description: "Check airline baggage policies, weight limits, and fee structures",
    icon: Luggage,
    href: "/baggage-rules",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    badge: "All Classes"
  },
  {
    title: "Delay Radar",
    description: "Track real-time flight delays and disruptions with live statistics",
    icon: Radar,
    href: "/delay-radar",
    color: "text-red-600",
    bgColor: "bg-red-100",
    badge: "Live Data"
  },
  {
    title: "Fee Explorer",
    description: "Compare airline fees and discover hidden charges before booking",
    icon: Calculator,
    href: "/fee-explorer",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    badge: "All Fees"
  },
  {
    title: "Layover Planner",
    description: "Plan airport layover activities and discover services at major hubs",
    icon: MapPin,
    href: "/layover-planner",
    color: "text-teal-600",
    bgColor: "bg-teal-100",
    badge: "Major Hubs"
  }
];

export default function ToolNavigation() {
  return (
    <div className="mobile-grid">
      {tools.map((tool, index) => {
        const IconComponent = tool.icon;
        
        return (
          <Link key={index} href={tool.href}>
            <Card className="tool-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
              <CardContent className="mobile-card">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${tool.bgColor} rounded-lg flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 ${tool.color}`} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {tool.badge}
                  </Badge>
                </div>
                
                <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {tool.title}
                </h4>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {tool.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                    Open Tool
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}