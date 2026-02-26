import React, { useRef, useState, useContext, useEffect, useMemo, useCallback } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { useLocale } from '@/hooks/useLocale'
import { cn } from '@/utils'
import styles from './Footer.module.css'

interface FooterProps {
  className?: string
  style?: React.CSSProperties
}

const Footer: React.FC<FooterProps> = ({ className, style }) => {
  // refs
  const footerRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // state
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const [isVisible, setIsVisible] = useState(true)
  
  // context
  // 如果有context在这里使用

  // Redux/store hooks
  const { themeMode } = useTheme()
  const { currentLanguage } = useLocale()

  // 其他 hooks (自定义 hooks)
  // 可以添加更多自定义hooks

  // useMemo、useCallback、useEffect
  const footerClasses = useMemo(() => {
    return cn(
      styles.footer,
      !isVisible && styles.hidden,
      className
    )
  }, [isVisible, className])

  const formattedTime = useMemo(() => {
    return currentTime.toLocaleString(currentLanguage, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }, [currentTime, currentLanguage])

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    
    // 当接近页面底部时隐藏footer
    const threshold = 100
    setIsVisible(documentHeight - scrollY - windowHeight > threshold)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      clearInterval(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  // 普通辅助函数
  const getCurrentYear = (): number => {
    return new Date().getFullYear()
  }

  // 事件处理函数
  const handleBackToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  // render 逻辑
  const renderCopyright = () => (
    <div className={styles.copyright}>
      <p>© {getCurrentYear()} VibeCoding Framework. All rights reserved.</p>
    </div>
  )

  const renderInfo = () => (
    <div className={styles.info}>
      <div className={styles.status}>
        <span className={styles.statusItem}>
          主题: {themeMode}
        </span>
        <span className={styles.statusItem}>
          语言: {currentLanguage}
        </span>
        <span className={styles.statusItem}>
          时间: {formattedTime}
        </span>
      </div>
    </div>
  )

  const renderActions = () => (
    <div className={styles.actions}>
      <button 
        onClick={handleBackToTop}
        className={styles.backToTop}
        aria-label="Back to top"
      >
        ↑ Top
      </button>
    </div>
  )

  // return JSX
  return (
    <footer 
      ref={footerRef} 
      className={footerClasses}
      style={style}
    >
      <div ref={containerRef} className={styles.container}>
        {renderCopyright()}
        {renderInfo()}
        {renderActions()}
      </div>
    </footer>
  )
}

export default Footer