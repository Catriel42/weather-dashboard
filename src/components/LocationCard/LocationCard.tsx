import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()

  const handleNavigateToForecast = () => {
    navigate(`/forecast/${encodeURIComponent(name)}?lat=${lat}&lon=${lon}`, {
      state: { lat, lon, name, country },
    })
  }

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

      <button
        type="button"
        onClick={handleNavigateToForecast}
        className="forecast-link"
      >
        <span>See extend pronostic</span>
        <ArrowRight size={16} />
      </button>
    </article>
  )
}
