'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Language = 'ru' | 'en'

type Dictionary = Record<string, string>

type I18nContextValue = {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

const dictionaries: Record<Language, Dictionary> = {
  ru: {
    'header.search.placeholder': 'Поиск...',
    'header.login': 'Войти',
    'header.register': 'Регистрация',
    'header.buyTokens': 'Купить токены',
  },
  en: {
    'header.search.placeholder': 'Search...',
    'header.login': 'Log in',
    'header.register': 'Sign up',
    'header.buyTokens': 'Buy tokens',
  },
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('ru')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem('nv_lang') as Language | null
    if (stored === 'ru' || stored === 'en') {
      setLangState(stored)
    }
  }, [])

  const setLang = (value: Language) => {
    setLangState(value)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('nv_lang', value)
    }
  }

  const t = (key: string) => {
    const dict = dictionaries[lang] ?? dictionaries.ru
    return dict[key] ?? key
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return ctx
}

