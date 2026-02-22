'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight, ArrowLeft, Check, X, Phone, Bot, Zap, Shield, Clock,
  Users, TrendingUp, Star, CheckCircle2, AlertCircle, Building2,
  Sparkles, BarChart3, MessageSquare
} from 'lucide-react'
import { gold, goldRgb, bg, fadeUp, globalStyles } from '@/lib/constants'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

export default function PricingPage() {
  const router = useRouter()
  const [lang, setLang] = useState<'no' | 'en'>('no')

  const tiers = lang === 'no' ? [
    {
      name: 'Starter',
      desc: 'Kom i gang med 1\u20132 automasjoner og fang opp tapte henvendelser.',
      automations: '1\u20132',
      timeSaved: '10\u201320 t/uke',
      icon: Phone,
      examples: ['AI-telefonsvarer 24/7', 'Automatisk booking og kalender', 'SMS-bekreftelser'],
      idealFor: 'Enkeltpersonforetak, fris\u00f8rer, h\u00e5ndverkere',
      popular: false,
      color: '#6ee7b7',
    },
    {
      name: 'Profesjonell',
      desc: 'Automatiser kundemottak, oppf\u00f8lging og salg med 3\u20135 automasjoner.',
      automations: '3\u20135',
      timeSaved: '20\u201335 t/uke',
      icon: Zap,
      examples: ['Alt i Starter +', 'CRM-integrasjon & lead-scoring', 'E-post og SMS-oppf\u00f8lging', 'Fakturering & purring', 'Kundetilfredshet & anmeldelser'],
      idealFor: 'Voksende bedrifter, klinikker, advokatkontor',
      popular: true,
      color: gold,
    },
    {
      name: 'Vekst',
      desc: 'Full automatisering med 6+ automasjoner og avansert analyse.',
      automations: '6+',
      timeSaved: '35\u201350+ t/uke',
      icon: TrendingUp,
      examples: ['Alt i Profesjonell +', 'Intern rapportering & dashboards', 'Social media auto-publisering', 'Dokumentgenerering med AI', 'Automatisert onboarding', 'Dedikert kontaktperson'],
      idealFor: 'Bedrifter med flere lokasjoner, kjeder',
      popular: false,
      color: '#a78bfa',
    },
  ] : [
    {
      name: 'Starter',
      desc: 'Get started with 1\u20132 automations and capture missed inquiries.',
      automations: '1\u20132',
      timeSaved: '10\u201320 h/week',
      icon: Phone,
      examples: ['AI phone answering 24/7', 'Automatic booking & calendar', 'SMS confirmations'],
      idealFor: 'Sole proprietors, salons, contractors',
      popular: false,
      color: '#6ee7b7',
    },
    {
      name: 'Professional',
      desc: 'Automate customer intake, follow-ups and sales with 3\u20135 automations.',
      automations: '3\u20135',
      timeSaved: '20\u201335 h/week',
      icon: Zap,
      examples: ['Everything in Starter +', 'CRM integration & lead scoring', 'Email and SMS follow-up', 'Invoicing & reminders', 'Customer satisfaction & reviews'],
      idealFor: 'Growing businesses, clinics, law firms',
      popular: true,
      color: gold,
    },
    {
      name: 'Growth',
      desc: 'Full automation with 6+ automations and advanced analytics.',
      automations: '6+',
      timeSaved: '35\u201350+ h/week',
      icon: TrendingUp,
      examples: ['Everything in Professional +', 'Internal reporting & dashboards', 'Social media auto-publishing', 'AI document generation', 'Automated onboarding', 'Dedicated contact person'],
      idealFor: 'Multi-location businesses, chains',
      popular: false,
      color: '#a78bfa',
    },
  ]

  const employeeComparison = lang === 'no' ? [
    { role: 'Resepsjonist / telefonsvarer', annualCost: '420 000', arxonRange: '50 000 \u2013 90 000', savingRange: '330 000 \u2013 370 000' },
    { role: 'Kundeservice-medarbeider', annualCost: '480 000', arxonRange: '75 000 \u2013 120 000', savingRange: '360 000 \u2013 405 000' },
    { role: 'Booking-koordinator', annualCost: '440 000', arxonRange: '50 000 \u2013 90 000', savingRange: '350 000 \u2013 390 000' },
    { role: 'Lead-kvalifiserer (salg)', annualCost: '520 000', arxonRange: '90 000 \u2013 150 000', savingRange: '370 000 \u2013 430 000' },
  ] : [
    { role: 'Receptionist / answering service', annualCost: '420 000', arxonRange: '50 000 \u2013 90 000', savingRange: '330 000 \u2013 370 000' },
    { role: 'Customer service rep', annualCost: '480 000', arxonRange: '75 000 \u2013 120 000', savingRange: '360 000 \u2013 405 000' },
    { role: 'Booking coordinator', annualCost: '440 000', arxonRange: '50 000 \u2013 90 000', savingRange: '350 000 \u2013 390 000' },
    { role: 'Lead qualifier (sales)', annualCost: '520 000', arxonRange: '90 000 \u2013 150 000', savingRange: '370 000 \u2013 430 000' },
  ]

  const whySetup = lang === 'no' ? [
    { icon: Bot, title: 'Skreddersydd AI-oppl\u00e6ring', desc: 'Vi trener AI-en p\u00e5 din bedrift, dine tjenester, priser og vanlige sp\u00f8rsm\u00e5l \u2014 s\u00e5 den svarer som en av dine egne.' },
    { icon: Zap, title: 'Integrasjon med dine systemer', desc: 'Vi kobler AI til kalender, CRM, regnskap og de verkt\u00f8yene du allerede bruker \u2014 alt satt opp for deg.' },
    { icon: Shield, title: 'Testing og kvalitetssikring', desc: 'Vi tester alt grundig f\u00f8r lansering og justerer til du er 100% forn\u00f8yd med hvordan AI-en representerer bedriften din.' },
    { icon: BarChart3, title: 'Lavere l\u00f8pende kostnader', desc: 'H\u00f8yere setup-fee = lavere m\u00e5nedskostnad. Du investerer i en skikkelig l\u00f8sning, og sparer mer over tid.' },
  ] : [
    { icon: Bot, title: 'Custom AI training', desc: 'We train the AI on your business, services, pricing and common questions \u2014 so it answers like one of your own team.' },
    { icon: Zap, title: 'System integration', desc: 'We connect the AI to your calendar, CRM, accounting and the tools you already use \u2014 all set up for you.' },
    { icon: Shield, title: 'Testing & quality assurance', desc: 'We test everything thoroughly before launch and adjust until you are 100% satisfied with how the AI represents your business.' },
    { icon: BarChart3, title: 'Lower ongoing costs', desc: 'Higher setup fee = lower monthly cost. You invest in a proper solution and save more over time.' },
  ]

  const tx = lang === 'no' ? {
    heroTitle1: 'Bygg pakken din.',
    heroTitle2: 'Book en samtale.',
    heroSub: 'Velg automasjonene som passer din bedrift \u2014 vi tilpasser prisen basert p\u00e5 ditt valg. Ingen faste pakker, bare det du faktisk trenger.',
    savingBadge: 'Bedrifter sparer typisk',
    savingAmount: '300 000 \u2013 430 000 kr/\u00e5r',
    savingWith: 'med Arxon',
    howTitle: 'Slik fungerer det',
    step1Title: '1. Kartlegging',
    step1Desc: 'Vi analyserer bedriften din og anbefaler automasjoner for din bransje.',
    step2Title: '2. Bygg pakken',
    step2Desc: 'Du velger hvilke automasjoner du vil ha \u2014 vi viser tidsbesparelse og kompleksitet.',
    step3Title: '3. Book en samtale',
    step3Desc: 'Vi gjennomg\u00e5r analysen din og gir deg et skreddersydd tilbud basert p\u00e5 det du valgte.',
    tiersHeading1: 'Tre niv\u00e5er \u2014',
    tiersHeading2: 'du velger innholdet',
    tiersSub: 'Prisen bestemmes av hvor mange automasjoner du velger. Jo mer du automatiserer, desto mer sparer du.',
    tierPopular: 'Mest valgt',
    tierAutomations: 'Automasjoner',
    tierTimeSaved: 'Tidsbesparelse',
    tierIdealFor: 'Passer for:',
    tierExamples: 'Eksempel p\u00e5 innhold',
    tierCta: 'Bygg din pakke',
    tierNote: 'Prisen tilpasses basert p\u00e5 dine valg og diskuteres p\u00e5 samtalen. Ingen bindingstid. Alle priser eks. mva.',
    setupTitle: 'Hvorfor engangs setup-fee?',
    setupSub: 'Du investerer i en skreddersydd AI-l\u00f8sning \u2014 ikke et ferdigprodukt fra hylla. Setup-fee dekker alt det arbeidet som gj\u00f8r at AI-en faktisk leverer resultater.',
    compTitle1: 'Hva koster en ansatt vs.',
    compTitle2: 'Arxon?',
    compSub: 'Se hvor mye du sparer ved \u00e5 automatisere repetitivt arbeid med AI. Tallene inkluderer l\u00f8nn, arbeidsgiveravgift og sosiale kostnader.',
    compRole: 'Rolle',
    compEmployee: 'Ansatt (\u00e5rlig)',
    compArxon: 'Arxon (\u00e5rlig)',
    compSave: 'Du sparer',
    compSummaryLabel: 'Typisk besparelse per erstattede stilling',
    compSummaryRange: '300 000 \u2013 430 000 kr/\u00e5r',
    compSummaryNote: 'Inkludert setup-fee og m\u00e5nedlige kostnader',
    compCta: 'Beregn dine besparelser',
    stepsTitle1: 'Fra kartlegging til',
    stepsTitle2: 'resultater',
    step1: { step: '1', title: 'Gratis kartlegging', desc: 'Svar p\u00e5 noen sp\u00f8rsm\u00e5l om bedriften din. Vi identifiserer de beste automatiseringsmulighetene for din bransje.' },
    step2: { step: '2', title: 'Bygg din pakke', desc: 'Velg hvilke automasjoner du vil ha fra anbefalingene. Se tidsbesparelse og kompleksitet for hver l\u00f8sning.' },
    step3: { step: '3', title: 'Book en samtale', desc: 'Vi gjennomg\u00e5r analysen din og gir deg et skreddersydd tilbud. Du forplikter deg til ingenting.' },
    step4: { step: '4', title: 'Vi bygger og lanserer', desc: 'V\u00e5rt team setter opp alt. Du trenger ikke gj\u00f8re noe teknisk. Du ser besparelsene fra dag \u00e9n.' },
    guaranteeTitle: 'Forn\u00f8yd-garanti',
    guaranteeDesc: 'Vi justerer og optimaliserer til du er 100% forn\u00f8yd med l\u00f8sningen. Ingen bindingstid p\u00e5 m\u00e5nedlig drift \u2014 du kan avslutte n\u00e5r som helst.',
    guaranteeItems: ['Ingen bindingstid', 'GDPR-sikret', 'Norsk datasenter'],
    finalTitle: 'Klar for \u00e5 bygge din pakke?',
    finalSub: 'Start med en gratis kartlegging, velg dine automasjoner, og f\u00e5 et skreddersydd tilbud \u2014 helt uforpliktende.',
    finalCta: 'Start kartlegging og bygg pakke',
  } : {
    heroTitle1: 'Build your package.',
    heroTitle2: 'Book a call.',
    heroSub: 'Choose the automations that fit your business \u2014 we tailor the price based on your choices. No fixed packages, just what you actually need.',
    savingBadge: 'Businesses typically save',
    savingAmount: '300 000 \u2013 430 000 NOK/year',
    savingWith: 'with Arxon',
    howTitle: 'How it works',
    step1Title: '1. Assessment',
    step1Desc: 'We analyze your business and recommend automations for your industry.',
    step2Title: '2. Build your package',
    step2Desc: 'You choose which automations you want \u2014 we show time savings and complexity.',
    step3Title: '3. Book a call',
    step3Desc: 'We review your analysis and give you a tailored offer based on your choices.',
    tiersHeading1: 'Three tiers \u2014',
    tiersHeading2: 'you choose the content',
    tiersSub: 'The price depends on how many automations you choose. The more you automate, the more you save.',
    tierPopular: 'Most popular',
    tierAutomations: 'Automations',
    tierTimeSaved: 'Time saved',
    tierIdealFor: 'Ideal for:',
    tierExamples: 'Example features',
    tierCta: 'Build your package',
    tierNote: 'Pricing is tailored based on your choices and discussed on the call. No lock-in. All prices excl. VAT.',
    setupTitle: 'Why a one-time setup fee?',
    setupSub: 'You are investing in a custom AI solution \u2014 not an off-the-shelf product. The setup fee covers all the work that makes the AI actually deliver results.',
    compTitle1: 'What does an employee cost vs.',
    compTitle2: 'Arxon?',
    compSub: 'See how much you save by automating repetitive work with AI. Numbers include salary, employer contributions and social costs.',
    compRole: 'Role',
    compEmployee: 'Employee (annual)',
    compArxon: 'Arxon (annual)',
    compSave: 'You save',
    compSummaryLabel: 'Typical savings per replaced position',
    compSummaryRange: '300 000 \u2013 430 000 NOK/year',
    compSummaryNote: 'Including setup fee and monthly costs',
    compCta: 'Calculate your savings',
    stepsTitle1: 'From assessment to',
    stepsTitle2: 'results',
    step1: { step: '1', title: 'Free assessment', desc: 'Answer a few questions about your business. We identify the best automation opportunities for your industry.' },
    step2: { step: '2', title: 'Build your package', desc: 'Choose which automations you want from the recommendations. See time savings and complexity for each solution.' },
    step3: { step: '3', title: 'Book a call', desc: 'We review your analysis and give you a tailored offer. No commitment required.' },
    step4: { step: '4', title: 'We build and launch', desc: 'Our team sets everything up. You don\u2019t need to do anything technical. You see the savings from day one.' },
    guaranteeTitle: 'Satisfaction guarantee',
    guaranteeDesc: 'We adjust and optimize until you are 100% satisfied with the solution. No lock-in on monthly operation \u2014 you can cancel at any time.',
    guaranteeItems: ['No lock-in', 'GDPR compliant', 'Norwegian data center'],
    finalTitle: 'Ready to build your package?',
    finalSub: 'Start with a free assessment, choose your automations, and get a tailored offer \u2014 completely non-binding.',
    finalCta: 'Start assessment and build package',
  }

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(180deg, ${bg} 0%, #0d0d15 50%, ${bg} 100%)`, color: '#f0f0f0', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{globalStyles(`
        .comparison-grid { display: grid; grid-template-columns: 1.8fr 1fr 1fr 1fr; }
        @media (max-width: 768px) {
          .comparison-grid { grid-template-columns: 1.5fr 1fr 1fr 1fr !important; font-size: 12px !important; }
          .comparison-grid span { font-size: inherit !important; }
        }
      `)}</style>
      <Nav lang={lang} setLang={setLang} sticky />

      {/* Hero */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px 30px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: gold, textDecoration: 'none', fontSize: 14, marginBottom: 24 }}>
            <ArrowLeft size={14} /> {lang === 'no' ? 'Tilbake til forsiden' : 'Back to home'}
          </Link>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 700, marginBottom: 16 }}>
            {tx.heroTitle1}<br />
            <span style={{ color: gold }}>{tx.heroTitle2}</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 17, maxWidth: 600, margin: '0 auto 20px', lineHeight: 1.6 }}>
            {tx.heroSub}
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: 10, padding: '10px 20px', fontSize: 14, color: '#4ade80' }}>
            <CheckCircle2 size={16} />
            <span>{tx.savingBadge} <strong>{tx.savingAmount}</strong> {tx.savingWith}</span>
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
            {tx.howTitle}
          </h3>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <MessageSquare size={18} color={gold} style={{ flexShrink: 0, marginTop: 2 }} />
              <div><strong style={{ color: '#f0f0f0' }}>{tx.step1Title}</strong><br />{tx.step1Desc}</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Sparkles size={18} color={gold} style={{ flexShrink: 0, marginTop: 2 }} />
              <div><strong style={{ color: '#f0f0f0' }}>{tx.step2Title}</strong><br />{tx.step2Desc}</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Clock size={18} color={gold} style={{ flexShrink: 0, marginTop: 2 }} />
              <div><strong style={{ color: '#f0f0f0' }}>{tx.step3Title}</strong><br />{tx.step3Desc}</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Tier Examples */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 60px' }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3.5vw, 28px)', fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>
          {tx.tiersHeading1} <span style={{ color: gold }}>{tx.tiersHeading2}</span>
        </motion.h2>
        <motion.p {...fadeUp} style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: 14, marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>
          {tx.tiersSub}
        </motion.p>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
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
                }}>{tx.tierPopular}</div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `rgba(${goldRgb},0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} color={tier.color} />
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Playfair Display', serif", color: tier.color }}>{tier.name}</h3>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 20, lineHeight: 1.5 }}>{tier.desc}</p>

              {/* Key stats */}
              <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>{tx.tierAutomations}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: tier.color }}>{tier.automations}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>{tx.tierTimeSaved}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: tier.color }}>{tier.timeSaved}</div>
                </div>
              </div>

              {/* Ideal for */}
              <div style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 10, padding: '8px 12px', marginBottom: 20, fontSize: 12, color: 'rgba(255,255,255,0.45)',
              }}>
                {tx.tierIdealFor} <span style={{ color: 'rgba(255,255,255,0.7)' }}>{tier.idealFor}</span>
              </div>

              {/* Example automations */}
              <div style={{ flex: 1, marginBottom: 24 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 10, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' as const }}>{tx.tierExamples}</div>
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
                {tx.tierCta}
                <ArrowRight size={14} style={{ display: 'inline', marginLeft: 6, verticalAlign: 'middle' }} />
              </button>
            </motion.div>
          )})}
        </div>

        {/* Note under cards */}
        <motion.p {...fadeUp} style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 20, maxWidth: 600, margin: '20px auto 0' }}>
          {tx.tierNote}
        </motion.p>
      </section>

      {/* Why Setup Fee Section */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 60px' }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>
          {tx.setupTitle}
        </motion.h2>
        <motion.p {...fadeUp} style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: 14, marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>
          {tx.setupSub}
        </motion.p>
        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
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
            {tx.compTitle1} <span style={{ color: gold }}>{tx.compTitle2}</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: 15, marginBottom: 36, maxWidth: 560, margin: '0 auto 36px' }}>
            {tx.compSub}
          </p>
        </motion.div>

        <motion.div {...fadeUp} style={{
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 18,
          overflow: 'hidden',
        }}>
          {/* Table header */}
          <div className="comparison-grid" style={{
            padding: '16px 24px',
            background: `rgba(${goldRgb},0.06)`, borderBottom: `1px solid rgba(${goldRgb},0.1)`,
            fontSize: 12, fontWeight: 600, color: gold, textTransform: 'uppercase' as const, letterSpacing: '0.5px',
          }}>
            <span>{tx.compRole}</span>
            <span>{tx.compEmployee}</span>
            <span>{tx.compArxon}</span>
            <span>{tx.compSave}</span>
          </div>

          {/* Table rows */}
          {employeeComparison.map((row, i) => (
            <div key={i} className="comparison-grid" style={{
              padding: '16px 24px',
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
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>{tx.compSummaryLabel}</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: gold, fontFamily: "'Playfair Display', serif" }}>{tx.compSummaryRange}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{tx.compSummaryNote}</div>
          </div>
          <button onClick={() => router.push('/kartlegging')} className="cta-shimmer" style={{
            color: bg, border: 'none', borderRadius: 12, padding: '14px 32px',
            fontWeight: 700, fontSize: 15, cursor: 'pointer',
          }}>
            {tx.compCta}
            <ArrowRight size={14} style={{ display: 'inline', marginLeft: 8, verticalAlign: 'middle' }} />
          </button>
        </motion.div>
      </section>

      {/* How it works */}
      <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px 70px' }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3.5vw, 28px)', fontWeight: 700, textAlign: 'center', marginBottom: 36 }}>
          {tx.stepsTitle1} <span style={{ color: gold }}>{tx.stepsTitle2}</span>
        </motion.h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[tx.step1, tx.step2, tx.step3, tx.step4].map((s, i) => (
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
            {tx.guaranteeTitle}
          </h3>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: 460, margin: '0 auto 20px' }}>
            {tx.guaranteeDesc}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            {tx.guaranteeItems.map((item, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}><CheckCircle2 size={14} color={gold} /> {item}</span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px 70px', textAlign: 'center' }}>
        <motion.div {...fadeUp}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 700, marginBottom: 14 }}>
            {tx.finalTitle}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15, marginBottom: 24, maxWidth: 480, margin: '0 auto 24px' }}>
            {tx.finalSub}
          </p>
          <button onClick={() => router.push('/kartlegging')} className="cta-shimmer" style={{
            color: bg, border: 'none', borderRadius: 14, padding: '16px 40px',
            fontWeight: 700, fontSize: 17, cursor: 'pointer',
          }}>
            {tx.finalCta}
            <ArrowRight size={16} style={{ display: 'inline', marginLeft: 8, verticalAlign: 'middle' }} />
          </button>
        </motion.div>
      </section>

      <Footer lang={lang} />
    </div>
  )
}
