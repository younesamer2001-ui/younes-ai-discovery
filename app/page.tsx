'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Phone, Bot, Zap, Shield, Clock, BarChart3,
  CheckCircle2, ChevronDown, Star, Users, TrendingUp, Building2,
  Sparkles, MessageSquare, FileText, Receipt, Megaphone, ClipboardList,
  Lock, Menu, X, ChevronRight, Calendar, Mail, Target, Play, Headphones,
  AlertTriangle, ArrowUpRight, PhoneOff, XCircle, Check, Heart
} from 'lucide-react'

/* ── Constants ── */
const gold = '#c9a96e'
const goldRgb = '201,169,110'

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
    <span style={{ color: gold }}>
      {words[wordIdx].substring(0, charIdx)}
      <span className="typewriter-cursor" />
    </span>
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
    <div className="flex flex-col gap-2 max-w-[720px] mx-auto">
      {items.map((item, i) => (
        <div key={i} className="rounded-[14px] overflow-hidden cursor-pointer transition-all duration-300"
          style={{
            background: open === i ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.015)',
            border: `1px solid ${open === i ? `rgba(${goldRgb},0.2)` : 'rgba(255,255,255,0.06)'}`,
          }} onClick={() => setOpen(open === i ? null : i)}>
          <div className="flex justify-between items-center p-[18px_22px]">
            <span className="text-[15px] font-medium text-[#f0f0f0]">{item.q}</span>
            <ChevronDown size={18} className="flex-shrink-0 ml-3 transition-transform duration-300"
              style={{ color: gold, transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </div>
          <AnimatePresence>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                <div className="px-[22px] pb-[18px] text-sm text-white/[0.55] leading-[1.7]">{item.a}</div>
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
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-6 z-[100] items-center gap-3 rounded-[14px] px-5 py-[14px] max-w-[320px] hidden md:flex"
          style={{ background: 'rgba(20,20,30,0.95)', border: `1px solid rgba(${goldRgb},0.2)`, backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
          <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: `rgba(${goldRgb},0.1)` }}>
            <Users size={16} color={gold} />
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

/* ── Before/After comparison ── */
function BeforeAfter() {
  const comparisons = [
    { before: 'Telefonen ringer — du er opptatt', after: 'AI svarer på 0,3 sekunder', icon: Phone },
    { before: 'Kunden gir opp, ringer konkurrenten', after: 'AI booker møte og sender bekreftelse', icon: Calendar },
    { before: 'Manuell oppfølging — noen faller mellom', after: 'Automatisk oppfølging til alle leads', icon: Target },
    { before: 'Faktura og purring tar timer', after: 'Sendt og fulgt opp automatisk', icon: Receipt },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {comparisons.map((c, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
          className="rounded-2xl p-5 flex flex-col gap-3"
          style={{ background: 'rgba(10,10,15,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-2 text-sm">
            <XCircle size={16} color="#ef4444" className="flex-shrink-0" />
            <span className="text-[#ff8888] line-through opacity-70">{c.before}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Check size={16} color="#4ade80" className="flex-shrink-0" />
            <span className="text-[#88ffaa] font-medium">{c.after}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════ */
export default function LandingPage() {
  const router = useRouter()
  const [selectedIndustry, setSelectedIndustry] = useState(0)
  const [showSticky, setShowSticky] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-16">
          <Link href="/" className="text-[22px] font-bold no-underline" style={{ color: gold, letterSpacing: '-0.5px' }}>
            Arxon
          </Link>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#bransjer" className="text-sm text-white/60 no-underline hover:text-white/90 transition-colors">Bransjer</a>
            <a href="#automatiseringer" className="text-sm text-white/60 no-underline hover:text-white/90 transition-colors">Automatiseringer</a>
            <a href="#kalkulator" className="text-sm text-white/60 no-underline hover:text-white/90 transition-colors">ROI-kalkulator</a>
            <a href="#faq" className="text-sm text-white/60 no-underline hover:text-white/90 transition-colors">FAQ</a>
            <button onClick={ctaClick} className="border-none rounded-[10px] px-[22px] py-[10px] text-sm font-semibold cursor-pointer hover:brightness-110 transition-all"
              style={{ background: gold, color: '#0a0a0f' }}>
              Gratis kartlegging
            </button>
          </div>
          {/* Mobile menu button */}
          <button className="md:hidden bg-transparent border-none text-white cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden" style={{ background: 'rgba(10,10,15,0.98)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="p-4 px-6 flex flex-col gap-4">
                <a href="#bransjer" onClick={() => setMenuOpen(false)} className="text-base text-white/70 no-underline">Bransjer</a>
                <a href="#automatiseringer" onClick={() => setMenuOpen(false)} className="text-base text-white/70 no-underline">Automatiseringer</a>
                <a href="#kalkulator" onClick={() => setMenuOpen(false)} className="text-base text-white/70 no-underline">ROI-kalkulator</a>
                <a href="#faq" onClick={() => setMenuOpen(false)} className="text-base text-white/70 no-underline">FAQ</a>
                <button onClick={() => { setMenuOpen(false); ctaClick() }} className="w-full border-none rounded-[10px] py-3 px-6 text-[15px] font-semibold cursor-pointer"
                  style={{ background: gold, color: '#0a0a0f' }}>
                  Gratis kartlegging
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-[130px] md:pt-[150px] pb-16 md:pb-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none" style={{ background: `radial-gradient(ellipse, rgba(${goldRgb},0.08) 0%, transparent 70%)` }} />

        <div className="max-w-[820px] mx-auto px-6 relative">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full px-[18px] py-2 mb-7"
            style={{ background: `rgba(${goldRgb},0.08)`, border: `1px solid rgba(${goldRgb},0.15)` }}>
            <Sparkles size={14} color={gold} />
            <span className="text-[13px] font-medium" style={{ color: gold }}>226 automatiseringer · 25 bransjer · Norsk AI</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-[clamp(30px,5vw,54px)] font-extrabold leading-[1.1] text-white mb-5" style={{ letterSpacing: '-1px' }}>
            Automatiser{' '}
            <Typewriter words={['telefonen', 'bookingen', 'leadgenerering', 'fakturering', 'markedsføring', 'oppfølging']} />
            <br />
            <span className="text-white/90">med AI som faktisk virker</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-[clamp(15px,2vw,19px)] text-white/50 leading-[1.7] mb-10 max-w-[580px] mx-auto">
            Norske bedrifter taper i snitt <strong className="text-white/70">85 000 kr/mnd</strong> på ubesvarte anrop.
            Arxon sin AI svarer 24/7, booker møter og kvalifiserer leads automatisk.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={ctaClick}
              className="border-none rounded-[14px] py-[18px] px-10 text-[17px] font-bold cursor-pointer flex items-center gap-[10px] hover:-translate-y-[2px] transition-transform"
              style={{ background: gold, color: '#0a0a0f', boxShadow: `0 4px 24px rgba(${goldRgb},0.3)` }}>
              Start gratis kartlegging <ArrowRight size={18} />
            </button>
            <a href="tel:+4778896386"
              className="rounded-[14px] py-[16px] px-8 text-[15px] font-semibold flex items-center gap-[10px] no-underline transition-all hover:border-opacity-50"
              style={{ background: 'transparent', border: `1px solid rgba(${goldRgb},0.3)`, color: gold }}>
              <Phone size={16} /> Prøv AI-telefonsvareren
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-6 text-[13px] text-white/35">
            <span className="flex items-center gap-1"><Clock size={12} /> 2 min kartlegging</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Shield size={12} /> Ingen forpliktelser</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Zap size={12} /> Gratis AI-analyse</span>
          </motion.div>
        </div>
      </section>

      {/* ── SOCIAL PROOF NUMBERS ── */}
      <section className="px-6 pb-16">
        <div className="max-w-[900px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
          {[
            { value: 226, suffix: '+', label: 'Automatiseringer klare' },
            { value: 25, suffix: '', label: 'Bransjer dekket' },
            { value: 85, suffix: '%', label: 'Raskere oppfølging' },
            { value: 24, suffix: '/7', label: 'AI tilgjengelig' },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-5 md:p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="text-[28px] md:text-[36px] font-extrabold mb-1" style={{ color: gold }}>
                <AnimCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[12px] md:text-[13px] text-white/45">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── BEFORE / AFTER ── */}
      <section className="py-16 md:py-20 px-6" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-[clamp(24px,3.5vw,38px)] font-bold text-white mb-3">
              Uten AI vs. med Arxon
            </motion.h2>
            <p className="text-base text-white/45 max-w-[550px] mx-auto">
              Se forskjellen mellom å tape kunder og å fange dem — automatisk
            </p>
          </div>
          <BeforeAfter />
        </div>
      </section>

      {/* ── PAIN → SOLUTION ── */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-[900px] mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-[clamp(24px,3.5vw,38px)] font-bold text-white mb-4">
            Kjenner du deg igjen?
          </motion.h2>
          <p className="text-base text-white/45 mb-12 max-w-[600px] mx-auto">
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
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-[10px] mb-3">
                  <div className="w-9 h-9 rounded-[10px] flex items-center justify-center" style={{ background: `rgba(${goldRgb},0.08)` }}>
                    <item.icon size={18} color={gold} />
                  </div>
                  <span className="text-sm font-semibold text-[#ff6b6b]">{item.pain}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} color="#4ade80" className="mt-[2px] flex-shrink-0" />
                  <span className="text-sm text-white/60 leading-relaxed">{item.fix}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA after pain section */}
          <div className="mt-10">
            <button onClick={ctaClick}
              className="border-none rounded-[12px] py-[14px] px-8 text-[15px] font-semibold cursor-pointer inline-flex items-center gap-2 hover:brightness-110 transition-all"
              style={{ background: `rgba(${goldRgb},0.15)`, color: gold, border: `1px solid rgba(${goldRgb},0.25)` }}>
              Finn ut hva du taper — gratis <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 md:py-20 px-6" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-[clamp(24px,3.5vw,38px)] font-bold text-white mb-3">
              Norske bedrifter som bruker Arxon
            </motion.h2>
            <p className="text-base text-white/45">Resultater fra ekte kunder i ulike bransjer</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-7 flex flex-col" style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid rgba(${goldRgb},0.08)` }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} size={16} fill={gold} color={gold} />
                    ))}
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80' }}>
                    {t.result}
                  </span>
                </div>
                <p className="text-sm text-white/60 leading-relaxed mb-5 flex-1">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-white/35">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRY SELECTOR ── */}
      <section id="bransjer" className="py-16 md:py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-[clamp(24px,3.5vw,38px)] font-bold text-white mb-3">
              Finn din bransje
            </motion.h2>
            <p className="text-base text-white/45 max-w-[550px] mx-auto">
              226 skreddersydde automatiseringer fordelt på 25 bransjer. Velg din for å se hva som passer deg.
            </p>
          </div>

          {/* Industry grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[10px] mb-10">
            {industries.map((ind, i) => (
              <button key={ind.id} onClick={() => setSelectedIndustry(i)}
                className="rounded-xl p-[14px_16px] cursor-pointer text-left transition-all duration-200 border"
                style={{
                  background: selectedIndustry === i ? `rgba(${goldRgb},0.12)` : 'rgba(255,255,255,0.02)',
                  borderColor: selectedIndustry === i ? `rgba(${goldRgb},0.3)` : 'rgba(255,255,255,0.06)',
                }}>
                <div className="text-xl mb-1">{ind.icon}</div>
                <div className="text-[13px] font-semibold mb-[2px]" style={{ color: selectedIndustry === i ? gold : '#e0e0e0' }}>{ind.name}</div>
                <div className="text-[11px] text-white/35">{ind.count} automatiseringer</div>
              </button>
            ))}
          </div>

          {/* Selected industry detail */}
          <motion.div key={selectedIndustry} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-[20px] p-6 md:p-8" style={{ background: `rgba(${goldRgb},0.04)`, border: `1px solid rgba(${goldRgb},0.12)` }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{industries[selectedIndustry].icon}</span>
                <div>
                  <h3 className="text-xl md:text-[22px] font-bold text-white m-0">{industries[selectedIndustry].name}</h3>
                  <span className="text-sm" style={{ color: gold }}>{industries[selectedIndustry].count} automatiseringer tilgjengelig</span>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.15)' }}>
                <TrendingUp size={14} color="#4ade80" />
                <span className="text-sm text-[#4ade80] font-medium">{industries[selectedIndustry].benefit}</span>
              </div>
            </div>
            <div className="text-sm text-white/50 mb-4">Anbefalte automatiseringer for din bransje:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {industries[selectedIndustry].topAutos.map((auto, i) => (
                <div key={i} className="flex items-center gap-[10px] rounded-[10px] p-[12px_16px]" style={{ background: 'rgba(10,10,15,0.4)' }}>
                  <CheckCircle2 size={16} color={gold} className="flex-shrink-0" />
                  <span className="text-sm text-[#e0e0e0]">{auto}</span>
                </div>
              ))}
            </div>
            <button onClick={ctaClick}
              className="border-none rounded-[10px] py-[14px] px-7 text-[15px] font-semibold cursor-pointer flex items-center gap-2 hover:brightness-110 transition-all"
              style={{ background: gold, color: '#0a0a0f' }}>
              Se alle for {industries[selectedIndustry].name} <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── AUTOMATION CATEGORIES ── */}
      <section id="automatiseringer" className="py-16 md:py-20 px-6" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-[clamp(24px,3.5vw,38px)] font-bold text-white mb-3">
              8 kategorier av automatiseringer
            </motion.h2>
            <p className="text-base text-white/45 max-w-[550px] mx-auto">Fra leadgenerering til GDPR-compliance — vi dekker hele verdikjeden</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="rounded-2xl p-6 transition-all duration-300 hover:border-opacity-40 group"
                style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid rgba(255,255,255,0.06)` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${cat.color}40`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${cat.color}15` }}>
                  <cat.icon size={22} color={cat.color} />
                </div>
                <h3 className="text-[15px] font-semibold text-white mb-2">{cat.name}</h3>
                <p className="text-[13px] text-white/45 leading-relaxed mb-3">{cat.desc}</p>
                <div className="text-[11px] text-white/25 italic">{cat.example}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-14">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-[clamp(24px,3.5vw,38px)] font-bold text-white mb-3">
              Slik kommer du i gang
            </motion.h2>
            <p className="text-base text-white/45">Fra kartlegging til resultater — tre enkle steg</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Gratis kartlegging', desc: 'Svar på noen spørsmål om din bedrift (2 min). AI-en analyserer svarene og identifiserer de mest verdifulle automatiseringene.', icon: ClipboardList, time: '2 minutter' },
              { step: '2', title: 'Skreddersydd forslag', desc: 'Du får en komplett oversikt med anbefalte automatiseringer, forventet ROI og prisestimat — uten forpliktelser.', icon: FileText, time: 'Umiddelbart' },
              { step: '3', title: 'Vi implementerer', desc: 'Vi setter opp alt. De fleste automatiseringer er live innen 2-5 dager. Du ser resultater fra dag én.', icon: Zap, time: '2-5 dager' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-[20px] relative" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 text-[22px] font-extrabold"
                  style={{ background: `rgba(${goldRgb},0.1)`, border: `2px solid rgba(${goldRgb},0.2)`, color: gold }}>
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-[10px]">{item.title}</h3>
                <p className="text-sm text-white/45 leading-[1.7] mb-4">{item.desc}</p>
                <div className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full" style={{ background: `rgba(${goldRgb},0.06)`, color: gold }}>
                  <Clock size={10} /> {item.time}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button onClick={ctaClick}
              className="border-none rounded-[14px] py-4 px-9 text-base font-bold cursor-pointer inline-flex items-center gap-[10px] hover:-translate-y-[2px] transition-transform"
              style={{ background: gold, color: '#0a0a0f', boxShadow: `0 4px 24px rgba(${goldRgb},0.25)` }}>
              Start gratis kartlegging nå <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ── ROI CALCULATOR ── */}
      <section id="kalkulator" className="py-16 md:py-20 px-6" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="max-w-[700px] mx-auto">
          <div className="text-center mb-10">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-[clamp(24px,3.5vw,38px)] font-bold text-white mb-3">
              Hvor mye taper du?
            </motion.h2>
            <p className="text-base text-white/45">Regn ut hva ubesvarte anrop koster din bedrift</p>
          </div>

          <div className="rounded-[20px] p-6 md:p-8" style={{ background: 'rgba(10,10,15,0.6)', border: `1px solid rgba(${goldRgb},0.12)` }}>
            <div className="mb-6">
              <label className="text-sm text-white/50 mb-2 block">Din bransje</label>
              <select value={roiIndustry} onChange={e => setRoiIndustry(Number(e.target.value))}
                className="w-full p-[12px_16px] rounded-[10px] text-white text-[15px] cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                {industryROI.map((ind, i) => <option key={i} value={i} style={{ background: '#1a1a2e' }}>{ind.label}</option>)}
              </select>
            </div>

            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <label className="text-sm text-white/50">Ubesvarte anrop per uke</label>
                <span className="text-base font-bold" style={{ color: gold }}>{missedCalls}</span>
              </div>
              <input type="range" min={1} max={30} value={missedCalls} onChange={e => setMissedCalls(Number(e.target.value))}
                className="w-full" style={{ accentColor: gold }} />
              <div className="flex justify-between text-[11px] text-white/30"><span>1</span><span>30</span></div>
            </div>

            <div className="text-center p-6 rounded-2xl mb-6" style={{ background: `rgba(${goldRgb},0.06)`, border: `1px solid rgba(${goldRgb},0.15)` }}>
              <div className="text-[13px] text-white/40 mb-1">Estimert tapt omsetning per måned</div>
              <div className="text-[42px] font-extrabold mb-2" style={{ color: gold }}>
                {monthlySavings.toLocaleString('nb-NO')} kr
              </div>
              <div className="text-[13px] text-white/35">
                = <strong className="text-white/50">{(monthlySavings * 12).toLocaleString('nb-NO')} kr</strong> per år du kan redde
              </div>
            </div>

            {/* Urgency element */}
            <div className="flex items-center gap-3 p-4 rounded-xl mb-6" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.12)' }}>
              <AlertTriangle size={18} color="#ef4444" className="flex-shrink-0" />
              <span className="text-sm text-[#ffa0a0]">
                Hver uke uten AI-telefonsvarer koster deg ca. <strong className="text-white">{Math.round(monthlySavings / 4.3).toLocaleString('nb-NO')} kr</strong> i tapte kunder
              </span>
            </div>

            <button onClick={ctaClick}
              className="w-full border-none rounded-xl py-[14px] px-7 text-[15px] font-semibold cursor-pointer flex items-center justify-center gap-2 hover:brightness-110 transition-all"
              style={{ background: gold, color: '#0a0a0f' }}>
              Stopp tapet — få gratis AI-analyse <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── DEMO / RING OSS ── */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <div className="rounded-[20px] p-8 md:p-12 text-center relative overflow-hidden" style={{ background: `rgba(${goldRgb},0.03)`, border: `1px solid rgba(${goldRgb},0.1)` }}>
            {/* Decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] pointer-events-none" style={{ background: `radial-gradient(ellipse, rgba(${goldRgb},0.06) 0%, transparent 70%)` }} />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-[6px] mb-6"
                style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.15)' }}>
                <div className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
                <span className="text-[13px] text-[#4ade80] font-medium">AI-en er online nå</span>
              </div>

              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: `rgba(${goldRgb},0.1)`, border: `2px solid rgba(${goldRgb},0.2)` }}>
                <Phone size={28} color={gold} />
              </div>
              <h2 className="text-[clamp(22px,3vw,32px)] font-bold text-white mb-4">Prøv AI-telefonsvareren selv</h2>
              <p className="text-base text-white/50 mb-8 max-w-[500px] mx-auto">
                Ring nummeret nedenfor og opplev hvordan Arxon AI svarer, kvalifiserer deg og booker møte — alt på norsk.
              </p>
              <a href="tel:+4778896386" className="inline-flex items-center gap-3 rounded-[14px] py-4 px-8 text-lg font-bold no-underline hover:-translate-y-[2px] transition-transform"
                style={{ background: gold, color: '#0a0a0f', boxShadow: `0 4px 24px rgba(${goldRgb},0.3)` }}>
                <Phone size={20} /> Ring 78 89 63 86
              </a>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[13px] text-white/30">
                <span>Gratis å ringe</span>
                <span>·</span>
                <span>AI svarer 24/7</span>
                <span>·</span>
                <span>Norsk språk</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST SIGNALS ── */}
      <section className="py-12 px-6" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="max-w-[900px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 text-center">
          {[
            { icon: Shield, label: 'GDPR-compliant', sub: 'Data lagret i EØS' },
            { icon: Lock, label: 'EU AI Act-klar', sub: 'Kryptert & sikkert' },
            { icon: Zap, label: 'Live på 2-5 dager', sub: 'Rask implementering' },
            { icon: Heart, label: 'Norsk support', sub: 'Dedikert kontaktperson' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-5 flex flex-col items-center gap-2">
              <item.icon size={28} color={gold} strokeWidth={1.5} />
              <div className="text-[15px] font-semibold text-white">{item.label}</div>
              <div className="text-xs text-white/35">{item.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-16 md:py-20 px-6">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-[clamp(24px,3.5vw,38px)] font-bold text-white mb-3">
              Ofte stilte spørsmål
            </motion.h2>
          </div>
          <FAQ />
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 md:py-20 px-6" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="max-w-[700px] mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl p-12 md:p-14"
            style={{ background: `linear-gradient(135deg, rgba(${goldRgb},0.08), rgba(${goldRgb},0.03))`, border: `1px solid rgba(${goldRgb},0.15)` }}>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-[6px] mb-6"
              style={{ background: `rgba(${goldRgb},0.08)`, border: `1px solid rgba(${goldRgb},0.15)` }}>
              <Sparkles size={14} color={gold} />
              <span className="text-[13px] font-medium" style={{ color: gold }}>Gratis, ingen binding</span>
            </div>
            <h2 className="text-[clamp(24px,3.5vw,36px)] font-bold text-white mb-4">
              Slutt å tape kunder i dag
            </h2>
            <p className="text-base text-white/50 mb-8 max-w-[500px] mx-auto">
              Start med en gratis kartlegging. På 2 minutter finner AI-en de automatiseringene som gir mest verdi for akkurat din bedrift.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={ctaClick}
                className="border-none rounded-[14px] py-[18px] px-11 text-[17px] font-bold cursor-pointer inline-flex items-center gap-[10px] hover:-translate-y-[2px] transition-transform"
                style={{ background: gold, color: '#0a0a0f', boxShadow: `0 4px 24px rgba(${goldRgb},0.3)` }}>
                Start gratis kartlegging <ArrowRight size={18} />
              </button>
              <a href="tel:+4778896386"
                className="rounded-[14px] py-[16px] px-8 text-[15px] font-semibold flex items-center gap-[10px] no-underline transition-all"
                style={{ border: `1px solid rgba(${goldRgb},0.3)`, color: gold }}>
                <Phone size={16} /> Ring oss
              </a>
            </div>
            <div className="mt-4 text-[13px] text-white/30">226 automatiseringer · 25 bransjer · 2 minutter</div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row flex-wrap justify-between items-center gap-6">
          <div>
            <div className="text-xl font-bold mb-1" style={{ color: gold }}>Arxon</div>
            <div className="text-xs text-white/30">AI-automatisering for norske bedrifter</div>
          </div>
          <div className="flex gap-6 flex-wrap">
            <Link href="/personvern" className="text-[13px] text-white/35 no-underline hover:text-white/60">Personvern</Link>
            <Link href="/vilkar" className="text-[13px] text-white/35 no-underline hover:text-white/60">Vilkår</Link>
            <Link href="/blogg" className="text-[13px] text-white/35 no-underline hover:text-white/60">Blogg</Link>
            <a href="mailto:kontakt@arxon.no" className="text-[13px] text-white/35 no-underline hover:text-white/60">kontakt@arxon.no</a>
          </div>
          <div className="text-xs text-white/20">&copy; {new Date().getFullYear()} Arxon. Alle rettigheter forbeholdt.</div>
        </div>
      </footer>

      {/* ── Sticky mobile CTA ── */}
      <AnimatePresence>
        {showSticky && (
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-40 p-3 px-4 md:hidden"
            style={{ background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(20px)', borderTop: `1px solid rgba(${goldRgb},0.15)` }}>
            <div className="flex gap-2">
              <button onClick={ctaClick}
                className="flex-1 border-none rounded-xl py-[14px] px-5 text-[15px] font-bold cursor-pointer flex items-center justify-center gap-2"
                style={{ background: gold, color: '#0a0a0f' }}>
                Gratis kartlegging <ArrowRight size={16} />
              </button>
              <a href="tel:+4778896386"
                className="rounded-xl py-[14px] px-4 flex items-center justify-center no-underline"
                style={{ border: `1px solid rgba(${goldRgb},0.3)`, color: gold }}>
                <Phone size={18} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LiveToast />

      <style jsx global>{`
        @keyframes blink { 50% { opacity: 0 } }
        .typewriter-cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: ${gold};
          margin-left: 2px;
          animation: blink 1s step-end infinite;
          vertical-align: text-bottom;
        }
        html { scroll-behavior: smooth; }
      `}</style>
    </>
  )
}
