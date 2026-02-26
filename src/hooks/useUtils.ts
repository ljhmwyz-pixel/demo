import { useEffect, useRef } from 'react'

/**
 * 自定义防抖hook
 */
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const debouncedCallback = ((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }) as T

  return debouncedCallback
}

/**
 * 自定义节流hook
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastExecTimeRef = useRef<number>(0)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const throttledCallback = ((...args: Parameters<T>) => {
    const now = Date.now()
    
    if (now - lastExecTimeRef.current >= delay) {
      callback(...args)
      lastExecTimeRef.current = now
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args)
        lastExecTimeRef.current = Date.now()
      }, delay - (now - lastExecTimeRef.current))
    }
  }) as T

  return throttledCallback
}

/**
 * 自定义首次渲染检测hook
 */
export function useIsFirstRender(): boolean {
  const isFirst = useRef(true)

  if (isFirst.current) {
    isFirst.current = false
    return true
  }

  return isFirst.current
}

/**
 * 自定义上一次值hook
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}