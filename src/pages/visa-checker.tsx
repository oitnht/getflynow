import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Globe, CheckCircle, AlertTriangle, XCircle, Shield } from "lucide-react";
import { countries } from "@/data/countries";
import AdBanner from "@/components/AdBanner";

export default function VisaCheckerPage() {
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkVisa = () => {
    setIsLoading(true);

    // Mock visa check logic
    setTimeout(() => {
      const visaRequired = Math.random() > 0.3;
      const stayDuration = Math.random() > 0.5 ? "90 days" : "30 days";

      setResult({
        required: visaRequired,
        duration: stayDuration,
        processing: visaRequired ? "5-10 business days" : "N/A",
        fee: visaRequired ? `$${Math.floor(Math.random() * 100) + 25}` : "Free"
      });
      setIsLoading(false);
    }, 1500);
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
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Visa Checker</h1>
                <p className="text-sm text-muted-foreground">Check visa requirements between countries</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mobile-spacing py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Check Visa Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">From Country</label>
                <Select value={fromCountry} onValueChange={setFromCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.flag} {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">To Country</label>
                <Select value={toCountry} onValueChange={setToCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.flag} {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={checkVisa}
              disabled={!fromCountry || !toCountry || isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? "Checking..." : "Check Visa Requirements"}
            </Button>

            {/* Results */}
        {result && (
          <>
            <Card className="mt-6">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  {result.required ? (
                    <XCircle className="w-6 h-6 text-red-500" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                  <div>
                    <div className="font-semibold">
                      {result.required ? "Visa Required" : "No Visa Required"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Travel from {fromCountry} to {toCountry}
                    </div>
                  </div>
                </div>

                {result.notes && (
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">{result.notes}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Visa Results Ad */}
            <div className="mt-6">
              <AdBanner 
                slot="3456789012" 
                format="rectangle"
                style={{ width: '300px', height: '250px' }}
                className="mx-auto"
              />
            </div>
          </>
        )}
          </CardContent>
        </Card>

        {/* Sidebar Ad */}
        {result && (
          <div className="mt-6">
            <AdBanner 
              slot="3456789012" 
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
              <li>• Visa requirements can change frequently. Always verify with official sources.</li>
              <li>• Some countries offer visa-on-arrival or e-visa options.</li>
              <li>• Transit visas may be required for layovers in certain countries.</li>
              <li>• Requirements may vary based on passport strength and travel purpose.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}