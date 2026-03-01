'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'

export default function PriserRedirect() {
  const router = useRouter()
  const { lang } = useLanguage()

  useEffect(() => {
    router.replace('/pakkebygger')
  }, [router])

  return null
}
