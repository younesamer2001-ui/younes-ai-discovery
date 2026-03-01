'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  ArrowRight, Phone, Users, Target, Megaphone,
  Cog, BarChart3, FileText, ShieldCheck,
  ChevronDown, CheckCircle2, Clock, Zap, AlertTriangle,
  Search, X, Filter, Hammer, Home, Scissors, Car, Plane,
  TrendingUp, Bot, Sparkles,
} from 'lucide-react'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'
import { serviceCategories, type ServiceAutomation } from '@/lib/services'
import { gold, goldRgb, bg } from '@/lib/constants'

/* ── Design tokens ── */
const cardBg = '#0d1a2d'
const cardBgHover = '#111f35'
const surfaceBg = '#0a1220'

/* ── Icons ── */
const iconMap: Record<string, any> = {
  Phone, Target, Users, Megaphone, Cog, BarChart3, FileText, ShieldCheck,
}

/* ── Complexity config ── */
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
/* ── Industry filter config ── */
const industries = [
  { id: 'alle', label: 'Alle bransjer', icon: Sparkles },
  { id: 'bygg', label: 'Bygg & Håndverk', icon: Hammer },
  { id: 'eiendom', label: 'Eiendom', icon: Home },
  { id: 'salong', label: 'Salong & Skjønnhet', icon: Scissors },
  { id: 'bil', label: 'Bilverksted', icon: Car },
  { id: 'reiseliv', label: 'Reiseliv', icon: Plane },
]

/* Map automations to relevant industries by keyword matching */
const industryKeywords: Record<string, string[]> = {
  bygg: ['befaring', 'prosjekt', 'underentreprenør', 'HMS', 'bygge', 'håndverk', 'elektriker', 'rørlegger', 'maler', 'snekker', 'anbud', 'timer'],
  eiendom: ['visning', 'bolig', 'megler', 'kjøper', 'selger', 'eiendom', 'prospekt', 'takst', 'leie', 'utleie'],
  salong: ['salong', 'klipper', 'behandling', 'time', 'frisør', 'skjønnhet', 'spa', 'barbershop', 'hårklipp'],
  bil: ['verksted', 'bil', 'EU-kontroll', 'dekk', 'service', 'reperasjon', 'deler', 'garanti'],
  reiseliv: ['booking', 'gjest', 'overnatting', 'hotell', 'hytte', 'restaurant', 'bestilling', 'kanal', 'channel', 'sesong'],
}

function matchesIndustry(auto: ServiceAutomation, industryId: string): boolean {
  if (industryId === 'alle') return true
  const keywords = industryKeywords[industryId] || []
  const text = `${auto.name} ${auto.desc} ${auto.benefit}`.toLowerCase()
  return keywords.some(kw => text.includes(kw.toLowerCase()))
}

/* ── Total counts ── */
const totalAutomations = serviceCategories.reduce((sum, cat) => sum + cat.automations.length, 0)

/* ── Animated counter ── */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const duration = 1500
          const stepTime = 16
          const steps = duration / stepTime
          const increment = target / steps
          const timer = setInterval(() => {
            start += increment
            if (start >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, stepTime)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, hasAnimated])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ── Single automation card ── */
function AutomationItem({ auto, index }: { auto: ServiceAutomation; index: number }) {
  const CIcon = complexityIcon[auto.complexity] || Zap
  const cColor = complexityColor[auto.complexity] || '#fbbf24'

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.02, 0.3) }}
      style={{
        padding: '16px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
      }}
    >
      <CheckCircle2 size={16} color={gold} style={{ marginTop: 3, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#f4f1eb' }}>
            {auto.name}
          </span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            fontSize: 10, color: cColor, fontWeight: 500,
            background: `${cColor}12`, borderRadius: 12, padding: '2px 8px',
          }}>
            <CIcon size={10} />
            {auto.complexity}
          </span>
          {auto.implTime && (
            <span style={{
              fontSize: 10, color: 'rgba(255,255,255,0.4)',
              background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '2px 8px',
            }}>
              {auto.implTime}
            </span>
          )}
        </div>
        {auto.desc && (
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.5 }}>
            {auto.desc}
          </p>
        )}
        {auto.benefit && (
          <p style={{ fontSize: 12, color: gold, margin: '4px 0 0', lineHeight: 1.5, opacity: 0.7 }}>
            ✦ {auto.benefit}
          </p>
        )}
      </div>

    </motion.div>
  )
}

/* ── Category accordion card ── */
function CategoryCard({ cat, isOpen, onToggle, index, searchQuery, industryFilter }: {
  cat: typeof serviceCategories[0]
  isOpen: boolean
  onToggle: () => void
  index: number
  searchQuery: string
  industryFilter: string
}) {
  const Icon = iconMap[cat.icon] || Cog
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  const filtered = useMemo(() => {
    let items = cat.automations
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      items = items.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.desc.toLowerCase().includes(q) ||
        a.benefit.toLowerCase().includes(q)
      )
    }
    if (industryFilter !== 'alle') {
      items = items.filter(a => matchesIndustry(a, industryFilter))
    }
    return items
  }, [cat.automations, searchQuery, industryFilter])

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [isOpen, filtered])

  if (filtered.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ delay: Math.min(index * 0.04, 0.3) }}
      layout
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          background: isOpen
            ? `linear-gradient(135deg, ${cardBg}, rgba(${goldRgb},0.05))`
            : cardBg,
          borderRadius: isOpen ? '16px 16px 0 0' : 16,
          padding: '20px 24px',
          border: `1px solid rgba(${goldRgb},${isOpen ? '0.2' : '0.06'})`,
          borderBottom: isOpen ? 'none' : `1px solid rgba(${goldRgb},0.06)`,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          transition: 'all 0.3s ease',
          textAlign: 'left',
          color: '#f4f1eb',
        }}
        className={isOpen ? '' : 'tjeneste-card'}
      >
        <div style={{
          width: 48, height: 48, borderRadius: 12, flexShrink: 0,
          background: `rgba(${goldRgb},${isOpen ? '0.15' : '0.06'})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.3s',
        }}>
          <Icon size={24} color={gold} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>
              {cat.title}
            </h3>
            <span style={{
              fontSize: 11, color: gold, fontWeight: 600,
              background: `rgba(${goldRgb},0.08)`, borderRadius: 20,
              padding: '3px 10px', whiteSpace: 'nowrap',
            }}>
              {filtered.length} løsninger
            </span>
          </div>
          {!isOpen && (
            <p style={{
              fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '4px 0 0',
              lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis',
              display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' as any,
            }}>
              {cat.desc}
            </p>
          )}
        </div>

        <ChevronDown
          size={20}
          color="rgba(255,255,255,0.35)"
          style={{
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            flexShrink: 0,
          }}
        />
      </button>

      {/* Expanded content */}
      <div style={{
        overflow: 'hidden',
        maxHeight: isOpen ? contentHeight + 40 : 0,
        transition: 'max-height 0.4s ease',
      }}>
        <div
          ref={contentRef}
          style={{
            background: cardBg,
            borderRadius: '0 0 16px 16px',
            padding: '0 0 20px',
            borderLeft: `1px solid rgba(${goldRgb},0.2)`,
            borderRight: `1px solid rgba(${goldRgb},0.2)`,
            borderBottom: `1px solid rgba(${goldRgb},0.2)`,
          }}
        >
          {/* Description */}
          <div style={{
            padding: '16px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
          }}>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.6 }}>
              {cat.desc}
            </p>
          </div>

          {/* Automations list */}
          <div style={{ padding: '0 4px' }}>
            {filtered.map((auto, i) => (
              <AutomationItem key={auto.name} auto={auto} index={i} />
            ))}
          </div>

          {/* CTA inside */}
          <div style={{
            margin: '16px 24px 0',
            paddingTop: 16,
            borderTop: '1px solid rgba(255,255,255,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 12,
          }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
              Tilpasset din bedrift — kontakt oss for pris
            </span>
            <Link href="/kartlegging" className="cta-shimmer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 20px', borderRadius: 10, fontWeight: 600,
              fontSize: 13, textDecoration: 'none', color: bg,
            }}>
              Finn det som passer deg <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════ */
export default function TjenesterPage() {
  const [lang] = useState<'no' | 'en'>('no')
  const [openId, setOpenId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [industryFilter, setIndustryFilter] = useState('alle')
  const searchRef = useRef<HTMLInputElement>(null)

  const toggle = (id: string) => setOpenId(prev => prev === id ? null : id)

  /* Count visible automations */
  const visibleCount = useMemo(() => {
    let count = 0
    serviceCategories.forEach(cat => {
      cat.automations.forEach(a => {
        const matchesSearch = !searchQuery ||
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.benefit.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesInd = industryFilter === 'alle' || matchesIndustry(a, industryFilter)
        if (matchesSearch && matchesInd) count++
      })
    })
    return count
  }, [searchQuery, industryFilter])

  return (
    <div style={{ background: bg, minHeight: '100vh', color: '#f4f1eb' }}>
      <Nav />

      {/* ── Hero ── */}
      <section style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '80px 24px 24px',
        textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 16 }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 12, fontWeight: 600, color: gold,
            background: `rgba(${goldRgb},0.08)`, borderRadius: 20,
            padding: '6px 14px', letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}>
            <Bot size={14} />
            Komplett automatiseringskatalog
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          style={{
            fontSize: 'clamp(30px, 5vw, 48px)',
            fontWeight: 700,
            marginBottom: 16,
            lineHeight: 1.15,
          }}
        >
          Alt vi kan <span style={{ color: gold }}>automatisere</span> for deg
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            fontSize: 17,
            color: 'rgba(255,255,255,0.65)',
            maxWidth: 560,
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          {totalAutomations}+ ferdige løsninger fordelt på {serviceCategories.length} kategorier.
          Søk, filtrer, og finn automatiseringene som passer din bedrift.
        </motion.p>
      </section>

      {/* ── Stats bar ── */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '24px 24px 32px' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 12,
          }}
          className="grid-2"
        >
          {[
            { value: totalAutomations, suffix: '+', label: 'Automatiseringer', icon: Zap },
            { value: serviceCategories.length, suffix: '', label: 'Kategorier', icon: BarChart3 },
            { value: 5, suffix: '', label: 'Bransjer', icon: Target },
            { value: 30, suffix: '%+', label: 'Spart arbeidstid', icon: TrendingUp },
          ].map((stat, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -3, borderColor: `rgba(${goldRgb},0.2)`, transition: { duration: 0.2 } }}
              style={{
                background: cardBg,
                borderRadius: 14,
                padding: '20px 16px',
                textAlign: 'center',
                border: `1px solid rgba(${goldRgb},0.06)`,
                cursor: 'default',
              }}
              className="stat-card-hover"
            >
              <stat.icon size={20} color={gold} style={{ marginBottom: 8 }} className="stat-icon" />
              <div style={{ fontSize: 28, fontWeight: 700, color: gold, lineHeight: 1 }}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Search & Filter ── */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 12px' }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
        >
          {/* Search bar */}
          <div style={{
            position: 'relative',
            background: cardBg,
            borderRadius: 14,
            border: `1px solid rgba(${goldRgb},0.08)`,
            overflow: 'hidden',
          }}>
            <Search
              size={18}
              color="rgba(255,255,255,0.3)"
              style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              ref={searchRef}
              type="text"
              placeholder="Søk i alle automatiseringer..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 44px 14px 44px',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#f4f1eb',
                fontSize: 15,
              }}
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(''); searchRef.current?.focus() }}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 8,
                  padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                  color: 'rgba(255,255,255,0.5)', fontSize: 11,
                }}
              >
                <X size={12} />
                Tøm
              </button>
            )}
          </div>

          {/* Industry filter pills */}
          <div style={{
            display: 'flex', gap: 8, flexWrap: 'wrap',
            alignItems: 'center',
          }}>
            <Filter size={14} color="rgba(255,255,255,0.3)" style={{ marginRight: 4 }} />
            {industries.map(ind => {
              const active = industryFilter === ind.id
              return (
                <button
                  key={ind.id}
                  onClick={() => setIndustryFilter(active ? 'alle' : ind.id)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '7px 14px', borderRadius: 10,
                    fontSize: 12, fontWeight: 500, cursor: 'pointer',
                    border: active
                      ? `1px solid rgba(${goldRgb},0.4)`
                      : '1px solid rgba(255,255,255,0.06)',
                    background: active
                      ? `rgba(${goldRgb},0.12)`
                      : 'rgba(255,255,255,0.02)',
                    color: active ? gold : 'rgba(255,255,255,0.5)',
                    transition: 'all 0.2s',
                  }}
                  className="filter-pill"
                >
                  <ind.icon size={13} />
                  {ind.label}
                </button>
              )
            })}
          </div>

          {/* Result count */}
          {(searchQuery || industryFilter !== 'alle') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                fontSize: 13, color: 'rgba(255,255,255,0.45)',
                display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              <span style={{ color: gold, fontWeight: 600 }}>{visibleCount}</span>
              {visibleCount === 1 ? 'automatisering' : 'automatiseringer'} funnet
              {searchQuery && (
                <span> for «{searchQuery}»</span>
              )}
              {industryFilter !== 'alle' && (
                <span> i {industries.find(i => i.id === industryFilter)?.label}</span>
              )}
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* ── Complexity legend ── */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '12px 24px 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{
            background: `rgba(${goldRgb},0.03)`,
            border: `1px solid rgba(${goldRgb},0.08)`,
            borderRadius: 14,
            padding: '14px 20px',
            display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>
            Kompleksitet:
          </span>
          {[
            { level: 'Lav', color: '#4ade80', icon: Zap, desc: 'Rask implementering' },
            { level: 'Middels', color: '#fbbf24', icon: Clock, desc: 'Flere integrasjoner' },
            { level: 'Høy', color: '#f87171', icon: AlertTriangle, desc: 'Full tilpasning' },
          ].map(c => (
            <div key={c.level} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                fontSize: 11, color: c.color, fontWeight: 600,
                background: `${c.color}12`, borderRadius: 8, padding: '3px 8px',
              }}>
                <c.icon size={11} />
                {c.level}
              </span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                {c.desc}
              </span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Categories accordion ── */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 60px' }}>
        <AnimatePresence mode="popLayout">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {serviceCategories.map((cat, i) => (
              <CategoryCard
                key={cat.id}
                cat={cat}
                isOpen={openId === cat.id}
                onToggle={() => toggle(cat.id)}
                index={i}
                searchQuery={searchQuery}
                industryFilter={industryFilter}
              />
            ))}
          </div>
        </AnimatePresence>

        {/* No results */}
        {visibleCount === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center', padding: '60px 20px',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            <Search size={40} style={{ marginBottom: 16, opacity: 0.3 }} />
            <p style={{ fontSize: 16, fontWeight: 500, margin: '0 0 8px' }}>
              Ingen automatiseringer funnet
            </p>
            <p style={{ fontSize: 14, margin: 0 }}>
              Prøv et annet søkeord eller fjern filteret
            </p>
            <button
              onClick={() => { setSearchQuery(''); setIndustryFilter('alle') }}
              style={{
                marginTop: 16, padding: '8px 20px', borderRadius: 10,
                background: `rgba(${goldRgb},0.1)`, border: `1px solid rgba(${goldRgb},0.2)`,
                color: gold, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}
            >
              Nullstill filtre
            </button>
          </motion.div>
        )}
      </section>

      {/* ── How it works ── */}
      <section style={{
        maxWidth: 900, margin: '0 auto', padding: '20px 24px 60px',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            background: cardBg,
            borderRadius: 20,
            padding: '48px 32px',
            border: `1px solid rgba(${goldRgb},0.06)`,
          }}
        >
          <h2 style={{
            fontSize: 24, fontWeight: 600, textAlign: 'center', marginBottom: 40,
          }}>
            Slik kommer du i gang
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
            className="grid-3"
          >
            {[
              {
                step: '1',
                title: 'Gratis kartlegging',
                desc: 'Vi analyserer bedriften din og finner de mest verdifulle automatiseringene.',
                icon: Target,
              },
              {
                step: '2',
                title: 'Vi bygger løsningen',
                desc: 'Alt settes opp og tilpasses dine systemer. Du trenger ikke gjøre noe teknisk.',
                icon: Cog,
              },
              {
                step: '3',
                title: 'Du sparer tid og penger',
                desc: 'Automatiseringene kjører 24/7. Du fokuserer på det som virkelig teller.',
                icon: TrendingUp,
              },
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                style={{ textAlign: 'center', padding: '0 8px' }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 + 0.1, type: 'spring', stiffness: 200 }}
                  style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: `rgba(${goldRgb},0.08)`,
                    border: `2px solid rgba(${goldRgb},0.2)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <s.icon size={24} color={gold} />
                </motion.div>
                <h4 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 8px' }}>
                  <span style={{ color: gold }}>{s.step}.</span> {s.title}
                </h4>
                <p style={{
                  fontSize: 13, color: 'rgba(255,255,255,0.55)',
                  margin: 0, lineHeight: 1.6,
                }}>
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 80px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
          background: `linear-gradient(135deg, rgba(${goldRgb},0.06), ${cardBg})`,
          borderRadius: 20,
          padding: '56px 32px',
          border: `1px solid rgba(${goldRgb},0.12)`,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Subtle glow */}
          <div style={{
            position: 'absolute', top: -80, right: -80,
            width: 200, height: 200, borderRadius: '50%',
            background: `radial-gradient(circle, rgba(${goldRgb},0.08), transparent)`,
          }} />

          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12, position: 'relative' }}>
            Usikker på hva du trenger?
          </h2>
          <p style={{
            fontSize: 16, color: 'rgba(255,255,255,0.65)', marginBottom: 28,
            lineHeight: 1.6, maxWidth: 480, margin: '0 auto 28px',
            position: 'relative',
          }}>
            Start med en gratis kartlegging — vi finner automatiseringene som gir størst effekt for akkurat din bedrift.
          </p>
          <div style={{
            display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap',
            position: 'relative',
          }}>
            <Link href="/kartlegging" className="cta-shimmer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', borderRadius: 12, fontWeight: 600,
              fontSize: 15, textDecoration: 'none', color: bg,
            }}>
              Start gratis kartlegging <ArrowRight size={16} />
            </Link>
            <a href="tel:+4778896386" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', borderRadius: 12, fontWeight: 600,
              fontSize: 15, textDecoration: 'none', color: gold,
              border: `1px solid rgba(${goldRgb},0.3)`,
              background: 'transparent',
              transition: 'all 0.3s',
            }}
              className="gold-hover"
            >
              <Phone size={16} /> Ring oss
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />

      <style jsx global>{`
        .tjeneste-card:hover {
          border-color: rgba(${goldRgb}, 0.15) !important;
          background: linear-gradient(135deg, ${cardBg}, rgba(${goldRgb},0.03)) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15), 0 0 12px rgba(${goldRgb},0.04);
        }
        .filter-pill:hover {
          border-color: rgba(${goldRgb}, 0.2) !important;
          background: rgba(${goldRgb}, 0.06) !important;
          color: ${gold} !important;
          transform: translateY(-1px);
        }
        .stat-card-hover:hover .stat-icon {
          transform: scale(1.15) rotate(8deg);
          transition: transform 0.3s ease;
        }
        .stat-icon {
          transition: transform 0.3s ease;
        }
        .gold-hover:hover {
          background: rgba(${goldRgb}, 0.06) !important;
          transform: translateY(-1px);
        }
        input::placeholder {
          color: rgba(255,255,255,0.3);
        }
      `}</style>
    </div>
  )
}
