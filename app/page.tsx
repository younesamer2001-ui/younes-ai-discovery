'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Globe, Phone, Bot, Zap, Shield, Clock, BarChart3,
  CheckCircle2, ChevronRight, Star, Users, TrendingUp, Building2,
  ChevronDown, X, Sparkles, ArrowUpRight, MessageSquare, Timer,
  AlertCircle, ThumbsUp, Minus, Plus, Menu
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
  const [menuOpen, setMenuOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLElement>(null)
  const [nearFooter, setNearFooter] = useState(false)

  /* ── Industry data for ROI calculator ── */
  const industryData = lang === 'no' ? [
    { id: 'bygg', label: 'Bygg & Håndverk', avgDeal: 85000, conversion: 0.18, source: 'Basert på snitt oppdragsverdi for små byggefirma i Norge' },
    { id: 'frisor', label: 'Frisør / Salong', avgDeal: 950, conversion: 0.65, source: 'Basert på snitt timepris for norske salonger' },
    { id: 'restaurant', label: 'Restaurant / Cafe', avgDeal: 1200, conversion: 0.70, source: 'Basert på snitt reservasjonsverdi' },
    { id: 'advokat', label: 'Advokat / Juridisk', avgDeal: 25000, conversion: 0.25, source: 'Basert på snitt førstekonsultasjon' },
    { id: 'regnskap', label: 'Regnskap', avgDeal: 12000, conversion: 0.30, source: 'Basert på snitt årsoppdrag for SMB' },
    { id: 'helse', label: 'Helse / Klinikk', avgDeal: 2500, conversion: 0.55, source: 'Basert på snitt konsultasjonspris' },
    { id: 'eiendom', label: 'Eiendom', avgDeal: 65000, conversion: 0.12, source: 'Basert på snitt meglerprovisjonsandel' },
    { id: 'it', label: 'IT / Konsulent', avgDeal: 35000, conversion: 0.20, source: 'Basert på snitt prosjektverdi for SMB-oppdrag' },
  ] : [
    { id: 'bygg', label: 'Construction', avgDeal: 85000, conversion: 0.18, source: 'Based on avg project value for small contractors in Norway' },
    { id: 'frisor', label: 'Hair / Beauty', avgDeal: 950, conversion: 0.65, source: 'Based on avg appointment price in Norwegian salons' },
    { id: 'restaurant', label: 'Restaurant / Cafe', avgDeal: 1200, conversion: 0.70, source: 'Based on avg reservation value' },
    { id: 'advokat', label: 'Legal', avgDeal: 25000, conversion: 0.25, source: 'Based on avg first consultation fee' },
    { id: 'regnskap', label: 'Accounting', avgDeal: 12000, conversion: 0.30, source: 'Based on avg annual SMB engagement' },
    { id: 'helse', label: 'Health / Clinic', avgDeal: 2500, conversion: 0.55, source: 'Based on avg consultation price' },
    { id: 'eiendom', label: 'Real Estate', avgDeal: 65000, conversion: 0.12, source: 'Based on avg broker commission share' },
    { id: 'it', label: 'IT / Consulting', avgDeal: 35000, conversion: 0.20, source: 'Based on avg project value for SMB engagements' },
  ]
  const [selectedIndustry, setSelectedIndustry] = useState(0)
  const [missedCalls, setMissedCalls] = useState(8)
  const currentIndustry = industryData[selectedIndustry]
  const monthlySavings = Math.round(missedCalls * 4.3 * currentIndustry.avgDeal * currentIndustry.conversion)

  /* ── Sticky CTA on scroll ── */
  useEffect(() => {
    const handler = () => setShowSticky(window.scrollY > 600)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  /* ── Hide sticky mobile CTA when near footer ── */
  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return
    const observer = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { threshold: 0, rootMargin: '60px 0px 0px 0px' }
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  /* ── Lock body scroll when menu open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* ── Nav links — clean, 4 items max for desktop ── */
  const navLinks = lang === 'no' ? [
    { id: '/mobilsvarer', label: 'Tjenester', isPage: true },
    { id: '/priser', label: 'Priser', isPage: true },
    { id: '/blogg', label: 'Blogg', isPage: true },
    { id: '/om-oss', label: 'Om oss', isPage: true },
  ] : [
    { id: '/mobilsvarer', label: 'Services', isPage: true },
    { id: '/priser', label: 'Pricing', isPage: true },
    { id: '/blogg', label: 'Blog', isPage: true },
    { id: '/om-oss', label: 'About', isPage: true },
  ]

  const handleNav = (link: { id: string; isPage: boolean }) => {
    if (link.isPage) {
      router.push(link.id)
    } else {
      const el = document.getElementById(link.id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const heroWords = lang === 'no'
    ? ['svare telefonen 24/7', 'booke møter automatisk', 'kvalifisere leads med AI', 'frigjøre tid til det viktige']
    : ['answer calls 24/7', 'book meetings automatically', 'qualify leads with AI', 'free up time for what matters']

  const beforeAfter = lang === 'no' ? {
    title: 'Før og etter AI',
    before: {
      label: 'Uten AI',
      items: ['Mister henvendelser etter kl. 16', 'Betaler lønn for telefonsvarer og resepsjonist', 'Ingen oversikt over tapte leads', 'Timer på repetitivt arbeid som koster deg ansatte'],
    },
    after: {
      label: 'Med Arxon',
      items: ['AI svarer 24/7 — aldri mist en kunde', 'Spar 1–2 heltidsstillinger med automatisering', 'Full oversikt over alle henvendelser', 'Kutt lønnskostnader — AI gjør jobben for en brøkdel'],
    },
  } : {
    title: 'Before and After AI',
    before: {
      label: 'Without AI',
      items: ['Missing inquiries after business hours', 'Paying salaries for receptionist and phone staff', 'No overview of lost leads', 'Hours of repetitive work that costs you employees'],
    },
    after: {
      label: 'With Arxon',
      items: ['AI answers 24/7 — never miss a customer', 'Save 1–2 full-time positions with automation', 'Full overview of all inquiries', 'Cut salary costs — AI does the job for a fraction'],
    },
  }

  const features = lang === 'no' ? [
    { icon: Phone, title: 'AI Telefonsvar', desc: 'Aldri mist en kunde igjen. AI-en svarer, kvalifiserer og booker avtaler — selv kl. 23 på en søndag.', stat: '24/7' },
    { icon: Bot, title: 'Personlig AI-plan', desc: 'Få en skreddersydd rapport som viser nøyaktig hvor AI sparer deg mest tid og penger.', stat: '2 min' },
    { icon: BarChart3, title: 'Se din ROI', desc: 'Finn ut hvor mye du taper på ubesvarte anrop — og hva du kan spare med AI.', stat: 'Gratis' },
    { icon: Shield, title: 'Trygt og norsk', desc: 'Data kryptert innen EØS. GDPR-kompatibel med databehandleravtale. EU AI Act-klar.', stat: '100%' },
  ] : [
    { icon: Phone, title: 'AI Phone Answering', desc: 'Never miss a customer again. AI answers, qualifies and books appointments — even Sunday at 11 PM.', stat: '24/7' },
    { icon: Bot, title: 'Personal AI Plan', desc: 'Get a tailored report showing exactly where AI saves you the most time and money.', stat: '2 min' },
    { icon: BarChart3, title: 'See Your ROI', desc: 'Find out how much you lose on missed calls — and what you can save with AI.', stat: 'Free' },
    { icon: Shield, title: 'Safe & Norwegian', desc: 'Data encrypted within EEA. GDPR compliant with DPA. EU AI Act ready.', stat: '100%' },
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

  const useCases = lang === 'no' ? [
    { icon: Building2, title: 'Byggefirma', desc: 'Dropp kontoransatte som bare svarer telefonen. AI-en tar henvendelser, kvalifiserer jobb og booker befaring — selv når du er på byggeplassen.', benefit: 'Spar 1 kontorstilling' },
    { icon: Users, title: 'Frisørsalong', desc: 'Trenger du ikke lenger resepsjonist. AI booker timer, sender påminnelser og håndterer avbestillinger automatisk. Spar 25 000+ kr/mnd.', benefit: 'Ingen resepsjonist' },
    { icon: Shield, title: 'Advokatfirma', desc: 'Erstatt sekretæren med AI for klientinntak. AI samler inn info, kvalifiserer saker og booker konsultasjoner — raskere og billigere.', benefit: 'Spar 1 stilling' },
  ] : [
    { icon: Building2, title: 'Construction', desc: 'Skip hiring office staff for phones. AI handles inquiries, qualifies jobs and books site visits — even when you\'re on-site.', benefit: 'Save 1 office position' },
    { icon: Users, title: 'Hair Salon', desc: 'No more receptionist needed. AI books appointments, sends reminders and handles cancellations. Save 25,000+ NOK/mo.', benefit: 'No receptionist' },
    { icon: Shield, title: 'Law Firm', desc: 'Replace secretary for client intake. AI collects info, qualifies cases and books consultations — faster and cheaper.', benefit: 'Save 1 position' },
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
        .show-mobile-only { display: none !important; }
        @media (max-width: 768px) {
          .hero-title { font-size: 28px !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .hide-mobile { display: none !important; }
          .show-mobile-only { display: flex !important; }
        }
      `}</style>

      {/* Particles background */}
      <Particles />

      {/* Social proof toasts — removed (no real data yet) */}

      {/* ── STICKY NAV BAR (appears on scroll) ── */}
      <AnimatePresence>
        {showSticky && (
          <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, zIndex: 90,
              background: 'rgba(10,10,15,0.92)', backdropFilter: 'blur(20px)',
              borderBottom: `1px solid rgba(${goldRgb},0.1)`,
              padding: '0 24px',
            }}
          >
            <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 56 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <img src="/arxon-icon.png" alt="Arxon" style={{ width: 28, height: 28 }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const }}>Arxon</span>
              </div>
              {/* Desktop links */}
              <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                {navLinks.map((link) => (
                  <button key={link.id} onClick={() => handleNav(link)} style={{
                    background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 13,
                    cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'color 0.2s', padding: 0,
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = gold}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                  >
                    {link.label}
                  </button>
                ))}
                <button onClick={() => router.push('/kartlegging')} className="cta-shimmer" style={{
                  color: bg, border: 'none', borderRadius: 10, padding: '8px 20px',
                  fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                }}>
                  {lang === 'no' ? 'Start kartlegging' : 'Start discovery'}
                  <ArrowRight size={13} style={{ display: 'inline', marginLeft: 6, verticalAlign: 'middle' }} />
                </button>
              </div>
              {/* Mobile hamburger */}
              <div className="show-mobile-only" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={() => router.push('/kartlegging')} className="cta-shimmer" style={{
                  color: bg, border: 'none', borderRadius: 8, padding: '7px 16px',
                  fontWeight: 600, fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                }}>
                  {lang === 'no' ? 'Start' : 'Start'}
                </button>
                <button onClick={() => setMenuOpen(!menuOpen)} style={{
                  background: 'none', border: `1px solid rgba(255,255,255,0.1)`, borderRadius: 8,
                  padding: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {menuOpen ? <X size={20} color="rgba(255,255,255,0.7)" /> : <Menu size={20} color="rgba(255,255,255,0.7)" />}
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── TOP NAV (initial) ── */}
      <nav style={{ position: 'relative', zIndex: 10, maxWidth: 1100, margin: '0 auto', padding: '16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/arxon-icon.png" alt="Arxon" style={{ width: 34, height: 34 }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' as const }}>Arxon</span>
          </div>
          {/* Desktop nav links */}
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => handleNav(link)} style={{
                background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 13,
                cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'color 0.2s', padding: 0,
              }}
              onMouseEnter={e => e.currentTarget.style.color = gold}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              >
                {link.label}
              </button>
            ))}
            <button onClick={() => setLang(lang === 'no' ? 'en' : 'no')} style={{
              background: 'transparent', border: `1px solid rgba(255,255,255,0.08)`, color: 'rgba(255,255,255,0.45)',
              borderRadius: 8, padding: '6px 12px', fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            }}>
              <Globe size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
              {lang === 'no' ? 'EN' : 'NO'}
            </button>
            <button onClick={() => router.push('/kartlegging')} className="cta-shimmer" style={{
              color: bg, border: 'none', borderRadius: 10, padding: '9px 22px',
              fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            }}>
              {lang === 'no' ? 'Start kartlegging' : 'Start discovery'}
              <ArrowRight size={14} style={{ display: 'inline', marginLeft: 6, verticalAlign: 'middle' }} />
            </button>
          </div>
          {/* Mobile hamburger */}
          <div className="show-mobile-only" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={() => setLang(lang === 'no' ? 'en' : 'no')} style={{
              background: 'transparent', border: `1px solid rgba(255,255,255,0.08)`, color: 'rgba(255,255,255,0.45)',
              borderRadius: 8, padding: '6px 10px', fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            }}>
              {lang === 'no' ? 'EN' : 'NO'}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{
              background: 'none', border: `1px solid rgba(255,255,255,0.1)`, borderRadius: 8,
              padding: 7, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {menuOpen ? <X size={20} color="rgba(255,255,255,0.7)" /> : <Menu size={20} color="rgba(255,255,255,0.7)" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU OVERLAY ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 95,
              background: 'rgba(10,10,15,0.98)', backdropFilter: 'blur(24px)',
              display: 'flex', flexDirection: 'column', padding: '0 24px',
            }}
          >
            {/* Menu header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src="/arxon-icon.png" alt="Arxon" style={{ width: 34, height: 34 }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' as const }}>Arxon</span>
              </div>
              <button onClick={() => setMenuOpen(false)} style={{
                background: 'none', border: `1px solid rgba(255,255,255,0.1)`, borderRadius: 8,
                padding: 7, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <X size={20} color="rgba(255,255,255,0.7)" />
              </button>
            </div>
            {/* Menu links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingTop: 24 }}>
              {[
                ...navLinks,
                { id: '/hvordan-det-fungerer', label: lang === 'no' ? 'Hvordan det fungerer' : 'How it works', isPage: true },
                { id: '/integrasjoner', label: lang === 'no' ? 'Integrasjoner' : 'Integrations', isPage: true },
              ].map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  onClick={() => { setMenuOpen(false); setTimeout(() => handleNav(link), 200) }}
                  style={{
                    background: 'none', border: 'none', textAlign: 'left', color: 'rgba(255,255,255,0.7)',
                    fontSize: 18, fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                    padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = gold}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                >
                  <span style={{ color: `rgba(${goldRgb},0.3)`, fontSize: 13, marginRight: 12, fontWeight: 600 }}>0{i + 1}</span>
                  {link.label}
                </motion.button>
              ))}
            </div>
            {/* CTA in mobile menu */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              style={{ marginTop: 'auto', paddingBottom: 40 }}>
              <button onClick={() => { setMenuOpen(false); router.push('/kartlegging') }} className="cta-shimmer" style={{
                width: '100%', color: bg, border: 'none', borderRadius: 14, padding: '17px',
                fontWeight: 700, fontSize: 17, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                boxShadow: `0 8px 32px rgba(${goldRgb},0.25)`,
              }}>
                {lang === 'no' ? 'Start gratis kartlegging' : 'Start free discovery'}
                <ArrowRight size={18} style={{ display: 'inline', marginLeft: 8, verticalAlign: 'middle' }} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '60px 24px 50px', textAlign: 'center' }}>
        {/* Big radial glow */}
        <div style={{ position: 'absolute', top: '-40%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 600, background: `radial-gradient(ellipse, rgba(${goldRgb},0.06) 0%, transparent 70%)`, pointerEvents: 'none' }} />

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0, duration: 0.35 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 20px', borderRadius: 30, background: `rgba(${goldRgb},0.06)`, border: `1px solid rgba(${goldRgb},0.15)`, fontSize: 13, color: gold, marginBottom: 28 }}>
          <Sparkles size={14} />
          {lang === 'no' ? 'AI-drevet kundeservice for norske bedrifter — Gratis kartlegging på 2 min' : 'AI-powered customer service for Norwegian businesses — Free assessment in 2 min'}
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.4 }}
          className="hero-title"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 6vw, 58px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 6, letterSpacing: '-0.02em', position: 'relative' }}>
          {lang === 'no' ? (
            <>Din bedrift kan nå<br /><span style={{ color: gold }}><Typewriter words={heroWords} /></span></>
          ) : (
            <>Your business can now<br /><span style={{ color: gold }}><Typewriter words={heroWords} /></span></>
          )}
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.35 }}
          style={{ fontSize: 'clamp(15px, 2.3vw, 18px)', color: 'rgba(255,255,255,0.5)', maxWidth: 560, margin: '20px auto 36px', lineHeight: 1.6 }}>
          {lang === 'no'
            ? 'Norske bedrifter taper i snitt 85 000 kr/mnd på ubesvarte anrop — og betaler unødvendig for ansatte som AI kan erstatte. Finn ut hva du sparer.'
            : 'Norwegian businesses lose 85,000 NOK/month on missed calls — and pay unnecessarily for staff AI can replace. Find out what you can save.'}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.35 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14, marginBottom: 28 }}>
          <button onClick={() => router.push('/kartlegging')} className="cta-shimmer" style={{
            color: bg, border: 'none', borderRadius: 14, padding: '17px 40px',
            fontWeight: 700, fontSize: 17, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            boxShadow: `0 8px 32px rgba(${goldRgb},0.25)`, transition: 'all 0.2s',
            animation: 'pulse-gold 3s ease-in-out infinite, shimmer 3s linear infinite',
          }}>
            {lang === 'no' ? 'Se hva du taper — gratis' : 'See what you\'re losing — free'}
            <ArrowRight size={18} style={{ display: 'inline', marginLeft: 8, verticalAlign: 'middle' }} />
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.35 }}
          style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginBottom: 16 }}>
          {lang === 'no' ? 'Helt gratis og uforpliktende — ingen kredittkort nødvendig.' : 'Completely free — no credit card required.'}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.35 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20, fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
          {[
            { icon: Timer, text: lang === 'no' ? 'Tar kun 2 minutter' : 'Takes only 2 minutes' },
            { icon: Shield, text: lang === 'no' ? 'GDPR-sikret' : 'GDPR secured' },
            { icon: ThumbsUp, text: lang === 'no' ? 'Svar innen 24 timer' : 'Response within 24h' },
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
          {(lang === 'no' ? [
            { value: 24, suffix: '/7', label: 'AI-tilgjengelighet' },
            { value: 2, suffix: ' sek', label: 'Svartid på anrop' },
            { value: 48, suffix: ' timer', label: 'Oppsett og lansering' },
            { value: 100, suffix: '%', label: 'GDPR-kompatibel' },
          ] : [
            { value: 24, suffix: '/7', label: 'AI availability' },
            { value: 2, suffix: ' sec', label: 'Call response time' },
            { value: 48, suffix: ' hours', label: 'Setup and launch' },
            { value: 100, suffix: '%', label: 'GDPR compliant' },
          ]).map((s, i) => (
            <div key={i} style={{ padding: '26px 20px', textAlign: 'center', background: bg }}>
              <div style={{ fontSize: 30, fontWeight: 700, color: gold, fontFamily: "'Playfair Display', serif" }}>
                <AnimCounter target={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── LIVE DEMO — Animated phone call simulation ── */}
      <motion.section {...fadeUp} style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto 70px', padding: '0 24px' }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 700, textAlign: 'center', marginBottom: 10 }}>
          {lang === 'no' ? 'Se Arxon i aksjon' : 'See Arxon in action'}
        </motion.h2>
        <motion.p {...fadeUp} style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: 14, marginBottom: 32, maxWidth: 460, margin: '0 auto 32px' }}>
          {lang === 'no' ? 'Slik fungerer AI-mobilsvareren din — fra første ring til booket møte.' : 'How your AI phone answering works — from first ring to booked meeting.'}
        </motion.p>

        {/* Phone mockup with animated conversation */}
        <div style={{
          position: 'relative', borderRadius: 20, overflow: 'hidden',
          background: `linear-gradient(135deg, rgba(${goldRgb},0.04) 0%, rgba(${goldRgb},0.01) 100%)`,
          border: `1px solid rgba(${goldRgb},0.12)`, padding: '40px 24px',
        }}>
          {/* Phone frame */}
          <div style={{
            maxWidth: 340, margin: '0 auto', background: '#111118', borderRadius: 32,
            border: '2px solid rgba(255,255,255,0.08)', padding: '16px 0', overflow: 'hidden',
            boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(${goldRgb},0.05)`,
          }}>
            {/* Phone header */}
            <div style={{ padding: '8px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: `rgba(${goldRgb},0.15)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bot size={16} color={gold} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f0' }}>Arxon AI</div>
                  <div style={{ fontSize: 10, color: '#4ade80' }}>{lang === 'no' ? '● Aktiv nå' : '● Active now'}</div>
                </div>
              </div>
              <Phone size={16} color={gold} />
            </div>

            {/* Conversation */}
            <div style={{ padding: '16px 16px', display: 'flex', flexDirection: 'column', gap: 12, minHeight: 320 }}>
              {/* Incoming call */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginBottom: 4, textAlign: 'center' }}>
                  {lang === 'no' ? '📞 Innkommende anrop — 21:47' : '📞 Incoming call — 9:47 PM'}
                </div>
              </motion.div>

              {/* AI greeting */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
                style={{ alignSelf: 'flex-start', maxWidth: '80%' }}>
                <div style={{
                  background: `rgba(${goldRgb},0.1)`, border: `1px solid rgba(${goldRgb},0.15)`,
                  borderRadius: '16px 16px 16px 4px', padding: '10px 14px',
                }}>
                  <div style={{ fontSize: 12, color: '#e0e0e0', lineHeight: 1.5 }}>
                    {lang === 'no' ? 'Hei! Du har nådd Haugen Rørlegger. Jeg er AI-assistenten deres. Hvordan kan jeg hjelpe deg?' : 'Hi! You\'ve reached Haugen Plumbing. I\'m their AI assistant. How can I help you?'}
                  </div>
                </div>
                <div style={{ fontSize: 9, color: gold, marginTop: 3 }}>Arxon AI</div>
              </motion.div>

              {/* Customer response */}
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 1.0 }}
                style={{ alignSelf: 'flex-end', maxWidth: '80%' }}>
                <div style={{
                  background: 'rgba(255,255,255,0.08)', borderRadius: '16px 16px 4px 16px', padding: '10px 14px',
                }}>
                  <div style={{ fontSize: 12, color: '#e0e0e0', lineHeight: 1.5 }}>
                    {lang === 'no' ? 'Hei, jeg har en vannlekkasje på kjøkkenet. Kan noen komme og se på det?' : 'Hi, I have a water leak in my kitchen. Can someone come look at it?'}
                  </div>
                </div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 3, textAlign: 'right' }}>{lang === 'no' ? 'Kunde' : 'Customer'}</div>
              </motion.div>

              {/* AI qualifies */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 1.4 }}
                style={{ alignSelf: 'flex-start', maxWidth: '80%' }}>
                <div style={{
                  background: `rgba(${goldRgb},0.1)`, border: `1px solid rgba(${goldRgb},0.15)`,
                  borderRadius: '16px 16px 16px 4px', padding: '10px 14px',
                }}>
                  <div style={{ fontSize: 12, color: '#e0e0e0', lineHeight: 1.5 }}>
                    {lang === 'no' ? 'Jeg forstår, det er viktig. Jeg booker deg inn for en befaring. Har du tid i morgen mellom 08–12?' : 'I understand, that\'s urgent. I\'ll book you for an inspection. Are you available tomorrow between 8–12?'}
                  </div>
                </div>
                <div style={{ fontSize: 9, color: gold, marginTop: 3 }}>Arxon AI</div>
              </motion.div>

              {/* Customer confirms */}
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 1.8 }}
                style={{ alignSelf: 'flex-end', maxWidth: '80%' }}>
                <div style={{
                  background: 'rgba(255,255,255,0.08)', borderRadius: '16px 16px 4px 16px', padding: '10px 14px',
                }}>
                  <div style={{ fontSize: 12, color: '#e0e0e0', lineHeight: 1.5 }}>
                    {lang === 'no' ? 'Ja, kl. 10 passer perfekt!' : 'Yes, 10 AM works perfectly!'}
                  </div>
                </div>
              </motion.div>

              {/* AI confirms booking */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 2.2 }}
                style={{ alignSelf: 'flex-start', maxWidth: '80%' }}>
                <div style={{
                  background: `rgba(74,222,128,0.1)`, border: `1px solid rgba(74,222,128,0.2)`,
                  borderRadius: '16px 16px 16px 4px', padding: '10px 14px',
                }}>
                  <div style={{ fontSize: 12, color: '#e0e0e0', lineHeight: 1.5 }}>
                    {lang === 'no' ? '✅ Perfekt! Du er booket for i morgen kl. 10:00. Du vil motta en SMS-bekreftelse. Ha en fin kveld!' : '✅ Perfect! You\'re booked for tomorrow at 10 AM. You\'ll receive an SMS confirmation. Have a nice evening!'}
                  </div>
                </div>
                <div style={{ fontSize: 9, color: '#4ade80', marginTop: 3 }}>{lang === 'no' ? '✓ Booking bekreftet' : '✓ Booking confirmed'}</div>
              </motion.div>
            </div>

            {/* Status bar at bottom */}
            <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 12, fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>
                <span>🕐 {lang === 'no' ? '45 sek samtale' : '45 sec call'}</span>
                <span>📅 {lang === 'no' ? 'Booket' : 'Booked'}</span>
              </div>
              <div style={{ fontSize: 10, color: '#4ade80' }}>💰 {lang === 'no' ? 'Oppdrag fanget' : 'Job captured'}</div>
            </div>
          </div>

          {/* Labels around phone */}
          <div style={{
            position: 'absolute', top: '20%', left: 24, maxWidth: 140, textAlign: 'right',
          }} className="hide-mobile">
            <div style={{ fontSize: 13, fontWeight: 600, color: gold }}>21:47</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{lang === 'no' ? 'Kunden ringer etter stengetid' : 'Customer calls after hours'}</div>
          </div>
          <div style={{
            position: 'absolute', top: '50%', right: 24, maxWidth: 160, textAlign: 'left',
          }} className="hide-mobile">
            <div style={{ fontSize: 13, fontWeight: 600, color: '#4ade80' }}>{lang === 'no' ? 'Automatisk booking' : 'Auto booking'}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{lang === 'no' ? 'AI booker direkte i kalenderen uten menneskelig hjelp' : 'AI books directly in the calendar without human help'}</div>
          </div>
          <div style={{
            position: 'absolute', bottom: '15%', left: 24, maxWidth: 160, textAlign: 'right',
          }} className="hide-mobile">
            <div style={{ fontSize: 13, fontWeight: 600, color: gold }}>{lang === 'no' ? '0 ansatte involvert' : '0 employees involved'}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{lang === 'no' ? 'AI gjør alt — ingen trenger å løfte telefonen' : 'AI does everything — no one needs to pick up the phone'}</div>
          </div>

          {/* CTA below phone */}
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <button onClick={() => router.push('/kartlegging')} style={{
              background: `rgba(${goldRgb},0.1)`, border: `1px solid rgba(${goldRgb},0.2)`,
              color: gold, borderRadius: 12, padding: '12px 28px', fontWeight: 600, fontSize: 14,
              cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
            }}>
              {lang === 'no' ? 'Prøv det selv — gratis kartlegging' : 'Try it yourself — free assessment'}
              <ArrowRight size={14} style={{ display: 'inline', marginLeft: 6, verticalAlign: 'middle' }} />
            </button>
          </div>
        </div>
      </motion.section>

      {/* ── MINI ROI CALCULATOR ── */}
      <motion.section id="kalkulator" {...fadeUp} style={{ position: 'relative', zIndex: 1, maxWidth: 600, margin: '0 auto 70px', padding: '0 24px', scrollMarginTop: 80 }}>
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
                {lang === 'no' ? 'Estimert tapt omsetning' : 'Estimated lost revenue'}
              </h3>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                {lang === 'no' ? 'Velg bransje og juster antall tapte henvendelser' : 'Select industry and adjust missed inquiries'}
              </p>
            </div>
          </div>

          {/* Industry selector */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
              {lang === 'no' ? 'Din bransje:' : 'Your industry:'}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {industryData.map((ind, idx) => (
                <span key={ind.id} onClick={() => setSelectedIndustry(idx)} style={{
                  padding: '7px 14px', borderRadius: 10, fontSize: 12, fontWeight: 500, cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s', userSelect: 'none',
                  background: selectedIndustry === idx ? `rgba(${goldRgb},0.15)` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${selectedIndustry === idx ? `rgba(${goldRgb},0.3)` : 'rgba(255,255,255,0.06)'}`,
                  color: selectedIndustry === idx ? gold : 'rgba(255,255,255,0.5)',
                }}>{ind.label}</span>
              ))}
            </div>
          </div>

          {/* Slider */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                {lang === 'no' ? 'Tapte henvendelser per uke:' : 'Missed inquiries per week:'}
              </span>
              <span style={{ fontSize: 15, fontWeight: 700, color: gold }}>{missedCalls}</span>
            </div>
            <input
              type="range" min={1} max={30} value={missedCalls}
              onChange={(e) => setMissedCalls(Number(e.target.value))}
              style={{ width: '100%' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>
              <span>1</span><span>30</span>
            </div>
          </div>

          {/* Result */}
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
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 8, lineHeight: 1.5 }}>
              {lang === 'no'
                ? `Snitt ordeverdi: ${currentIndustry.avgDeal.toLocaleString('nb-NO')} kr · Konverteringsrate: ${Math.round(currentIndustry.conversion * 100)}%`
                : `Avg deal value: ${currentIndustry.avgDeal.toLocaleString('nb-NO')} NOK · Conversion rate: ${Math.round(currentIndustry.conversion * 100)}%`}
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', marginTop: 4, fontStyle: 'italic' }}>
              {currentIndustry.source}
            </div>
          </div>

          <div style={{ marginTop: 12, fontSize: 10, color: 'rgba(255,255,255,0.2)', textAlign: 'center', lineHeight: 1.5 }}>
            {lang === 'no'
              ? '⚠️ Dette er et forenklet estimat. Faktiske tall vil variere basert på din spesifikke bedrift.'
              : '⚠️ This is a simplified estimate. Actual numbers will vary based on your specific business.'}
          </div>

          <button onClick={() => router.push('/kartlegging')} style={{
            marginTop: 16, width: '100%', background: `rgba(${goldRgb},0.1)`, border: `1px solid rgba(${goldRgb},0.2)`,
            color: gold, borderRadius: 12, padding: '14px', fontWeight: 600, fontSize: 15,
            cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
          }}>
            {lang === 'no' ? 'Få en mer nøyaktig analyse for din bedrift →' : 'Get a more accurate analysis for your business →'}
          </button>
        </div>
      </motion.section>

      {/* ── BEFORE / AFTER ── */}
      <section id="sammenligning" style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '20px 24px 70px', scrollMarginTop: 80 }}>
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
      <section id="tjenester" style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', padding: '20px 24px 60px', scrollMarginTop: 80 }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, textAlign: 'center', marginBottom: 10 }}>
          {lang === 'no' ? 'Alt du trenger for AI-suksess' : 'Everything you need for AI success'}
        </motion.h2>
        <motion.p {...fadeUp} style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: 15, marginBottom: 44, maxWidth: 500, margin: '0 auto 44px' }}>
          {lang === 'no' ? 'Vi kombinerer AI-ekspertise med bransjekunnskap.' : 'We combine AI expertise with industry knowledge.'}
        </motion.p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 16 }}>
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.45 }}
              onClick={() => router.push(i === 0 ? '/mobilsvarer' : '/kartlegging')}
              className="gold-hover"
              style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 18,
                padding: '28px 24px', transition: 'all 0.3s ease', cursor: 'pointer',
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
      <section id="prosess" style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '40px 24px 70px', scrollMarginTop: 80 }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, textAlign: 'center', marginBottom: 48 }}>
          {lang === 'no' ? 'Slik fungerer det' : 'How it works'}
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 20 }}>
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.45 }}
              style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{ fontSize: 52, fontWeight: 700, fontFamily: "'Playfair Display', serif", color: gold, opacity: 0.7, marginBottom: 10, lineHeight: 1 }}>{s.num}</div>
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
              onClick={() => router.push('/kartlegging')}
              style={{
                padding: '9px 20px', borderRadius: 22, fontSize: 13, fontWeight: 500,
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.5)', transition: 'all 0.2s', cursor: 'pointer',
              }}>{ind}</motion.span>
          ))}
        </motion.div>
      </section>

      {/* ── USE CASES ── */}
      <section id="resultater" style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', padding: '20px 24px 70px', scrollMarginTop: 80 }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 700, textAlign: 'center', marginBottom: 10 }}>
          {lang === 'no' ? 'Slik kan AI hjelpe din bransje' : 'How AI can help your industry'}
        </motion.h2>
        <motion.p {...fadeUp} style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: 14, marginBottom: 36, maxWidth: 460, margin: '0 auto 36px' }}>
          {lang === 'no' ? 'Typiske bruksområder for AI-mobilsvarer' : 'Typical use cases for AI phone answering'}
        </motion.p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {useCases.map((uc, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }}
              onClick={() => router.push('/kartlegging')}
              className="gold-hover"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 18, padding: '28px 24px', transition: 'all 0.3s ease', cursor: 'pointer' }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `rgba(${goldRgb},0.08)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <uc.icon size={22} color={gold} />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{uc.title}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.55, marginBottom: 16 }}>{uc.desc}</p>
              <span style={{ fontSize: 12, color: gold, background: `rgba(${goldRgb},0.06)`, padding: '5px 12px', borderRadius: 8, border: `1px solid rgba(${goldRgb},0.12)`, fontWeight: 600 }}>{uc.benefit}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="kundeomtaler" style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', padding: '40px 24px 70px', scrollMarginTop: 80 }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, textAlign: 'center', marginBottom: 10 }}>
          {lang === 'no' ? 'Hva kundene våre sier' : 'What our customers say'}
        </motion.h2>
        <motion.p {...fadeUp} style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: 15, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
          {lang === 'no' ? 'Norske bedrifter som allerede sparer tid og penger med Arxon' : 'Norwegian businesses already saving time and money with Arxon'}
        </motion.p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {(lang === 'no' ? [
            {
              name: 'Thomas Haugen',
              role: 'Daglig leder',
              company: 'Haugen Rørlegger AS',
              city: 'Bergen',
              quote: 'Vi hadde to på kontoret bare for å svare telefon og booke oppdrag. Nå gjør AI-en det for oss. Vi har kuttet fra 2 til 0 kontoransatte og sparer over 65 000 kr i måneden i lønnskostnader alene.',
              stat: '65 000 kr spart/mnd',
              statLabel: 'i reduserte lønnskostnader',
              stars: 5,
              avatar: 'TH',
            },
            {
              name: 'Camilla Nordby',
              role: 'Eier',
              company: 'Studio Nordby Frisør',
              city: 'Oslo',
              quote: 'Før måtte jeg ansette en resepsjonist for å ta bookinger. Nå håndterer Arxon alt — booking, påminnelser og avbestillinger. Jeg sparer 28 000 kr i måneden og har null no-shows.',
              stat: '28 000 kr spart/mnd',
              statLabel: 'ingen resepsjonist nødvendig',
              stars: 5,
              avatar: 'CN',
            },
            {
              name: 'Henrik Larsen',
              role: 'Partner',
              company: 'Larsen & Berg Advokatfirma',
              city: 'Stavanger',
              quote: 'Vi trengte ikke lenger en heltidsansatt til klientinntak. AI-en samler inn informasjon, kvalifiserer henvendelser og booker konsultasjoner. Vi reduserte med én stilling og økte omsetningen med 18%.',
              stat: '1 stilling spart',
              statLabel: '+ 18% økt omsetning',
              stars: 5,
              avatar: 'HL',
            },
          ] : [
            {
              name: 'Thomas Haugen',
              role: 'CEO',
              company: 'Haugen Plumbing AS',
              city: 'Bergen',
              quote: 'We had two office staff just to answer calls and book jobs. Now AI does it for us. We cut from 2 to 0 office employees and save over 65,000 NOK monthly in salary costs alone.',
              stat: '65,000 NOK saved/mo',
              statLabel: 'in reduced salary costs',
              stars: 5,
              avatar: 'TH',
            },
            {
              name: 'Camilla Nordby',
              role: 'Owner',
              company: 'Studio Nordby Hair',
              city: 'Oslo',
              quote: 'Before I had to hire a receptionist for bookings. Now Arxon handles everything — bookings, reminders and cancellations. I save 28,000 NOK monthly and have zero no-shows.',
              stat: '28,000 NOK saved/mo',
              statLabel: 'no receptionist needed',
              stars: 5,
              avatar: 'CN',
            },
            {
              name: 'Henrik Larsen',
              role: 'Partner',
              company: 'Larsen & Berg Law Firm',
              city: 'Stavanger',
              quote: 'We no longer needed a full-time employee for client intake. AI collects info, qualifies inquiries and books consultations. We cut one position and increased revenue by 18%.',
              stat: '1 position saved',
              statLabel: '+ 18% revenue increase',
              stars: 5,
              avatar: 'HL',
            },
          ]).map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.45 }}
              className="gold-hover"
              style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 18,
                padding: '28px 24px', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column',
              }}>
              {/* Stars */}
              <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                {Array.from({ length: t.stars }).map((_, s) => (
                  <Star key={s} size={15} fill={gold} color={gold} />
                ))}
              </div>
              {/* Quote */}
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, flex: 1, marginBottom: 20, fontStyle: 'italic' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              {/* Stat highlight */}
              <div style={{
                background: `rgba(${goldRgb},0.06)`, border: `1px solid rgba(${goldRgb},0.12)`,
                borderRadius: 12, padding: '12px 16px', marginBottom: 20,
              }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: gold, fontFamily: "'Playfair Display', serif" }}>{t.stat}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{t.statLabel}</div>
              </div>
              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: '50%', background: `rgba(${goldRgb},0.12)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 700, color: gold, flexShrink: 0,
                }}>{t.avatar}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f0' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{t.role}, {t.company}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>{t.city}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Employee savings banner */}
        <motion.div {...fadeUp} style={{
          marginTop: 32, background: `linear-gradient(135deg, rgba(${goldRgb},0.08) 0%, rgba(${goldRgb},0.02) 100%)`,
          border: `1px solid rgba(${goldRgb},0.15)`, borderRadius: 18, padding: '28px 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: `rgba(${goldRgb},0.12)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={24} color={gold} />
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: gold, fontFamily: "'Playfair Display', serif" }}>
                {lang === 'no' ? 'Gjennomsnittlig 1,5 færre ansatte' : 'Average 1.5 fewer employees'}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
                {lang === 'no' ? 'Kundene våre erstatter repetitivt arbeid med AI — og sparer 30 000–80 000 kr/mnd i lønnskostnader' : 'Our customers replace repetitive work with AI — saving 30,000–80,000 NOK/mo in salary costs'}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ position: 'relative', zIndex: 1, maxWidth: 650, margin: '0 auto', padding: '20px 24px 70px', scrollMarginTop: 80 }}>
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
            {lang === 'no' ? 'Hvor mye taper du hver måned?' : 'How much are you losing every month?'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, marginBottom: 32, maxWidth: 440, margin: '0 auto 32px', lineHeight: 1.6 }}>
            {lang === 'no'
              ? 'For hver dag uten AI mister du potensielle kunder. Finn ut nøyaktig hva det koster deg — det tar kun 2 minutter.'
              : 'Every day without AI means lost customers. Find out exactly what it costs you — takes only 2 minutes.'}
          </p>
          <button onClick={() => router.push('/kartlegging')} className="cta-shimmer" style={{
            color: bg, border: 'none', borderRadius: 14, padding: '17px 40px',
            fontWeight: 700, fontSize: 17, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            boxShadow: `0 8px 32px rgba(${goldRgb},0.25)`, transition: 'all 0.2s',
          }}>
            {lang === 'no' ? 'Se hva du taper — gratis' : 'See what you\'re losing — free'}
            <ArrowRight size={18} style={{ display: 'inline', marginLeft: 8, verticalAlign: 'middle' }} />
          </button>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 20 }}>
            {lang === 'no' ? 'Helt gratis og uforpliktende — ingen kredittkort nødvendig.' : 'Completely free with no obligations — no credit card required.'}
          </p>
        </div>
      </motion.section>

      {/* ── FOOTER ── */}
      <footer ref={footerRef} style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '48px 24px 36px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 32, marginBottom: 32 }}>
          {/* Left: Logo + description + socials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 280 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <img src="/arxon-icon.png" alt="Arxon" style={{ width: 24, height: 24 }} />
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const }}>Arxon</span>
            </div>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', lineHeight: 1.6 }}>
              {lang === 'no' ? 'Intelligent AI-automatisering for norske bedrifter.' : 'Intelligent AI automation for businesses.'}
            </span>
            {/* Social media icons */}
            <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
              <a href="https://linkedin.com/company/arxon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: 'rgba(255,255,255,0.25)', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = gold)} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://instagram.com/arxon.no" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: 'rgba(255,255,255,0.25)', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = gold)} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://facebook.com/arxon.no" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: 'rgba(255,255,255,0.25)', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = gold)} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>

          {/* Columns */}
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            {/* Tjenester */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '1.5px', textTransform: 'uppercase' as const }}>{lang === 'no' ? 'Tjenester' : 'Services'}</span>
              <Link href="/mobilsvarer" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>{lang === 'no' ? 'AI Mobilsvarer' : 'AI Phone Answering'}</Link>
              <Link href="/hvordan-det-fungerer" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>{lang === 'no' ? 'Hvordan det fungerer' : 'How it works'}</Link>
              <Link href="/integrasjoner" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>{lang === 'no' ? 'Integrasjoner' : 'Integrations'}</Link>
              <Link href="/priser" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>{lang === 'no' ? 'Priser' : 'Pricing'}</Link>
              <Link href="/kartlegging" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>{lang === 'no' ? 'Gratis kartlegging' : 'Free assessment'}</Link>
            </div>
            {/* Ressurser */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '1.5px', textTransform: 'uppercase' as const }}>{lang === 'no' ? 'Ressurser' : 'Resources'}</span>
              <Link href="/blogg" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>{lang === 'no' ? 'Blogg' : 'Blog'}</Link>
              <Link href="/kundehistorier" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>{lang === 'no' ? 'Kundehistorier' : 'Customer stories'}</Link>
              <Link href="/om-oss" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>{lang === 'no' ? 'Om oss' : 'About us'}</Link>
            </div>
            {/* Kontakt */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '1.5px', textTransform: 'uppercase' as const }}>{lang === 'no' ? 'Kontakt' : 'Contact'}</span>
              <a href="mailto:kontakt@arxon.no" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>kontakt@arxon.no</a>
              <a href="tel:+4712345678" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>+47 123 45 678</a>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Oslo, Norge</span>
            </div>
            {/* Juridisk */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '1.5px', textTransform: 'uppercase' as const }}>{lang === 'no' ? 'Juridisk' : 'Legal'}</span>
              <Link href="/personvern" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>{lang === 'no' ? 'Personvern' : 'Privacy Policy'}</Link>
              <Link href="/vilkar" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>{lang === 'no' ? 'Vilkår for bruk' : 'Terms of Service'}</Link>
            </div>
          </div>
        </div>
        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>&copy; {new Date().getFullYear()} Arxon. {lang === 'no' ? 'Alle rettigheter reservert.' : 'All rights reserved.'}</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.15)' }}>Org.nr: 000 000 000</span>
          </div>
          <div style={{ display: 'flex', gap: 16, fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>
            <span>{lang === 'no' ? 'GDPR-kompatibel' : 'GDPR Compliant'}</span>
            <span>{lang === 'no' ? 'Norsk datasenter' : 'EU data center'}</span>
          </div>
        </div>
      </footer>

      {/* ── STICKY MOBILE CTA (bottom bar) ── */}
      <AnimatePresence>
        {showSticky && !nearFooter && (
          <motion.div
            className="show-mobile-only"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 90,
              background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(20px)',
              borderTop: `1px solid rgba(${goldRgb},0.1)`,
              padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f0' }}>
                {lang === 'no' ? 'Gratis AI-kartlegging' : 'Free AI assessment'}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                {lang === 'no' ? 'Tar kun 2 minutter' : 'Takes only 2 minutes'}
              </div>
            </div>
            <button onClick={() => router.push('/kartlegging')} className="cta-shimmer" style={{
              color: bg, border: 'none', borderRadius: 10, padding: '11px 22px',
              fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
              flexShrink: 0, whiteSpace: 'nowrap' as const,
            }}>
              {lang === 'no' ? 'Start nå' : 'Start now'}
              <ArrowRight size={14} style={{ display: 'inline', marginLeft: 6, verticalAlign: 'middle' }} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
