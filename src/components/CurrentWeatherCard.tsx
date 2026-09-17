import { CloudRain, Thermometer } from "lucide-react";
import "./CurrentWeatherCard.css";

interface CurrentWeatherCardProps {
  temp: number;
  condition: string;
  feelsLike: number;
}

function CurrentWeatherCard({ temp, condition, feelsLike }: CurrentWeatherCardProps) {
  return (
    <article className="current-weather-card">
      <div className="current-weather-header">
        <span>Current Weather</span>
        <CloudRain />
      </div>

      <div className="current-weather-main">
        <strong>{Math.round(temp)}°C</strong>
        <span>{condition}</span>
      </div>

      <div className="feels-like">
        <Thermometer size={18} />
        <span>Feels like {Math.round(feelsLike)}°C</span>
      </div>
    </article>
  );
}

export default CurrentWeatherCard;
