import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about GetFlyNow? We're here to help! Reach out to us
            through the channel below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <CardTitle>General Support</CardTitle>
              <CardDescription>
                For general questions and support
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <a
                href="mailto:oitnht@gmail.com"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                oitnht@gmail.com
              </a>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Is GetFlyNow really free?
              </h3>
              <p className="text-gray-700">
                Yes! GetFlyNow is completely free to use. We earn through
                affiliate commissions when you book through our partner links,
                but this doesn't cost you anything extra.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                How accurate are the AI-generated itineraries?
              </h3>
              <p className="text-gray-700">
                Our AI provides well-researched suggestions based on current
                data, but we recommend verifying details like prices,
                availability, and local conditions before booking.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I modify the generated itineraries?
              </h3>
              <p className="text-gray-700">
                Currently, itineraries are generated as complete packages. You
                can download the PDF and manually modify it, or generate a new
                itinerary with different parameters.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Do you store my travel data?
              </h3>
              <p className="text-gray-700">
                We only store minimal data necessary for service improvement.
                Your specific travel details are not permanently stored. See our
                Privacy Policy for more details.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
