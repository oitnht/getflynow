import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto mobile-spacing py-4">
          <div className="flex items-center gap-4">
            <Link href="/help-center">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Help
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Terms of Service</h1>
                <p className="text-sm text-muted-foreground">Terms and conditions for using GetFlyNow</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mobile-spacing py-8">
        <Card>
          <CardHeader>
            <CardTitle>Terms of Service</CardTitle>
            <p className="text-sm text-muted-foreground">Last updated: January 18, 2025</p>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-3">1. Acceptance of Terms</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>By accessing and using GetFlyNow ("the Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">2. Description of Service</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>GetFlyNow provides travel planning tools including:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Visa requirement checking between countries</li>
                  <li>Airline promo code discovery</li>
                  <li>Baggage rules and fee information</li>
                  <li>Flight delay tracking</li>
                  <li>Airline fee comparison</li>
                  <li>Layover planning assistance</li>
                </ul>
                <p>These tools are provided for informational purposes only.</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">3. Information Accuracy</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>While we strive to provide accurate and up-to-date information:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Travel requirements, visa policies, and airline rules change frequently</li>
                  <li>Promo codes may expire or have limited availability</li>
                  <li>Flight information is subject to real-time changes</li>
                  <li>Users must verify all information with official sources before making travel decisions</li>
                </ul>
                <p><strong>GetFlyNow is not responsible for any consequences resulting from reliance on information provided.</strong></p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">4. User Responsibilities</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>When using GetFlyNow, you agree to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Use the service for lawful purposes only</li>
                  <li>Not attempt to damage, disable, or impair the service</li>
                  <li>Not use automated tools to access the service excessively</li>
                  <li>Verify all travel information with official sources</li>
                  <li>Respect intellectual property rights</li>
                  <li>Provide accurate information when contacting support</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">5. Prohibited Uses</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>You may not use GetFlyNow to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Violate any laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Transmit harmful or malicious content</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with other users' access to the service</li>
                  <li>Use the service for commercial purposes without permission</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">6. Intellectual Property</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>GetFlyNow and its content are protected by intellectual property laws:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>All content, features, and functionality are owned by GetFlyNow</li>
                  <li>Users may not copy, modify, or distribute our content without permission</li>
                  <li>Trademarks and logos are property of their respective owners</li>
                  <li>User feedback and suggestions may be used to improve the service</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">7. Disclaimers</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>GetFlyNow is provided "as is" without warranties of any kind:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>We do not guarantee the accuracy, completeness, or timeliness of information</li>
                  <li>The service may be interrupted or unavailable at times</li>
                  <li>We are not liable for decisions made based on our information</li>
                  <li>External links are provided for convenience only</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">8. Limitation of Liability</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>To the maximum extent permitted by law:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>GetFlyNow shall not be liable for any indirect, incidental, or consequential damages</li>
                  <li>Our total liability shall not exceed the amount paid by the user (if any)</li>
                  <li>Users are responsible for their own travel decisions and arrangements</li>
                  <li>We are not liable for third-party content or services</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">9. Privacy Policy</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>Your privacy is important to us. Please review our <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> to understand how we collect, use, and protect your information.</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">10. Modifications</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>We reserve the right to modify these terms at any time:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Changes will be posted on this page with a new "Last updated" date</li>
                  <li>Continued use of the service constitutes acceptance of modified terms</li>
                  <li>Material changes may be communicated through the website</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">11. Termination</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>We may terminate or suspend access to our service:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>For violations of these terms</li>
                  <li>For abusive or harmful behavior</li>
                  <li>At our discretion without notice</li>
                  <li>Users may stop using the service at any time</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">12. Governing Law</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>These terms are governed by applicable laws. Any disputes will be resolved through appropriate legal channels in accordance with jurisdiction requirements.</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">13. Contact Information</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>If you have questions about these Terms of Service, please contact us through our <Link href="/contact-us" className="text-primary hover:underline">contact form</Link>.</p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}