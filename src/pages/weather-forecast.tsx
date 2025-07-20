import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Cloud, Sun, CloudRain, Wind, Thermometer } from "lucide-react";
import AdBanner from "@/components/AdBanner";

export default function WeatherForecastPage() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getWeather = () => {
    if (!city) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      // Mock weather data
      const conditions = ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain", "Clear"];
      const icons = [Sun, Cloud, CloudRain, Wind];
      
      const mockForecast = {
        city: city,
        current: {
          temp: Math.floor(Math.random() * 30) + 5,
          condition: conditions[Math.floor(Math.random() * conditions.length)],
          humidity: Math.floor(Math.random() * 40) + 30,
          windSpeed: Math.floor(Math.random() * 20) + 5,
          icon: icons[Math.floor(Math.random() * icons.length)]
        },
        forecast: Array.from({ length: 5 }, (_, i) => ({
          day: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
          high: Math.floor(Math.random() * 25) + 10,
          low: Math.floor(Math.random() * 15) + 5,
          condition: conditions[Math.floor(Math.random() * conditions.length)],
          icon: icons[Math.floor(Math.random() * icons.length)]
        }))
      };
      
      setForecast(mockForecast);
      setIsLoading(false);
    }, 1500);
  };

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
              <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center border border-cyan-100">
                <Cloud className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Weather Forecast</h1>
                <p className="text-sm text-muted-foreground">Check weather for your destination</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mobile-spacing py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Get Weather Forecast</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
              <Input
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && getWeather()}
              />
              <Button 
                onClick={getWeather}
                disabled={!city || isLoading}
                size="lg"
              >
                {isLoading ? "Loading..." : "Get Weather"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Weather */}
        {forecast && (
          <>
            <Card className="mt-6">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{forecast.city}</h3>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <forecast.current.icon className="w-12 h-12 text-primary" />
                    <div className="text-4xl font-bold">{forecast.current.temp}°C</div>
                  </div>
                  <div className="text-lg text-muted-foreground mb-4">{forecast.current.condition}</div>
                  
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Humidity</div>
                      <div className="font-semibold">{forecast.current.humidity}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Wind Speed</div>
                      <div className="font-semibold">{forecast.current.windSpeed} km/h</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 5-Day Forecast */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>5-Day Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-4">
                  {forecast.forecast.map((day: any, index: number) => (
                    <div key={index} className="text-center">
                      <div className="font-medium mb-2">{day.day}</div>
                      <day.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                      <div className="text-sm">
                        <div className="font-semibold">{day.high}°</div>
                        <div className="text-muted-foreground">{day.low}°</div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{day.condition}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        <AdBanner slot="weather-bottom" format="rectangle" className="mt-6" />
      </div>
    </div>
  );
}