import type { City } from "../types/weather";
import "./ResultCard.css";

interface ResultCardProps {
  city: City;
  onSelect: (city: City) => void;
}

export const ResultCard = ({ city, onSelect }: ResultCardProps) => {
  return (
    <button 
      type="button"
      className="result-card" 
      onClick={() => onSelect(city)}
    >
      <strong>{city.name}</strong>
      <span>
        {city.state ? `${city.state}, ` : ""}{city.country}
      </span>
    </button>
  );
}

