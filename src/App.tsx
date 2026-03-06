import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { WeatherProvider } from './context/WeatherContext'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Forecast } from './pages/Forecast'
import { Details } from './pages/Details'
import { Settings } from './pages/Settings'

import '@mantine/core/styles.css'

export default function App() {
  return (
    <MantineProvider>
      <WeatherProvider>
        <BrowserRouter future={{ v7_startTransition: true }}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/forecast" element={<Forecast />} />
              <Route path="/details" element={<Details />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </WeatherProvider>
    </MantineProvider>
  )
}
