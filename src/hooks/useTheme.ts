import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/store'
import { setTheme, toggleTheme } from '@/store/themeSlice'

/**
 * 主题管理hook
 */
export function useTheme() {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector((state) => state.theme.mode)

  // 初始化主题
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-mode') as 'light' | 'dark' | null
    if (savedTheme) {
      dispatch(setTheme(savedTheme))
    } else {
      // 检测系统主题偏好
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      dispatch(setTheme(prefersDark ? 'dark' : 'light'))
    }
  }, [dispatch])

  // 应用主题到DOM
  useEffect(() => {
    const root = document.documentElement
    if (themeMode === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [themeMode])

  const setThemeMode = (mode: 'light' | 'dark') => {
    dispatch(setTheme(mode))
  }

  const toggleThemeMode = () => {
    dispatch(toggleTheme())
  }

  return {
    themeMode,
    setThemeMode,
    toggleThemeMode,
  }
}