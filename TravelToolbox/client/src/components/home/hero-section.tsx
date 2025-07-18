import { CheckCircle, Smartphone, Clock } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="text-center mb-16 fade-in">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Your Ultimate{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">
            Flight Companion
          </span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Discover essential tools to make your travel experience smoother, smarter, and more affordable. From finding promo codes to checking visa requirements.
        </p>
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 mb-8">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Free to Use</span>
          </div>
          <div className="flex items-center space-x-2">
            <Smartphone className="w-4 h-4 text-blue-500" />
            <span>Mobile Friendly</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>Real-time Data</span>
          </div>
        </div>
      </div>
    </section>
  );
}
