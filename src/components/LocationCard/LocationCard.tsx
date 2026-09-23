import { Link } from 'react-router-dom'
import { MapPin, ArrowRight } from 'lucide-react'
import './LocationCard.css'

interface LocationCardProps {
  name: string
  country: string
  lat: number
  lon: number
}

export const LocationCard = ({
  name,
  country,
  lat,
  lon,
}: LocationCardProps) => {
  return (
    <article className="location-card">
      <div className="location-header">
        <MapPin size={20} />
        <span>Location</span>
      </div>

      <div className="location-content">
        <h2>{name}</h2>
        <p>{country}</p>
      </div>

      <div className="coordinates">
        <div>
          <span>Latitude</span>
          <strong>{lat.toFixed(4)}°</strong>
        </div>

        <div>
          <span>Longitude</span>
          <strong>{lon.toFixed(4)}°</strong>
        </div>
      </div>

      <Link to={`/forecast/${encodeURIComponent(name)}`} className="forecast-link">
        <span>Ver pronóstico extendido</span>
        <ArrowRight size={16} />
      </Link>
    </article>
  )
}
