import { useState } from "react";
import { ArrowLeft, Search, Radar, AlertCircle, Plus, Clock, Plane, TrendingUp } from "lucide-react";
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
import type { DelayReport } from "@shared/schema";

// Form validation schema
const submitDelayReportSchema = z.object({
  flightNumber: z.string().min(1, "Flight number is required").max(20, "Flight number too long"),
  airline: z.string().min(1, "Please select an airline"),
  route: z.string().min(1, "Route is required").max(100, "Route too long"),
  delayMinutes: z.coerce.number().min(1, "Delay must be at least 1 minute").max(1440, "Delay cannot exceed 24 hours"),
  reason: z.string().optional(),
  reportedBy: z.string().min(1, "Name is required").max(50, "Name too long"),
});

type SubmitDelayReportForm = z.infer<typeof submitDelayReportSchema>;

export default function DelayRadar() {
  const [showReportForm, setShowReportForm] = useState(false);
  const { toast } = useToast();

  // Fetch all delay reports
  const { data: delayReports = [], isLoading } = useQuery<DelayReport[]>({
    queryKey: ["/api/delay-reports"],
  });

  // Form setup
  const form = useForm<SubmitDelayReportForm>({
    resolver: zodResolver(submitDelayReportSchema),
    defaultValues: {
      flightNumber: "",
      airline: "",
      route: "",
      delayMinutes: 0,
      reason: "",
      reportedBy: "",
    },
  });

  // Submit mutation
  const submitMutation = useMutation({
    mutationFn: (data: SubmitDelayReportForm) => 
      apiRequest("/api/delay-reports", { method: "POST", body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/delay-reports"] });
      form.reset();
      setShowReportForm(false);
      toast({
        title: "Success!",
        description: "Your delay report has been submitted.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit delay report. Please try again.",
        variant: "destructive",
      });
    },
  });

  const airlines = [
    "Delta Air Lines", "United Airlines", "American Airlines", "Southwest Airlines",
    "JetBlue Airways", "Alaska Airlines", "Spirit Airlines", "Frontier Airlines",
    "Hawaiian Airlines", "Allegiant Air"
  ];

  // Dummy delay statistics for demonstration
  const dummyDelayStats = [
    { route: "JFK → LAX", averageDelay: 45, flights: 23, status: "moderate" },
    { route: "ORD → DFW", averageDelay: 62, flights: 18, status: "high" },
    { route: "ATL → MIA", averageDelay: 28, flights: 31, status: "low" },
    { route: "DEN → SEA", averageDelay: 73, flights: 15, status: "high" },
    { route: "LAS → PHX", averageDelay: 34, flights: 27, status: "moderate" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
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
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-red-500 rounded-xl flex items-center justify-center">
                <Radar className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Delay Radar</h1>
                <p className="text-gray-600">Track flight delays and report disruptions</p>
              </div>
            </div>
            
            <Button 
              onClick={() => setShowReportForm(!showReportForm)}
              className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Report Delay
            </Button>
          </div>
        </div>

        {/* Current Delay Statistics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-red-600" />
              Current Delay Status
            </CardTitle>
            <CardDescription>
              Real-time delay statistics for major routes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Route</th>
                    <th className="text-left py-3">Avg Delay</th>
                    <th className="text-left py-3">Flights</th>
                    <th className="text-left py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyDelayStats.map((stat, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 font-medium">{stat.route}</td>
                      <td className="py-3">{stat.averageDelay} min</td>
                      <td className="py-3">{stat.flights}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(stat.status)}`}>
                          {stat.status.charAt(0).toUpperCase() + stat.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Report Delay Form */}
        {showReportForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Report a Flight Delay</CardTitle>
              <CardDescription>
                Help other travelers by reporting delays you've experienced
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => submitMutation.mutate(data))} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="flightNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Flight Number</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., UA123" {...field} className="uppercase" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="airline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Airline</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select airline" />
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
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="route"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Route</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., JFK → LAX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="delayMinutes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delay (minutes)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g., 45" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Weather, mechanical issues, crew delay, etc." 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="reportedBy"
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
                      className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600"
                    >
                      {submitMutation.isPending ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      ) : (
                        <Plus className="w-4 h-4 mr-2" />
                      )}
                      Submit Delay Report
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowReportForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {/* Recent Delay Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Delay Reports</CardTitle>
            <CardDescription>
              {delayReports.length > 0 
                ? `${delayReports.length} reports from travelers`
                : "No delay reports yet. Be the first to report!"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Loading delay reports...</p>
              </div>
            ) : delayReports.length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">
                  No delay reports available yet. Help the community by reporting the first delay!
                </p>
                <Button 
                  onClick={() => setShowReportForm(true)}
                  className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Report the First Delay
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {delayReports.slice(0, 10).map((report) => (
                  <div 
                    key={report.id} 
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="font-semibold text-lg">{report.flightNumber}</span>
                          <span className="text-gray-600">{report.airline}</span>
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                            {report.delayMinutes} min delay
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{report.route}</p>
                        {report.reason && (
                          <p className="text-sm text-gray-500 mb-2">Reason: {report.reason}</p>
                        )}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Reported by {report.reportedBy}</span>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {new Date(report.createdAt!).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Plane className="w-8 h-8 text-gray-400 ml-4" />
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
