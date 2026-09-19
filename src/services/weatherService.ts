const API_KEY = '54763932f62e7948dce4e505f2d36571'
const BASE_URL_GEO = 'https://api.openweathermap.org/geo/1.0'
const BASE_URL_WEATHER = 'https://api.openweathermap.org/data/2.5'

export const searchCities = async (query: string) => {
  try {
    const response = await fetch(
      `${BASE_URL_GEO}/direct?q=${query}&limit=5&appid=${API_KEY}`,
    )

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Problem during fetch:', error)
    return []
  }
}

export const getCurrentWeather = async (lat: number, lon: number) => {
  try {
    const response = await fetch(
      `${BASE_URL_WEATHER}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
    )

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error during fetch:', error)
    return null
  }
}
