import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, HelpCircle, MessageCircle, FileText, Shield, Search } from "lucide-react";
import AdBanner from "@/components/AdBanner";

export default function HelpCenterPage() {
  const faqCategories = [
    {
      title: "Getting Started",
      icon: <HelpCircle className="w-5 h-5" />,
      questions: [
        { q: "How do I use the visa checker?", a: "Simply select your departure and destination countries from the dropdown menus, then click 'Check Visa Requirements' to get detailed information." },
        { q: "Are the promo codes verified?", a: "We verify codes regularly, but availability can change. We show success rates and verification status for each code." },
        { q: "Is the service free to use?", a: "Yes, all GetFlyNow tools are completely free to use with no registration required." }
      ]
    },
    {
      title: "Travel Tools",
      icon: <Search className="w-5 h-5" />,
      questions: [
        { q: "How accurate is the baggage information?", a: "We source information from official airline policies, but rules can change. Always verify with your airline before traveling." },
        { q: "Can I track multiple flights?", a: "Yes, you can search for any flight number in our Delay Radar tool to get real-time status updates." },
        { q: "How do I plan a layover?", a: "Use our Layover Planner by selecting your airport and layover duration. We'll suggest activities based on available time." }
      ]
    },
    {
      title: "Technical Support",
      icon: <MessageCircle className="w-5 h-5" />,
      questions: [
        { q: "The website isn't loading properly", a: "Try refreshing the page or clearing your browser cache. If issues persist, contact our support team." },
        { q: "I found incorrect information", a: "Please report any inaccuracies through our contact form so we can update our database." },
        { q: "Can I use this on mobile?", a: "Yes, GetFlyNow is fully optimized for mobile devices and tablets." }
      ]
    }
  ];

  const supportOptions = [
    {
      title: "Contact Support",
      description: "Get personalized help from our team",
      icon: <MessageCircle className="w-6 h-6" />,
      href: "/contact-us",
      action: "Contact Us"
    },
    {
      title: "Privacy Policy",
      description: "Learn how we protect your data",
      icon: <Shield className="w-6 h-6" />,
      href: "/privacy-policy",
      action: "Read Policy"
    },
    {
      title: "Terms of Service",
      description: "Understand our terms and conditions",
      icon: <FileText className="w-6 h-6" />,
      href: "/terms-of-service",
      action: "Read Terms"
    }
  ];

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
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Help Center</h1>
                <p className="text-sm text-muted-foreground">Find answers and get support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mobile-spacing py-8">
        {/* Welcome Message */}
        <Card className="mb-8">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-2">How can we help you?</h2>
            <p className="text-muted-foreground">
              Find answers to common questions or get in touch with our support team.
            </p>
          </CardContent>
        </Card>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {category.icon}
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="border-b last:border-b-0 pb-4 last:pb-0">
                      <h4 className="font-medium mb-2">{faq.q}</h4>
                      <p className="text-sm text-muted-foreground">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Center Ad */}
        <div className="mt-8">
          <AdBanner 
            slot="9012345678" 
            format="rectangle"
            style={{ width: '300px', height: '250px' }}
            className="mx-auto"
          />
        </div>

        {/* Support Options */}
        <div className="mt-12"></div>
          <h3 className="text-xl font-semibold mb-6 text-center">Need More Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportOptions.map((option, index) => (
              <Link key={index} href={option.href}>
                <Card className="transition-all duration-200 hover:shadow-md cursor-pointer group">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      {option.icon}
                    </div>
                    <h4 className="font-semibold mb-2">{option.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                    <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                      {option.action}
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}