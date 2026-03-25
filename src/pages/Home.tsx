import { Badge } from '@mantine/core'
import {
  IconDroplet,
  IconWind,
  IconThermometer,
  IconMapPin,
  IconCloudRain,
} from '@tabler/icons-react'
import { useWeather } from '../hooks/useWeather'
import { getWeatherTheme } from '../utils/weatherTheme'
import { WeatherIcon } from '../components/WeatherIcon'

export function Home() {
  const { data, unit, convertTemp } = useWeather()
  const theme = getWeatherTheme(data.condition)

  const quickStats = [
    { icon: <IconThermometer size={28} style={{ opacity: 0.75 }} />, label: 'Feels Like', value: `${convertTemp(data.feels_like)}${unit}`, border: false },
    { icon: <IconDroplet size={28} style={{ opacity: 0.75 }} />,     label: 'Humidity',   value: `${data.humidity}%`,                       border: true  },
    { icon: <IconWind size={28} style={{ opacity: 0.75 }} />,        label: 'Wind',       value: `${data.wind_speed} km/h`,                 border: false },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, position: 'relative', padding: '20px 16px 24px' }}>
      {/* City & date */}
      <div className="flex items-center gap-2 mb-1">
        <IconMapPin size={16} style={{ opacity: 0.8 }} />
        <span className="text-base font-semibold tracking-wide opacity-90">
          {data.city}, {data.country}
        </span>
      </div>
      <p className="text-sm opacity-60 mb-8">
        {new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        })}
      </p>

      {/* Hero temperature */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, justifyContent: 'center', gap: '16px', minHeight: 0 }}>
        <div style={{ position: 'relative', display: 'inline-flex' }}>
          <WeatherIcon condition={data.condition} size={96} className="opacity-90 drop-shadow-lg" />
          {data.rain_chance > 0 && (
            <div style={{
              position: 'absolute',
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              background: 'rgba(0,0,0,0.35)',
              backdropFilter: 'blur(8px)',
              borderRadius: 99,
              padding: '2px 8px',
              whiteSpace: 'nowrap',
            }}>
              <IconCloudRain size={12} style={{ opacity: 0.85 }} />
              <span style={{ fontSize: 12, fontWeight: 600 }}>{data.rain_chance}%</span>
            </div>
          )}
        </div>
        <div className="flex items-start leading-none">
          <span
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-4px',
              textShadow: '0 4px 30px rgba(0,0,0,0.2)',
            }}
          >
            {convertTemp(data.temperature)}
          </span>
          <span
            style={{
              fontSize: 36,
              fontWeight: 600,
              marginTop: 14,
              opacity: 0.8,
            }}
          >
            {unit}
          </span>
        </div>

        <Badge
          size="lg"
          radius="xl"
          style={{
            background: theme.cardOverlay,
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.25)',
            color: 'inherit',
            fontSize: 14,
            padding: '6px 16px',
            textTransform: 'none',
            fontWeight: 600,
            marginBottom: '24px',
          }}
        >
          {data.condition}
        </Badge>
      </div>

      {/* Quick stats strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          background: theme.cardOverlay,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: '16px',
          padding: '20px 12px',
          gap: '8px',
          margin: '0 8px 0 8px',
        }}
      >
        {quickStats.map((stat) => (
          <div
            key={stat.label}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
              ...(stat.border ? { borderLeft: '1px solid rgba(255,255,255,0.15)', borderRight: '1px solid rgba(255,255,255,0.15)' } : {}),
            }}
          >
            {stat.icon}
            <span style={{ fontSize: 16, opacity: 0.6, color: 'black' }}>{stat.label}</span>
            <span style={{ fontSize: 16, fontWeight: 700, }}>{stat.value}</span>
          </div>
        ))}
      </div>


    </div>
  )
}
