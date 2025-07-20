import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, DollarSign, ArrowRightLeft } from "lucide-react";
import AdBanner from "@/components/AdBanner";

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" }
];

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const convertCurrency = () => {
    if (!amount || !fromCurrency || !toCurrency) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      // Mock exchange rate calculation
      const mockRates: { [key: string]: number } = {
        "USD-EUR": 0.85,
        "USD-GBP": 0.73,
        "USD-JPY": 110,
        "EUR-USD": 1.18,
        "GBP-USD": 1.37,
        "JPY-USD": 0.009
      };
      
      const rate = mockRates[`${fromCurrency}-${toCurrency}`] || Math.random() * 2;
      const convertedAmount = parseFloat(amount) * rate;
      
      setResult({
        originalAmount: amount,
        convertedAmount: convertedAmount.toFixed(2),
        rate: rate.toFixed(4),
        fromCurrency,
        toCurrency,
        timestamp: new Date().toLocaleString()
      });
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
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center border border-yellow-100">
                <DollarSign className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Currency Converter</h1>
                <p className="text-sm text-muted-foreground">Convert currencies for travel planning</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mobile-spacing py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Convert Currency</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount</label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">From</label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">To</label>
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={convertCurrency}
              disabled={!amount || !fromCurrency || !toCurrency || isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? "Converting..." : (
                <>
                  <ArrowRightLeft className="w-4 h-4 mr-2" />
                  Convert Currency
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <Card className="mt-6">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {currencies.find(c => c.code === result.toCurrency)?.symbol}
                  {result.convertedAmount}
                </div>
                <div className="text-muted-foreground mb-4">
                  {currencies.find(c => c.code === result.fromCurrency)?.symbol}
                  {result.originalAmount} {result.fromCurrency} = {result.convertedAmount} {result.toCurrency}
                </div>
                <div className="text-sm text-muted-foreground">
                  Exchange Rate: 1 {result.fromCurrency} = {result.rate} {result.toCurrency}
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Last updated: {result.timestamp}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <AdBanner slot="currency-bottom" format="horizontal" className="mt-6" />
      </div>
    </div>
  );
}