'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight, Search, Hammer, Scissors, Scale, UtensilsCrossed,
  Home, HeartPulse, ShoppingCart, Calculator, UserSearch, Car,
  Target, Palette, GraduationCap, Monitor, Dumbbell, CalendarDays,
  Plane, Landmark, Megaphone, Truck, Heart, Mic, Cloud, Building2,
  ShieldCheck, Briefcase,
} from 'lucide-react'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'
import { industries } from '@/lib/industries'

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

export default function BransjerPage() {
  const [search, setSearch] = useState('')
  const [lang] = useState<'no' | 'en'>('no')

  const filtered = industries.filter(ind =>
    ind.title.toLowerCase().includes(search.toLowerCase()) ||
    ind.subtitle.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ background: bgDark, minHeight: '100vh', color: '#f4f1eb' }}>
      <Nav />

      {/* Hero */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px 40px', textAlign: 'center' }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, marginBottom: 16, lineHeight: 1.2 }}
        >
          Finn din <span style={{ color: gold }}>bransje</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', maxWidth: 560, margin: '0 auto 32px', lineHeight: 1.6 }}
        >
          Vi tilbyr skreddersydde AI-automatiseringer for {industries.length} bransjer.
          Velg din for å se hvilke løsninger som passer best.
        </motion.p>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: cardBg, borderRadius: 12, padding: '12px 20px',
            border: `1px solid rgba(${goldRgb},0.15)`, maxWidth: 440, margin: '0 auto',
          }}
        >
          <Search size={18} color={gold} />
          <input
            type="text"
            placeholder="Søk etter bransje..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              background: 'none', border: 'none', outline: 'none', color: '#f4f1eb',
              fontSize: 15, flex: 1, fontFamily: 'inherit',
            }}
          />
        </motion.div>
      </section>

      {/* Grid */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
        }}>
          {filtered.map((ind, i) => {
            const Icon = iconMap[ind.icon] || Briefcase
            return (
              <motion.div
                key={ind.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.5) }}
              >
                <Link href={`/bransjer/${ind.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{
                    background: cardBg,
                    borderRadius: 14,
                    padding: '24px 20px',
                    border: `1px solid rgba(${goldRgb},0.08)`,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                  className="bransje-card"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 10,
                        background: `rgba(${goldRgb},0.1)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon size={22} color={gold} />
                      </div>
                      <span style={{
                        fontSize: 12, color: 'rgba(255,255,255,0.5)',
                        background: 'rgba(255,255,255,0.04)', borderRadius: 20,
                        padding: '4px 10px',
                      }}>
                        {ind.count} løsninger
                      </span>
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: '#f4f1eb', margin: 0 }}>
                      {ind.title}
                    </h3>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5 }}>
                      {ind.subtitle}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: gold, fontSize: 13, fontWeight: 500, marginTop: 4 }}>
                      Se løsninger <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)' }}>
              Ingen bransjer matcher «{search}». Prøv et annet søkeord.
            </p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section style={{
        maxWidth: 700, margin: '0 auto', padding: '40px 24px 80px', textAlign: 'center',
      }}>
        <div style={{
          background: cardBg, borderRadius: 20, padding: '48px 32px',
          border: `1px solid rgba(${goldRgb},0.1)`,
        }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>
            Finner du ikke din bransje?
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', marginBottom: 24, lineHeight: 1.6 }}>
            Vi tilpasser løsningene til din bedrift uansett bransje.
            Start en gratis kartlegging så finner vi ut hva som passer.
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
        .bransje-card:hover {
          border-color: rgba(${goldRgb}, 0.25) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  )
}
