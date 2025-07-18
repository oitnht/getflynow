import { useState } from "react";
import { ArrowLeft, Search, Calculator, DollarSign, Luggage, Utensils, Wifi, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AdSenseBanner from "@/components/home/adsense-banner";

export default function FeeExplorer() {
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [routeType, setRouteType] = useState("");
  const [isComparing, setIsComparing] = useState(false);

  const handleCompare = async () => {
    if (selectedAirlines.length === 0 || !routeType) return;
    
    setIsComparing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsComparing(false);
  };

  const airlines = [
    { value: "delta", label: "Delta Air Lines" },
    { value: "united", label: "United Airlines" },
    { value: "american", label: "American Airlines" },
    { value: "southwest", label: "Southwest Airlines" },
    { value: "jetblue", label: "JetBlue Airways" },
    { value: "spirit", label: "Spirit Airlines" },
    { value: "frontier", label: "Frontier Airlines" }
  ];

  const routes = [
    { value: "domestic", label: "Domestic US" },
    { value: "international", label: "International" },
    { value: "transatlantic", label: "Transatlantic" },
    { value: "transpacific", label: "Transpacific" }
  ];

  // Comprehensive dummy fee data
  const feeData = {
    delta: {
      domestic: {
        baggage: { carry_on: 0, checked_1st: 30, checked_2nd: 40, overweight: 100 },
        seat: { basic: 0, preferred: 59, main_plus: 89, first: 299 },
        change: { basic: 200, main: 200, premium: 0 },
        meals: { snack: 5, meal: 12, premium: 25 },
        wifi: 8,
        priority: 15
      },
      international: {
        baggage: { carry_on: 0, checked_1st: 60, checked_2nd: 100, overweight: 200 },
        seat: { basic: 0, preferred: 89, premium: 149, first: 499 },
        change: { basic: 400, premium: 200, first: 0 },
        meals: { snack: 8, meal: 18, premium: 35 },
        wifi: 16,
        priority: 25
      }
    },
    united: {
      domestic: {
        baggage: { carry_on: 0, checked_1st: 35, checked_2nd: 45, overweight: 100 },
        seat: { basic: 0, preferred: 49, plus: 79, first: 279 },
        change: { basic: 200, plus: 0, first: 0 },
        meals: { snack: 6, meal: 14, premium: 22 },
        wifi: 8,
        priority: 20
      },
      international: {
        baggage: { carry_on: 0, checked_1st: 70, checked_2nd: 100, overweight: 200 },
        seat: { basic: 0, preferred: 99, premium: 179, first: 549 },
        change: { basic: 400, premium: 200, first: 0 },
        meals: { snack: 10, meal: 20, premium: 40 },
        wifi: 19,
        priority: 30
      }
    },
    american: {
      domestic: {
        baggage: { carry_on: 0, checked_1st: 30, checked_2nd: 40, overweight: 100 },
        seat: { basic: 0, preferred: 54, main_extra: 84, first: 319 },
        change: { basic: 200, main: 150, first: 0 },
        meals: { snack: 5, meal: 13, premium: 24 },
        wifi: 10,
        priority: 18
      },
      international: {
        baggage: { carry_on: 0, checked_1st: 60, checked_2nd: 100, overweight: 200 },
        seat: { basic: 0, preferred: 94, premium: 154, first: 479 },
        change: { basic: 400, premium: 250, first: 0 },
        meals: { snack: 8, meal: 19, premium: 38 },
        wifi: 17,
        priority: 28
      }
    },
    spirit: {
      domestic: {
        baggage: { carry_on: 37, checked_1st: 31, checked_2nd: 45, overweight: 89 },
        seat: { basic: 0, standard: 12, stretch: 34, big_front: 49 },
        change: { basic: 90, plus: 60, premium: 0 },
        meals: { snack: 3, meal: 9, combo: 15 },
        wifi: 5,
        priority: 9
      },
      international: {
        baggage: { carry_on: 47, checked_1st: 45, checked_2nd: 55, overweight: 150 },
        seat: { basic: 0, standard: 25, stretch: 55, big_front: 79 },
        change: { basic: 120, plus: 90, premium: 30 },
        meals: { snack: 5, meal: 12, combo: 20 },
        wifi: 8,
        priority: 15
      }
    }
  };

  const toggleAirline = (airlineValue: string) => {
    setSelectedAirlines(prev => 
      prev.includes(airlineValue) 
        ? prev.filter(a => a !== airlineValue)
        : [...prev, airlineValue].slice(0, 3) // Max 3 airlines
    );
  };

  const getRouteDisplayName = (routeKey: string) => {
    const routeMap: { [key: string]: string } = {
      domestic: "Domestic US",
      international: "International",
      transatlantic: "International",
      transpacific: "International"
    };
    return routeMap[routeKey] || routeKey;
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      
      {/* Google AdSense Banner - Top */}
      <AdSenseBanner position="top" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tools
            </Button>
          </Link>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center">
              <Calculator className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Airline Fee Explorer</h1>
              <p className="text-gray-600">Compare fees and extra charges across airlines</p>
            </div>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Compare Airline Fees</CardTitle>
            <CardDescription>
              Select up to 3 airlines and a route type to compare fees side by side
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Airlines to Compare (Select up to 3)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {airlines.map(airline => (
                  <Button
                    key={airline.value}
                    variant={selectedAirlines.includes(airline.value) ? "default" : "outline"}
                    className={`h-auto p-3 text-left justify-start ${
                      selectedAirlines.includes(airline.value) 
                        ? "bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600" 
                        : ""
                    }`}
                    onClick={() => toggleAirline(airline.value)}
                    disabled={!selectedAirlines.includes(airline.value) && selectedAirlines.length >= 3}
                  >
                    <div className="text-sm font-medium">{airline.label}</div>
                  </Button>
                ))}
              </div>
              {selectedAirlines.length > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  Selected: {selectedAirlines.map(a => airlines.find(al => al.value === a)?.label).join(", ")}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Route Type</label>
              <Select value={routeType} onValueChange={setRouteType}>
                <SelectTrigger className="max-w-sm">
                  <SelectValue placeholder="Select route type" />
                </SelectTrigger>
                <SelectContent>
                  {routes.map(route => (
                    <SelectItem key={route.value} value={route.value}>
                      {route.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={handleCompare} 
              disabled={isComparing || selectedAirlines.length === 0 || !routeType}
              className="bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600"
            >
              {isComparing ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              Compare Fees
            </Button>
          </CardContent>
        </Card>

        {selectedAirlines.length > 0 && routeType && !isComparing && (
          <div className="space-y-8">
            {/* Fee Comparison Tables */}
            <Tabs defaultValue="baggage" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="baggage" className="flex items-center">
                  <Luggage className="w-4 h-4 mr-2" />
                  Baggage
                </TabsTrigger>
                <TabsTrigger value="seats" className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Seats
                </TabsTrigger>
                <TabsTrigger value="services" className="flex items-center">
                  <Wifi className="w-4 h-4 mr-2" />
                  Services
                </TabsTrigger>
                <TabsTrigger value="changes" className="flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  Changes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="baggage">
                <Card>
                  <CardHeader>
                    <CardTitle>Baggage Fees Comparison</CardTitle>
                    <CardDescription>
                      {getRouteDisplayName(routeType)} flights - All prices in USD
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-2">Baggage Type</th>
                            {selectedAirlines.map(airline => (
                              <th key={airline} className="text-center py-3 px-2 min-w-[120px]">
                                {airlines.find(a => a.value === airline)?.label}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { key: 'carry_on', label: 'Carry-on' },
                            { key: 'checked_1st', label: '1st Checked Bag' },
                            { key: 'checked_2nd', label: '2nd Checked Bag' },
                            { key: 'overweight', label: 'Overweight (51-70 lbs)' }
                          ].map(bagType => (
                            <tr key={bagType.key} className="border-b border-gray-100">
                              <td className="py-3 px-2 font-medium">{bagType.label}</td>
                              {selectedAirlines.map(airline => {
                                const fee = feeData[airline as keyof typeof feeData]?.[routeType as keyof typeof feeData.delta]?.baggage[bagType.key as keyof typeof feeData.delta.domestic.baggage];
                                return (
                                  <td key={airline} className="py-3 px-2 text-center">
                                    <span className={`font-semibold ${fee === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                                      {fee === 0 ? 'Free' : `$${fee}`}
                                    </span>
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="seats">
                <Card>
                  <CardHeader>
                    <CardTitle>Seat Selection Fees</CardTitle>
                    <CardDescription>
                      {getRouteDisplayName(routeType)} flights - All prices in USD
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-2">Seat Type</th>
                            {selectedAirlines.map(airline => (
                              <th key={airline} className="text-center py-3 px-2 min-w-[120px]">
                                {airlines.find(a => a.value === airline)?.label}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {Object.keys(feeData.delta.domestic.seat).map(seatType => (
                            <tr key={seatType} className="border-b border-gray-100">
                              <td className="py-3 px-2 font-medium">
                                {seatType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </td>
                              {selectedAirlines.map(airline => {
                                const fee = feeData[airline as keyof typeof feeData]?.[routeType as keyof typeof feeData.delta]?.seat[seatType as keyof typeof feeData.delta.domestic.seat];
                                return (
                                  <td key={airline} className="py-3 px-2 text-center">
                                    <span className={`font-semibold ${fee === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                                      {fee === 0 ? 'Included' : `$${fee}`}
                                    </span>
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="services">
                <Card>
                  <CardHeader>
                    <CardTitle>Onboard Services</CardTitle>
                    <CardDescription>
                      {getRouteDisplayName(routeType)} flights - All prices in USD
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Wi-Fi & Connectivity</h4>
                        <div className="space-y-2">
                          {selectedAirlines.map(airline => (
                            <div key={airline} className="flex justify-between p-2 bg-gray-50 rounded">
                              <span>{airlines.find(a => a.value === airline)?.label}</span>
                              <span className="font-medium">
                                ${feeData[airline as keyof typeof feeData]?.[routeType as keyof typeof feeData.delta]?.wifi || 'N/A'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3">Priority Boarding</h4>
                        <div className="space-y-2">
                          {selectedAirlines.map(airline => (
                            <div key={airline} className="flex justify-between p-2 bg-gray-50 rounded">
                              <span>{airlines.find(a => a.value === airline)?.label}</span>
                              <span className="font-medium">
                                ${feeData[airline as keyof typeof feeData]?.[routeType as keyof typeof feeData.delta]?.priority || 'N/A'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="changes">
                <Card>
                  <CardHeader>
                    <CardTitle>Change & Cancellation Fees</CardTitle>
                    <CardDescription>
                      {getRouteDisplayName(routeType)} flights - All prices in USD
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-2">Fare Type</th>
                            {selectedAirlines.map(airline => (
                              <th key={airline} className="text-center py-3 px-2 min-w-[120px]">
                                {airlines.find(a => a.value === airline)?.label}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {Object.keys(feeData.delta.domestic.change).map(fareType => (
                            <tr key={fareType} className="border-b border-gray-100">
                              <td className="py-3 px-2 font-medium">
                                {fareType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </td>
                              {selectedAirlines.map(airline => {
                                const fee = feeData[airline as keyof typeof feeData]?.[routeType as keyof typeof feeData.delta]?.change[fareType as keyof typeof feeData.delta.domestic.change];
                                return (
                                  <td key={airline} className="py-3 px-2 text-center">
                                    <span className={`font-semibold ${fee === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                                      {fee === 0 ? 'Free' : `$${fee}`}
                                    </span>
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Money-Saving Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">💰 Save on Baggage</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Pack light to avoid checked bag fees</li>
                      <li>• Join airline loyalty programs for fee waivers</li>
                      <li>• Consider credit cards with baggage benefits</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">✈️ Book Smart</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Choose seats during booking for better rates</li>
                      <li>• Bundle services for potential discounts</li>
                      <li>• Consider basic economy only if you don't need extras</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {isComparing && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Loading fee comparison...</p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
      
      {/* Google AdSense Banner - Bottom */}
      <AdSenseBanner position="bottom" />
      <Footer />
    </div>
  );
}
