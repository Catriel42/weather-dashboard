import { CloudRain, Thermometer } from "lucide-react";
import "./CurrentWeatherCard.css";

function CurrentWeatherCard() {
  return (
    <article className="current-weather-card">
      <div className="current-weather-header">
        <span>Current Weather</span>
        <CloudRain />
      </div>

      <div className="current-weather-main">
        <strong>25.5°C</strong>
        <span>Rain</span>
      </div>

      <div className="feels-like">
        <Thermometer size={18} />
        <span>Feels like 25.7°C</span>
      </div>
    </article>
  );
}

export default CurrentWeatherCard;
