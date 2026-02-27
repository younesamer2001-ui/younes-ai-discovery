'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Phone, Users, Target, Megaphone,
  Cog, BarChart3, FileText, ShieldCheck,
  ChevronDown, CheckCircle2, Clock, Zap, AlertTriangle,
} from 'lucide-react'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'
import { serviceCategories } from '@/lib/services'

const gold = '#efc07b'
const goldRgb = '239,192,123'
const bgDark = '#0f1b27'
const cardBg = '#16213e'

const iconMap: Record<string, any> = {
  Phone, Target, Users, Megaphone, Cog, BarChart3, FileText, ShieldCheck,
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

/* ── Single category accordion ── */
function CategoryCard({ cat, isOpen, onToggle, index }: {
  cat: typeof serviceCategories[0]
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  const Icon = iconMap[cat.icon] || Cog
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [isOpen])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.4) }}
    >
      {/* Card header — clickable */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          background: isOpen ? `linear-gradient(135deg, ${cardBg}, rgba(${goldRgb},0.04))` : cardBg,
          borderRadius: isOpen ? '16px 16px 0 0' : 16,
          padding: '24px 24px',
          border: `1px solid rgba(${goldRgb},${isOpen ? '0.2' : '0.08'})`,
          borderBottom: isOpen ? 'none' : `1px solid rgba(${goldRgb},0.08)`,
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
          background: `rgba(${goldRgb},${isOpen ? '0.15' : '0.08'})`,
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
              {cat.automations.length} løsninger
            </span>
          </div>
          {!isOpen && (
            <p style={{
              fontSize: 13, color: 'rgba(255,255,255,0.55)', margin: '6px 0 0',
              lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis',
              display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' as any,
            }}>
              {cat.desc}
            </p>
          )}
        </div>

        <ChevronDown
          size={20}
          color="rgba(255,255,255,0.4)"
          style={{
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            flexShrink: 0,
          }}
        />
      </button>

      {/* Expanded content */}
      <div
        style={{
          overflow: 'hidden',
          maxHeight: isOpen ? contentHeight + 40 : 0,
          transition: 'max-height 0.4s ease',
        }}
      >
        <div
          ref={contentRef}
          style={{
            background: cardBg,
            borderRadius: '0 0 16px 16px',
            padding: '0 24px 24px',
            borderLeft: `1px solid rgba(${goldRgb},0.2)`,
            borderRight: `1px solid rgba(${goldRgb},0.2)`,
            borderBottom: `1px solid rgba(${goldRgb},0.2)`,
          }}
        >
          {/* Description */}
          <p style={{
            fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6,
            padding: '16px 0', margin: 0,
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}>
            {cat.desc}
          </p>

          {/* Automations list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {cat.automations.map((auto, i) => {
              const CIcon = complexityIcon[auto.complexity] || Zap
              const cColor = complexityColor[auto.complexity] || '#fbbf24'
              return (
                <div
                  key={i}
                  style={{
                    padding: '14px 0',
                    borderBottom: i < cat.automations.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                  }}
                >
                  <CheckCircle2 size={16} color={gold} style={{ marginTop: 2, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#f4f1eb' }}>
                        {auto.name}
                      </span>
                      {auto.complexity && (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 4,
                          fontSize: 10, color: cColor, fontWeight: 500,
                          background: `${cColor}12`, borderRadius: 12, padding: '2px 8px',
                        }}>
                          <CIcon size={10} />
                          {auto.complexity}
                        </span>
                      )}
                      {auto.implTime && (
                        <span style={{
                          fontSize: 10, color: 'rgba(255,255,255,0.35)',
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
                      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: '4px 0 0', lineHeight: 1.5, fontStyle: 'italic' }}>
                        {auto.benefit}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA inside expanded */}
          <div style={{
            marginTop: 16, paddingTop: 16,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            textAlign: 'center',
          }}>
            <Link href="/kartlegging" className="cta-shimmer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 24px', borderRadius: 10, fontWeight: 600,
              fontSize: 13, textDecoration: 'none', color: bgDark,
            }}>
              Se hva som passer din bedrift <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Main page ── */
export default function TjenesterPage() {
  const [lang] = useState<'no' | 'en'>('no')
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenId(prev => prev === id ? null : id)
  }

  return (
    <div style={{ background: bgDark, minHeight: '100vh', color: '#f4f1eb' }}>
      <Nav />

      {/* Hero */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 48px', textAlign: 'center' }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, marginBottom: 16, lineHeight: 1.2 }}
        >
          Hva vi <span style={{ color: gold }}>automatiserer</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}
        >
          200+ ferdige automatiseringer fordelt på 8 kategorier.
          Trykk på en kategori for å se alle løsningene.
        </motion.p>
      </section>

      {/* Categories accordion */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 60px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {serviceCategories.map((cat, i) => (
            <CategoryCard
              key={cat.id}
              cat={cat}
              isOpen={openId === cat.id}
              onToggle={() => toggle(cat.id)}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px 60px' }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, textAlign: 'center', marginBottom: 32 }}>
          Slik kommer du i gang
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            { step: '1', title: 'Gratis kartlegging', desc: 'Vi analyserer bedriften din og finner de mest verdifulle automatiseringene.' },
            { step: '2', title: 'Vi bygger løsningen', desc: 'Alt settes opp og tilpasses dine systemer. Du trenger ikke gjøre noe teknisk.' },
            { step: '3', title: 'Du sparer tid og penger', desc: 'Automatiseringene kjører 24/7. Du fokuserer på det som virkelig teller.' },
          ].map((s, i) => (
            <div key={i} style={{
              display: 'flex', gap: 20, alignItems: 'flex-start',
              padding: '20px 0',
              borderLeft: `2px solid rgba(${goldRgb},0.2)`,
              marginLeft: 20,
              paddingLeft: 28,
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', left: -14, top: 18,
                width: 28, height: 28, borderRadius: '50%',
                background: bgDark, border: `2px solid ${gold}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: gold,
              }}>
                {s.step}
              </div>
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 4px' }}>{s.title}</h4>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            </div>
          ))}
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
            Usikker på hva du trenger?
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', marginBottom: 24, lineHeight: 1.6 }}>
            Start med en gratis kartlegging. Vi finner de automatiseringene som gir størst effekt for akkurat din bedrift.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/kartlegging" className="cta-shimmer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', borderRadius: 12, fontWeight: 600,
              fontSize: 15, textDecoration: 'none', color: bgDark,
            }}>
              Start kartlegging <ArrowRight size={16} />
            </Link>
            <Link href="/bransjer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', borderRadius: 12, fontWeight: 600,
              fontSize: 15, textDecoration: 'none', color: gold,
              border: `1px solid rgba(${goldRgb},0.3)`,
              background: 'transparent',
            }}>
              Se alle bransjer <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer lang={lang} />

      <style jsx global>{`
        .tjeneste-card:hover {
          border-color: rgba(${goldRgb}, 0.2) !important;
          background: linear-gradient(135deg, ${cardBg}, rgba(${goldRgb},0.03)) !important;
        }
      `}</style>
    </div>
  )
}
