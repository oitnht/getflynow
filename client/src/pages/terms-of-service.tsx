
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By using GetFlyNow, you agree to these Terms of Service. If you disagree with any part, please discontinue use of our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
              <p className="text-gray-700 mb-4">
                GetFlyNow is a free AI-powered travel planning tool that:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Generates personalized travel itineraries</li>
                <li>Provides budget breakdowns and recommendations</li>
                <li>Offers affiliate booking links for travel services</li>
                <li>Allows PDF downloads of generated itineraries</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide accurate travel information</li>
                <li>Use the service for lawful purposes only</li>
                <li>Verify all travel information independently</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Disclaimers</h2>
              <p className="text-gray-700 mb-4">
                GetFlyNow is provided "as is" without warranties. We are not responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Accuracy of AI-generated travel recommendations</li>
                <li>Travel disruptions or changes</li>
                <li>Third-party booking services</li>
                <li>Financial losses from travel decisions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Affiliate Partnerships</h2>
              <p className="text-gray-700">
                We earn commissions from affiliate partners when you book through our links. This helps keep our service free while providing you the same prices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-700">
                GetFlyNow's liability is limited to the maximum extent permitted by law. We are not liable for indirect, incidental, or consequential damages.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Information</h2>
              <p className="text-gray-700">
                For questions about these terms, contact us at: legal@getflynow.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
