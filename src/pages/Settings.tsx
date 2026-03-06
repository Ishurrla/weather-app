import { useState } from 'react'
import { Switch, Badge } from '@mantine/core'
import { IconMapPin, IconInfoCircle, IconCurrentLocation } from '@tabler/icons-react'
import { useWeather } from '../hooks/useWeather'
import { getWeatherTheme } from '../utils/weatherTheme'

export function Settings() {
  const { unit, setUnit, city, setCity, data, fetchByCity, resetToCurrentLocation } = useWeather()
  const theme = getWeatherTheme(data.condition)
  const [cityInput, setCityInput] = useState(city)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  async function handleCitySubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = cityInput.trim()
    if (!trimmed) return
    const err = await fetchByCity(trimmed)
    if (err) {
      setFeedback({ type: 'error', message: err })
    } else {
      setCity(trimmed)
      setFeedback({ type: 'success', message: `Weather updated for ${trimmed}` })
    }
  }

  function handleResetLocation() {
    setFeedback(null)
    resetToCurrentLocation()
  }

  const cardStyle = {
    background: theme.cardOverlay,
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    border: '1px solid rgba(255,255,255,0.18)',
  }

  return (
    <div className="flex flex-col gap-5" style={{ padding: '56px 16px 24px' }}>
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>

      {/* Temperature unit */}
      <div className="rounded-2xl p-5 flex items-center justify-between overflow-hidden" style={cardStyle}>
        <div className="flex-1 min-w-0 mr-2" style={{ paddingLeft: '12px' }}>
          <p className="font-semibold text-sm">Temperature Unit</p>
          <p className="text-xs opacity-60 mt-0.5">Switch between Celsius and Fahrenheit</p>
        </div>
        <div className="flex items-center gap-2 shrink-0" style={{ paddingRight: '12px' }}>
          <span className="text-sm font-medium opacity-70">°C</span>
          <Switch
            checked={unit === '°F'}
            onChange={(e) => setUnit(e.currentTarget.checked ? '°F' : '°C')}
            size="md"
            styles={{
              track: {
                background: unit === '°F' ? theme.accentColor : 'rgba(255,255,255,0.25)',
                borderColor: 'transparent',
                cursor: 'pointer',
              },
              thumb: { borderColor: 'transparent' },
            }}
          />
          <span className="text-sm font-medium opacity-70">°F</span>
        </div>
      </div>

      {/* Default city */}
      <div className="rounded-2xl p-5 flex flex-col gap-3 overflow-hidden" style={cardStyle}>
        <div className="flex items-center gap-2" style={{ paddingLeft: '12px' }}>
          <IconMapPin size={18} style={{ opacity: 0.75 }} />
          <p className="font-semibold text-sm">Default City</p>
        </div>
        <form onSubmit={handleCitySubmit} className="flex gap-2" style={{ width: '90%', paddingLeft: '12px' }}>
          <input
            value={cityInput}
            onChange={(e) => { setCityInput(e.target.value); setFeedback(null) }}
            placeholder="Enter city name"
            className="flex-1 min-w-0 rounded-xl px-3 py-2 text-sm font-medium outline-none"
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.25)',
              color: 'inherit',
            }}
          />
          <button
            type="submit"
            className="rounded-full px-6 py-3 text-sm font-semibold shrink-0 transition-opacity hover:opacity-80"
            style={{
              background: theme.accentColor,
              color: '#fff',
            }}
          >
            Set
          </button>
        </form>
        {feedback && (
          <p
            className="text-xs"
            style={{
              paddingLeft: '12px',
              color: feedback.type === 'error' ? '#ff6b6b' : 'inherit',
              opacity: feedback.type === 'success' ? 0.8 : 1,
            }}
          >
            {feedback.message}
          </p>
        )}
        <p className="text-xs opacity-50" style={{ paddingLeft: '12px' }}>
          Currently showing: <strong>{data.city}</strong>
        </p>
        <button
          onClick={handleResetLocation}
          className="flex items-center gap-2 text-xs font-semibold transition-opacity hover:opacity-80"
          style={{ paddingLeft: '12px', color: theme.accentColor }}
        >
          <IconCurrentLocation size={14} />
          Use My Current Location
        </button>
      </div>

      {/* Weather theme preview */}
      <div className="rounded-2xl p-5 flex flex-col gap-3 overflow-hidden" style={cardStyle}>
        <p className="font-semibold text-sm" style={{ paddingLeft: '12px' }}>Current Theme</p>
        <div className="flex items-center gap-2 flex-wrap" style={{ paddingLeft: '12px' }}>
          {(['Sunny','PartlyCloudy','Cloudy','Rainy','Stormy','Night','Foggy','Snowy'] as const).map((c) => (
            <Badge
              key={c}
              size="sm"
              radius="xl"
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: 'inherit',
                border: '1px solid rgba(255,255,255,0.2)',
                textTransform: 'none',
                fontWeight: c === data.condition ? 700 : 400,
                opacity: c === data.condition ? 1 : 0.55,
              }}
            >
              {c}
            </Badge>
          ))}
        </div>
      </div>

      {/* App info */}
      <div
        className="rounded-2xl p-5 flex flex-col gap-2 mt-auto overflow-hidden"
        style={{ ...cardStyle, opacity: 0.8 }}
      >
        <div className="flex items-center gap-2" style={{ paddingLeft: '12px' }}>
          <IconInfoCircle size={16} style={{ opacity: 0.7 }} />
          <span className="text-xs font-semibold uppercase tracking-wider opacity-70">
            App Info
          </span>
        </div>
        <p className="text-xs opacity-60 leading-relaxed" style={{ paddingLeft: '12px' }}>
          Weather Forecast App — v1.0.0
        </p>
        <p className="text-xs opacity-50 leading-relaxed" style={{ paddingLeft: '12px' }}>
          {/* Built with React 18, TypeScript, Tailwind CSS v4, Mantine UI v7, and Vite.
          All data is mocked for demonstration purposes.*/}
        </p>
      </div>
    </div>
  )
}
