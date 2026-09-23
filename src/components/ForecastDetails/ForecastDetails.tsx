import { useState, useEffect } from 'react'
import { useParams, useLocation, useSearchParams, Link } from 'react-router-dom'
import { ArrowLeft, CloudSun, Loader2, AlertCircle } from 'lucide-react'
import { getForecast, searchCities } from '../../services/weatherService'
import type { ForecastItem } from '../../types/weather'
import { ForecastCard } from '../ForecastCard'
import './ForecastDetails.css'

export const ForecastDetails = () => {
  const { city } = useParams<{ city: string }>()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const [forecastList, setForecastList] = useState<ForecastItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchForecastData = async () => {
      setLoading(true)
      setError(null)

      try {
        let lat =
          location.state?.lat ??
          (searchParams.get('lat') ? Number(searchParams.get('lat')) : null)
        let lon =
          location.state?.lon ??
          (searchParams.get('lon') ? Number(searchParams.get('lon')) : null)

        if (lat === null || lon === null) {
          if (!city) throw new Error('No city specified')
          const cities = await searchCities(city)
          if (!cities || cities.length === 0) {
            throw new Error(`Could not find coordinates for "${city}"`)
          }
          lat = cities[0].lat
          lon = cities[0].lon
        }

        const data = await getForecast(lat, lon)
        setForecastList(data)
      } catch (err) {
        console.error(err)
        setError(
          err instanceof Error
            ? err.message
            : 'Error while fetching forecast data',
        )
      } finally {
        setLoading(false)
      }
    }

    fetchForecastData()
  }, [city, location.state, searchParams])

  return (
    <main className="forecast-details">
      <Link to="/" className="forecast-back-btn">
        <ArrowLeft size={18} />
        <span>Go to dashboard</span>
      </Link>

      <header className="forecast-details-header">
        <div className="forecast-title-group">
          <CloudSun size={32} className="forecast-header-icon" />
          <div>
            <h1 className="forecast-city-title">{city}</h1>
            <p className="forecast-subtitle">
              Five-Days Pronostic
            </p>
          </div>
        </div>
      </header>

      {loading && (
        <div className="forecast-status-box">
          <Loader2 size={32} className="forecast-spinner" />
          <p>Loading pronostic...</p>
        </div>
      )}

      {error && !loading && (
        <div className="forecast-status-box error">
          <AlertCircle size={32} />
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && forecastList.length === 0 && (
        <div className="forecast-status-box">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && forecastList.length > 0 && (
        <section className="forecast-cards-grid" aria-label="5-Day Forecast">
          {forecastList.map((item, index) => (
            <ForecastCard key={item.dt} item={item} index={index} />
          ))}
        </section>
      )}
    </main>
  )
}
