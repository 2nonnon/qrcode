import { useEffect, useRef, useState } from 'react'

export function useBoundState(initialValue: any, { event = 'input' } = {}) {
  const stateRef = useRef<HTMLInputElement | null>(null)
  const [stateName, setState] = useState(initialValue)

  useEffect(() => {
    function callback(e: Event) {
      setState((e.target! as any).value)
    }

    stateRef.current?.addEventListener(event, callback)

    return () => {
      stateRef.current?.removeEventListener(event, callback)
    }
  })

  useEffect(() => {
    if (!stateRef.current)
      return

    stateRef.current.value = stateName
  }, [stateName])

  return [stateName, stateRef, setState]
}
