import { useState, useEffect, useCallback } from 'react'
import { WeatherData, WeatherCondition } from '../types/weather'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

function mapCondition(weatherId: number, icon: string, allowNight = true): WeatherCondition {
  const isNight = allowNight && icon.endsWith('n')
  if (isNight) return 'Night'
  if (weatherId >= 200 && weatherId < 300) return 'Stormy'
  if (weatherId >= 300 && weatherId < 600) return 'Rainy'
  if (weatherId >= 600 && weatherId < 700) return 'Snowy'
  if (weatherId >= 700 && weatherId < 800) return 'Foggy'
  if (weatherId === 800) return 'Sunny'
  if (weatherId === 801 || weatherId === 802) return 'PartlyCloudy'
  return 'Cloudy'
}

async function fetchWeatherByQuery(query: string): Promise<WeatherData> {
  const [currentRes, forecastRes] = await Promise.all([
    fetch(`${BASE_URL}/weather?${query}&appid=${API_KEY}&units=metric`),
    fetch(`${BASE_URL}/forecast?${query}&appid=${API_KEY}&units=metric`)
  ])

  if (currentRes.status === 404) throw new Error('City not found. Please check the name and try again.')
  if (!currentRes.ok) throw new Error('Failed to fetch weather data. Please try again.')

  const current = await currentRes.json()
  const forecastJson = await forecastRes.json()

  const { lat, lon } = current.coord
  const uvRes = await fetch(`${BASE_URL}/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
  const uvJson = uvRes.ok ? await uvRes.json() : { value: 0 }

  return {
    city: current.name,
    country: current.sys.country,
    temperature: Math.round(current.main.temp),
    feels_like: Math.round(current.main.feels_like),
    condition: mapCondition(current.weather[0].id, current.weather[0].icon),
    humidity: current.main.humidity,
    wind_speed: Math.round(current.wind.speed),
    uv_index: Math.round(uvJson.value ?? 0),
    pressure: current.main.pressure,
    visibility: Math.round(current.visibility / 1000),
    rain_chance: Math.round((forecastJson.list[0]?.pop ?? 0) * 100),

    hourly: forecastJson.list.slice(0, 8).map((item: any) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
      temperature: Math.round(item.main.temp),
      condition: mapCondition(item.weather[0].id, item.weather[0].icon),
      rain_chance: Math.round((item.pop ?? 0) * 100),
    })),

    forecast: Object.values(
      forecastJson.list.reduce((acc: any, item: any) => {
        const day = new Date(item.dt * 1000).toLocaleDateString('en', { weekday: 'short' })
        if (!acc[day]) acc[day] = []
        acc[day].push(item)
        return acc
      }, {})
    ).slice(0, 7).map((dayItems: any) => {
      const mid = dayItems[Math.floor(dayItems.length / 2)]
      return {
        day: new Date(mid.dt * 1000).toLocaleDateString('en', { weekday: 'short' }),
        high: Math.round(Math.max(...dayItems.map((i: any) => i.main.temp_max))),
        low: Math.round(Math.min(...dayItems.map((i: any) => i.main.temp_min))),
        condition: mapCondition(mid.weather[0].id, mid.weather[0].icon, false),
        rain_chance: Math.round(Math.max(...dayItems.map((i: any) => i.pop ?? 0)) * 100),
      }
    }),
  }
}

export function useWeatherData() {
  const [data, setData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchByGeolocation = useCallback(() => {
    setLoading(true)
    setError(null)
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const { latitude: lat, longitude: lon } = coords
          const shaped = await fetchWeatherByQuery(`lat=${lat}&lon=${lon}`)
          setData(shaped)
        } catch (err: any) {
          setError(err.message ?? 'Failed to fetch weather data. Please try again.')
        } finally {
          setLoading(false)
        }
      },
      () => {
        setError('Location access denied — please enable location to get local weather.')
        setLoading(false)
      }
    )
  }, [])

  const fetchByCity = useCallback(async (cityName: string): Promise<string | null> => {
    setLoading(true)
    setError(null)
    try {
      const shaped = await fetchWeatherByQuery(`q=${encodeURIComponent(cityName)}`)
      setData(shaped)
      return null
    } catch (err: any) {
      const msg = err.message ?? 'Failed to fetch weather data. Please try again.'
      setError(msg)
      return msg
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchByGeolocation()
  }, [fetchByGeolocation])

  return { data, loading, error, fetchByCity, fetchByGeolocation }
}
