'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface Theme {
  id: string
  name: string
  slug: string
  config: {
    colors: Record<string, string>
    fonts: Record<string, string>
    textures: Record<string, string>
  }
}

interface ThemeContextType {
  currentTheme: Theme | null
  setTheme: (themeSlug: string) => void
  themes: Theme[]
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Базовые темы
const defaultThemes: Theme[] = [
  {
    id: 'default',
    name: 'По умолчанию (Пергамент)',
    slug: 'default',
    config: {
      colors: {
        bgPrimary: '#fefbf7',
        bgSecondary: '#fdf6ef',
        textPrimary: '#3d3d3d',
        accent: '#4fd1c7',
      },
      fonts: {},
      textures: {},
    },
  },
  {
    id: 'dmitry',
    name: 'Лес, грибы, Dune',
    slug: 'dmitry',
    config: {
      colors: {
        bgPrimary: '#f5f0e8',
        bgSecondary: '#e8e0d4',
        textPrimary: '#2d2a24',
        accent: '#6b8e5a',
      },
      fonts: {},
      textures: {},
    },
  },
  {
    id: 'oleg',
    name: 'Киберпанк-неон',
    slug: 'oleg',
    config: {
      colors: {
        bgPrimary: '#0a0e1a',
        bgSecondary: '#141b2d',
        textPrimary: '#e0e0e0',
        accent: '#00d9ff',
      },
      fonts: {},
      textures: {},
    },
  },
]

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentThemeState] = useState<Theme | null>(null)
  const [themes] = useState<Theme[]>(defaultThemes)

  useEffect(() => {
    // Загружаем сохранённую тему
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      const theme = themes.find((t) => t.slug === savedTheme) || themes[0]
      setCurrentThemeState(theme)
      applyTheme(theme)
    } else {
      setCurrentThemeState(themes[0])
      applyTheme(themes[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme.slug)

    // Применяем CSS переменные из конфига темы
    Object.entries(theme.config.colors).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value)
    })
  }

  const setTheme = (themeSlug: string) => {
    const theme = themes.find((t) => t.slug === themeSlug) || themes[0]
    setCurrentThemeState(theme)
    applyTheme(theme)
    localStorage.setItem('theme', themeSlug)
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

