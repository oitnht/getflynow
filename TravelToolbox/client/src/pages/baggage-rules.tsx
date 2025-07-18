import { useState } from "react";
import { ArrowLeft, Search, Briefcase } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AdSenseBanner from "@/components/home/adsense-banner";

export default function BaggageRules() {
  const [airline, setAirline] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!airline || !ticketType) return;
    
    setIsSearching(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSearching(false);
  };

  const airlines = [
    { value: "delta", label: "Delta Air Lines" },
    { value: "united", label: "United Airlines" },
    { value: "american", label: "American Airlines" },
    { value: "southwest", label: "Southwest Airlines" },
    { value: "jetblue", label: "JetBlue Airways" }
  ];

  const ticketTypes = [
    { value: "economy", label: "Economy" },
    { value: "premium-economy", label: "Premium Economy" },
    { value: "business", label: "Business" },
    { value: "first", label: "First Class" }
  ];

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      
      {/* Google AdSense Banner - Top */}
      <AdSenseBanner position="top" />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tools
            </Button>
          </Link>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
              <Briefcase className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Baggage Rules Lookup</h1>
              <p className="text-gray-600">Check baggage allowances, restrictions, and fees</p>
            </div>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Check Baggage Rules</CardTitle>
            <CardDescription>
              Select your airline and ticket type to view baggage policies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Airline</label>
                  <Select value={airline} onValueChange={setAirline}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select airline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delta">Delta Air Lines</SelectItem>
                      <SelectItem value="united">United Airlines</SelectItem>
                      <SelectItem value="american">American Airlines</SelectItem>
                      <SelectItem value="southwest">Southwest Airlines</SelectItem>
                      <SelectItem value="jetblue">JetBlue Airways</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Type</label>
                  <Select value={ticketType} onValueChange={setTicketType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ticket type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="premium-economy">Premium Economy</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="first">First Class</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button type="submit" disabled={isSearching || !airline || !ticketType} className="w-full">
                {isSearching ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Search className="w-4 h-4 mr-2" />
                )}
                Check Baggage Rules
              </Button>
            </form>
          </CardContent>
        </Card>

        {airline && ticketType && !isSearching && (
          <div className="space-y-6">
            {/* Carry-on Baggage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                  Carry-on Baggage
                </CardTitle>
                <CardDescription>
                  Baggage rules for {airlines.find(a => a.value === airline)?.label} - {ticketTypes.find(t => t.value === ticketType)?.label}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Size Limits</h4>
                    <p className="text-sm text-blue-700">22" x 14" x 9"</p>
                    <p className="text-xs text-blue-600 mt-1">(56 x 35 x 23 cm)</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Weight Limit</h4>
                    <p className="text-sm text-green-700">
                      {ticketType === 'economy' ? '15 lbs (7 kg)' : 
                       ticketType === 'premium-economy' ? '18 lbs (8 kg)' :
                       '22 lbs (10 kg)'}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Included</h4>
                    <p className="text-sm text-purple-700">
                      {ticketType === 'economy' ? '1 bag' : 
                       ticketType === 'premium-economy' ? '1 bag + priority' :
                       '2 bags + priority'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Checked Baggage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-orange-600" />
                  Checked Baggage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">First Bag</h4>
                    <p className="text-lg font-bold text-orange-700">
                      {ticketType === 'economy' ? '$35' : 
                       ticketType === 'premium-economy' ? 'Free' :
                       'Free'}
                    </p>
                    <p className="text-xs text-orange-600">50 lbs max</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-900 mb-2">Second Bag</h4>
                    <p className="text-lg font-bold text-red-700">
                      {ticketType === 'economy' ? '$45' : 
                       ticketType === 'premium-economy' ? '$35' :
                       'Free'}
                    </p>
                    <p className="text-xs text-red-600">50 lbs max</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 mb-2">Overweight</h4>
                    <p className="text-lg font-bold text-yellow-700">$100</p>
                    <p className="text-xs text-yellow-600">51-70 lbs</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Oversized</h4>
                    <p className="text-lg font-bold text-gray-700">$200</p>
                    <p className="text-xs text-gray-600">Over 62" total</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Special Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-indigo-600" />
                  Special Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Sports Equipment</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Golf clubs</span>
                        <span className="font-semibold">$75</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Skis/Snowboard</span>
                        <span className="font-semibold">$150</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Bicycle</span>
                        <span className="font-semibold">$150</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Surfboard</span>
                        <span className="font-semibold">$200</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Musical Instruments</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Small instruments</span>
                        <span className="font-semibold">Free (carry-on)</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Guitar</span>
                        <span className="font-semibold">$150</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Large instruments</span>
                        <span className="font-semibold">Extra seat required</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prohibited Items */}
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Prohibited Items</CardTitle>
                <CardDescription>Items not allowed in carry-on or checked baggage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Never Allowed</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Explosive materials</li>
                      <li>• Flammable liquids</li>
                      <li>• Compressed gases</li>
                      <li>• Firearms (without permits)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Carry-on Restrictions</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Liquids over 3.4 oz</li>
                      <li>• Sharp objects</li>
                      <li>• Tools over 7 inches</li>
                      <li>• Sporting goods</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {isSearching && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Loading baggage rules...</p>
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
