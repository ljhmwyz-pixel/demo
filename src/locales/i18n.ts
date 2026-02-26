import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { store } from '@/store'
import { setMessages, setLoading } from '@/store/localeSlice'

// 本地默认语言包
const defaultResources = {
  'zh-CN': {
    translation: {
      welcome: '欢迎使用我们的应用',
      theme: {
        light: '浅色主题',
        dark: '深色主题',
        switch: '切换主题',
      },
      language: {
        switch: '切换语言',
      },
    },
  },
  'en-US': {
    translation: {
      welcome: 'Welcome to our application',
      theme: {
        light: 'Light Theme',
        dark: 'Dark Theme',
        switch: 'Switch Theme',
      },
      language: {
        switch: 'Switch Language',
      },
    },
  },
}

// 从云端获取语言包
const fetchRemoteTranslations = async (lang: string): Promise<Record<string, any>> => {
  try {
    // 这里替换为实际的API地址
    const response = await fetch(`https://api.example.com/translations/${lang}.json`)
    if (response.ok) {
      return await response.json()
    }
    throw new Error('Failed to fetch translations')
  } catch (error) {
    console.warn('Failed to fetch remote translations, using local defaults:', error)
    return defaultResources[lang as keyof typeof defaultResources]?.translation || {}
  }
}

// 本地缓存管理
const CACHE_KEY_PREFIX = 'i18n_cache_'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24小时

const getFromCache = (lang: string): Record<string, any> | null => {
  try {
    const cached = localStorage.getItem(`${CACHE_KEY_PREFIX}${lang}`)
    if (!cached) return null
    
    const { data, timestamp } = JSON.parse(cached)
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(`${CACHE_KEY_PREFIX}${lang}`)
      return null
    }
    return data
  } catch {
    return null
  }
}

const saveToCache = (lang: string, data: Record<string, any>): void => {
  try {
    const cacheData = {
      data,
      timestamp: Date.now(),
    }
    localStorage.setItem(`${CACHE_KEY_PREFIX}${lang}`, JSON.stringify(cacheData))
  } catch (error) {
    console.warn('Failed to save translations to cache:', error)
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources: defaultResources,
    lng: 'zh-CN',
    fallbackLng: 'zh-CN',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  })

// 监听语言变化并加载对应的语言包
store.subscribe(() => {
  const state = store.getState()
  const currentLang = state.locale.language
  
  if (i18n.language !== currentLang) {
    // 检查缓存
    const cachedTranslations = getFromCache(currentLang)
    
    if (cachedTranslations) {
      // 使用缓存的数据
      i18n.addResourceBundle(currentLang, 'translation', cachedTranslations, true, true)
      store.dispatch(setMessages(cachedTranslations))
      store.dispatch(setLoading(false))
    } else {
      // 获取远程数据
      store.dispatch(setLoading(true))
      
      fetchRemoteTranslations(currentLang)
        .then((remoteTranslations) => {
          // 合并本地和远程翻译
          const localTranslations = defaultResources[currentLang as keyof typeof defaultResources]?.translation || {}
          const mergedTranslations = { ...localTranslations, ...remoteTranslations }
          
          // 更新i18n和store
          i18n.addResourceBundle(currentLang, 'translation', mergedTranslations, true, true)
          store.dispatch(setMessages(mergedTranslations))
          store.dispatch(setLoading(false))
          
          // 缓存结果
          saveToCache(currentLang, mergedTranslations)
        })
        .catch((error) => {
          console.error('Failed to load translations:', error)
          store.dispatch(setLoading(false))
        })
    }
    
    i18n.changeLanguage(currentLang)
  }
})

export default i18n