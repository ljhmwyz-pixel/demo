// 首页相关DTO类型定义

export interface CounterState {
  value: number
  status: 'idle' | 'loading' | 'success' | 'error'
}

export interface ThemeConfig {
  mode: 'light' | 'dark'
  primaryColor: string
  fontSize: 'small' | 'medium' | 'large'
}

export interface LanguageConfig {
  current: string
  available: string[]
  translations: Record<string, any>
}

export interface UserPreferences {
  theme: ThemeConfig
  language: LanguageConfig
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
}