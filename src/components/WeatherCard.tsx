import { getWeather, type Weather } from '../lib/weather'
import { site } from '../config'
import { useAsync } from '../hooks/useAsync'
import { HoloCard } from './HoloCard'

export function WeatherCard({ onFocus }: { onFocus: (w: Weather) => void }) {
  const { state, refresh } = useAsync(() => getWeather(site.city), [site.city])

  return (
    <HoloCard
      icon="🌤️"
      title="Weather"
      state={state}
      onRefresh={refresh}
      onFocus={state.status === 'ok' ? () => onFocus(state.data) : undefined}
    >
      {state.status === 'ok' && (
        <div>
          <div className="flex items-end justify-between">
            <div>
              <div className="font-display text-4xl font-bold text-white holo-glow">{state.data.temperature}°</div>
              <div className="mt-1 text-xs text-cyan-200/80">
                {state.data.description} · {state.data.city}
              </div>
            </div>
            <div className="text-5xl">{state.data.icon}</div>
          </div>
          <div className="mt-3 flex gap-4 text-[11px] text-cyan-200/70">
            <span>💧 {state.data.humidity}%</span>
            <span>🌬 {state.data.wind} km/h</span>
          </div>
        </div>
      )}
    </HoloCard>
  )
}
