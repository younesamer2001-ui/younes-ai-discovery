'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowRight, Globe, Menu, X, Sparkles, Calendar, Phone, Database,
  MessageSquare, CheckCircle2, Link2, Zap, Shield, Clock, Settings,
  CreditCard, BarChart3
} from 'lucide-react'

const gold = '#c9a96e'
const goldRgb = '201,169,110'
const bg = '#0a0a0f'

function Nav({ lang, setLang }: { lang: 'no'|'en'; setLang: (l: 'no'|'en') => void }) {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const links = lang === 'no'
    ? [{ href: '/', label: 'Hjem' }, { href: '/mobilsvarer', label: 'Mobilsvarer' }, { href: '/integrasjoner', label: 'Integrasjoner' }, { href: '/om-oss', label: 'Om oss' }]
    : [{ href: '/', label: 'Home' }, { href: '/mobilsvarer', label: 'AI Answering' }, { href: '/integrasjoner', label: 'Integrations' }, { href: '/om-oss', label: 'About' }]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        ::selection{background:rgba(${goldRgb},0.3)}
        .show-mob{display:none!important}
        @media(max-width:768px){.hide-mob{display:none!important}.show-mob{display:flex!important}.grid-2{grid-template-columns:1fr!important}.grid-3{grid-template-columns:1fr!important}}
      `}</style>
      <nav style={{ position: 'relative', zIndex: 10, maxWidth: 1100, margin: '0 auto', padding: '16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div onClick={() => router.push('/')} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <img src="/arxon-icon.png" alt="Arxon" style={{ width: 34, height: 34 }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' as const, color: '#f0f0f0' }}>Arxon</span>
          </div>
          <div className="hide-mob" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {links.map(l => (
              <button key={l.href} onClick={() => router.push(l.href)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>{l.label}</button>
            ))}
            <button onClick={() => setLang(lang === 'no' ? 'en' : 'no')} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.45)', borderRadius: 8, padding: '6px 12px', fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
              <Globe size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />{lang === 'no' ? 'EN' : 'NO'}
            </button>
            <button onClick={() => router.push('/kartlegging')} style={{ background: gold, color: bg, border: 'none', borderRadius: 10, padding: '9px 22px', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
              {lang === 'no' ? 'Gratis kartlegging' : 'Free assessment'}<ArrowRight size={14} style={{ display: 'inline', marginLeft: 6, verticalAlign: 'middle' }} />
            </button>
          </div>
          <div className="show-mob" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={() => router.push('/kartlegging')} style={{ background: gold, color: bg, border: 'none', borderRadius: 8, padding: '7px 16px', fontWeight: 600, fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Start</button>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 6, cursor: 'pointer', display: 'flex' }}>
              {menuOpen ? <X size={20} color="rgba(255,255,255,0.7)" /> : <Menu size={20} color="rgba(255,255,255,0.7)" />}
            </button>
          </div>
        </div>
      </nav>
      {menuOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 95, background: 'rgba(10,10,15,0.98)', padding: '80px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 7, cursor: 'pointer', display: 'flex' }}><X size={20} color="rgba(255,255,255,0.7)" /></button>
          {links.map(l => (
            <button key={l.href} onClick={() => { setMenuOpen(false); router.push(l.href) }} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 18, fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", textAlign: 'left', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{l.label}</button>
          ))}
        </div>
      )}
    </>
  )
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: 'easeOut' },
}

export default function IntegrationsPage() {
  const [lang, setLang] = useState<'no'|'en'>('no')
  const router = useRouter()

  const categories = lang === 'no' ? [
    {
      icon: Calendar, title: 'Kalender og booking', desc: 'AI-en booker direkte i kalenderen din.',
      tools: [
        { name: 'Google Calendar', desc: 'Automatisk booking og ledig-tid-sjekk' },
        { name: 'Microsoft Outlook', desc: 'Full kalender-synkronisering' },
        { name: 'Calendly', desc: 'Koble til din Calendly-lenke' },
        { name: 'Planyo', desc: 'For bedrifter med avansert booking' },
        { name: 'Timely', desc: 'Populær blant norske salonger' },
      ],
    },
    {
      icon: Database, title: 'CRM og kundehåndtering', desc: 'Alle henvendelser logges automatisk.',
      tools: [
        { name: 'SuperOffice', desc: 'Norges mest brukte CRM — full integrasjon' },
        { name: 'HubSpot', desc: 'Kontakter og deals oppdateres automatisk' },
        { name: 'Pipedrive', desc: 'Nye leads opprettes direkte i pipeline' },
        { name: 'Lime Go', desc: 'Populær i Skandinavia for B2B-salg' },
      ],
    },
    {
      icon: CreditCard, title: 'Regnskap og fakturering', desc: 'Koble til ditt norske regnskapssystem.',
      tools: [
        { name: 'Tripletex', desc: '40 000+ norske bedrifter bruker dette' },
        { name: 'Fiken', desc: 'Perfekt for ENK og små AS' },
        { name: '24SevenOffice', desc: 'Komplett ERP fra Oslo' },
        { name: 'PowerOffice', desc: 'Skybasert regnskap for voksende bedrifter' },
      ],
    },
    {
      icon: MessageSquare, title: 'Kommunikasjon', desc: 'SMS, e-post og chat integrert.',
      tools: [
        { name: 'SMS (Twilio/Sveve)', desc: 'Automatisk SMS-bekreftelse etter booking' },
        { name: 'E-post', desc: 'Sammendrag av samtaler sendt per e-post' },
        { name: 'Slack', desc: 'Varsler om nye henvendelser i sanntid' },
        { name: 'Microsoft Teams', desc: 'Integrasjon med Teams-kanaler' },
      ],
    },
    {
      icon: Phone, title: 'Telefoni', desc: 'Fungerer med ditt eksisterende nummer.',
      tools: [
        { name: 'Telenor', desc: 'Norges største teleoperatør — full støtte' },
        { name: 'Telia', desc: 'Videresending og SIP-integrasjon' },
        { name: 'ice', desc: 'Funker med ice sine bedriftsløsninger' },
        { name: 'Puzzel / Talkdesk', desc: 'For bedrifter med kontaktsenter' },
      ],
    },
    {
      icon: BarChart3, title: 'Analyse og rapportering', desc: 'Full oversikt over alle samtaler.',
      tools: [
        { name: 'Arxon Dashboard', desc: 'Innebygd analyse — ingen ekstra verktøy nødvendig' },
        { name: 'Google Analytics', desc: 'Spor konverteringer fra AI-samtaler' },
        { name: 'Webhook / API', desc: 'Koble til dine egne systemer via API' },
      ],
    },
  ] : [
    {
      icon: Calendar, title: 'Calendar & Booking', desc: 'AI books directly in your calendar.',
      tools: [
        { name: 'Google Calendar', desc: 'Automatic booking and availability check' },
        { name: 'Microsoft Outlook', desc: 'Full calendar synchronization' },
        { name: 'Calendly', desc: 'Connect your Calendly link' },
        { name: 'Planyo', desc: 'For businesses with advanced booking' },
        { name: 'Timely', desc: 'Popular among Norwegian salons' },
      ],
    },
    {
      icon: Database, title: 'CRM & Customer Management', desc: 'All inquiries logged automatically.',
      tools: [
        { name: 'SuperOffice', desc: 'Norway\'s most popular CRM — full integration' },
        { name: 'HubSpot', desc: 'Contacts and deals updated automatically' },
        { name: 'Pipedrive', desc: 'New leads created directly in pipeline' },
        { name: 'Lime Go', desc: 'Popular in Scandinavia for B2B sales' },
      ],
    },
    {
      icon: CreditCard, title: 'Accounting & Invoicing', desc: 'Connect to your Norwegian accounting system.',
      tools: [
        { name: 'Tripletex', desc: '40,000+ Norwegian businesses use this' },
        { name: 'Fiken', desc: 'Perfect for sole proprietors and small companies' },
        { name: '24SevenOffice', desc: 'Complete ERP from Oslo' },
        { name: 'PowerOffice', desc: 'Cloud accounting for growing businesses' },
      ],
    },
    {
      icon: MessageSquare, title: 'Communication', desc: 'SMS, email and chat integrated.',
      tools: [
        { name: 'SMS (Twilio/Sveve)', desc: 'Automatic SMS confirmation after booking' },
        { name: 'Email', desc: 'Call summaries sent via email' },
        { name: 'Slack', desc: 'Real-time notifications for new inquiries' },
        { name: 'Microsoft Teams', desc: 'Integration with Teams channels' },
      ],
    },
    {
      icon: Phone, title: 'Telephony', desc: 'Works with your existing number.',
      tools: [
        { name: 'Telenor', desc: 'Norway\'s largest telecom — full support' },
        { name: 'Telia', desc: 'Call forwarding and SIP integration' },
        { name: 'ice', desc: 'Works with ice business solutions' },
        { name: 'Puzzel / Talkdesk', desc: 'For businesses with contact centers' },
      ],
    },
    {
      icon: BarChart3, title: 'Analytics & Reporting', desc: 'Full overview of all calls.',
      tools: [
        { name: 'Arxon Dashboard', desc: 'Built-in analytics — no extra tools needed' },
        { name: 'Google Analytics', desc: 'Track conversions from AI calls' },
        { name: 'Webhook / API', desc: 'Connect your own systems via API' },
      ],
    },
  ]

  const howItConnects = lang === 'no' ? [
    { icon: Settings, title: 'Du forteller oss hva du bruker', desc: 'I kartleggingen oppgir du hvilke systemer du bruker i dag.' },
    { icon: Link2, title: 'Vi kobler det sammen', desc: 'Vårt team setter opp integrasjonene for deg — du trenger ikke gjøre noe teknisk.' },
    { icon: Zap, title: 'Alt fungerer automatisk', desc: 'AI-en booker, logger og varsler gjennom dine eksisterende systemer.' },
  ] : [
    { icon: Settings, title: 'You tell us what you use', desc: 'In the assessment, you specify which systems you use today.' },
    { icon: Link2, title: 'We connect it', desc: 'Our team sets up integrations for you — no technical work needed from your side.' },
    { icon: Zap, title: 'Everything works automatically', desc: 'AI books, logs and notifies through your existing systems.' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(180deg, ${bg} 0%, #0d0d15 50%, ${bg} 100%)`, color: '#f0f0f0', fontFamily: "'DM Sans', sans-serif" }}>
      <Nav lang={lang} setLang={setLang} />

      {/* Hero */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 40px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 30, background: `rgba(${goldRgb},0.06)`, border: `1px solid rgba(${goldRgb},0.15)`, fontSize: 13, color: gold, marginBottom: 24 }}>
          <Link2 size={14} />
          {lang === 'no' ? 'Integrasjoner' : 'Integrations'}
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.4 }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px, 5vw, 50px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 16, letterSpacing: '-0.02em' }}>
          {lang === 'no' ? (<>Fungerer med <span style={{ color: gold }}>verktøyene du allerede bruker</span></>) : (<>Works with <span style={{ color: gold }}>the tools you already use</span></>)}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.35 }}
          style={{ fontSize: 'clamp(15px, 2.2vw, 17px)', color: 'rgba(255,255,255,0.5)', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
          {lang === 'no'
            ? 'Arxon kobles til ditt bookingsystem, CRM, kalender og regnskap. Ingen teknisk kunnskap nødvendig — vi setter opp alt for deg.'
            : 'Arxon connects to your booking system, CRM, calendar and accounting. No technical knowledge needed — we set up everything for you.'}
        </motion.p>
      </section>

      {/* How it connects */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '20px 24px 60px' }}>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {howItConnects.map((step, i) => (
            <motion.div key={i} {...fadeUp} style={{ textAlign: 'center', padding: '28px 20px', background: `rgba(${goldRgb},0.03)`, border: `1px solid rgba(${goldRgb},0.1)`, borderRadius: 18 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `rgba(${goldRgb},0.08)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                <step.icon size={22} color={gold} />
              </div>
              <div style={{ fontSize: 11, color: `rgba(${goldRgb},0.5)`, fontWeight: 700, marginBottom: 6 }}>STEG {i + 1}</div>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{step.title}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Integration Categories */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 70px' }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 700, textAlign: 'center', marginBottom: 36 }}>
          {lang === 'no' ? 'Alle integrasjoner' : 'All integrations'}
        </motion.h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {categories.map((cat, i) => (
            <motion.div key={i} {...fadeUp} style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 18, padding: '28px 24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: `rgba(${goldRgb},0.08)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <cat.icon size={20} color={gold} />
                </div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 2 }}>{cat.title}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{cat.desc}</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
                {cat.tools.map((tool, j) => (
                  <div key={j} style={{
                    padding: '12px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.04)',
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <CheckCircle2 size={13} color={gold} />{tool.name}
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{tool.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Missing integration? */}
      <section style={{ maxWidth: 600, margin: '0 auto', padding: '0 24px 70px', textAlign: 'center' }}>
        <motion.div {...fadeUp} style={{
          background: `rgba(${goldRgb},0.04)`, border: `1px solid rgba(${goldRgb},0.1)`, borderRadius: 18, padding: '32px 28px',
        }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>
            {lang === 'no' ? 'Bruker du noe vi ikke har listet?' : 'Using something we haven\'t listed?'}
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: 20 }}>
            {lang === 'no'
              ? 'Vi bygger stadig nye integrasjoner. Fortell oss hva du bruker i kartleggingen, så finner vi en løsning.'
              : 'We\'re constantly building new integrations. Tell us what you use in the assessment, and we\'ll find a solution.'}
          </p>
          <button onClick={() => router.push('/kartlegging')} style={{
            background: gold, color: bg, border: 'none', borderRadius: 14, padding: '14px 32px',
            fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
          }}>
            {lang === 'no' ? 'Start gratis kartlegging' : 'Start free assessment'}
            <ArrowRight size={15} style={{ display: 'inline', marginLeft: 8, verticalAlign: 'middle' }} />
          </button>
        </motion.div>
      </section>

      <footer style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>&copy; {new Date().getFullYear()} Arxon. {lang === 'no' ? 'Alle rettigheter reservert.' : 'All rights reserved.'}</span>
      </footer>
    </div>
  )
}
