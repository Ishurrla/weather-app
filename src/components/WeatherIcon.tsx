import {
  IconSun,
  IconCloud,
  IconCloudFilled,
  IconCloudRain,
  IconCloudStorm,
  IconMist,
  IconSnowflake,
  IconMoon,
} from '@tabler/icons-react'
import type { WeatherCondition } from '../types/weather'

interface WeatherIconProps {
  condition: WeatherCondition
  size?: number
  className?: string
}

export function WeatherIcon({ condition, size = 24, className }: Readonly<WeatherIconProps>) {
  const props = { size, className }

  switch (condition) {
    case 'Sunny':
      return <IconSun {...props} />
    case 'PartlyCloudy':
      return (
        <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size }}>
          <IconSun size={Math.round(size * 0.7)} style={{ position: 'absolute', top: 0, right: 0, opacity: 0.9 }} />
          <IconCloudFilled size={Math.round(size * 0.8)} style={{ position: 'absolute', bottom: 0, left: 0 }} />
        </span>
      )
    case 'Cloudy':
      return <IconCloud {...props} />
    case 'Rainy':
      return <IconCloudRain {...props} />
    case 'Stormy':
      return <IconCloudStorm {...props} />
    case 'Foggy':
      return <IconMist {...props} />
    case 'Snowy':
      return <IconSnowflake {...props} />
    case 'Night':
      return <IconMoon {...props} />
  }
}
