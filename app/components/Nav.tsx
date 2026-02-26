'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { gold, goldRgb, bg } from '@/lib/constants'

/* ── Arxon Logo SVG (shared with landing page) ── */
function ArxonLogo({ size = 'default' }: { size?: 'default' | 'large' | 'small' }) {
  const h = size === 'large' ? 44 : size === 'small' ? 28 : 34
  return (
    <div className="flex items-center gap-2" style={{ height: h }}>
      <svg width={h} height={h} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="navLogoGold" x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#e2c47d" />
            <stop offset="50%" stopColor="#c9a96e" />
            <stop offset="100%" stopColor="#b8944a" />
          </linearGradient>
        </defs>
        <path d="M22 3 L4 40 L11 40 L17 28 L22 18 L27 28 L22 28 L18.5 35 L33 35 L37 40 L40 40 Z" fill="url(#navLogoGold)" />
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

interface NavProps {
  lang?: 'no' | 'en'
  setLang?: (l: 'no' | 'en') => void
  sticky?: boolean
}

export default function Nav({ lang = 'no', setLang, sticky = true }: NavProps) {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '/mobilsvarer', label: lang === 'no' ? 'Mobilsvarer' : 'AI Receptionist' },
    { href: '/hvordan-det-fungerer', label: lang === 'no' ? 'Hvordan det fungerer' : 'How it works' },
    { href: '/priser', label: lang === 'no' ? 'Priser' : 'Pricing' },
    { href: '/blogg', label: lang === 'no' ? 'Blogg' : 'Blog' },
  ]

  const ctaClick = () => router.push('/kartlegging')

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Glass background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `rgba(8,8,22,0.6)`,
        backdropFilter: 'blur(24px) saturate(180%)',
        borderBottom: `1px solid rgba(${goldRgb},0.06)`,
      }} />
      {/* Subtle gold glow at top edge */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '400px', height: '1px',
        background: `linear-gradient(90deg, transparent, rgba(${goldRgb},0.3), transparent)`,
      }} />

      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[70px] relative">
        <Link href="/" className="no-underline">
          <ArxonLogo size="small" />
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'none' }} className="md:!flex items-center gap-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href}
              className="nav-link text-[14px] no-underline font-medium px-4 py-2 rounded-lg"
              style={{
                color: 'rgba(255,255,255,0.55)',
                transition: 'all 0.25s ease',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = gold; e.currentTarget.style.background = `rgba(${goldRgb},0.06)` }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.background = 'transparent' }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ width: '1px', height: '24px', background: `rgba(${goldRgb},0.1)`, margin: '0 8px' }} />
          <button onClick={ctaClick} className="gold-btn text-[13px] font-semibold px-5 py-[9px] rounded-xl"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            {lang === 'no' ? 'Gratis kartlegging' : 'Free assessment'}
          </button>
        </div>

        {/* Mobile menu button */}
        <button className="bg-transparent border-none cursor-pointer p-2 md:!hidden"
          style={{ color: 'white', display: 'block' }}
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:!hidden relative"
            style={{ background: 'rgba(8,8,22,0.95)', borderTop: `1px solid rgba(${goldRgb},0.06)` }}>
            <div className="p-5 px-6 flex flex-col gap-1">
              {links.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                  className="text-[15px] no-underline font-medium px-4 py-3 rounded-xl transition-colors"
                  style={{
                    color: 'rgba(255,255,255,0.75)',
                    fontFamily: 'Inter, system-ui, sans-serif',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = `rgba(${goldRgb},0.06)`; e.currentTarget.style.color = gold }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}>
                  {link.label}
                </Link>
              ))}
              <div style={{ height: '1px', background: `rgba(${goldRgb},0.08)`, margin: '8px 0' }} />
              <button onClick={() => { setMenuOpen(false); ctaClick() }}
                className="gold-btn w-full py-3 px-6 text-[15px] font-semibold rounded-xl"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                {lang === 'no' ? 'Gratis kartlegging' : 'Free assessment'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    {/* Spacer to push content below fixed nav */}
    <div style={{ height: '70px' }} />
    </>
  )
}
