import { useRef, useState } from 'react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useWeather } from '../hooks/useWeather'
import { getWeatherTheme } from '../utils/weatherTheme'
import { HourlyCard } from '../components/HourlyCard'
import { ForecastRow } from '../components/ForecastRow'

export function Forecast() {
  const { data } = useWeather()
  const theme = getWeatherTheme(data.condition)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' })
  }

  const onScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }

  return (
    <div className="flex flex-col gap-6 overflow-x-hidden" style={{ padding: '56px 16px 96px' }}>
      <h1 className="text-2xl font-bold tracking-tight">Forecast</h1>

      {/* Hourly strip */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h2 className="text-sm font-semibold opacity-70 uppercase tracking-wider">
            Hourly
          </h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 28, height: 28, borderRadius: '50%',
                background: canScrollLeft ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(8px)',
                border: 'none', cursor: canScrollLeft ? 'pointer' : 'default',
                opacity: canScrollLeft ? 1 : 0.35,
                transition: 'opacity 0.2s',
              }}>
              <IconChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 28, height: 28, borderRadius: '50%',
                background: canScrollRight ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(8px)',
                border: 'none', cursor: canScrollRight ? 'pointer' : 'default',
                opacity: canScrollRight ? 1 : 0.35,
                transition: 'opacity 0.2s',
              }}>
              <IconChevronRight size={16} />
            </button>
          </div>
        </div>
        <div ref={scrollRef} onScroll={onScroll}
          className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {data.hourly.map((item, i) => (
            <HourlyCard key={i} item={item} cardOverlay={theme.cardOverlay} />
          ))}
        </div>
      </section>

      {/* 7-day forecast */}
      <section>
        <h2 className="text-sm font-semibold opacity-70 uppercase tracking-wider mb-3">
          5-Day Forecast
        </h2>
        <div className="flex flex-col gap-2.5 justify-center">
          {data.forecast.map((item, i) => (
            <ForecastRow key={i} item={item} cardOverlay={theme.cardOverlay} />
          ))}
        </div>
      </section>
    </div>
  )
}
