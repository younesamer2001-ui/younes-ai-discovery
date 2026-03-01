'use client'

import { useState } from 'react'
import { Check, Info, Zap, Clock, AlertTriangle } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { gold, goldRgb } from '@/lib/constants'
import { formatKr } from '@/lib/pricing'
import { bgDark, cardBg, cardBorder, textPrimary, textMuted, complexityColor } from '../lib/constants'
import { PricingAutomation } from '@/lib/pricing'
import { t } from '../translations'

const complexityIcon: Record<string, any> = {
  'Lav': Zap,
  'Middels': Clock,
  'Høy': AlertTriangle,
}

export function AutoRow({ auto, selected, onToggle }: { auto: PricingAutomation; selected: boolean; onToggle: () => void }) {
  const { lang } = useLanguage()
  const [showInfo, setShowInfo] = useState(false)
  const CIcon = complexityIcon[auto.complexity] || Zap
  const cColor = complexityColor[auto.complexity] || '#fbbf24'

  return (
    <div style={{
      background: selected ? `rgba(${goldRgb},0.06)` : cardBg,
      borderRadius: 12,
      border: `1px solid ${selected ? `rgba(${goldRgb},0.25)` : cardBorder}`,
      transition: 'all 0.2s',
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer' }} onClick={onToggle}>
        <div style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          flexShrink: 0,
          background: selected ? gold : 'transparent',
          border: `2px solid ${selected ? gold : 'rgba(255,255,255,0.2)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
        }}>
          {selected && <Check size={14} color={bgDark} strokeWidth={3} />}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: textPrimary }}>{auto.name}</div>
          <div style={{ fontSize: 11, color: textMuted, marginTop: 2 }}>{auto.category}</div>
        </div>
        <span style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          fontSize: 11,
          color: cColor,
          fontWeight: 500,
          background: `${cColor}12`,
          borderRadius: 16,
          padding: '2px 8px',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          <CIcon size={11} /> {auto.complexity}
        </span>
        <div style={{ textAlign: 'right', flexShrink: 0, minWidth: 80 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: gold }}>{formatKr(auto.monthlyPrice)}</div>
          <div style={{ fontSize: 10, color: textMuted }}>{t('mnd', lang)}</div>
        </div>
        <button
          onClick={e => { e.stopPropagation(); setShowInfo(!showInfo) }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.3)',
            padding: 4,
            flexShrink: 0,
          }}>
          <Info size={16} />
        </button>
      </div>
      <div style={{ maxHeight: showInfo ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
        <div style={{ padding: '0 16px 14px', borderTop: `1px solid rgba(255,255,255,0.04)` }}>
          {auto.desc && <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: '10px 0 0', lineHeight: 1.5 }}>{auto.desc}</p>}
          {auto.benefit && <p style={{ fontSize: 12, color: `rgba(${goldRgb},0.75)`, margin: '8px 0 0', lineHeight: 1.4, fontStyle: 'italic' }}>{auto.benefit}</p>}
          <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 11, color: textMuted }}>
            <span>{t('setup_label', lang)}: {formatKr(auto.setupPrice)}</span>
            <span>{t('impl_label', lang)}: {auto.implTime}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
