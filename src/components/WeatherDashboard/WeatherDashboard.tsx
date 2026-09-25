import { useState } from 'react'
import { Loader2, AlertCircle } from 'lucide-react'
import { searchCities, getWeatherUrl } from '../../services/weatherService'
import { useFetch } from '../../hooks'
import type { City, WeatherData } from '../../types/weather'

import { CurrentWeatherCard } from '../CurrentWeatherCard'
import { LocationCard } from '../LocationCard'
import { SunTimesCard } from '../SunTimesCard'
import { WeatherDetails } from '../WeatherDetails'
import { SearchBar } from '../SearchBar'
import { ResultCard } from '../ResultCard'
import { EmptyState } from '../EmptyState'
import './WeatherDashboard.css'

export const WeatherDashboard = () => {
  const [searchResults, setSearchResults] = useState<City[]>([])
  const [selectedLocation, setSelectedLocation] = useState<City | null>(null)

  const weatherUrl = selectedLocation
    ? getWeatherUrl(selectedLocation.lat, selectedLocation.lon)
    : null

  const {
    data: weatherData,
    isLoading,
    error,
  } = useFetch<WeatherData>(weatherUrl)

  const handleSearch = async (query: string) => {
    if (!query.trim()) return
    const results = await searchCities(query)
    setSearchResults(results)
  }

  const handleCitySelect = (city: City) => {
    setSelectedLocation(city)
    setSearchResults([])
  }

  return (
    <main className="weather-dashboard">
      <header className="dashboard-header">
        <div className="search-container">
          <SearchBar onSearch={handleSearch} />

          {searchResults.length > 0 && (
            <div className="search-results-dropdown">
              {searchResults.map((city, index) => (
                <ResultCard
                  key={`${city.lat}-${city.lon}-${index}`}
                  city={city}
                  onSelect={handleCitySelect}
                />
              ))}
            </div>
          )}
        </div>
      </header>

      {isLoading ? (
        <div className="dashboard-status-box">
          <Loader2 className="dashboard-spinner" size={40} />
          <p>Loading weather data...</p>
        </div>
      ) : error ? (
        <div className="dashboard-status-box error">
          <AlertCircle size={40} />
          <p>{error}</p>
        </div>
      ) : !weatherData ? (
        <EmptyState />
      ) : (
        <section className="weather-grid">
          <CurrentWeatherCard
            temp={weatherData.main.temp}
            condition={weatherData.weather[0].main}
            feelsLike={weatherData.main.feels_like}
          />

          <LocationCard
            name={selectedLocation?.name || weatherData.name}
            country={selectedLocation?.country || weatherData.sys.country}
            lat={weatherData.coord.lat}
            lon={weatherData.coord.lon}
          />

          <SunTimesCard
            sunriseTime={weatherData.sys.sunrise}
            sunsetTime={weatherData.sys.sunset}
            timezoneOffset={weatherData.timezone}
          />

          <WeatherDetails
            humidity={weatherData.main.humidity}
            windSpeed={weatherData.wind.speed}
            pressure={weatherData.main.pressure}
            visibility={weatherData.visibility}
            clouds={weatherData.clouds.all}
            tempMin={weatherData.main.temp_min}
            tempMax={weatherData.main.temp_max}
          />
        </section>
      )}
    </main>
  )
}
