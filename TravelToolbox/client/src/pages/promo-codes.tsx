import { useState } from "react";
import { ArrowLeft, Tag, Plus, Copy, Clock, User } from "lucide-react";
import { Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AdSenseBanner from "@/components/home/adsense-banner";
import type { PromoCode } from "@shared/schema";

// Form validation schema
const submitPromoCodeSchema = z.object({
  airline: z.string().min(1, "Please select an airline"),
  code: z.string().min(1, "Promo code is required").max(50, "Code too long"),
  description: z.string().min(1, "Description is required").max(200, "Description too long"),
  submittedBy: z.string().min(1, "Name is required").max(50, "Name too long"),
});

type SubmitPromoCodeForm = z.infer<typeof submitPromoCodeSchema>;

export default function PromoCodes() {
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const { toast } = useToast();

  // Fetch all promo codes
  const { data: promoCodes = [], isLoading } = useQuery<PromoCode[]>({
    queryKey: ["/api/promo-codes"],
  });

  // Form setup
  const form = useForm<SubmitPromoCodeForm>({
    resolver: zodResolver(submitPromoCodeSchema),
    defaultValues: {
      airline: "",
      code: "",
      description: "",
      submittedBy: "",
    },
  });

  // Submit mutation
  const submitMutation = useMutation({
    mutationFn: (data: SubmitPromoCodeForm) => 
      apiRequest("/api/promo-codes", { method: "POST", body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/promo-codes"] });
      form.reset();
      setShowSubmitForm(false);
      toast({
        title: "Success!",
        description: "Your promo code has been submitted and will be verified.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit promo code. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied!",
      description: `Promo code "${code}" copied to clipboard.`,
    });
  };

  const airlines = [
    "Delta Air Lines", "United Airlines", "American Airlines", "Southwest Airlines",
    "JetBlue Airways", "Alaska Airlines", "Spirit Airlines", "Frontier Airlines",
    "Hawaiian Airlines", "Allegiant Air", "Expedia", "Kayak", "Priceline",
    "Orbitz", "Travelocity", "Booking.com", "Hotels.com"
  ];

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
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Tag className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Promo Code Finder</h1>
                <p className="text-gray-600">Find and share airline promotional codes</p>
              </div>
            </div>
            
            <Button 
              onClick={() => setShowSubmitForm(!showSubmitForm)}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Submit Code
            </Button>
          </div>
        </div>

        {/* Submit Form */}
        {showSubmitForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Submit a Promo Code</CardTitle>
              <CardDescription>
                Help the community by sharing airline promo codes you've found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => submitMutation.mutate(data))} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="airline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Airline/Platform</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select airline or platform" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {airlines.map((airline) => (
                                <SelectItem key={airline} value={airline}>
                                  {airline}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Promo Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter promo code" {...field} className="uppercase" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the discount (e.g., '10% off domestic flights', '$50 off international bookings')" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="submittedBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name or username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex space-x-2">
                    <Button 
                      type="submit" 
                      disabled={submitMutation.isPending}
                      className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
                    >
                      {submitMutation.isPending ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      ) : (
                        <Plus className="w-4 h-4 mr-2" />
                      )}
                      Submit Promo Code
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowSubmitForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {/* Promo Codes List */}
        <Card>
          <CardHeader>
            <CardTitle>Available Promo Codes</CardTitle>
            <CardDescription>
              {promoCodes.length > 0 
                ? `${promoCodes.length} active promo codes from the community`
                : "No promo codes available yet. Be the first to submit one!"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Loading promo codes...</p>
              </div>
            ) : promoCodes.length === 0 ? (
              <div className="text-center py-8">
                <Tag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">
                  No promo codes available yet. Help the community by submitting the first one!
                </p>
                <Button 
                  onClick={() => setShowSubmitForm(true)}
                  className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Submit the First Code
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {promoCodes.map((promoCode) => (
                  <div 
                    key={promoCode.id} 
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{promoCode.airline}</h3>
                        <p className="text-sm text-gray-600 mt-1">{promoCode.description}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyCode(promoCode.code)}
                        className="ml-2"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    
                    <div className="bg-gray-100 rounded-md p-2 mb-3 font-mono text-center font-semibold text-lg">
                      {promoCode.code}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {promoCode.submittedBy}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(promoCode.createdAt!).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      
      {/* Google AdSense Banner - Bottom */}
      <AdSenseBanner position="bottom" />
      <Footer />
    </div>
  );
}
