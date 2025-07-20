import { Zap, Globe, Shield } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get instant results with our optimized search algorithms and real-time data.",
      color: "primary"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Access information for 190+ countries and 50+ major airlines worldwide.",
      color: "accent"
    },
    {
      icon: Shield,
      title: "Always Updated",
      description: "Stay informed with the latest travel policies, fees, and requirements.",
      color: "destructive"
    }
  ];

  return (
    <section id="features" className="py-12 sm:py-16 lg:py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto mobile-spacing">
        <div className="text-center mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 mobile-text-balance">
            Why Choose GetFlyNow?
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mobile-text-balance">
            Trusted by thousands of travelers worldwide for reliable and up-to-date travel information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center animate-in fade-in slide-in-from-bottom-8 duration-1000"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`w-14 sm:w-16 h-14 sm:h-16 bg-${feature.color}/10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className={`w-7 sm:w-8 h-7 sm:h-8 text-${feature.color}`} />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-2">{feature.title}</h4>
              <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
