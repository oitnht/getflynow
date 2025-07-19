import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Coffee, Wifi, Car, Utensils, ShoppingBag } from "lucide-react";
import AdBanner from "@/components/AdBanner";

export default function LayoverPlannerPage() {
  const [airport, setAirport] = useState("");
  const [duration, setDuration] = useState("");
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const airports = [
    { code: "LAX", name: "LAX - Los Angeles" },
    { code: "JFK", name: "JFK - New York" },
    { code: "LHR", name: "LHR - London Heathrow" },
    { code: "DXB", name: "DXB - Dubai" },
    { code: "NRT", name: "NRT - Tokyo Narita" },
    { code: "CDG", name: "CDG - Paris Charles de Gaulle" },
    { code: "SIN", name: "SIN - Singapore" },
    { code: "FRA", name: "FRA - Frankfurt" },
    { code: "AMS", name: "AMS - Amsterdam" },
    { code: "ICN", name: "ICN - Seoul Incheon" }
  ];

  const durations = [
    { value: "short", label: "1-3 hours" },
    { value: "medium", label: "3-6 hours" },
    { value: "long", label: "6+ hours" },
    { value: "overnight", label: "Overnight (8+ hours)" }
  ];

  const planLayover = () => {
    setIsLoading(true);

    setTimeout(() => {
      const plans = generateLayoverPlans(airport, duration);
      setRecommendations(plans);
      setIsLoading(false);
    }, 1000);
  };

  const generateLayoverPlans = (airportCode: string, layoverDuration: string) => {
    const basePlans: Record<string, any> = {
      short: [
        {
          category: "Airport Essentials",
          icon: <Coffee className="w-5 h-5" />,
          items: [
            { name: "Quick meal at food court", time: "30-45 min", cost: "$15-25" },
            { name: "Airport lounge access", time: "Rest of layover", cost: "$35-50" },
            { name: "Duty-free shopping", time: "30-60 min", cost: "Varies" }
          ]
        }
      ],
      medium: [
        {
          category: "Airport Activities",
          icon: <Wifi className="w-5 h-5" />,
          items: [
            { name: "Premium lounge with shower", time: "2-3 hours", cost: "$50-75" },
            { name: "Airport spa treatment", time: "60-90 min", cost: "$80-150" },
            { name: "Duty-free & souvenir shopping", time: "60-90 min", cost: "Varies" },
            { name: "Airport restaurant dining", time: "60-90 min", cost: "$25-50" }
          ]
        },
        {
          category: "Quick City Tour",
          icon: <Car className="w-5 h-5" />,
          items: [
            { name: "Airport train to city center", time: "30-45 min each way", cost: "$5-15" },
            { name: "Quick landmark visit", time: "60-90 min", cost: "Free-$20" },
            { name: "Local café or restaurant", time: "45-60 min", cost: "$15-30" }
          ]
        }
      ],
      long: [
        {
          category: "City Exploration",
          icon: <MapPin className="w-5 h-5" />,
          items: [
            { name: "City center walking tour", time: "2-3 hours", cost: "$20-40" },
            { name: "Museum or attraction visit", time: "2-3 hours", cost: "$15-30" },
            { name: "Local restaurant lunch/dinner", time: "1-2 hours", cost: "$25-60" },
            { name: "Airport transit", time: "1-2 hours total", cost: "$10-25" }
          ]
        },
        {
          category: "Airport Comfort",
          icon: <Utensils className="w-5 h-5" />,
          items: [
            { name: "Day room rental", time: "4-6 hours", cost: "$80-150" },
            { name: "Full spa service", time: "2-3 hours", cost: "$120-250" },
            { name: "Fine dining restaurant", time: "1-2 hours", cost: "$40-80" },
            { name: "Shopping & relaxation", time: "2-3 hours", cost: "Varies" }
          ]
        }
      ],
      overnight: [
        {
          category: "Airport Hotel",
          icon: <Clock className="w-5 h-5" />,
          items: [
            { name: "Transit hotel room", time: "8-12 hours", cost: "$150-300" },
            { name: "Hotel restaurant breakfast", time: "45-60 min", cost: "$25-45" },
            { name: "Fitness center access", time: "1-2 hours", cost: "Often included" },
            { name: "Business center facilities", time: "As needed", cost: "Often included" }
          ]
        },
        {
          category: "City Stay",
          icon: <ShoppingBag className="w-5 h-5" />,
          items: [
            { name: "City hotel (transit visa req'd)", time: "8-12 hours", cost: "$100-200" },
            { name: "Evening city tour", time: "2-3 hours", cost: "$30-60" },
            { name: "Local dinner experience", time: "1-2 hours", cost: "$30-70" },
            { name: "Morning sightseeing", time: "2-3 hours", cost: "$20-40" }
          ]
        }
      ]
    };

    return basePlans[layoverDuration] || [];
  };

  const getTimeColor = (time: string) => {
    if (time.includes("30-45 min") || time.includes("45-60 min")) return "text-green-600";
    if (time.includes("1-2 hours") || time.includes("60-90 min")) return "text-yellow-600";
    return "text-blue-600";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto mobile-spacing py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Layover Planner</h1>
                <p className="text-sm text-muted-foreground">Plan your airport layover activities</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mobile-spacing py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Plan Your Layover</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Airport</label>
                <Select value={airport} onValueChange={setAirport}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select airport" />
                  </SelectTrigger>
                  <SelectContent>
                    {airports.map((apt) => (
                      <SelectItem key={apt.code} value={apt.code}>
                        {apt.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Layover Duration</label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((dur) => (
                      <SelectItem key={dur.value} value={dur.value}>
                        {dur.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={planLayover}
              disabled={!airport || !duration || isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? "Planning..." : "Get Layover Recommendations"}
            </Button>
          </CardContent>
        </Card>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-6 space-y-6">
            <h3 className="text-lg font-semibold">
              Layover Recommendations for {airports.find(a => a.code === airport)?.name}
            </h3>

            {recommendations.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {category.icon}
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.items.map((item: any, itemIndex: number) => (
                      <div key={itemIndex} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                        <div className="flex-1 mb-2 sm:mb-0">
                          <h4 className="font-medium">{item.name}</h4>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <Badge variant="outline" className={getTimeColor(item.time)}>
                              {item.time}
                            </Badge>
                            <Badge variant="secondary">
                              {item.cost}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Layover Planning Ad */}
        {recommendations.length > 0 && (
          <div className="mt-6">
            <AdBanner 
              slot="8901234567" 
              format="horizontal"
              className="max-w-2xl mx-auto"
            />
          </div>
        )}

        {/* General Tips */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Layover Planning Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-green-600">Time Management</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Allow 2+ hours for security re-entry</li>
                  <li>• Check if you need a transit visa</li>
                  <li>• Consider customs/immigration time</li>
                  <li>• Monitor flight status for delays</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-blue-600">What to Bring</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Comfortable walking shoes</li>
                  <li>• Portable charger for devices</li>
                  <li>• Local currency or cards</li>
                  <li>• Emergency contact information</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Airport Services */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Common Airport Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 border rounded-lg">
                <Wifi className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <div className="text-sm font-medium">Free Wi-Fi</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <Coffee className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <div className="text-sm font-medium">Cafés & Restaurants</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <ShoppingBag className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <div className="text-sm font-medium">Duty-Free Shopping</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <Clock className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <div className="text-sm font-medium">Lounges & Rest Areas</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

```
There are no changes to be applied.