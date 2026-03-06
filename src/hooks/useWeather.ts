import { useWeatherContext } from '../context/WeatherContext'

export function useWeather() {
  return useWeatherContext()
}
