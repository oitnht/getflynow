import { useState } from "react";
import { ArrowLeft, Search, Route, MapPin, Clock, Utensils, ShoppingBag, Bed, Car, Star, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AdSenseBanner from "@/components/home/adsense-banner";

export default function LayoverPlanner() {
  const [selectedAirport, setSelectedAirport] = useState("");
  const [duration, setDuration] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!selectedAirport || !duration) return;
    
    setIsSearching(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSearching(false);
  };

  const airports = [
    { code: "JFK", name: "John F. Kennedy International Airport", city: "New York" },
    { code: "LAX", name: "Los Angeles International Airport", city: "Los Angeles" },
    { code: "ORD", name: "O'Hare International Airport", city: "Chicago" },
    { code: "DFW", name: "Dallas/Fort Worth International Airport", city: "Dallas" },
    { code: "ATL", name: "Hartsfield-Jackson Atlanta International Airport", city: "Atlanta" },
    { code: "DEN", name: "Denver International Airport", city: "Denver" },
    { code: "LAS", name: "McCarran International Airport", city: "Las Vegas" },
    { code: "SEA", name: "Seattle-Tacoma International Airport", city: "Seattle" },
    { code: "MIA", name: "Miami International Airport", city: "Miami" },
    { code: "SFO", name: "San Francisco International Airport", city: "San Francisco" },
  ];

  const durations = [
    { value: "1-2", label: "1-2 hours" },
    { value: "2-4", label: "2-4 hours" },
    { value: "4-6", label: "4-6 hours" },
    { value: "6-8", label: "6-8 hours" },
    { value: "8+", label: "8+ hours" },
  ];

  // Comprehensive layover data for different airports and durations
  const layoverData = {
    JFK: {
      "1-2": {
        activities: [
          { name: "Terminal Exploration", duration: "30-60 min", type: "free", description: "Explore JFK's art installations and architecture" },
          { name: "Duty-Free Shopping", duration: "45 min", type: "shopping", description: "Browse international brands and NYC souvenirs" },
        ],
        dining: [
          { name: "Shake Shack", terminal: "T4", price: "$$", cuisine: "American", rating: 4.2 },
          { name: "Deep Blue Sushi", terminal: "T5", price: "$$$", cuisine: "Japanese", rating: 4.0 },
        ],
        services: ["Free WiFi", "Phone Charging", "Lounges (paid)", "Currency Exchange"],
        tips: ["Stay in your terminal to avoid re-security", "Download JFK app for real-time updates"]
      },
      "2-4": {
        activities: [
          { name: "TWA Hotel", duration: "2-3 hours", type: "sightseeing", description: "Visit the iconic TWA Flight Center, now a hotel" },
          { name: "Rooftop Pool at TWA", duration: "1 hour", type: "relaxation", description: "Relax at the observation deck with runway views" },
          { name: "Terminal Shopping", duration: "1-2 hours", type: "shopping", description: "Explore premium shops across terminals" },
        ],
        dining: [
          { name: "Paris Café", terminal: "T1", price: "$$", cuisine: "French", rating: 4.3 },
          { name: "Bobby Van's Steakhouse", terminal: "T8", price: "$$$$", cuisine: "Steakhouse", rating: 4.1 },
          { name: "Croque Monsieur", terminal: "T4", price: "$$", cuisine: "French", rating: 3.9 },
        ],
        services: ["Spa Services", "Shower Facilities", "Business Centers", "Art Exhibitions"],
        tips: ["Consider TWA Hotel for comfortable layover", "Book spa treatments in advance"]
      },
      "4-6": {
        activities: [
          { name: "Manhattan Quick Trip", duration: "3-4 hours", type: "city-tour", description: "Visit Times Square or Central Park (budget 1h each way travel)" },
          { name: "TWA Hotel Stay", duration: "3-4 hours", type: "hotel", description: "Book a day room for rest and relaxation" },
          { name: "Art Gallery Tour", duration: "1-2 hours", type: "culture", description: "Explore rotating art exhibitions in terminals" },
        ],
        dining: [
          { name: "Uptown Brasserie", terminal: "T4", price: "$$$", cuisine: "American", rating: 4.2 },
          { name: "Five Guys", terminal: "T4", price: "$$", cuisine: "Burgers", rating: 4.0 },
        ],
        services: ["Day rooms available", "Luggage storage", "Concierge services", "Spa treatments"],
        tips: ["Leave airport only if comfortable with timing", "Consider hotel day pass for shower/rest"]
      }
    },
    LAX: {
      "1-2": {
        activities: [
          { name: "LAX Art Program Tour", duration: "45 min", type: "culture", description: "Self-guided tour of airport art installations" },
          { name: "Observation Deck", duration: "30 min", type: "sightseeing", description: "Watch planes from outdoor observation area" },
        ],
        dining: [
          { name: "In-N-Out Burger", terminal: "T3", price: "$$", cuisine: "Burgers", rating: 4.4 },
          { name: "Urth Caffé", terminal: "T7", price: "$$", cuisine: "Café", rating: 4.1 },
        ],
        services: ["Free WiFi", "Meditation Room", "Pet Relief Areas", "Kids Play Areas"],
        tips: ["Use free shuttle between terminals", "Download LAX app for maps and services"]
      },
      "2-4": {
        activities: [
          { name: "Beach Walk", duration: "2-3 hours", type: "outdoor", description: "Visit nearby Manhattan Beach (20 min by rideshare)" },
          { name: "Premium Lounge Access", duration: "2-3 hours", type: "relaxation", description: "Day pass to Star Alliance or Priority Pass lounges" },
        ],
        dining: [
          { name: "Wolfgang Puck", terminal: "T2", price: "$$$", cuisine: "California", rating: 4.2 },
          { name: "Real Food Daily", terminal: "T3", price: "$$", cuisine: "Vegan", rating: 4.0 },
        ],
        services: ["Yoga Room", "Nursing Rooms", "Barber Shop", "Shoe Shine"],
        tips: ["Consider beach trip if weather is nice", "Book lounge access for comfortable wait"]
      }
    }
  };

  const getLayoverPlan = () => {
    if (!selectedAirport || !duration) return null;
    
    const airportData = layoverData[selectedAirport as keyof typeof layoverData];
    if (!airportData) return null;
    
    return airportData[duration as keyof typeof airportData] || null;
  };

  const plan = getLayoverPlan();
  const selectedAirportInfo = airports.find(a => a.code === selectedAirport);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'shopping': return <ShoppingBag className="w-4 h-4" />;
      case 'dining': return <Utensils className="w-4 h-4" />;
      case 'relaxation': return <Bed className="w-4 h-4" />;
      case 'sightseeing': return <MapPin className="w-4 h-4" />;
      case 'culture': return <Star className="w-4 h-4" />;
      case 'outdoor': return <Car className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      
      {/* Google AdSense Banner - Top */}
      <AdSenseBanner position="top" />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tools
            </Button>
          </Link>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-blue-500 rounded-xl flex items-center justify-center">
              <Route className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Layover Planner</h1>
              <p className="text-gray-600">Plan your layover with personalized recommendations</p>
            </div>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Plan Your Layover</CardTitle>
            <CardDescription>
              Select your layover airport and duration to get personalized recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Airport</label>
                <Select value={selectedAirport} onValueChange={setSelectedAirport}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select layover airport" />
                  </SelectTrigger>
                  <SelectContent>
                    {airports.map(airport => (
                      <SelectItem key={airport.code} value={airport.code}>
                        <div className="flex flex-col">
                          <span className="font-medium">{airport.code} - {airport.city}</span>
                          <span className="text-xs text-gray-500">{airport.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Layover Duration</label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map(dur => (
                      <SelectItem key={dur.value} value={dur.value}>
                        {dur.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              onClick={handleSearch} 
              disabled={isSearching || !selectedAirport || !duration}
              className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600"
            >
              {isSearching ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              Get Layover Plan
            </Button>
          </CardContent>
        </Card>

        {plan && selectedAirportInfo && !isSearching && (
          <div className="space-y-8">
            {/* Airport Information Header */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-teal-600" />
                  {selectedAirportInfo.name}
                </CardTitle>
                <CardDescription>
                  {selectedAirportInfo.city} • Layover Duration: {durations.find(d => d.value === duration)?.label}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Layover Plan */}
            <Tabs defaultValue="activities" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="activities" className="flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  Activities
                </TabsTrigger>
                <TabsTrigger value="dining" className="flex items-center">
                  <Utensils className="w-4 h-4 mr-2" />
                  Dining
                </TabsTrigger>
                <TabsTrigger value="services" className="flex items-center">
                  <Bed className="w-4 h-4 mr-2" />
                  Services
                </TabsTrigger>
                <TabsTrigger value="tips" className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Tips
                </TabsTrigger>
              </TabsList>

              <TabsContent value="activities">
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Activities</CardTitle>
                    <CardDescription>
                      Perfect activities for your {durations.find(d => d.value === duration)?.label} layover
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {plan.activities.map((activity, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center">
                              {getActivityIcon(activity.type)}
                              <h3 className="font-semibold ml-2">{activity.name}</h3>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {activity.duration}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge 
                              variant={activity.type === 'free' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="dining">
                <Card>
                  <CardHeader>
                    <CardTitle>Dining Options</CardTitle>
                    <CardDescription>
                      Restaurants and cafes available during your layover
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {plan.dining.map((restaurant, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold">{restaurant.name}</h3>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 mr-1" />
                              <span className="text-sm">{restaurant.rating}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Terminal:</span>
                              <Badge variant="outline">{restaurant.terminal}</Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Cuisine:</span>
                              <span>{restaurant.cuisine}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Price Range:</span>
                              <span className="font-medium">{restaurant.price}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="services">
                <Card>
                  <CardHeader>
                    <CardTitle>Airport Services</CardTitle>
                    <CardDescription>
                      Available services and amenities at {selectedAirportInfo.code}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {plan.services.map((service, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                          <span className="text-sm font-medium">{service}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tips">
                <Card>
                  <CardHeader>
                    <CardTitle>Pro Tips</CardTitle>
                    <CardDescription>
                      Make the most of your layover at {selectedAirportInfo.code}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {plan.tips.map((tip, index) => (
                        <div key={index} className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-white text-xs font-bold">{index + 1}</span>
                          </div>
                          <p className="text-sm text-blue-800">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* General Layover Tips */}
            <Card>
              <CardHeader>
                <CardTitle>General Layover Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">✅ Short Layovers (1-3 hours)</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Stay in your terminal</li>
                      <li>• Find your next gate first</li>
                      <li>• Grab a quick meal</li>
                      <li>• Charge your devices</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">🕐 Medium Layovers (3-6 hours)</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Explore multiple terminals</li>
                      <li>• Consider lounge access</li>
                      <li>• Enjoy a sit-down meal</li>
                      <li>• Take a shower if available</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-700 mb-2">🌟 Long Layovers (6+ hours)</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Consider leaving the airport</li>
                      <li>• Book a day room or hotel</li>
                      <li>• Explore the city</li>
                      <li>• Plan for 2+ hours return time</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {!plan && selectedAirport && duration && !isSearching && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <MapPin className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">
                  We don't have detailed layover plans for {selectedAirport} yet, but we're working on adding more airports!
                </p>
                <p className="text-sm text-gray-500">
                  Try selecting JFK or LAX for sample layover plans.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {isSearching && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Creating your personalized layover plan...</p>
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
