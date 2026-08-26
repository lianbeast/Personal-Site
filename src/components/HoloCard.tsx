import type { ReactNode } from 'react'
import type { AsyncState } from '../hooks/useAsync'

interface HoloCardProps {
  icon: string
  title: string
  state: AsyncState<unknown>
  onRefresh?: () => void
  onFocus?: () => void
  children: ReactNode
}

export function HoloCard({ icon, title, state, onRefresh, onFocus, children }: HoloCardProps) {
  const ok = state.status === 'ok'
  return (
    <div className="scanlines relative w-[240px] sm:w-[280px] rounded-xl border border-cyan-400/30 bg-slate-950/80 p-3 sm:p-4 backdrop-blur-md panel-glow">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <h3 className="font-display text-[10px] font-bold tracking-[0.2em] text-cyan-300 uppercase">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          {ok && (
            <button
              onClick={onRefresh}
              title="Refresh"
              className="text-[12px] text-cyan-500 transition hover:text-cyan-200"
            >
              ↻
            </button>
          )}
          {ok && onFocus && (
            <button
              onClick={onFocus}
              title="Expand"
              className="text-[12px] text-cyan-500 transition hover:text-cyan-200"
            >
              ⤢
            </button>
          )}
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              state.status === 'ok'
                ? 'bg-emerald-400 pulse-dot'
                : state.status === 'error'
                  ? 'bg-rose-500'
                  : 'bg-amber-400 pulse-dot'
            }`}
          />
        </div>
      </div>

      {state.status === 'loading' && (
        <div className="py-6 text-center text-sm text-cyan-200/70">acquiring feed…</div>
      )}

      {state.status === 'error' && (
        <div className="py-4 text-center">
          <p className="text-xs text-rose-300/90">⚠ signal lost — {state.error}</p>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="mt-2 rounded border border-cyan-400/40 px-3 py-1 text-[11px] text-cyan-300 transition hover:bg-cyan-400/10"
            >
              retry
            </button>
          )}
        </div>
      )}

      {ok && children}
    </div>
  )
}
