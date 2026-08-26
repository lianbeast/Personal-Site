import { getWeatherAuto, type Weather } from '../lib/weather'
import { site } from '../config'
import { useAsync } from '../hooks/useAsync'
import { HoloCard } from './HoloCard'

export function WeatherCard({ onFocus }: { onFocus: (w: Weather) => void }) {
  const { state, refresh } = useAsync(() => getWeatherAuto(site.city), [site.city])

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
              <div className="font-display text-3xl sm:text-4xl font-bold text-white holo-glow">{state.data.temperature}°</div>
              <div className="mt-0.5 text-[11px] sm:text-xs text-cyan-200/80">
                {state.data.description} · {state.data.city}
              </div>
            </div>
            <div className="text-4xl sm:text-5xl">{state.data.icon}</div>
          </div>
          <div className="mt-2 flex gap-3 text-[10px] sm:text-[11px] text-cyan-200/70">
            <span>💧 {state.data.humidity}%</span>
            <span>🌬 {state.data.wind} mph</span>
          </div>
        </div>
      )}
    </HoloCard>
  )
}
