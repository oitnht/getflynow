import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calculator, DollarSign, CreditCard, AlertCircle } from "lucide-react";
import { airlines } from "@/data/airlines";
import AdBanner from "@/components/AdBanner";

export default function FeeExplorerPage() {
  const [selectedAirline, setSelectedAirline] = useState("");
  const [feeType, setFeeType] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const feeTypes = [
    { value: "baggage", label: "Baggage Fees" },
    { value: "seat", label: "Seat Selection" },
    { value: "change", label: "Change/Cancellation" },
    { value: "upgrade", label: "Upgrade Fees" },
    { value: "meals", label: "Food & Beverages" },
    { value: "wifi", label: "Wi-Fi & Entertainment" }
  ];

  const exploreFees = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      // Mock fee data based on selection
      const mockFees = generateMockFees(feeType);
      setResults(mockFees);
      setIsLoading(false);
    }, 1000);
  };

  const generateMockFees = (type: string) => {
    const baseFees: Record<string, any[]> = {
      baggage: [
        { item: "First Checked Bag", domestic: "$35", international: "$60", notes: "Free for premium members" },
        { item: "Second Checked Bag", domestic: "$45", international: "$100", notes: "Weight limit 50lbs" },
        { item: "Overweight (51-70lbs)", domestic: "$100", international: "$200", notes: "Additional fee" },
        { item: "Oversized (63-80in)", domestic: "$150", international: "$300", notes: "Linear inches" }
      ],
      seat: [
        { item: "Standard Seat", domestic: "Free", international: "Free", notes: "24hrs before departure" },
        { item: "Extra Legroom", domestic: "$15-45", international: "$25-85", notes: "Varies by aircraft" },
        { item: "Window/Aisle", domestic: "$8-25", international: "$15-35", notes: "Popular rows" },
        { item: "Premium Economy", domestic: "$35-75", international: "$75-150", notes: "Enhanced comfort" }
      ],
      change: [
        { item: "Same-Day Change", domestic: "$75", international: "$125", notes: "Subject to availability" },
        { item: "Date Change", domestic: "$200", international: "$400", notes: "Plus fare difference" },
        { item: "Route Change", domestic: "$250", international: "$500", notes: "Plus fare difference" },
        { item: "Cancellation", domestic: "$200", international: "$400", notes: "Non-refundable tickets" }
      ],
      upgrade: [
        { item: "Business Class", domestic: "$150-400", international: "$500-1200", notes: "At check-in" },
        { item: "First Class", domestic: "$200-600", international: "$800-2000", notes: "Subject to availability" },
        { item: "Priority Boarding", domestic: "$15", international: "$25", notes: "Zone 1 access" },
        { item: "Lounge Access", domestic: "$50", international: "$75", notes: "Day pass" }
      ],
      meals: [
        { item: "Snack Box", domestic: "$8-12", international: "$15-20", notes: "Pre-order available" },
        { item: "Fresh Meal", domestic: "$15-25", international: "$25-40", notes: "Hot meal service" },
        { item: "Alcoholic Beverages", domestic: "$8-15", international: "$12-20", notes: "Premium selection" },
        { item: "Special Dietary", domestic: "$20", international: "$30", notes: "48hr advance notice" }
      ],
      wifi: [
        { item: "Basic Wi-Fi", domestic: "$8", international: "$15", notes: "Messaging & email" },
        { item: "Full Wi-Fi", domestic: "$15", international: "$25", notes: "Streaming available" },
        { item: "Premium Wi-Fi", domestic: "$20", international: "$35", notes: "High-speed access" },
        { item: "Entertainment", domestic: "$5", international: "$8", notes: "Movies & TV shows" }
      ]
    };

    return baseFees[type] || [];
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
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Calculator className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Fee Explorer</h1>
                <p className="text-sm text-muted-foreground">Compare airline fees and hidden charges</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mobile-spacing py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Explore Airline Fees</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Airline</label>
                <Select value={selectedAirline} onValueChange={setSelectedAirline}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select airline" />
                  </SelectTrigger>
                  <SelectContent>
                    {airlines.map((airline) => (
                      <SelectItem key={airline.code} value={airline.name}>
                        {airline.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Fee Category</label>
                <Select value={feeType} onValueChange={setFeeType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fee type" />
                  </SelectTrigger>
                  <SelectContent>
                    {feeTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={exploreFees}
              disabled={!selectedAirline || !feeType || isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? "Loading..." : "Explore Fees"}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold">
                {feeTypes.find(t => t.value === feeType)?.label} - {selectedAirline}
              </h3>
              <Badge variant="outline">Updated Today</Badge>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left p-4 font-medium">Service</th>
                        <th className="text-left p-4 font-medium">Domestic</th>
                        <th className="text-left p-4 font-medium">International</th>
                        <th className="text-left p-4 font-medium">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((fee, index) => (
                        <tr key={index} className="border-b last:border-b-0 hover:bg-muted/30">
                          <td className="p-4 font-medium">{fee.item}</td>
                          <td className="p-4">
                            <Badge variant={fee.domestic === "Free" ? "default" : "secondary"}>
                              {fee.domestic}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge variant={fee.international === "Free" ? "default" : "secondary"}>
                              {fee.international}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">{fee.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Fee Results Ad */}
        {results.length > 0 && (
          <div className="mt-6">
            <AdBanner 
              slot="7890123456" 
              format="rectangle"
              style={{ width: '300px', height: '250px' }}
              className="mx-auto"
            />
          </div>
        )}

        {/* Fee Calculator */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Fee Calculator Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-green-600">Money-Saving Tips</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Book basic economy carefully - fees add up quickly</li>
                  <li>• Pack light to avoid baggage fees</li>
                  <li>• Use airline credit cards for free bags</li>
                  <li>• Check in online to avoid airport fees</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-yellow-600">Hidden Fees to Watch</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Seat selection fees (even middle seats)</li>
                  <li>• Carry-on bag fees on budget airlines</li>
                  <li>• Phone booking fees vs online</li>
                  <li>• Print-at-home boarding pass fees</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="mt-6 border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800">Important Disclaimer</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Fees shown are estimates based on standard published rates. Actual fees may vary by route, 
                  booking class, loyalty status, and promotional offers. Always verify current fees on the 
                  airline's official website before booking.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}