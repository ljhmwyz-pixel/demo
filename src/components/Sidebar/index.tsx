import React, { useRef, useState, useContext, useEffect, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils'
import styles from './Sidebar.module.css'

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
  className?: string
}

interface MenuItem {
  id: string
  title: string
  path: string
  icon?: string
  children?: MenuItem[]
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen = false,
  onClose,
  className
}) => {
  // refs
  const sidebarRef = useRef<aside>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // state
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const [activePath, setActivePath] = useState('/')
  
  // context
  // 如果有context在这里使用

  // Redux/store hooks
  // 可以添加Redux相关hooks

  // 其他 hooks (自定义 hooks)
  // 可以添加更多自定义hooks

  // useMemo、useCallback、useEffect
  const sidebarClasses = useMemo(() => {
    return cn(
      styles.sidebar,
      isOpen && styles.open,
      className
    )
  }, [isOpen, className])

  const menuItems: MenuItem[] = useMemo(() => [
    {
      id: 'dashboard',
      title: '仪表板',
      path: '/',
      icon: '📊'
    },
    {
      id: 'components',
      title: '组件库',
      path: '/components',
      icon: '🧩',
      children: [
        { id: 'button', title: '按钮', path: '/components/button' },
        { id: 'form', title: '表单', path: '/components/form' },
        { id: 'table', title: '表格', path: '/components/table' }
      ]
    },
    {
      id: 'settings',
      title: '设置',
      path: '/settings',
      icon: '⚙️'
    }
  ], [])

  const handleItemClick = useCallback((item: MenuItem) => {
    if (item.children) {
      setExpandedItems(prev => ({
        ...prev,
        [item.id]: !prev[item.id]
      }))
    } else {
      setActivePath(item.path)
      onClose?.()
    }
  }, [onClose])

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose?.()
    }
  }, [onClose])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        onClose?.()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  // 普通辅助函数
  const isItemActive = (path: string): boolean => {
    return activePath === path
  }

  const isItemExpanded = (itemId: string): boolean => {
    return !!expandedItems[itemId]
  }

  // 事件处理函数
  const handleLinkClick = (path: string) => {
    setActivePath(path)
    onClose?.()
  }

  // render 逻辑
  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isActive = isItemActive(item.path)
    const isExpanded = isItemExpanded(item.id)
    
    return (
      <div key={item.id} className={styles.menuItemWrapper}>
        <div
          className={cn(
            styles.menuItem,
            isActive && styles.active,
            hasChildren && styles.hasChildren,
            level > 0 && styles.subItem
          )}
          onClick={() => handleItemClick(item)}
          style={{ paddingLeft: `${1 + level * 1.5}rem` }}
        >
          {item.icon && <span className={styles.icon}>{item.icon}</span>}
          <span className={styles.title}>{item.title}</span>
          {hasChildren && (
            <span className={cn(
              styles.arrow,
              isExpanded && styles.expanded
            )}>
              ▼
            </span>
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div className={styles.subMenu}>
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  const renderMenu = () => (
    <nav className={styles.menu}>
      <div className={styles.menuHeader}>
        <h2 className={styles.menuTitle}>导航菜单</h2>
      </div>
      <div className={styles.menuItems}>
        {menuItems.map(item => renderMenuItem(item))}
      </div>
    </nav>
  )

  const renderOverlay = () => (
    <div
      ref={overlayRef}
      className={cn(styles.overlay, isOpen && styles.visible)}
      onClick={handleOverlayClick}
    />
  )

  // return JSX
  return (
    <>
      <aside ref={sidebarRef} className={sidebarClasses}>
        {renderMenu()}
      </aside>
      {renderOverlay()}
    </>
  )
}

export default Sidebar