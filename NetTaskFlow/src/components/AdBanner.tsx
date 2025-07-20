import { useEffect, useRef } from "react";

interface AdBannerProps {
  slot?: string;
  format?: string;
  className?: string;
}

export default function AdBanner({ 
  slot = "1234567890", 
  format = "auto", 
  className = "" 
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      // Silently handle AdSense errors to prevent console spam
    }
  }, []);

  return (
    <div className={`w-full my-6 text-center ${className}`}>
      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-gray-500">
        <div className="text-sm font-medium">Advertisement</div>
        <div className="text-xs mt-1">AdSense Banner ({slot})</div>
        <div className="text-xs">Format: {format}</div>
      </div>
    </div>
  );
}