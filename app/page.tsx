'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, useInView, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import {
  ArrowRight, Phone, Bot, Zap, Shield, Clock, BarChart3,
  CheckCircle2, ChevronDown, Star, Users, TrendingUp, Building2,
  Sparkles, MessageSquare, FileText, Receipt, Megaphone, ClipboardList,
  Lock, ChevronRight, Calendar, Mail, Target, Play, Headphones,
  AlertTriangle, ArrowUpRight, PhoneOff, XCircle, Check, Heart
} from 'lucide-react'
import Nav from '@/app/components/Nav'

/* ── Constants ── */
const gold = '#c9a96e'
const goldLight = '#e2c47d'
const goldDark = '#b8944a'
const goldRgb = '201,169,110'

/* ── Arxon Logo SVG Component ── */
function ArxonLogo({ size = 'default' }: { size?: 'default' | 'large' | 'small' }) {
  const h = size === 'large' ? 44 : size === 'small' ? 28 : 34
  const iconScale = h / 44
  return (
    <div className="flex items-center gap-2" style={{ height: h }}>
      {/* Triangle A mark */}
      <svg width={h} height={h} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGold" x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#e2c47d" />
            <stop offset="50%" stopColor="#c9a96e" />
            <stop offset="100%" stopColor="#b8944a" />
          </linearGradient>
        </defs>
        <path d="M22 3 L4 40 L11 40 L17 28 L22 18 L27 28 L22 28 L18.5 35 L33 35 L37 40 L40 40 Z" fill="url(#logoGold)" />
      </svg>
      {/* ARXON text */}
      <span style={{
        fontSize: h * 0.55,
        fontWeight: 700,
        letterSpacing: h * 0.08,
        color: 'white',
        fontFamily: 'Inter, system-ui, sans-serif',
        lineHeight: 1,
      }}>ARXON</span>
    </div>
  )
}

/* ── Floating Orbs Background ── */
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large gold orb */}
      <div className="orb orb-1" />
      {/* Medium blue orb */}
      <div className="orb orb-2" />
      {/* Small gold orb */}
      <div className="orb orb-3" />
      {/* Grid overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(201,169,110,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,169,110,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 50% 60% at 50% 40%, black, transparent)',
      }} />
    </div>
  )
}

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
function Typewriter({ words }: { words: string[] }) {
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIdx]
    const timeout = deleting ? 40 : 80
    if (!deleting && charIdx === word.length) {
      setTimeout(() => setDeleting(true), 2200)
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
    <span className="text-gradient-gold">
      {words[wordIdx].substring(0, charIdx)}
      <span className="typewriter-cursor" />
    </span>
  )
}

/* ── Glow Card wrapper ── */
function GlowCard({ children, className = '', glowColor = goldRgb, delay = 0 }: {
  children: React.ReactNode; className?: string; glowColor?: string; delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={`glow-card ${className}`}
      style={{ '--glow-color': glowColor } as any}
    >
      {children}
    </motion.div>
  )
}

/* ── Industry data ── */
const industries = [
  { id: 'bygg', name: 'Bygg & Håndverk', icon: '🏗️', count: 12, topAutos: ['AI-telefonsvarer 24/7', 'Automatisk tilbudsforespørsel', 'Befaring-påminnelse + rute', 'Lead-scoring & CRM-sekvens'], benefit: 'Fanger 30-50% tapte henvendelser' },
  { id: 'salong', name: 'Salong & Skjønnhet', icon: '💇', count: 10, topAutos: ['AI-telefonsvarer med booking', 'Automatisk venteliste', 'Rebestilling-påminnelse', 'Instagram auto-posting'], benefit: 'Reduserer no-shows 70%' },
  { id: 'advokat', name: 'Advokatkontor', icon: '⚖️', count: 12, topAutos: ['AI-telefonsvarer førstekontakt', 'Saksdokument-oppsummering', 'Frist-påminnelser', 'GDPR audit-logg'], benefit: 'Kvalifiserer klienter 24/7' },
  { id: 'restaurant', name: 'Restaurant & Café', icon: '🍽️', count: 10, topAutos: ['AI-telefonsvar bestilling', 'Daglig råvarestatus', 'Ansattplan-varsling', 'SoMe auto-post matbilder'], benefit: 'AI svarer alltid, også i rushet' },
  { id: 'eiendom', name: 'Eiendomsmegling', icon: '🏠', count: 12, topAutos: ['AI-telefonsvarer visning', 'Automatisk boligpresentasjon', 'Visningsmatch', 'Lead-scoring ved visning'], benefit: 'Kvalifiserer interessenter 24/7' },
  { id: 'helse', name: 'Helse & Klinikk', icon: '🏥', count: 12, topAutos: ['AI-telefonsvarer timebestilling', 'Venteliste-håndtering', 'Oppfølging etter behandling', 'Timepåminnelse med forberedelse'], benefit: 'Avlaster resepsjonen 50-70%' },
  { id: 'ehandel', name: 'E-handel', icon: '🛒', count: 10, topAutos: ['Forlatt handlekurv-oppfølging', 'AI produktbeskrivelser', 'Lagerstatus-varsling', 'SoMe auto-post nye produkter'], benefit: 'Henter tilbake 10-15% forlatte kurver' },
  { id: 'regnskap', name: 'Regnskap & Konsulenter', icon: '📊', count: 8, topAutos: ['AI-telefonsvarer kundestøtte', 'Bilagshåndtering med AI', 'Momsfrister-varsling', 'Månedsrapport-generering'], benefit: 'Frigjør regnskapsførers tid' },
  { id: 'rekruttering', name: 'Rekruttering', icon: '👥', count: 8, topAutos: ['AI-screening av søknader', 'Auto kandidat-oppfølging', 'Intervjubooking', 'Onboarding-checklist ny ansatt'], benefit: 'Minutter i stedet for timer' },
  { id: 'bil', name: 'Bilverksted', icon: '🔧', count: 9, topAutos: ['AI-telefonsvarer verksted', 'Service-påminnelse', 'Dekkskifte-påminnelse', 'Reparasjonsstatus til kunde'], benefit: 'AI svarer, mekanikere jobber' },
  { id: 'coaching', name: 'Coaching', icon: '🎯', count: 8, topAutos: ['AI-booking med kvalifisering', 'Automatisk kurslevering', 'Oppfølging mellom sesjoner', 'Lead magnet-funnel'], benefit: 'Kurs selger 24/7' },
  { id: 'kreativt', name: 'Kreativt Byrå', icon: '🎨', count: 8, topAutos: ['Prosjektforespørsel-intake', 'Auto prosjekt-oppdatering', 'AI tilbudsgenerering', 'Portfolio auto-oppdatering'], benefit: 'Slipper 3 møter per brief' },
  { id: 'utdanning', name: 'Utdanning & Kurs', icon: '📚', count: 9, topAutos: ['AI-telefonsvar for påmelding', 'Kursplan-distribusjon', 'Venteliste-håndtering', 'Sertifikat-generering'], benefit: 'Null tapt påmelding' },
  { id: 'it', name: 'IT & Tech', icon: '💻', count: 8, topAutos: ['Ticket-triagering med AI', 'Serverovervåkning-varsling', 'Churn-prediksjon', 'Onboarding ny SaaS-kunde'], benefit: 'Sparer L1-support timer' },
  { id: 'trening', name: 'Trening & Fitness', icon: '💪', count: 8, topAutos: ['AI-booking treningsøkter', 'Treningsprogram-levering', 'Medlemsfornyelse', 'Prøvetime-oppfølging'], benefit: 'Fyller timer uten resepsjon' },
  { id: 'event', name: 'Event & Arrangement', icon: '🎪', count: 8, topAutos: ['Registrering + bekreftelse', 'Påminnelser før event', 'Leverandør-koordinering', 'Oppfølging etter event'], benefit: 'Profesjonell registrering' },
  { id: 'reiseliv', name: 'Reiseliv & Overnatting', icon: '🏨', count: 10, topAutos: ['AI-telefonsvarer reservasjoner', 'Digital selvinnsjekking', 'Gjeste-tilbakemelding + omtale', 'Sesongkampanjer'], benefit: 'Fanger gjester utenfor åpningstid' },
  { id: 'finans', name: 'Finans & Fintech', icon: '🏦', count: 8, topAutos: ['KYC-dokumentinnhenting', 'Transaksjonsovervåkning', 'GDPR audit-logg', 'Auto-purring'], benefit: 'Anti-hvitvasking automatisert' },
  { id: 'marked', name: 'Markedsføring & SEO', icon: '📈', count: 8, topAutos: ['AI-innholdsproduksjon', 'SEO-rangeringsovervåkning', 'Kampanjerapport-generering', 'SoMe auto-scheduling'], benefit: '70% raskere produksjon' },
  { id: 'logistikk', name: 'Logistikk & Transport', icon: '🚚', count: 8, topAutos: ['Sendingssporing + kundevarsling', 'Ruteoptimalisering-varsling', 'Lagerstatus-overvåkning', 'Avvikshåndtering'], benefit: 'Færre supporthenvendelser' },
  { id: 'ngo', name: 'NGO & Ideell', icon: '🤝', count: 8, topAutos: ['Donasjon-bekreftelse + takkemail', 'Frivillig-onboarding', 'Event-påmelding og påminnelser', 'Støttebrev-generering'], benefit: 'Donorer føler seg verdsatt' },
  { id: 'media', name: 'Media & Podkast', icon: '🎙️', count: 8, topAutos: ['Episode-publisering flerkanals', 'AI show-notes generering', 'Nyhetsbrev-automatisering', 'Klipp-generering for SoMe'], benefit: 'Publiser én gang, overalt' },
  { id: 'saas', name: 'SaaS & Produkt', icon: '☁️', count: 8, topAutos: ['Trial → betalende konvertering', 'Churn-forebygging', 'Feature request-tracking', 'Auto changelog'], benefit: 'Øker konverteringsrate' },
  { id: 'forvaltning', name: 'Eiendomsforvaltning', icon: '🏢', count: 8, topAutos: ['Vedlikeholdsforespørsel-workflow', 'Husleie-påminnelse + purring', 'Kontraktfornyelse-varsling', 'Felleskost-oppfølging'], benefit: 'Strukturert feilhåndtering' },
]

/* ── Automation categories ── */
const categories = [
  { name: 'Leads & Salg', icon: Target, desc: 'Fang leads automatisk, score dem, og bygg pipeline uten manuelt arbeid', color: '#4ade80', example: 'Lead-scraping, CRM-sekvenser, scoring' },
  { name: 'Kundeoppfølging', icon: MessageSquare, desc: 'AI svarer telefonen, følger opp kunder og fanger tapte henvendelser', color: '#60a5fa', example: 'AI-telefonsvarer, purring, NPS' },
  { name: 'Booking & Avtaler', icon: Calendar, desc: 'Reduser no-shows 60-80% med automatiske påminnelser og booking', color: '#c084fc', example: 'Booking, venteliste, påminnelser' },
  { name: 'Admin & Drift', icon: ClipboardList, desc: 'Onboarding, dokumenthåndtering og arbeidsflyt — på autopilot', color: '#fb923c', example: 'Onboarding, arkiv, oppgaver' },
  { name: 'Økonomi & Faktura', icon: Receipt, desc: 'Fakturering, purring og bilagshåndtering uten manuelle steg', color: '#f472b6', example: 'Auto-faktura, bilag, purring' },
  { name: 'Markedsføring', icon: Megaphone, desc: 'AI-generert innhold, SoMe auto-posting og kampanjer som kjører seg selv', color: '#a78bfa', example: 'SoMe, blogg, nyhetsbrev' },
  { name: 'Rapportering', icon: BarChart3, desc: 'KPI-dashboards og rapporter levert automatisk — ingen manuell analyse', color: '#2dd4bf', example: 'KPI-rapport, dashboard, analyse' },
  { name: 'Compliance & GDPR', icon: Lock, desc: 'Samtykke-logging, audit-trails og GDPR-compliance automatisert', color: '#fbbf24', example: 'Samtykke-logg, audit, KYC' },
]

/* ── Testimonials ── */
const testimonials = [
  { name: 'Martin K.', role: 'Daglig leder, Bygg & Håndverk', text: 'Vi tapte nesten 40% av henvendelsene fordi vi ikke rakk å svare telefonen på jobb. Nå svarer AI-en og booker befaring automatisk. Omsetningen økte med 25% på 3 måneder.', stars: 5, result: '+25% omsetning' },
  { name: 'Lena H.', role: 'Eier, Salong & Skjønnhet', text: 'No-shows var et enormt problem. Automatiske påminnelser + venteliste har redusert det fra 20% til under 5%. Og kundene booker timer mens jeg klipper!', stars: 5, result: '75% færre no-shows' },
  { name: 'Erik S.', role: 'Partner, Advokatkontor', text: 'Saksdokument-oppsummeringen sparer oss 30-60 minutter per sak. AI-telefonsvareren kvalifiserer klienter 24/7 — vi får bare relevante saker inn.', stars: 5, result: '60 min spart per sak' },
]

/* ── FAQ ── */
function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const items = [
    { q: 'Hva koster det å komme i gang?', a: 'Vi tilbyr gratis kartlegging som viser nøyaktig hvilke automatiseringer som gir mest verdi for din bedrift. Deretter får du et skreddersydd tilbud basert på dine behov — ingen skjulte kostnader.' },
    { q: 'Hvor lang tid tar implementeringen?', a: 'De fleste automatiseringer er oppe og kjører innen 2-5 virkedager. Enklere automatiseringer som påminnelser tar ofte bare 2-6 timer. Vi tar oss av alt teknisk.' },
    { q: 'Trenger jeg teknisk kunnskap?', a: 'Absolutt ikke. Vi setter opp, tester og vedlikeholder alt. Du trenger bare å fortelle oss hva som er viktig for din bedrift.' },
    { q: 'Er det trygt med tanke på GDPR?', a: 'Ja. All data lagres kryptert innen EØS. Vi følger GDPR og er EU AI Act-klare. Vi har innebygd samtykke-logging og audit-trails.' },
    { q: 'Hva hvis AI ikke passer for min bedrift?', a: 'Da forteller kartleggingen deg det. Vi er ærlige — hvis AI ikke gir nok verdi, anbefaler vi det ikke. Ingen bindinger, ingen risiko.' },
    { q: 'Kan jeg starte med én automatisering?', a: 'Absolutt! De fleste starter med 2-3 anbefalte automatiseringer og utvider etterhvert som de ser resultater.' },
  ]

  return (
    <div className="flex flex-col gap-3 max-w-[720px] mx-auto">
      {items.map((item, i) => (
        <div key={i} className="glow-card cursor-pointer transition-all duration-300"
          onClick={() => setOpen(open === i ? null : i)}
          style={{ '--glow-color': open === i ? goldRgb : '255,255,255' } as any}>
          <div className="flex justify-between items-center p-5">
            <span className="text-[15px] font-medium text-[#f0f0f0]">{item.q}</span>
            <ChevronDown size={18} className="flex-shrink-0 ml-3 transition-transform duration-300"
              style={{ color: gold, transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </div>
          <AnimatePresence>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                <div className="px-5 pb-5 text-sm text-white/[0.55] leading-[1.7]">{item.a}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

/* ── Social proof toast ── */
function LiveToast() {
  const [toast, setToast] = useState<{ name: string; city: string; action: string; time: string } | null>(null)
  const items = [
    { name: 'Martin', city: 'Oslo', action: 'startet gratis kartlegging' },
    { name: 'Lena', city: 'Bergen', action: 'fikk sin AI-analyse' },
    { name: 'Erik', city: 'Trondheim', action: 'startet gratis kartlegging' },
    { name: 'Sara', city: 'Stavanger', action: 'fikk 8 anbefalte automatiseringer' },
    { name: 'Jonas', city: 'Kristiansand', action: 'startet gratis kartlegging' },
    { name: 'Ida', city: 'Tromsø', action: 'fikk sin ROI-beregning' },
    { name: 'Anders', city: 'Drammen', action: 'startet gratis kartlegging' },
    { name: 'Nora', city: 'Fredrikstad', action: 'fikk 5 anbefalte automatiseringer' },
  ]
  useEffect(() => {
    const show = () => {
      const person = items[Math.floor(Math.random() * items.length)]
      setToast({ ...person, time: `${Math.floor(Math.random() * 12) + 1} min siden` })
      setTimeout(() => setToast(null), 4000)
    }
    const first = setTimeout(show, 6000)
    const interval = setInterval(show, 18000 + Math.random() * 10000)
    return () => { clearTimeout(first); clearInterval(interval) }
  }, [])

  return (
    <AnimatePresence>
      {toast && (
        <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 left-6 z-[100] items-center gap-3 rounded-2xl px-5 py-4 max-w-[320px] hidden md:flex"
          style={{ background: 'rgba(15,15,25,0.9)', border: `1px solid rgba(${goldRgb},0.15)`, backdropFilter: 'blur(20px)', boxShadow: `0 8px 40px rgba(0,0,0,0.5), 0 0 20px rgba(${goldRgb},0.05)` }}>
          <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: `rgba(${goldRgb},0.1)`, border: `1px solid rgba(${goldRgb},0.15)` }}>
            <Sparkles size={16} color={gold} />
          </div>
          <div>
            <div className="text-[13px] font-semibold text-[#f0f0f0]">{toast.name} fra {toast.city}</div>
            <div className="text-[11px] text-white/40">{toast.action} · {toast.time}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ══════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════ */
export default function LandingPage() {
  const router = useRouter()
  const [selectedIndustry, setSelectedIndustry] = useState(0)
  const [showSticky, setShowSticky] = useState(false)

  useEffect(() => {
    const handler = () => setShowSticky(window.scrollY > 600)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const ctaClick = () => router.push('/kartlegging')

  /* ── ROI calculator ── */
  const industryROI = [
    { label: 'Bygg & Håndverk', avgDeal: 85000, conversion: 0.18 },
    { label: 'Frisør / Salong', avgDeal: 950, conversion: 0.65 },
    { label: 'Restaurant / Cafe', avgDeal: 1200, conversion: 0.70 },
    { label: 'Advokat / Juridisk', avgDeal: 25000, conversion: 0.25 },
    { label: 'Regnskap', avgDeal: 12000, conversion: 0.30 },
    { label: 'Helse / Klinikk', avgDeal: 2500, conversion: 0.55 },
    { label: 'Eiendom', avgDeal: 65000, conversion: 0.12 },
    { label: 'IT / Konsulent', avgDeal: 35000, conversion: 0.20 },
  ]
  const [roiIndustry, setRoiIndustry] = useState(0)
  const [missedCalls, setMissedCalls] = useState(8)
  const monthlySavings = Math.round(missedCalls * 4.3 * industryROI[roiIndustry].avgDeal * industryROI[roiIndustry].conversion)

  return (
    <>
      {/* ── Nav (shared component) ── */}
      <Nav />

      {/* ── HERO ── */}
      <section className="pt-8 md:pt-16 pb-20 md:pb-28 text-center relative overflow-hidden min-h-[90vh] flex flex-col justify-center">
        <FloatingOrbs />

        <div className="max-w-[900px] mx-auto px-6 relative z-10">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.1, type: 'spring' }}
            className="inline-flex items-center gap-2 rounded-full px-5 py-[10px] mb-8 shimmer-border">
            <div className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
            <span className="text-[13px] font-medium text-white/70">226 automatiseringer · 25 bransjer · Norsk AI</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[clamp(32px,5.5vw,62px)] font-extrabold leading-[1.05] text-white mb-6" style={{ letterSpacing: '-1.5px' }}>
            Automatiser{' '}
            <Typewriter words={['telefonen', 'bookingen', 'leadgenerering', 'fakturering', 'markedsføring', 'oppfølging']} />
            <br />
            <span className="text-white/80">med AI som faktisk virker</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="text-[clamp(16px,2vw,20px)] text-white/40 leading-[1.7] mb-12 max-w-[600px] mx-auto">
            Norske bedrifter taper i snitt <strong className="text-white/60">85 000 kr/mnd</strong> på ubesvarte anrop.
            Arxon sin AI svarer 24/7, booker møter og kvalifiserer leads — automatisk.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={ctaClick} className="gold-btn rounded-2xl py-[18px] px-10 text-[17px] font-bold flex items-center gap-3 hover-lift">
              Start gratis kartlegging <ArrowRight size={18} />
            </button>
            <a href="tel:+4778896386"
              className="glass-btn rounded-2xl py-[16px] px-8 text-[15px] font-semibold flex items-center gap-3 no-underline">
              <Phone size={16} /> Prøv AI-telefonsvareren
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-8 text-[13px] text-white/30">
            <span className="flex items-center gap-[6px]"><Clock size={13} /> 2 min kartlegging</span>
            <span className="text-white/10">|</span>
            <span className="flex items-center gap-[6px]"><Shield size={13} /> Ingen forpliktelser</span>
            <span className="text-white/10">|</span>
            <span className="flex items-center gap-[6px]"><Zap size={13} /> Gratis AI-analyse</span>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to top, #08081a, transparent)' }} />
      </section>

      {/* ── SOCIAL PROOF NUMBERS ── */}
      <section className="px-6 pb-20 relative z-10">
        <div className="max-w-[950px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {[
            { value: 226, suffix: '+', label: 'Automatiseringer klare', icon: Zap },
            { value: 25, suffix: '', label: 'Bransjer dekket', icon: Building2 },
            { value: 85, suffix: '%', label: 'Raskere oppfølging', icon: TrendingUp },
            { value: 24, suffix: '/7', label: 'AI tilgjengelig', icon: Bot },
          ].map((stat, i) => (
            <GlowCard key={i} delay={i * 0.1} className="p-6 md:p-7 text-center">
              <stat.icon size={22} color={gold} className="mx-auto mb-3 opacity-60" />
              <div className="text-[32px] md:text-[40px] font-extrabold mb-1 text-gradient-gold">
                <AnimCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[12px] md:text-[13px] text-white/40 font-medium">{stat.label}</div>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* ── BEFORE / AFTER ── */}
      <section className="py-20 md:py-24 px-6 relative">
        <div className="section-glow" />
        <div className="max-w-[900px] mx-auto relative z-10">
          <div className="text-center mb-14">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-[6px] mb-5" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.1)' }}>
              <AlertTriangle size={13} color="#ef4444" />
              <span className="text-[12px] text-[#ff8888] font-medium">Stopp pengetapet</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-[clamp(26px,4vw,42px)] font-bold text-white mb-4" style={{ letterSpacing: '-0.5px' }}>
              Uten AI vs. med Arxon
            </motion.h2>
            <p className="text-base text-white/40 max-w-[550px] mx-auto">
              Se forskjellen mellom å tape kunder og å fange dem — automatisk
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { before: 'Telefonen ringer — du er opptatt', after: 'AI svarer på 0,3 sekunder', icon: Phone },
              { before: 'Kunden gir opp, ringer konkurrenten', after: 'AI booker møte og sender bekreftelse', icon: Calendar },
              { before: 'Manuell oppfølging — noen faller mellom', after: 'Automatisk oppfølging til alle leads', icon: Target },
              { before: 'Faktura og purring tar timer', after: 'Sendt og fulgt opp automatisk', icon: Receipt },
            ].map((c, i) => (
              <GlowCard key={i} delay={i * 0.08} className="p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(239,68,68,0.1)' }}>
                    <XCircle size={14} color="#ef4444" />
                  </div>
                  <span className="text-[#ff8888]/70 line-through">{c.before}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(74,222,128,0.1)' }}>
                    <Check size={14} color="#4ade80" />
                  </div>
                  <span className="text-[#88ffaa] font-medium">{c.after}</span>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAIN → SOLUTION ── */}
      <section className="py-20 md:py-24 px-6 relative">
        <div className="max-w-[950px] mx-auto text-center relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-[clamp(26px,4vw,42px)] font-bold text-white mb-4" style={{ letterSpacing: '-0.5px' }}>
            Kjenner du deg igjen?
          </motion.h2>
          <p className="text-base text-white/40 mb-14 max-w-[600px] mx-auto">
            De fleste norske bedrifter taper penger på disse utfordringene hver dag
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            {[
              { pain: 'Tapte anrop = tapte kunder', fix: 'AI svarer telefonen 24/7 og booker møter', icon: Phone },
              { pain: 'Manuell booking og no-shows', fix: 'Automatisk booking + påminnelser (60-80% færre no-shows)', icon: Calendar },
              { pain: 'Leads faller mellom stolene', fix: 'AI scorer, følger opp og sender til CRM automatisk', icon: Target },
              { pain: 'Timer på admin og rutinearbeid', fix: 'Faktura, rapporter og oppfølging på autopilot', icon: Clock },
              { pain: 'Dårlig synlighet og lite SoMe', fix: 'AI lager innhold og poster automatisk', icon: Megaphone },
              { pain: 'GDPR-bekymringer', fix: 'Innebygd samtykke-logging og audit-trails', icon: Shield },
            ].map((item, i) => (
              <GlowCard key={i} delay={i * 0.05} className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `rgba(${goldRgb},0.08)`, border: `1px solid rgba(${goldRgb},0.1)` }}>
                    <item.icon size={18} color={gold} />
                  </div>
                  <span className="text-sm font-semibold text-[#ff8888]">{item.pain}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} color="#4ade80" className="mt-[2px] flex-shrink-0" />
                  <span className="text-sm text-white/55 leading-relaxed">{item.fix}</span>
                </div>
              </GlowCard>
            ))}
          </div>

          <div className="mt-12">
            <button onClick={ctaClick} className="glass-btn-gold rounded-xl py-[14px] px-8 text-[15px] font-semibold inline-flex items-center gap-2">
              Finn ut hva du taper — gratis <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 md:py-24 px-6 relative">
        <div className="section-glow" />
        <div className="max-w-[1000px] mx-auto relative z-10">
          <div className="text-center mb-14">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-[clamp(26px,4vw,42px)] font-bold text-white mb-4" style={{ letterSpacing: '-0.5px' }}>
              Norske bedrifter som bruker Arxon
            </motion.h2>
            <p className="text-base text-white/40">Resultater fra ekte kunder i ulike bransjer</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <GlowCard key={i} delay={i * 0.1} className="p-7 flex flex-col" glowColor={goldRgb}>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-1">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} size={16} fill={gold} color={gold} />
                    ))}
                  </div>
                  <span className="text-xs font-bold px-3 py-[5px] rounded-full" style={{ background: 'rgba(74,222,128,0.08)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.12)' }}>
                    {t.result}
                  </span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed mb-6 flex-1">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: `rgba(${goldRgb},0.1)`, color: gold }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-white/30">{t.role}</div>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRY SELECTOR ── */}
      <section id="bransjer" className="py-20 md:py-24 px-6 relative">
        <div className="max-w-[1100px] mx-auto relative z-10">
          <div className="text-center mb-14">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-[clamp(26px,4vw,42px)] font-bold text-white mb-4" style={{ letterSpacing: '-0.5px' }}>
              Finn din bransje
            </motion.h2>
            <p className="text-base text-white/40 max-w-[550px] mx-auto">
              226 skreddersydde automatiseringer fordelt på 25 bransjer
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-10">
            {industries.map((ind, i) => (
              <button key={ind.id} onClick={() => setSelectedIndustry(i)}
                className="rounded-xl p-4 cursor-pointer text-left transition-all duration-300"
                style={{
                  background: selectedIndustry === i ? `rgba(${goldRgb},0.1)` : 'rgba(255,255,255,0.015)',
                  border: `1px solid ${selectedIndustry === i ? `rgba(${goldRgb},0.25)` : 'rgba(255,255,255,0.04)'}`,
                  boxShadow: selectedIndustry === i ? `0 0 20px rgba(${goldRgb},0.08)` : 'none',
                }}>
                <div className="text-xl mb-1">{ind.icon}</div>
                <div className="text-[13px] font-semibold mb-[2px]" style={{ color: selectedIndustry === i ? gold : '#d0d0d0' }}>{ind.name}</div>
                <div className="text-[11px] text-white/30">{ind.count} automatiseringer</div>
              </button>
            ))}
          </div>

          <motion.div key={selectedIndustry} initial={{ opacity: 0, y: 10, scale: 0.99 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            className="glow-card p-7 md:p-9" style={{ '--glow-color': goldRgb } as any}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{industries[selectedIndustry].icon}</span>
                <div>
                  <h3 className="text-xl md:text-[22px] font-bold text-white m-0">{industries[selectedIndustry].name}</h3>
                  <span className="text-sm" style={{ color: gold }}>{industries[selectedIndustry].count} automatiseringer tilgjengelig</span>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.12)' }}>
                <TrendingUp size={14} color="#4ade80" />
                <span className="text-sm text-[#4ade80] font-medium">{industries[selectedIndustry].benefit}</span>
              </div>
            </div>
            <div className="text-sm text-white/40 mb-4 font-medium">Anbefalte automatiseringer:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
              {industries[selectedIndustry].topAutos.map((auto, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl p-4" style={{ background: 'rgba(8,8,16,0.5)', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <CheckCircle2 size={16} color={gold} className="flex-shrink-0" />
                  <span className="text-sm text-white/70">{auto}</span>
                </div>
              ))}
            </div>
            <button onClick={ctaClick} className="gold-btn rounded-xl py-[14px] px-7 text-[15px] font-semibold flex items-center gap-2">
              Se alle for {industries[selectedIndustry].name} <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── AUTOMATION CATEGORIES ── */}
      <section id="automatiseringer" className="py-20 md:py-24 px-6 relative">
        <div className="section-glow" />
        <div className="max-w-[1000px] mx-auto relative z-10">
          <div className="text-center mb-14">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-[clamp(26px,4vw,42px)] font-bold text-white mb-4" style={{ letterSpacing: '-0.5px' }}>
              8 kategorier av automatiseringer
            </motion.h2>
            <p className="text-base text-white/40 max-w-[550px] mx-auto">Fra leadgenerering til GDPR-compliance — vi dekker hele verdikjeden</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <GlowCard key={i} delay={i * 0.05} className="p-6 group category-card" glowColor={cat.color.replace('#', '').match(/.{2}/g)!.map(x => parseInt(x, 16)).join(',')}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110" style={{ background: `${cat.color}10`, border: `1px solid ${cat.color}20` }}>
                  <cat.icon size={22} color={cat.color} />
                </div>
                <h3 className="text-[15px] font-semibold text-white mb-2">{cat.name}</h3>
                <p className="text-[13px] text-white/40 leading-relaxed mb-3">{cat.desc}</p>
                <div className="text-[11px] text-white/20 italic">{cat.example}</div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 md:py-24 px-6 relative">
        <div className="max-w-[900px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-[clamp(26px,4vw,42px)] font-bold text-white mb-4" style={{ letterSpacing: '-0.5px' }}>
              Slik kommer du i gang
            </motion.h2>
            <p className="text-base text-white/40">Fra kartlegging til resultater — tre enkle steg</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Gratis kartlegging', desc: 'Svar på noen spørsmål om din bedrift (2 min). AI-en analyserer og identifiserer de mest verdifulle automatiseringene.', icon: ClipboardList, time: '2 minutter' },
              { step: '2', title: 'Skreddersydd forslag', desc: 'Du får en komplett oversikt med anbefalte automatiseringer, forventet ROI og prisestimat — uten forpliktelser.', icon: FileText, time: 'Umiddelbart' },
              { step: '3', title: 'Vi implementerer', desc: 'Vi setter opp alt. De fleste automatiseringer er live innen 2-5 dager. Du ser resultater fra dag én.', icon: Zap, time: '2-5 dager' },
            ].map((item, i) => (
              <GlowCard key={i} delay={i * 0.1} className="text-center p-8 relative">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[24px] font-extrabold step-number"
                  style={{ background: `rgba(${goldRgb},0.08)`, border: `1px solid rgba(${goldRgb},0.15)`, color: gold }}>
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-white/40 leading-[1.7] mb-5">{item.desc}</p>
                <div className="inline-flex items-center gap-[6px] text-xs px-3 py-[6px] rounded-full" style={{ background: `rgba(${goldRgb},0.05)`, border: `1px solid rgba(${goldRgb},0.1)`, color: gold }}>
                  <Clock size={11} /> {item.time}
                </div>
              </GlowCard>
            ))}
          </div>

          <div className="text-center mt-12">
            <button onClick={ctaClick} className="gold-btn rounded-2xl py-[18px] px-10 text-base font-bold inline-flex items-center gap-3 hover-lift">
              Start gratis kartlegging nå <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ── ROI CALCULATOR ── */}
      <section id="kalkulator" className="py-20 md:py-24 px-6 relative">
        <div className="section-glow" />
        <div className="max-w-[700px] mx-auto relative z-10">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-[clamp(26px,4vw,42px)] font-bold text-white mb-4" style={{ letterSpacing: '-0.5px' }}>
              Hvor mye taper du?
            </motion.h2>
            <p className="text-base text-white/40">Regn ut hva ubesvarte anrop koster din bedrift</p>
          </div>

          <div className="glow-card p-7 md:p-9" style={{ '--glow-color': goldRgb } as any}>
            <div className="mb-7">
              <label className="text-sm text-white/45 mb-2 block font-medium">Din bransje</label>
              <select value={roiIndustry} onChange={e => setRoiIndustry(Number(e.target.value))}
                className="w-full p-[14px_16px] rounded-xl text-white text-[15px] cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {industryROI.map((ind, i) => <option key={i} value={i} style={{ background: '#12121e' }}>{ind.label}</option>)}
              </select>
            </div>

            <div className="mb-8">
              <div className="flex justify-between mb-3">
                <label className="text-sm text-white/45 font-medium">Ubesvarte anrop per uke</label>
                <span className="text-lg font-bold text-gradient-gold">{missedCalls}</span>
              </div>
              <input type="range" min={1} max={30} value={missedCalls} onChange={e => setMissedCalls(Number(e.target.value))}
                className="w-full custom-range" />
              <div className="flex justify-between text-[11px] text-white/25 mt-1"><span>1</span><span>30</span></div>
            </div>

            <div className="text-center p-7 rounded-2xl mb-6" style={{ background: `rgba(${goldRgb},0.04)`, border: `1px solid rgba(${goldRgb},0.1)` }}>
              <div className="text-[13px] text-white/35 mb-2">Estimert tapt omsetning per måned</div>
              <div className="text-[48px] font-extrabold mb-2 text-gradient-gold">
                {monthlySavings.toLocaleString('nb-NO')} kr
              </div>
              <div className="text-[13px] text-white/30">
                = <strong className="text-white/50">{(monthlySavings * 12).toLocaleString('nb-NO')} kr</strong> per år du kan redde
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl mb-6" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.08)' }}>
              <AlertTriangle size={18} color="#ef4444" className="flex-shrink-0" />
              <span className="text-sm text-[#ffa0a0]/80">
                Hver uke uten AI koster deg ca. <strong className="text-white/70">{Math.round(monthlySavings / 4.3).toLocaleString('nb-NO')} kr</strong>
              </span>
            </div>

            <button onClick={ctaClick} className="gold-btn w-full rounded-xl py-4 px-7 text-[15px] font-semibold flex items-center justify-center gap-2">
              Stopp tapet — få gratis AI-analyse <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── DEMO / RING OSS ── */}
      <section className="py-20 md:py-24 px-6 relative">
        <div className="max-w-[800px] mx-auto relative z-10">
          <div className="glow-card p-9 md:p-14 text-center relative overflow-hidden" style={{ '--glow-color': goldRgb } as any}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none" style={{ background: `radial-gradient(ellipse, rgba(${goldRgb},0.06) 0%, transparent 70%)` }} />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-[7px] mb-7"
                style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.12)' }}>
                <div className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
                <span className="text-[13px] text-[#4ade80] font-medium">AI-en er online nå</span>
              </div>

              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-7" style={{ background: `rgba(${goldRgb},0.08)`, border: `1px solid rgba(${goldRgb},0.15)` }}>
                <Phone size={32} color={gold} />
              </div>
              <h2 className="text-[clamp(24px,3.5vw,36px)] font-bold text-white mb-4" style={{ letterSpacing: '-0.5px' }}>Prøv AI-telefonsvareren selv</h2>
              <p className="text-base text-white/40 mb-9 max-w-[500px] mx-auto">
                Ring og opplev hvordan Arxon AI svarer, kvalifiserer deg og booker møte — alt på norsk.
              </p>
              <a href="tel:+4778896386" className="gold-btn inline-flex items-center gap-3 rounded-2xl py-[18px] px-10 text-lg font-bold no-underline hover-lift">
                <Phone size={20} /> Ring 78 89 63 86
              </a>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-[13px] text-white/25">
                <span>Gratis å ringe</span>
                <span className="text-white/10">|</span>
                <span>AI svarer 24/7</span>
                <span className="text-white/10">|</span>
                <span>Norsk språk</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST SIGNALS ── */}
      <section className="py-14 px-6 relative">
        <div className="max-w-[900px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 text-center">
          {[
            { icon: Shield, label: 'GDPR-compliant', sub: 'Data lagret i EØS' },
            { icon: Lock, label: 'EU AI Act-klar', sub: 'Kryptert & sikkert' },
            { icon: Zap, label: 'Live på 2-5 dager', sub: 'Rask implementering' },
            { icon: Heart, label: 'Norsk support', sub: 'Dedikert kontaktperson' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-6 flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-1" style={{ background: `rgba(${goldRgb},0.06)`, border: `1px solid rgba(${goldRgb},0.08)` }}>
                <item.icon size={22} color={gold} strokeWidth={1.5} />
              </div>
              <div className="text-[15px] font-semibold text-white">{item.label}</div>
              <div className="text-xs text-white/30">{item.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 md:py-24 px-6 relative">
        <div className="section-glow" />
        <div className="max-w-[900px] mx-auto relative z-10">
          <div className="text-center mb-14">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-[clamp(26px,4vw,42px)] font-bold text-white mb-4" style={{ letterSpacing: '-0.5px' }}>
              Ofte stilte spørsmål
            </motion.h2>
          </div>
          <FAQ />
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 md:py-24 px-6 relative">
        <div className="max-w-[750px] mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glow-card p-12 md:p-16 relative overflow-hidden" style={{ '--glow-color': goldRgb } as any}>

            <div className="absolute inset-0 pointer-events-none" style={{
              background: `radial-gradient(ellipse at 50% 0%, rgba(${goldRgb},0.06) 0%, transparent 60%)`,
            }} />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-[7px] mb-7 shimmer-border">
                <Sparkles size={14} color={gold} />
                <span className="text-[13px] font-medium text-white/60">Gratis, ingen binding</span>
              </div>
              <h2 className="text-[clamp(26px,4vw,40px)] font-bold text-white mb-5" style={{ letterSpacing: '-0.5px' }}>
                Slutt å tape kunder i dag
              </h2>
              <p className="text-base text-white/40 mb-10 max-w-[500px] mx-auto">
                På 2 minutter finner AI-en automatiseringene som gir mest verdi for akkurat din bedrift.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button onClick={ctaClick} className="gold-btn rounded-2xl py-[18px] px-11 text-[17px] font-bold inline-flex items-center gap-3 hover-lift">
                  Start gratis kartlegging <ArrowRight size={18} />
                </button>
                <a href="tel:+4778896386" className="glass-btn rounded-2xl py-[16px] px-8 text-[15px] font-semibold flex items-center gap-3 no-underline">
                  <Phone size={16} /> Ring oss
                </a>
              </div>
              <div className="mt-5 text-[13px] text-white/25">226 automatiseringer · 25 bransjer · 2 minutter</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row flex-wrap justify-between items-center gap-6">
          <ArxonLogo size="small" />
          <div className="flex gap-6 flex-wrap">
            <Link href="/personvern" className="text-[13px] text-white/30 no-underline hover:text-white/60 transition-colors">Personvern</Link>
            <Link href="/vilkar" className="text-[13px] text-white/30 no-underline hover:text-white/60 transition-colors">Vilkår</Link>
            <Link href="/blogg" className="text-[13px] text-white/30 no-underline hover:text-white/60 transition-colors">Blogg</Link>
            <a href="mailto:kontakt@arxon.no" className="text-[13px] text-white/30 no-underline hover:text-white/60 transition-colors">kontakt@arxon.no</a>
          </div>
          <div className="text-xs text-white/15">&copy; {new Date().getFullYear()} Arxon. Alle rettigheter forbeholdt.</div>
        </div>
      </footer>

      {/* ── Sticky mobile CTA ── */}
      <AnimatePresence>
        {showSticky && (
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-40 p-3 px-4 md:hidden"
            style={{ background: 'rgba(8,8,16,0.95)', backdropFilter: 'blur(24px)', borderTop: `1px solid rgba(${goldRgb},0.1)` }}>
            <div className="flex gap-2">
              <button onClick={ctaClick} className="gold-btn flex-1 rounded-xl py-[14px] px-5 text-[15px] font-bold flex items-center justify-center gap-2">
                Gratis kartlegging <ArrowRight size={16} />
              </button>
              <a href="tel:+4778896386" className="glass-btn rounded-xl py-[14px] px-4 flex items-center justify-center no-underline">
                <Phone size={18} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LiveToast />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        /* ── Nav: cta-shimmer ── */
        .cta-shimmer { background: linear-gradient(110deg, ${gold} 0%, #e0c88a 25%, ${gold} 50%, #a8884d 75%, ${gold} 100%); background-size: 200% 100%; animation: cta-shimmer-anim 3s linear infinite; }
        .cta-shimmer:hover { transform: translateY(-1px); box-shadow: 0 12px 40px rgba(${goldRgb},0.35) !important; }
        @keyframes cta-shimmer-anim { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

        /* ── Nav: responsive helpers ── */
        .show-mob { display: none !important; }
        @media (max-width: 768px) {
          .hide-mob { display: none !important; }
          .show-mob { display: flex !important; }
        }

        /* ── Typewriter ── */
        @keyframes blink { 50% { opacity: 0 } }
        .typewriter-cursor {
          display: inline-block;
          width: 3px;
          height: 1em;
          background: ${gold};
          margin-left: 2px;
          animation: blink 1s step-end infinite;
          vertical-align: text-bottom;
          border-radius: 1px;
        }
        html { scroll-behavior: smooth; }

        /* ── Gold gradient text ── */
        .text-gradient-gold {
          background: linear-gradient(135deg, #e2c47d, ${gold}, #b8944a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Gold CTA button ── */
        .gold-btn {
          background: linear-gradient(135deg, #e2c47d, ${gold}, #b8944a);
          color: #0a0a0f;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 4px 24px rgba(${goldRgb}, 0.2), 0 0 0 1px rgba(${goldRgb}, 0.3);
        }
        .gold-btn:hover {
          box-shadow: 0 8px 40px rgba(${goldRgb}, 0.35), 0 0 0 1px rgba(${goldRgb}, 0.4);
          transform: translateY(-2px);
        }
        .gold-btn::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.6s;
        }
        .gold-btn:hover::after {
          transform: translateX(100%);
        }

        /* ── Glass button ── */
        .glass-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(${goldRgb}, 0.2);
          color: ${gold};
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        .glass-btn:hover {
          background: rgba(${goldRgb}, 0.06);
          border-color: rgba(${goldRgb}, 0.35);
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(${goldRgb}, 0.1);
        }

        /* ── Glass button gold variant ── */
        .glass-btn-gold {
          background: rgba(${goldRgb}, 0.06);
          border: 1px solid rgba(${goldRgb}, 0.15);
          color: ${gold};
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .glass-btn-gold:hover {
          background: rgba(${goldRgb}, 0.1);
          border-color: rgba(${goldRgb}, 0.3);
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(${goldRgb}, 0.1);
        }

        /* ── Glow Card ── */
        .glow-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 20px;
          position: relative;
          transition: all 0.4s ease;
        }
        .glow-card:hover {
          border-color: rgba(var(--glow-color, 255,255,255), 0.12);
          box-shadow: 0 0 30px rgba(var(--glow-color, ${goldRgb}), 0.04), 0 0 60px rgba(var(--glow-color, ${goldRgb}), 0.02);
          background: rgba(255,255,255,0.025);
        }

        /* ── Shimmer border ── */
        .shimmer-border {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(${goldRgb}, 0.15);
          position: relative;
          overflow: hidden;
        }
        .shimmer-border::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(${goldRgb}, 0.1), transparent);
          animation: shimmer 3s ease-in-out infinite;
        }
        @keyframes shimmer {
          0%, 100% { left: -100%; }
          50% { left: 100%; }
        }

        /* ── Section glow ── */
        .section-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 500px;
          background: radial-gradient(ellipse, rgba(${goldRgb}, 0.03) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── Floating orbs ── */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: float 20s ease-in-out infinite;
        }
        .orb-1 {
          width: 400px;
          height: 400px;
          background: rgba(${goldRgb}, 0.06);
          top: -100px;
          right: -100px;
          animation-delay: 0s;
        }
        .orb-2 {
          width: 300px;
          height: 300px;
          background: rgba(80, 100, 200, 0.04);
          bottom: -50px;
          left: -100px;
          animation-delay: -7s;
        }
        .orb-3 {
          width: 200px;
          height: 200px;
          background: rgba(${goldRgb}, 0.04);
          top: 40%;
          left: 20%;
          animation-delay: -14s;
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -30px) scale(1.05); }
          50% { transform: translate(-20px, 20px) scale(0.95); }
          75% { transform: translate(15px, 15px) scale(1.02); }
        }

        /* ── Hover lift ── */
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-3px);
        }

        /* ── Custom range input ── */
        .custom-range {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 3px;
          background: rgba(255,255,255,0.06);
          outline: none;
        }
        .custom-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e2c47d, ${gold});
          cursor: pointer;
          border: 3px solid rgba(8,8,16,0.8);
          box-shadow: 0 0 12px rgba(${goldRgb}, 0.3);
          transition: box-shadow 0.2s ease;
        }
        .custom-range::-webkit-slider-thumb:hover {
          box-shadow: 0 0 20px rgba(${goldRgb}, 0.5);
        }
        .custom-range::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e2c47d, ${gold});
          cursor: pointer;
          border: 3px solid rgba(8,8,16,0.8);
          box-shadow: 0 0 12px rgba(${goldRgb}, 0.3);
        }

        /* ── Step number animation ── */
        .step-number {
          position: relative;
        }
        .step-number::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 20px;
          border: 1px solid rgba(${goldRgb}, 0.08);
          animation: pulse-ring 3s ease-in-out infinite;
        }
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }
      `}</style>
    </>
  )
}
