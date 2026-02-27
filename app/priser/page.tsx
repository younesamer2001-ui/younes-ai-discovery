'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PriserRedirect() {
  const router = useRouter()
  useEffect(() => { router.replace('/pakkebygger') }, [router])
  return null
}
