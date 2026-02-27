'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight, Phone, CalendarCheck, Users, Target, Megaphone,
  Cog, BarChart3, FileText, ShieldCheck,
} from 'lucide-react'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

const gold = '#efc07b'
const goldRgb = '239,192,123'
const bgDark = '#0f1b27'
const cardBg = '#16213e'

const categories = [
  {
    icon: Phone,
    title: 'Booking & Avtaler',
    count: 24,
    desc: 'AI-telefonsvarer, automatisk booking, ventelister og påminnelser. Aldri miss et anrop igjen.',
    examples: ['AI-telefonsvarer 24/7', 'Automatisk booking', 'SMS-påminnelser', 'Venteliste-håndtering'],
  },
  {
    icon: Target,
    title: 'Leads & Salg',
    count: 23,
    desc: 'Fang opp og kvalifiser leads automatisk. Fra første kontakt til signert avtale.',
    examples: ['Lead-scraping', 'CRM-integrasjon', 'AI-oppfølging av tapte anrop', 'Automatiske sekvenser'],
  },
  {
    icon: Users,
    title: 'Kundeoppfølging',
    count: 56,
    desc: 'Hold kundene fornøyde med automatisk oppfølging, purring og anmeldelsesforespørsler.',
    examples: ['Google-anmeldelse forespørsel', 'Auto-purring', 'Prosjektstatus-oppdateringer', 'Onboarding-sekvenser'],
  },
  {
    icon: Megaphone,
    title: 'Markedsføring',
    count: 25,
    desc: 'Automatiser innholdsproduksjon, sosiale medier og e-postkampanjer.',
    examples: ['Instagram auto-posting', 'AI-innholdsproduksjon', 'Nyhetsbrev-automatisering', 'SEO-overvåkning'],
  },
  {
    icon: Cog,
    title: 'Admin & Drift',
    count: 67,
    desc: 'Fjern manuelt arbeid med automatisert dokumenthåndtering, oppgavestyring og intern varsling.',
    examples: ['Dokumentarkiv-workflow', 'Tilbuds-generator', 'Intern varsling', 'Prosjektstyring'],
  },
  {
    icon: BarChart3,
    title: 'Rapportering',
    count: 19,
    desc: 'Få ukentlige rapporter og dashboards levert automatisk. Alltid oppdatert, null arbeid.',
    examples: ['Ukentlig salgsrapport', 'Inntektsrapport', 'KPI-dashboard', 'Markedsrapport'],
  },
  {
    icon: FileText,
    title: 'Økonomi & Faktura',
    count: 6,
    desc: 'Automatisk fakturering ved milepæler, levering eller fullført jobb. Integrert med Fiken/Tripletex.',
    examples: ['Faktura ved milepæl', 'Auto-fakturering', 'Betalingsoppfølging', 'Regnskapsintegrasjon'],
  },
  {
    icon: ShieldCheck,
    title: 'Compliance & GDPR',
    count: 6,
    desc: 'Hold deg i tråd med regelverk. Automatisert samtykke-logging, audit trail og konfliktsøk.',
    examples: ['GDPR samtykke-logg', 'Audit trail', 'Konfliktsøk', 'Personvernoversikt'],
  },
]

export default function TjenesterPage() {
  const [lang] = useState<'no' | 'en'>('no')

  return (
    <div style={{ background: bgDark, minHeight: '100vh', color: '#f4f1eb' }}>
      <Nav sticky />

      {/* Hero */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '80px 24px 48px', textAlign: 'center' }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, marginBottom: 16, lineHeight: 1.2 }}
        >
          Hva vi <span style={{ color: gold }}>automatiserer</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}
        >
          226 ferdige automatiseringer fordelt på 8 kategorier.
          Alt skreddersys til din bransje og dine systemer.
        </motion.p>
      </section>

      {/* Categories */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 60px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 20,
        }}>
          {categories.map((cat, i) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.06, 0.5) }}
                style={{
                  background: cardBg,
                  borderRadius: 16,
                  padding: '28px 24px',
                  border: `1px solid rgba(${goldRgb},0.08)`,
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
                className="tjeneste-card"
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: `rgba(${goldRgb},0.1)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={24} color={gold} />
                  </div>
                  <span style={{
                    fontSize: 12, color: gold, fontWeight: 600,
                    background: `rgba(${goldRgb},0.08)`, borderRadius: 20,
                    padding: '4px 12px',
                  }}>
                    {cat.count} løsninger
                  </span>
                </div>

                <div>
                  <h3 style={{ fontSize: 19, fontWeight: 600, margin: '0 0 8px', color: '#f4f1eb' }}>
                    {cat.title}
                  </h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: 1.6 }}>
                    {cat.desc}
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
                  {cat.examples.map(ex => (
                    <span key={ex} style={{
                      fontSize: 11, color: 'rgba(255,255,255,0.35)',
                      background: 'rgba(255,255,255,0.04)',
                      borderRadius: 6, padding: '4px 10px',
                    }}>
                      {ex}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* How it works mini */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 60px' }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, textAlign: 'center', marginBottom: 32 }}>
          Slik kommer du i gang
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            { step: '1', title: 'Gratis kartlegging', desc: 'Vi analyserer bedriften din og finner de mest verdifulle automatiseringene.' },
            { step: '2', title: 'Vi bygger løsningen', desc: 'Alt settes opp og tilpasses dine systemer. Du trenger ikke gjøre noe teknisk.' },
            { step: '3', title: 'Du sparer tid og penger', desc: 'Automatiseringene kjører 24/7. Du fokuserer på det som virkelig teller.' },
          ].map((s, i) => (
            <div key={i} style={{
              display: 'flex', gap: 20, alignItems: 'flex-start',
              padding: '20px 0',
              borderLeft: `2px solid rgba(${goldRgb},0.2)`,
              marginLeft: 20,
              paddingLeft: 28,
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', left: -14, top: 18,
                width: 28, height: 28, borderRadius: '50%',
                background: bgDark, border: `2px solid ${gold}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: gold,
              }}>
                {s.step}
              </div>
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 4px' }}>{s.title}</h4>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px 80px', textAlign: 'center' }}>
        <div style={{
          background: `linear-gradient(135deg, ${cardBg}, rgba(${goldRgb},0.06))`,
          borderRadius: 20, padding: '48px 32px',
          border: `1px solid rgba(${goldRgb},0.12)`,
        }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>
            Usikker på hva du trenger?
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 24, lineHeight: 1.6 }}>
            Start med en gratis kartlegging. Vi finner de automatiseringene som gir størst effekt for akkurat din bedrift.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/kartlegging" className="cta-shimmer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', borderRadius: 12, fontWeight: 600,
              fontSize: 15, textDecoration: 'none', color: bgDark,
            }}>
              Start kartlegging <ArrowRight size={16} />
            </Link>
            <Link href="/bransjer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', borderRadius: 12, fontWeight: 600,
              fontSize: 15, textDecoration: 'none', color: gold,
              border: `1px solid rgba(${goldRgb},0.3)`,
              background: 'transparent',
            }}>
              Se alle bransjer <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer lang={lang} />

      <style jsx global>{`
        .tjeneste-card:hover {
          border-color: rgba(${goldRgb}, 0.25) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  )
}
