'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Language = 'no' | 'en'

interface LanguageContextType {
  lang: Language
  setLang: (l: Language) => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'no',
  setLang: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('no')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('arxon-lang') as Language | null
    if (stored === 'en') setLangState('en')
    setMounted(true)
  }, [])

  const setLang = (l: Language) => {
    setLangState(l)
    localStorage.setItem('arxon-lang', l)
    document.documentElement.lang = l
  }

  // Avoid hydration mismatch
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
