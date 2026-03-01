'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Check } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { fonts } from '@/lib/constants'
import { gold, goldRgb } from '@/lib/constants'
import { bgDark, cardBg, cardBorder, textPrimary, textSecondary, textMuted } from '../lib/constants'
import { t } from '../translations'

interface Phase1ContactProps {
  contact: { company: string; name: string; email: string; phone: string }
  setContact: (c: any) => void
  emailError: string
  setEmailError: (e: string) => void
  phoneError: string
  setPhoneError: (e: string) => void
  onSubmit: () => void
}

export function Phase1Contact({
  contact,
  setContact,
  emailError,
  setEmailError,
  phoneError,
  setPhoneError,
  onSubmit,
}: Phase1ContactProps) {
  const { lang } = useLanguage()

  const cardStyle: React.CSSProperties = {
    background: cardBg,
    border: `1px solid ${cardBorder}`,
    borderRadius: 16,
    padding: '28px 24px',
  }

  const btnPrimary: React.CSSProperties = {
    background: `linear-gradient(110deg, ${gold} 0%, #e0c88a 25%, ${gold} 50%, #a8884d 75%, ${gold} 100%)`,
    backgroundSize: '200% 100%',
    color: bgDark,
    border: 'none',
    borderRadius: 12,
    padding: '14px 32px',
    fontWeight: 600,
    fontSize: 16,
    cursor: 'pointer',
    fontFamily: fonts.body,
    width: '100%',
    transition: 'all 0.2s',
  }

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${cardBorder}`,
    borderRadius: 10,
    padding: '12px 16px',
    color: textPrimary,
    fontSize: 15,
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: fonts.body,
    outline: 'none',
  }

  const pageV = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
  }

  return (
    <motion.div key="p1" variants={pageV} initial="initial" animate="animate" exit="exit">
      <div style={{ textAlign: 'center', marginBottom: 36, marginTop: 40 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: `rgba(${goldRgb},0.08)`,
            border: `1px solid rgba(${goldRgb},0.15)`,
            borderRadius: 24,
            padding: '6px 16px',
            fontSize: 13,
            color: gold,
            marginBottom: 16,
            fontWeight: 500,
          }}>
          <Sparkles size={14} /> {t('badge_automations', lang)}
        </motion.div>
        <h1 style={{ fontSize: 'clamp(26px, 5vw, 38px)', fontWeight: 700, lineHeight: 1.2, marginBottom: 14 }}>
          {t('phase1_title', lang)}
        </h1>
        <p style={{ color: textSecondary, fontSize: 15, maxWidth: 540, margin: '0 auto', lineHeight: 1.6 }}>
          {t('phase1_subtitle', lang)}
        </p>
      </div>

      <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, color: textSecondary, marginBottom: 6, display: 'block' }}>
            {t('company_name', lang)}
          </label>
          <input
            autoComplete="organization"
            style={inputStyle}
            value={contact.company}
            onChange={e => setContact({ ...contact, company: e.target.value })}
          />
        </div>

        <div>
          <label style={{ fontSize: 13, color: textSecondary, marginBottom: 6, display: 'block' }}>
            {t('contact_name', lang)}
          </label>
          <input
            autoComplete="name"
            style={inputStyle}
            value={contact.name}
            onChange={e => setContact({ ...contact, name: e.target.value })}
          />
        </div>

        <div>
          <label style={{ fontSize: 13, color: textSecondary, marginBottom: 6, display: 'block' }}>
            {t('email', lang)}
          </label>
          <input
            type="email"
            autoComplete="email"
            style={{ ...inputStyle, borderColor: emailError ? '#ef4444' : cardBorder }}
            value={contact.email}
            onChange={e => {
              setContact({ ...contact, email: e.target.value })
              setEmailError('')
            }}
          />
          {emailError && <span style={{ color: '#ef4444', fontSize: 12, marginTop: 4, display: 'block' }}>{emailError}</span>}
        </div>

        <div>
          <label style={{ fontSize: 13, color: textSecondary, marginBottom: 6, display: 'block' }}>
            {t('phone', lang)}
          </label>
          <input
            type="tel"
            autoComplete="tel"
            style={{ ...inputStyle, borderColor: phoneError ? '#ef4444' : cardBorder }}
            value={contact.phone}
            onChange={e => {
              setContact({ ...contact, phone: e.target.value })
              setPhoneError('')
            }}
            placeholder="412 34 567"
          />
          {phoneError && <span style={{ color: '#ef4444', fontSize: 12, marginTop: 4, display: 'block' }}>{phoneError}</span>}
        </div>

        <button
          style={{
            ...btnPrimary,
            marginTop: 8,
            opacity: !contact.company || !contact.name || !contact.email || !contact.phone ? 0.4 : 1,
          }}
          onClick={onSubmit}
          disabled={!contact.company || !contact.name || !contact.email || !contact.phone}>
          {t('start_btn', lang)} <ArrowRight size={16} style={{ display: 'inline', marginLeft: 6, verticalAlign: 'middle' }} />
        </button>

        <p style={{ color: textMuted, fontSize: 12, lineHeight: 1.5, textAlign: 'center', marginTop: 4 }}>
          {t('gdpr_note', lang)}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 8, flexWrap: 'wrap' }}>
          {[t('trust_free', lang), t('trust_done', lang), t('trust_support', lang)].map(txt => (
            <span key={txt} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: textMuted }}>
              <Check size={12} color="#4ade80" /> {txt}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
