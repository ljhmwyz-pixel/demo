import React, { useRef, useState, useContext, useEffect, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/hooks/useTheme'
import { useLocale } from '@/hooks/useLocale'
import { useAppSelector, useAppDispatch } from '@/store'
import { cn } from '@/utils'
import styles from './index.module.css'
import type { BasePageProps } from '@/types'

interface HomePageProps extends BasePageProps {}

const HomePage: React.FC<HomePageProps> = ({ className, style }) => {
  // refs
  const pageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // state
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  
  // context
  // 如果有context在这里使用

  // Redux/store hooks
  const dispatch = useAppDispatch()
  const { themeMode, toggleThemeMode } = useTheme()
  const { t, changeLanguage, currentLanguage } = useLocale()
  const localeState = useAppSelector((state) => state.locale)

  // 其他 hooks (自定义 hooks)
  // 可以添加更多自定义hooks

  // useMemo、useCallback、useEffect
  const pageTitle = useMemo(() => {
    return t('welcome')
  }, [t])

  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])

  const handleDecrement = useCallback(() => {
    setCount(prev => prev - 1)
  }, [])

  const handleThemeToggle = useCallback(() => {
    toggleThemeMode()
  }, [toggleThemeMode])

  const handleLanguageSwitch = useCallback((lang: string) => {
    changeLanguage(lang)
  }, [changeLanguage])

  useEffect(() => {
    // 页面加载后的副作用
    console.log('HomePage mounted')
    
    return () => {
      console.log('HomePage unmounted')
    }
  }, [])

  // 普通辅助函数
  const getCounterStatus = (): string => {
    if (count > 0) return 'positive'
    if (count < 0) return 'negative'
    return 'zero'
  }

  // 事件处理函数
  const handleClickCounter = () => {
    setIsLoading(true)
    setTimeout(() => {
      handleIncrement()
      setIsLoading(false)
    }, 500)
  }

  const handleResetCounter = () => {
    setCount(0)
  }

  // render 逻辑
  const renderCounter = () => (
    <div className={styles.counter}>
      <h2>计数器示例</h2>
      <div className={styles.counterDisplay}>
        <span className={cn(
          styles.count,
          count > 0 && styles.positive,
          count < 0 && styles.negative
        )}>
          {count}
        </span>
      </div>
      <div className={styles.counterControls}>
        <button 
          onClick={handleClickCounter}
          disabled={isLoading}
          className={styles.btn}
        >
          {isLoading ? '加载中...' : '增加'}
        </button>
        <button 
          onClick={handleDecrement}
          className={styles.btn}
        >
          减少
        </button>
        <button 
          onClick={handleResetCounter}
          className={styles.btn}
        >
          重置
        </button>
      </div>
    </div>
  )

  const renderThemeSection = () => (
    <div className={styles.section}>
      <h2>{t('theme.switch')}</h2>
      <p>当前主题: {themeMode === 'light' ? t('theme.light') : t('theme.dark')}</p>
      <button 
        onClick={handleThemeToggle}
        className={styles.btn}
      >
        切换主题
      </button>
    </div>
  )

  const renderLanguageSection = () => (
    <div className={styles.section}>
      <h2>{t('language.switch')}</h2>
      <p>当前语言: {currentLanguage}</p>
      <div className={styles.languageButtons}>
        <button 
          onClick={() => handleLanguageSwitch('zh-CN')}
          className={cn(styles.btn, currentLanguage === 'zh-CN' && styles.active)}
        >
          中文
        </button>
        <button 
          onClick={() => handleLanguageSwitch('en-US')}
          className={cn(styles.btn, currentLanguage === 'en-US' && styles.active)}
        >
          English
        </button>
      </div>
      {localeState.loading && (
        <p className={styles.loadingText}>语言包加载中...</p>
      )}
    </div>
  )

  // return JSX
  return (
    <div 
      ref={pageRef} 
      className={cn(styles.page, className)}
      style={style}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>{pageTitle}</h1>
        <p className={styles.subtitle}>这是一个演示页面，展示了框架的核心功能</p>
      </div>

      <div ref={contentRef} className={styles.content}>
        {renderCounter()}
        {renderThemeSection()}
        {renderLanguageSection()}
      </div>
    </div>
  )
}

export default HomePage