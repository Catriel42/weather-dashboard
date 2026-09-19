export interface City {
  name: string
  lat: number
  lon: number
  country: string
  state?: string // Optional, because some cities doesn't have 'state'
}

export interface WeatherData {
  coord: {
    lon: number
    lat: number
  }
  weather: Array<{
    //Array 'cause sometimes hace more than 1 weathers
    id: number
    main: string
    description: string
    icon: string
  }>
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level?: number
    grnd_level?: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
    gust?: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  name: string
}
