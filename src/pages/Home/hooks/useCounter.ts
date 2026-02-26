import { useState, useCallback, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/store'
import { useDebounce } from '@/hooks/useUtils'
import type { CounterState } from './dto'

/**
 * 计数器管理hook
 */
export function useCounter(initialValue = 0) {
  const [counter, setCounter] = useState<CounterState>({
    value: initialValue,
    status: 'idle'
  })

  const increment = useCallback((amount = 1) => {
    setCounter(prev => ({
      ...prev,
      value: prev.value + amount
    }))
  }, [])

  const decrement = useCallback((amount = 1) => {
    setCounter(prev => ({
      ...prev,
      value: prev.value - amount
    }))
  }, [])

  const reset = useCallback(() => {
    setCounter({
      value: initialValue,
      status: 'idle'
    })
  }, [initialValue])

  const setValue = useCallback((value: number) => {
    setCounter(prev => ({
      ...prev,
      value
    }))
  }, [])

  return {
    counter,
    increment,
    decrement,
    reset,
    setValue
  }
}

/**
 * 性能优化hook
 */
export function useCounterPerformance() {
  const [operations, setOperations] = useState<string[]>([])
  
  // 防抖的日志记录
  const debouncedLog = useDebounce((log: string) => {
    setOperations(prev => [...prev.slice(-9), log])
  }, 1000)

  const addOperation = useCallback((operation: string) => {
    debouncedLog(operation)
  }, [debouncedLog])

  return {
    operations,
    addOperation
  }
}

/**
 * 数据持久化hook
 */
export function useCounterPersistence(key: string) {
  const [isInitialized, setIsInitialized] = useState(false)

  // 从localStorage恢复数据
  useEffect(() => {
    const saved = localStorage.getItem(key)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setIsInitialized(true)
        return parsed
      } catch (error) {
        console.warn('Failed to parse saved counter data:', error)
      }
    }
    setIsInitialized(true)
  }, [key])

  // 保存数据到localStorage
  const saveToStorage = useCallback((value: number) => {
    try {
      localStorage.setItem(key, JSON.stringify({ value, timestamp: Date.now() }))
    } catch (error) {
      console.warn('Failed to save counter data:', error)
    }
  }, [key])

  return {
    isInitialized,
    saveToStorage
  }
}