// 页面组件基础props类型
export interface BasePageProps {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

// API响应基础类型
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  timestamp?: number
}

// 分页参数类型
export interface PaginationParams {
  page: number
  pageSize: number
  total?: number
}

// 分页响应类型
export interface PaginatedResponse<T> {
  list: T[]
  pagination: PaginationParams
}

// 用户信息类型
export interface UserInfo {
  id: string
  username: string
  email?: string
  avatar?: string
  createdAt: string
}

// 主题类型
export type ThemeMode = 'light' | 'dark'

// 语言类型
export type LanguageType = 'zh-CN' | 'en-US'

// 路由类型
export interface RouteItem {
  path: string
  element: React.ReactNode
  children?: RouteItem[]
  meta?: {
    title?: string
    icon?: string
    requiresAuth?: boolean
  }
}