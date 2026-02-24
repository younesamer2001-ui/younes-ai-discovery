'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const gold = '#c9a96e'

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
    const consent = localStorage.getItem('arxon-cookie-consent')
    if (!consent) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('arxon-cookie-consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('arxon-cookie-consent', 'declined')
    setVisible(false)
  }

  if (!mounted || !visible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10000,
      background: 'rgba(13, 13, 20, 0.97)',
      borderTop: '1px solid rgba(201, 169, 110, 0.15)',
      backdropFilter: 'blur(12px)',
      padding: '16px 24px',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }}>
      <div style={{
        maxWidth: 1000,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        flexWrap: 'wrap',
      }}>
        <p style={{
          fontSize: 13,
          color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.5,
          margin: 0,
          flex: 1,
          minWidth: 250,
        }}>
          Vi bruker informasjonskapsler for å forbedre din opplevelse. Du kan lese mer i vår{' '}
          <Link href="/personvern" style={{ color: gold, textDecoration: 'underline' }}>personvernerklæring</Link>.
        </p>
        <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
          <button
            onClick={decline}
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'transparent',
              color: 'rgba(255,255,255,0.6)',
              fontSize: 13,
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
          >
            Avvis
          </button>
          <button
            onClick={accept}
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              border: 'none',
              background: gold,
              color: '#0a0a0f',
              fontSize: 13,
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.9' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
          >
            Godta
          </button>
        </div>
      </div>
    </div>
  )
}
