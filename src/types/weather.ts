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

export interface ForecastItem {
  dt: number
  dt_txt: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level?: number
    grnd_level?: number
    temp_kf?: number
    dew_point?: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  clouds: {
    all: number
  }
  wind: {
    speed: number
    deg: number
    gust?: number
  }
  visibility: number
  pop: number
  rain?: {
    '3h'?: number
  }
  sys: {
    pod: string
  }
}

export interface ForecastResponse {
  cod: string
  message: number | string
  cnt: number
  list: ForecastItem[]
  city: {
    id: number
    name: string
    coord: {
      lat: number
      lon: number
    }
    country: string
    population?: number
    timezone: number
    sunrise: number
    sunset: number
  }
}
