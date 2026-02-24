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
    ? ['svare telefonen 24/7', 'booke møter automatisk', 'kvalifisere leads med AI', 'automatisere fakturering', 'generere innhold med AI', 'frigjøre tid til det viktige']
    : ['answer calls 24/7', 'book meetings automatically', 'qualify leads with AI', 'automate invoicing', 'generate content with AI', 'free up time for what matters']

  const beforeAfter = lang === 'no' ? {
    title: 'Før og etter Arxon',
    before: {
      label: 'Uten AI',
      items: [
        'Mister henvendelser etter kl. 16 — tapt omsetning',
        'Betaler lønn for telefonsvarer, resepsjonist og sekretær',
        'Manuell fakturering, booking og lead-oppfølging',
        'Ingen automatisk lead-scoring — behandler alle likt',
        'Timer på repetitivt arbeid: e-post, notater, rapporter',
      ],
    },
    after: {
      label: 'Med Arxon — 150+ automatiseringer',
      items: [
        'AI-sekretær svarer 24/7 og booker direkte i kalenderen',
        'Spar 1–2 stillinger — AI håndterer kundeservice, booking og faktura',
        'Automatisk lead-scoring (BANT) prioriterer de beste kundene',
        'Full-syklus faktura-automatisering fra oppdrag til betaling',
        'AI møtenotat-taker, KPI-varsler og daglig bedriftsdigest',
      ],
    },
  } : {
    title: 'Before and After Arxon',
    before: {
      label: 'Without AI',
      items: [
        'Missing inquiries after hours — lost revenue',
        'Paying salaries for receptionist, phone staff and secretary',
        'Manual invoicing, booking and lead follow-up',
        'No automatic lead scoring — treating all leads equally',
        'Hours on repetitive work: emails, notes, reports',
      ],
    },
    after: {
      label: 'With Arxon — 150+ automations',
      items: [
        'AI secretary answers 24/7 and books directly in your calendar',
        'Save 1–2 positions — AI handles service, booking and invoicing',
        'Automatic lead scoring (BANT) prioritizes best customers',
        'Full-cycle invoice automation from job to payment',
        'AI meeting notes, KPI alerts and daily business digest',
      ],
    },
  }

  const features = lang === 'no' ? [
    { icon: Phone, title: 'AI Telefonsvar & Booking', desc: 'AI-sekretær som svarer anrop, kvalifiserer leads og booker direkte i Cal.com eller Google Kalender. Stemmestyrt booking med ElevenLabs, automatisk no-show-sporing og WhatsApp-påminnelser.', stat: '24/7 · 12 automatiseringer', subs: ['WhatsApp AI-bookingsystem', 'Stemmestyrt booking', 'Automatisk no-show-sporing'] },
    { icon: Zap, title: 'Lead-generering & Salg', desc: 'Fang leads fra Google Maps, LinkedIn og Facebook — automatisk beriket med AI. Speed-to-lead auto-respons sørger for at ingen henvendelse venter, og BANT lead-scoring prioriterer de beste.', stat: '20 automatiseringer', subs: ['AI lead-scoring (BANT)', 'Speed-to-lead respons', 'LinkedIn lead-pipeline'] },
    { icon: MessageSquare, title: 'Kundeservice & Kommunikasjon', desc: 'AI-chatbot med kunnskapsbase som håndterer henvendelser på tvers av WhatsApp, e-post og nettside. Automatisk klassifisering av support-tickets og human-in-the-loop for komplekse saker.', stat: '15 automatiseringer', subs: ['AI kundesupport-chatbot', 'Flerkanals henvendelsessystem', 'AI e-post auto-responder'] },
    { icon: BarChart3, title: 'Faktura & Økonomi', desc: 'Full-syklus faktura-automatisering fra opprettelse til betaling. AI leser fakturaer fra e-post, kobler Stripe-betalinger til regnskap og sender automatiske purringer ved forfall.', stat: '15 automatiseringer', subs: ['AI fakturaprosessering', 'Forfalt faktura-påminnelse', 'Stripe → regnskapssystem'] },
    { icon: TrendingUp, title: 'Markedsføring & Innhold', desc: 'AI-generert innhold for LinkedIn, Instagram og blogg. Automatisert SEO-pipeline, Google-anmeldelser til sosiale medier og merkeovervåkning — alt på autopilot.', stat: '18 automatiseringer', subs: ['AI SEO-blogginnhold', 'AI LinkedIn-postgenerator', 'Merkeovervåkning'] },
    { icon: Clock, title: 'Drift & Rapportering', desc: 'E-poster blir automatisk til oppgaver i Notion/Trello. Zoom AI-møteassistent tar notater, KPI-varsler holder deg oppdatert, og daglig AI-digest samler alt viktig.', stat: '25 automatiseringer', subs: ['Zoom AI-møteassistent', 'KPI-varslingssystem', 'Daglig AI bedriftsdigest'] },
  ] : [
    { icon: Phone, title: 'AI Phone & Booking', desc: 'AI secretary that answers calls, qualifies leads and books directly in Cal.com or Google Calendar. Voice-powered booking with ElevenLabs, automatic no-show tracking and WhatsApp reminders.', stat: '24/7 · 12 automations', subs: ['WhatsApp AI booking system', 'Voice-powered booking', 'Auto no-show tracking'] },
    { icon: Zap, title: 'Lead Generation & Sales', desc: 'Capture leads from Google Maps, LinkedIn and Facebook — auto-enriched with AI. Speed-to-lead auto-response ensures no inquiry waits, and BANT lead scoring prioritizes the best.', stat: '20 automations', subs: ['AI lead scoring (BANT)', 'Speed-to-lead response', 'LinkedIn lead pipeline'] },
    { icon: MessageSquare, title: 'Customer Service', desc: 'AI chatbot with knowledge base handling inquiries across WhatsApp, email and web. Auto classification of support tickets and human-in-the-loop for complex cases.', stat: '15 automations', subs: ['AI support chatbot', 'Multi-channel system', 'AI email auto-responder'] },
    { icon: BarChart3, title: 'Invoicing & Finance', desc: 'Full-cycle invoice automation from creation to payment. AI reads invoices from email, connects Stripe payments to accounting and sends automatic reminders on due dates.', stat: '15 automations', subs: ['AI invoice processing', 'Overdue reminders', 'Stripe → accounting'] },
    { icon: TrendingUp, title: 'Marketing & Content', desc: 'AI-generated content for LinkedIn, Instagram and blog. Automated SEO pipeline, Google reviews to social media and brand monitoring — all on autopilot.', stat: '18 automations', subs: ['AI SEO blog content', 'AI LinkedIn generator', 'Brand monitoring'] },
    { icon: Clock, title: 'Ops & Reporting', desc: 'Emails auto-convert to tasks in Notion/Trello. Zoom AI meeting assistant takes notes, KPI alerts keep you updated, and daily AI digest summarizes everything.', stat: '25 automations', subs: ['Zoom AI meeting assistant', 'KPI alert system', 'Daily AI digest'] },
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
    { icon: Building2, title: 'Byggefirma & Håndverk', desc: 'AI svarer telefonen og booker befaring direkte i kalenderen. Automatisert jobbplanlegging, Google Maps lead-scraper finner nye kunder, og PDF-faktura genereres fra oppdragsinformasjon.', benefit: 'Spar 10–20 timer/uke', automations: ['AI-sekretær for tidsbestilling', 'Google Maps lead-scraper', 'PDF-fakturagenerering', 'Automatisert jobbplanlegging'] },
    { icon: Users, title: 'Frisør & Salong', desc: 'WhatsApp AI-bookingsystem lar kunder booke 24/7. Automatisk no-show-sporing, påminnelser via SMS, og post-service kundetilfredshetsundersøkelse øker lojaliteten.', benefit: 'Spar 25 000+ kr/mnd', automations: ['WhatsApp AI-bookingsystem', 'Automatisk no-show-sporing', 'Post-service kundeundersøkelse', 'Cal.com → Google Kalender'] },
    { icon: Shield, title: 'Advokat & Regnskap', desc: 'AI kvalifiserer henvendelser, samler inn klientinformasjon og booker konsultasjoner. Full-syklus faktura-automatisering og AI fakturaprosessering frigjør 600+ timer per år.', benefit: 'Spar 600 timer/år', automations: ['AI fakturaprosessering fra e-post', 'Klient-onboarding med PDF + Trello', 'AI lead-scoring (BANT)', 'Full-syklus faktura-automatisering'] },
  ] : [
    { icon: Building2, title: 'Construction & Trades', desc: 'AI answers calls and books site visits directly in your calendar. Automated job scheduling, Google Maps lead scraper finds new customers, and PDF invoices generate from job info.', benefit: 'Save 10–20 hrs/week', automations: ['AI secretary for scheduling', 'Google Maps lead scraper', 'PDF invoice generation', 'Automated job scheduling'] },
    { icon: Users, title: 'Hair & Beauty', desc: 'WhatsApp AI booking system lets customers book 24/7. Auto no-show tracking, SMS reminders, and post-service satisfaction surveys boost loyalty.', benefit: 'Save 25,000+ NOK/mo', automations: ['WhatsApp AI booking', 'Auto no-show tracking', 'Post-service survey', 'Cal.com → Google Calendar'] },
    { icon: Shield, title: 'Legal & Accounting', desc: 'AI qualifies inquiries, collects client info and books consultations. Full-cycle invoice automation and AI invoice processing frees up 600+ hours per year.', benefit: 'Save 600 hrs/year', automations: ['AI invoice processing', 'Client onboarding with PDF + Trello', 'AI lead scoring (BANT)', 'Full-cycle invoice automation'] },
  ]

  const industries = lang === 'no'
    ? [
        { label: 'Bygg & Håndverk', id: 'bygg' }, { label: 'Restaurant', id: 'restaurant' }, { label: 'Helse', id: 'helse' },
        { label: 'Eiendom', id: 'eiendom' }, { label: 'Advokat', id: 'advokat' }, { label: 'Regnskap', id: 'regnskap' },
        { label: 'Butikk', id: 'butikk' }, { label: 'Frisør', id: 'frisor' }, { label: 'Transport', id: 'annet' },
        { label: 'IT', id: 'it' }, { label: 'Utdanning', id: 'annet' }, { label: 'Og flere...', id: '' },
      ]
    : [
        { label: 'Construction', id: 'bygg' }, { label: 'Restaurant', id: 'restaurant' }, { label: 'Healthcare', id: 'helse' },
        { label: 'Real Estate', id: 'eiendom' }, { label: 'Legal', id: 'advokat' }, { label: 'Accounting', id: 'regnskap' },
        { label: 'Retail', id: 'butikk' }, { label: 'Beauty', id: 'frisor' }, { label: 'Transport', id: 'annet' },
        { label: 'IT', id: 'it' }, { label: 'Education', id: 'annet' }, { label: 'And more...', id: '' },
      ]

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
        @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .logo-track { display: flex; gap: 48px; animation: scroll-left 30s linear infinite; width: max-content; }
        .logo-track:hover { animation-play-state: paused; }
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
          .use-case-card { grid-template-columns: 1fr !important; }
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
          {lang === 'no' ? '150+ AI-automatiseringer for norske bedrifter — Gratis kartlegging på 2 min' : '150+ AI automations for Norwegian businesses — Free assessment in 2 min'}
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.4 }}
          className="hero-title"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 6vw, 58px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 6, letterSpacing: '-0.02em', position: 'relative' }}>
          {lang === 'no' ? (
            <>AI-telefonsvarer som kan<br /><span style={{ color: gold }}><Typewriter words={heroWords} /></span></>
          ) : (
            <>AI receptionist that can<br /><span style={{ color: gold }}><Typewriter words={heroWords} /></span></>
          )}
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.35 }}
          style={{ fontSize: 'clamp(15px, 2.3vw, 18px)', color: 'rgba(255,255,255,0.5)', maxWidth: 560, margin: '20px auto 36px', lineHeight: 1.6 }}>
          {lang === 'no'
            ? 'Med 150+ ferdige automatiseringer erstatter vi telefonsvarer, booking, fakturering, lead-oppfølging og kundeservice — slik at du slipper å betale for ansatte som AI kan gjøre bedre.'
            : 'With 150+ ready automations we replace phone answering, booking, invoicing, lead follow-up and customer service — so you don\'t pay for staff AI can do better.'}
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
            { value: 150, suffix: '+', label: 'Ferdige automatiseringer' },
            { value: 2, suffix: ' sek', label: 'Svartid på anrop' },
            { value: 85, suffix: '+', label: 'Integrasjoner' },
          ] : [
            { value: 24, suffix: '/7', label: 'AI availability' },
            { value: 150, suffix: '+', label: 'Ready automations' },
            { value: 2, suffix: ' sec', label: 'Call response time' },
            { value: 85, suffix: '+', label: 'Integrations' },
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

      {/* ── SOCIAL PROOF LOGO BAR ── */}
      <motion.section {...fadeUp} style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto 50px', padding: '0 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', marginBottom: 20, letterSpacing: '0.5px' }}>
          {lang === 'no' ? 'Bygget med teknologi fra verdensledende selskaper' : 'Built with technology from world-leading companies'}
        </p>
        <div style={{ overflow: 'hidden', mask: 'linear-gradient(90deg, transparent, black 15%, black 85%, transparent)', WebkitMask: 'linear-gradient(90deg, transparent, black 15%, black 85%, transparent)' }}>
          <div className="logo-track">
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} style={{ display: 'flex', alignItems: 'center', gap: 48, flexShrink: 0 }}>
                {[
                  { name: 'Google Cloud', svg: <svg width="100" height="20" viewBox="0 0 100 20" fill="none"><text x="0" y="15" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="500" fill="rgba(255,255,255,0.25)">Google Cloud</text></svg> },
                  { name: 'Microsoft', svg: <svg width="80" height="20" viewBox="0 0 80 20" fill="none"><text x="0" y="15" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="500" fill="rgba(255,255,255,0.25)">Microsoft</text></svg> },
                  { name: 'OpenAI', svg: <svg width="60" height="20" viewBox="0 0 60 20" fill="none"><text x="0" y="15" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="500" fill="rgba(255,255,255,0.25)">OpenAI</text></svg> },
                  { name: 'Vapi', svg: <svg width="40" height="20" viewBox="0 0 40 20" fill="none"><text x="0" y="15" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="500" fill="rgba(255,255,255,0.25)">Vapi</text></svg> },
                  { name: 'n8n', svg: <svg width="30" height="20" viewBox="0 0 30 20" fill="none"><text x="0" y="15" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="500" fill="rgba(255,255,255,0.25)">n8n</text></svg> },
                  { name: 'Make.com', svg: <svg width="70" height="20" viewBox="0 0 70 20" fill="none"><text x="0" y="15" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="500" fill="rgba(255,255,255,0.25)">Make.com</text></svg> },
                  { name: 'Twilio', svg: <svg width="50" height="20" viewBox="0 0 50 20" fill="none"><text x="0" y="15" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="500" fill="rgba(255,255,255,0.25)">Twilio</text></svg> },
                  { name: 'Cal.com', svg: <svg width="60" height="20" viewBox="0 0 60 20" fill="none"><text x="0" y="15" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="500" fill="rgba(255,255,255,0.25)">Cal.com</text></svg> },
                  { name: 'Vercel', svg: <svg width="50" height="20" viewBox="0 0 50 20" fill="none"><text x="0" y="15" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="500" fill="rgba(255,255,255,0.25)">Vercel</text></svg> },
                  { name: 'Supabase', svg: <svg width="70" height="20" viewBox="0 0 70 20" fill="none"><text x="0" y="15" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="500" fill="rgba(255,255,255,0.25)">Supabase</text></svg> },
                ].map((logo) => (
                  <span key={logo.name} style={{ flexShrink: 0, opacity: 0.7, transition: 'opacity 0.3s' }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}>
                    {logo.svg}
                  </span>
                ))}
              </div>
            ))}
          </div>
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

      {/* ── FEATURES — Bento Grid ── */}
      <section id="tjenester" style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', padding: '20px 24px 60px', scrollMarginTop: 80 }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, textAlign: 'center', marginBottom: 10 }}>
          {lang === 'no' ? '150+ automatiseringer fordelt på 10 kategorier' : '150+ automations across 10 categories'}
        </motion.h2>
        <motion.p {...fadeUp} style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: 15, marginBottom: 44, maxWidth: 560, margin: '0 auto 44px' }}>
          {lang === 'no' ? 'Fra telefonsvar og booking til fakturering, lead-generering og markedsføring — alt på autopilot.' : 'From phone answering and booking to invoicing, lead generation and marketing — all on autopilot.'}
        </motion.p>
        {/* Bento grid — first two items are large, rest standard */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }} className="grid-2">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.45 }}
              onClick={() => router.push(i === 0 ? '/mobilsvarer' : '/kartlegging')}
              className="gold-hover"
              style={{
                background: i < 2
                  ? `linear-gradient(135deg, rgba(${goldRgb},0.04) 0%, rgba(${goldRgb},0.01) 100%)`
                  : 'rgba(255,255,255,0.02)',
                border: `1px solid ${i < 2 ? `rgba(${goldRgb},0.12)` : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 18, padding: i < 2 ? '32px 28px' : '24px 22px',
                transition: 'all 0.3s ease', cursor: 'pointer', position: 'relative', overflow: 'hidden',
              }}>
              {i < 2 && <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, background: `radial-gradient(circle, rgba(${goldRgb},0.06) 0%, transparent 70%)`, pointerEvents: 'none' }} />}
              <div style={{
                width: i < 2 ? 52 : 44, height: i < 2 ? 52 : 44, borderRadius: 12,
                background: `rgba(${goldRgb},0.08)`, border: `1px solid rgba(${goldRgb},0.12)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
              }}>
                <f.icon size={i < 2 ? 24 : 20} color={gold} />
              </div>
              <h3 style={{ fontSize: i < 2 ? 19 : 16, fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: 14 }}>{f.desc}</p>
              {/* Concrete automation examples */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                {f.subs.map((sub, si) => (
                  <span key={si} style={{
                    fontSize: 11, color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, padding: '3px 10px',
                  }}>
                    {sub}
                  </span>
                ))}
              </div>
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
      <section style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '20px 24px 30px' }}>
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
              onClick={() => router.push(ind.id ? `/kartlegging?bransje=${ind.id}` : '/kartlegging')}
              style={{
                padding: '9px 20px', borderRadius: 22, fontSize: 13, fontWeight: 500,
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.5)', transition: 'all 0.2s', cursor: 'pointer',
              }}>{ind.label}</motion.span>
          ))}
        </motion.div>
      </section>

      {/* ── INTEGRATIONS ── */}
      <section style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', padding: '20px 24px 70px' }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>
          {lang === 'no' ? 'Integrerer med verktøyene du bruker' : 'Integrates with your existing tools'}
        </motion.h2>
        <motion.p {...fadeUp} style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: 14, marginBottom: 36, maxWidth: 460, margin: '0 auto 36px' }}>
          {lang === 'no' ? '85+ integrasjoner via n8n og Make — kobler AI til hele virksomheten din.' : '85+ integrations via n8n and Make — connecting AI to your entire business.'}
        </motion.p>
        <motion.div {...fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
          {(lang === 'no' ? [
            { name: 'Google Kalender', emoji: '📅', desc: 'Automatisk booking' },
            { name: 'Microsoft Teams', emoji: '💬', desc: 'Chat & varsler' },
            { name: 'Slack', emoji: '🔔', desc: 'Notifikasjoner' },
            { name: 'HubSpot CRM', emoji: '📊', desc: 'Lead-håndtering' },
            { name: 'Tripletex', emoji: '🧾', desc: 'Regnskap & faktura' },
            { name: 'Twilio / Vapi', emoji: '📞', desc: 'AI-telefoni' },
            { name: 'Gmail / Outlook', emoji: '📧', desc: 'E-post automatisering' },
            { name: 'Shopify / WooCommerce', emoji: '🛒', desc: 'Netthandel' },
          ] : [
            { name: 'Google Calendar', emoji: '📅', desc: 'Auto booking' },
            { name: 'Microsoft Teams', emoji: '💬', desc: 'Chat & alerts' },
            { name: 'Slack', emoji: '🔔', desc: 'Notifications' },
            { name: 'HubSpot CRM', emoji: '📊', desc: 'Lead management' },
            { name: 'Tripletex', emoji: '🧾', desc: 'Accounting & invoicing' },
            { name: 'Twilio / Vapi', emoji: '📞', desc: 'AI telephony' },
            { name: 'Gmail / Outlook', emoji: '📧', desc: 'Email automation' },
            { name: 'Shopify / WooCommerce', emoji: '🛒', desc: 'E-commerce' },
          ]).map((integ, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.35 }}
              className="gold-hover"
              style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14,
                padding: '20px 16px', textAlign: 'center', transition: 'all 0.3s ease', cursor: 'pointer',
              }}
              onClick={() => router.push('/integrasjoner')}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{integ.emoji}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#f0f0f0', marginBottom: 4 }}>{integ.name}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{integ.desc}</div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div {...fadeUp} style={{ textAlign: 'center', marginTop: 24 }}>
          <button onClick={() => router.push('/integrasjoner')} style={{
            background: 'transparent', border: `1px solid rgba(${goldRgb},0.2)`, color: gold,
            borderRadius: 12, padding: '11px 28px', fontWeight: 600, fontSize: 13,
            cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
          }}>
            {lang === 'no' ? 'Se alle 85+ integrasjoner' : 'See all 85+ integrations'}
            <ArrowRight size={14} style={{ display: 'inline', marginLeft: 6, verticalAlign: 'middle' }} />
          </button>
        </motion.div>
      </section>

      {/* ── USE CASES — Alternating layout ── */}
      <section id="resultater" style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '20px 24px 70px', scrollMarginTop: 80 }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 700, textAlign: 'center', marginBottom: 10 }}>
          {lang === 'no' ? 'Slik kan AI hjelpe din bransje' : 'How AI can help your industry'}
        </motion.h2>
        <motion.p {...fadeUp} style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: 14, marginBottom: 44, maxWidth: 460, margin: '0 auto 44px' }}>
          {lang === 'no' ? 'Konkrete automatiseringer tilpasset din bransje' : 'Concrete automations tailored to your industry'}
        </motion.p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {useCases.map((uc, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.45 }}
              onClick={() => router.push('/kartlegging')}
              className="gold-hover use-case-card"
              style={{
                display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr',
                gap: 0, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 20, overflow: 'hidden', transition: 'all 0.3s ease', cursor: 'pointer',
              }}>
              {/* Visual side */}
              {i % 2 === 0 && (
                <div style={{
                  background: `linear-gradient(135deg, rgba(${goldRgb},0.06) 0%, rgba(${goldRgb},0.02) 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, minHeight: 180,
                }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: 20, background: `rgba(${goldRgb},0.1)`,
                    border: `1px solid rgba(${goldRgb},0.15)`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <uc.icon size={36} color={gold} />
                  </div>
                </div>
              )}
              {/* Text side */}
              <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontSize: 19, fontWeight: 600, marginBottom: 8 }}>{uc.title}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 14 }}>{uc.desc}</p>
                {/* Automation list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 16 }}>
                  {uc.automations.map((auto: string, ai: number) => (
                    <div key={ai} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
                      <CheckCircle2 size={12} color={gold} style={{ flexShrink: 0 }} />
                      <span>{auto}</span>
                    </div>
                  ))}
                </div>
                <span style={{ fontSize: 12, color: gold, background: `rgba(${goldRgb},0.06)`, padding: '6px 14px', borderRadius: 8, border: `1px solid rgba(${goldRgb},0.12)`, fontWeight: 600, alignSelf: 'flex-start' }}>{uc.benefit}</span>
              </div>
              {/* Visual side (when reversed) */}
              {i % 2 !== 0 && (
                <div style={{
                  background: `linear-gradient(135deg, rgba(${goldRgb},0.06) 0%, rgba(${goldRgb},0.02) 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, minHeight: 180,
                }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: 20, background: `rgba(${goldRgb},0.1)`,
                    border: `1px solid rgba(${goldRgb},0.15)`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <uc.icon size={36} color={gold} />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="kundeomtaler" style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', padding: '40px 24px 70px', scrollMarginTop: 80 }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, textAlign: 'center', marginBottom: 10 }}>
          {lang === 'no' ? 'Slik kan Arxon hjelpe din bedrift' : 'How Arxon can help your business'}
        </motion.h2>
        <motion.p {...fadeUp} style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: 15, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
          {lang === 'no' ? 'Illustrative eksempler basert på typiske norske bedrifter' : 'Illustrative examples based on typical Norwegian businesses'}
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

      {/* ── TRUST & COMPLIANCE ── */}
      <motion.section {...fadeUp} style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '20px 24px 60px' }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3.5vw, 28px)', fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>
          {lang === 'no' ? 'Sikkerhet du kan stole på' : 'Security you can trust'}
        </motion.h2>
        <motion.p {...fadeUp} style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: 14, marginBottom: 32, maxWidth: 460, margin: '0 auto 32px' }}>
          {lang === 'no' ? 'Vi tar personvern og datasikkerhet på alvor — alltid.' : 'We take privacy and data security seriously — always.'}
        </motion.p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {(lang === 'no' ? [
            { icon: Shield, title: 'GDPR-kompatibel', desc: 'Fullt i henhold til EUs personvernforordning. Dine data behandles kun i EU/EØS.' },
            { icon: '🔒', title: 'Ende-til-ende kryptert', desc: 'All kommunikasjon og data er kryptert med AES-256. Ingen uautorisert tilgang.' },
            { icon: '🇳🇴', title: 'Norsk datasenter', desc: 'Data lagres på norske/europeiske servere. Ingen data sendes utenfor EØS.' },
            { icon: '🛡️', title: 'NorSIS-anbefalt', desc: 'Vi følger NorSIS sine anbefalinger for sikker AI-bruk i norske bedrifter.' },
          ] : [
            { icon: Shield, title: 'GDPR Compliant', desc: 'Fully compliant with EU\'s General Data Protection Regulation. Data processed within EU/EEA only.' },
            { icon: '🔒', title: 'End-to-end Encrypted', desc: 'All communication and data encrypted with AES-256. No unauthorized access.' },
            { icon: '🇳🇴', title: 'Norwegian Data Center', desc: 'Data stored on Norwegian/European servers. No data sent outside EEA.' },
            { icon: '🛡️', title: 'NorSIS Recommended', desc: 'We follow NorSIS recommendations for secure AI use in Norwegian businesses.' },
          ]).map((trust, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.35 }}
              style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16,
                padding: '24px 20px', textAlign: 'center',
              }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>
                {typeof trust.icon === 'string' ? trust.icon : <trust.icon size={28} color={gold} />}
              </div>
              <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, color: '#f0f0f0' }}>{trust.title}</h4>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{trust.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ position: 'relative', zIndex: 1, maxWidth: 650, margin: '0 auto', padding: '20px 24px 70px', scrollMarginTop: 80 }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 700, textAlign: 'center', marginBottom: 32 }}>
          {lang === 'no' ? 'Ofte stilte spørsmål' : 'Frequently asked questions'}
        </motion.h2>
        <motion.div {...fadeUp}>
          <FAQ lang={lang} />
        </motion.div>
      </section>

      {/* ── PRICING TEASER ── */}
      <motion.section {...fadeUp} style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', padding: '0 24px 70px' }}>
        <div style={{
          background: `linear-gradient(135deg, rgba(${goldRgb},0.04) 0%, rgba(${goldRgb},0.01) 100%)`,
          border: `1px solid rgba(${goldRgb},0.12)`, borderRadius: 22, padding: '40px 32px', textAlign: 'center',
        }}>
          <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 700, marginBottom: 12 }}>
            {lang === 'no' ? 'Bygg pakken din — book en samtale' : 'Build your package — book a call'}
          </motion.h2>
          <motion.p {...fadeUp} style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, marginBottom: 28, maxWidth: 480, margin: '0 auto 28px', lineHeight: 1.6 }}>
            {lang === 'no'
              ? 'Velg automasjonene du trenger, generer en AI-analyse, og book en gratis samtale der vi diskuterer pris og løsning.'
              : 'Choose the automations you need, generate an AI analysis, and book a free call where we discuss pricing and solution.'}
          </motion.p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', marginBottom: 28 }}>
            {(lang === 'no' ? [
              { name: 'Starter', automations: '1–2', time: '10–20 t/uke', desc: 'Fang tapte henvendelser', color: '#6ee7b7' },
              { name: 'Profesjonell', automations: '3–5', time: '20–35 t/uke', desc: 'Automatiser kundemottak', color: gold },
              { name: 'Vekst', automations: '6+', time: '35–50+ t/uke', desc: 'Full automatisering', color: '#a78bfa' },
            ] : [
              { name: 'Starter', automations: '1–2', time: '10–20 h/week', desc: 'Catch missed inquiries', color: '#6ee7b7' },
              { name: 'Professional', automations: '3–5', time: '20–35 h/week', desc: 'Automate customer intake', color: gold },
              { name: 'Growth', automations: '6+', time: '35–50+ h/week', desc: 'Full automation', color: '#a78bfa' },
            ]).map((tier, i) => (
              <div key={i} style={{
                background: i === 1 ? `rgba(${goldRgb},0.06)` : 'rgba(255,255,255,0.02)',
                border: `1px solid ${i === 1 ? `rgba(${goldRgb},0.2)` : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 14, padding: '20px 24px', minWidth: 160, transition: 'all 0.2s',
              }}>
                <div style={{ fontSize: 13, color: tier.color, fontWeight: 600, marginBottom: 4 }}>{tier.name}</div>
                <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "'Playfair Display', serif", color: '#f0f0f0' }}>
                  {tier.automations}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{lang === 'no' ? 'automasjoner' : 'automations'}</div>
                <div style={{ fontSize: 12, color: tier.color, marginTop: 6, fontWeight: 600 }}>{tier.time}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>{tier.desc}</div>
              </div>
            ))}
          </div>
          <button onClick={() => router.push('/kartlegging')} className="cta-shimmer" style={{
            color: bg, border: 'none',
            borderRadius: 12, padding: '13px 32px', fontWeight: 600, fontSize: 14,
            cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
          }}>
            {lang === 'no' ? 'Bygg din pakke nå' : 'Build your package now'}
            <ArrowRight size={14} style={{ display: 'inline', marginLeft: 6, verticalAlign: 'middle' }} />
          </button>
        </div>
      </motion.section>

      {/* ── BOOK A CALL SECTION ── */}
      <motion.section {...fadeUp} id="book" style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', padding: '0 24px 60px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24,
          background: `linear-gradient(135deg, rgba(${goldRgb},0.04) 0%, rgba(${goldRgb},0.01) 100%)`,
          border: `1px solid rgba(${goldRgb},0.12)`, borderRadius: 24, padding: '44px 36px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -80, left: -80, width: 250, height: 250, background: `radial-gradient(circle, rgba(${goldRgb},0.06) 0%, transparent 70%)`, pointerEvents: 'none' }} />

          <div style={{ position: 'relative' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 700, marginBottom: 12 }}>
              {lang === 'no' ? 'Snakk med oss — helt uforpliktende' : 'Talk to us — no obligations'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
              {lang === 'no'
                ? 'Book en gratis 15-minutters videoprat. Vi ser på hva AI kan gjøre for akkurat din bedrift — ingen salgstrykk, bare konkrete svar.'
                : 'Book a free 15-minute video call. We\'ll look at what AI can do for your specific business — no sales pressure, just concrete answers.'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {(lang === 'no' ? [
                'Vi analyserer dine behov på forhånd',
                'Du får konkrete anbefalinger i møtet',
                'Ingen binding — du bestemmer selv etterpå',
              ] : [
                'We analyze your needs beforehand',
                'You get concrete recommendations in the meeting',
                'No commitment — you decide afterwards',
              ]).map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                  <CheckCircle2 size={15} color={gold} style={{ flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, position: 'relative' }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16, padding: '28px 24px', textAlign: 'center', width: '100%',
            }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>📅</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#e8e8ed', marginBottom: 4 }}>
                {lang === 'no' ? '15 min videoprat' : '15 min video call'}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>
                {lang === 'no' ? 'Gratis og uforpliktende' : 'Free and no obligations'}
              </div>
              <a
                href="https://cal.com/arxon/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-shimmer"
                style={{
                  display: 'inline-block', color: bg, border: 'none', borderRadius: 12, padding: '14px 32px',
                  fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                  boxShadow: `0 6px 24px rgba(${goldRgb},0.2)`, textDecoration: 'none', transition: 'all 0.2s',
                }}
              >
                {lang === 'no' ? 'Book samtale nå' : 'Book a call now'}
                <ArrowRight size={16} style={{ display: 'inline', marginLeft: 8, verticalAlign: 'middle' }} />
              </a>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 12 }}>
                {lang === 'no' ? 'Eller send e-post til kontakt@arxon.no' : 'Or email kontakt@arxon.no'}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

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
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
            <button onClick={() => router.push('/kartlegging')} className="cta-shimmer" style={{
              color: bg, border: 'none', borderRadius: 14, padding: '17px 40px',
              fontWeight: 700, fontSize: 17, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
              boxShadow: `0 8px 32px rgba(${goldRgb},0.25)`, transition: 'all 0.2s',
            }}>
              {lang === 'no' ? 'Se hva du taper — gratis' : 'See what you\'re losing — free'}
              <ArrowRight size={18} style={{ display: 'inline', marginLeft: 8, verticalAlign: 'middle' }} />
            </button>
            <a href="https://cal.com/arxon/15min" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, color: gold, border: `1px solid rgba(${goldRgb},0.3)`, borderRadius: 14, padding: '17px 32px',
              fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
              textDecoration: 'none', transition: 'all 0.2s', background: `rgba(${goldRgb},0.05)`,
            }}>
              📅 {lang === 'no' ? 'Book en samtale' : 'Book a call'}
            </a>
          </div>
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
              <a href="https://cal.com/arxon/15min" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>{lang === 'no' ? 'Book en samtale' : 'Book a call'}</a>
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
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.15)' }}>Enkeltpersonforetak under registrering</span>
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
