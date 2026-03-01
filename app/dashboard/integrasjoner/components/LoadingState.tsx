'use client'

import { fonts } from '@/lib/constants'

export function LoadingState() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300, fontFamily: fonts.body }}>
      <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>Laster integrasjoner...</div>
    </div>
  )
}
