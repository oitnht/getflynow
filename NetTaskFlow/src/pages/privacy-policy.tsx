import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
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
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Privacy Policy</h1>
                <p className="text-sm text-muted-foreground">How we protect and use your information</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mobile-spacing py-8">
        <Card>
          <CardHeader>
            <CardTitle>Privacy Policy</CardTitle>
            <p className="text-sm text-muted-foreground">Last updated: January 18, 2025</p>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-3">1. Information We Collect</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>GetFlyNow is committed to protecting your privacy. We collect minimal information to provide our services:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Usage Data:</strong> We collect anonymous analytics about how you use our travel tools</li>
                  <li><strong>Search Queries:</strong> Country selections, airline searches, and airport codes (not linked to personal identity)</li>
                  <li><strong>Contact Information:</strong> Email and name when you contact our support team</li>
                  <li><strong>Technical Data:</strong> Browser type, device information, and IP address for security purposes</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">2. How We Use Your Information</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>We use the collected information for the following purposes:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Providing accurate visa, baggage, and flight information</li>
                  <li>Improving our travel tools and user experience</li>
                  <li>Responding to support requests and inquiries</li>
                  <li>Ensuring website security and preventing abuse</li>
                  <li>Analyzing usage patterns to enhance our services</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">3. Information Sharing</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>We do not sell, trade, or share your personal information with third parties, except:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>When required by law or legal process</li>
                  <li>To protect our rights, property, or safety</li>
                  <li>With service providers who help us operate the website (under strict confidentiality)</li>
                  <li>With your explicit consent</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">4. Data Security</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>We implement appropriate security measures to protect your information:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>SSL encryption for all data transmission</li>
                  <li>Secure servers and databases</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited access to personal information by our team</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">5. Cookies and Tracking</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>GetFlyNow uses minimal cookies and tracking technologies:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Essential cookies for website functionality</li>
                  <li>Analytics cookies to understand usage patterns</li>
                  <li>No advertising or social media tracking cookies</li>
                  <li>You can disable cookies in your browser settings</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">6. Your Rights</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>You have the following rights regarding your personal information:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Request access to your personal data</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal data</li>
                  <li>Opt-out of communications from us</li>
                  <li>File a complaint with relevant authorities</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">7. Children's Privacy</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>GetFlyNow does not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will delete it immediately.</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">8. International Users</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>GetFlyNow is a global service. By using our website, you consent to the transfer and processing of your information in accordance with this privacy policy.</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">9. Changes to This Policy</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>We may update this privacy policy from time to time. We will notify users of significant changes by posting the updated policy on this page with a new "Last updated" date.</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">10. Contact Us</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>If you have questions about this privacy policy or our data practices, please contact us through our <Link href="/contact-us" className="text-primary hover:underline">contact form</Link>.</p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}