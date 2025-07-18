import { Link } from "wouter";
import { ArrowRight, LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradientColors: string;
}

export default function ToolCard({ title, description, icon: Icon, href, gradientColors }: ToolCardProps) {
  return (
    <div className="tool-card group">
      <div className="p-6">
        <div className={`tool-card-icon ${gradientColors}`}>
          <Icon className="text-white w-5 h-5" />
        </div>
        <h4 className="text-xl font-semibold text-gray-900 mb-3">{title}</h4>
        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
        <Link href={href}>
          <button className={`tool-button ${gradientColors}`}>
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </Link>
      </div>
    </div>
  );
}
