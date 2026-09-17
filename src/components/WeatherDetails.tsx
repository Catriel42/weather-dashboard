import {
  Droplets,
  Wind,
  Gauge,
  Eye,
  Cloud,
  Thermometer,
} from "lucide-react";

import "./WeatherDetails.css";

function WeatherDetails() {
  return (
    <article className="weather-details">
      <h2>Weather Details</h2>

      <div className="details-grid">
        <div className="weather-detail">
          <Droplets size={20} />
          <span>Humidity</span>
          <strong>94%</strong>
        </div>

        <div className="weather-detail">
          <Wind size={20} />
          <span>Wind</span>
          <strong>1.54 m/s</strong>
        </div>

        <div className="weather-detail">
          <Gauge size={20} />
          <span>Pressure</span>
          <strong>1017 hPa</strong>
        </div>

        <div className="weather-detail">
          <Eye size={20} />
          <span>Visibility</span>
          <strong>10 km</strong>
        </div>

        <div className="weather-detail">
          <Cloud size={20} />
          <span>Clouds</span>
          <strong>75%</strong>
        </div>

        <div className="weather-detail">
          <Thermometer size={20} />
          <span>Min / Max</span>
          <strong>22° / 26°</strong>
        </div>
      </div>
    </article>
  );
}

export default WeatherDetails;