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
const REVERSE = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

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

async function fetchForecast(lat: number, lon: number, city: string): Promise<Weather> {
  // temperature_unit / wind_speed_unit give us Imperial units directly.
  const fRes = await fetch(
    `${FORECAST}?latitude=${lat}&longitude=${lon}` +
      '&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m' +
      '&temperature_unit=fahrenheit&wind_speed_unit=mph',
  )
  if (!fRes.ok) throw new Error(`weather service error (${fRes.status})`)
  const f = await fRes.json()
  const c = f.current
  const meta = WMO[c.weather_code] ?? { label: 'Unknown', icon: '🌡️' }

  return {
    city,
    temperature: Math.round(c.temperature_2m),
    humidity: c.relative_humidity_2m,
    wind: Math.round(c.wind_speed_10m),
    code: c.weather_code,
    description: meta.label,
    icon: meta.icon,
  }
}

/** Weather for a named city (geocode → forecast). */
export async function getWeatherByCity(city: string): Promise<Weather> {
  const geoRes = await fetch(`${GEO}?name=${encodeURIComponent(city)}&count=1`)
  const geo = await geoRes.json()
  const place = geo.results?.[0]
  if (!place) throw new Error(`Could not find city: ${city}`)
  return fetchForecast(place.latitude, place.longitude, place.name)
}

/** Weather for raw coordinates (reverse-geocodes a friendly city name). */
export async function getWeatherByCoords(lat: number, lon: number): Promise<Weather> {
  let city = 'Your location'
  try {
    const res = await fetch(`${REVERSE}?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
    if (res.ok) {
      const d = await res.json()
      city = d.city || d.locality || d.principalSubdivision || city
    }
  } catch {
    // keep the generic label
  }
  return fetchForecast(lat, lon, city)
}

/** Autodetect via the Geolocation API; falls back to the configured city. */
export async function getWeatherAuto(fallbackCity: string): Promise<Weather> {
  if (navigator.geolocation) {
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 8000,
          maximumAge: 10 * 60 * 1000,
        })
      })
      return await getWeatherByCoords(pos.coords.latitude, pos.coords.longitude)
    } catch {
      // permission denied, timeout, or unavailable → use the configured city
    }
  }
  return getWeatherByCity(fallbackCity)
}
