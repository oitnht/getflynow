import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Ticket, Luggage, Radar, Calculator, MapPin, ArrowRight, DollarSign, Cloud } from "lucide-react";

const tools = [
  {
    title: "Visa Checker",
    description: "Check visa requirements between 190+ countries with detailed information",
    icon: Shield,
    href: "/visa-checker",
    color: "text-blue-600",
    bgColor: "bg-blue-50 hover:bg-blue-100",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    badge: "249 Countries",
    badgeColor: "bg-blue-100 text-blue-800"
  },
  {
    title: "Promo Code Finder",
    description: "Find verified discount codes and promotional offers for major airlines",
    icon: Ticket,
    href: "/promo-finder",
    color: "text-green-600", 
    bgColor: "bg-green-50 hover:bg-green-100",
    buttonColor: "bg-green-600 hover:bg-green-700",
    badge: "50+ Airlines",
    badgeColor: "bg-green-100 text-green-800"
  },
  {
    title: "Baggage Rules",
    description: "Check airline baggage policies, weight limits, and fee structures",
    icon: Luggage,
    href: "/baggage-rules",
    color: "text-purple-600",
    bgColor: "bg-purple-50 hover:bg-purple-100",
    buttonColor: "bg-purple-600 hover:bg-purple-700",
    badge: "All Classes",
    badgeColor: "bg-purple-100 text-purple-800"
  },
  {
    title: "Delay Radar",
    description: "Track real-time flight delays and disruptions with live statistics",
    icon: Radar,
    href: "/delay-radar",
    color: "text-red-600",
    bgColor: "bg-red-50 hover:bg-red-100",
    buttonColor: "bg-red-600 hover:bg-red-700",
    badge: "Live Data",
    badgeColor: "bg-red-100 text-red-800"
  },
  {
    title: "Fee Explorer",
    description: "Compare airline fees and discover hidden charges before booking",
    icon: Calculator,
    href: "/fee-explorer",
    color: "text-orange-600",
    bgColor: "bg-orange-50 hover:bg-orange-100",
    buttonColor: "bg-orange-600 hover:bg-orange-700",
    badge: "All Fees",
    badgeColor: "bg-orange-100 text-orange-800"
  },
  {
    title: "Layover Planner",
    description: "Plan airport layover activities and discover services at major hubs",
    icon: MapPin,
    href: "/layover-planner",
    color: "text-teal-600",
    bgColor: "bg-teal-50 hover:bg-teal-100",
    buttonColor: "bg-teal-600 hover:bg-teal-700",
    badge: "Major Hubs",
    badgeColor: "bg-teal-100 text-teal-800"
  },
  {
    title: "Currency Converter",
    description: "Convert currencies for travel budgeting and expense planning",
    icon: DollarSign,
    href: "/currency-converter",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50 hover:bg-yellow-100",
    buttonColor: "bg-yellow-600 hover:bg-yellow-700",
    badge: "150+ Currencies",
    badgeColor: "bg-yellow-100 text-yellow-800"
  },
  {
    title: "Weather Forecast",
    description: "Check weather conditions and forecasts for your destination",
    icon: Cloud,
    href: "/weather-forecast",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50 hover:bg-cyan-100",
    buttonColor: "bg-cyan-600 hover:bg-cyan-700",
    badge: "5-Day Forecast",
    badgeColor: "bg-cyan-100 text-cyan-800"
  }
];

export default function ToolNavigation() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {tools.map((tool, index) => {
        const IconComponent = tool.icon;
        
        return (
          <Card 
            key={index} 
            className={`relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${tool.bgColor} group`}
          >
            <CardContent className="p-6 h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${tool.buttonColor.split(' ')[0]} shadow-lg`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <Badge className={`text-xs font-medium ${tool.badgeColor} border-0`}>
                  {tool.badge}
                </Badge>
              </div>
              
              <div className="flex-grow">
                <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  {tool.title}
                </h4>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {tool.description}
                </p>
              </div>
              
              <Link href={tool.href} className="mt-auto">
                <Button 
                  className={`w-full ${tool.buttonColor} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group/button`}
                  size="lg"
                >
                  <span className="flex items-center justify-center">
                    Open Tool
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}