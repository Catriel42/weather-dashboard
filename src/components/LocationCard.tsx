import { MapPin } from "lucide-react";
import "./LocationCard.css";

function LocationCard() {
  return (
    <article className="location-card">
      <div className="location-header">
        <MapPin size={20} />
        <span>Location</span>
      </div>

      <div className="location-content">
        <h2>Cochabamba</h2>
        <p>Bolivia</p>
      </div>

      <div className="coordinates">
        <div>
          <span>Latitude</span>
          <strong>-17.4012°</strong>
        </div>

        <div>
          <span>Longitude</span>
          <strong>-66.1676°</strong>
        </div>
      </div>
    </article>
  );
}

export default LocationCard;