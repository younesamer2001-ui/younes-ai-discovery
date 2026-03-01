'use client'

import { Zap } from 'lucide-react'
import { gold } from '@/lib/constants'

export function SupportFooter() {
  return (
    <div style={{
      marginTop: 24, padding: '16px 20px',
      background: 'rgba(255,255,255,0.02)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.04)',
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <Zap size={16} color="rgba(255,255,255,0.3)" />
      <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>
        Trenger du hjelp med oppsett?{' '}
        <a href="mailto:support@arxon.no" style={{ color: gold, textDecoration: 'none' }}>Kontakt oss</a>
        {' '}— vi hjelper deg med å finne riktige API-nøkler.
      </div>
    </div>
  )
}
