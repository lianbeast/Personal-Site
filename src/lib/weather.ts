export interface Weather {
  city: string
  temperature: number
  humidity: number
  wind: number
  code: number
  description: string
  icon: string
}

const GEO = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST = 'https://api.open-meteo.com/v1/forecast'

const WMO: Record<number, { label: string; icon: string }> = {
  0: { label: 'Clear sky', icon: '☀️' },
  1: { label: 'Mainly clear', icon: '🌤️' },
  2: { label: 'Partly cloudy', icon: '⛅' },
  3: { label: 'Overcast', icon: '☁️' },
  45: { label: 'Fog', icon: '🌫️' },
  48: { label: 'Rime fog', icon: '🌫️' },
  51: { label: 'Light drizzle', icon: '🌦️' },
  53: { label: 'Drizzle', icon: '🌦️' },
  55: { label: 'Dense drizzle', icon: '🌧️' },
  61: { label: 'Light rain', icon: '🌦️' },
  63: { label: 'Rain', icon: '🌧️' },
  65: { label: 'Heavy rain', icon: '🌧️' },
  71: { label: 'Light snow', icon: '🌨️' },
  73: { label: 'Snow', icon: '🌨️' },
  75: { label: 'Heavy snow', icon: '❄️' },
  80: { label: 'Light showers', icon: '🌦️' },
  81: { label: 'Showers', icon: '🌧️' },
  82: { label: 'Violent showers', icon: '⛈️' },
  95: { label: 'Thunderstorm', icon: '⛈️' },
  96: { label: 'Thunderstorm + hail', icon: '⛈️' },
  99: { label: 'Severe thunderstorm', icon: '⛈️' },
}

export async function getWeather(city: string): Promise<Weather> {
  const geoRes = await fetch(`${GEO}?name=${encodeURIComponent(city)}&count=1`)
  const geo = await geoRes.json()
  const place = geo.results?.[0]
  if (!place) throw new Error(`Could not find city: ${city}`)

  const fRes = await fetch(
    `${FORECAST}?latitude=${place.latitude}&longitude=${place.longitude}` +
      '&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
  )
  const f = await fRes.json()
  const c = f.current
  const meta = WMO[c.weather_code] ?? { label: 'Unknown', icon: '🌡️' }

  return {
    city: place.name,
    temperature: Math.round(c.temperature_2m),
    humidity: c.relative_humidity_2m,
    wind: Math.round(c.wind_speed_10m),
    code: c.weather_code,
    description: meta.label,
    icon: meta.icon,
  }
}
