import { generateId, formatDate } from '@/utils'
import type { CounterState } from './dto'

/**
 * 初始化计数器状态
 */
export function initializeCounter(): CounterState {
  return {
    value: 0,
    status: 'idle'
  }
}

/**
 * 验证计数器值
 */
export function validateCounterValue(value: number): boolean {
  return Number.isInteger(value) && value >= -1000 && value <= 1000
}

/**
 * 格式化计数器显示
 */
export function formatCounterValue(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`
  }
  return value.toString()
}

/**
 * 生成操作日志
 */
export function generateOperationLog(operation: string, value: number): string {
  const timestamp = formatDate(new Date(), 'HH:mm:ss')
  return `[${timestamp}] ${operation}: ${value}`
}

/**
 * 计算计数器统计信息
 */
export function calculateCounterStats(values: number[]): {
  sum: number
  average: number
  min: number
  max: number
} {
  if (values.length === 0) {
    return { sum: 0, average: 0, min: 0, max: 0 }
  }
  
  const sum = values.reduce((acc, val) => acc + val, 0)
  const average = sum / values.length
  const min = Math.min(...values)
  const max = Math.max(...values)
  
  return { sum, average, min, max }
}