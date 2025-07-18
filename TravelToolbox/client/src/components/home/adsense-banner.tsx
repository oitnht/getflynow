import { ExternalLink } from "lucide-react";

interface AdSenseBannerProps {
  position: "top" | "bottom";
}

export default function AdSenseBanner({ position }: AdSenseBannerProps) {
  return (
    <div className="bg-gray-100 border-gray-200 border-b border-t">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-center">
        <div className="w-full max-w-3xl h-24 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="text-center">
            <ExternalLink className="text-gray-400 w-6 h-6 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">Google AdSense Banner (728x90)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
