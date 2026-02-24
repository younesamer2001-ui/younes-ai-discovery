'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const gold = '#c9a96e'
const goldRgb = '201,169,110'

type ConsentState = {
  necessary: true       // always true — required for site to work
  analytics: boolean
  marketing: boolean
}

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('arxon-cookie-consent')
    if (!stored) {
      setVisible(true)
    }
  }, [])

  const saveConsent = (state: ConsentState) => {
    localStorage.setItem('arxon-cookie-consent', JSON.stringify(state))
    setVisible(false)
    // If analytics is accepted and GA is configured, enable it here
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: state.analytics ? 'granted' : 'denied',
        ad_storage: state.marketing ? 'granted' : 'denied',
      })
    }
  }

  const acceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true })
  }

  const declineAll = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false })
  }

  const saveSelected = () => {
    saveConsent(consent)
  }

  if (!mounted || !visible) return null

  const btnBase: React.CSSProperties = {
    padding: '10px 22px',
    borderRadius: 8,
    fontSize: 13,
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'all 0.2s',
    fontFamily: 'inherit',
  }

  const toggleStyle = (on: boolean): React.CSSProperties => ({
    width: 40, height: 22, borderRadius: 11,
    background: on ? gold : 'rgba(255,255,255,0.15)',
    position: 'relative', cursor: 'pointer',
    transition: 'background 0.2s', flexShrink: 0,
    border: 'none',
  })

  const toggleDot = (on: boolean): React.CSSProperties => ({
    width: 16, height: 16, borderRadius: '50%',
    background: on ? '#0a0a0f' : 'rgba(255,255,255,0.5)',
    position: 'absolute', top: 3,
    left: on ? 21 : 3,
    transition: 'left 0.2s, background 0.2s',
  })

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10000,
      background: 'rgba(13, 13, 20, 0.98)',
      borderTop: `1px solid rgba(${goldRgb},0.15)`,
      backdropFilter: 'blur(16px)',
      padding: '20px 24px',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'DM Sans', 'Segoe UI', Roboto, sans-serif",
    }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        {/* Main message */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          gap: 20, flexWrap: 'wrap',
        }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, margin: '0 0 6px' }}>
              Vi bruker informasjonskapsler for å sikre at nettsiden fungerer, og valgfrie cookies for analyse.
              Du velger selv hva du godtar.{' '}
              <Link href="/personvern" style={{ color: gold, textDecoration: 'underline' }}>Les mer</Link>
            </p>
            <button
              onClick={() => setShowDetails(!showDetails)}
              style={{
                background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)',
                fontSize: 12, cursor: 'pointer', padding: 0, textDecoration: 'underline',
                fontFamily: 'inherit',
              }}
            >
              {showDetails ? 'Skjul detaljer ▲' : 'Vis detaljer ▼'}
            </button>
          </div>

          {/* Buttons — accept and decline are visually equal */}
          <div style={{ display: 'flex', gap: 10, flexShrink: 0, alignItems: 'center' }}>
            <button onClick={declineAll} style={{
              ...btnBase,
              border: `1px solid rgba(255,255,255,0.2)`,
              background: 'transparent',
              color: 'rgba(255,255,255,0.7)',
            }}>
              Avvis alle
            </button>
            {showDetails && (
              <button onClick={saveSelected} style={{
                ...btnBase,
                border: `1px solid rgba(${goldRgb},0.3)`,
                background: 'transparent',
                color: gold,
              }}>
                Lagre valg
              </button>
            )}
            <button onClick={acceptAll} style={{
              ...btnBase,
              border: 'none',
              background: gold,
              color: '#0a0a0f',
            }}>
              Godta alle
            </button>
          </div>
        </div>

        {/* Granular settings */}
        {showDetails && (
          <div style={{
            marginTop: 16, paddingTop: 16,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', flexDirection: 'column', gap: 14,
          }}>
            {/* Necessary — always on */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <div>
                <div style={{ fontSize: 13, color: '#fff', fontWeight: 600, marginBottom: 2 }}>Nødvendige</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
                  Kreves for at nettsiden skal fungere (navigasjon, sikkerhet, samtykkevalg).
                </div>
              </div>
              <button disabled style={{ ...toggleStyle(true), opacity: 0.6, cursor: 'not-allowed' }}>
                <div style={toggleDot(true)} />
              </button>
            </div>

            {/* Analytics */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <div>
                <div style={{ fontSize: 13, color: '#fff', fontWeight: 600, marginBottom: 2 }}>Analyse</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
                  Hjelper oss forstå hvordan besøkende bruker nettsiden (f.eks. Google Analytics). Anonymisert data.
                </div>
              </div>
              <button
                onClick={() => setConsent(prev => ({ ...prev, analytics: !prev.analytics }))}
                style={toggleStyle(consent.analytics)}
                aria-label="Slå analyse-cookies av/på"
                role="switch"
                aria-checked={consent.analytics}
              >
                <div style={toggleDot(consent.analytics)} />
              </button>
            </div>

            {/* Marketing */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <div>
                <div style={{ fontSize: 13, color: '#fff', fontWeight: 600, marginBottom: 2 }}>Markedsføring</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
                  Brukes til å vise relevante annonser og måle kampanjeeffektivitet. Ikke aktive i dag.
                </div>
              </div>
              <button
                onClick={() => setConsent(prev => ({ ...prev, marketing: !prev.marketing }))}
                style={toggleStyle(consent.marketing)}
                aria-label="Slå markedsførings-cookies av/på"
                role="switch"
                aria-checked={consent.marketing}
              >
                <div style={toggleDot(consent.marketing)} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
