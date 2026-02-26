'use client'

import Link from 'next/link'
import { gold, goldRgb } from '@/lib/constants'

/* ── Arxon Logo SVG (shared) ── */
function ArxonLogo() {
  const h = 28
  return (
    <div className="flex items-center gap-2" style={{ height: h }}>
      <svg width={h} height={h} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="footerLogoGold" x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#e2c47d" />
            <stop offset="50%" stopColor="#c9a96e" />
            <stop offset="100%" stopColor="#b8944a" />
          </linearGradient>
        </defs>
        <path d="M22 3 L4 40 L11 40 L17 28 L22 18 L27 28 L22 28 L18.5 35 L33 35 L37 40 L40 40 Z" fill="url(#footerLogoGold)" />
      </svg>
      <span style={{
        fontSize: h * 0.55,
        fontWeight: 700,
        letterSpacing: h * 0.08,
        color: 'white',
        fontFamily: 'Inter, system-ui, sans-serif',
        lineHeight: 1,
      }}>ARXON</span>
    </div>
  )
}

interface FooterProps {
  lang?: 'no' | 'en'
  minimal?: boolean
}

export default function Footer({ lang = 'no', minimal = false }: FooterProps) {
  if (minimal) {
    return (
      <footer className="py-8 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-[1000px] mx-auto text-center">
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.15)', fontFamily: 'Inter, system-ui, sans-serif' }}>
            &copy; {new Date().getFullYear()} Arxon. Alle rettigheter forbeholdt.
          </span>
        </div>
      </footer>
    )
  }

  return (
    <footer className="py-12 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="max-w-[1000px] mx-auto">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-[280px]">
            <ArxonLogo />
            <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter, system-ui, sans-serif' }}>
              {lang === 'no'
                ? 'Intelligent AI-automatisering for norske bedrifter. 226 automatiseringer på tvers av 25 bransjer.'
                : 'Intelligent AI automation for Norwegian businesses. 226 automations across 25 industries.'}
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12 flex-wrap">
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[1.5px]"
                style={{ color: `rgba(${goldRgb},0.4)`, fontFamily: 'Inter, system-ui, sans-serif' }}>
                {lang === 'no' ? 'Tjenester' : 'Services'}
              </span>
              <Link href="/mobilsvarer" className="text-[13px] no-underline transition-colors"
                style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, system-ui, sans-serif' }}>
                {lang === 'no' ? 'AI Mobilsvarer' : 'AI Receptionist'}
              </Link>
              <Link href="/hvordan-det-fungerer" className="text-[13px] no-underline transition-colors"
                style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, system-ui, sans-serif' }}>
                {lang === 'no' ? 'Hvordan det fungerer' : 'How it works'}
              </Link>
              <Link href="/priser" className="text-[13px] no-underline transition-colors"
                style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, system-ui, sans-serif' }}>
                {lang === 'no' ? 'Priser' : 'Pricing'}
              </Link>
              <Link href="/kartlegging" className="text-[13px] no-underline transition-colors"
                style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, system-ui, sans-serif' }}>
                {lang === 'no' ? 'Gratis kartlegging' : 'Free assessment'}
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[1.5px]"
                style={{ color: `rgba(${goldRgb},0.4)`, fontFamily: 'Inter, system-ui, sans-serif' }}>
                {lang === 'no' ? 'Kontakt' : 'Contact'}
              </span>
              <a href="mailto:kontakt@arxon.no" className="text-[13px] no-underline transition-colors"
                style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, system-ui, sans-serif' }}>
                kontakt@arxon.no
              </a>
              <a href="tel:+4778896386" className="text-[13px] no-underline transition-colors"
                style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, system-ui, sans-serif' }}>
                78 89 63 86
              </a>
              <span className="text-[13px]"
                style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, system-ui, sans-serif' }}>
                Oslo, Norge
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[1.5px]"
                style={{ color: `rgba(${goldRgb},0.4)`, fontFamily: 'Inter, system-ui, sans-serif' }}>
                {lang === 'no' ? 'Juridisk' : 'Legal'}
              </span>
              <Link href="/personvern" className="text-[13px] no-underline transition-colors"
                style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, system-ui, sans-serif' }}>
                {lang === 'no' ? 'Personvern' : 'Privacy policy'}
              </Link>
              <Link href="/vilkar" className="text-[13px] no-underline transition-colors"
                style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, system-ui, sans-serif' }}>
                {lang === 'no' ? 'Vilkår' : 'Terms'}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="flex flex-col gap-1">
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.15)', fontFamily: 'Inter, system-ui, sans-serif' }}>
              &copy; {new Date().getFullYear()} Arxon. {lang === 'no' ? 'Alle rettigheter forbeholdt.' : 'All rights reserved.'}
            </span>
          </div>
          <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.15)', fontFamily: 'Inter, system-ui, sans-serif' }}>
            GDPR-compliant · Data lagret i EØS · EU AI Act-klar
          </span>
        </div>
      </div>
    </footer>
  )
}
