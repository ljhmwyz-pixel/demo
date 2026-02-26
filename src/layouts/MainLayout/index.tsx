import React, { useRef, useState, useContext, useEffect, useMemo, useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'
import { useLocale } from '@/hooks/useLocale'
import { useAppSelector } from '@/store'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import styles from './index.module.css'

interface MainLayoutProps {
  children?: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = () => {
  // refs
  const layoutRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLElement>(null)

  // state
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  
  // context
  // 如果有context在这里使用

  // Redux/store hooks
  const { themeMode } = useTheme()
  const { currentLanguage, loading: localeLoading } = useLocale()
  const localeState = useAppSelector((state) => state.locale)

  // 其他 hooks (自定义 hooks)
  // 可以添加更多自定义hooks

  // useMemo、useCallback、useEffect
  const layoutClasses = useMemo(() => {
    return `${styles.layout} ${styles[`theme-${themeMode}`]}`
  }, [themeMode])

  const handleToggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev)
  }, [])

  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false)
  }, [])

  useEffect(() => {
    // 模拟加载完成
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  // 普通辅助函数
  const renderLoading = () => (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
      <p>加载中...</p>
    </div>
  )

  // 事件处理函数
  const handleLanguageChange = (lang: string) => {
    // 语言切换逻辑已在useLocale中处理
  }

  const handleThemeToggle = () => {
    // 主题切换逻辑已在useTheme中处理
  }

  // render 逻辑
  if (loading || localeLoading) {
    return renderLoading()
  }

  // return JSX
  return (
    <div ref={layoutRef} className={layoutClasses}>
      <Header 
        onToggleSidebar={handleToggleSidebar}
        onLanguageChange={handleLanguageChange}
        onThemeToggle={handleThemeToggle}
      />
      
      <div className={styles.container}>
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={handleCloseSidebar}
        />
        
        <main ref={mainRef} className={styles.main}>
          <Outlet />
        </main>
      </div>
      
      <Footer />
    </div>
  )
}

export default MainLayout