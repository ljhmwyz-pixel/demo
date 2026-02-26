import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector, useAppDispatch } from '@/store'
import { switchLanguage, setLanguage } from '@/store/localeSlice'

/**
 * 国际化管理hook
 */
export function useLocale() {
  const { t, i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const { language, loading } = useAppSelector((state) => state.locale)

  // 初始化语言
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'zh-CN'
    dispatch(setLanguage(savedLanguage))
  }, [dispatch])

  // 切换语言
  const changeLanguage = (lng: string) => {
    dispatch(switchLanguage(lng))
  }

  // 获取当前语言
  const currentLanguage = i18n.language

  return {
    t,
    currentLanguage,
    changeLanguage,
    loading,
  }
}