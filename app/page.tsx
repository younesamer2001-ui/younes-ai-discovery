'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Phone, Bot, Zap, Shield, Clock, BarChart3,
  CheckCircle2, ChevronDown, Star, Users, TrendingUp, Building2,
  Sparkles, MessageSquare, FileText, Receipt, Megaphone, ClipboardList,
  Lock, Menu, X, ChevronRight, Calendar, Mail, Target
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

/* ── Industry data ── */
const industries = [
  { id: 'bygg', name: 'Bygg & Håndverk', icon: '🏗️', count: 12, topAutos: ['AI-telefonsvarer 24/7', 'Automatisk tilbudsforespørsel', 'Befaring-påminnelse', 'Lead-scoring & CRM'] },
  { id: 'salong', name: 'Salong & Skjønnhet', icon: '💇', count: 10, topAutos: ['AI-telefonsvarer med booking', 'Automatisk venteliste', 'Rebestilling-påminnelse', 'Instagram auto-posting'] },
  { id: 'advokat', name: 'Advokatkontor', icon: '⚖️', count: 12, topAutos: ['AI-telefonsvarer førstekontakt', 'Saksdokument-oppsummering', 'Frist-påminnelser', 'GDPR audit-logg'] },
  { id: 'restaurant', name: 'Restaurant & Café', icon: '🍽️', count: 10, topAutos: ['AI-telefonsvar bestilling', 'Daglig råvarestatus', 'Ansattplan-varsling', 'SoMe auto-post'] },
  { id: 'eiendom', name: 'Eiendomsmegling', icon: '🏠', count: 12, topAutos: ['AI-telefonsvarer visning', 'Automatisk boligpresentasjon', 'Visningsmatch', 'Lead-scoring'] },
  { id: 'helse', name: 'Helse & Klinikk', icon: '🏥', count: 12, topAutos: ['AI-telefonsvarer time', 'Venteliste-håndtering', 'Oppfølging etter behandling', 'Timepåminnelse'] },
  { id: 'ehandel', name: 'E-handel', icon: '🛒', count: 10, topAutos: ['Forlatt handlekurv', 'AI produktbeskrivelser', 'Lagerstatus-varsling', 'SoMe auto-post'] },
  { id: 'regnskap', name: 'Regnskap & Konsulenter', icon: '📊', count: 8, topAutos: ['AI-telefonsvarer kundestøtte', 'Bilagshåndtering med AI', 'Momsfrister-varsling', 'Månedsrapport'] },
  { id: 'rekruttering', name: 'Rekruttering', icon: '👥', count: 8, topAutos: ['AI-screening søknader', 'Auto kandidat-oppfølging', 'Intervjubooking', 'Onboarding-checklist'] },
  { id: 'bil', name: 'Bilverksted', icon: '🔧', count: 9, topAutos: ['AI-telefonsvarer verksted', 'Service-påminnelse', 'Dekkskifte-påminnelse', 'Reparasjonsstatus'] },
  { id: 'coaching', name: 'Coaching', icon: '🎯', count: 8, topAutos: ['AI-booking med kvalifisering', 'Kurslevering', 'Oppfølging mellom sesjoner', 'Lead magnet-funnel'] },
  { id: 'kreativt', name: 'Kreativt Byrå', icon: '🎨', count: 8, topAutos: ['Prosjektforespørsel-intake', 'Auto prosjekt-oppdatering', 'AI tilbudsgenerering', 'Portfolio auto-update'] },
  { id: 'utdanning', name: 'Utdanning & Kurs', icon: '📚', count: 9, topAutos: ['AI-telefonsvar påmelding', 'Kursplan-distribusjon', 'Venteliste-håndtering', 'Sertifikat-generering'] },
  { id: 'it', name: 'IT & Tech', icon: '💻', count: 8, topAutos: ['Ticket-triagering med AI', 'Serverovervåkning', 'Churn-prediksjon', 'Onboarding ny kunde'] },
  { id: 'trening', name: 'Trening & Fitness', icon: '💪', count: 8, topAutos: ['AI-booking treningsøkter', 'Treningsprogram-levering', 'Medlemsfornyelse', 'Prøvetime-oppfølging'] },
  { id: 'event', name: 'Event & Arrangement', icon: '🎪', count: 8, topAutos: ['Registrering + bekreftelse', 'Påminnelser', 'Leverandør-koordinering', 'Oppfølging etter event'] },
  { id: 'reiseliv', name: 'Reiseliv & Overnatting', icon: '🏨', count: 10, topAutos: ['AI-telefonsvarer reservasjoner', 'Digital selvinnsjekking', 'Gjeste-tilbakemelding', 'Sesongkampanjer'] },
  { id: 'finans', name: 'Finans & Fintech', icon: '🏦', count: 8, topAutos: ['KYC-dokumentinnhenting', 'Transaksjonsovervåkning', 'GDPR audit-logg', 'Auto-purring'] },
  { id: 'marked', name: 'Markedsføring & SEO', icon: '📈', count: 8, topAutos: ['AI-innholdsproduksjon', 'SEO-overvåkning', 'Kampanjerapport', 'SoMe auto-scheduling'] },
  { id: 'logistikk', name: 'Logistikk & Transport', icon: '🚚', count: 8, topAutos: ['Sendingssporing', 'Ruteoptimalisering', 'Lagerstatus-overvåkning', 'Avvikshåndtering'] },
  { id: 'ngo', name: 'NGO & Ideell', icon: '🤝', count: 8, topAutos: ['Donasjon-bekreftelse', 'Frivillig-onboarding', 'Event-påmelding', 'Støttebrev-generering'] },
  { id: 'media', name: 'Media & Podkast', icon: '🎙️', count: 8, topAutos: ['Episode-publisering', 'AI show-notes', 'Nyhetsbrev-automatisering', 'Klipp-generering'] },
  { id: 'saas', name: 'SaaS & Produkt', icon: '☁️', count: 8, topAutos: ['Trial-konvertering', 'Churn-forebygging', 'Feature request-tracking', 'Auto release notes'] },
  { id: 'forvaltning', name: 'Eiendomsforvaltning', icon: '🏢', count: 8, topAutos: ['Vedlikeholdsforespørsel', 'Husleie-påminnelse', 'Kontraktfornyelse', 'Felleskost-oppfølging'] },
]

/* ── Automation categories ── */
const categories = [
  { name: 'Leads & Salg', icon: Target, desc: 'Fang leads automatisk, score dem, og bygg pipeline uten manuelt arbeid', color: '#4ade80' },
  { name: 'Kundeoppfølging', icon: MessageSquare, desc: 'AI svarer telefonen, følger opp kunder og fanger tapte henvendelser', color: '#60a5fa' },
  { name: 'Booking & Avtaler', icon: Calendar, desc: 'Reduser no-shows 60-80% med automatiske påminnelser og booking', color: '#c084fc' },
  { name: 'Admin & Drift', icon: ClipboardList, desc: 'Onboarding, dokumenthåndtering og arbeidsflyt — på autopilot', color: '#fb923c' },
  { name: 'Økonomi & Faktura', icon: Receipt, desc: 'Fakturering, purring og bilagshåndtering uten manuelle steg', color: '#f472b6' },
  { name: 'Markedsføring', icon: Megaphone, desc: 'AI-generert innhold, SoMe auto-posting og kampanjer som kjører seg selv', color: '#a78bfa' },
  { name: 'Rapportering', icon: BarChart3, desc: 'KPI-dashboards og rapporter levert automatisk — ingen manuell analyse', color: '#2dd4bf' },
  { name: 'Compliance & GDPR', icon: Lock, desc: 'Samtykke-logging, audit-trails og GDPR-compliance automatisert', color: '#fbbf24' },
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
    { q: 'Kan jeg starte med én automatisering?', a: 'Absolutt! De fleste starter med 2-3 anbefalte automatiseringer og utvider etterhvert som de ser resultater. Vi anbefaler å starte med det som gir størst impact.' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 720, margin: '0 auto' }}>
      {items.map((item, i) => (
        <div key={i} style={{
          background: open === i ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.015)',
          border: `1px solid ${open === i ? `rgba(${goldRgb},0.2)` : 'rgba(255,255,255,0.06)'}`,
          borderRadius: 14, overflow: 'hidden', transition: 'all 0.3s', cursor: 'pointer',
        }} onClick={() => setOpen(open === i ? null : i)}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '18px 22px',
          }}>
            <span style={{ fontSize: 15, fontWeight: 500, color: '#f0f0f0' }}>{item.q}</span>
            <ChevronDown size={18} style={{
              color: gold, transition: 'transform 0.3s', flexShrink: 0, marginLeft: 12,
              transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)',
            }} />
          </div>
          <AnimatePresence>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                <div style={{ padding: '0 22px 18px', fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                  {item.a}
                </div>
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
  const [toast, setToast] = useState<{ name: string; city: string; time: string } | null>(null)
  const names = [
    { name: 'Martin', city: 'Oslo' }, { name: 'Lena', city: 'Bergen' },
    { name: 'Erik', city: 'Trondheim' }, { name: 'Sara', city: 'Stavanger' },
    { name: 'Jonas', city: 'Kristiansand' }, { name: 'Ida', city: 'Tromsø' },
    { name: 'Anders', city: 'Drammen' }, { name: 'Nora', city: 'Fredrikstad' },
  ]
  useEffect(() => {
    const show = () => {
      const person = names[Math.floor(Math.random() * names.length)]
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
        <motion.div
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          style={{
            position: 'fixed', bottom: 24, left: 24, zIndex: 100,
            background: 'rgba(20,20,30,0.95)', border: `1px solid rgba(${goldRgb},0.2)`,
            borderRadius: 14, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12,
            backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', maxWidth: 320,
          }}
        >
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: `rgba(${goldRgb},0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Users size={16} color={gold} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f0' }}>{toast.name} fra {toast.city}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>startet gratis kartlegging · {toast.time}</div>
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
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <Link href="/" style={{ fontSize: 22, fontWeight: 700, color: gold, textDecoration: 'none', letterSpacing: '-0.5px' }}>
            Arxon
          </Link>
          {/* Desktop nav */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 32 }}>
            <a href="#bransjer" style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Bransjer</a>
            <a href="#automatiseringer" style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Automatiseringer</a>
            <a href="#kalkulator" style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>ROI-kalkulator</a>
            <a href="#faq" style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>FAQ</a>
            <button onClick={ctaClick} style={{
              background: gold, color: '#0a0a0f', border: 'none', borderRadius: 10, padding: '10px 22px',
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}>
              Gratis kartlegging
            </button>
          </div>
          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="md:hidden" style={{ background: 'rgba(10,10,15,0.98)', borderTop: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
              <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <a href="#bransjer" onClick={() => setMenuOpen(false)} style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Bransjer</a>
                <a href="#automatiseringer" onClick={() => setMenuOpen(false)} style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Automatiseringer</a>
                <a href="#kalkulator" onClick={() => setMenuOpen(false)} style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>ROI-kalkulator</a>
                <a href="#faq" onClick={() => setMenuOpen(false)} style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>FAQ</a>
                <button onClick={() => { setMenuOpen(false); ctaClick() }} style={{
                  background: gold, color: '#0a0a0f', border: 'none', borderRadius: 10, padding: '12px 24px',
                  fontSize: 15, fontWeight: 600, cursor: 'pointer', width: '100%',
                }}>
                  Gratis kartlegging
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ── */}
      <section style={{ paddingTop: 140, paddingBottom: 80, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Gradient bg */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 800, height: 600, background: `radial-gradient(ellipse, rgba(${goldRgb},0.08) 0%, transparent 70%)`, pointerEvents: 'none' }} />

        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `rgba(${goldRgb},0.08)`, border: `1px solid rgba(${goldRgb},0.15)`, borderRadius: 50, padding: '8px 18px', marginBottom: 28 }}>
            <Sparkles size={14} color={gold} />
            <span style={{ fontSize: 13, color: gold, fontWeight: 500 }}>226 automatiseringer · 25 bransjer</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.1, color: '#ffffff', marginBottom: 20, letterSpacing: '-1px' }}>
            Automatiser bedriften din{' '}
            <span style={{ color: gold }}>med AI</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: 40, maxWidth: 600, margin: '0 auto 40px' }}>
            AI-telefonsvarer, booking, fakturering, leadgenerering og 220+ andre automatiseringer — skreddersydd for din bransje. Start med gratis kartlegging.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <button onClick={ctaClick} style={{
              background: gold, color: '#0a0a0f', border: 'none', borderRadius: 14, padding: '18px 40px',
              fontSize: 17, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
              boxShadow: `0 4px 24px rgba(${goldRgb},0.3)`, transition: 'transform 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
              Start gratis kartlegging <ArrowRight size={18} />
            </button>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>Tar 2 minutter · Ingen forpliktelser · Gratis AI-analyse</span>
          </motion.div>
        </div>
      </section>

      {/* ── SOCIAL PROOF NUMBERS ── */}
      <section style={{ padding: '40px 24px 60px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 24, textAlign: 'center' }}>
          {[
            { value: 226, suffix: '+', label: 'Automatiseringer' },
            { value: 25, suffix: '', label: 'Bransjer' },
            { value: 85, suffix: '%', label: 'Raskere oppfølging' },
            { value: 24, suffix: '/7', label: 'AI tilgjengelig' },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{ padding: 24, background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: gold, marginBottom: 4 }}>
                <AnimCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PROBLEM / PAIN SECTION ── */}
      <section style={{ padding: '60px 24px 80px', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 700, color: '#fff', marginBottom: 16 }}>
            Kjenner du deg igjen?
          </motion.h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', marginBottom: 48, maxWidth: 600, margin: '0 auto 48px' }}>
            De fleste norske bedrifter taper penger på disse utfordringene hver dag
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, textAlign: 'left' }}>
            {[
              { pain: 'Tapte anrop = tapte kunder', fix: 'AI svarer telefonen 24/7 og booker møter', icon: Phone },
              { pain: 'Manuell booking og no-shows', fix: 'Automatisk booking + påminnelser (60-80% færre no-shows)', icon: Calendar },
              { pain: 'Leads faller mellom stolene', fix: 'AI scorer, følger opp og sender til CRM automatisk', icon: Target },
              { pain: 'Timer brukt på admin og rutinearbeid', fix: 'Faktura, rapporter og oppfølging på autopilot', icon: Clock },
              { pain: 'Dårlig synlighet og lite SoMe', fix: 'AI lager innhold og poster automatisk', icon: Megaphone },
              { pain: 'GDPR-bekymringer og compliance', fix: 'Innebygd samtykke-logging og audit-trails', icon: Shield },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                style={{ background: 'rgba(10,10,15,0.6)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `rgba(${goldRgb},0.08)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <item.icon size={18} color={gold} />
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#ff6b6b' }}>{item.pain}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <CheckCircle2 size={16} color="#4ade80" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{item.fix}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRY SELECTOR ── */}
      <section id="bransjer" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 700, color: '#fff', marginBottom: 12 }}>
              Finn din bransje
            </motion.h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', maxWidth: 550, margin: '0 auto' }}>
              226 skreddersydde automatiseringer fordelt på 25 bransjer. Velg din bransje for å se hva som passer deg.
            </p>
          </div>

          {/* Industry grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10, marginBottom: 40 }}>
            {industries.map((ind, i) => (
              <button key={ind.id} onClick={() => setSelectedIndustry(i)} style={{
                background: selectedIndustry === i ? `rgba(${goldRgb},0.12)` : 'rgba(255,255,255,0.02)',
                border: `1px solid ${selectedIndustry === i ? `rgba(${goldRgb},0.3)` : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 12, padding: '14px 16px', cursor: 'pointer', textAlign: 'left',
                transition: 'all 0.2s',
              }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{ind.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: selectedIndustry === i ? gold : '#e0e0e0', marginBottom: 2 }}>{ind.name}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{ind.count} automatiseringer</div>
              </button>
            ))}
          </div>

          {/* Selected industry detail */}
          <motion.div key={selectedIndustry} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: `rgba(${goldRgb},0.04)`, border: `1px solid rgba(${goldRgb},0.12)`, borderRadius: 20, padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 32 }}>{industries[selectedIndustry].icon}</span>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: 0 }}>{industries[selectedIndustry].name}</h3>
                <span style={{ fontSize: 14, color: gold }}>{industries[selectedIndustry].count} automatiseringer tilgjengelig</span>
              </div>
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>Anbefalte automatiseringer for din bransje:</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 24 }}>
              {industries[selectedIndustry].topAutos.map((auto, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(10,10,15,0.4)', borderRadius: 10, padding: '12px 16px' }}>
                  <CheckCircle2 size={16} color={gold} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: '#e0e0e0' }}>{auto}</span>
                </div>
              ))}
            </div>
            <button onClick={ctaClick} style={{
              background: gold, color: '#0a0a0f', border: 'none', borderRadius: 10, padding: '14px 28px',
              fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
            }}>
              Se alle {industries[selectedIndustry].count} automatiseringer for {industries[selectedIndustry].name} <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── AUTOMATION CATEGORIES ── */}
      <section id="automatiseringer" style={{ padding: '80px 24px', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 700, color: '#fff', marginBottom: 12 }}>
              8 kategorier av automatiseringer
            </motion.h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', maxWidth: 550, margin: '0 auto' }}>
              Fra leadgenerering til GDPR-compliance — vi dekker hele verdikjeden
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {categories.map((cat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                style={{
                  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 16, padding: 24, transition: 'border-color 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${cat.color}40`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${cat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <cat.icon size={22} color={cat.color} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 8 }}>{cat.name}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, margin: 0 }}>{cat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 700, color: '#fff', marginBottom: 12 }}>
              Slik kommer du i gang
            </motion.h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)' }}>Fra kartlegging til resultater — tre enkle steg</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
            {[
              { step: '1', title: 'Gratis kartlegging', desc: 'Svar på noen spørsmål om din bedrift (2 min). AI-en analyserer svarene og identifiserer de mest verdifulle automatiseringene for deg.', icon: ClipboardList },
              { step: '2', title: 'Skreddersydd forslag', desc: 'Du får en komplett oversikt med anbefalte automatiseringer, forventet ROI og prisestimat — uten forpliktelser.', icon: FileText },
              { step: '3', title: 'Vi implementerer', desc: 'Vi setter opp alt. De fleste automatiseringer er live innen 2-5 dager. Du ser resultater fra dag én.', icon: Zap },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ textAlign: 'center', padding: 32, background: 'rgba(255,255,255,0.02)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%', background: `rgba(${goldRgb},0.1)`, border: `2px solid rgba(${goldRgb},0.2)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
                  fontSize: 22, fontWeight: 800, color: gold,
                }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button onClick={ctaClick} style={{
              background: gold, color: '#0a0a0f', border: 'none', borderRadius: 14, padding: '16px 36px',
              fontSize: 16, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10,
              boxShadow: `0 4px 24px rgba(${goldRgb},0.25)`,
            }}>
              Start gratis kartlegging nå <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ── ROI CALCULATOR ── */}
      <section id="kalkulator" style={{ padding: '80px 24px', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 700, color: '#fff', marginBottom: 12 }}>
              Hvor mye taper du?
            </motion.h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)' }}>Regn ut hva ubesvarte anrop koster deg hver måned</p>
          </div>

          <div style={{ background: 'rgba(10,10,15,0.6)', border: `1px solid rgba(${goldRgb},0.12)`, borderRadius: 20, padding: 32 }}>
            {/* Industry selector */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 8, display: 'block' }}>Din bransje</label>
              <select value={roiIndustry} onChange={e => setRoiIndustry(Number(e.target.value))}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 15, cursor: 'pointer' }}>
                {industryROI.map((ind, i) => (
                  <option key={i} value={i} style={{ background: '#1a1a2e' }}>{ind.label}</option>
                ))}
              </select>
            </div>

            {/* Missed calls slider */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <label style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>Ubesvarte anrop per uke</label>
                <span style={{ fontSize: 16, fontWeight: 700, color: gold }}>{missedCalls}</span>
              </div>
              <input type="range" min={1} max={30} value={missedCalls} onChange={e => setMissedCalls(Number(e.target.value))}
                style={{ width: '100%', accentColor: gold }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
                <span>1</span><span>30</span>
              </div>
            </div>

            {/* Result */}
            <div style={{ textAlign: 'center', padding: 24, background: `rgba(${goldRgb},0.06)`, borderRadius: 16, border: `1px solid rgba(${goldRgb},0.15)` }}>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Estimert tapt omsetning per måned</div>
              <div style={{ fontSize: 42, fontWeight: 800, color: gold, marginBottom: 8 }}>
                {monthlySavings.toLocaleString('nb-NO')} kr
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
                = {(monthlySavings * 12).toLocaleString('nb-NO')} kr per år
              </div>
            </div>

            <button onClick={ctaClick} style={{
              background: gold, color: '#0a0a0f', border: 'none', borderRadius: 12, padding: '14px 28px',
              fontSize: 15, fontWeight: 600, cursor: 'pointer', width: '100%', marginTop: 24,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              Få gratis AI-analyse for din bedrift <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── TRUST SIGNALS ── */}
      <section style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, textAlign: 'center' }}>
            {[
              { icon: Shield, label: 'GDPR-compliant', sub: 'Data lagret i EØS' },
              { icon: Lock, label: 'EU AI Act-klar', sub: 'Kryptert & sikkert' },
              { icon: Zap, label: 'Live på 2-5 dager', sub: 'Rask implementering' },
              { icon: Users, label: 'Norsk support', sub: 'Lokal ekspertise' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <item.icon size={28} color={gold} strokeWidth={1.5} />
                <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{item.label}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{item.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ padding: '80px 24px', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 700, color: '#fff', marginBottom: 12 }}>
              Ofte stilte spørsmål
            </motion.h2>
          </div>
          <FAQ />
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ background: `linear-gradient(135deg, rgba(${goldRgb},0.08), rgba(${goldRgb},0.03))`, border: `1px solid rgba(${goldRgb},0.15)`, borderRadius: 24, padding: '56px 32px' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, color: '#fff', marginBottom: 16 }}>
              Klar for å automatisere?
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
              Start med en gratis kartlegging. Ingen binding, ingen risiko — bare konkrete forslag for din bedrift.
            </p>
            <button onClick={ctaClick} style={{
              background: gold, color: '#0a0a0f', border: 'none', borderRadius: 14, padding: '18px 44px',
              fontSize: 17, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10,
              boxShadow: `0 4px 24px rgba(${goldRgb},0.3)`,
            }}>
              Start gratis kartlegging <ArrowRight size={18} />
            </button>
            <div style={{ marginTop: 16, fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
              226 automatiseringer · 25 bransjer · 2 minutter
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: '40px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: gold, marginBottom: 4 }}>Arxon</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>AI-automatisering for norske bedrifter</div>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <Link href="/personvern" style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>Personvern</Link>
            <Link href="/vilkar" style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>Vilkår</Link>
            <a href="mailto:kontakt@arxon.no" style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>kontakt@arxon.no</a>
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} Arxon. Alle rettigheter forbeholdt.
          </div>
        </div>
      </footer>

      {/* ── Sticky mobile CTA ── */}
      <AnimatePresence>
        {showSticky && (
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            className="md:hidden"
            style={{
              position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40,
              padding: '12px 16px', background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(20px)',
              borderTop: `1px solid rgba(${goldRgb},0.15)`,
            }}>
            <button onClick={ctaClick} style={{
              background: gold, color: '#0a0a0f', border: 'none', borderRadius: 12, padding: '14px 20px',
              fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              Start gratis kartlegging <ArrowRight size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social proof toast */}
      <LiveToast />

      {/* Blink animation for cursor */}
      <style jsx global>{`
        @keyframes blink { 50% { opacity: 0 } }
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .hidden { display: none; }
        @media (min-width: 768px) {
          .md\\:flex { display: flex !important; }
          .md\\:hidden { display: none !important; }
        }
      `}</style>
    </>
  )
}
