'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight, ArrowLeft, CheckCircle2, Clock, Zap, AlertTriangle,
  ChevronDown, ArrowUpDown, SortAsc,
  Hammer, Scissors, Scale, UtensilsCrossed, Home, HeartPulse,
  ShoppingCart, Calculator, UserSearch, Car, Target, Palette,
  GraduationCap, Monitor, Dumbbell, CalendarDays, Plane, Landmark,
  Megaphone, Truck, Heart, Mic, Cloud, Building2, ShieldCheck, Briefcase,
} from 'lucide-react'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'
import { getIndustryBySlug, Automation } from '@/lib/industries'

const gold = '#efc07b'
const goldRgb = '239,192,123'
const bgDark = '#0f1b27'
const cardBg = '#16213e'

const iconMap: Record<string, any> = {
  Hammer, Scissors, Scale, UtensilsCrossed, Home, HeartPulse,
  ShoppingCart, Calculator, UserSearch, Car, Target, Palette,
  GraduationCap, Monitor, Dumbbell, CalendarDays, Plane, Landmark,
  Megaphone, Truck, Heart, Mic, Cloud, Building2, ShieldCheck, Briefcase,
}

const complexityColor: Record<string, string> = {
  'Lav': '#4ade80',
  'Middels': '#fbbf24',
  'Høy': '#f87171',
}

const complexityIcon: Record<string, any> = {
  'Lav': Zap,
  'Middels': Clock,
  'Høy': AlertTriangle,
}

const complexityOrder: Record<string, number> = { 'Høy': 3, 'Middels': 2, 'Lav': 1 }

type SortMode = 'complexity' | 'alpha'

function sortAutomations(items: Automation[], mode: SortMode): Automation[] {
  return [...items].sort((a, b) => {
    if (mode === 'complexity') {
      const diff = (complexityOrder[b.complexity] || 0) - (complexityOrder[a.complexity] || 0)
      if (diff !== 0) return diff
      return a.name.localeCompare(b.name, 'nb')
    }
    return a.name.localeCompare(b.name, 'nb')
  })
}

function AutoCard({ auto, index }: { auto: Automation; index: number }) {
  const [open, setOpen] = useState(false)
  const CIcon = complexityIcon[auto.complexity] || Zap
  const cColor = complexityColor[auto.complexity] || '#fbbf24'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.5) }}
      style={{
        background: cardBg,
        borderRadius: 14,
        border: `1px solid rgba(${goldRgb},${open ? '0.2' : '0.08'})`,
        transition: 'border-color 0.3s, box-shadow 0.3s',
        boxShadow: open ? `0 4px 24px rgba(0,0,0,0.25)` : 'none',
        overflow: 'hidden',
      }}
      className="auto-card"
    >
      {/* Clickable header */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '18px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          color: '#f4f1eb',
          fontFamily: 'inherit',
          textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
          <CheckCircle2 size={16} color={gold} style={{ flexShrink: 0 }} />
          <span style={{ fontSize: 15, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {auto.name}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {auto.complexity && (
            <span style={{
              display: 'flex', alignItems: 'center', gap: 5,
              fontSize: 11, color: cColor, fontWeight: 500,
              background: `${cColor}15`, borderRadius: 20, padding: '3px 10px',
              whiteSpace: 'nowrap',
            }}>
              <CIcon size={12} />
              {auto.complexity}
            </span>
          )}
          <ChevronDown
            size={16}
            color={`rgba(255,255,255,0.4)`}
            style={{
              transition: 'transform 0.3s ease',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </div>
      </button>

      {/* Expandable content */}
      <div style={{
        maxHeight: open ? 300 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.35s ease',
      }}>
        <div style={{ padding: '0 20px 18px', borderTop: `1px solid rgba(${goldRgb},0.06)` }}>
          {auto.desc && (
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', margin: '14px 0 0', lineHeight: 1.6 }}>
              {auto.desc}
            </p>
          )}
          {auto.benefit && (
            <p style={{
              fontSize: 13, color: `rgba(${goldRgb},0.8)`, margin: '10px 0 0',
              lineHeight: 1.5, fontStyle: 'italic',
              padding: '10px 14px', borderRadius: 10,
              background: `rgba(${goldRgb},0.05)`,
            }}>
              💡 {auto.benefit}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function IndustryPage() {
  const params = useParams()
  const slug = params.slug as string
  const industry = getIndustryBySlug(slug)
  const [lang] = useState<'no' | 'en'>('no')
  const [sortMode, setSortMode] = useState<SortMode>('complexity')

  if (!industry) {
    return (
      <div style={{ background: bgDark, minHeight: '100vh', color: '#f4f1eb' }}>
        <Nav />
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '120px 24px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 28, marginBottom: 16 }}>Bransje ikke funnet</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 24 }}>Vi fant ikke denne bransjen. Se alle bransjene våre:</p>
          <Link href="/bransjer" style={{ color: gold, textDecoration: 'underline' }}>Tilbake til bransjer</Link>
        </div>
      </div>
    )
  }

  const Icon = iconMap[industry.icon] || Briefcase
  const sorted = sortAutomations(industry.automations, sortMode)

  return (
    <div style={{ background: bgDark, minHeight: '100vh', color: '#f4f1eb' }}>
      <Nav />

      {/* Breadcrumb */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 0' }}>
        <Link href="/bransjer" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          color: 'rgba(255,255,255,0.5)', fontSize: 13, textDecoration: 'none',
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = gold}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
        >
          <ArrowLeft size={14} /> Alle bransjer
        </Link>
      </div>

      {/* Hero */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 32px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          style={{
            width: 64, height: 64, borderRadius: 16,
            background: `rgba(${goldRgb},0.1)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
          }}
        >
          <Icon size={32} color={gold} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700, marginBottom: 12, lineHeight: 1.2 }}
        >
          AI-automatisering for <span style={{ color: gold }}>{industry.title}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 8 }}
        >
          {industry.subtitle}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}
        >
          Trykk på en automatisering for å lese mer
        </motion.p>
      </section>

      {/* Sort + Legend */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 20px' }}>
        {/* Sort buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginRight: 4 }}>Sorter:</span>
          <button
            onClick={() => setSortMode('complexity')}
            style={{
              background: sortMode === 'complexity' ? `rgba(${goldRgb},0.15)` : `rgba(255,255,255,0.04)`,
              border: `1px solid ${sortMode === 'complexity' ? `rgba(${goldRgb},0.3)` : 'rgba(255,255,255,0.08)'}`,
              color: sortMode === 'complexity' ? gold : 'rgba(255,255,255,0.55)',
              borderRadius: 8, padding: '6px 14px', fontSize: 13, fontWeight: 500,
              cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', gap: 6,
              transition: 'all 0.2s',
            }}
          >
            <ArrowUpDown size={13} /> Kompleksitet høy → lav
          </button>
          <button
            onClick={() => setSortMode('alpha')}
            style={{
              background: sortMode === 'alpha' ? `rgba(${goldRgb},0.15)` : `rgba(255,255,255,0.04)`,
              border: `1px solid ${sortMode === 'alpha' ? `rgba(${goldRgb},0.3)` : 'rgba(255,255,255,0.08)'}`,
              color: sortMode === 'alpha' ? gold : 'rgba(255,255,255,0.55)',
              borderRadius: 8, padding: '6px 14px', fontSize: 13, fontWeight: 500,
              cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', gap: 6,
              transition: 'all 0.2s',
            }}
          >
            <SortAsc size={13} /> A → Å
          </button>
        </div>

        {/* Complexity legend */}
        <div style={{
          background: `rgba(255,255,255,0.02)`,
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 12, padding: '14px 18px',
          display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center',
        }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Kompleksitet:</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12 }}>
            <Zap size={12} color="#4ade80" />
            <span style={{ color: '#4ade80', fontWeight: 500 }}>Lav</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>— Raskt oppsett, noen timer</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12 }}>
            <Clock size={12} color="#fbbf24" />
            <span style={{ color: '#fbbf24', fontWeight: 500 }}>Middels</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>— Litt konfig, 1–5 dager</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12 }}>
            <AlertTriangle size={12} color="#f87171" />
            <span style={{ color: '#f87171', fontWeight: 500 }}>Høy</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>— Avansert, 3–7 dager</span>
          </span>
        </div>
      </section>

      {/* Automations list */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 60px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {sorted.map((auto, i) => (
            <AutoCard key={auto.name + i} auto={auto} index={i} />
          ))}
        </div>

        <p style={{
          fontSize: 13, color: 'rgba(255,255,255,0.35)', textAlign: 'center',
          marginTop: 24,
        }}>
          {industry.count} automatiseringer totalt for {industry.title}
        </p>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px 80px', textAlign: 'center' }}>
        <div style={{
          background: `linear-gradient(135deg, ${cardBg}, rgba(${goldRgb},0.06))`,
          borderRadius: 20, padding: '48px 32px',
          border: `1px solid rgba(${goldRgb},0.12)`,
        }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>
            Klar for å automatisere {industry.title.toLowerCase()}?
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', marginBottom: 24, lineHeight: 1.6 }}>
            Få en gratis kartlegging og se nøyaktig hvilke av disse {industry.count} løsningene
            som gir mest verdi for din bedrift.
          </p>
          <Link href="/kartlegging" className="cta-shimmer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '14px 32px', borderRadius: 12, fontWeight: 600,
            fontSize: 15, textDecoration: 'none', color: bgDark,
          }}>
            Start gratis kartlegging <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer lang={lang} />

      <style jsx global>{`
        .auto-card:hover {
          border-color: rgba(${goldRgb}, 0.2) !important;
        }
      `}</style>
    </div>
  )
}
