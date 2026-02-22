'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight, ArrowLeft, Check, X, Phone, Bot, Zap, Shield, Clock,
  Users, TrendingUp, Star, Menu, CheckCircle2, AlertCircle, Building2
} from 'lucide-react'

const gold = '#c9a96e'
const goldRgb = '201,169,110'
const bg = '#0a0a0f'

export default function PricingPage() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [annual, setAnnual] = useState(true)

  const navLinks = [
    { id: '/mobilsvarer', label: 'Mobilsvarer' },
    { id: '/hvordan-det-fungerer', label: 'Hvordan det fungerer' },
    { id: '/integrasjoner', label: 'Integrasjoner' },
    { id: '/blogg', label: 'Blogg' },
    { id: '/om-oss', label: 'Om oss' },
  ]

  const plans = [
    {
      name: 'Starter',
      desc: 'For enkeltpersonforetak og små bedrifter som vil fange opp tapte anrop.',
      priceMonthly: 1490,
      priceAnnual: 1190,
      employeeSaving: 'Erstatter 0,5 stilling',
      monthlySaving: '~15 000 kr spart/mnd',
      features: [
        'AI-telefonsvarer 24/7',
        'Opptil 100 samtaler/mnd',
        'Automatisk booking via SMS',
        'Samtaleoppsummering på e-post',
        'Norsk språkstøtte',
        'GDPR-kompatibel',
      ],
      notIncluded: [
        'CRM-integrasjon',
        'Flerbruker-dashbord',
        'Tilpasset AI-stemme',
      ],
      popular: false,
      cta: 'Start gratis prøveperiode',
    },
    {
      name: 'Profesjonell',
      desc: 'For voksende bedrifter som vil erstatte resepsjonist og kutte lønnskostnader.',
      priceMonthly: 2990,
      priceAnnual: 2490,
      employeeSaving: 'Erstatter 1–2 stillinger',
      monthlySaving: '~45 000 kr spart/mnd',
      features: [
        'Alt i Starter, pluss:',
        'Ubegrensede samtaler',
        'CRM-integrasjon (HubSpot, Pipedrive)',
        'Flerbruker-dashbord (5 brukere)',
        'Tilpasset AI-stemme og personlighet',
        'Automatisk lead-kvalifisering',
        'SMS og e-post oppfølging',
        'Prioritert støtte',
      ],
      notIncluded: [
        'API-tilgang',
        'Dedikert kontaktperson',
      ],
      popular: true,
      cta: 'Start gratis prøveperiode',
    },
    {
      name: 'Vekst',
      desc: 'For bedrifter som skalerer raskt og trenger avanserte funksjoner uten enterprise-prosess.',
      priceMonthly: 4990,
      priceAnnual: 3990,
      employeeSaving: 'Erstatter 2–3 stillinger',
      monthlySaving: '~80 000 kr spart/mnd',
      features: [
        'Alt i Profesjonell, pluss:',
        'API-tilgang',
        'Flerbruker-dashbord (15 brukere)',
        'Flerspråklig støtte (4 språk)',
        'Avansert analyse og rapportering',
        'Multi-lokasjon støtte',
        'Dedikert kontaktperson',
        'Prioritert onboarding',
      ],
      notIncluded: [
        'On-premise muligheter',
        'SLA-garanti',
      ],
      popular: false,
      cta: 'Start gratis prøveperiode',
    },
    {
      name: 'Enterprise',
      desc: 'For store bedrifter som vil automatisere hele kundemottaket med full kontroll.',
      priceMonthly: null,
      priceAnnual: null,
      employeeSaving: 'Erstatter 3–5+ stillinger',
      monthlySaving: '~120 000 kr+ spart/mnd',
      features: [
        'Alt i Vekst, pluss:',
        'Ubegrensede brukere',
        'Skreddersydd AI-opplæring',
        'On-premise muligheter',
        'SLA-garanti (99,9% oppetid)',
        'Prioritert 24/7 support',
        'Egendefinerte integrasjoner',
        'Kvartalsvis forretningsgjennomgang',
      ],
      notIncluded: [],
      popular: false,
      cta: 'Kontakt oss',
    },
  ]

  const employeeComparison = [
    { role: 'Resepsjonist / telefonsvarer', annualCost: '420 000 kr', arxonCost: '29 880 kr', saving: '390 120 kr' },
    { role: 'Kundeservice-medarbeider', annualCost: '480 000 kr', arxonCost: '29 880 kr', saving: '450 120 kr' },
    { role: 'Booking-koordinator', annualCost: '440 000 kr', arxonCost: '29 880 kr', saving: '410 120 kr' },
    { role: 'Lead-kvalifiserer (salg)', annualCost: '520 000 kr', arxonCost: '47 880 kr', saving: '472 120 kr' },
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
        .gold-hover:hover { border-color: rgba(${goldRgb},0.3) !important; transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
        .show-mobile-only { display: none !important; }
        @media (max-width: 1100px) {
          .grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile-only { display: flex !important; }
          .grid-4 { grid-template-columns: 1fr !important; }
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

      {/* Hero */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px 30px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: gold, textDecoration: 'none', fontSize: 14, marginBottom: 24 }}>
            <ArrowLeft size={14} /> Tilbake til forsiden
          </Link>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 700, marginBottom: 16 }}>
            Kutt lønnskostnader.<br />
            <span style={{ color: gold }}>La AI gjøre jobben.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 17, maxWidth: 560, margin: '0 auto 32px', lineHeight: 1.6 }}>
            Hvorfor betale 400 000+ kr/år for en resepsjonist når AI gjør samme jobb for under 30 000 kr/år? Velg planen som passer din bedrift.
          </p>

          {/* Toggle */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 4 }}>
            <button onClick={() => setAnnual(false)} style={{
              padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500,
              background: !annual ? `rgba(${goldRgb},0.15)` : 'transparent',
              color: !annual ? gold : 'rgba(255,255,255,0.4)',
            }}>Månedlig</button>
            <button onClick={() => setAnnual(true)} style={{
              padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500,
              background: annual ? `rgba(${goldRgb},0.15)` : 'transparent',
              color: annual ? gold : 'rgba(255,255,255,0.4)',
            }}>
              Årlig <span style={{ fontSize: 11, color: '#4ade80', marginLeft: 4, fontWeight: 600 }}>Spar 20%</span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '30px 24px 60px' }}>
        <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {plans.map((plan, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.45 }}
              className="gold-hover"
              style={{
                background: plan.popular ? `linear-gradient(135deg, rgba(${goldRgb},0.06) 0%, rgba(${goldRgb},0.02) 100%)` : 'rgba(255,255,255,0.02)',
                border: `1px solid ${plan.popular ? `rgba(${goldRgb},0.25)` : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 20, padding: '28px 22px', transition: 'all 0.3s ease',
                position: 'relative', display: 'flex', flexDirection: 'column',
              }}>
              {plan.popular && (
                <div style={{
                  position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                  background: gold, color: bg, fontSize: 11, fontWeight: 700, padding: '4px 16px',
                  borderRadius: 20, letterSpacing: '0.5px', textTransform: 'uppercase' as const,
                }}>Mest populær</div>
              )}

              <h3 style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Playfair Display', serif", marginBottom: 8 }}>{plan.name}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 20, lineHeight: 1.5 }}>{plan.desc}</p>

              {/* Price */}
              {plan.priceMonthly ? (
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontSize: 40, fontWeight: 700, color: gold, fontFamily: "'Playfair Display', serif" }}>
                    {(annual ? plan.priceAnnual : plan.priceMonthly).toLocaleString('nb-NO')} kr
                  </span>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', marginLeft: 4 }}>/mnd</span>
                </div>
              ) : (
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontSize: 32, fontWeight: 700, color: gold, fontFamily: "'Playfair Display', serif" }}>Ta kontakt</span>
                </div>
              )}

              {/* Employee saving badge */}
              <div style={{
                background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)',
                borderRadius: 10, padding: '10px 14px', marginBottom: 20,
              }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#4ade80' }}>{plan.employeeSaving}</div>
                <div style={{ fontSize: 12, color: 'rgba(74,222,128,0.7)' }}>{plan.monthlySaving}</div>
              </div>

              {/* Features */}
              <div style={{ flex: 1, marginBottom: 24 }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
                    <CheckCircle2 size={15} color={gold} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
                {plan.notIncluded.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10, opacity: 0.4 }}>
                    <X size={15} color="rgba(255,255,255,0.3)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button onClick={() => router.push(plan.priceMonthly ? '/kartlegging' : '/om-oss')}
                className={plan.popular ? 'cta-shimmer' : ''}
                style={{
                  width: '100%', padding: '14px', borderRadius: 12, fontWeight: 600, fontSize: 15,
                  cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
                  ...(plan.popular ? {
                    color: bg, border: 'none',
                  } : {
                    background: `rgba(${goldRgb},0.08)`, border: `1px solid rgba(${goldRgb},0.2)`, color: gold,
                  }),
                }}>
                {plan.cta}
                <ArrowRight size={14} style={{ display: 'inline', marginLeft: 6, verticalAlign: 'middle' }} />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Employee Cost Comparison */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 70px' }}>
        <motion.div {...fadeUp}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, textAlign: 'center', marginBottom: 10 }}>
            Hva koster en ansatt vs. <span style={{ color: gold }}>Arxon?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: 15, marginBottom: 36, maxWidth: 560, margin: '0 auto 36px' }}>
            Se hvor mye du sparer ved å erstatte repetitivt manuelt arbeid med AI. Tallene inkluderer lønn, arbeidsgiveravgift og sosiale kostnader.
          </p>
        </motion.div>

        <motion.div {...fadeUp} style={{
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 18,
          overflow: 'hidden',
        }}>
          {/* Table header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '16px 24px',
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
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '16px 24px',
              borderBottom: i < employeeComparison.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              fontSize: 14, alignItems: 'center',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{row.role}</span>
              <span style={{ color: '#ff6b6b', fontWeight: 600 }}>{row.annualCost}</span>
              <span style={{ color: '#4ade80', fontWeight: 600 }}>{row.arxonCost}</span>
              <span style={{ color: gold, fontWeight: 700, fontSize: 15 }}>{row.saving}</span>
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
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Gjennomsnittlig besparelse per stilling</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: gold, fontFamily: "'Playfair Display', serif" }}>433 620 kr/år</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>= 36 135 kr spart per måned per erstattede stilling</div>
          </div>
          <button onClick={() => router.push('/kartlegging')} className="cta-shimmer" style={{
            color: bg, border: 'none', borderRadius: 12, padding: '14px 32px',
            fontWeight: 700, fontSize: 15, cursor: 'pointer',
          }}>
            Beregn dine besparelser →
          </button>
        </motion.div>
      </section>

      {/* Guarantee Section */}
      <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px 70px', textAlign: 'center' }}>
        <motion.div {...fadeUp} style={{
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 18, padding: '36px 32px',
        }}>
          <Shield size={32} color={gold} style={{ marginBottom: 16 }} />
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
            14 dagers gratis prøveperiode
          </h3>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: 460, margin: '0 auto 20px' }}>
            Prøv Arxon helt gratis i 14 dager. Ingen kredittkort. Ingen bindingstid. Ser du ikke resultater? Ingen betaling.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><CheckCircle2 size={14} color={gold} /> Ingen kredittkort</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><CheckCircle2 size={14} color={gold} /> Ingen bindingstid</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><CheckCircle2 size={14} color={gold} /> GDPR-sikret</span>
          </div>
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
