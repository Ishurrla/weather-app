import type { WeatherCondition } from '../types/weather'

export interface WeatherTheme {
  gradient: string
  cardOverlay: string
  accentColor: string
  textColor: string
  navIndicator: string
}

export function getWeatherTheme(condition: WeatherCondition): WeatherTheme {
  switch (condition) {
    case 'Sunny':
      return {
        gradient: 'linear-gradient(135deg, #f97316 0%, #f59e0b 40%, #fbbf24 100%)',
        cardOverlay: 'rgba(255, 255, 255, 0.12)',
        accentColor: '#f97316',
        textColor: '#fff7ed',
        navIndicator: '#f97316',
      }
    case 'PartlyCloudy':
      return {
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #94a3b8 55%, #cbd5e1 100%)',
        cardOverlay: 'rgba(255, 255, 255, 0.13)',
        accentColor: '#f59e0b',
        textColor: '#f8fafc',
        navIndicator: '#f59e0b',
      }
    case 'Cloudy':
      return {
        gradient: 'linear-gradient(135deg, #64748b 0%, #94a3b8 50%, #cbd5e1 100%)',
        cardOverlay: 'rgba(255, 255, 255, 0.10)',
        accentColor: '#64748b',
        textColor: '#f1f5f9',
        navIndicator: '#94a3b8',
      }
    case 'Rainy':
      return {
        gradient: 'linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 50%, #3b82f6 100%)',
        cardOverlay: 'rgba(255, 255, 255, 0.08)',
        accentColor: '#3b82f6',
        textColor: '#eff6ff',
        navIndicator: '#3b82f6',
      }
    case 'Stormy':
      return {
        gradient: 'linear-gradient(135deg, #1c1033 0%, #3b0764 40%, #4a044e 100%)',
        cardOverlay: 'rgba(255, 255, 255, 0.07)',
        accentColor: '#a855f7',
        textColor: '#faf5ff',
        navIndicator: '#a855f7',
      }
    case 'Night':
      return {
        gradient: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
        cardOverlay: 'rgba(255, 255, 255, 0.08)',
        accentColor: '#6366f1',
        textColor: '#eef2ff',
        navIndicator: '#6366f1',
      }
    case 'Foggy':
      return {
        gradient: 'linear-gradient(135deg, #9ca3af 0%, #d1d5db 50%, #f3f4f6 100%)',
        cardOverlay: 'rgba(255, 255, 255, 0.20)',
        accentColor: '#6b7280',
        textColor: '#1f2937',
        navIndicator: '#6b7280',
      }
    case 'Snowy':
      return {
        gradient: 'linear-gradient(135deg, #bae6fd 0%, #e0f2fe 50%, #f0f9ff 100%)',
        cardOverlay: 'rgba(255, 255, 255, 0.25)',
        accentColor: '#0ea5e9',
        textColor: '#0c4a6e',
        navIndicator: '#0ea5e9',
      }
  }
}
