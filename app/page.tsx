'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Phone, Zap, Shield, ChevronDown, Star,
  ClipboardList, FileText, CheckCircle2,
} from 'lucide-react'
import Nav from '@/app/components/Nav'

const gold = '#c9a96e'
const goldRgb = '201,169,110'

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

/* ── Typewriter effect ── */
function Typewriter({ words }: { words: string[] }) {
  const [wordIdx, setWordIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const word = words[wordIdx]
    const timeout = deleting
      ? setTimeout(() => {
          setText(word.slice(0, text.length - 1))
          if (text.length <= 1) { setDeleting(false); setWordIdx((i) => (i + 1) % words.length) }
        }, 40)
      : setTimeout(() => {
          setText(word.slice(0, text.length + 1))
          if (text.length >= word.length) setTimeout(() => setDeleting(true), 2200)
        }, 80)
    return () => clearTimeout(timeout)
  }, [text, deleting, wordIdx, words])
  return <>{text}<span className="typewriter-cursor" /></>
}

/* ── FAQ accordion ── */
function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="faq-card" onClick={() => setOpen(open === i ? null : i)}>
          <div className="flex items-center justify-between cursor-pointer">
            <span className="text-[15px] font-semibold text-white/90">{item.q}</span>
            <ChevronDown size={18} className={`text-white/30 transition-transform ${open === i ? 'rotate-180' : ''}`} />
          </div>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <p className="text-[13px] text-white/50 mt-3 leading-relaxed">{item.a}</p>
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
  const actions = ['startet gratis kartlegging', 'fikk sin AI-analyse', 'fikk 8 anbefalte automatiseringer', 'booket implementering']
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
          style={{ background: 'rgba(5,5,16,0.85)', border: `1px solid rgba(${goldRgb},0.15)`, backdropFilter: 'blur(12px)', maxWidth: 320 }}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `rgba(${goldRgb},0.15)`, color: gold }}>
            {toast.name[0]}
          </div>
          <div>
            <p className="text-xs text-white/80"><strong>{toast.name}</strong> fra {toast.city}</p>
            <p className="text-[11px] text-white/40">{toast.action}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── Technology partner logos (SVG) ── */
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
          <div className="text-white/20 group-hover:text-white/50 transition-all duration-300 group-hover:scale-110">
            {logo.svg}
          </div>
          <span className="text-[10px] text-white/15 group-hover:text-white/40 tracking-widest uppercase transition-colors">{logo.name}</span>
        </div>
      ))}
    </div>
  )
}

/* ── INDUSTRIES DATA ── */
const industries = [
  { name: 'Bygg & Håndverk', count: 12, benefit: '+30-50% flere leads' },
  { name: 'Salong & Skjønnhet', count: 10, benefit: '75% færre no-shows' },
  { name: 'Advokatkontor', count: 12, benefit: '24/7 klientkvalifisering' },
  { name: 'Restaurant & Café', count: 10, benefit: 'AI svarer alltid' },
  { name: 'Eiendomsmegling', count: 12, benefit: '24/7 interessenter' },
  { name: 'Helse & Klinikk', count: 12, benefit: '50-70% mindre resepsjon' },
  { name: 'E-handel', count: 10, benefit: '10-15% færre forlatte kurver' },
  { name: 'Regnskap', count: 8, benefit: 'Frigjør regnskapstimer' },
  { name: 'Rekruttering', count: 8, benefit: 'Minutter istedenfor timer' },
  { name: 'Bilverksted', count: 9, benefit: 'AI svarer, mekanikere jobber' },
  { name: 'Coaching', count: 8, benefit: '24/7 kurssalg' },
  { name: 'IT & Tech', count: 8, benefit: 'Spar L1-support timer' },
  { name: 'Trening & Fitness', count: 8, benefit: 'Fyll plasser uten resepsjon' },
  { name: 'Reiseliv', count: 10, benefit: 'Fang gjester etter stengetid' },
  { name: 'Logistikk', count: 8, benefit: 'Færre supporthenvendelser' },
  { name: 'SaaS & Produkt', count: 8, benefit: 'Øk konverteringsrate' },
]

/* ── ROI DATA ── */
const roiData: Record<string, { avgDeal: number; conversion: number }> = {
  'Bygg & Håndverk': { avgDeal: 85000, conversion: 0.18 },
  'Frisør / Salong': { avgDeal: 950, conversion: 0.65 },
  'Restaurant / Café': { avgDeal: 1200, conversion: 0.70 },
  'Advokat / Juridisk': { avgDeal: 25000, conversion: 0.25 },
  'Regnskap': { avgDeal: 12000, conversion: 0.30 },
  'Helse / Klinikk': { avgDeal: 2500, conversion: 0.55 },
  'Eiendom': { avgDeal: 65000, conversion: 0.12 },
  'IT / Konsulent': { avgDeal: 35000, conversion: 0.20 },
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
/*           MAIN PAGE COMPONENT            */
/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function Home() {
  const router = useRouter()
  const ctaClick = useCallback(() => router.push('/kartlegging'), [router])

  const [selectedIndustry, setSelectedIndustry] = useState(0)
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
    { q: 'Hva koster det å komme i gang?', a: 'Kartleggingen er 100% gratis. Etter analysen får du et skreddersydd pristilbud basert på hvilke automatiseringer du trenger. De fleste starter fra 2 990 kr/mnd.' },
    { q: 'Hvor lang tid tar implementeringen?', a: 'Fra signering til live: 2-5 virkedager. Vi tar oss av alt teknisk — du trenger bare å gi oss tilgang til de systemene vi skal integrere med.' },
    { q: 'Er det trygt med tanke på GDPR?', a: 'Absolutt. All data lagres kryptert innen EØS. Vi er GDPR-kompatible og EU AI Act-klare. Ingen data deles med tredjeparter.' },
    { q: 'Kan jeg starte med én automatisering?', a: 'Ja! Mange starter med AI-mobilsvarer og utvider derfra. Du velger selv tempo og omfang.' },
  ]

  const sectionAnim = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } }

  return (
    <>
      <Nav />

      {/* ═══════════════════════════════════════════ */}
      {/*  1. HERO                                    */}
      {/* ═══════════════════════════════════════════ */}
      <section className="pt-8 md:pt-16 pb-16 md:pb-24 text-center relative overflow-hidden min-h-[85vh] flex flex-col justify-center">
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* Aurora glow */}
        <div className="hero-aurora" />
        {/* Floating particles */}
        <div className="particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`, animationDuration: `${6 + Math.random() * 8}s`,
              width: `${2 + Math.random() * 3}px`, height: `${2 + Math.random() * 3}px`,
            }} />
          ))}
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-5">
          {/* Animated gradient border badge */}
          <motion.div {...sectionAnim} className="shimmer-badge inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8">
            <Shield size={13} style={{ color: gold }} />
            <span className="text-[12px] text-white/50 tracking-wide">GDPR &middot; Norsk support &middot; Live på 2–5 dager</span>
          </motion.div>

          <motion.h1 {...sectionAnim} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[36px] md:text-[56px] font-extrabold leading-[1.1] tracking-tight text-white mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Automatiser{' '}
            <span style={{ color: gold }}>
              <Typewriter words={['telefonen', 'bookingen', 'kundeoppfølging', 'fakturering', 'markedsføring']} />
            </span>
          </motion.h1>

          <motion.p {...sectionAnim} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[16px] md:text-[18px] text-white/50 max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Norske bedrifter taper i snitt 85 000 kr/mnd på ubesvarte anrop og manuelt arbeid.<br className="hidden md:block" />
            Arxon fikser det med AI — på under en uke.
          </motion.p>

          <motion.div {...sectionAnim} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={ctaClick} className="gold-btn rounded-xl py-4 px-8 text-[15px] font-bold flex items-center justify-center gap-2">
              Start gratis kartlegging <ArrowRight size={16} />
            </button>
            <a href="tel:+4778896386" className="glass-btn rounded-xl py-4 px-8 text-[15px] font-semibold flex items-center justify-center gap-2 no-underline">
              <Phone size={15} /> Ring 78 89 63 86
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  2. STATS BAR                               */}
      {/* ═══════════════════════════════════════════ */}
      <motion.section {...sectionAnim} className="py-12 border-y relative" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
        <div className="absolute inset-0 overflow-hidden"><div className="stats-glow" /></div>
        <div className="max-w-4xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-center relative z-10">
          {[
            { val: 226, suffix: '+', label: 'Automatiseringer' },
            { val: 25, suffix: '', label: 'Bransjer dekket' },
            { val: 85, suffix: '%', label: 'Raskere oppfølging' },
            { val: 24, suffix: '/7', label: 'AI tilgjengelig' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
              <div className="text-[28px] md:text-[36px] font-extrabold text-gradient-gold" style={{ fontFamily: "'Playfair Display', serif" }}>
                <AnimCounter target={s.val} suffix={s.suffix} />
              </div>
              <div className="text-[12px] text-white/35 tracking-wide uppercase mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════ */}
      {/*  3. TECHNOLOGY PARTNERS                     */}
      {/* ═══════════════════════════════════════════ */}
      <motion.section {...sectionAnim} className="py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <p className="text-[12px] text-white/25 tracking-[3px] uppercase mb-8">Bygget med teknologi fra verdensledende selskaper</p>
          <TechLogos />
        </div>
        {/* Gold divider glow */}
        <div className="gold-divider mt-16" />
      </motion.section>

      {/* ═══════════════════════════════════════════ */}
      {/*  4. ROADMAP: HOW IT WORKS                   */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-2xl mx-auto px-5">
          <motion.div {...sectionAnim} className="text-center mb-16">
            <h2 className="text-[28px] md:text-[40px] font-bold text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Din reise med <span style={{ color: gold }}>Arxon</span>
            </h2>
            <p className="text-[14px] text-white/40 mt-3">Fra kartlegging til full automatisering — på under en uke.</p>
          </motion.div>

          <div className="relative">
            {/* Animated timeline line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px" style={{ background: `linear-gradient(to bottom, rgba(${goldRgb},0.3), rgba(${goldRgb},0.05))` }} />
            <div className="timeline-glow-line" />

            {[
              { step: 1, icon: <ClipboardList size={20} />, title: 'Gratis kartlegging', time: '2 minutter', desc: 'Svar på noen enkle spørsmål om din bedrift. Vår AI analyserer dine behov og finner de automatiseringene som gir størst effekt.' },
              { step: 2, icon: <FileText size={20} />, title: 'Skreddersydd AI-forslag', time: 'Umiddelbart', desc: 'Du får en komplett oversikt over hvilke prosesser vi kan automatisere, forventet besparelse og en tydelig prioriteringsliste.' },
              { step: 3, icon: <Zap size={20} />, title: 'Vi implementerer', time: '2–5 dager', desc: 'Vi setter opp alt fra A til Å. Du trenger ikke gjøre noe teknisk — bare gi oss tilgang, så fikser vi resten.' },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.15 }}
                className="relative pl-16 md:pl-20 pb-12 last:pb-0"
              >
                <div className="absolute left-0 md:left-2 w-12 h-12 rounded-full flex items-center justify-center z-10 step-circle"
                  style={{ background: `rgba(${goldRgb},0.1)`, border: `1px solid rgba(${goldRgb},0.25)` }}>
                  <div className="step-pulse-ring" />
                  <span className="text-sm font-bold relative z-10" style={{ color: gold }}>{item.step}</span>
                </div>

                <div className="road-card p-6">
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <h3 className="text-[16px] font-bold text-white flex items-center gap-2">
                      <span style={{ color: gold }}>{item.icon}</span> {item.title}
                    </h3>
                    <span className="text-[11px] px-3 py-1 rounded-full font-medium"
                      style={{ background: `rgba(${goldRgb},0.08)`, color: gold, border: `1px solid rgba(${goldRgb},0.15)` }}>
                      {item.time}
                    </span>
                  </div>
                  <p className="text-[13px] text-white/45 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...sectionAnim} className="text-center mt-12">
            <button onClick={ctaClick} className="gold-btn rounded-xl py-4 px-8 text-[15px] font-bold inline-flex items-center gap-2">
              Start kartleggingen nå <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  5. INDUSTRY SELECTOR                       */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-4xl mx-auto px-5">
          <motion.div {...sectionAnim} className="text-center mb-10">
            <h2 className="text-[24px] md:text-[36px] font-bold text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Finn din <span style={{ color: gold }}>bransje</span>
            </h2>
            <p className="text-[14px] text-white/40 mt-3">Vi dekker 25 bransjer med skreddersydde automatiseringer.</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {industries.map((ind, i) => (
              <button key={i} onClick={() => setSelectedIndustry(i)}
                className="px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200"
                style={{
                  background: selectedIndustry === i ? `rgba(${goldRgb},0.12)` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${selectedIndustry === i ? `rgba(${goldRgb},0.3)` : 'rgba(255,255,255,0.06)'}`,
                  color: selectedIndustry === i ? gold : 'rgba(255,255,255,0.4)',
                }}>
                {ind.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={selectedIndustry}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="road-card p-6 md:p-8 max-w-lg mx-auto text-center"
            >
              <div className="text-[32px] font-extrabold mb-1" style={{ color: gold, fontFamily: "'Playfair Display', serif" }}>
                {industries[selectedIndustry].count}
              </div>
              <div className="text-[12px] text-white/35 uppercase tracking-wide mb-3">automatiseringer for {industries[selectedIndustry].name}</div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.15)' }}>
                <CheckCircle2 size={13} className="text-green-400" />
                <span className="text-[12px] text-green-400/80 font-medium">{industries[selectedIndustry].benefit}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  6. ROI CALCULATOR                          */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-xl mx-auto px-5">
          <motion.div {...sectionAnim} className="text-center mb-10">
            <h2 className="text-[24px] md:text-[36px] font-bold text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Hva taper <span style={{ color: gold }}>du</span> per måned?
            </h2>
            <p className="text-[14px] text-white/40 mt-3">Beregn ditt potensielle tap — og hva Arxon kan spare deg.</p>
          </motion.div>

          <motion.div {...sectionAnim} className="road-card p-6 md:p-8">
            <label className="block mb-4">
              <span className="text-[12px] text-white/35 uppercase tracking-wide">Bransje</span>
              <select value={roiIndustry} onChange={(e) => setRoiIndustry(e.target.value)}
                className="mt-2 w-full rounded-lg px-4 py-3 text-[14px] text-white/80 outline-none"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {Object.keys(roiData).map((k) => <option key={k} value={k} style={{ background: '#050510' }}>{k}</option>)}
              </select>
            </label>

            <label className="block mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[12px] text-white/35 uppercase tracking-wide">Ubesvarte anrop per uke</span>
                <span className="text-[14px] font-bold" style={{ color: gold }}>{missedCalls}</span>
              </div>
              <input type="range" min={1} max={30} value={missedCalls} onChange={(e) => setMissedCalls(+e.target.value)}
                className="w-full accent-[#c9a96e]" />
            </label>

            <div className="text-center py-6 rounded-xl relative overflow-hidden" style={{ background: `rgba(${goldRgb},0.04)`, border: `1px solid rgba(${goldRgb},0.1)` }}>
              <div className="roi-glow" />
              <div className="text-[11px] text-white/30 uppercase tracking-wide mb-1 relative z-10">Estimert månedlig tap</div>
              <div className="text-[36px] md:text-[44px] font-extrabold text-gradient-gold relative z-10" style={{ fontFamily: "'Playfair Display', serif" }}>
                {monthlySavings.toLocaleString('nb-NO')} kr
              </div>
              <div className="text-[12px] text-white/30 mt-1">
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
      {/*  7. TESTIMONIALS                            */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-3xl mx-auto px-5">
          <motion.div {...sectionAnim} className="text-center mb-12">
            <h2 className="text-[24px] md:text-[36px] font-bold text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Det fungerer for <span style={{ color: gold }}>andre</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'Martin K.', biz: 'Bygg & Håndverk', quote: 'Vi gikk fra å miste halvparten av innkommende leads til å fange alle. Omsetningen økte 25% på tre måneder — uten å ansette noen.', result: '+25% omsetning', stars: 5 },
              { name: 'Erik S.', biz: 'Advokatkontor', quote: 'AI-en kvalifiserer klienter og booker konsultasjoner automatisk. Jeg sparer over en time per sak på administrativt arbeid.', result: '60 min spart per sak', stars: 5 },
            ].map((t, i) => (
              <motion.div key={i} {...sectionAnim} transition={{ duration: 0.4, delay: i * 0.1 }}
                className="road-card p-6 md:p-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => <Star key={j} size={14} fill={gold} color={gold} />)}
                </div>
                <p className="text-[14px] text-white/60 leading-relaxed mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[14px] font-semibold text-white/80">{t.name}</div>
                    <div className="text-[12px] text-white/30">{t.biz}</div>
                  </div>
                  <span className="text-[12px] font-semibold px-3 py-1 rounded-full"
                    style={{ background: 'rgba(74,222,128,0.08)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.15)' }}>
                    {t.result}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  8. FAQ                                     */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-xl mx-auto px-5">
          <motion.div {...sectionAnim} className="text-center mb-10">
            <h2 className="text-[24px] md:text-[36px] font-bold text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Vanlige spørsmål
            </h2>
          </motion.div>
          <motion.div {...sectionAnim}>
            <FAQ items={faqItems} />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  9. FINAL CTA                               */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="cta-aurora" />
        <div className="max-w-2xl mx-auto px-5 text-center relative z-10">
          <motion.div {...sectionAnim}>
            <h2 className="text-[28px] md:text-[44px] font-bold text-white tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Slutt å tape kunder.<br /><span className="text-gradient-gold">Start i dag.</span>
            </h2>
            <p className="text-[14px] text-white/40 mb-8 max-w-md mx-auto">
              Gratis kartlegging. Ingen binding. Implementert på 2–5 dager.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={ctaClick} className="gold-btn rounded-xl py-4 px-10 text-[15px] font-bold flex items-center justify-center gap-2">
                Start gratis kartlegging <ArrowRight size={16} />
              </button>
              <a href="tel:+4778896386" className="glass-btn rounded-xl py-4 px-8 text-[15px] font-semibold flex items-center justify-center gap-2 no-underline">
                <Phone size={15} /> 78 89 63 86
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ maxWidth: 800, margin: '0 auto', padding: '36px 24px', borderTop: '1px solid rgba(255,255,255,0.04)', textAlign: 'center' }}>
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          {[
            { label: 'Personvern', href: '/personvern' },
            { label: 'Vilkår', href: '/vilkar' },
            { label: 'Blogg', href: '/blogg' },
            { label: 'kontakt@arxon.no', href: 'mailto:kontakt@arxon.no' },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="text-[12px] text-white/25 hover:text-white/50 transition-colors no-underline">{l.label}</Link>
          ))}
        </div>
        <p className="text-[11px] text-white/15">&copy; {new Date().getFullYear()} Arxon. Alle rettigheter reservert. &middot; GDPR-kompatibel &middot; Norsk datasenter</p>
      </footer>

      {/* ── Sticky mobile CTA ── */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-3 md:hidden"
            style={{ background: 'rgba(5,5,16,0.9)', borderTop: `1px solid rgba(${goldRgb},0.15)`, backdropFilter: 'blur(12px)' }}>
            <button onClick={ctaClick} className="gold-btn w-full rounded-xl py-3.5 text-[14px] font-bold flex items-center justify-center gap-2">
              Start gratis kartlegging <ArrowRight size={15} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Live toast ── */}
      <LiveToast />

      {/* ── Styles ── */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .cta-shimmer { background: linear-gradient(110deg, ${gold} 0%, #e0c88a 25%, ${gold} 50%, #a8884d 75%, ${gold} 100%); background-size: 200% 100%; animation: cta-shimmer-anim 3s linear infinite; }
        .cta-shimmer:hover { transform: translateY(-1px); box-shadow: 0 12px 40px rgba(${goldRgb},0.35) !important; }
        @keyframes cta-shimmer-anim { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .show-mob { display: none !important; }
        @media (max-width: 768px) {
          .hide-mob { display: none !important; }
          .show-mob { display: flex !important; }
        }

        @keyframes blink { 50% { opacity: 0 } }
        .typewriter-cursor {
          display: inline-block; width: 3px; height: 1em;
          background: ${gold}; margin-left: 2px;
          animation: blink 1s step-end infinite;
          vertical-align: text-bottom; border-radius: 1px;
        }
        html { scroll-behavior: smooth; }

        .gold-btn {
          background: linear-gradient(135deg, #e2c47d, ${gold}, #b8944a);
          color: #050510; border: none; cursor: pointer;
          position: relative; overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 4px 24px rgba(${goldRgb}, 0.2), 0 0 0 1px rgba(${goldRgb}, 0.3);
        }
        .gold-btn:hover {
          box-shadow: 0 8px 40px rgba(${goldRgb}, 0.35), 0 0 0 1px rgba(${goldRgb}, 0.4);
          transform: translateY(-2px);
        }
        .gold-btn::after {
          content: ''; position: absolute; top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%);
          transform: translateX(-100%); transition: transform 0.6s;
        }
        .gold-btn:hover::after { transform: translateX(100%); }

        .glass-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(${goldRgb}, 0.2);
          color: ${gold}; cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        .glass-btn:hover {
          background: rgba(${goldRgb}, 0.06);
          border-color: rgba(${goldRgb}, 0.35);
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(${goldRgb}, 0.1);
        }

        .road-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        .road-card:hover {
          border-color: rgba(${goldRgb}, 0.12);
          background: rgba(255,255,255,0.03);
        }

        .faq-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 16px 20px;
          transition: all 0.2s ease;
        }
        .faq-card:hover {
          border-color: rgba(255,255,255,0.1);
        }

        /* ── FLAIR: Gold gradient text ── */
        .text-gradient-gold {
          background: linear-gradient(135deg, #e2c47d, ${gold}, #b8944a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── FLAIR: Hero aurora glow ── */
        .hero-aurora {
          position: absolute;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 140%;
          height: 70%;
          background: radial-gradient(ellipse at 30% 50%, rgba(${goldRgb},0.06) 0%, transparent 50%),
                      radial-gradient(ellipse at 70% 50%, rgba(80,100,200,0.04) 0%, transparent 50%),
                      radial-gradient(ellipse at 50% 80%, rgba(${goldRgb},0.03) 0%, transparent 40%);
          animation: aurora-shift 12s ease-in-out infinite alternate;
          pointer-events: none;
          filter: blur(40px);
        }
        @keyframes aurora-shift {
          0% { transform: translateX(-50%) translateY(0) scale(1); opacity: 0.8; }
          50% { transform: translateX(-48%) translateY(-5%) scale(1.05); opacity: 1; }
          100% { transform: translateX(-52%) translateY(3%) scale(0.95); opacity: 0.7; }
        }

        /* ── FLAIR: Floating particles ── */
        .particles { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
        .particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(${goldRgb}, 0.3);
          animation: particle-float linear infinite;
        }
        @keyframes particle-float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-120vh) translateX(30px); opacity: 0; }
        }

        /* ── FLAIR: Shimmer badge (animated gradient border) ── */
        .shimmer-badge {
          position: relative;
          background: rgba(${goldRgb},0.04);
          border: 1px solid transparent;
          background-clip: padding-box;
        }
        .shimmer-badge::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 9999px;
          background: linear-gradient(90deg, rgba(${goldRgb},0.1), rgba(${goldRgb},0.35), rgba(${goldRgb},0.1));
          background-size: 200% 100%;
          animation: shimmer-border 3s linear infinite;
          z-index: -1;
        }
        @keyframes shimmer-border {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* ── FLAIR: Stats section glow ── */
        .stats-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 200px;
          background: radial-gradient(ellipse, rgba(${goldRgb},0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── FLAIR: Gold divider ── */
        .gold-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(${goldRgb},0.2), rgba(${goldRgb},0.4), rgba(${goldRgb},0.2), transparent);
          position: relative;
        }
        .gold-divider::after {
          content: '';
          position: absolute;
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 9px;
          background: radial-gradient(ellipse, rgba(${goldRgb},0.15), transparent);
          filter: blur(4px);
        }

        /* ── FLAIR: Timeline glow line (roadmap) ── */
        .timeline-glow-line {
          position: absolute;
          left: calc(1.5rem - 2px);
          top: 0;
          bottom: 0;
          width: 5px;
          background: linear-gradient(to bottom, rgba(${goldRgb},0.15), rgba(${goldRgb},0.02));
          filter: blur(3px);
          pointer-events: none;
        }
        @media (min-width: 768px) {
          .timeline-glow-line { left: calc(2rem - 2px); }
        }

        /* ── FLAIR: Step circle pulse ── */
        .step-circle { position: relative; }
        .step-pulse-ring {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1px solid rgba(${goldRgb},0.15);
          animation: step-pulse 3s ease-in-out infinite;
        }
        @keyframes step-pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0; }
        }

        /* ── FLAIR: ROI result glow ── */
        .roi-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 150px;
          background: radial-gradient(ellipse, rgba(${goldRgb},0.08) 0%, transparent 70%);
          pointer-events: none;
          animation: roi-breathe 4s ease-in-out infinite;
        }
        @keyframes roi-breathe {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        }

        /* ── FLAIR: CTA aurora ── */
        .cta-aurora {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(ellipse at 30% 50%, rgba(${goldRgb},0.06) 0%, transparent 60%),
                      radial-gradient(ellipse at 70% 30%, rgba(100,120,220,0.03) 0%, transparent 50%),
                      radial-gradient(ellipse at 50% 80%, rgba(${goldRgb},0.04) 0%, transparent 50%);
          animation: cta-aurora-move 10s ease-in-out infinite alternate;
          pointer-events: none;
        }
        @keyframes cta-aurora-move {
          0% { opacity: 0.6; filter: blur(30px); }
          100% { opacity: 1; filter: blur(50px); }
        }

        /* ── FLAIR: Road card hover glow ── */
        .road-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 12px;
          opacity: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(${goldRgb},0.06) 0%, transparent 70%);
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .road-card { position: relative; overflow: hidden; }
        .road-card:hover::before { opacity: 1; }
      `}</style>
    </>
  )
}
