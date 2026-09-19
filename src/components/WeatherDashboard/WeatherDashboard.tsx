import { useState, useEffect } from 'react'
import { searchCities, getCurrentWeather } from '../../services/weatherService'
import type { City, WeatherData } from '../../types/weather'

import { CurrentWeatherCard } from '../CurrentWeatherCard'
import { LocationCard } from '../LocationCard'
import { SunTimesCard } from '../SunTimesCard'
import { WeatherDetails } from '../WeatherDetails'
import { SearchBar } from '../SearchBar'
import { ThemeToggle } from '../ThemeToggle'
import { ResultCard } from '../ResultCard'
import { EmptyState } from '../EmptyState'
import './WeatherDashboard.css'

export const WeatherDashboard = () => {
  const [searchResults, setSearchResults] = useState<City[]>([])
  const [selectedLocation, setSelectedLocation] = useState<City | null>(null)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

  useEffect(() => {
    if (!selectedLocation) return

    const fetchWeather = async () => {
      const data = await getCurrentWeather(
        selectedLocation.lat,
        selectedLocation.lon,
      )
      setWeatherData(data)
    }

    fetchWeather()
  }, [selectedLocation])

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
        <ThemeToggle />
      </header>

      {!weatherData ? (
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
