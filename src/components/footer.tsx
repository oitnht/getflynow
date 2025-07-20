import { Link } from "wouter";
import { Plane } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto mobile-spacing">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="sm:col-span-2 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold">GetFlyNow</h4>
            </div>
            <p className="text-sm sm:text-base text-white/70 mb-4 max-w-md">
              Your comprehensive travel companion for visa requirements, promo codes, baggage rules, and more.
            </p>
          </div>
          
          <div>
            <h5 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">Tools</h5>
            <ul className="space-y-2 text-sm sm:text-base text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">Visa Checker</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Promo Finder</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Baggage Rules</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Delay Radar</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">Support</h5>
            <ul className="space-y-2 text-sm sm:text-base text-white/70">
              <li><Link href="/help-center" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/contact-us" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-sm sm:text-base text-white/70">
          <p>&copy; 2025 GetFlyNow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
