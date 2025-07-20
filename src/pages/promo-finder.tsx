import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Ticket, Copy, ExternalLink } from "lucide-react";
import { airlines } from "@/data/airlines";
import { promoCodes } from "@/data/promo-codes";
import { useToast } from "@/hooks/use-toast";
import AdBanner from "@/components/AdBanner";

export default function PromoFinderPage() {
  const [selectedAirline, setSelectedAirline] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const isCodeExpired = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today;
  };

  const searchPromos = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      // Filter by airline and remove expired codes
      const airlinePromos = promoCodes.filter(code => 
        code.airline === selectedAirline && !isCodeExpired(code.expires)
      );
      
      // 30% chance of no availability for live codes
      const hasAvailability = Math.random() > 0.3 && airlinePromos.length > 0;
      
      if (!hasAvailability || airlinePromos.length === 0) {
        setResults([]);
        setIsLoading(false);
        return;
      }
      
      const shuffled = airlinePromos.sort(() => 0.5 - Math.random());
      const count = Math.min(airlinePromos.length, Math.floor(Math.random() * 3) + 2); // 2-4 results
      setResults(shuffled.slice(0, count));
      setIsLoading(false);
    }, 1000);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied!",
      description: `Promo code "${code}" has been copied to your clipboard.`,
    });
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
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center border border-green-100">
                <Ticket className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Promo Code Finder</h1>
                <p className="text-sm text-muted-foreground">Find discount codes for your flights</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mobile-spacing py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Find Airline Promo Codes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Airline</label>
              <Select value={selectedAirline} onValueChange={setSelectedAirline}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an airline" />
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

            <Button 
              onClick={searchPromos}
              disabled={!selectedAirline || isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? "Searching..." : "Find Promo Codes"}
            </Button>
          </CardContent>
        </Card>

        {/* No Results Message */}
        {!isLoading && selectedAirline && results.length === 0 && (
          <Card className="mt-6">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                <Ticket className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">No Live Promo Codes Available</h3>
              <p className="text-sm text-muted-foreground">
                Sorry, there are currently no live promo codes available for {selectedAirline}. 
                All codes may be expired or temporarily unavailable. Please check back soon for new offers.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold">Available Promo Codes for {selectedAirline}</h3>
            
            {results.map((promo, index) => (
              <Card key={index} className="transition-all duration-200 hover:shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <code className="px-3 py-1 bg-primary/10 text-primary font-mono font-bold rounded">
                          {promo.code}
                        </code>
                        <Badge variant={promo.verified ? "default" : "secondary"}>
                          {promo.verified ? "Verified" : "User Submitted"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{promo.description}</p>
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span>Expires: {promo.expires}</span>
                        <span>•</span>
                        <span>Success Rate: {promo.successRate}%</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyCode(promo.code)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => window.open(`https://${selectedAirline.toLowerCase().replace(/\s+/g, '')}.com`, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Use Code
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Promo Results Ad */}
        {(results.length > 0 || (!isLoading && selectedAirline && results.length === 0)) && (
          <div className="mt-6">
            <AdBanner 
              slot="promo-results" 
              format="horizontal"
              className="max-w-2xl mx-auto"
            />
          </div>
        )}

        {/* Tips */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3">Tips for Using Promo Codes</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Try multiple codes - some may work better for specific routes or dates</li>
              <li>• Promo codes often have minimum purchase requirements</li>
              <li>• Clear your browser cookies between attempts for better success rates</li>
              <li>• Some codes work only for first-time users or specific membership tiers</li>
              <li>• Book quickly - limited-time offers can expire without notice</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}