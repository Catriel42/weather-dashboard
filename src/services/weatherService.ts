import type {
  City,
  WeatherData,
  ForecastItem,
  ForecastResponse,
} from '../types/weather'

const API_KEY = '54763932f62e7948dce4e505f2d36571'
const BASE_URL_GEO = 'https://api.openweathermap.org/geo/1.0'
const BASE_URL_WEATHER = 'https://api.openweathermap.org/data/2.5'

export const getWeatherUrl = (lat: number, lon: number): string => {
  return `${BASE_URL_WEATHER}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
}

export const getForecastUrl = (lat: number, lon: number): string => {
  return `${BASE_URL_WEATHER}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
}

export const searchCities = async (query: string): Promise<City[]> => {
  try {
    const response = await fetch(
      `${BASE_URL_GEO}/direct?q=${query}&limit=5&appid=${API_KEY}`,
    )

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data: City[] = await response.json()
    return data
  } catch (error) {
    console.error('Problem during fetch:', error)
    return []
  }
}

export const getCurrentWeather = async (
  lat: number,
  lon: number,
): Promise<WeatherData | null> => {
  try {
    const response = await fetch(
      `${BASE_URL_WEATHER}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
    )

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data: WeatherData = await response.json()
    return data
  } catch (error) {
    console.error('Error during fetch:', error)
    return null
  }
}

export const getForecast = async (
  lat: number,
  lon: number,
): Promise<ForecastItem[]> => {
  try {
    const response = await fetch(
      `${BASE_URL_WEATHER}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
    )

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const data: ForecastResponse = await response.json()

    // Filter 40 reports, only have 18:00:00
    const filteredForecast: ForecastItem[] = data.list.filter(
      (item: ForecastItem) => item.dt_txt.includes('18:00:00'),
    )

    return filteredForecast
  } catch (error) {
    console.error('Error fetching forecast:', error)
    return []
  }
}
