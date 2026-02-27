'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight, ArrowLeft, CheckCircle2, Clock, Zap, AlertTriangle,
  Hammer, Scissors, Scale, UtensilsCrossed, Home, HeartPulse,
  ShoppingCart, Calculator, UserSearch, Car, Target, Palette,
  GraduationCap, Monitor, Dumbbell, CalendarDays, Plane, Landmark,
  Megaphone, Truck, Heart, Mic, Cloud, Building2, ShieldCheck, Briefcase,
} from 'lucide-react'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'
import { getIndustryBySlug } from '@/lib/industries'

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

export default function IndustryPage() {
  const params = useParams()
  const slug = params.slug as string
  const industry = getIndustryBySlug(slug)
  const [lang] = useState<'no' | 'en'>('no')

  if (!industry) {
    return (
      <div style={{ background: bgDark, minHeight: '100vh', color: '#f4f1eb' }}>
        <Nav sticky />
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '120px 24px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 28, marginBottom: 16 }}>Bransje ikke funnet</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 24 }}>Vi fant ikke denne bransjen. Se alle bransjene våre:</p>
          <Link href="/bransjer" style={{ color: gold, textDecoration: 'underline' }}>Tilbake til bransjer</Link>
        </div>
      </div>
    )
  }

  const Icon = iconMap[industry.icon] || Briefcase

  return (
    <div style={{ background: bgDark, minHeight: '100vh', color: '#f4f1eb' }}>
      <Nav sticky />

      {/* Breadcrumb */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 0' }}>
        <Link href="/bransjer" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          color: 'rgba(255,255,255,0.65)', fontSize: 13, textDecoration: 'none',
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = gold}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
        >
          <ArrowLeft size={14} /> Alle bransjer
        </Link>
      </div>

      {/* Hero */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 48px', textAlign: 'center' }}>
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
          {industry.count} skreddersydde automatiseringer
        </motion.p>
      </section>

      {/* Automations list */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 60px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {industry.automations.map((auto, i) => {
            const CIcon = complexityIcon[auto.complexity] || Zap
            const cColor = complexityColor[auto.complexity] || '#fbbf24'
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.6) }}
                style={{
                  background: cardBg,
                  borderRadius: 14,
                  padding: '20px 24px',
                  border: `1px solid rgba(${goldRgb},0.08)`,
                  transition: 'border-color 0.3s',
                }}
                className="auto-card"
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 240 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <CheckCircle2 size={16} color={gold} />
                      <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0, color: '#f4f1eb' }}>
                        {auto.name}
                      </h3>
                    </div>
                    {auto.desc && (
                      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', margin: '0 0 6px', lineHeight: 1.5 }}>
                        {auto.desc}
                      </p>
                    )}
                    {auto.benefit && (
                      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.5, fontStyle: 'italic' }}>
                        {auto.benefit}
                      </p>
                    )}
                  </div>
                  {auto.complexity && (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      fontSize: 12, color: cColor, fontWeight: 500,
                      background: `${cColor}15`, borderRadius: 20, padding: '4px 12px',
                      whiteSpace: 'nowrap',
                    }}>
                      <CIcon size={13} />
                      {auto.complexity}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
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
