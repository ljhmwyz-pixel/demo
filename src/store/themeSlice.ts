import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface ThemeState {
  mode: 'light' | 'dark'
}

const initialState: ThemeState = {
  mode: 'light',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload
      // 同步到 localStorage
      localStorage.setItem('theme-mode', action.payload)
    },
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme-mode', state.mode)
    },
  },
})

export const { setTheme, toggleTheme } = themeSlice.actions

export default themeSlice.reducer