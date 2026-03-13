import type { WeatherCondition } from '../types/weather'

export interface WeatherTheme {
  background: string
  cardOverlay: string
  accentColor: string
  textColor: string
  navIndicator: string
}

// Real sky photos from Unsplash (free, no API key required)
const bgPhotos: Record<WeatherCondition, string> = {
  Sunny:
    "url('https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=1600&q=90&auto=format&fit=crop') center/cover no-repeat",
  PartlyCloudy:
    "url('https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=1600&q=90&auto=format&fit=crop') center/cover no-repeat",
  Cloudy:
    "url('https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?w=1600&q=90&auto=format&fit=crop') center/cover no-repeat",
  Rainy:
    "url('https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=1600&q=90&auto=format&fit=crop') center/cover no-repeat",
  Stormy:
    "url('https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=1600&q=90&auto=format&fit=crop') center/cover no-repeat",
  Night:
    "url('https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=1600&q=90&auto=format&fit=crop') center/cover no-repeat",
  Foggy:
    "url('https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1600&q=90&auto=format&fit=crop') center/cover no-repeat",
  Snowy:
    "url('https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=1600&q=90&auto=format&fit=crop') center/cover no-repeat",
}

export function getWeatherTheme(condition: WeatherCondition): WeatherTheme {
  switch (condition) {
    case 'Sunny':
      return {
        background: bgPhotos.Sunny,
        cardOverlay: 'rgba(0, 0, 0, 0.25)',
        accentColor: '#f97316',
        textColor: '#fff7ed',
        navIndicator: '#f97316',
      }
    case 'PartlyCloudy':
      return {
        background: bgPhotos.PartlyCloudy,
        cardOverlay: 'rgba(0, 0, 0, 0.28)',
        accentColor: '#f59e0b',
        textColor: '#f8fafc',
        navIndicator: '#f59e0b',
      }
    case 'Cloudy':
      return {
        background: bgPhotos.Cloudy,
        cardOverlay: 'rgba(0, 0, 0, 0.30)',
        accentColor: '#94a3b8',
        textColor: '#f1f5f9',
        navIndicator: '#94a3b8',
      }
    case 'Rainy':
      return {
        background: bgPhotos.Rainy,
        cardOverlay: 'rgba(0, 0, 0, 0.35)',
        accentColor: '#3b82f6',
        textColor: '#eff6ff',
        navIndicator: '#3b82f6',
      }
    case 'Stormy':
      return {
        background: bgPhotos.Stormy,
        cardOverlay: 'rgba(0, 0, 0, 0.45)',
        accentColor: '#a855f7',
        textColor: '#faf5ff',
        navIndicator: '#a855f7',
      }
    case 'Night':
      return {
        background: bgPhotos.Night,
        cardOverlay: 'rgba(0, 0, 0, 0.40)',
        accentColor: '#6366f1',
        textColor: '#eef2ff',
        navIndicator: '#6366f1',
      }
    case 'Foggy':
      return {
        background: bgPhotos.Foggy,
        cardOverlay: 'rgba(255, 255, 255, 0.15)',
        accentColor: '#6b7280',
        textColor: '#f9fafb',
        navIndicator: '#6b7280',
      }
    case 'Snowy':
      return {
        background: bgPhotos.Snowy,
        cardOverlay: 'rgba(255, 255, 255, 0.20)',
        accentColor: '#0ea5e9',
        textColor: '#f0f9ff',
        navIndicator: '#0ea5e9',
      }
  }
}
