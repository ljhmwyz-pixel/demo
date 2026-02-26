import React, { useRef, useState, useContext, useEffect, useMemo, useCallback } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { useLocale } from '@/hooks/useLocale'
import { cn } from '@/utils'
import styles from './Header.module.css'

interface HeaderProps {
  onToggleSidebar?: () => void
  onLanguageChange?: (lang: string) => void
  onThemeToggle?: () => void
  className?: string
}

const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  onLanguageChange,
  onThemeToggle,
  className
}) => {
  // refs
  const headerRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLDivElement>(null)

  // state
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // context
  // 如果有context在这里使用

  // Redux/store hooks
  const { themeMode, toggleThemeMode } = useTheme()
  const { currentLanguage, changeLanguage } = useLocale()

  // 其他 hooks (自定义 hooks)
  // 可以添加更多自定义hooks

  // useMemo、useCallback、useEffect
  const headerClasses = useMemo(() => {
    return cn(
      styles.header,
      isScrolled && styles.scrolled,
      className
    )
  }, [isScrolled, className])

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10)
  }, [])

  const handleMobileMenuToggle = useCallback(() => {
    setMobileMenuOpen(prev => !prev)
  }, [])

  const handleLanguageSwitch = useCallback((lang: string) => {
    changeLanguage(lang)
    onLanguageChange?.(lang)
    setMobileMenuOpen(false)
  }, [changeLanguage, onLanguageChange])

  const handleThemeClick = useCallback(() => {
    toggleThemeMode()
    onThemeToggle?.()
  }, [toggleThemeMode, onThemeToggle])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // 普通辅助函数
  const getThemeIcon = () => {
    return themeMode === 'light' ? '🌙' : '☀️'
  }

  // 事件处理函数
  const handleSidebarToggle = () => {
    onToggleSidebar?.()
    setMobileMenuOpen(false)
  }

  // render 逻辑
  const renderNavigation = () => (
    <nav ref={navRef} className={styles.nav}>
      <div className={styles.navLeft}>
        <button 
          onClick={handleSidebarToggle}
          className={styles.menuButton}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        <h1 className={styles.logo}>VibeCoding</h1>
      </div>
      
      <div className={cn(styles.navRight, mobileMenuOpen && styles.mobileOpen)}>
        <div className={styles.controls}>
          <div className={styles.languageSelector}>
            <button
              onClick={() => handleLanguageSwitch('zh-CN')}
              className={cn(
                styles.langBtn,
                currentLanguage === 'zh-CN' && styles.active
              )}
            >
              中文
            </button>
            <button
              onClick={() => handleLanguageSwitch('en-US')}
              className={cn(
                styles.langBtn,
                currentLanguage === 'en-US' && styles.active
              )}
            >
              EN
            </button>
          </div>
          
          <button
            onClick={handleThemeClick}
            className={styles.themeButton}
            aria-label="Toggle theme"
          >
            {getThemeIcon()}
          </button>
        </div>
      </div>
      
      <button
        onClick={handleMobileMenuToggle}
        className={styles.mobileMenuButton}
        aria-label="Toggle mobile menu"
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>
    </nav>
  )

  // return JSX
  return (
    <header ref={headerRef} className={headerClasses}>
      {renderNavigation()}
    </header>
  )
}

export default Header