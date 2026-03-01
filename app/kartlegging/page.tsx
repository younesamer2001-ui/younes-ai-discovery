'use client'

import { useState, useEffect, useCallback, useRef, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Check, Sparkles, Package, Shield, Phone, CalendarDays, Zap, Clock, AlertTriangle,
} from 'lucide-react'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'
import {
  pricingAutomations, pricingIndustries, PricingAutomation,
  PRICING, getDiscountRate, formatKr,
} from '@/lib/pricing'
import { gold, goldRgb, fonts, BOOKING_URL } from '@/lib/constants'
import { useLanguage } from '@/lib/language-context'

import { buildQuestions, getCompliance } from './lib/questionnaire'
import { scoreAutomation, getRecommendations } from './lib/recommendations'
import { bgDark, cardBg, cardBorder, textPrimary, textSecondary, textMuted, MISSED_DEFAULTS, JOB_VALUE_DEFAULT, fmtNOK, complexityColor } from './lib/constants'
import { t, T } from './translations'
import { AnimNum } from './components/AnimNum'
import { AutoRow } from './components/AutoRow'
import { Phase1Contact } from './components/Phase1Contact'
import { Phase2Questionnaire } from './components/Phase2Questionnaire'

type BillingMode = 'monthly' | 'annual'

const complexityIcon: Record<string, any> = {
  'Lav': Zap,
  'Middels': Clock,
  'Høy': AlertTriangle,
}

function KartleggingApp() {
  const { lang } = useLanguage()
  const searchParams = useSearchParams()

  // State
  const [phase, setPhase] = useState(1)
  const [contact, setContact] = useState({ company: '', name: '', email: '', phone: '' })
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [otherIndustry, setOtherIndustry] = useState('')
  const [roiInputs, setRoiInputs] = useState({ missed: 8, jobValue: JOB_VALUE_DEFAULT, convRate: 25 })
  const [aiSummary, setAiSummary] = useState('')
  const [generating, setGenerating] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [refNumber, setRefNumber] = useState('')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [billing, setBilling] = useState<BillingMode>('monthly')
  const [showResumeBanner, setShowResumeBanner] = useState(false)

  // Pre-select from URL
  useEffect(() => {
    const b = searchParams.get('bransje')
    if (b && pricingIndustries.some(ind => ind.toLowerCase().includes(b.toLowerCase()))) {
      const match = pricingIndustries.find(ind => ind.toLowerCase().includes(b.toLowerCase()))
      if (match) setAnswers(prev => ({ ...prev, industry: match }))
    }
  }, [searchParams])

  // Resume from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kartlegging_v2')
      if (saved) {
        const d = JSON.parse(saved)
        if (d.contact?.email && d.phase > 1 && d.phase < 8) setShowResumeBanner(true)
      }
    } catch {}
  }, [])

  const resumeProgress = () => {
    try {
      const saved = localStorage.getItem('kartlegging_v2')
      if (saved) {
        const d = JSON.parse(saved)
        if (d.contact) setContact(d.contact)
        if (d.answers) setAnswers(d.answers)
        if (d.step !== undefined) setStep(d.step)
        if (d.phase) setPhase(d.phase)
        if (d.selectedIds) setSelectedIds(new Set(d.selectedIds))
        if (d.billing) setBilling(d.billing)
      }
    } catch {}
    setShowResumeBanner(false)
  }

  const dismissResume = () => { localStorage.removeItem('kartlegging_v2'); setShowResumeBanner(false) }

  useEffect(() => {
    if (phase >= 2 && phase < 8) {
      try {
        localStorage.setItem('kartlegging_v2', JSON.stringify({
          contact, answers, step, phase, selectedIds: Array.from(selectedIds), billing,
        }))
      } catch {}
    }
    if (phase === 8) localStorage.removeItem('kartlegging_v2')
  }, [contact, answers, step, phase, selectedIds, billing])

  const questions = buildQuestions(lang)
  const selectedIndustry = answers.industry || ''

  // Automations for selected industry
  const industryAutomations = useMemo(() =>
    selectedIndustry ? pricingAutomations.filter(a => a.industry === selectedIndustry) : [],
    [selectedIndustry]
  )

  // Recommendations
  const { recommended, others: otherAutomations } = useMemo(
    () => getRecommendations(industryAutomations, answers),
    [industryAutomations, answers]
  )

  // Auto-select recommended
  const hasAutoSelected = useRef(false)
  useEffect(() => {
    if (phase === 3 && recommended.length > 0 && !hasAutoSelected.current) {
      hasAutoSelected.current = true
      setSelectedIds(prev => {
        const next = new Set(prev)
        recommended.forEach(r => next.add(r.name))
        return next
      })
    }
  }, [phase, recommended])

  // Selected automations
  const selectedAutomations = useMemo(() =>
    industryAutomations.filter(a => selectedIds.has(a.name)),
    [industryAutomations, selectedIds]
  )

  // Pricing
  const count = selectedAutomations.length
  const discountRate = getDiscountRate(count)
  const totalSetup = selectedAutomations.reduce((s, a) => s + a.setupPrice, 0)
  const totalMonthlyRaw = selectedAutomations.reduce((s, a) => s + a.monthlyPrice, 0)
  const monthlyAfterQuantity = totalMonthlyRaw * (1 - discountRate)
  const monthlyFinal = billing === 'annual' ? monthlyAfterQuantity * (1 - PRICING.annualDiscount) : monthlyAfterQuantity
  const annualTotal = monthlyFinal * 12

  useEffect(() => {
    const missedKey = answers.missed || 'unsure'
    setRoiInputs(prev => ({ ...prev, missed: MISSED_DEFAULTS[missedKey] || 8 }))
  }, [answers.missed])

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
  const validatePhone = (p: string) => /^[\d\s+()-]{8,}$/.test(p.trim())

  const handleContactSubmit = () => {
    if (!contact.company.trim() || !contact.name.trim() || !contact.email.trim() || !contact.phone.trim()) return
    if (!validateEmail(contact.email)) { setEmailError(lang === 'no' ? 'Ugyldig e-postadresse' : 'Invalid email'); return }
    if (!validatePhone(contact.phone)) { setPhoneError(lang === 'no' ? 'Ugyldig telefonnummer' : 'Invalid phone'); return }
    setEmailError(''); setPhoneError('')
    setPhase(2)
  }

  const currentQ = questions[step]
  const canNext = () => {
    if (!currentQ) return false
    const a = answers[currentQ.id]
    if (currentQ.optional) return true
    if (currentQ.type === 'text') return a && a.trim().length > 0
    if (currentQ.type === 'single') return !!a
    if (currentQ.type === 'multi') return Array.isArray(a) && a.length > 0
    return false
  }

  const handleAnswer = (qId: string, value: string, type: string) => {
    if (type === 'single') {
      setAnswers(p => ({ ...p, [qId]: value }))
    } else if (type === 'multi') {
      setAnswers(p => {
        const prev = p[qId] || []
        const max = currentQ?.max
        if (prev.includes(value)) return { ...p, [qId]: prev.filter((v: string) => v !== value) }
        if (max && prev.length >= max) return p
        return { ...p, [qId]: [...prev, value] }
      })
    } else {
      setAnswers(p => ({ ...p, [qId]: value }))
    }
  }

  const nextStep = () => { if (step < questions.length - 1) setStep(step + 1); else setPhase(3) }
  const prevStep = () => { if (step > 0) setStep(step - 1); else setPhase(1) }

  const toggleAutomation = (name: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name); else next.add(name)
      return next
    })
  }

  // ROI
  const roiCalc = () => {
    const lostMonth = roiInputs.missed * roiInputs.jobValue * (roiInputs.convRate / 100)
    return { lostMonth: Math.round(lostMonth), lostYear: Math.round(lostMonth * 12) }
  }
  const roi = roiCalc()

  // Generate summary
  const generateSummary = async () => {
    setGenerating(true)
    const prompt = `Du er en AI-forretningsrådgiver for Arxon, et norsk selskap som selger AI-automatisering til SMB-er. Generer en profesjonell analyse på norsk:\n\nBedrift: ${contact.company}\nBransje: ${selectedIndustry}\nStørrelse: ${answers.size}\nØnsker å frigjøre tid på: ${(answers.pain || []).join(', ')}\nNåværende systemer: ${(answers.tech || []).join(', ')}\nKundekontaktmetoder: ${(answers.contact_methods || []).join(', ')}\nHenvendelser ikke fulgt opp: ${answers.missed}\nInvesteringsvilje: ${answers.investment}\nTidslinje: ${answers.timeline}\nDrømmescenario: ${answers.goals || 'Ikke spesifisert'}\nValgte automasjoner: ${Array.from(selectedIds).join(', ') || 'Ingen valgt'}\nTilleggsinformasjon: ${answers.additional || 'Ingen'}\n\nGi analyse i dette formatet:\nOPPSUMMERING: 3-4 setninger\nANBEFALINGER: 3-5 spesifikke AI-løsninger\nPRIORITET: Hvilken løsning bør implementeres først\nESTIMERT ROI: Forventet avkastning`

    try {
      const res = await fetch('/api/kartlegging', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'analyze', prompt }),
      })
      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      setAiSummary(data.summary || '')
    } catch {
      const topAutos = selectedAutomations.slice(0, 3)
      setAiSummary(
        `OPPSUMMERING:\n${contact.company} er en ${selectedIndustry.toLowerCase()}-bedrift med ${answers.size} ansatte. Basert på kartleggingen ser vi betydelige muligheter for effektivisering.\n\nANBEFALINGER:\n${topAutos.map((a, i) => `${i + 1}. ${a.name}: ${a.desc}`).join('\n')}\n\nPRIORITET:\nVi anbefaler å starte med ${topAutos[0]?.name || 'den enkleste automatiseringen'} da dette gir raskest avkastning.\n\nPOTENSIAL:\nEstimert tapt omsetning uten AI: ca. ${fmtNOK(roi.lostYear)} årlig.\nAnbefalt månedspris: ${formatKr(Math.round(monthlyFinal))}/mnd med ${count} automatiseringer.`
      )
    }
    setGenerating(false)
    setPhase(6)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/kartlegging', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'submit', contact,
          answers: { ...answers, industryOther: otherIndustry },
          selectedAutomations: Array.from(selectedIds),
          aiSummary, pricing: { totalSetup, monthlyFinal: Math.round(monthlyFinal), billing, count, discountRate },
          language: lang,
        }),
      })
      const data = await res.json()
      setRefNumber(data.refNumber || 'ARX-' + Math.random().toString(36).substr(2, 8).toUpperCase())
    } catch {
      setRefNumber('ARX-' + Math.random().toString(36).substr(2, 8).toUpperCase())
    }
    setSubmitting(false); setPhase(8)
  }

  // Styles
  const cardStyle: React.CSSProperties = { background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 16, padding: '28px 24px' }
  const btnPrimary: React.CSSProperties = {
    background: `linear-gradient(110deg, ${gold} 0%, #e0c88a 25%, ${gold} 50%, #a8884d 75%, ${gold} 100%)`,
    backgroundSize: '200% 100%', color: bgDark, border: 'none', borderRadius: 12,
    padding: '14px 32px', fontWeight: 600, fontSize: 16, cursor: 'pointer',
    fontFamily: fonts.body, width: '100%', transition: 'all 0.2s',
  }
  const btnSecondary: React.CSSProperties = {
    background: 'transparent', color: textSecondary, border: `1px solid ${cardBorder}`,
    borderRadius: 10, padding: '10px 20px', fontWeight: 500, fontSize: 14, cursor: 'pointer', fontFamily: fonts.body,
  }

  const pageV = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
  }

  return (
    <div style={{ background: bgDark, minHeight: '100vh', color: textPrimary, fontFamily: fonts.body }}>
      <Nav />

      {/* Resume banner */}
      <AnimatePresence>
        {showResumeBanner && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{
              maxWidth: 720, margin: '12px auto 0', padding: '12px 20px',
              background: `rgba(${goldRgb},0.1)`, border: `1px solid rgba(${goldRgb},0.25)`,
              borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap',
            }}>
            <span style={{ fontSize: 14 }}>{t('resume_banner', lang)}</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={resumeProgress} className="cta-shimmer" style={{
                color: bgDark, border: 'none', borderRadius: 8, padding: '6px 16px',
                fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: fonts.body,
              }}>{t('resume_continue', lang)}</button>
              <button onClick={dismissResume} style={{ ...btnSecondary, padding: '6px 12px', fontSize: 13 }}>{t('resume_restart', lang)}</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px 20px 60px' }}>
        <AnimatePresence mode="wait">

          {/* PHASE 1 */}
          {phase === 1 && (
            <Phase1Contact
              contact={contact}
              setContact={setContact}
              emailError={emailError}
              setEmailError={setEmailError}
              phoneError={phoneError}
              setPhoneError={setPhoneError}
              onSubmit={handleContactSubmit}
            />
          )}

          {/* PHASE 2 */}
          {phase === 2 && currentQ && (
            <Phase2Questionnaire
              step={step}
              questions={questions}
              currentQ={currentQ}
              answers={answers}
              canNext={canNext}
              onAnswer={handleAnswer}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}

          {/* PHASE 3: RESULTS */}
          {phase === 3 && (
            <motion.div key="p3" variants={pageV} initial="initial" animate="animate" exit="exit">
              <div style={{ marginTop: 32, marginBottom: 24, textAlign: 'center' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: `rgba(${goldRgb},0.08)`, border: `1px solid rgba(${goldRgb},0.15)`,
                  borderRadius: 24, padding: '6px 16px', fontSize: 13, color: gold, marginBottom: 16, fontWeight: 500,
                }}>
                  <Package size={14} /> {selectedIndustry}
                </motion.div>
                <h2 style={{ fontSize: 'clamp(22px, 4vw, 30px)', fontWeight: 700, marginBottom: 8 }}>{t('results_title', lang)}</h2>
                <p style={{ color: textSecondary, fontSize: 14, maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
                  {t('results_desc', lang)}
                </p>
              </div>

              {/* ROI Calculator */}
              <div style={{ ...cardStyle, marginBottom: 24, padding: '24px' }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Sparkles size={18} color={gold} /> {t('roi_title', lang)}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 13, color: textSecondary, display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span>{t('roi_missed', lang)}</span><span style={{ color: gold }}>{roiInputs.missed}</span>
                    </label>
                    <input type="range" min={1} max={100} value={roiInputs.missed} onChange={e => setRoiInputs({ ...roiInputs, missed: +e.target.value })} style={{ width: '100%', accentColor: gold }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, color: textSecondary, display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span>{t('roi_value', lang)}</span><span style={{ color: gold }}>{roiInputs.jobValue.toLocaleString('nb-NO')}</span>
                    </label>
                    <input type="range" min={200} max={100000} step={100} value={roiInputs.jobValue} onChange={e => setRoiInputs({ ...roiInputs, jobValue: +e.target.value })} style={{ width: '100%', accentColor: gold }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, color: textSecondary, display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span>{t('roi_conv', lang)}</span><span style={{ color: gold }}>{roiInputs.convRate}%</span>
                    </label>
                    <input type="range" min={5} max={80} value={roiInputs.convRate} onChange={e => setRoiInputs({ ...roiInputs, convRate: +e.target.value })} style={{ width: '100%', accentColor: gold }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 20 }}>
                  <div style={{ background: `rgba(${goldRgb},0.04)`, borderRadius: 10, padding: 16, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: textMuted, marginBottom: 6 }}>{t('roi_lost_month', lang)}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#ef4444' }}><AnimNum value={roi.lostMonth} suffix=" kr" /></div>
                  </div>
                  <div style={{ background: `rgba(${goldRgb},0.04)`, borderRadius: 10, padding: 16, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: textMuted, marginBottom: 6 }}>{t('roi_lost_year', lang)}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#ef4444' }}><AnimNum value={roi.lostYear} suffix=" kr" /></div>
                  </div>
                </div>
              </div>

              {/* Package Builder - Automations list and pricing */}
              <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 300 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <label style={{ fontSize: 14, fontWeight: 600 }}>
                      {t('select_automations', lang)} ({industryAutomations.length} {t('available', lang)})
                    </label>
                    {count > 0 && <span style={{ fontSize: 12, color: gold, fontWeight: 500 }}>{count} {t('selected', lang)}</span>}
                  </div>

                  {/* Recommended */}
                  {recommended.length > 0 && (
                    <div style={{ marginBottom: 20 }}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10,
                        padding: '8px 14px', borderRadius: 10,
                        background: `linear-gradient(135deg, rgba(${goldRgb},0.08), rgba(${goldRgb},0.03))`,
                        border: `1px solid rgba(${goldRgb},0.15)`,
                      }}>
                        <Sparkles size={15} color={gold} />
                        <span style={{ fontSize: 14, fontWeight: 600, color: gold }}>{t('recommended_for_you', lang)}</span>
                        <span style={{ fontSize: 11, color: textMuted, marginLeft: 'auto' }}>{t('based_on_answers', lang)}</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {recommended.map(auto => (
                          <AutoRow key={auto.name} auto={auto} selected={selectedIds.has(auto.name)} onToggle={() => toggleAutomation(auto.name)} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Other automations */}
                  {otherAutomations.length > 0 && (
                    <div>
                      {recommended.length > 0 && (
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10,
                          padding: '6px 14px',
                        }}>
                          <Package size={14} color={textMuted} />
                          <span style={{ fontSize: 13, fontWeight: 500, color: textSecondary }}>{t('other_automations', lang)}</span>
                        </div>
                      )}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {otherAutomations.map(auto => (
                          <AutoRow key={auto.name} auto={auto} selected={selectedIds.has(auto.name)} onToggle={() => toggleAutomation(auto.name)} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Price summary panel */}
                <div style={{ width: 300, flexShrink: 0, position: 'sticky', top: 80 }}>
                  <div style={{ background: cardBg, borderRadius: 16, border: `1px solid rgba(${goldRgb},0.12)`, overflow: 'hidden' }}>
                    <div style={{ background: `rgba(${goldRgb},0.06)`, padding: '18px 20px', borderBottom: `1px solid rgba(${goldRgb},0.1)` }}>
                      <div style={{ fontSize: 16, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Sparkles size={18} color={gold} /> {t('your_package', lang)}
                      </div>
                    </div>
                    <div style={{ padding: 20 }}>
                      {/* Billing toggle */}
                      <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 3, marginBottom: 20 }}>
                        <button onClick={() => setBilling('monthly')} style={{
                          flex: 1, padding: '8px 12px', borderRadius: 6, border: 'none',
                          background: billing === 'monthly' ? `rgba(${goldRgb},0.15)` : 'transparent',
                          color: billing === 'monthly' ? gold : 'rgba(255,255,255,0.5)',
                          fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
                        }}>{t('monthly', lang)}</button>
                        <button onClick={() => setBilling('annual')} style={{
                          flex: 1, padding: '8px 12px', borderRadius: 6, border: 'none',
                          background: billing === 'annual' ? `rgba(${goldRgb},0.15)` : 'transparent',
                          color: billing === 'annual' ? gold : 'rgba(255,255,255,0.5)',
                          fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', position: 'relative',
                        }}>
                          {t('annual', lang)}
                          <span style={{ position: 'absolute', top: -8, right: -4, background: '#4ade80', color: bgDark, fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 10 }}>-20%</span>
                        </button>
                      </div>

                      {count === 0 ? (
                        <p style={{ fontSize: 14, color: textMuted, textAlign: 'center', padding: '20px 0' }}>{t('select_to_see_price', lang)}</p>
                      ) : (
                        <>
                          <div style={{ marginBottom: 16 }}>
                            {selectedAutomations.slice(0, 5).map(a => (
                              <div key={a.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 12, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                <span style={{ color: 'rgba(255,255,255,0.7)', flex: 1, marginRight: 8 }}>{a.name}</span>
                                <span style={{ color: textMuted, whiteSpace: 'nowrap' }}>{formatKr(a.monthlyPrice)}</span>
                              </div>
                            ))}
                            {count > 5 && <div style={{ fontSize: 11, color: textMuted, marginTop: 4 }}>+ {count - 5} {t('more', lang)}</div>}
                          </div>

                          <div style={{ borderTop: `1px solid rgba(${goldRgb},0.1)`, paddingTop: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                              <span style={{ color: textSecondary }}>{t('setup_cost', lang)}</span>
                              <span style={{ fontWeight: 500 }}>{formatKr(totalSetup)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                              <span style={{ color: textSecondary }}>{t('monthly_price', lang)} ({count} {t('pcs', lang)})</span>
                              <span>{formatKr(totalMonthlyRaw)}</span>
                            </div>
                            {discountRate > 0 && (
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                                <span style={{ color: '#4ade80' }}>{t('quantity_discount', lang)} ({Math.round(discountRate * 100)}%)</span>
                                <span style={{ color: '#4ade80' }}>-{formatKr(Math.round(totalMonthlyRaw * discountRate))}</span>
                              </div>
                            )}
                            {billing === 'annual' && (
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                                <span style={{ color: '#4ade80' }}>{t('annual_discount', lang)} (20%)</span>
                                <span style={{ color: '#4ade80' }}>-{formatKr(Math.round(monthlyAfterQuantity * 0.20))}</span>
                              </div>
                            )}
                          </div>

                          <div style={{ background: `rgba(${goldRgb},0.06)`, borderRadius: 10, padding: 14, marginTop: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                              <span style={{ fontSize: 13, color: textSecondary }}>{billing === 'annual' ? t('per_month_annual', lang) : t('per_month', lang)}</span>
                              <span style={{ fontSize: 22, fontWeight: 700, color: gold }}>{formatKr(Math.round(monthlyFinal))}</span>
                            </div>
                            {billing === 'annual' && (
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                                <span style={{ fontSize: 12, color: textMuted }}>{t('annual_total', lang)}</span>
                                <span style={{ fontSize: 13, color: textSecondary }}>{formatKr(Math.round(annualTotal))}</span>
                              </div>
                            )}
                          </div>

                          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <span style={{ fontSize: 11, color: textMuted, display: 'flex', alignItems: 'center', gap: 6 }}>
                              <Shield size={11} /> {t('no_binding', lang)}
                            </span>
                            {billing === 'annual' && (
                              <span style={{ fontSize: 11, color: '#4ade80', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Shield size={11} /> {t('open_purchase', lang)}
                              </span>
                            )}
                            <span style={{ fontSize: 11, color: textMuted, display: 'flex', alignItems: 'center', gap: 6 }}>
                              <Phone size={11} /> {t('support_included', lang)}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Compliance */}
              <div style={{ ...cardStyle, marginTop: 24, marginBottom: 24, padding: '22px' }}>
                <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Shield size={16} color={gold} /> {t('compliance_title', lang)}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {getCompliance(lang, t).map((c, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <Check size={12} color="#4ade80" style={{ marginTop: 3, flexShrink: 0 }} />
                      <div>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{c.title}</span>
                        <span style={{ fontSize: 12.5, color: textSecondary }}> — {c.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                style={{ ...btnPrimary, opacity: count > 0 ? 1 : 0.4 }}
                disabled={count === 0}
                onClick={() => setPhase(5)}>
                {t('generate_btn', lang)} <ArrowRight size={16} style={{ display: 'inline', marginLeft: 6, verticalAlign: 'middle' }} />
              </button>
              {count === 0 && (
                <p style={{ textAlign: 'center', fontSize: 13, color: textMuted, marginTop: 8 }}>{t('select_min_one', lang)}</p>
              )}
            </motion.div>
          )}

          {/* PHASE 5: GENERATING */}
          {phase === 5 && (
            <motion.div key="p5" variants={pageV} initial="initial" animate="animate" exit="exit" style={{ textAlign: 'center', marginTop: 120 }}>
              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: `linear-gradient(135deg, ${gold}, #a8884d)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 24px', fontSize: 22, fontWeight: 700, color: bgDark,
                }}>AI</motion.div>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>{t('generating', lang)}</h2>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 20 }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: gold, animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                ))}
              </div>
              {!generating && !aiSummary && <div style={{ display: 'none' }}>{(() => { setTimeout(() => generateSummary(), 500); return '' })()}</div>}
              <style>{`@keyframes pulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}`}</style>
            </motion.div>
          )}

          {/* PHASE 6: AI SUMMARY + BOOKING */}
          {phase === 6 && (
            <motion.div key="p6" variants={pageV} initial="initial" animate="animate" exit="exit">
              <div style={{ marginTop: 32, marginBottom: 24, textAlign: 'center' }}>
                <h2 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 700 }}>{t('summary_title', lang)}</h2>
              </div>
              <div style={{ ...cardStyle, marginBottom: 24 }}>
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: fonts.body, fontSize: 14, lineHeight: 1.65, color: textSecondary }}>{aiSummary}</pre>
              </div>

              {count > 0 && (
                <div style={{ ...cardStyle, marginBottom: 24, padding: '20px' }}>
                  <span style={{ fontSize: 15, fontWeight: 600, display: 'block', marginBottom: 12 }}>{t('your_package', lang)} ({count} {t('package_count', lang)})</span>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                    <div style={{ background: `rgba(${goldRgb},0.04)`, borderRadius: 10, padding: 14, textAlign: 'center' }}>
                      <div style={{ fontSize: 11, color: textMuted, marginBottom: 4 }}>{t('engangskostnad', lang)}</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: gold }}>{formatKr(totalSetup)}</div>
                    </div>
                    <div style={{ background: `rgba(${goldRgb},0.04)`, borderRadius: 10, padding: 14, textAlign: 'center' }}>
                      <div style={{ fontSize: 11, color: textMuted, marginBottom: 4 }}>{t('monthly_price', lang)}</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: gold }}>{formatKr(Math.round(monthlyFinal))}{t('mnd', lang)}</div>
                    </div>
                  </div>
                  {selectedAutomations.map((a, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '5px 0' }}>
                      <Check size={12} color={gold} />
                      <span style={{ fontSize: 13 }}>{a.name}</span>
                      <span style={{ fontSize: 11, color: textMuted, marginLeft: 'auto' }}>{formatKr(a.monthlyPrice)}{t('mnd', lang)}</span>
                    </div>
                  ))}
                </div>
              )}

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                style={{ ...cardStyle, marginBottom: 24, padding: '32px 24px', textAlign: 'center', border: `1.5px solid ${gold}`, background: `rgba(${goldRgb},0.04)` }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{t('book_call', lang)}</h3>
                <p style={{ fontSize: 13.5, color: textSecondary, marginBottom: 20, lineHeight: 1.55 }}>
                  {t('book_desc', lang)}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320, margin: '0 auto' }}>
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="cta-shimmer"
                    onClick={() => { if (!submitting && !refNumber) handleSubmit() }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 20px', borderRadius: 10, fontWeight: 600, fontSize: 14, textDecoration: 'none', color: bgDark }}>
                    <CalendarDays size={16} /> {t('book_calendar', lang)}
                  </a>
                  <button style={{ ...btnSecondary, fontSize: 13 }} onClick={() => { if (!submitting && !refNumber) handleSubmit(); setPhase(8) }}>
                    {t('send_without_booking', lang)}
                  </button>
                </div>
                <div style={{ marginTop: 16 }}>
                  {[t('book_trust1', lang), t('book_trust2', lang), t('book_trust3', lang)].map((s, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 4 }}>
                      <Check size={11} color="#4ade80" />
                      <span style={{ fontSize: 12.5, color: textMuted }}>{s}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* PHASE 8: CONFIRMATION */}
          {phase === 8 && (
            <motion.div key="p8" variants={pageV} initial="initial" animate="animate" exit="exit" style={{ textAlign: 'center', marginTop: 60 }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: `rgba(${goldRgb},0.12)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 24px', border: `2px solid ${gold}`,
                }}>
                <Check size={28} color={gold} />
              </motion.div>
              <h2 style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 700, marginBottom: 12 }}>{t('confirm_title', lang)}</h2>
              <div style={{ ...cardStyle, display: 'inline-block', padding: '10px 24px', marginBottom: 20 }}>
                <span style={{ fontSize: 13, color: textMuted }}>{t('confirm_ref', lang)}: </span>
                <span style={{ fontSize: 15, fontWeight: 600, color: gold, letterSpacing: 1 }}>{refNumber}</span>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                style={{ ...cardStyle, maxWidth: 500, margin: '0 auto 28px', padding: '32px 28px', border: `1.5px solid ${gold}`, background: `rgba(${goldRgb},0.04)` }}>
                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{t('book_call', lang)}</h3>
                <p style={{ color: textSecondary, fontSize: 14, lineHeight: 1.6, marginBottom: 24, maxWidth: 380, margin: '0 auto 24px' }}>
                  {t('confirm_desc', lang)}
                </p>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="cta-shimmer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    color: bgDark, borderRadius: 12, padding: '16px 36px', fontWeight: 700, fontSize: 16,
                    textDecoration: 'none', boxShadow: `0 8px 32px rgba(${goldRgb},0.25)`,
                  }}>
                  <CalendarDays size={18} /> {t('choose_time', lang)}
                </a>
                <p style={{ fontSize: 12, color: textMuted, marginTop: 14 }}>{t('confirm_time', lang)}</p>
              </motion.div>

              <div style={{ ...cardStyle, textAlign: 'left', maxWidth: 500, margin: '0 auto' }}>
                <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>{t('next_steps', lang)}</h4>
                {[t('next_step1', lang), t('next_step2', lang), t('next_step3', lang)].map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'center' }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: '50%',
                      background: `rgba(${goldRgb},0.1)`, color: gold,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700, flexShrink: 0,
                    }}>{i + 1}</div>
                    <p style={{ fontSize: 13.5, color: textSecondary, lineHeight: 1.5, margin: 0 }}>{s}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <Footer />

      <style jsx global>{`
        @media (max-width: 768px) {
          .price-summary-panel {
            width: 100% !important;
            position: static !important;
            order: -1;
          }
        }
      `}</style>
    </div>
  )
}

function KartleggingFallback() {
  return (
    <div style={{ minHeight: '100vh', background: bgDark, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: 48, height: 48, border: `3px solid rgba(${goldRgb},0.15)`, borderTopColor: gold, borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: 24 }} />
      <div style={{ color: gold, fontSize: 18, fontFamily: fonts.body, marginBottom: 8 }}>{t('loading', 'no')}</div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

export default function KartleggingPage() {
  return (
    <Suspense fallback={<KartleggingFallback />}>
      <KartleggingApp />
    </Suspense>
  )
}
