import { Outlet } from 'react-router-dom'
import { Loader } from '@mantine/core'
import { BottomNav } from './BottomNav'
import { useWeather } from '../hooks/useWeather'
import { getWeatherTheme } from '../utils/weatherTheme'

export function Layout() {
  const { data, loading, error } = useWeather()

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center"
        style={{ background: '#0f0f0f', color: '#fff' }}>
        <div className="flex flex-col items-center gap-4">
          <Loader color="white" size="md" />
          <p style={{ fontSize: 14, opacity: 0.7 }}>Fetching your location...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center"
        style={{ background: '#0f0f0f', color: '#fff' }}>
        <p style={{ fontSize: 14, opacity: 0.7, textAlign: 'center', padding: '0 24px' }}>{error}</p>
      </div>
    )
  }

  const theme = getWeatherTheme(data.condition)

  return (
    <div
      className="min-h-screen w-full flex justify-center"
      style={{
        background: theme.background,
        color: theme.textColor,
        transition: 'background 0.8s ease',
        fontFamily: "'Outfit', sans-serif",
        position: 'relative',
      }}
    >
      {/* Subtle dark scrim so text stays readable over any photo */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.18)', pointerEvents: 'none', zIndex: 0 }} />
      <div
        style={{ width: '100%', maxWidth: 384, minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}
      >
        <main style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', paddingBottom: 80 }}>
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
