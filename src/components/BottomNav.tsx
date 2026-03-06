import { useLocation, useNavigate } from 'react-router-dom'
import {
  IconHome2,
  IconCalendarWeek,
  IconChartBar,
  IconSettings,
} from '@tabler/icons-react'
import { useWeather } from '../hooks/useWeather'
import { getWeatherTheme } from '../utils/weatherTheme'

const tabs = [
  { path: '/',         label: 'Home',     Icon: IconHome2 },
  { path: '/forecast', label: 'Forecast', Icon: IconCalendarWeek },
  { path: '/details',  label: 'Details',  Icon: IconChartBar },
  { path: '/settings', label: 'Settings', Icon: IconSettings },
]

export function BottomNav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { data } = useWeather()
  const theme = getWeatherTheme(data.condition)

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-safe"
      style={{ background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
    >
      <div className="w-full max-w-sm flex items-center justify-around px-2 py-2">
        {tabs.map(({ path, label, Icon }) => {
          const isActive = pathname === path
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all duration-200 relative"
              style={{ minWidth: 60 }}
            >
              {isActive && (
                <span
                  className="absolute inset-0 rounded-xl"
                  style={{ background: theme.navIndicator + '33' }}
                />
              )}
              <span style={{ color: isActive ? theme.navIndicator : 'rgba(255,255,255,0.5)', display: 'flex' }}>
                <Icon size={22} />
              </span>
              <span
                className="text-xs font-medium relative z-10"
                style={{ color: isActive ? theme.navIndicator : 'rgba(255,255,255,0.5)' }}
              >
                {label}
              </span>
              {isActive && (
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full"
                  style={{ background: theme.navIndicator }}
                />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
