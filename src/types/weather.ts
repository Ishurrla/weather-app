export type WeatherCondition =
  | 'Sunny'
  | 'PartlyCloudy'
  | 'Cloudy'
  | 'Rainy'
  | 'Stormy'
  | 'Foggy'
  | 'Snowy'
  | 'Night'

export interface HourlyForecast {
  time: string
  temperature: number
  condition: WeatherCondition
  rain_chance: number
}

export interface DailyForecast {
  day: string
  high: number
  low: number
  condition: WeatherCondition
  rain_chance: number
}

export interface WeatherData {
  city: string
  country: string
  temperature: number
  feels_like: number
  condition: WeatherCondition
  humidity: number
  wind_speed: number
  uv_index: number
  pressure: number
  visibility: number
  rain_chance: number
  hourly: HourlyForecast[]
  forecast: DailyForecast[]
}
