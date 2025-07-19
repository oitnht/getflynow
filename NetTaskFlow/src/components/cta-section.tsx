import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-r from-primary to-accent">
      <div className="max-w-4xl mx-auto mobile-spacing text-center">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 mobile-text-balance">
          Ready to Simplify Your Travel?
        </h3>
        <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto mobile-text-balance">
          Join thousands of smart travelers who use FlightTools to save time, money, and avoid travel hassles.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <Button className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-white text-primary hover:bg-white/90 text-base sm:text-lg font-semibold">
            Get Started Free
          </Button>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto px-6 sm:px-8 py-3 border-2 border-white text-white hover:bg-white/10 text-base sm:text-lg font-semibold"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
