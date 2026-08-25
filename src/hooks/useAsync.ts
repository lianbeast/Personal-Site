import { useCallback, useEffect, useRef, useState } from 'react'

export type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'ok'; data: T }

/** Tiny data-fetching hook with loading/error/ok states and a refresh() trigger. */
export function useAsync<T>(fn: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading' })
  const [tick, setTick] = useState(0)
  const fnRef = useRef(fn)
  fnRef.current = fn

  useEffect(() => {
    let alive = true
    setState({ status: 'loading' })
    fnRef
      .current()
      .then((data) => alive && setState({ status: 'ok', data }))
      .catch((e: unknown) => {
        if (alive) setState({ status: 'error', error: e instanceof Error ? e.message : String(e) })
      })
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick])

  const refresh = useCallback(() => setTick((t) => t + 1), [])
  return { state, refresh }
}
