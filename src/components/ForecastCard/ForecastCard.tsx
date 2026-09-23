import type { ForecastItem } from '../../types/weather'
import { Droplets, Wind } from 'lucide-react'
import { formatForecastDay } from '../../utils/date'
import './ForecastCard.css'

interface ForecastCardProps {
  item: ForecastItem
  index: number
}

export const ForecastCard = ({ item, index }: ForecastCardProps) => {
  const dayName = formatForecastDay(item.dt_txt, index)
  const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
  const rainProbability = Math.round(item.pop * 100)

  return (
    <article className="forecast-card-item">
      <h3 className="forecast-day-name">{dayName}</h3>
      <span className="forecast-day-condition">{item.weather[0].main}</span>

      <div className="forecast-icon-wrapper">
        <img
          src={iconUrl}
          alt={item.weather[0].description}
          width={64}
          height={64}
          loading="lazy"
        />
      </div>

      <div className="forecast-temp-box">
        <strong className="forecast-temp">
          {Math.round(item.main.temp)}°C
        </strong>
        <span className="forecast-feels">
          Feels like {Math.round(item.main.feels_like)}°
        </span>
      </div>

      <div className="forecast-metrics">
        <div className="metric" title="Probability of precipitation">
          <Droplets size={14} />
          <span>{rainProbability}%</span>
        </div>
        <div className="metric" title="Wind speed">
          <Wind size={14} />
          <span>{Math.round(item.wind.speed)} m/s</span>
        </div>
      </div>
    </article>
  )
}
