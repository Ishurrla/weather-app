import { WeatherIcon } from './WeatherIcon'
import type { HourlyForecast } from '../types/weather'
import { useWeather } from '../hooks/useWeather'

interface HourlyCardProps {
  item: HourlyForecast
  cardOverlay: string
}

export function HourlyCard({ item, cardOverlay }: HourlyCardProps) {
  const { convertTemp, unit } = useWeather()

  return (
    <div
      className="flex flex-col items-center gap-2 px-6 py-3 rounded-2xl min-w-24 shrink-0"
      style={{
        background: cardOverlay,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.18)',
      }}
    >
      <span className="text-xs font-medium opacity-80">{item.time}</span>
      <WeatherIcon condition={item.condition} size={22} />
      <span className="text-sm font-semibold">
        {convertTemp(item.temperature)}{unit}
      </span>
    </div>
  )
}
