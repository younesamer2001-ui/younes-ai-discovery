'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight, ArrowLeft, Check, X, Phone, Bot, Zap, Shield, Clock,
  Users, TrendingUp, Star, Menu, CheckCircle2, AlertCircle, Building2,
  Sparkles, BarChart3, MessageSquare
} from 'lucide-react'

const gold = '#c9a96e'
const goldRgb = '201,169,110'
const bg = '#0a0a0f'

export default function PricingPage() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { id: '/mobilsvarer', label: 'Mobilsvarer' },
    { id: '/hvordan-det-fungerer', label: 'Hvordan det fungerer' },
    { id: '/integrasjoner', label: 'Integrasjoner' },
    { id: '/blogg', label: 'Blogg' },
    { id: '/om-oss', label: 'Om oss' },
  ]

  const tiers = [
    {
      name: 'Starter',
      desc: 'Kom i gang med 1–2 automasjoner og fang opp tapte henvendelser.',
      automations: '1–2',
      timeSaved: '10–20 t/uke',
      icon: Phone,
      examples: ['AI-telefonsvarer 24/7', 'Automatisk booking og kalender', 'SMS-bekreftelser'],
      idealFor: 'Enkeltpersonforetak, frisører, håndverkere',
      popular: false,
      color: '#6ee7b7',
    },
    {
      name: 'Profesjonell',
      desc: 'Automatiser kundemottak, oppfølging og salg med 3–5 automasjoner.',
      automations: '3–5',
      timeSaved: '20–35 t/uke',
      icon: Zap,
      examples: ['Alt i Starter +', 'CRM-integrasjon & lead-scoring', 'E-post og SMS-oppfølging', 'Fakturering & purring', 'Kundetilfredshet & anmeldelser'],
      idealFor: 'Voksende bedrifter, klinikker, advokatkontor',
      popular: true,
      color: gold,
    },
    {
      name: 'Vekst',
      desc: 'Full automatisering med 6+ automasjoner og avansert analyse.',
      automations: '6+',
      timeSaved: '35–50+ t/uke',
      icon: TrendingUp,
      examples: ['Alt i Profesjonell +', 'Intern rapportering & dashboards', 'Social media auto-publisering', 'Dokumentgenerering med AI', 'Automatisert onboarding', 'Dedikert kontaktperson'],
      idealFor: 'Bedrifter med flere lokasjoner, kjeder',
      popular: false,
      color: '#a78bfa',
    },
  ]

  const employeeComparison = [
    { role: 'Resepsjonist / telefonsvarer', annualCost: '420 000', arxonRange: '50 000 – 90 000', savingRange: '330 000 – 370 000' },
    { role: 'Kundeservice-medarbeider', annualCost: '480 000', arxonRange: '75 000 – 120 000', savingRange: '360 000 – 405 000' },
    { role: 'Booking-koordinator', annualCost: '440 000', arxonRange: '50 000 – 90 000', savingRange: '350 000 – 390 000' },
    { role: 'Lead-kvalifiserer (salg)', annualCost: '520 000', arxonRange: '90 000 – 150 000', savingRange: '370 000 – 430 000' },
  ]

  const whySetup = [
    { icon: Bot, title: 'Skreddersydd AI-opplæring', desc: 'Vi trener AI-en på din bedrift, dine tjenester, priser og vanlige spørsmål — så den svarer som en av dine egne.' },
    { icon: Zap, title: 'Integrasjon med dine systemer', desc: 'Vi kobler AI til kalender, CRM, regnskap og de verktøyene du allerede bruker — alt satt opp for deg.' },
    { icon: Shield, title: 'Testing og kvalitetssikring', desc: 'Vi tester alt grundig før lansering og justerer til du er 100% fornøyd med hvordan AI-en representerer bedriften din.' },
    { icon: BarChart3, title: 'Lavere løpende kostnader', desc: 'Høyere setup-fee = lavere månedskostnad. Du investerer i en skikkelig løsning, og sparer mer over tid.' },
  ]

  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  }

  return (
    <div style={{ minHeight: '100vh', background: bg, color: '#f0f0f0', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        ::selection { background: rgba(${goldRgb},0.3); }
        .cta-shimmer { background: linear-gradient(110deg, ${gold} 0%, #e0c88a 25%, ${gold} 50%, #a8884d 75%, ${gold} 100%); background-size: 200% 100%; animation: shimmer 3s linear infinite; }
        .cta-shimmer:hover { transform: translateY(-1px); box-shadow: 0 12px 40px rgba(${goldRgb},0.35) !important; }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .gold-hover { transition: all 0.3s ease; }
        .gold-hover:hover { border-color: rgba(${goldRgb},0.3) !important; transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
        .show-mobile-only { display: none !important; }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile-only { display: flex !important; }
          .comparison-grid { grid-template-columns: 1.5fr 1fr 1fr 1fr !important; font-size: 12px !important; }
          .comparison-grid span { font-size: inherit !important; }
        }
      `}</style>

      {/* Nav */}
      <nav style={{
        background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(20px)',
        borderBottom: `1px solid rgba(${goldRgb},0.1)`, padding: '0 24px',
        position: 'sticky', top: 0, zIndex: 90,
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 56 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <img src="/arxon-icon.png" alt="Arxon" style={{ width: 28, height: 28 }} />
            <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#f0f0f0' }}>Arxon</span>
          </Link>
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {navLinks.map((link) => (
              <Link key={link.id} href={link.id} style={{
                color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = gold}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              >{link.label}</Link>
            ))}
            <button onClick={() => router.push('/kartlegging')} className="cta-shimmer" style={{
              color: bg, border: 'none', borderRadius: 10, padding: '8px 20px',
              fontWeight: 600, fontSize: 13, cursor: 'pointer',
            }}>
              Start kartlegging <ArrowRight size={13} style={{ display: 'inline', marginLeft: 6, verticalAlign: 'middle' }} />
            </button>
          </div>
          <div className="show-mobile-only" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={() => router.push('/kartlegging')} className="cta-shimmer" style={{
              color: bg, border: 'none', borderRadius: 8, padding: '7px 16px', fontWeight: 600, fontSize: 12, cursor: 'pointer',
            }}>Start</button>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{
              background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
              padding: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {menuOpen ? <X size={20} color="rgba(255,255,255,0.7)" /> : <Menu size={20} color="rgba(255,255,255,0.7)" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 95, background: 'rgba(10,10,15,0.98)', padding: '80px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 7, cursor: 'pointer', display: 'flex' }}><X size={20} color="rgba(255,255,255,0.7)" /></button>
          {navLinks.map(l => (
            <button key={l.id} onClick={() => { setMenuOpen(false); router.push(l.id) }} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 18, fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", textAlign: 'left', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{l.label}</button>
          ))}
        </div>
      )}

      {/* Hero */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px 30px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: gold, textDecoration: 'none', fontSize: 14, marginBottom: 24 }}>
            <ArrowLeft size={14} /> Tilbake til forsiden
          </Link>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 700, marginBottom: 16 }}>
            Bygg pakken din.<br />
            <span style={{ color: gold }}>Få tilpasset pris.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 17, maxWidth: 600, margin: '0 auto 20px', lineHeight: 1.6 }}>
            Velg automasjonene som passer din bedrift — vi tilpasser prisen basert på ditt valg.
            Ingen faste pakker, bare det du faktisk trenger.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: 10, padding: '10px 20px', fontSize: 14, color: '#4ade80' }}>
            <CheckCircle2 size={16} />
            <span>Bedrifter sparer typisk <strong>300 000 – 450 000 kr/år</strong> med Arxon</span>
          </div>
        </motion.div>
      </section>

      {/* Pricing Model Explainer */}
      <section style={{ maxWidth: 700, margin: '0 auto', padding: '20px 24px 40px' }}>
        <motion.div {...fadeUp} style={{
          background: `linear-gradient(135deg, rgba(${goldRgb},0.06) 0%, rgba(${goldRgb},0.01) 100%)`,
          border: `1px solid rgba(${goldRgb},0.12)`, borderRadius: 18, padding: '28px 28px',
        }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, marginBottom: 12, textAlign: 'center' }}>
            Slik fungerer det
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <MessageSquare size={18} color={gold} style={{ flexShrink: 0, marginTop: 2 }} />
              <div><strong style={{ color: '#f0f0f0' }}>1. Kartlegging</strong><br />Vi analyserer bedriften din og anbefaler automasjoner for din bransje.</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Sparkles size={18} color={gold} style={{ flexShrink: 0, marginTop: 2 }} />
              <div><strong style={{ color: '#f0f0f0' }}>2. Bygg pakken</strong><br />Du velger hvilke automasjoner du vil ha — vi viser tidsbesparelse og kompleksitet.</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Clock size={18} color={gold} style={{ flexShrink: 0, marginTop: 2 }} />
              <div><strong style={{ color: '#f0f0f0' }}>3. Tilpasset pris</strong><br />Du får et skreddersydd tilbud basert på akkurat det du valgte. Setup + fast mnd.</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Tier Examples */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 60px' }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3.5vw, 28px)', fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>
          Tre nivåer — <span style={{ color: gold }}>du velger innholdet</span>
        </motion.h2>
        <motion.p {...fadeUp} style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: 14, marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>
          Prisen bestemmes av hvor mange automasjoner du velger. Jo mer du automatiserer, desto mer sparer du.
        </motion.p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {tiers.map((tier, i) => {
            const Icon = tier.icon
            return (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.45 }}
              className="gold-hover"
              style={{
                background: tier.popular ? `linear-gradient(135deg, rgba(${goldRgb},0.06) 0%, rgba(${goldRgb},0.02) 100%)` : 'rgba(255,255,255,0.02)',
                border: `1px solid ${tier.popular ? `rgba(${goldRgb},0.25)` : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 20, padding: '28px 22px',
                position: 'relative', display: 'flex', flexDirection: 'column',
              }}>
              {tier.popular && (
                <div style={{
                  position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                  background: gold, color: bg, fontSize: 11, fontWeight: 700, padding: '4px 16px',
                  borderRadius: 20, letterSpacing: '0.5px', textTransform: 'uppercase' as const,
                  whiteSpace: 'nowrap',
                }}>Mest valgt</div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `rgba(${goldRgb},0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} color={tier.color} />
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Playfair Display', serif", color: tier.color }}>{tier.name}</h3>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 20, lineHeight: 1.5 }}>{tier.desc}</p>

              {/* Key stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>Automasjoner</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: tier.color }}>{tier.automations}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>Tidsbesparelse</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: tier.color }}>{tier.timeSaved}</div>
                </div>
              </div>

              {/* Ideal for */}
              <div style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 10, padding: '8px 12px', marginBottom: 20, fontSize: 12, color: 'rgba(255,255,255,0.45)',
              }}>
                Passer for: <span style={{ color: 'rgba(255,255,255,0.7)' }}>{tier.idealFor}</span>
              </div>

              {/* Example automations */}
              <div style={{ flex: 1, marginBottom: 24 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 10, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' as const }}>Eksempel på innhold</div>
                {tier.examples.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
                    <CheckCircle2 size={15} color={tier.color} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button onClick={() => router.push('/kartlegging')}
                className={tier.popular ? 'cta-shimmer' : ''}
                style={{
                  width: '100%', padding: '14px', borderRadius: 12, fontWeight: 600, fontSize: 15,
                  cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
                  ...(tier.popular ? {
                    color: bg, border: 'none',
                  } : {
                    background: `rgba(${goldRgb},0.08)`, border: `1px solid rgba(${goldRgb},0.2)`, color: gold,
                  }),
                }}>
                Bygg din pakke
                <ArrowRight size={14} style={{ display: 'inline', marginLeft: 6, verticalAlign: 'middle' }} />
              </button>
            </motion.div>
          )})}
        </div>

        {/* Note under cards */}
        <motion.p {...fadeUp} style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 20, maxWidth: 600, margin: '20px auto 0' }}>
          Prisen tilpasses basert på dine valg. Inkluderer engangs setup-fee + fast månedlig pris.
          Alle priser eks. mva. Ingen bindingstid etter oppsett.
        </motion.p>
      </section>

      {/* Why Setup Fee Section */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 60px' }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>
          Hvorfor engangs setup-fee?
        </motion.h2>
        <motion.p {...fadeUp} style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: 14, marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>
          Du investerer i en skreddersydd AI-løsning — ikke et ferdigprodukt fra hylla. Setup-fee dekker alt det arbeidet som gjør at AI-en faktisk leverer resultater.
        </motion.p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {whySetup.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div key={i} {...fadeUp} style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 16, padding: '24px 20px',
              }}>
                <Icon size={22} color={gold} style={{ marginBottom: 12 }} />
                <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: '#f0f0f0' }}>{item.title}</h4>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{item.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Employee Cost Comparison */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 70px' }}>
        <motion.div {...fadeUp}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, textAlign: 'center', marginBottom: 10 }}>
            Hva koster en ansatt vs. <span style={{ color: gold }}>Arxon?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: 15, marginBottom: 36, maxWidth: 560, margin: '0 auto 36px' }}>
            Se hvor mye du sparer ved å automatisere repetitivt arbeid med AI. Tallene inkluderer lønn, arbeidsgiveravgift og sosiale kostnader.
          </p>
        </motion.div>

        <motion.div {...fadeUp} style={{
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 18,
          overflow: 'hidden',
        }}>
          {/* Table header */}
          <div className="comparison-grid" style={{
            display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1fr', padding: '16px 24px',
            background: `rgba(${goldRgb},0.06)`, borderBottom: `1px solid rgba(${goldRgb},0.1)`,
            fontSize: 12, fontWeight: 600, color: gold, textTransform: 'uppercase' as const, letterSpacing: '0.5px',
          }}>
            <span>Rolle</span>
            <span>Ansatt (årlig)</span>
            <span>Arxon (årlig)</span>
            <span>Du sparer</span>
          </div>

          {/* Table rows */}
          {employeeComparison.map((row, i) => (
            <div key={i} className="comparison-grid" style={{
              display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1fr', padding: '16px 24px',
              borderBottom: i < employeeComparison.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              fontSize: 14, alignItems: 'center',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{row.role}</span>
              <span style={{ color: '#ff6b6b', fontWeight: 600 }}>{row.annualCost} kr</span>
              <span style={{ color: '#4ade80', fontWeight: 600 }}>{row.arxonRange} kr</span>
              <span style={{ color: gold, fontWeight: 700 }}>{row.savingRange} kr</span>
            </div>
          ))}
        </motion.div>

        {/* Summary */}
        <motion.div {...fadeUp} style={{
          marginTop: 24, background: `linear-gradient(135deg, rgba(${goldRgb},0.08) 0%, rgba(${goldRgb},0.02) 100%)`,
          border: `1px solid rgba(${goldRgb},0.15)`, borderRadius: 18, padding: '28px 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20,
        }}>
          <div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Typisk besparelse per erstattede stilling</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: gold, fontFamily: "'Playfair Display', serif" }}>300 000 – 430 000 kr/år</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Inkludert setup-fee og månedlige kostnader</div>
          </div>
          <button onClick={() => router.push('/kartlegging')} className="cta-shimmer" style={{
            color: bg, border: 'none', borderRadius: 12, padding: '14px 32px',
            fontWeight: 700, fontSize: 15, cursor: 'pointer',
          }}>
            Beregn dine besparelser
            <ArrowRight size={14} style={{ display: 'inline', marginLeft: 8, verticalAlign: 'middle' }} />
          </button>
        </motion.div>
      </section>

      {/* How it works */}
      <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px 70px' }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3.5vw, 28px)', fontWeight: 700, textAlign: 'center', marginBottom: 36 }}>
          Fra kartlegging til <span style={{ color: gold }}>resultater</span>
        </motion.h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            { step: '1', title: 'Gratis kartlegging', desc: 'Svar på noen spørsmål om bedriften din. Vi identifiserer de beste automatiseringsmulighetene for din bransje.' },
            { step: '2', title: 'Bygg din pakke', desc: 'Velg hvilke automasjoner du vil ha fra anbefalingene. Se tidsbesparelse og kompleksitet for hver løsning.' },
            { step: '3', title: 'Få tilpasset tilbud', desc: 'Vi kontakter deg med eksakt pris basert på det du valgte — setup-fee og fast månedlig kostnad.' },
            { step: '4', title: 'Vi bygger og lanserer', desc: 'Vårt team setter opp alt. Du trenger ikke gjøre noe teknisk. Du ser besparelsene fra dag én.' },
          ].map((s, i) => (
            <motion.div key={i} {...fadeUp} style={{ display: 'flex', gap: 20, padding: '20px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                background: `rgba(${goldRgb},0.1)`, border: `1px solid rgba(${goldRgb},0.15)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, fontWeight: 700, color: gold, fontFamily: "'Playfair Display', serif",
              }}>{s.step}</div>
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{s.title}</h4>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Guarantee Section */}
      <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px 70px', textAlign: 'center' }}>
        <motion.div {...fadeUp} style={{
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 18, padding: '36px 32px',
        }}>
          <Shield size={32} color={gold} style={{ marginBottom: 16 }} />
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
            Fornøyd-garanti
          </h3>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: 460, margin: '0 auto 20px' }}>
            Vi justerer og optimaliserer til du er 100% fornøyd med løsningen.
            Ingen bindingstid på månedlig drift — du kan avslutte når som helst.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><CheckCircle2 size={14} color={gold} /> Ingen bindingstid</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><CheckCircle2 size={14} color={gold} /> GDPR-sikret</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><CheckCircle2 size={14} color={gold} /> Norsk datasenter</span>
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px 70px', textAlign: 'center' }}>
        <motion.div {...fadeUp}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 700, marginBottom: 14 }}>
            Klar for å bygge din pakke?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15, marginBottom: 24, maxWidth: 480, margin: '0 auto 24px' }}>
            Start med en gratis kartlegging, velg dine automasjoner, og få et skreddersydd tilbud — helt uforpliktende.
          </p>
          <button onClick={() => router.push('/kartlegging')} className="cta-shimmer" style={{
            color: bg, border: 'none', borderRadius: 14, padding: '16px 40px',
            fontWeight: 700, fontSize: 17, cursor: 'pointer',
          }}>
            Start kartlegging og bygg pakke
            <ArrowRight size={16} style={{ display: 'inline', marginLeft: 8, verticalAlign: 'middle' }} />
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 36px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 32, marginBottom: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 280 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <img src="/arxon-icon.png" alt="Arxon" style={{ width: 24, height: 24 }} />
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const }}>Arxon</span>
            </div>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', lineHeight: 1.6 }}>
              Intelligent AI-automatisering for norske bedrifter.
            </span>
          </div>
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '1.5px', textTransform: 'uppercase' as const }}>Tjenester</span>
              <Link href="/mobilsvarer" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>AI Mobilsvarer</Link>
              <Link href="/hvordan-det-fungerer" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Hvordan det fungerer</Link>
              <Link href="/kartlegging" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Gratis kartlegging</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '1.5px', textTransform: 'uppercase' as const }}>Kontakt</span>
              <a href="mailto:kontakt@arxon.no" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>kontakt@arxon.no</a>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Oslo, Norge</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '1.5px', textTransform: 'uppercase' as const }}>Juridisk</span>
              <Link href="/personvern" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Personvern</Link>
              <Link href="/vilkar" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Vilkår for bruk</Link>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>&copy; {new Date().getFullYear()} Arxon. Alle rettigheter reservert.</span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>GDPR-kompatibel · Norsk datasenter</span>
        </div>
      </footer>
    </div>
  )
}
