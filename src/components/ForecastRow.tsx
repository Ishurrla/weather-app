import { WeatherIcon } from './WeatherIcon'
import type { DailyForecast } from '../types/weather'
import { useWeather } from '../hooks/useWeather'

interface ForecastRowProps {
  item: DailyForecast
  cardOverlay: string
}

export function ForecastRow({ item, cardOverlay }: Readonly<ForecastRowProps>) {
  const { convertTemp, unit } = useWeather()

  return (
    <div
      className="grid items-center px-5 py-3.5 rounded-2xl"
      style={{
        gridTemplateColumns: '3.5rem 3rem 1fr',
        gap: '1rem',
        background: cardOverlay,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.18)',
      }}
    >
      <span className="w-12 font-semibold text-sm text-center shrink-0">{item.day}</span>
      <div className="flex justify-center">
        <WeatherIcon condition={item.condition} size={22} />
      </div>
      <div className="flex items-center justify-center gap-3 text-sm font-medium">
        <span className="opacity-60">{convertTemp(item.low)}{unit}</span>
        <div
          className="h-1.5 w-16 rounded-full overflow-hidden shrink-0"
          style={{ background: 'rgba(255,255,255,0.2)' }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${Math.round(((item.high - item.low) / 20) * 100)}%`,
              background: 'rgba(255,255,255,0.7)',
            }}
          />
        </div>
        <span>{convertTemp(item.high)}{unit}</span>
      </div>
    </div>
  )
}
