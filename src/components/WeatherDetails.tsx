import {
  Droplets,
  Wind,
  Gauge,
  Eye,
  Cloud,
  Thermometer,
} from "lucide-react";

import "./WeatherDetails.css";

interface WeatherDetailsProps {
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  clouds: number;
  tempMin: number;
  tempMax: number;
}

function WeatherDetails({
  humidity,
  windSpeed,
  pressure,
  visibility,
  clouds,
  tempMin,
  tempMax
}: WeatherDetailsProps) {
  return (
    <article className="weather-details">
      <h2>Weather Details</h2>

      <div className="details-grid">
        <div className="weather-detail">
          <Droplets size={20} />
          <span>Humidity</span>
          <strong>{humidity}%</strong>
        </div>

        <div className="weather-detail">
          <Wind size={20} />
          <span>Wind</span>
          <strong>{(windSpeed * (3600/1000)).toFixed(0)} km/h</strong>
        </div>

        <div className="weather-detail">
          <Gauge size={20} />
          <span>Pressure</span>
          <strong>{pressure} hPa</strong>
        </div>

        <div className="weather-detail">
          <Eye size={20} />
          <span>Visibility</span>
          <strong>{(visibility / 1000).toFixed(1)} km</strong>
        </div>

        <div className="weather-detail">
          <Cloud size={20} />
          <span>Clouds</span>
          <strong>{clouds}%</strong>
        </div>

        <div className="weather-detail">
          <Thermometer size={20} />
          <span>Min / Max</span>
          <strong>{Math.round(tempMin)}°C / {Math.round(tempMax)}°C</strong>
        </div>
      </div>
    </article>
  );
}

export default WeatherDetails;