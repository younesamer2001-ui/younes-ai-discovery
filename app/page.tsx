'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Phone, Zap, Shield, ChevronDown, Star,
  ClipboardList, FileText, CheckCircle2, Clock, Users,
  TrendingUp, Bot, CalendarCheck, BarChart3, Megaphone,
  AlertTriangle, PhoneOff, Cog, Hammer, Home as HomeIcon, Scissors,
  Car, Plane, ArrowUpRight, X, Check,
  MessageSquare, Send, Bell, Calendar, UserCheck, Receipt,
} from 'lucide-react'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'
import { gold, goldRgb, bg } from '@/lib/constants'

/* ── Design tokens ── */
const cardBg = '#0d1a2d'

/* ── GA4 event helper ── */
function trackEvent(eventName: string, params?: Record<string, string | number>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, { page_location: window.location.href, ...params })
  }
}

/* ── Animated counter ── */
function AnimCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const dur = 1400
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setVal(Math.round(ease * target))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])
  return <span ref={ref}>{val}{suffix}</span>
}

/* ── FAQ accordion ── */
function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-3" role="list" aria-label="Vanlige spørsmål">
      {items.map((item, i) => (
        <div key={i} role="listitem"
          className="glass-card cursor-pointer"
          onClick={() => setOpen(open === i ? null : i)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(open === i ? null : i) } }}
          tabIndex={0}
          aria-expanded={open === i}
          style={{ padding: '16px 20px' }}>
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-semibold" style={{ color: '#f4f1eb' }}>{item.q}</span>
            <ChevronDown size={18} className={`transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
              style={{ color: 'rgba(244,241,235,0.55)' }} aria-hidden="true" />
          </div>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                className="overflow-hidden" role="region"
              >
                <p className="text-[14px] mt-3 leading-relaxed" style={{ color: 'rgba(244,241,235,0.7)' }}>{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

/* ── Live toast ── */
function LiveToast() {
  const names = ['Martin', 'Lena', 'Erik', 'Sara', 'Jonas', 'Ida', 'Anders', 'Nora']
  const cities = ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Kristiansand', 'Tromsø']
  const actions = ['startet gratis kartlegging', 'fikk sin AI-analyse', 'booket implementering']
  const [toast, setToast] = useState<{ name: string; city: string; action: string } | null>(null)

  useEffect(() => {
    const show = () => {
      setToast({ name: names[Math.floor(Math.random() * names.length)], city: cities[Math.floor(Math.random() * cities.length)], action: actions[Math.floor(Math.random() * actions.length)] })
      setTimeout(() => setToast(null), 4000)
    }
    const first = setTimeout(show, 8000)
    const interval = setInterval(show, 22000)
    return () => { clearTimeout(first); clearInterval(interval) }
  }, [])

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="fixed bottom-20 left-4 md:bottom-6 md:left-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{ background: 'rgba(13,26,45,0.9)', border: `1px solid rgba(${goldRgb},0.15)`, backdropFilter: 'blur(12px)', maxWidth: 320 }}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `rgba(${goldRgb},0.15)`, color: gold }}>
            {toast.name[0]}
          </div>
          <div>
            <p className="text-xs" style={{ color: 'rgba(244,241,235,0.8)' }}><strong>{toast.name}</strong> fra {toast.city}</p>
            <p className="text-[11px]" style={{ color: 'rgba(244,241,235,0.6)' }}>{toast.action}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── Technology partner logos ── */
function TechLogos() {
  const logos = [
    { name: 'OpenAI', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg> },
    { name: 'Google Cloud', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0A5.993 5.993 0 0 0 0 14.108a5.993 5.993 0 0 0 5.99 5.992h12.02A5.993 5.993 0 0 0 24 14.108a5.993 5.993 0 0 0-3.01-5.19A9.344 9.344 0 0 0 12.19 2.38zm-.01 1.5a7.85 7.85 0 0 1 7.465 5.394l.263.79.806.2A4.493 4.493 0 0 1 22.5 14.1a4.493 4.493 0 0 1-4.49 4.49H5.99A4.493 4.493 0 0 1 1.5 14.1a4.493 4.493 0 0 1 2.545-4.043l.688-.332.088-.752A7.85 7.85 0 0 1 12.18 3.88z"/></svg> },
    { name: 'Twilio', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 0C5.381 0 0 5.381 0 12s5.381 12 12 12 12-5.381 12-12S18.619 0 12 0zm0 20.756c-4.831 0-8.756-3.925-8.756-8.756S7.169 3.244 12 3.244s8.756 3.925 8.756 8.756-3.925 8.756-8.756 8.756zm3.535-11.462a1.846 1.846 0 1 1 0-3.692 1.846 1.846 0 0 1 0 3.692zm0 5.538a1.846 1.846 0 1 1 0-3.692 1.846 1.846 0 0 1 0 3.692zm-7.07-5.538a1.846 1.846 0 1 1 0-3.692 1.846 1.846 0 0 1 0 3.692zm0 5.538a1.846 1.846 0 1 1 0-3.692 1.846 1.846 0 0 1 0 3.692z"/></svg> },
    { name: 'Make', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="currentColor"/></svg> },
    { name: 'Supabase', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M13.7 21.8c-.4.5-1.3.2-1.3-.5v-8.1h8.3c.8 0 1.2.9.7 1.5l-7.7 7.1zM10.3 2.2c.4-.5 1.3-.2 1.3.5v8.1H3.3c-.8 0-1.2-.9-.7-1.5l7.7-7.1z"/></svg> },
    { name: 'Vercel', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 1L24 22H0L12 1z"/></svg> },
  ]

  return (
    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
      {logos.map((logo) => (
        <div key={logo.name} className="group flex flex-col items-center gap-2 cursor-default">
          <div className="transition-all duration-300 group-hover:scale-110" style={{ color: 'rgba(244,241,235,0.4)' }}>
            {logo.svg}
          </div>
          <span className="text-[10px] tracking-widest uppercase transition-colors" style={{ color: 'rgba(244,241,235,0.55)' }}>{logo.name}</span>
        </div>
      ))}
    </div>
  )
}

/* ── ANIMATED PHONE DEMO ── */
function PhoneDemo() {
  const [step, setStep] = useState(0)
  const inViewRef = useRef<HTMLDivElement>(null)
  const inView = useInView(inViewRef, { once: false, amount: 0.4 })

  const messages = [
    { from: 'system', text: 'Innkommende anrop fra +47 912 34 567…' },
    { from: 'ai', text: 'Hei! Velkommen til Bygg & Montasje AS. Hvordan kan jeg hjelpe deg?' },
    { from: 'customer', text: 'Hei, jeg trenger tilbud på nytt bad. Er det mulig å få befaring?' },
    { from: 'ai', text: 'Selvfølgelig! Jeg ser at vi har ledig tid onsdag kl. 10:00 eller torsdag kl. 14:00. Hva passer best?' },
    { from: 'customer', text: 'Onsdag kl. 10 passer fint!' },
    { from: 'ai', text: 'Flott! Befaring booket onsdag kl. 10:00. Du får bekreftelse på SMS nå. Noe annet jeg kan hjelpe med?' },
  ]

  useEffect(() => {
    if (!inView) { setStep(0); return }
    setStep(0)
    const timers: NodeJS.Timeout[] = []
    messages.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i + 1), 1200 + i * 2000))
    })
    // Reset and loop
    timers.push(setTimeout(() => setStep(0), 1200 + messages.length * 2000 + 3000))
    const interval = setInterval(() => {
      setStep(0)
      messages.forEach((_, i) => {
        timers.push(setTimeout(() => setStep(i + 1), 1200 + i * 2000))
      })
    }, 1200 + messages.length * 2000 + 4000)
    return () => { timers.forEach(clearTimeout); clearInterval(interval) }
  }, [inView])

  return (
    <div ref={inViewRef} className="demo-phone-frame">
      {/* Phone header */}
      <div className="demo-phone-header">
        <div className="demo-phone-notch" />
        <div className="flex items-center justify-between px-5 pt-10 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `rgba(${goldRgb},0.15)` }}>
              <Bot size={14} style={{ color: gold }} />
            </div>
            <div>
              <div className="text-[12px] font-semibold" style={{ color: '#f4f1eb' }}>Arxon AI</div>
              <div className="text-[10px]" style={{ color: '#4ade80' }}>Aktiv 24/7</div>
            </div>
          </div>
          <Phone size={14} style={{ color: 'rgba(244,241,235,0.4)' }} />
        </div>
      </div>

      {/* Messages */}
      <div className="demo-phone-body">
        <AnimatePresence mode="sync">
          {messages.slice(0, step).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`demo-msg ${msg.from === 'customer' ? 'demo-msg-customer' : msg.from === 'ai' ? 'demo-msg-ai' : 'demo-msg-system'}`}
            >
              {msg.from === 'system' && <Phone size={11} className="inline mr-1.5" style={{ color: '#4ade80' }} />}
              {msg.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {step > 0 && step < messages.length && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="demo-msg demo-msg-ai demo-typing"
          >
            <span className="demo-dot" /><span className="demo-dot" /><span className="demo-dot" />
          </motion.div>
        )}
      </div>
    </div>
  )
}

/* ── AUTOMATION WORKFLOW DEMO ── */
function WorkflowDemo() {
  const [activeStep, setActiveStep] = useState(-1)
  const inViewRef = useRef<HTMLDivElement>(null)
  const inView = useInView(inViewRef, { once: false, amount: 0.4 })

  const steps = [
    { icon: <Phone size={18} />, label: 'Kunde ringer', detail: '+47 912 34 567', color: '#60a5fa' },
    { icon: <Bot size={18} />, label: 'AI svarer', detail: 'Kvalifiserer lead', color: gold },
    { icon: <Calendar size={18} />, label: 'Booking', detail: 'Onsdag kl. 10:00', color: '#a78bfa' },
    { icon: <Send size={18} />, label: 'SMS sendt', detail: 'Bekreftelse + påminnelse', color: '#4ade80' },
    { icon: <UserCheck size={18} />, label: 'Lead lagret', detail: 'CRM oppdatert', color: '#f472b6' },
    { icon: <Receipt size={18} />, label: 'Oppfølging', detail: 'Auto etter 24t', color: '#fb923c' },
  ]

  useEffect(() => {
    if (!inView) { setActiveStep(-1); return }
    setActiveStep(-1)
    const timers: NodeJS.Timeout[] = []
    steps.forEach((_, i) => {
      timers.push(setTimeout(() => setActiveStep(i), 800 + i * 1200))
    })
    // Loop
    timers.push(setTimeout(() => setActiveStep(-1), 800 + steps.length * 1200 + 2500))
    const interval = setInterval(() => {
      setActiveStep(-1)
      steps.forEach((_, i) => {
        timers.push(setTimeout(() => setActiveStep(i), 800 + i * 1200))
      })
    }, 800 + steps.length * 1200 + 3500)
    return () => { timers.forEach(clearTimeout); clearInterval(interval) }
  }, [inView])

  return (
    <div ref={inViewRef} className="demo-workflow-frame">
      <div className="demo-workflow-header">
        <Zap size={14} style={{ color: gold }} />
        <span className="text-[12px] font-semibold" style={{ color: '#f4f1eb' }}>Automatisk arbeidsflyt</span>
        <span className="demo-workflow-live">LIVE</span>
      </div>

      <div className="demo-workflow-steps">
        {steps.map((s, i) => (
          <div key={i} className="demo-workflow-step-row">
            {/* Connector line */}
            {i > 0 && (
              <div className="demo-workflow-connector">
                <motion.div
                  className="demo-workflow-connector-fill"
                  initial={{ height: 0 }}
                  animate={{ height: activeStep >= i ? '100%' : '0%' }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  style={{ background: `rgba(${goldRgb},0.3)` }}
                />
              </div>
            )}

            {/* Step */}
            <motion.div
              className="demo-workflow-step"
              animate={{
                borderColor: activeStep >= i ? s.color : 'rgba(244,241,235,0.08)',
                background: activeStep >= i ? `${s.color}10` : 'rgba(255,255,255,0.02)',
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="demo-workflow-icon"
                animate={{
                  background: activeStep >= i ? `${s.color}20` : 'rgba(244,241,235,0.05)',
                  scale: activeStep === i ? 1.1 : 1,
                }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
              >
                <span style={{ color: activeStep >= i ? s.color : 'rgba(244,241,235,0.35)' }}>{s.icon}</span>
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-semibold" style={{ color: activeStep >= i ? '#f4f1eb' : 'rgba(244,241,235,0.4)' }}>
                  {s.label}
                </div>
                <div className="text-[10px]" style={{ color: activeStep >= i ? 'rgba(244,241,235,0.6)' : 'rgba(244,241,235,0.25)' }}>
                  {s.detail}
                </div>
              </div>
              {activeStep >= i && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                  <CheckCircle2 size={14} style={{ color: s.color }} />
                </motion.div>
              )}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Bottom status */}
      <div className="demo-workflow-footer">
        <motion.div
          animate={{ width: `${Math.max(0, ((activeStep + 1) / steps.length) * 100)}%` }}
          transition={{ duration: 0.4 }}
          className="demo-workflow-progress"
          style={{ background: `linear-gradient(90deg, rgba(${goldRgb},0.4), ${gold})` }}
        />
        <div className="text-[10px] text-center pt-2" style={{ color: 'rgba(244,241,235,0.45)' }}>
          {activeStep >= 0
            ? `${activeStep + 1}/${steps.length} steg fullført — ${activeStep >= steps.length - 1 ? 'Alt automatisert!' : 'Behandler…'}`
            : 'Venter på innkommende henvendelse…'
          }
        </div>
      </div>
    </div>
  )
}

/* ── ROI DATA ── */
const roiData: Record<string, { avgDeal: number; conversion: number }> = {
  'Bygg & Håndverk': { avgDeal: 85000, conversion: 0.18 },
  'Eiendomsmegling': { avgDeal: 65000, conversion: 0.12 },
  'Salong & Skjønnhet': { avgDeal: 950, conversion: 0.65 },
  'Bilverksted & Bilforhandler': { avgDeal: 8500, conversion: 0.40 },
  'Reiseliv & Overnatting': { avgDeal: 4200, conversion: 0.50 },
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
/*           MAIN PAGE COMPONENT            */
/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function Home() {
  const router = useRouter()
  const ctaClick = useCallback(() => {
    trackEvent('CTA_Click', { button_text: 'Start gratis kartlegging', section: 'page' })
    router.push('/kartlegging')
  }, [router])

  const [roiIndustry, setRoiIndustry] = useState('Bygg & Håndverk')
  const [missedCalls, setMissedCalls] = useState(8)
  const roiEntry = roiData[roiIndustry] || roiData['Bygg & Håndverk']
  const monthlySavings = Math.round(missedCalls * 4.3 * roiEntry.avgDeal * roiEntry.conversion)

  const [showSticky, setShowSticky] = useState(false)
  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const faqItems = [
    { q: 'Hva koster det å komme i gang?', a: 'Kartleggingen er 100% gratis og uforpliktende. Etter analysen får du et skreddersydd pristilbud basert på dine behov — ingen skjulte kostnader.' },
    { q: 'Hvor lang tid tar implementeringen?', a: 'Fra signering til live tar det ca. 14 virkedager. Vi jobber grundig med oppsett, testing og tilpasning slik at alt fungerer skikkelig fra dag én.' },
    { q: 'Er det trygt med tanke på GDPR?', a: 'Absolutt. All data lagres kryptert innen EØS. Vi er GDPR-kompatible og EU AI Act-klare. Vi inngår databehandleravtale med alle kunder.' },
    { q: 'Kan jeg starte med én automatisering?', a: 'Ja! De fleste starter med AI-mobilsvarer eller auto-booking og bygger videre derfra. Du velger selv tempo og omfang.' },
    { q: 'Trenger jeg teknisk kunnskap?', a: 'Nei. Vi tar oss av alt teknisk. Du trenger bare å fortelle oss om bedriften din — så fikser vi resten.' },
    { q: 'Hva skjer etter implementering?', a: 'Du får 30 dager med full oppfølging og support. Vi finjusterer sammen basert på reelle resultater, slik at automatiseringene treffer best mulig.' },
  ]

  const sAnim = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }

  /* Stagger container for children */
  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
    viewport: { once: true },
  }

  const staggerChild = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  }

  /* Scale-in variant */
  const scaleIn = {
    initial: { opacity: 0, scale: 0.92 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }

  /* Parallax for hero */
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress: heroScrollY } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroTextY = useTransform(heroScrollY, [0, 1], [0, 100])
  const heroOpacity = useTransform(heroScrollY, [0, 0.6], [1, 0])

  return (
    <>
      <Nav />

      {/* ═══════════════════════════════════════════ */}
      {/*  BLOCK 1: HERO                              */}
      {/* ═══════════════════════════════════════════ */}
      <section ref={heroRef} className="pt-8 md:pt-20 pb-16 md:pb-28 text-center relative overflow-hidden min-h-[85vh] flex flex-col justify-center">
        <div className="hero-gradient-mesh" />
        <div className="hero-orb" />
        <div className="hero-orb-accent hero-orb-accent-1" />
        <div className="hero-orb-accent hero-orb-accent-2" />
        {/* Floating particles */}
        <div className="hero-particles" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`hero-particle hero-particle-${i + 1}`} />
          ))}
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(244,241,235,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(244,241,235,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${goldRgb},0.15), transparent)` }} />

        <motion.div className="relative z-10 max-w-3xl mx-auto px-5" style={{ y: heroTextY, opacity: heroOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 glass-card">
            <Shield size={13} style={{ color: gold }} className="anim-spin-slow" />
            <span className="text-[12px] tracking-wide" style={{ color: 'rgba(244,241,235,0.7)' }}>GDPR-kompatibel &middot; Norsk support &middot; Live på ca. 14 dager</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-[36px] md:text-[60px] font-extrabold leading-[1.08] tracking-tight mb-6"
            style={{ color: '#f4f1eb' }}>
            Spar 15–20 timer i uken med{' '}
            <span className="text-gradient-gold anim-gradient-shift">AI som jobber for deg</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-[16px] md:text-[18px] max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: 'rgba(244,241,235,0.7)' }}>
            Små bedrifter taper 15 000–25 000 kr/mnd på ubesvarte anrop og manuelt arbeid.
            Arxon automatiserer telefon, booking og oppfølging — slik at du kan fokusere på kundene.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <button onClick={ctaClick} className="gold-btn gold-btn-pulse rounded-xl py-4 px-10 text-[16px] font-bold inline-flex items-center gap-2 group"
              aria-label="Start gratis kartlegging — ingen binding">
              Start gratis kartlegging <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <p className="text-[12px] mt-4" style={{ color: 'rgba(244,241,235,0.55)' }}>
              Gratis &middot; Ingen binding &middot; Resultat på 2 minutter
            </p>
          </motion.div>

          {/* Industry pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] uppercase tracking-wide mr-2" style={{ color: 'rgba(244,241,235,0.4)' }}>Populært i:</span>
            {[
              { icon: Hammer, label: 'Bygg' },
              { icon: HomeIcon, label: 'Eiendom' },
              { icon: Scissors, label: 'Salong' },
              { icon: Car, label: 'Bil' },
              { icon: Plane, label: 'Reiseliv' },
            ].map((ind) => (
              <Link key={ind.label} href="/bransjer" className="industry-pill inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: 'rgba(244,241,235,0.6)',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
              >
                <ind.icon size={12} />
                {ind.label}
              </Link>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-12 flex flex-col items-center gap-1 cursor-pointer"
            onClick={() => document.getElementById('trust-bar')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Scroll ned for mer informasjon"
            role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') document.getElementById('trust-bar')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            <span className="text-[11px] tracking-widest uppercase" style={{ color: 'rgba(244,241,235,0.4)' }}>Scroll ned</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
              <ChevronDown size={20} style={{ color: 'rgba(244,241,235,0.35)' }} />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  BLOCK 2: SOCIAL PROOF / TRUST BAR          */}
      {/* ═══════════════════════════════════════════ */}
      <motion.section id="trust-bar" {...sAnim} className="py-16 md:py-20 relative overflow-hidden" style={{ borderTop: '1px solid rgba(244,241,235,0.04)' }}>
        <div className="max-w-4xl mx-auto px-5 text-center">
          <p className="text-[12px] tracking-[3px] uppercase mb-8" style={{ color: 'rgba(244,241,235,0.7)' }}>Bygget med teknologi fra verdensledende selskaper</p>
          <TechLogos />
        </div>
        <div className="gold-divider mt-16" />
      </motion.section>

      {/* ═══════════════════════════════════════════ */}
      {/*  BLOCK 3: PAIN AGITATION (PAS)              */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ borderTop: '1px solid rgba(244,241,235,0.04)' }}>
        <div className="max-w-4xl mx-auto px-5">
          <motion.div {...sAnim} className="text-center mb-14">
            <h2 className="text-[28px] md:text-[42px] font-bold tracking-tight mb-4" style={{ color: '#f4f1eb' }}>
              Kjenner du deg igjen?
            </h2>
            <p className="text-[15px] max-w-lg mx-auto" style={{ color: 'rgba(244,241,235,0.6)' }}>
              De fleste norske bedrifter taper kunder hver eneste dag uten å vite det.
            </p>
          </motion.div>

          <motion.div className="grid md:grid-cols-3 gap-6" {...staggerContainer}>
            {[
              { icon: <PhoneOff size={24} />, title: 'Ubesvarte anrop', pain: 'Hver gang telefonen ringer uten svar, mister du en potensiell kunde.', agitate: 'Det koster deg 15 000–25 000 kr/mnd i tapte inntekter.' },
              { icon: <Clock size={24} />, title: 'Timer på manuelt arbeid', pain: 'Booking, oppfølging, fakturering — alt gjøres for hånd.', agitate: '15–20 timer i uken forsvinner til oppgaver AI kan gjøre på sekunder.' },
              { icon: <TrendingUp size={24} />, title: 'Konkurrenter automatiserer', pain: 'Mens du gjør ting manuelt, har konkurrentene allerede AI.', agitate: 'De fanger kundene dine mens du er opptatt med admin.' },
            ].map((item, i) => (
              <motion.div key={i}
                variants={staggerChild}
                className="glass-card p-6 md:p-8 group hover-lift"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(239,69,69,0.08)', border: '1px solid rgba(239,69,69,0.15)' }}>
                  <span style={{ color: '#ef4545' }}>{item.icon}</span>
                </div>
                <h3 className="text-[16px] font-bold mb-2" style={{ color: '#f4f1eb' }}>{item.title}</h3>
                <p className="text-[14px] leading-relaxed mb-2" style={{ color: 'rgba(244,241,235,0.7)' }}>{item.pain}</p>
                <p className="text-[13px] font-medium" style={{ color: '#ef4545' }}>{item.agitate}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...sAnim} className="text-center mt-12">
            <p className="text-[18px] font-semibold" style={{ color: gold }}>
              Det finnes en bedre måte.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  BLOCK 4: BEFORE / AFTER COMPARISON         */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ borderTop: '1px solid rgba(244,241,235,0.04)' }}>
        <div className="max-w-4xl mx-auto px-5">
          <motion.div {...sAnim} className="text-center mb-14">
            <h2 className="text-[28px] md:text-[42px] font-bold tracking-tight mb-4" style={{ color: '#f4f1eb' }}>
              Før og etter <span className="text-gradient-gold">Arxon</span>
            </h2>
          </motion.div>

          <motion.div {...staggerContainer} className="grid md:grid-cols-2 gap-6">
            {/* Before */}
            <motion.div variants={staggerChild} className="glass-card p-6 md:p-8 hover-lift" style={{ borderColor: 'rgba(239,69,69,0.15)' }}>
              <div className="flex items-center gap-2 mb-6">
                <X size={18} style={{ color: '#ef4545' }} />
                <span className="text-[14px] font-bold uppercase tracking-wide" style={{ color: '#ef4545' }}>Uten Arxon</span>
              </div>
              <div className="space-y-4">
                {[
                  'Mister 30–50% av innkommende anrop',
                  '15–20 timer/uke på manuelt arbeid',
                  'Kunder venter dager på svar',
                  'Glemmer oppfølging av leads',
                  'Fakturering tar timer hver uke',
                  'Ingen oversikt over tapte muligheter',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <X size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'rgba(239,69,69,0.6)' }} />
                    <span className="text-[13px] leading-relaxed" style={{ color: 'rgba(244,241,235,0.6)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* After */}
            <motion.div variants={staggerChild} className="glass-card p-6 md:p-8 hover-lift" style={{ borderColor: `rgba(${goldRgb},0.2)`, background: `rgba(${goldRgb},0.02)` }}>
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle2 size={18} style={{ color: '#4ade80' }} />
                <span className="text-[14px] font-bold uppercase tracking-wide" style={{ color: '#4ade80' }}>Med Arxon</span>
              </div>
              <div className="space-y-4">
                {[
                  'AI svarer alle anrop 24/7 — 0% tapte',
                  'Spar 15+ timer/uke med automatisering',
                  'Kundene får svar på sekunder',
                  'Automatisk oppfølging av hver lead',
                  'Fakturering sendes automatisk',
                  'Full oversikt over ROI og resultater',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#4ade80' }} />
                    <span className="text-[13px] leading-relaxed" style={{ color: 'rgba(244,241,235,0.75)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  BLOCK 5: SOLUTION — BENTO GRID             */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ borderTop: '1px solid rgba(244,241,235,0.04)' }}>
        <div className="max-w-5xl mx-auto px-5">
          <motion.div {...sAnim} className="text-center mb-14">
            <h2 className="text-[28px] md:text-[42px] font-bold tracking-tight mb-4" style={{ color: '#f4f1eb' }}>
              Alt du trenger — <span className="text-gradient-gold">én plattform</span>
            </h2>
            <p className="text-[15px] max-w-lg mx-auto" style={{ color: 'rgba(244,241,235,0.6)' }}>
              Arxon erstatter manuelt arbeid med intelligente AI-systemer som jobber 24/7.
            </p>
          </motion.div>

          <div className="bento-grid">
            {[
              { icon: <Bot size={22} />, title: 'AI-Mobilsvarer', desc: 'Svarer telefonen 24/7. Kvalifiserer leads, booker møter og sender sammendrag — alt automatisk.', span: 'wide' },
              { icon: <CalendarCheck size={22} />, title: 'Automatisk booking', desc: 'Kundene booker direkte i kalenderen din. Ingen frem-og-tilbake på SMS.', span: 'normal' },
              { icon: <Users size={22} />, title: 'Kundeoppfølging', desc: 'AI følger opp leads med personlige meldinger til riktig tid.', span: 'normal' },
              { icon: <BarChart3 size={22} />, title: 'Lead-kvalifisering', desc: 'Rangerer og sorterer leads basert på kjøpssannsynlighet. Du ringer bare de varme.', span: 'normal' },
              { icon: <Cog size={22} />, title: 'Automatisert admin', desc: 'Fakturering, rapporter og oppgaver kjører av seg selv.', span: 'normal' },
              { icon: <Megaphone size={22} />, title: 'Smart markedsføring', desc: 'AI-drevne kampanjer som treffer riktig kunde til riktig tid.', span: 'wide' },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`bento-card group ${item.span === 'wide' ? 'md:col-span-2' : ''}`}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="bento-card-glow" />
                <div className="relative z-10 p-6 md:p-8">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ background: `rgba(${goldRgb},0.08)`, border: `1px solid rgba(${goldRgb},0.15)` }}>
                    <span style={{ color: gold }}>{item.icon}</span>
                  </div>
                  <h3 className="text-[16px] font-bold mb-2" style={{ color: '#f4f1eb' }}>{item.title}</h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(244,241,235,0.65)' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Link to all services */}
          <motion.div {...sAnim} className="text-center mt-10">
            <Link href="/tjenester" className="inline-flex items-center gap-2 text-[14px] font-medium" style={{ color: gold, textDecoration: 'none' }}>
              Se alle 200+ automatiseringer <ArrowUpRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  BLOCK 5B: PRODUCT DEMO — SEE IT IN ACTION    */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ borderTop: '1px solid rgba(244,241,235,0.04)' }}>
        <div className="max-w-5xl mx-auto px-5">
          <motion.div {...sAnim} className="text-center mb-14">
            <h2 className="text-[28px] md:text-[42px] font-bold tracking-tight mb-4" style={{ color: '#f4f1eb' }}>
              Se det i <span className="text-gradient-gold">aksjon</span>
            </h2>
            <p className="text-[15px] max-w-lg mx-auto" style={{ color: 'rgba(244,241,235,0.6)' }}>
              Fra innkommende anrop til ferdig booking — helt uten manuelt arbeid.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <motion.div {...sAnim}>
              <div className="text-center mb-4">
                <span className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-1 rounded-full"
                  style={{ background: `rgba(${goldRgb},0.08)`, color: gold, border: `1px solid rgba(${goldRgb},0.15)` }}>
                  <MessageSquare size={12} /> AI-samtale — live demo
                </span>
              </div>
              <PhoneDemo />
            </motion.div>

            <motion.div {...sAnim}>
              <div className="text-center mb-4">
                <span className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-1 rounded-full"
                  style={{ background: `rgba(${goldRgb},0.08)`, color: gold, border: `1px solid rgba(${goldRgb},0.15)` }}>
                  <Zap size={12} /> Automatisk arbeidsflyt
                </span>
              </div>
              <WorkflowDemo />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  BLOCK 6: INDUSTRIES                         */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ borderTop: '1px solid rgba(244,241,235,0.04)' }}>
        <div className="max-w-4xl mx-auto px-5">
          <motion.div {...sAnim} className="text-center mb-14">
            <h2 className="text-[28px] md:text-[42px] font-bold tracking-tight mb-4" style={{ color: '#f4f1eb' }}>
              Skreddersydd for <span className="text-gradient-gold">din bransje</span>
            </h2>
            <p className="text-[15px] max-w-lg mx-auto" style={{ color: 'rgba(244,241,235,0.6)' }}>
              Vi har spesialiserte løsninger for 5 bransjer — med automatiseringer tilpasset akkurat dine behov.
            </p>
          </motion.div>

          <motion.div className="grid grid-cols-2 md:grid-cols-5 gap-4" {...staggerContainer}>
            {[
              { icon: Hammer, label: 'Bygg & Håndverk', count: 12, slug: 'bygg-og-handverk' },
              { icon: HomeIcon, label: 'Eiendom', count: 12, slug: 'eiendomsmegling' },
              { icon: Scissors, label: 'Salong & Skjønnhet', count: 10, slug: 'salong-og-skjonnhet' },
              { icon: Car, label: 'Bilverksted', count: 9, slug: 'bilverksted-og-bilforhandler' },
              { icon: Plane, label: 'Reiseliv', count: 10, slug: 'reiseliv-og-overnatting' },
            ].map((ind, i) => (
              <motion.div key={ind.slug} variants={staggerChild}>
                <Link href={`/bransjer#${ind.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="glass-card p-5 text-center group cursor-pointer hover-lift" style={{ transition: 'all 0.3s' }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                      style={{ background: `rgba(${goldRgb},0.06)`, border: `1px solid rgba(${goldRgb},0.12)` }}>
                      <ind.icon size={22} style={{ color: gold }} />
                    </div>
                    <h3 className="text-[13px] font-semibold mb-1" style={{ color: '#f4f1eb' }}>{ind.label}</h3>
                    <span className="text-[11px]" style={{ color: 'rgba(244,241,235,0.45)' }}>{ind.count} løsninger</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...sAnim} className="text-center mt-8">
            <Link href="/bransjer" className="inline-flex items-center gap-2 text-[13px] font-medium group" style={{ color: gold, textDecoration: 'none' }}>
              Se alle bransjer i detalj <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  BLOCK 7: PROCESS — HOW IT WORKS            */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ borderTop: '1px solid rgba(244,241,235,0.04)' }}>
        <div className="max-w-2xl mx-auto px-5">
          <motion.div {...sAnim} className="text-center mb-16">
            <h2 className="text-[28px] md:text-[42px] font-bold tracking-tight mb-4" style={{ color: '#f4f1eb' }}>
              Tre steg til <span className="text-gradient-gold">full automatisering</span>
            </h2>
            <p className="text-[15px] max-w-md mx-auto" style={{ color: 'rgba(244,241,235,0.6)' }}>Enklere enn du tror. Vi gjør alt det tekniske.</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px" style={{ background: `linear-gradient(to bottom, rgba(${goldRgb},0.3), rgba(${goldRgb},0.05))` }} />

            {[
              { step: 1, icon: <ClipboardList size={20} />, title: 'Gratis kartlegging', time: '2 minutter', desc: 'Svar på noen enkle spørsmål. Vår AI analyserer dine behov og finner automatiseringene med størst effekt.' },
              { step: 2, icon: <FileText size={20} />, title: 'Skreddersydd AI-forslag', time: 'Umiddelbart', desc: 'Du får en komplett oversikt over prosesser vi kan automatisere, forventet besparelse og en tydelig prioriteringsliste.' },
              { step: 3, icon: <Zap size={20} />, title: 'Vi implementerer alt', time: 'Ca. 14 dager', desc: 'Vi setter opp alt fra A til Å. Du trenger ikke gjøre noe teknisk — bare gi oss tilgang, så fikser vi resten.' },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -30, scale: 0.97 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative pl-16 md:pl-20 pb-12 last:pb-0"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.2 + 0.1, type: 'spring', stiffness: 200 }}
                  className="absolute left-0 md:left-2 w-12 h-12 rounded-full flex items-center justify-center z-10"
                  style={{ background: `rgba(${goldRgb},0.1)`, border: `1px solid rgba(${goldRgb},0.25)` }}>
                  <span className="text-sm font-bold" style={{ color: gold }}>{item.step}</span>
                </motion.div>

                <div className="glass-card p-6 hover-lift">
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <h3 className="text-[16px] font-bold flex items-center gap-2" style={{ color: '#f4f1eb' }}>
                      <span style={{ color: gold }}>{item.icon}</span> {item.title}
                    </h3>
                    <span className="text-[11px] px-3 py-1 rounded-full font-medium"
                      style={{ background: `rgba(${goldRgb},0.08)`, color: gold, border: `1px solid rgba(${goldRgb},0.15)` }}>
                      {item.time}
                    </span>
                  </div>
                  <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(244,241,235,0.65)' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...sAnim} className="text-center mt-12">
            <button onClick={ctaClick} className="gold-btn rounded-xl py-4 px-8 text-[15px] font-bold inline-flex items-center gap-2">
              Start kartleggingen nå <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  BLOCK 8: AUTHORITY & PROOF                  */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ borderTop: '1px solid rgba(244,241,235,0.04)' }}>
        <div className="max-w-4xl mx-auto px-5">
          <motion.div {...sAnim} className="text-center mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
              {[
                { val: 200, suffix: '+', label: 'Automatiseringer' },
                { val: 5, suffix: '', label: 'Bransjer dekket' },
                { val: 85, suffix: '%', label: 'Raskere oppfølging' },
                { val: 24, suffix: '/7', label: 'AI tilgjengelig' },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.6, y: 10 }} whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1, type: 'spring', stiffness: 150, damping: 15 }}>
                  <div className="text-[28px] md:text-[36px] font-extrabold text-gradient-gold">
                    <AnimCounter target={s.val} suffix={s.suffix} />
                  </div>
                  <div className="text-[12px] tracking-wide uppercase mt-1" style={{ color: 'rgba(244,241,235,0.55)' }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div {...sAnim} className="text-center mb-12">
            <h2 className="text-[24px] md:text-[36px] font-bold tracking-tight" style={{ color: '#f4f1eb' }}>
              Det fungerer for <span className="text-gradient-gold">andre</span>
            </h2>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 gap-6" {...staggerContainer}>
            {[
              { name: 'Martin K.', biz: 'Bygg & Håndverk', quote: 'Vi gikk fra å miste halvparten av leads til å fange alle. Omsetningen økte 25% på tre måneder — uten å ansette noen.', result: '+25% omsetning', stars: 5 },
              { name: 'Camilla H.', biz: 'Salong & Skjønnhet', quote: 'Kundene booker selv døgnet rundt, og vi får påminnelser automatisk. No-shows gikk ned 70% på første måned.', result: '–70% no-shows', stars: 5 },
              { name: 'Lars T.', biz: 'Eiendomsmegling', quote: 'Arxon sin AI-telefonsvarer fanger opp alle interessenter — selv de som ringer kl. 22 på søndag. Vi har aldri booket så mange visninger.', result: '+40% visninger', stars: 5 },
              { name: 'Kristine M.', biz: 'Bilverksted', quote: 'Automatisk påminnelse om EU-kontroll og service har gitt oss en jevn strøm av bookinger. Kundene elsker det.', result: '+35% gjenkjøp', stars: 5 },
            ].map((t, i) => (
              <motion.div key={i}
                variants={staggerChild}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="glass-card p-6 md:p-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => <Star key={j} size={14} fill={gold} color={gold} />)}
                </div>
                <p className="text-[14px] leading-relaxed mb-5 italic" style={{ color: 'rgba(244,241,235,0.6)' }}>&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[14px] font-semibold" style={{ color: '#f4f1eb' }}>{t.name}</div>
                    <div className="text-[12px]" style={{ color: 'rgba(244,241,235,0.55)' }}>{t.biz}</div>
                  </div>
                  <span className="text-[12px] font-semibold px-3 py-1 rounded-full"
                    style={{ background: 'rgba(74,222,128,0.08)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.15)' }}>
                    {t.result}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  BLOCK 9: ROI CALCULATOR                     */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ borderTop: '1px solid rgba(244,241,235,0.04)' }}>
        <div className="max-w-xl mx-auto px-5">
          <motion.div {...sAnim} className="text-center mb-10">
            <h2 className="text-[24px] md:text-[36px] font-bold tracking-tight mb-4" style={{ color: '#f4f1eb' }}>
              Hva taper <span className="text-gradient-gold">du</span> per måned?
            </h2>
            <p className="text-[15px] max-w-md mx-auto" style={{ color: 'rgba(244,241,235,0.6)' }}>Beregn ditt potensielle tap — og hva Arxon kan spare deg.</p>
          </motion.div>

          <motion.div {...scaleIn} className="glass-card p-6 md:p-8" role="form" aria-label="ROI-kalkulator">
            <label className="block mb-4" htmlFor="roi-industry">
              <span className="text-[12px] uppercase tracking-wide" style={{ color: 'rgba(244,241,235,0.55)' }}>Bransje</span>
              <select id="roi-industry" value={roiIndustry} onChange={(e) => setRoiIndustry(e.target.value)}
                className="mt-2 w-full rounded-lg px-4 py-3 text-[14px] outline-none"
                aria-label="Velg din bransje"
                style={{ background: 'rgba(244,241,235,0.04)', border: '1px solid rgba(244,241,235,0.08)', color: 'rgba(244,241,235,0.8)' }}>
                {Object.keys(roiData).map((k) => <option key={k} value={k} style={{ background: bg }}>{k}</option>)}
              </select>
            </label>

            <label className="block mb-6" htmlFor="roi-calls">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[12px] uppercase tracking-wide" style={{ color: 'rgba(244,241,235,0.55)' }}>Ubesvarte anrop per uke</span>
                <span className="text-[14px] font-bold" style={{ color: gold }} aria-live="polite">{missedCalls}</span>
              </div>
              <input id="roi-calls" type="range" min={1} max={30} value={missedCalls} onChange={(e) => setMissedCalls(+e.target.value)}
                className="w-full" style={{ accentColor: gold }}
                aria-label={`Ubesvarte anrop per uke: ${missedCalls}`}
                aria-valuemin={1} aria-valuemax={30} aria-valuenow={missedCalls} />
            </label>

            <div className="text-center py-6 rounded-xl relative overflow-hidden" style={{ background: `rgba(${goldRgb},0.04)`, border: `1px solid rgba(${goldRgb},0.1)` }}
              aria-live="polite" aria-atomic="true">
              <div className="text-[11px] uppercase tracking-wide mb-1" style={{ color: 'rgba(244,241,235,0.55)' }}>Estimert månedlig tap</div>
              <div className="text-[36px] md:text-[44px] font-extrabold text-gradient-gold">
                {monthlySavings.toLocaleString('nb-NO')} kr
              </div>
              <div className="text-[12px] mt-1" style={{ color: 'rgba(244,241,235,0.55)' }}>
                ≈ {Math.round(monthlySavings / 4.3).toLocaleString('nb-NO')} kr per uke
              </div>
            </div>

            <button onClick={ctaClick} className="gold-btn w-full rounded-xl py-4 mt-6 text-[15px] font-bold flex items-center justify-center gap-2">
              Stopp tapet — få gratis analyse <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  BLOCK 11: FAQ                                */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ borderTop: '1px solid rgba(244,241,235,0.04)' }}>
        <div className="max-w-xl mx-auto px-5">
          <motion.div {...sAnim} className="text-center mb-10">
            <h2 className="text-[24px] md:text-[36px] font-bold tracking-tight" style={{ color: '#f4f1eb' }}>
              Vanlige spørsmål
            </h2>
          </motion.div>
          <motion.div {...sAnim}>
            <FAQ items={faqItems} />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  BLOCK 12: FINAL DOMINANT CTA                */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative overflow-hidden" style={{ borderTop: '1px solid rgba(244,241,235,0.04)' }}>
        <div className="cta-glow" />
        <div className="max-w-2xl mx-auto px-5 text-center relative z-10">
          <motion.div {...sAnim}>
            <motion.h2
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-[28px] md:text-[48px] font-bold tracking-tight mb-4" style={{ color: '#f4f1eb' }}>
              Slutt å tape kunder.
              <br />
              <span className="text-gradient-gold anim-gradient-shift">Start i dag.</span>
            </motion.h2>
            <p className="text-[15px] mb-8 max-w-md mx-auto" style={{ color: 'rgba(244,241,235,0.6)' }}>
              Gratis kartlegging. Ingen binding. Implementert på ca. 14 dager.
            </p>
            <button onClick={ctaClick} className="gold-btn gold-btn-pulse rounded-xl py-4 px-12 text-[16px] font-bold inline-flex items-center gap-2 group">
              Start gratis kartlegging <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <p className="text-[12px] mt-4" style={{ color: 'rgba(244,241,235,0.7)' }}>
              Eller ring oss: <a href="tel:+4778896386" className="no-underline" style={{ color: gold }}
                onClick={() => trackEvent('Phone_Click', { section: 'final_cta' })}>78 89 63 86</a>
            </p>
          </motion.div>
        </div>
      </section>

      <Footer lang="no" />

      {/* ── Sticky mobile CTA ── */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-3 md:hidden"
            style={{ background: `rgba(8,12,20,0.9)`, borderTop: `1px solid rgba(${goldRgb},0.15)`, backdropFilter: 'blur(12px)' }}>
            <button onClick={ctaClick} className="gold-btn w-full rounded-xl py-3.5 text-[14px] font-bold flex items-center justify-center gap-2">
              Start gratis kartlegging <ArrowRight size={15} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <LiveToast />

      {/* ── Styles ── */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        .cta-shimmer { background: linear-gradient(110deg, ${gold} 0%, #f5d49a 25%, ${gold} 50%, #c9a96e 75%, ${gold} 100%); background-size: 200% 100%; animation: cta-shimmer-anim 3s linear infinite; }
        .cta-shimmer:hover { transform: translateY(-1px); box-shadow: 0 12px 40px rgba(${goldRgb},0.35) !important; }
        @keyframes cta-shimmer-anim { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .show-mob { display: none !important; }
        @media (max-width: 768px) {
          .hide-mob { display: none !important; }
          .show-mob { display: flex !important; }
        }

        html { scroll-behavior: smooth; }

        .text-gradient-gold {
          background: linear-gradient(135deg, #f5d49a, ${gold}, #c9a96e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gold-btn {
          background: linear-gradient(135deg, #f5d49a, ${gold}, #c9a96e);
          color: ${bg}; border: none; cursor: pointer;
          position: relative; overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 4px 24px rgba(${goldRgb}, 0.25), 0 0 0 1px rgba(${goldRgb}, 0.3);
        }
        .gold-btn:hover {
          box-shadow: 0 8px 40px rgba(${goldRgb}, 0.4), 0 0 0 1px rgba(${goldRgb}, 0.5);
          transform: translateY(-2px) scale(1.03);
        }
        .gold-btn::after {
          content: ''; position: absolute; top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%);
          transform: translateX(-100%); transition: transform 0.6s;
        }
        .gold-btn:hover::after { transform: translateX(100%); }

        .glass-card {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(244,241,235,0.06);
          border-radius: 16px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .glass-card:hover {
          border-color: rgba(${goldRgb}, 0.12);
          background: rgba(255,255,255,0.05);
          transform: translateY(-1px);
        }

        .bento-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 768px) {
          .bento-grid {
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
        }

        .bento-card {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(244,241,235,0.06);
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .bento-card:hover {
          border-color: rgba(${goldRgb}, 0.2);
          transform: translateY(-3px) scale(1.01);
          box-shadow: 0 8px 32px rgba(0,0,0,0.25), 0 0 20px rgba(${goldRgb},0.05);
        }
        .bento-card-glow {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 150px;
          background: radial-gradient(ellipse at 50% 0%, rgba(${goldRgb},0.08) 0%, transparent 70%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .bento-card:hover .bento-card-glow { opacity: 1; }

        .hero-gradient-mesh {
          position: absolute;
          inset: -20%;
          background:
            radial-gradient(ellipse at 20% 50%, rgba(${goldRgb},0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(${goldRgb},0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(${goldRgb},0.05) 0%, transparent 50%);
          filter: blur(80px);
          pointer-events: none;
          animation: mesh-drift 20s ease-in-out infinite alternate;
        }
        @keyframes mesh-drift {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(2%, -1%) rotate(1deg); }
          66% { transform: translate(-1%, 2%) rotate(-0.5deg); }
          100% { transform: translate(1%, -1%) rotate(0.5deg); }
        }

        .hero-orb {
          position: absolute;
          top: -10%;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(${goldRgb},0.1) 0%, rgba(${goldRgb},0.03) 40%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
          animation: orb-pulse 8s ease-in-out infinite alternate;
        }
        @keyframes orb-pulse {
          0% { opacity: 0.5; transform: translateX(-50%) scale(1); }
          100% { opacity: 0.9; transform: translateX(-50%) scale(1.15); }
        }

        .hero-orb-accent {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          opacity: 0.4;
        }
        .hero-orb-accent-1 {
          width: 300px; height: 300px;
          top: 20%; left: -5%;
          background: radial-gradient(circle, rgba(${goldRgb},0.08) 0%, transparent 70%);
          animation: float-orb-1 12s ease-in-out infinite alternate;
        }
        .hero-orb-accent-2 {
          width: 250px; height: 250px;
          bottom: 10%; right: -5%;
          background: radial-gradient(circle, rgba(${goldRgb},0.06) 0%, transparent 70%);
          animation: float-orb-2 15s ease-in-out infinite alternate;
        }
        @keyframes float-orb-1 {
          0% { transform: translate(0, 0); opacity: 0.3; }
          100% { transform: translate(30px, -20px); opacity: 0.6; }
        }
        @keyframes float-orb-2 {
          0% { transform: translate(0, 0); opacity: 0.2; }
          100% { transform: translate(-25px, 15px); opacity: 0.5; }
        }

        .gold-btn-pulse {
          animation: btn-glow-pulse 3s ease-in-out infinite;
        }
        @keyframes btn-glow-pulse {
          0%, 100% { box-shadow: 0 4px 24px rgba(${goldRgb}, 0.25), 0 0 0 1px rgba(${goldRgb}, 0.3); }
          50% { box-shadow: 0 4px 40px rgba(${goldRgb}, 0.45), 0 0 60px rgba(${goldRgb}, 0.15), 0 0 0 1px rgba(${goldRgb}, 0.4); }
        }
        .gold-btn-pulse:hover { animation: none; }

        .gold-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(${goldRgb},0.2), rgba(${goldRgb},0.4), rgba(${goldRgb},0.2), transparent);
        }

        .cta-glow {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background:
            radial-gradient(ellipse at 50% 50%, rgba(${goldRgb},0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 30% 70%, rgba(${goldRgb},0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 30%, rgba(${goldRgb},0.04) 0%, transparent 50%);
          pointer-events: none;
          animation: cta-glow-breathe 6s ease-in-out infinite alternate;
        }
        @keyframes cta-glow-breathe {
          0% { opacity: 0.7; }
          100% { opacity: 1; }
        }

        .industry-pill {
          transition: all 0.2s ease;
        }
        .industry-pill:hover {
          border-color: rgba(${goldRgb}, 0.2) !important;
          background: rgba(${goldRgb}, 0.05) !important;
          color: ${gold} !important;
          transform: translateY(-1px);
        }

        /* ── Hover lift utility ── */
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.2), 0 0 15px rgba(${goldRgb},0.06);
        }

        /* ── Slow spin for icons ── */
        .anim-spin-slow {
          animation: anim-spin-slow 8s linear infinite;
        }
        @keyframes anim-spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* ── Gradient shift for gold text ── */
        .anim-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease-in-out infinite alternate;
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        /* ── Floating hero particles ── */
        .hero-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .hero-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(${goldRgb}, 0.3);
          animation: float-particle 12s ease-in-out infinite;
        }
        .hero-particle-1 { top: 15%; left: 10%; animation-duration: 10s; animation-delay: 0s; }
        .hero-particle-2 { top: 70%; left: 85%; animation-duration: 14s; animation-delay: 2s; width: 2px; height: 2px; }
        .hero-particle-3 { top: 30%; left: 75%; animation-duration: 11s; animation-delay: 4s; }
        .hero-particle-4 { top: 80%; left: 20%; animation-duration: 13s; animation-delay: 1s; width: 4px; height: 4px; opacity: 0.2; }
        .hero-particle-5 { top: 50%; left: 50%; animation-duration: 16s; animation-delay: 3s; width: 2px; height: 2px; }
        .hero-particle-6 { top: 25%; left: 40%; animation-duration: 12s; animation-delay: 5s; }
        @keyframes float-particle {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0; }
          10% { opacity: 0.6; }
          50% { transform: translate(40px, -60px) scale(1.5); opacity: 0.3; }
          90% { opacity: 0.5; }
        }

        /* ── Product Demo: Phone Mockup ── */
        .demo-phone-frame {
          background: #0a0e18;
          border: 1px solid rgba(244,241,235,0.08);
          border-radius: 24px;
          overflow: hidden;
          max-width: 340px;
          margin: 0 auto;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(${goldRgb},0.04);
        }
        .demo-phone-header {
          background: linear-gradient(180deg, rgba(${goldRgb},0.06) 0%, transparent 100%);
          border-bottom: 1px solid rgba(244,241,235,0.06);
          position: relative;
        }
        .demo-phone-notch {
          width: 120px;
          height: 24px;
          background: #0a0e18;
          border-radius: 0 0 16px 16px;
          margin: 0 auto;
          border: 1px solid rgba(244,241,235,0.06);
          border-top: none;
        }
        .demo-phone-body {
          padding: 16px;
          min-height: 300px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          overflow: hidden;
        }
        .demo-msg {
          padding: 8px 12px;
          border-radius: 14px;
          font-size: 12px;
          line-height: 1.5;
          max-width: 85%;
        }
        .demo-msg-system {
          background: rgba(74,222,128,0.08);
          border: 1px solid rgba(74,222,128,0.15);
          color: #4ade80;
          font-size: 11px;
          align-self: center;
          text-align: center;
          max-width: 90%;
          border-radius: 8px;
        }
        .demo-msg-ai {
          background: rgba(${goldRgb},0.08);
          border: 1px solid rgba(${goldRgb},0.12);
          color: rgba(244,241,235,0.85);
          align-self: flex-start;
          border-bottom-left-radius: 4px;
        }
        .demo-msg-customer {
          background: rgba(244,241,235,0.06);
          border: 1px solid rgba(244,241,235,0.08);
          color: rgba(244,241,235,0.75);
          align-self: flex-end;
          border-bottom-right-radius: 4px;
        }
        .demo-typing {
          display: flex;
          gap: 4px;
          padding: 10px 16px;
        }
        .demo-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(${goldRgb},0.4);
          animation: demo-dot-bounce 1.4s ease-in-out infinite;
        }
        .demo-dot:nth-child(2) { animation-delay: 0.2s; }
        .demo-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes demo-dot-bounce {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
          40% { transform: scale(1.1); opacity: 1; }
        }

        /* ── Product Demo: Workflow ── */
        .demo-workflow-frame {
          background: #0a0e18;
          border: 1px solid rgba(244,241,235,0.08);
          border-radius: 20px;
          overflow: hidden;
          max-width: 340px;
          margin: 0 auto;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(${goldRgb},0.04);
        }
        .demo-workflow-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 16px;
          border-bottom: 1px solid rgba(244,241,235,0.06);
          background: linear-gradient(180deg, rgba(${goldRgb},0.06) 0%, transparent 100%);
        }
        .demo-workflow-live {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1px;
          padding: 2px 6px;
          border-radius: 4px;
          background: rgba(74,222,128,0.12);
          color: #4ade80;
          margin-left: auto;
          animation: demo-live-pulse 2s ease-in-out infinite;
        }
        @keyframes demo-live-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .demo-workflow-steps {
          padding: 16px;
          display: flex;
          flex-direction: column;
        }
        .demo-workflow-step-row {
          position: relative;
        }
        .demo-workflow-connector {
          position: absolute;
          left: 19px;
          top: -12px;
          width: 2px;
          height: 12px;
          background: rgba(244,241,235,0.06);
          overflow: hidden;
          border-radius: 1px;
        }
        .demo-workflow-connector-fill {
          width: 100%;
          border-radius: 1px;
        }
        .demo-workflow-step {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          border-radius: 10px;
          border: 1px solid rgba(244,241,235,0.06);
          margin-bottom: 4px;
          transition: all 0.3s ease;
        }
        .demo-workflow-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .demo-workflow-footer {
          padding: 0 16px 14px;
        }
        .demo-workflow-progress {
          height: 2px;
          border-radius: 1px;
          transition: width 0.4s ease;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-gradient-mesh { animation: none !important; }
          .hero-orb { animation: none !important; }
          .hero-orb-accent { animation: none !important; }
          .gold-btn::after { transition: none; }
          .gold-btn:hover { transform: none; }
          .gold-btn-pulse { animation: none !important; }
          .bento-card:hover { transform: none; }
          .glass-card:hover { transform: none; }
          .hover-lift:hover { transform: none; }
          .anim-spin-slow { animation: none !important; }
          .anim-gradient-shift { animation: none !important; }
          .hero-particle { animation: none !important; opacity: 0 !important; }
          .industry-pill:hover { transform: none; }
          .demo-dot { animation: none !important; }
          .demo-workflow-live { animation: none !important; }
        }
      `}</style>
    </>
  )
}
