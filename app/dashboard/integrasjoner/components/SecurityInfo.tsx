'use client'

import { Shield } from 'lucide-react'
import { gold, goldRgb } from '@/lib/constants'

export function SecurityInfo() {
  return (
    <div style={{
      background: `rgba(${goldRgb},0.04)`,
      border: `1px solid rgba(${goldRgb},0.1)`,
      borderRadius: 12, padding: '16px 20px', marginBottom: 24,
      display: 'flex', alignItems: 'center', gap: 16,
    }}>
      <Shield size={20} color={gold} style={{ flexShrink: 0 }} />
      <div>
        <div style={{ color: '#f0f0f0', fontSize: 13, fontWeight: 600, marginBottom: 2 }}>Trygt og kryptert</div>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
          API-nøklene dine lagres kryptert og brukes kun av Arxon for å koble til tjenestene dine. Vi deler aldri nøklene med tredjeparter.
        </div>
      </div>
    </div>
  )
}
