'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Globe, Phone, Bot, Zap, Shield, Clock, BarChart3,
  CheckCircle2, ChevronRight, Star, Users, TrendingUp, Building2,
  ChevronDown, X, Sparkles, ArrowUpRight, MessageSquare, Timer,
  AlertCircle, ThumbsUp, Minus, Plus
} from 'lucide-react'

/* ── Constants ── */
const gold = '#c9a96e'
const goldRgb = '201,169,110'
const bg = '#0a0a0f'

/* ── Animated counter ── */
function AnimCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const dur = 1400
    const start = Date.now()
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(target * eased))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])
  return <span ref={ref}>{prefix}{count.toLocaleString('nb-NO')}{suffix}</span>
}

/* ── Typewriter ── */
function Typewriter({ words, className, style }: { words: string[]; className?: string; style?: React.CSSProperties }) {
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIdx]
    const timeout = deleting ? 40 : 80

    if (!deleting && charIdx === word.length) {
      setTimeout(() => setDeleting(true), 2000)
      return
    }
    if (deleting && charIdx === 0) {
      setDeleting(false)
      setWordIdx((prev) => (prev + 1) % words.length)
      return
    }

    const timer = setTimeout(() => {
      setCharIdx((prev) => prev + (deleting ? -1 : 1))
    }, timeout)
    return () => clearTimeout(timer)
  }, [charIdx, deleting, wordIdx, words])

  return (
    <span className={className} style={style}>
      {words[wordIdx].substring(0, charIdx)}
      <span style={{ borderRight: `2px solid ${gold}`, marginLeft: 2, animation: 'blink 1s step-end infinite' }} />
    </span>
  )
}

/* ── Floating particles ── */
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.05,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${goldRgb}, ${p.opacity})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />
}

/* ── Toast notification ── */
function LiveToasts({ lang }: { lang: string }) {
  const [toast, setToast] = useState<{ name: string; city: string; time: string } | null>(null)

  const names = lang === 'no'
    ? [
      { name: 'Martin', city: 'Oslo' }, { name: 'Lena', city: 'Bergen' },
      { name: 'Erik', city: 'Trondheim' }, { name: 'Sara', city: 'Stavanger' },
      { name: 'Jonas', city: 'Kristiansand' }, { name: 'Ida', city: 'Tromsø' },
      { name: 'Anders', city: 'Drammen' }, { name: 'Nora', city: 'Fredrikstad' },
    ]
    : [
      { name: 'Martin', city: 'Oslo' }, { name: 'Lena', city: 'Bergen' },
      { name: 'Erik', city: 'Trondheim' }, { name: 'Sara', city: 'Stavanger' },
    ]

  useEffect(() => {
    const show = () => {
      const person = names[Math.floor(Math.random() * names.length)]
      const mins = Math.floor(Math.random() * 12) + 1
      setToast({ ...person, time: `${mins} ${lang === 'no' ? 'min siden' : 'min ago'}` })
      setTimeout(() => setToast(null), 4000)
    }
    const first = setTimeout(show, 5000)
    const interval = setInterval(show, 15000 + Math.random() * 10000)
    return () => { clearTimeout(first); clearInterval(interval) }
  }, [lang])

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20 }}
          style={{
            position: 'fixed', bottom: 24, left: 24, zIndex: 100,
            background: 'rgba(20,20,30,0.95)', border: `1px solid rgba(${goldRgb},0.2)`,
            borderRadius: 14, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12,
            backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            maxWidth: 340,
          }}
        >
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: `rgba(${goldRgb},0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Users size={16} color={gold} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f0' }}>
              {toast.name} {lang === 'no' ? 'fra' : 'from'} {toast.city}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
              {lang === 'no' ? 'startet kartlegging' : 'started discovery'} · {toast.time}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── FAQ Accordion ── */
function FAQ({ lang }: { lang: string }) {
  const [open, setOpen] = useState<number | null>(null)

  const items = lang === 'no' ? [
    { q: 'Er kartleggingen virkelig gratis?', a: 'Ja, 100% gratis og uforpliktende. Du får en fullstendig AI-analyse med anbefalinger, ROI-beregning og prisestimat uten å betale noe.' },
    { q: 'Hvor lang tid tar det?', a: 'Selve spørreskjemaet tar 2–3 minutter. AI-en analyserer svarene dine umiddelbart, og du kan se resultatene med en gang.' },
    { q: 'Hva skjer med dataene mine?', a: 'All data lagres kryptert innen EØS. Vi følger GDPR og er EU AI Act-klare. Vi deler aldri data med tredjeparter.' },
    { q: 'Trenger jeg teknisk kunnskap?', a: 'Nei! Vi tar oss av alt teknisk. Spørsmålene handler om din bedrift og dine utfordringer — ikke om teknologi.' },
    { q: 'Hva hvis AI ikke passer for min bedrift?', a: 'Da forteller analysen deg det. Vi er ærlige — hvis AI ikke gir nok verdi, anbefaler vi det ikke. Ingen bindinger.' },
  ] : [
    { q: 'Is the discovery really free?', a: 'Yes, 100% free with no obligations. You get a complete AI analysis with recommendations, ROI calculation, and price estimate at no cost.' },
    { q: 'How long does it take?', a: 'The questionnaire takes 2–3 minutes. AI analyzes your answers immediately, and you can see results right away.' },
    { q: 'What happens with my data?', a: 'All data is stored encrypted within the EEA. We follow GDPR and are EU AI Act ready. We never share data with third parties.' },
    { q: 'Do I need technical knowledge?', a: "Not at all! We handle everything technical. The questions are about your business and challenges — not about technology." },
    { q: "What if AI isn't right for my business?", a: "Then the analysis will tell you that. We're honest — if AI doesn't provide enough value, we won't recommend it. No strings attached." },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((item, i) => (
        <motion.div key={i} initial={false} style={{
          background: open === i ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)',
          border: `1px solid ${open === i ? `rgba(${goldRgb},0.15)` : 'rgba(255,255,255,0.06)'}`,
          borderRadius: 14, overflow: 'hidden', transition: 'all 0.3s',
        }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '18px 22px', background: 'transparent', border: 'none', color: '#f0f0f0',
              fontSize: 15, fontWeight: 500, cursor: 'pointer', textAlign: 'left',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {item.q}
            <ChevronDown size={18} style={{
              color: gold, transition: 'transform 0.3s',
              transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)',
              flexShrink: 0, marginLeft: 12,
            }} />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div style={{ padding: '0 22px 18px', fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                  {item.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════ */
export default function LandingPage() {
  const [lang, setLang] = useState<'no' | 'en'>('no')
  const router = useRouter()
  const [showSticky, setShowSticky] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  /* ── Slider state for mini ROI calculator ── */
  const [missedCalls, setMissedCalls] = useState(10)
  const avgDealValue = 8500 // NOK per deal
  const conversionRate = 0.35
  const monthlySavings = Math.round(missedCalls * 4.3 * avgDealValue * conversionRate)

  /* ── Sticky CTA on scroll ── */
  useEffect(() => {
    const handler = () => setShowSticky(window.scrollY > 600)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const heroWords = lang === 'no'
    ? ['svare telefonen 24/7', 'booke møter automatisk', 'kvalifisere leads med AI', 'spare 40+ timer i måneden']
    : ['answer calls 24/7', 'book meetings automatically', 'qualify leads with AI', 'save 40+ hours per month']

  const beforeAfter = lang === 'no' ? {
    title: 'Før og etter AI',
    before: {
      label: 'Uten AI',
      items: ['Mister henvendelser etter kl. 16', 'Manuell booking og oppfølging', 'Ingen oversikt over tapte leads', 'Timer på repetitivt arbeid'],
    },
    after: {
      label: 'Med Younes AI',
      items: ['AI svarer 24/7 — aldri mist en kunde', 'Automatisk booking og SMS-påminnelser', 'Full oversikt + ROI per kanal', 'AI håndterer 80% av rutineoppgaver'],
    },
  } : {
    title: 'Before and After AI',
    before: {
      label: 'Without AI',
      items: ['Missing inquiries after business hours', 'Manual booking and follow-ups', 'No overview of lost leads', 'Hours spent on repetitive tasks'],
    },
    after: {
      label: 'With Younes AI',
      items: ['AI answers 24/7 — never miss a customer', 'Automatic booking and SMS reminders', 'Full overview + ROI per channel', 'AI handles 80% of routine tasks'],
    },
  }

  const features = lang === 'no' ? [
    { icon: Phone, title: 'AI Telefonsvar', desc: 'Svarer, kvalifiserer og booker — døgnet rundt på norsk og engelsk.', stat: '24/7' },
    { icon: Bot, title: 'Skreddersydd analyse', desc: 'Intelligente spørsmål tilpasset din bransje gir en unik AI-plan.', stat: '12 bransjer' },
    { icon: BarChart3, title: 'ROI-kalkulator', desc: 'Se nøyaktig hvor mye du kan spare med AI-automatisering.', stat: '357% ROI' },
    { icon: Shield, title: 'GDPR-kompatibel', desc: 'All data innenfor EØS. Databehandleravtale og EU AI Act-klar.', stat: '100% trygt' },
  ] : [
    { icon: Phone, title: 'AI Phone Answering', desc: 'Answers, qualifies and books — around the clock in Norwegian and English.', stat: '24/7' },
    { icon: Bot, title: 'Tailored Analysis', desc: 'Smart questions for your industry generate a unique AI plan.', stat: '12 industries' },
    { icon: BarChart3, title: 'ROI Calculator', desc: 'See exactly how much you can save with AI automation.', stat: '357% ROI' },
    { icon: Shield, title: 'GDPR Compliant', desc: 'All data within EEA. DPA and EU AI Act ready.', stat: '100% secure' },
  ]

  const steps = lang === 'no' ? [
    { num: '01', title: 'Fyll inn kontaktinfo', desc: 'Start en gratis kartlegging — tar kun 2 minutter', icon: Users },
    { num: '02', title: 'Svar på spørsmål', desc: 'AI-en stiller smarte spørsmål om din bedrift', icon: MessageSquare },
    { num: '03', title: 'Få din AI-analyse', desc: 'Personlig rapport med anbefalinger og ROI', icon: BarChart3 },
    { num: '04', title: 'Vi tar kontakt', desc: 'En rådgiver ringer deg innen 24 timer', icon: Phone },
  ] : [
    { num: '01', title: 'Enter your info', desc: 'Start a free discovery — takes only 2 minutes', icon: Users },
    { num: '02', title: 'Answer questions', desc: 'AI asks smart questions about your business', icon: MessageSquare },
    { num: '03', title: 'Get your AI analysis', desc: 'Personal report with recommendations and ROI', icon: BarChart3 },
    { num: '04', title: 'We follow up', desc: 'An advisor calls you within 24 hours', icon: Phone },
  ]

  const testimonials = lang === 'no' ? [
    { name: 'Martin S.', role: 'Daglig leder, Byggmester AS', text: 'Vi gikk fra å tape 15 henvendelser i uken til null. AI-telefonsvar var den beste investeringen vi har gjort.', stars: 5, metric: '+127% leads' },
    { name: 'Lena K.', role: 'Eier, Salong Lux', text: 'Uteblivelsene våre gikk ned 40% på første måned. Kundene elsker SMS-påminnelsene.', stars: 5, metric: '-40% no-shows' },
    { name: 'Erik T.', role: 'Partner, Advokatfirma Holm', text: 'Klientinntak som tok 2 timer tar nå 10 minutter. Imponerende analyse.', stars: 5, metric: '-92% tidsbruk' },
  ] : [
    { name: 'Martin S.', role: 'CEO, Construction Co', text: 'We went from losing 15 inquiries per week to zero. AI phone answering was the best investment.', stars: 5, metric: '+127% leads' },
    { name: 'Lena K.', role: 'Owner, Salon Lux', text: 'No-shows dropped 40% in the first month. Customers love the SMS reminders.', stars: 5, metric: '-40% no-shows' },
    { name: 'Erik T.', role: 'Partner, Holm Law Firm', text: 'Client intake that took 2 hours now takes 10 minutes. Impressive analysis.', stars: 5, metric: '-92% time spent' },
  ]

  const industries = lang === 'no'
    ? ['Bygg & Håndverk', 'Restaurant', 'Helse', 'Eiendom', 'Advokat', 'Regnskap', 'Butikk', 'Frisør', 'Transport', 'IT', 'Utdanning', 'Og flere...']
    : ['Construction', 'Restaurant', 'Healthcare', 'Real Estate', 'Legal', 'Accounting', 'Retail', 'Beauty', 'Transport', 'IT', 'Education', 'And more...']

  const fadeUp = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55, ease: 'easeOut' },
  }

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(180deg, ${bg} 0%, #0d0d15 50%, ${bg} 100%)`, color: '#f0f0f0', fontFamily: "'DM Sans', sans-serif", position: 'relative', overflow: 'hidden' }}>

      {/* Global styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        ::selection { background: rgba(${goldRgb},0.3); }
        @keyframes blink { 50% { border-color: transparent; } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes pulse-gold { 0%, 100% { box-shadow: 0 0 0 0 rgba(${goldRgb}, 0.3); } 50% { box-shadow: 0 0 0 12px rgba(${goldRgb}, 0); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        .gold-hover:hover { border-color: rgba(${goldRgb},0.3) !important; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.2); }
        .cta-shimmer { background: linear-gradient(110deg, ${gold} 0%, #e0c88a 25%, ${gold} 50%, #a8884d 75%, ${gold} 100%); background-size: 200% 100%; animation: shimmer 3s linear infinite; }
        .cta-shimmer:hover { transform: translateY(-1px); box-shadow: 0 12px 40px rgba(${goldRgb},0.35) !important; }
        input[type=range] { -webkit-appearance: none; width: 100%; height: 6px; border-radius: 3px; background: rgba(255,255,255,0.08); outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; background: ${gold}; cursor: pointer; box-shadow: 0 2px 10px rgba(${goldRgb},0.4); }
        @media (max-width: 640px) {
          .hero-title { font-size: 28px !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>

      {/* Particles background */}
      <Particles />

      {/* Live social proof toasts */}
      <LiveToasts lang={lang} />

      {/* ── STICKY CTA BAR ── */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, zIndex: 90,
              background: 'rgba(10,10,15,0.92)', backdropFilter: 'blur(20px)',
              borderBottom: `1px solid rgba(${goldRgb},0.1)`,
              padding: '10px 24px',
            }}
          >
            <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: `linear-gradient(135deg, ${gold}, #a8884d)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: bg }}>AI</div>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600 }}>Younes AI</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="hide-mobile" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                  {lang === 'no' ? '2 min · Gratis · Uforpliktende' : '2 min · Free · No obligations'}
                </span>
                <button onClick={() => router.push('/kartlegging')} className="cta-shimmer" style={{
                  color: bg, border: 'none', borderRadius: 10, padding: '9px 22px',
                  fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                }}>
                  {lang === 'no' ? 'Start kartlegging' : 'Start discovery'}
                  <ArrowRight size={14} style={{ display: 'inline', marginLeft: 6, verticalAlign: 'middle' }} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── NAV ── */}
      <nav style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1100, margin: '0 auto', padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: `linear-gradient(135deg, ${gold}, #a8884d)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: bg }}>AI</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600 }}>Younes AI</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => router.push('/kartlegging')} style={{
            background: 'transparent', border: `1px solid rgba(255,255,255,0.1)`, color: 'rgba(255,255,255,0.6)',
            borderRadius: 8, padding: '8px 18px', fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
          }}>
            {lang === 'no' ? 'Kartlegging' : 'Discovery'}
          </button>
          <button onClick={() => setLang(lang === 'no' ? 'en' : 'no')} style={{
            background: 'transparent', border: `1px solid rgba(255,255,255,0.1)`, color: 'rgba(255,255,255,0.5)',
            borderRadius: 8, padding: '8px 14px', fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
          }}>
            <Globe size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />
            {lang === 'no' ? 'EN' : 'NO'}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '60px 24px 50px', textAlign: 'center' }}>
        {/* Big radial glow */}
        <div style={{ position: 'absolute', top: '-40%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 600, background: `radial-gradient(ellipse, rgba(${goldRgb},0.06) 0%, transparent 70%)`, pointerEvents: 'none' }} />

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.5 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 20px', borderRadius: 30, background: `rgba(${goldRgb},0.06)`, border: `1px solid rgba(${goldRgb},0.15)`, fontSize: 13, color: gold, marginBottom: 28 }}>
          <Sparkles size={14} />
          {lang === 'no' ? 'Gratis AI-analyse for din bedrift' : 'Free AI analysis for your business'}
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
          className="hero-title"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 6vw, 58px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 6, letterSpacing: '-0.02em', position: 'relative' }}>
          {lang === 'no' ? (
            <>Din bedrift kan nå<br /><span style={{ color: gold }}><Typewriter words={heroWords} /></span></>
          ) : (
            <>Your business can now<br /><span style={{ color: gold }}><Typewriter words={heroWords} /></span></>
          )}
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}
          style={{ fontSize: 'clamp(15px, 2.3vw, 18px)', color: 'rgba(255,255,255,0.5)', maxWidth: 560, margin: '20px auto 36px', lineHeight: 1.6 }}>
          {lang === 'no'
            ? 'Svar på noen smarte spørsmål og få en personlig AI-integrasjonsplan med ROI-beregning — helt gratis.'
            : 'Answer a few smart questions and get a personal AI integration plan with ROI calculation — completely free.'}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14, marginBottom: 28 }}>
          <button onClick={() => router.push('/kartlegging')} className="cta-shimmer" style={{
            color: bg, border: 'none', borderRadius: 14, padding: '17px 40px',
            fontWeight: 700, fontSize: 17, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            boxShadow: `0 8px 32px rgba(${goldRgb},0.25)`, transition: 'all 0.2s',
            animation: 'pulse-gold 3s ease-in-out infinite, shimmer 3s linear infinite',
          }}>
            {lang === 'no' ? 'Start gratis kartlegging' : 'Start free discovery'}
            <ArrowRight size={18} style={{ display: 'inline', marginLeft: 8, verticalAlign: 'middle' }} />
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20, fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
          {[
            { icon: Timer, text: lang === 'no' ? '2 min å fullføre' : '2 min to complete' },
            { icon: Shield, text: lang === 'no' ? 'GDPR-sikret' : 'GDPR secured' },
            { icon: ThumbsUp, text: lang === 'no' ? 'Ingen forpliktelser' : 'No obligations' },
          ].map((item, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <item.icon size={13} color={gold} />{item.text}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── STATS BAR ── */}
      <motion.section {...fadeUp} style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto 50px', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 1, background: `rgba(${goldRgb},0.06)`, borderRadius: 18, overflow: 'hidden', border: `1px solid rgba(${goldRgb},0.1)` }}>
          {[
            { value: 357, suffix: '+', label: lang === 'no' ? 'Bedrifter kartlagt' : 'Businesses analyzed' },
            { value: 12, suffix: '', label: lang === 'no' ? 'Bransjer dekket' : 'Industries covered' },
            { value: 93, suffix: '%', label: lang === 'no' ? 'Kundetilfredshet' : 'Client satisfaction' },
            { value: 2, suffix: ' min', label: lang === 'no' ? 'Tid for kartlegging' : 'Time to complete' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '26px 20px', textAlign: 'center', background: bg }}>
              <div style={{ fontSize: 30, fontWeight: 700, color: gold, fontFamily: "'Playfair Display', serif" }}>
                <AnimCounter target={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── MINI ROI CALCULATOR ── */}
      <motion.section {...fadeUp} style={{ position: 'relative', zIndex: 1, maxWidth: 600, margin: '0 auto 70px', padding: '0 24px' }}>
        <div style={{
          background: `linear-gradient(135deg, rgba(${goldRgb},0.04) 0%, rgba(${goldRgb},0.01) 100%)`,
          border: `1px solid rgba(${goldRgb},0.12)`, borderRadius: 22, padding: '36px 32px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: `rgba(${goldRgb},0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={20} color={gold} />
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, fontFamily: "'Playfair Display', serif" }}>
                {lang === 'no' ? 'Se hva du taper' : 'See what you're losing'}
              </h3>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                {lang === 'no' ? 'Dra slideren for å se din potensielle besparelse' : 'Drag the slider to see your potential savings'}
              </p>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                {lang === 'no' ? 'Tapte henvendelser per uke:' : 'Missed inquiries per week:'}
              </span>
              <span style={{ fontSize: 15, fontWeight: 700, color: gold }}>{missedCalls}</span>
            </div>
            <input
              type="range" min={1} max={50} value={missedCalls}
              onChange={(e) => setMissedCalls(Number(e.target.value))}
              style={{ width: '100%' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>
              <span>1</span><span>50</span>
            </div>
          </div>

          <div style={{
            background: 'rgba(0,0,0,0.3)', borderRadius: 14, padding: '20px 24px',
            border: '1px solid rgba(255,255,255,0.04)',
          }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>
              {lang === 'no' ? 'Estimert tapt omsetning per måned:' : 'Estimated lost revenue per month:'}
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#ff6b6b', fontFamily: "'Playfair Display', serif" }}>
              kr {monthlySavings.toLocaleString('nb-NO')}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>
              {lang === 'no' ? `Basert på ${avgDealValue.toLocaleString('nb-NO')} kr snitt per deal, ${(conversionRate*100)}% konvertering` : `Based on ${avgDealValue.toLocaleString('nb-NO')} NOK avg per deal, ${(conversionRate*100)}% conversion`}
            </div>
          </div>

          <button onClick={() => router.push('/kartlegging')} style={{
            marginTop: 20, width: '100%', background: `rgba(${goldRgb},0.1)`, border: `1px solid rgba(${goldRgb},0.2)`,
            color: gold, borderRadius: 12, padding: '14px', fontWeight: 600, fontSize: 15,
            cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
          }}>
            {lang === 'no' ? 'Finn ut hvordan du kan redde disse pengene →' : 'Find out how to save this money →'}
          </button>
        </div>
      </motion.section>

      {/* ── BEFORE / AFTER ── */}
      <section style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '20px 24px 70px' }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, textAlign: 'center', marginBottom: 40 }}>
          {beforeAfter.title}
        </motion.h2>
        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* Before */}
          <motion.div {...fadeUp} style={{
            background: 'rgba(255,80,80,0.03)', border: '1px solid rgba(255,80,80,0.1)', borderRadius: 18, padding: '28px 24px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <AlertCircle size={18} color="#ff6b6b" />
              <span style={{ fontSize: 15, fontWeight: 600, color: '#ff6b6b' }}>{beforeAfter.before.label}</span>
            </div>
            {beforeAfter.before.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14 }}>
                <X size={16} color="#ff6b6b" style={{ flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>{item}</span>
              </div>
            ))}
          </motion.div>
          {/* After */}
          <motion.div {...fadeUp} style={{
            background: `rgba(${goldRgb},0.03)`, border: `1px solid rgba(${goldRgb},0.15)`, borderRadius: 18, padding: '28px 24px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <Sparkles size={18} color={gold} />
              <span style={{ fontSize: 15, fontWeight: 600, color: gold }}>{beforeAfter.after.label}</span>
            </div>
            {beforeAfter.after.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14 }}>
                <CheckCircle2 size={16} color={gold} style={{ flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', padding: '20px 24px 60px' }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, textAlign: 'center', marginBottom: 10 }}>
          {lang === 'no' ? 'Alt du trenger for AI-suksess' : 'Everything you need for AI success'}
        </motion.h2>
        <motion.p {...fadeUp} style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: 15, marginBottom: 44, maxWidth: 500, margin: '0 auto 44px' }}>
          {lang === 'no' ? 'Vi kombinerer AI-ekspertise med bransjekunnskap.' : 'We combine AI expertise with industry knowledge.'}
        </motion.p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 16 }}>
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.45 }}
              className="gold-hover"
              style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 18,
                padding: '28px 24px', transition: 'all 0.3s ease', cursor: 'default',
              }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `rgba(${goldRgb},0.08)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <f.icon size={22} color={gold} />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.55, marginBottom: 16 }}>{f.desc}</p>
              <span style={{ fontSize: 12, color: gold, background: `rgba(${goldRgb},0.06)`, padding: '5px 12px', borderRadius: 8, border: `1px solid rgba(${goldRgb},0.12)`, fontWeight: 600 }}>{f.stat}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '40px 24px 70px' }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, textAlign: 'center', marginBottom: 48 }}>
          {lang === 'no' ? 'Slik fungerer det' : 'How it works'}
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 20 }}>
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.45 }}
              style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{ fontSize: 52, fontWeight: 700, fontFamily: "'Playfair Display', serif", color: `rgba(${goldRgb},0.1)`, marginBottom: 10, lineHeight: 1 }}>{s.num}</div>
              <div style={{
                width: 52, height: 52, borderRadius: 14, background: `rgba(${goldRgb},0.06)`, border: `1px solid rgba(${goldRgb},0.12)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px',
                animation: i === 0 ? 'float 3s ease-in-out infinite' : undefined,
              }}>
                <s.icon size={22} color={gold} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '20px 24px 60px' }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>
          {lang === 'no' ? 'Skreddersydd for din bransje' : 'Tailored for your industry'}
        </motion.h2>
        <motion.p {...fadeUp} style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: 14, marginBottom: 28 }}>
          {lang === 'no' ? 'Spesifikke AI-anbefalinger for hver bransje' : 'Specific AI recommendations for each industry'}
        </motion.p>
        <motion.div {...fadeUp} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
          {industries.map((ind, i) => (
            <motion.span key={i}
              whileHover={{ scale: 1.05, borderColor: `rgba(${goldRgb},0.3)` }}
              style={{
                padding: '9px 20px', borderRadius: 22, fontSize: 13, fontWeight: 500,
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.5)', transition: 'all 0.2s', cursor: 'default',
              }}>{ind}</motion.span>
          ))}
        </motion.div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', padding: '20px 24px 70px' }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 700, textAlign: 'center', marginBottom: 36 }}>
          {lang === 'no' ? 'Resultater som teller' : 'Results that matter'}
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {testimonials.map((tm, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }}
              className="gold-hover"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 18, padding: '26px 24px', transition: 'all 0.3s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 2 }}>
                  {Array.from({ length: tm.stars }).map((_, j) => <Star key={j} size={14} fill={gold} color={gold} />)}
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#4ade80', background: 'rgba(74,222,128,0.08)', padding: '4px 10px', borderRadius: 8, border: '1px solid rgba(74,222,128,0.15)' }}>
                  {tm.metric}
                </span>
              </div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.55, marginBottom: 18, fontStyle: 'italic' }}>"{tm.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: `rgba(${goldRgb},0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: gold }}>
                  {tm.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{tm.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{tm.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ position: 'relative', zIndex: 1, maxWidth: 650, margin: '0 auto', padding: '20px 24px 70px' }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 700, textAlign: 'center', marginBottom: 32 }}>
          {lang === 'no' ? 'Ofte stilte spørsmål' : 'Frequently asked questions'}
        </motion.h2>
        <motion.div {...fadeUp}>
          <FAQ lang={lang} />
        </motion.div>
      </section>

      {/* ── FINAL CTA ── */}
      <motion.section {...fadeUp} style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto', padding: '0 24px 80px', textAlign: 'center' }}>
        <div style={{
          background: `linear-gradient(135deg, rgba(${goldRgb},0.06) 0%, rgba(${goldRgb},0.02) 100%)`,
          border: `1px solid rgba(${goldRgb},0.15)`, borderRadius: 24, padding: '52px 36px',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Decorative glow */}
          <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, background: `radial-gradient(circle, rgba(${goldRgb},0.08) 0%, transparent 70%)`, pointerEvents: 'none' }} />

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 700, marginBottom: 12 }}>
            {lang === 'no' ? 'Klar til å ta steget?' : 'Ready to take the leap?'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, marginBottom: 32, maxWidth: 420, margin: '0 auto 32px', lineHeight: 1.6 }}>
            {lang === 'no'
              ? 'Hundrevis av bedrifter har allerede sett hva AI kan gjøre for dem. Det tar bare 2 minutter.'
              : 'Hundreds of businesses have already seen what AI can do for them. It only takes 2 minutes.'}
          </p>
          <button onClick={() => router.push('/kartlegging')} className="cta-shimmer" style={{
            color: bg, border: 'none', borderRadius: 14, padding: '17px 40px',
            fontWeight: 700, fontSize: 17, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            boxShadow: `0 8px 32px rgba(${goldRgb},0.25)`, transition: 'all 0.2s',
          }}>
            {lang === 'no' ? 'Start gratis kartlegging' : 'Start free discovery'}
            <ArrowRight size={18} style={{ display: 'inline', marginLeft: 8, verticalAlign: 'middle' }} />
          </button>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 20 }}>
            {lang === 'no' ? 'Vi tar inn maks 3 nye kunder per måned for å sikre kvalitet.' : 'We onboard max 3 new clients per month to ensure quality.'}
          </p>
        </div>
      </motion.section>

      {/* ── FOOTER ── */}
      <footer style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '24px 24px 36px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: `linear-gradient(135deg, ${gold}, #a8884d)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: bg }}>AI</div>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Younes AI Co.</span>
        </div>
        <div style={{ display: 'flex', gap: 20, fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
          <span>{lang === 'no' ? 'GDPR-kompatibel' : 'GDPR Compliant'}</span>
          <span>{lang === 'no' ? 'Norsk datasenter' : 'European data center'}</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  )
}
