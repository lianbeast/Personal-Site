import { useCallback, useEffect, useRef, useState } from 'react'

export type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'ok'; data: T }
  | { status: 'error'; error: string }

export function useAsync<T>(fn: () => Promise<T>, deps: unknown[]) {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading' })
  const mounted = useRef(true)

  const run = useCallback(() => {
    setState({ status: 'loading' })
    fn()
      .then((data) => mounted.current && setState({ status: 'ok', data }))
      .catch((e) => mounted.current && setState({ status: 'error', error: String(e) }))
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    mounted.current = true
    run()
    return () => { mounted.current = false }
  }, [run])

  return { state, refresh: run }
}
