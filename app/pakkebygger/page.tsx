'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Check, ChevronDown, Zap, Clock, AlertTriangle, Package,
  CalendarDays, ShoppingCart, Shield, Phone, Sparkles, X, Info,
  Bot, BarChart3, CheckCircle2, TrendingUp, Users,
} from 'lucide-react'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'
import {
  pricingAutomations, pricingIndustries, PricingAutomation,
  PRICING, getDiscountRate, formatKr,
} from '@/lib/pricing'

const gold = '#efc07b'
const goldRgb = '239,192,123'
const bgDark = '#0f1b27'
const cardBg = '#16213e'

const complexityColor: Record<string, string> = {
  'Lav': '#4ade80', 'Middels': '#fbbf24', 'Høy': '#f87171',
}
const complexityIcon: Record<string, any> = {
  'Lav': Zap, 'Middels': Clock, 'Høy': AlertTriangle,
}

type BillingMode = 'monthly' | 'annual'

function AutomationRow({
  auto, selected, onToggle,
}: {
  auto: PricingAutomation; selected: boolean; onToggle: () => void
}) {
  const [showInfo, setShowInfo] = useState(false)
  const CIcon = complexityIcon[auto.complexity] || Zap
  const cColor = complexityColor[auto.complexity] || '#fbbf24'

  return (
    <div style={{
      background: selected ? `rgba(${goldRgb},0.06)` : cardBg,
      borderRadius: 12,
      border: `1px solid ${selected ? `rgba(${goldRgb},0.25)` : 'rgba(255,255,255,0.06)'}`,
      transition: 'all 0.2s',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '14px 16px', cursor: 'pointer',
      }} onClick={onToggle}>
        {/* Checkbox */}
        <div style={{
          width: 22, height: 22, borderRadius: 6, flexShrink: 0,
          background: selected ? gold : 'transparent',
          border: `2px solid ${selected ? gold : 'rgba(255,255,255,0.2)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s',
        }}>
          {selected && <Check size={14} color={bgDark} strokeWidth={3} />}
        </div>

        {/* Name + category */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#f4f1eb' }}>
            {auto.name}
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
            {auto.category}
          </div>
        </div>

        {/* Complexity badge */}
        <span style={{
          display: 'flex', alignItems: 'center', gap: 4,
          fontSize: 11, color: cColor, fontWeight: 500,
          background: `${cColor}12`, borderRadius: 16, padding: '2px 8px',
          whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          <CIcon size={11} /> {auto.complexity}
        </span>

        {/* Price */}
        <div style={{ textAlign: 'right', flexShrink: 0, minWidth: 80 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: gold }}>
            {formatKr(auto.monthlyPrice)}
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>/mnd</div>
        </div>

        {/* Info toggle */}
        <button
          onClick={e => { e.stopPropagation(); setShowInfo(!showInfo) }}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.3)', padding: 4, flexShrink: 0,
          }}
        >
          <Info size={16} />
        </button>
      </div>

      {/* Expandable info */}
      <div style={{
        maxHeight: showInfo ? 200 : 0, overflow: 'hidden',
        transition: 'max-height 0.3s ease',
      }}>
        <div style={{ padding: '0 16px 14px', borderTop: `1px solid rgba(255,255,255,0.04)` }}>
          {auto.desc && (
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: '10px 0 0', lineHeight: 1.5 }}>
              {auto.desc}
            </p>
          )}
          {auto.benefit && (
            <p style={{
              fontSize: 12, color: `rgba(${goldRgb},0.75)`, margin: '8px 0 0',
              lineHeight: 1.4, fontStyle: 'italic',
            }}>
              {auto.benefit}
            </p>
          )}
          <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
            <span>Oppsett: {formatKr(auto.setupPrice)}</span>
            <span>Implementering: {auto.implTime}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PakkebyggerPage() {
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [billing, setBilling] = useState<BillingMode>('monthly')
  const [showDropdown, setShowDropdown] = useState(false)
  const [showSummary, setShowSummary] = useState(false)

  const industryAutomations = useMemo(() =>
    selectedIndustry
      ? pricingAutomations.filter(a => a.industry === selectedIndustry)
      : [],
    [selectedIndustry]
  )

  const selectedAutomations = useMemo(() =>
    industryAutomations.filter(a => selectedIds.has(a.name)),
    [industryAutomations, selectedIds]
  )

  const count = selectedAutomations.length
  const discountRate = getDiscountRate(count)
  const totalSetup = selectedAutomations.reduce((s, a) => s + a.setupPrice, 0)
  const totalMonthlyRaw = selectedAutomations.reduce((s, a) => s + a.monthlyPrice, 0)
  const monthlyAfterQuantity = totalMonthlyRaw * (1 - discountRate)
  const monthlyFinal = billing === 'annual'
    ? monthlyAfterQuantity * (1 - PRICING.annualDiscount)
    : monthlyAfterQuantity
  const annualTotal = monthlyFinal * 12

  function toggleAutomation(name: string) {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  function selectIndustry(ind: string) {
    setSelectedIndustry(ind)
    setSelectedIds(new Set())
    setShowDropdown(false)
  }

  return (
    <div style={{ background: bgDark, minHeight: '100vh', color: '#f4f1eb' }}>
      <Nav />

      {/* Hero */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 24px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: `rgba(${goldRgb},0.08)`, border: `1px solid rgba(${goldRgb},0.15)`,
            borderRadius: 24, padding: '6px 16px', fontSize: 13, color: gold,
            marginBottom: 16, fontWeight: 500,
          }}
        >
          <Package size={14} /> Bygg din egen automatiseringspakke
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          style={{ fontSize: 'clamp(26px, 5vw, 40px)', fontWeight: 700, marginBottom: 12, lineHeight: 1.2 }}
        >
          Velg automatiseringer, <span style={{ color: gold }}>se prisen live</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}
        >
          Velg din bransje, kryss av for det du trenger, og se nøyaktig hva det koster.
          Ingen skjulte kostnader.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 20,
            background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.15)',
            borderRadius: 10, padding: '10px 20px', fontSize: 14, color: '#4ade80',
          }}
        >
          <CheckCircle2 size={16} />
          <span>Bedrifter sparer typisk <strong>626 000 – 691 000 kr/år</strong> sammenlignet med å ansette</span>
        </motion.div>
      </section>

      {/* Main builder area */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 24px 40px' }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>

          {/* Left column — automations */}
          <div style={{ flex: 1, minWidth: 300 }}>

            {/* Industry selector */}
            <div style={{ marginBottom: 20, position: 'relative' }}>
              <label style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 8, display: 'block' }}>
                1. Velg din bransje
              </label>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                style={{
                  width: '100%', background: cardBg,
                  border: `1px solid rgba(${goldRgb},0.15)`, borderRadius: 10,
                  padding: '14px 16px', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', cursor: 'pointer',
                  color: selectedIndustry ? '#f4f1eb' : 'rgba(255,255,255,0.4)',
                  fontSize: 15, fontFamily: 'inherit',
                }}
              >
                {selectedIndustry || 'Velg bransje...'}
                <ChevronDown size={16} color="rgba(255,255,255,0.4)"
                  style={{ transform: showDropdown ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}
                />
              </button>

              {showDropdown && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50,
                  background: '#1a2940', border: `1px solid rgba(${goldRgb},0.15)`,
                  borderRadius: 10, marginTop: 4, maxHeight: 300, overflowY: 'auto',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                }}>
                  {pricingIndustries.map(ind => (
                    <button key={ind} onClick={() => selectIndustry(ind)} style={{
                      width: '100%', background: ind === selectedIndustry ? `rgba(${goldRgb},0.1)` : 'transparent',
                      border: 'none', borderBottom: '1px solid rgba(255,255,255,0.04)',
                      padding: '12px 16px', textAlign: 'left', cursor: 'pointer',
                      color: '#f4f1eb', fontSize: 14, fontFamily: 'inherit',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = `rgba(${goldRgb},0.08)`}
                    onMouseLeave={e => e.currentTarget.style.background = ind === selectedIndustry ? `rgba(${goldRgb},0.1)` : 'transparent'}
                    >
                      {ind}
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginLeft: 8 }}>
                        {pricingAutomations.filter(a => a.industry === ind).length} løsninger
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Automations list */}
            {selectedIndustry && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  marginBottom: 12,
                }}>
                  <label style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                    2. Velg automatiseringer ({industryAutomations.length} tilgjengelig)
                  </label>
                  {count > 0 && (
                    <span style={{ fontSize: 12, color: gold, fontWeight: 500 }}>
                      {count} valgt
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {industryAutomations.map(auto => (
                    <AutomationRow
                      key={auto.name}
                      auto={auto}
                      selected={selectedIds.has(auto.name)}
                      onToggle={() => toggleAutomation(auto.name)}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {!selectedIndustry && (
              <div style={{
                background: cardBg, borderRadius: 16, padding: '60px 24px', textAlign: 'center',
                border: '1px dashed rgba(255,255,255,0.1)',
              }}>
                <Package size={40} color="rgba(255,255,255,0.15)" style={{ marginBottom: 16 }} />
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)' }}>
                  Velg en bransje for å se tilgjengelige automatiseringer
                </p>
              </div>
            )}
          </div>

          {/* Right column — price summary (sticky) */}
          <div style={{
            width: 320, flexShrink: 0, position: 'sticky', top: 80,
          }}
          className="price-summary-panel"
          >
            <div style={{
              background: cardBg, borderRadius: 16,
              border: `1px solid rgba(${goldRgb},0.12)`,
              overflow: 'hidden',
            }}>
              {/* Header */}
              <div style={{
                background: `rgba(${goldRgb},0.06)`,
                padding: '18px 20px', borderBottom: `1px solid rgba(${goldRgb},0.1)`,
              }}>
                <div style={{ fontSize: 16, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Sparkles size={18} color={gold} />
                  Din pakke
                </div>
              </div>

              <div style={{ padding: '20px' }}>
                {/* Billing toggle */}
                <div style={{
                  display: 'flex', background: 'rgba(255,255,255,0.04)',
                  borderRadius: 8, padding: 3, marginBottom: 20,
                }}>
                  <button onClick={() => setBilling('monthly')} style={{
                    flex: 1, padding: '8px 12px', borderRadius: 6, border: 'none',
                    background: billing === 'monthly' ? `rgba(${goldRgb},0.15)` : 'transparent',
                    color: billing === 'monthly' ? gold : 'rgba(255,255,255,0.5)',
                    fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'all 0.2s',
                  }}>
                    Månedlig
                  </button>
                  <button onClick={() => setBilling('annual')} style={{
                    flex: 1, padding: '8px 12px', borderRadius: 6, border: 'none',
                    background: billing === 'annual' ? `rgba(${goldRgb},0.15)` : 'transparent',
                    color: billing === 'annual' ? gold : 'rgba(255,255,255,0.5)',
                    fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'all 0.2s', position: 'relative',
                  }}>
                    Årlig
                    <span style={{
                      position: 'absolute', top: -8, right: -4,
                      background: '#4ade80', color: bgDark, fontSize: 10, fontWeight: 700,
                      padding: '1px 6px', borderRadius: 10,
                    }}>
                      -20%
                    </span>
                  </button>
                </div>

                {count === 0 ? (
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '20px 0' }}>
                    Velg automatiseringer for å se prisen
                  </p>
                ) : (
                  <>
                    {/* Items */}
                    <div style={{ marginBottom: 16 }}>
                      {selectedAutomations.map(a => (
                        <div key={a.name} style={{
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          padding: '6px 0', fontSize: 13,
                          borderBottom: '1px solid rgba(255,255,255,0.04)',
                        }}>
                          <span style={{ color: 'rgba(255,255,255,0.7)', flex: 1, marginRight: 8 }}>
                            {a.name}
                          </span>
                          <span style={{ color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap', fontSize: 12 }}>
                            {formatKr(a.monthlyPrice)}/mnd
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Subtotals */}
                    <div style={{ borderTop: `1px solid rgba(${goldRgb},0.1)`, paddingTop: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                        <span style={{ color: 'rgba(255,255,255,0.5)' }}>Engangskostnad oppsett</span>
                        <span style={{ color: '#f4f1eb', fontWeight: 500 }}>{formatKr(totalSetup)}</span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                        <span style={{ color: 'rgba(255,255,255,0.5)' }}>Månedspris ({count} stk)</span>
                        <span style={{ color: '#f4f1eb' }}>{formatKr(totalMonthlyRaw)}</span>
                      </div>

                      {discountRate > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                          <span style={{ color: '#4ade80' }}>Kvantumsrabatt ({Math.round(discountRate * 100)}%)</span>
                          <span style={{ color: '#4ade80' }}>-{formatKr(totalMonthlyRaw * discountRate)}</span>
                        </div>
                      )}

                      {billing === 'annual' && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                          <span style={{ color: '#4ade80' }}>Årsrabatt (20%)</span>
                          <span style={{ color: '#4ade80' }}>-{formatKr(monthlyAfterQuantity * 0.20)}</span>
                        </div>
                      )}
                    </div>

                    {/* Total */}
                    <div style={{
                      background: `rgba(${goldRgb},0.06)`, borderRadius: 10,
                      padding: '14px', marginTop: 12,
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                          {billing === 'annual' ? 'Per måned (årlig)' : 'Per måned'}
                        </span>
                        <span style={{ fontSize: 22, fontWeight: 700, color: gold }}>
                          {formatKr(Math.round(monthlyFinal))}
                        </span>
                      </div>
                      {billing === 'annual' && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Årlig totalt</span>
                          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{formatKr(Math.round(annualTotal))}</span>
                        </div>
                      )}
                      {billing === 'monthly' && totalMonthlyRaw !== monthlyFinal && (
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4, textDecoration: 'line-through' }}>
                          {formatKr(totalMonthlyRaw)}/mnd uten rabatt
                        </div>
                      )}
                    </div>

                    {/* CTA buttons */}
                    <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <Link href="/kartlegging" className="cta-shimmer" style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        padding: '14px 20px', borderRadius: 10, fontWeight: 600,
                        fontSize: 14, textDecoration: 'none', color: bgDark,
                      }}>
                        <ShoppingCart size={16} /> Bestill denne pakken
                      </Link>

                      <Link href="/kartlegging" style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        padding: '12px 20px', borderRadius: 10, fontWeight: 500,
                        fontSize: 13, textDecoration: 'none',
                        color: gold, border: `1px solid rgba(${goldRgb},0.2)`,
                        transition: 'all 0.2s',
                      }}>
                        <CalendarDays size={15} /> Book et gratis rådgivningsmøte
                      </Link>
                    </div>

                    {/* Trust */}
                    <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Shield size={11} /> Ingen binding — kanseller når som helst
                      </span>
                      {billing === 'annual' && (
                        <span style={{ fontSize: 11, color: '#4ade80', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Shield size={11} /> 14 dagers åpent kjøp ved årlig betaling
                        </span>
                      )}
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Phone size={11} /> Norsk support inkludert
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 80px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, textAlign: 'center', marginBottom: 32 }}>
          Slik fungerer det
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {[
            { step: '1', title: 'Velg', desc: 'Velg bransje og kryss av for automatiseringene du trenger' },
            { step: '2', title: 'Bestill eller book', desc: 'Bestill pakken direkte eller book et gratis rådgivningsmøte' },
            { step: '3', title: 'Vi setter opp', desc: 'Arxon bygger og tester alt — ferdig på 1-2 uker' },
            { step: '4', title: 'Alt fungerer', desc: '30 dager med full støtte og oppfølging etter lansering' },
          ].map(s => (
            <div key={s.step} style={{
              background: cardBg, borderRadius: 14, padding: '24px 20px',
              border: `1px solid rgba(${goldRgb},0.06)`, textAlign: 'center',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: `rgba(${goldRgb},0.1)`, color: gold,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, fontWeight: 700, margin: '0 auto 12px',
              }}>
                {s.step}
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Employee cost comparison */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 60px' }}>
        <h2 style={{
          fontSize: 'clamp(20px, 4vw, 26px)', fontWeight: 700, textAlign: 'center', marginBottom: 8,
        }}>
          Slipp å ansette — <span style={{ color: gold }}>automatiser i stedet</span>
        </h2>
        <p style={{
          fontSize: 14, color: 'rgba(255,255,255,0.5)', textAlign: 'center',
          maxWidth: 560, margin: '0 auto 28px', lineHeight: 1.6,
        }}>
          Mange bedrifter vurderer å ansette for å håndtere telefoner, booking eller oppfølging.
          Med Arxon løser du det samme — til en brøkdel av prisen.
          Alle tall er verifisert mot SSB og Altinn, og inkluderer lønn, 14.1% arbeidsgiveravgift, 12% feriepenger og 2% OTP.
        </p>

        <div style={{
          background: cardBg, borderRadius: 14, overflow: 'hidden',
          border: `1px solid rgba(${goldRgb},0.08)`,
        }}>
          {/* Table header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
            padding: '14px 20px', background: `rgba(${goldRgb},0.04)`,
            borderBottom: `1px solid rgba(${goldRgb},0.08)`,
            fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)',
            gap: 8,
          }}>
            <span>Oppgave</span>
            <span style={{ textAlign: 'right' }}>Ansatt (årlig)</span>
            <span style={{ textAlign: 'right' }}>Arxon (årlig)</span>
            <span style={{ textAlign: 'right', color: '#4ade80' }}>Du sparer</span>
          </div>

          {/* Rows — calculated from real pricing: Lav=2000/mnd, Middels=4290/mnd, annual discount 20% */}
          {[
            { role: 'Telefon & mottak', detail: 'AI-telefonsvarer + booking', annualCost: '751 000', arxonRange: '60 000 – 75 000', savingRange: '676 000 – 691 000' },
            { role: 'Kundeservice & support', detail: 'Chatbot + auto-svar + FAQ', annualCost: '726 000', arxonRange: '80 000 – 100 000', savingRange: '626 000 – 646 000' },
            { role: 'Booking & kalender', detail: 'Auto-booking + påminnelser', annualCost: '697 000', arxonRange: '38 000 – 48 000', savingRange: '649 000 – 659 000' },
            { role: 'Lead-oppfølging & salg', detail: 'Scoring + CRM + follow-up', annualCost: '761 000', arxonRange: '82 000 – 103 000', savingRange: '658 000 – 679 000' },
          ].map((row, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
              padding: '14px 20px', gap: 8,
              borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              fontSize: 13,
            }}>
              <div>
                <span style={{ color: '#f4f1eb', fontWeight: 500 }}>{row.role}</span>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{row.detail}</div>
              </div>
              <span style={{ textAlign: 'right', color: 'rgba(255,255,255,0.5)' }}>kr {row.annualCost}</span>
              <span style={{ textAlign: 'right', color: gold, fontWeight: 500 }}>kr {row.arxonRange}</span>
              <span style={{ textAlign: 'right', color: '#4ade80', fontWeight: 600 }}>kr {row.savingRange}</span>
            </div>
          ))}

          {/* Summary row */}
          <div style={{
            padding: '16px 20px', background: `rgba(74,222,128,0.04)`,
            borderTop: `1px solid rgba(74,222,128,0.1)`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 8,
          }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#f4f1eb' }}>
                Typisk besparelse per automatisert område
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                Kilde: SSB & Altinn 2024/25. Inkl. lønn, 14.1% AGA, 12% feriepenger, 2% OTP.
              </div>
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#4ade80' }}>
              626 000 – 691 000 kr/år
            </div>
          </div>
        </div>
      </section>

      {/* Why setup fee */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 60px' }}>
        <h2 style={{
          fontSize: 'clamp(20px, 4vw, 26px)', fontWeight: 700, textAlign: 'center', marginBottom: 8,
        }}>
          Hvorfor engangs <span style={{ color: gold }}>setup-fee?</span>
        </h2>
        <p style={{
          fontSize: 14, color: 'rgba(255,255,255,0.5)', textAlign: 'center',
          maxWidth: 520, margin: '0 auto 28px', lineHeight: 1.6,
        }}>
          Du investerer i en skreddersydd AI-løsning — ikke et ferdigprodukt fra hylla.
          Setup-fee dekker alt det arbeidet som gjør at AI-en faktisk leverer resultater.
        </p>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14,
        }}>
          {[
            { Icon: Bot, title: 'Skreddersydd AI-opplæring', desc: 'Vi trener AI-en på din bedrift, dine tjenester, priser og vanlige spørsmål — så den svarer som en av dine egne.' },
            { Icon: Zap, title: 'Integrasjon med dine systemer', desc: 'Vi kobler AI til kalender, CRM, regnskap og de verktøyene du allerede bruker — alt satt opp for deg.' },
            { Icon: Shield, title: 'Testing og kvalitetssikring', desc: 'Vi tester alt grundig før lansering og justerer til du er 100% fornøyd med hvordan AI-en representerer bedriften din.' },
            { Icon: BarChart3, title: 'Lavere løpende kostnader', desc: 'Høyere setup-fee = lavere månedskostnad. Du investerer i en skikkelig løsning, og sparer mer over tid.' },
          ].map((card, i) => (
            <div key={i} style={{
              background: cardBg, borderRadius: 14, padding: '24px 20px',
              border: `1px solid rgba(${goldRgb},0.06)`,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: `rgba(${goldRgb},0.08)`, display: 'flex',
                alignItems: 'center', justifyContent: 'center', marginBottom: 14,
              }}>
                <card.Icon size={20} color={gold} />
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{card.title}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{card.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Guarantee */}
      <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{
          background: `rgba(${goldRgb},0.03)`, borderRadius: 16,
          border: `1px solid rgba(${goldRgb},0.1)`, padding: '36px 28px',
          textAlign: 'center',
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: `rgba(${goldRgb},0.08)`, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <Shield size={26} color={gold} />
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>
            Fornøyd-garanti
          </h3>
          <p style={{
            fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7,
            maxWidth: 520, margin: '0 auto 20px',
          }}>
            Vi justerer og optimaliserer til du er 100% fornøyd med løsningen.
            Ved årsbetaling får du 30 dagers pengene-tilbake-garanti.
            Månedlig drift har ingen bindingstid — du kan avslutte når som helst.
          </p>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center',
          }}>
            {['30 dagers garanti ved årsbetaling', 'Ingen bindingstid på månedlig', 'GDPR-sikret', 'Norsk datasenter'].map((item, i) => (
              <span key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: `rgba(${goldRgb},0.06)`, border: `1px solid rgba(${goldRgb},0.1)`,
                borderRadius: 20, padding: '6px 14px', fontSize: 12,
                color: gold, fontWeight: 500,
              }}>
                <Check size={13} /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile sticky bar */}
      {count > 0 && (
        <div className="mobile-price-bar" style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          background: cardBg, borderTop: `1px solid rgba(${goldRgb},0.15)`,
          padding: '12px 20px', display: 'none',
          alignItems: 'center', justifyContent: 'space-between',
          zIndex: 50,
        }}>
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{count} valgt</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: gold }}>{formatKr(Math.round(monthlyFinal))}/mnd</div>
          </div>
          <Link href="/kartlegging" className="cta-shimmer" style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '10px 20px', borderRadius: 10, fontWeight: 600,
            fontSize: 13, textDecoration: 'none', color: bgDark,
          }}>
            Bestill <ArrowRight size={14} />
          </Link>
        </div>
      )}

      <Footer lang="no" />

      <style jsx global>{`
        @media (max-width: 768px) {
          .price-summary-panel {
            width: 100% !important;
            position: static !important;
            order: -1;
            display: ${count > 0 ? 'block' : 'none'};
          }
          .mobile-price-bar {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  )
}
