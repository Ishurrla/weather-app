import React, { createContext, useContext, useState } from 'react'
import type { WeatherData } from '../types/weather'
import { useWeatherData } from '../hooks/useWeatherData'

type Unit = '°C' | '°F'

interface WeatherContextValue {
  data: WeatherData
  unit: Unit
  setUnit: (unit: Unit) => void
  convertTemp: (temp: number) => number
  city: string
  setCity: (city: string) => void
  loading: boolean
  error: string | null
  fetchByCity: (cityName: string) => Promise<string | null>
  resetToCurrentLocation: () => void
}

const WeatherContext = createContext<WeatherContextValue | null>(null)

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [unit, setUnit] = useState<Unit>('°C')
  const [city, setCity] = useState('')
  const { data, loading, error, fetchByCity, fetchByGeolocation } = useWeatherData()

  function convertTemp(temp: number): number {
    if (unit === '°F') {
      return Math.round((temp * 9) / 5 + 32)
    }
    return temp
  }

  return (
    <WeatherContext.Provider
      value={{
        data: data ?? ({} as WeatherData),
        unit,
        setUnit,
        convertTemp,
        city: data?.city ?? city,
        setCity,
        loading,
        error,
        fetchByCity,
        resetToCurrentLocation: fetchByGeolocation,
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}

export function useWeatherContext(): WeatherContextValue {
  const ctx = useContext(WeatherContext)
  if (!ctx) throw new Error('useWeatherContext must be used inside WeatherProvider')
  return ctx
}
