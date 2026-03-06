import type React from 'react'
import { Tooltip } from '@mantine/core'
import {
  IconDroplet,
  IconWind,
  IconSun,
  IconGauge,
  IconEye,
  IconThermometer,
} from '@tabler/icons-react'
import { useWeather } from '../hooks/useWeather'
import { getWeatherTheme } from '../utils/weatherTheme'

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string
  progress?: number
  cardOverlay: string
  hint?: string
}

function StatCard({ icon, label, value, progress, cardOverlay, hint }: Readonly<StatCardProps>) {
  return (
    <Tooltip label={hint ?? label} withArrow disabled={!hint}>
      <div
        className="flex flex-col gap-2.5 p-4 rounded-2xl overflow-hidden"
        style={{
          background: cardOverlay,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(255,255,255,0.18)',
          cursor: hint ? 'help' : 'default',
        }}
      >
        <div className="flex items-center gap-1.5 opacity-75" style={{ paddingLeft: '12px' }}>
          {icon}
          <span className="text-xs font-semibold uppercase tracking-wider opacity-80 truncate">
            {label}
          </span>
        </div>
        <span className="text-xl font-bold truncate" style={{ paddingLeft: '12px' }}>{value}</span>
        {progress !== undefined && (
          <div className="h-1.5 rounded-full overflow-hidden" style={{ width: '85%', marginLeft: '12px', background: 'rgba(255,255,255,0.2)' }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${Math.min(progress, 100)}%`, background: 'rgba(255,255,255,0.75)' }}
            />
          </div>
        )}
      </div>
    </Tooltip>
  )
}

export function Details() {
  const { data, unit, convertTemp } = useWeather()
  const theme = getWeatherTheme(data.condition)
  const ov = theme.cardOverlay

  const stats: StatCardProps[] = [
    {
      icon: <IconDroplet size={20} />,
      label: 'Humidity',
      value: `${data.humidity}%`,
      progress: data.humidity,
      cardOverlay: ov,
      hint: 'Relative humidity percentage',
    },
    {
      icon: <IconWind size={20} />,
      label: 'Wind Speed',
      value: `${data.wind_speed} km/h`,
      progress: Math.min(data.wind_speed, 100),
      cardOverlay: ov,
      hint: 'Wind speed in km/h',
    },
    {
      icon: <IconSun size={20} />,
      label: 'UV Index',
      value: `${data.uv_index}`,
      progress: (data.uv_index / 11) * 100,
      cardOverlay: ov,
      hint: 'UV Index 0–11 scale',
    },
    {
      icon: <IconGauge size={20} />,
      label: 'Pressure',
      value: `${data.pressure} hPa`,
      cardOverlay: ov,
      hint: 'Atmospheric pressure in hectopascals',
    },
    {
      icon: <IconEye size={20} />,
      label: 'Visibility',
      value: `${data.visibility} km`,
      progress: (data.visibility / 20) * 100,
      cardOverlay: ov,
      hint: 'Visibility distance in km',
    },
    {
      icon: <IconThermometer size={20} />,
      label: 'Feels Like',
      value: `${convertTemp(data.feels_like)}${unit}`,
      cardOverlay: ov,
      hint: 'Apparent temperature',
    },
  ]

  return (
    <div className="flex flex-col gap-6" style={{ padding: '56px 16px 24px' }}>
      <h1 className="text-2xl font-bold tracking-tight">Details</h1>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  )
}
