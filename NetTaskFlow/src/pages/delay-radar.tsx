
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Radar, Clock, AlertTriangle, CheckCircle, Plane } from "lucide-react";
import AdBanner from "@/components/AdBanner";

export default function DelayRadarPage() {
  const [flightNumber, setFlightNumber] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const checkDelays = () => {
    setIsLoading(true);

    setTimeout(() => {
      // Mock flight delay data
      const mockResults = [
        {
          flight: flightNumber.toUpperCase() || "AA1234",
          airline: "American Airlines",
          route: "LAX → JFK",
          scheduled: "14:30",
          estimated: "15:45",
          status: "delayed",
          delay: "1h 15m",
          reason: "Air traffic control",
          gate: "B12"
        },
        {
          flight: "UA567",
          airline: "United Airlines", 
          route: "SFO → ORD",
          scheduled: "16:20",
          estimated: "16:20",
          status: "on-time",
          delay: null,
          reason: null,
          gate: "A8"
        },
        {
          flight: "DL891",
          airline: "Delta Air Lines",
          route: "ATL → MIA", 
          scheduled: "11:45",
          estimated: "13:30",
          status: "delayed",
          delay: "1h 45m",
          reason: "Weather conditions",
          gate: "C5"
        }
      ];

      setResults(mockResults);
      setIsLoading(false);
    }, 1200);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-time": return "text-green-600";
      case "delayed": return "text-yellow-600";
      case "cancelled": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on-time": return <CheckCircle className="w-4 h-4" />;
      case "delayed": return <Clock className="w-4 h-4" />;
      case "cancelled": return <AlertTriangle className="w-4 h-4" />;
      default: return <Plane className="w-4 h-4" />;
    }
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
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center border border-red-100">
                <Radar className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Delay Radar</h1>
                <p className="text-sm text-muted-foreground">Track real-time flight delays and disruptions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mobile-spacing py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Track Flight Delays</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Flight Number</label>
              <Input
                placeholder="Enter flight number (e.g., AA1234)"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                className="text-center"
              />
            </div>

            <Button 
              onClick={checkDelays}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? "Checking..." : "Check Flight Status"}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {results.length > 0 && (
          <>
            <div className="mt-6 space-y-4">
              {results.map((flight, index) => (
                <Card key={index} className="transition-all duration-200 hover:shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-lg">{flight.flight}</h4>
                          <div className={`flex items-center gap-1 ${getStatusColor(flight.status)}`}>
                            {getStatusIcon(flight.status)}
                            <span className="font-medium capitalize">{flight.status}</span>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-2">{flight.airline}</p>
                        <p className="font-medium mb-2">{flight.route}</p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Scheduled</div>
                            <div className="font-medium">{flight.scheduled}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Estimated</div>
                            <div className="font-medium">{flight.estimated}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Gate</div>
                            <div className="font-medium">{flight.gate}</div>
                          </div>
                          {flight.delay && (
                            <div>
                              <div className="text-muted-foreground">Delay</div>
                              <Badge variant="destructive">{flight.delay}</Badge>
                            </div>
                          )}
                        </div>

                        {flight.reason && (
                          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-center gap-2 text-yellow-800">
                              <AlertTriangle className="w-4 h-4" />
                              <span className="text-sm font-medium">Delay Reason: {flight.reason}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Delay Results Ad */}
            <div className="mt-6">
              <AdBanner 
                slot="5678901234" 
                format="rectangle"
                style={{ width: '300px', height: '250px' }}
                className="mx-auto"
              />
            </div>
          </>
        )}

        {/* Flight Status Ad */}
        {results.length > 0 && (
          <div className="mt-6">
            <AdBanner 
              slot="6789012345" 
              format="horizontal"
              className="max-w-2xl mx-auto"
            />
          </div>
        )}

        {/* Real-time Updates */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Radar className="w-5 h-5" />
              Live Delay Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">73%</div>
                <div className="text-sm text-muted-foreground">On Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">22%</div>
                <div className="text-sm text-muted-foreground">Delayed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">5%</div>
                <div className="text-sm text-muted-foreground">Cancelled</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">18m</div>
                <div className="text-sm text-muted-foreground">Avg Delay</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3">Flight Tracking Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Check status 2-3 hours before departure for the latest updates</li>
              <li>• Sign up for airline notifications to get real-time alerts</li>
              <li>• Weather delays are often system-wide and affect multiple flights</li>
              <li>• Morning flights typically have fewer delays than afternoon/evening flights</li>
              <li>• Consider travel insurance for frequent travelers</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
