import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Luggage, Weight, Ruler, DollarSign } from "lucide-react";
import { airlines } from "@/data/airlines";
import AdBanner from "@/components/AdBanner";

export default function BaggageRulesPage() {
  const [selectedAirline, setSelectedAirline] = useState("");
  const [flightType, setFlightType] = useState("");
  const [classType, setClassType] = useState("");
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkBaggage = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      // Mock baggage rules data
      const rules = {
        carryOn: {
          weight: flightType === "international" ? "7kg" : "7kg",
          dimensions: "55cm x 35cm x 25cm",
          fee: "Free"
        },
        checked: {
          weight: classType === "business" ? "32kg" : "23kg",
          dimensions: "158cm linear",
          fee: flightType === "international" ? "$50-120" : "$25-75",
          additional: classType === "business" ? "2 bags free" : "1 bag free"
        },
        restricted: [
          "Liquids over 100ml in carry-on",
          "Sharp objects and tools",
          "Lithium batteries over 100Wh",
          "Sporting equipment (special handling)"
        ]
      };
      
      setResults(rules);
      setIsLoading(false);
    }, 1000);
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
              <div className="w-10 h-10 bg-secondary/50 rounded-lg flex items-center justify-center">
                <Luggage className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Baggage Rules</h1>
                <p className="text-sm text-muted-foreground">Check airline baggage policies and fees</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mobile-spacing py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Check Baggage Rules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <label className="text-sm font-medium">Flight Type</label>
                <Select value={flightType} onValueChange={setFlightType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="domestic">Domestic</SelectItem>
                    <SelectItem value="international">International</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Class</label>
                <Select value={classType} onValueChange={setClassType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economy">Economy</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="first">First Class</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={checkBaggage}
              disabled={!selectedAirline || !flightType || !classType || isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? "Checking..." : "Check Baggage Rules"}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {results && (
          <div className="mt-6 space-y-6">
            {/* Carry-On Rules */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Luggage className="w-5 h-5" />
                  Carry-On Baggage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Weight className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Weight Limit</div>
                      <div className="font-semibold">{results.carryOn.weight}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Dimensions</div>
                      <div className="font-semibold">{results.carryOn.dimensions}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Fee</div>
                      <div className="font-semibold text-green-600">{results.carryOn.fee}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Checked Baggage Rules */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Luggage className="w-5 h-5" />
                  Checked Baggage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Weight className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Weight Limit</div>
                      <div className="font-semibold">{results.checked.weight}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Size Limit</div>
                      <div className="font-semibold">{results.checked.dimensions}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Additional Fees</div>
                      <div className="font-semibold">{results.checked.fee}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Allowance</div>
                    <Badge variant="secondary">{results.checked.additional}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Restricted Items */}
            <Card>
              <CardHeader>
                <CardTitle>Restricted Items</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {results.restricted.map((item: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 bg-destructive rounded-full flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Baggage Info Ad */}
        {results && (
          <div className="mt-6">
            <AdBanner 
              slot="5678901234" 
              format="rectangle"
              style={{ width: '300px', height: '250px' }}
              className="mx-auto"
            />
          </div>
        )}

        {/* Additional Info */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3">Important Notes</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Baggage rules may vary by route, aircraft type, and booking class</li>
              <li>• Some routes may have different weight limits due to aircraft restrictions</li>
              <li>• Overweight and oversized baggage fees apply for exceeding limits</li>
              <li>• Special items like sports equipment may have different rules and fees</li>
              <li>• Always check with the airline for the most current policies</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}