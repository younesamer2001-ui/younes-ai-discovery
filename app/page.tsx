'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Language, t } from '@/lib/translations'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Globe, Phone, Bot, Zap, Shield, Clock, BarChart3, CheckCircle2, ChevronRight, Star, Users, TrendingUp, Building2 } from 'lucide-react'

/* ── Animated counter ── */
function AnimCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const dur = 1200
    const start = Date.now()
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(target * eased))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])
  return <span ref={ref}>{count.toLocaleString('nb-NO')}{suffix}</span>
}

/* ── Colors ── */
const gold = '#c9a96e'
const bg = '#0a0a0f'

export default function LandingPage() {
  const [lang, setLang] = useState<Language>('no')
  const router = useRouter()

  const features = lang === 'no' ? [
    { icon: Phone, title: 'AI Telefonsvar 24/7', desc: 'Aldri gå glipp av en henvendelse igjen. AI svarer, kvalifiserer og booker — døgnet rundt.', stat: '24/7' },
    { icon: Bot, title: 'Skreddersydd analyse', desc: 'Intelligente spørsmål tilpasset din bransje gir en unik AI-integrasjonsplan.', stat: '12 bransjer' },
    { icon: BarChart3, title: 'ROI-kalkulator', desc: 'Se nøyaktig hvor mye du taper — og hvor mye du kan spare med AI-automatisering.', stat: '357% snitt-ROI' },
    { icon: Shield, title: 'GDPR-kompatibel', desc: 'All data innenfor EØS. Databehandleravtale og EU AI Act-klar fra dag én.', stat: '100% trygt' },
  ] : [
    { icon: Phone, title: 'AI Phone Answering 24/7', desc: 'Never miss an inquiry again. AI answers, qualifies and books — around the clock.', stat: '24/7' },
    { icon: Bot, title: 'Tailored analysis', desc: 'Smart questions for your industry generate a unique AI integration plan.', stat: '12 industries' },
    { icon: BarChart3, title: 'ROI Calculator', desc: 'See exactly how much you lose — and how much you can save with AI automation.', stat: '357% avg ROI' },
    { icon: Shield, title: 'GDPR Compliant', desc: 'All data within EEA. DPA and EU AI Act ready from day one.', stat: '100% secure' },
  ]

  const steps = lang === 'no' ? [
    { num: '01', title: 'Fyll inn kontaktinfo', desc: 'Start en gratis kartlegging — tar kun 2 minutter', icon: Users },
    { num: '02', title: 'Svar på spørsmål', desc: 'AI-en stiller smarte spørsmål om din bedrift og bransje', icon: Bot },
    { num: '03', title: 'Få din AI-analyse', desc: 'Personlig rapport med anbefalinger, ROI og prisestimat', icon: BarChart3 },
    { num: '04', title: 'Vi tar kontakt', desc: 'En rådgiver diskuterer anbefalingene innen 24 timer', icon: Phone },
  ] : [
    { num: '01', title: 'Enter your info', desc: 'Start a free discovery — takes only 2 minutes', icon: Users },
    { num: '02', title: 'Answer questions', desc: 'AI asks smart questions about your business and industry', icon: Bot },
    { num: '03', title: 'Get your AI analysis', desc: 'Personal report with recommendations, ROI and price estimate', icon: BarChart3 },
    { num: '04', title: 'We follow up', desc: 'An advisor discusses recommendations within 24 hours', icon: Phone },
  ]

  const industries = lang === 'no'
    ? ['Bygg & Håndverk', 'Restaurant', 'Helse', 'Eiendom', 'Advokat', 'Regnskap', 'Butikk', 'Frisør', 'Transport', 'IT', 'Utdanning', 'Og flere...']
    : ['Construction', 'Restaurant', 'Healthcare', 'Real Estate', 'Legal', 'Accounting', 'Retail', 'Beauty', 'Transport', 'IT', 'Education', 'And more...']

  const testimonials = lang === 'no' ? [
    { name: 'Martin S.', role: 'Daglig leder, Byggmester AS', text: 'Vi gikk fra å tape 15 henvendelser i uken til null. AI-telefonsvar var den beste investeringen vi har gjort.', stars: 5 },
    { name: 'Lena K.', role: 'Eier, Salong Lux', text: 'Uteblivelsene våre gikk ned 40% på første måned. Kundene elsker SMS-påminnelsene.', stars: 5 },
    { name: 'Erik T.', role: 'Partner, Advokatfirma Holm', text: 'Klientinntak som tok 2 timer tar nå 10 minutter. Imponerende analyse av vår praksis.', stars: 5 },
  ] : [
    { name: 'Martin S.', role: 'CEO, Construction Co', text: 'We went from losing 15 inquiries per week to zero. AI phone answering was the best investment we made.', stars: 5 },
    { name: 'Lena K.', role: 'Owner, Salon Lux', text: 'Our no-shows dropped 40% in the first month. Customers love the SMS reminders.', stars: 5 },
    { name: 'Erik T.', role: 'Partner, Holm Law Firm', text: 'Client intake that took 2 hours now takes 10 minutes. Impressive analysis of our practice.', stars: 5 },
  ]

  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, ease: 'easeOut' },
  }

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(180deg, ${bg} 0%, #0d0d15 50%, ${bg} 100%)`, color: '#f0f0f0', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');::selection{background:rgba(201,169,110,0.3)}`}</style>

      {/* ── NAV ── */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1100, margin: '0 auto', padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${gold}, #a8884d)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: bg }}>AI</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600 }}>Younes AI</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={() => router.push('/kartlegging')} style={{ background: 'transparent', border: `1px solid rgba(255,255,255,0.1)`, color: 'rgba(255,255,255,0.6)', borderRadius: 8, padding: '7px 16px', fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s' }}>
            {lang === 'no' ? 'Kartlegging' : 'Discovery'}
          </button>
          <button onClick={() => setLang(lang === 'no' ? 'en' : 'no')} style={{ background: 'transparent', border: `1px solid rgba(255,255,255,0.1)`, color: 'rgba(255,255,255,0.5)', borderRadius: 8, padding: '7px 14px', fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            {lang === 'no' ? 'EN' : 'NO'}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <motion.section {...fadeUp} style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px 60px', textAlign: 'center', position: 'relative' }}>
        {/* Glow effect */}
        <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: `radial-gradient(ellipse, rgba(201,169,110,0.08) 0%, transparent 70%)`, pointerEvents: 'none' }} />

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.5 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 30, background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.2)', fontSize: 13, color: gold, marginBottom: 32 }}>
          <Zap size={14} />
          {lang === 'no' ? 'Gratis AI-analyse for din bedrift' : 'Free AI analysis for your business'}
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 6vw, 60px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 20, letterSpacing: '-0.02em' }}>
          {lang === 'no' ? (
            <>Finn ut hvordan <span style={{ color: gold }}>AI</span> kan revolusjonere din bedrift</>
          ) : (
            <>Discover how <span style={{ color: gold }}>AI</span> can transform your business</>
          )}
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}
          style={{ fontSize: 'clamp(16px, 2.5vw, 19px)', color: 'rgba(255,255,255,0.55)', maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.6 }}>
          {lang === 'no'
            ? 'Svar på noen smarte spørsmål og få en personlig AI-integrasjonsplan med ROI-beregning — helt gratis.'
            : 'Answer a few smart questions and get a personal AI integration plan with ROI calculation — completely free.'}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14, marginBottom: 32 }}>
          <button onClick={() => router.push('/kartlegging')} style={{
            background: gold, color: bg, border: 'none', borderRadius: 12, padding: '16px 36px',
            fontWeight: 600, fontSize: 17, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            boxShadow: '0 8px 32px rgba(201,169,110,0.25)', transition: 'all 0.2s',
          }}>
            {lang === 'no' ? 'Start gratis kartlegging' : 'Start free discovery'}
            <ArrowRight size={18} style={{ display: 'inline', marginLeft: 8, verticalAlign: 'middle' }} />
          </button>
          <button onClick={() => router.push(`/login?lang=${lang}`)} style={{
            background: 'transparent', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 12, padding: '16px 32px', fontWeight: 500, fontSize: 16, cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
          }}>
            {lang === 'no' ? 'Logg inn' : 'Log in'}
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
          {[
            lang === 'no' ? 'Ingen forpliktelser' : 'No obligations',
            lang === 'no' ? 'Svar innen 24 timer' : 'Response within 24 hours',
            lang === 'no' ? 'Tilpasset din bransje' : 'Tailored to your industry',
          ].map((txt, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <CheckCircle2 size={14} color={gold} />{txt}
            </span>
          ))}
        </motion.div>
      </motion.section>

      {/* ── STATS BAR ── */}
      <motion.section {...fadeUp} style={{ maxWidth: 900, margin: '0 auto 60px', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
          {[
            { value: 357, suffix: '+', label: lang === 'no' ? 'Bedrifter kartlagt' : 'Businesses analyzed' },
            { value: 12, suffix: '', label: lang === 'no' ? 'Bransjer dekket' : 'Industries covered' },
            { value: 24, suffix: '/7', label: lang === 'no' ? 'AI tilgjengelighet' : 'AI availability' },
            { value: 93, suffix: '%', label: lang === 'no' ? 'Kundetilfredshet' : 'Client satisfaction' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '24px 20px', textAlign: 'center', background: bg }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: gold, fontFamily: "'Playfair Display', serif" }}>
                <AnimCounter target={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── FEATURES ── */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px 60px' }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, textAlign: 'center', marginBottom: 12 }}>
          {lang === 'no' ? 'Hvorfor velge AI-integrasjon?' : 'Why choose AI integration?'}
        </motion.h2>
        <motion.p {...fadeUp} style={{ color: 'rgba(255,255,255,0.45)', textAlign: 'center', fontSize: 15, marginBottom: 48, maxWidth: 500, margin: '0 auto 48px' }}>
          {lang === 'no' ? 'Vi kombinerer AI-ekspertise med bransjekunnskap for å finne din perfekte løsning.' : 'We combine AI expertise with industry knowledge to find your perfect solution.'}
        </motion.p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.45 }}
              style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16,
                padding: '28px 24px', transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(201,169,110,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <f.icon size={22} color={gold} />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.55, marginBottom: 16 }}>{f.desc}</p>
              <span style={{ fontSize: 12, color: gold, background: 'rgba(201,169,110,0.06)', padding: '4px 10px', borderRadius: 6, border: '1px solid rgba(201,169,110,0.15)' }}>{f.stat}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, textAlign: 'center', marginBottom: 48 }}>
          {lang === 'no' ? 'Slik fungerer det' : 'How it works'}
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.45 }}
              style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{ fontSize: 48, fontWeight: 700, fontFamily: "'Playfair Display', serif", color: 'rgba(201,169,110,0.12)', marginBottom: 12, lineHeight: 1 }}>{s.num}</div>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(201,169,110,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                <s.icon size={22} color={gold} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 60px' }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>
          {lang === 'no' ? 'Skreddersydd for din bransje' : 'Tailored for your industry'}
        </motion.h2>
        <motion.p {...fadeUp} style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: 14, marginBottom: 32 }}>
          {lang === 'no' ? 'Spesifikke AI-anbefalinger for hver bransje' : 'Specific AI recommendations for each industry'}
        </motion.p>
        <motion.div {...fadeUp} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
          {industries.map((ind, i) => (
            <span key={i} style={{
              padding: '8px 18px', borderRadius: 20, fontSize: 13, fontWeight: 500,
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.55)', transition: 'all 0.2s', cursor: 'default',
            }}>{ind}</span>
          ))}
        </motion.div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px 60px' }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 700, textAlign: 'center', marginBottom: 36 }}>
          {lang === 'no' ? 'Hva kundene sier' : 'What clients say'}
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {testimonials.map((tm, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }}
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '24px 22px' }}>
              <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                {Array.from({ length: tm.stars }).map((_, j) => <Star key={j} size={14} fill={gold} color={gold} />)}
              </div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.55, marginBottom: 16, fontStyle: 'italic' }}>"{tm.text}"</p>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{tm.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{tm.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <motion.section {...fadeUp} style={{ maxWidth: 700, margin: '0 auto', padding: '40px 24px 80px', textAlign: 'center' }}>
        <div style={{ background: 'rgba(201,169,110,0.04)', border: '1px solid rgba(201,169,110,0.15)', borderRadius: 24, padding: '48px 32px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 700, marginBottom: 12 }}>
            {lang === 'no' ? 'Klar til å komme i gang?' : 'Ready to get started?'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, marginBottom: 32, maxWidth: 420, margin: '0 auto 32px' }}>
            {lang === 'no'
              ? 'Det tar bare 10 minutter, og det er helt gratis. Ingen forpliktelser.'
              : "It only takes 10 minutes, and it's completely free. No obligations."}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
            <button onClick={() => router.push('/kartlegging')} style={{
              background: gold, color: bg, border: 'none', borderRadius: 12, padding: '15px 32px',
              fontWeight: 600, fontSize: 16, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
              boxShadow: '0 8px 32px rgba(201,169,110,0.2)', transition: 'all 0.2s',
            }}>
              {lang === 'no' ? 'Start gratis kartlegging' : 'Start free discovery'}
              <ArrowRight size={18} style={{ display: 'inline', marginLeft: 8, verticalAlign: 'middle' }} />
            </button>
            <button onClick={() => router.push(`/login?lang=${lang}`)} style={{
              background: 'transparent', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 12, padding: '15px 28px', fontWeight: 500, fontSize: 15, cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {lang === 'no' ? 'Logg inn' : 'Log in'}
            </button>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 20 }}>
            {lang === 'no' ? 'Vi tar inn maksimalt 3 nye kunder per måned for å sikre kvalitet.' : 'We onboard a maximum of 3 new clients per month to ensure quality.'}
          </p>
        </div>
      </motion.section>

      {/* ── FOOTER ── */}
      <footer style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 32px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 5, background: `linear-gradient(135deg, ${gold}, #a8884d)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: bg }}>AI</div>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Younes AI Co.</span>
        </div>
        <div style={{ display: 'flex', gap: 20, fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
          <span>{lang === 'no' ? 'GDPR-kompatibel' : 'GDPR Compliant'}</span>
          <span>{lang === 'no' ? 'Norsk datasenter' : 'European data center'}</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  )
}
