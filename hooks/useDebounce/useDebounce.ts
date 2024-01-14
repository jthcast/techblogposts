import { useEffect, useRef, useState } from 'react'

interface UseDebounceProps {
  value: string
  delay?: number
}

export function useDebounce({ value, delay = 500 }: UseDebounceProps) {
  const [debouncedValue, setDebouncedValue] = useState('')
  const [isDebouncing, setIsDebouncing] = useState(false)
  const timerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    setIsDebouncing(true)
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value)
      setIsDebouncing(false)
    }, delay)

    return () => {
      clearTimeout(timerRef.current)
      setIsDebouncing(false)
    }
  }, [value, delay])

  return { value: debouncedValue, isDebouncing }
}
