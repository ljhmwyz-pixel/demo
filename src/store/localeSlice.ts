import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface LocaleState {
  language: string
  messages: Record<string, any>
  loading: boolean
}

const initialState: LocaleState = {
  language: 'zh-CN',
  messages: {},
  loading: false,
}

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload
      localStorage.setItem('language', action.payload)
    },
    setMessages: (state, action: PayloadAction<Record<string, any>>) => {
      state.messages = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    switchLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload
      state.loading = true
      localStorage.setItem('language', action.payload)
    },
  },
})

export const { setLanguage, setMessages, setLoading, switchLanguage } = localeSlice.actions

export default localeSlice.reducer