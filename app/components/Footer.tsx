'use client'

import Link from 'next/link'
import { gold, goldRgb, fonts } from '@/lib/constants'

interface FooterProps {
  lang: 'no' | 'en'
  /** Minimal footer (just copyright). Default: false (full footer) */
  minimal?: boolean
}

export default function Footer({ lang, minimal = false }: FooterProps) {
  const tx = lang === 'no' ? {
    tagline: 'Intelligent AI-automatisering for norske bedrifter.',
    services: 'Tjenester',
    contact: 'Kontakt',
    legal: 'Juridisk',
    mobilsvarer: 'AI Mobilsvarer',
    howItWorks: 'Hvordan det fungerer',
    kartlegging: 'Gratis kartlegging',
    pricing: 'Priser',
    privacy: 'Personvern',
    terms: 'Vilkår for bruk',
    rights: 'Alle rettigheter reservert.',
    gdpr: 'GDPR-kompatibel · Norsk datasenter',
  } : {
    tagline: 'Intelligent AI automation for Norwegian businesses.',
    services: 'Services',
    contact: 'Contact',
    legal: 'Legal',
    mobilsvarer: 'AI Receptionist',
    howItWorks: 'How it works',
    kartlegging: 'Free assessment',
    pricing: 'Pricing',
    privacy: 'Privacy policy',
    terms: 'Terms of use',
    rights: 'All rights reserved.',
    gdpr: 'GDPR compliant · Norwegian data center',
  }

  if (minimal) {
    return (
      <footer style={{
        maxWidth: 1100, margin: '0 auto', padding: '36px 24px',
        borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center',
      }}>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', fontFamily: fonts.body }}>
          &copy; {new Date().getFullYear()} Arxon. {tx.rights}
        </span>
      </footer>
    )
  }

  const linkStyle: React.CSSProperties = {
    fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
    fontFamily: fonts.body, transition: 'color 0.2s',
  }
  const headingStyle: React.CSSProperties = {
    fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)',
    letterSpacing: '1.5px', textTransform: 'uppercase' as const, fontFamily: fonts.body,
  }

  return (
    <footer style={{
      maxWidth: 1100, margin: '0 auto', padding: '48px 24px 36px',
      borderTop: '1px solid rgba(255,255,255,0.06)', fontFamily: fonts.body,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        flexWrap: 'wrap', gap: 32, marginBottom: 32,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 280 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="/arxon-icon.png" alt="Arxon" style={{ width: 24, height: 24 }} />
            <span style={{
              fontSize: 14, color: 'rgba(255,255,255,0.5)', fontWeight: 700,
              letterSpacing: '2px', textTransform: 'uppercase' as const,
            }}>Arxon</span>
          </div>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', lineHeight: 1.6 }}>
            {tx.tagline}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={headingStyle}>{tx.services}</span>
            <Link href="/mobilsvarer" style={linkStyle}>{tx.mobilsvarer}</Link>
            <Link href="/hvordan-det-fungerer" style={linkStyle}>{tx.howItWorks}</Link>
            <Link href="/priser" style={linkStyle}>{tx.pricing}</Link>
            <Link href="/kartlegging" style={linkStyle}>{tx.kartlegging}</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={headingStyle}>{tx.contact}</span>
            <a href="mailto:kontakt@arxon.no" style={linkStyle}>kontakt@arxon.no</a>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Oslo, Norge</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={headingStyle}>{tx.legal}</span>
            <Link href="/personvern" style={linkStyle}>{tx.privacy}</Link>
            <Link href="/vilkar" style={linkStyle}>{tx.terms}</Link>
          </div>
        </div>
      </div>
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 16,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 12,
      }}>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
          &copy; {new Date().getFullYear()} Arxon. {tx.rights}
        </span>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>{tx.gdpr}</span>
      </div>
    </footer>
  )
}
