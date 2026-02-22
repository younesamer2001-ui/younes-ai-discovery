'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowRight, Globe, Sparkles, Calendar, Phone, Database,
  MessageSquare, CheckCircle2, Link2, Zap, Shield, Clock, Settings,
  CreditCard, BarChart3, FileText, TrendingUp
} from 'lucide-react'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'
import { gold, goldRgb, bg, fadeUp, globalStyles } from '@/lib/constants'

export default function IntegrationsPage() {
  const [lang, setLang] = useState<'no'|'en'>('no')
  const router = useRouter()

  const categories = lang === 'no' ? [
    {
      icon: Calendar, title: 'Kalender og booking', desc: 'AI-en booker direkte i kalenderen din.',
      tools: [
        { name: 'Google Calendar', desc: 'Automatisk booking og ledig-tid-sjekk' },
        { name: 'Microsoft Outlook', desc: 'Full kalender-synkronisering' },
        { name: 'Cal.com', desc: 'Open-source booking med full API-kontroll' },
        { name: 'Calendly', desc: 'Koble til din Calendly-lenke' },
        { name: 'Planyo', desc: 'For bedrifter med avansert booking' },
        { name: 'Timely', desc: 'Populær blant norske salonger' },
        { name: 'Acuity Scheduling', desc: 'Avansert timebestilling med betalingsintegrasjon' },
        { name: 'SimplyBook.me', desc: 'Booking for helse, skjønnhet og tjenester' },
        { name: 'Setmore', desc: 'Gratis booking for små bedrifter' },
      ],
    },
    {
      icon: Database, title: 'CRM og kundehåndtering', desc: 'Alle henvendelser logges automatisk.',
      tools: [
        { name: 'SuperOffice', desc: 'Norges mest brukte CRM — full integrasjon' },
        { name: 'HubSpot', desc: 'Kontakter og deals oppdateres automatisk' },
        { name: 'Salesforce', desc: 'Verdens største CRM — enterprise-klar' },
        { name: 'Pipedrive', desc: 'Nye leads opprettes direkte i pipeline' },
        { name: 'Lime Go', desc: 'Populær i Skandinavia for B2B-salg' },
        { name: 'Zoho CRM', desc: 'Rimelig CRM med bred funksjonalitet' },
        { name: 'Monday CRM', desc: 'Visuell CRM bygget på Monday.com' },
        { name: 'Freshsales', desc: 'AI-drevet CRM med lead-scoring' },
        { name: 'Airtable', desc: 'Fleksibel database for kundedata' },
      ],
    },
    {
      icon: CreditCard, title: 'Regnskap og fakturering', desc: 'Koble til ditt norske regnskapssystem.',
      tools: [
        { name: 'Tripletex', desc: '40 000+ norske bedrifter bruker dette' },
        { name: 'Fiken', desc: 'Perfekt for ENK og små AS' },
        { name: '24SevenOffice', desc: 'Komplett ERP fra Oslo' },
        { name: 'PowerOffice', desc: 'Skybasert regnskap for voksende bedrifter' },
        { name: 'Visma eAccounting', desc: 'Norges mest utbredte regnskapssystem' },
        { name: 'Xledger', desc: 'Avansert ERP for mellomstore bedrifter' },
        { name: 'Stripe', desc: 'Online betaling og abonnement' },
        { name: 'Vipps', desc: 'Norges populæreste betalingsløsning' },
        { name: 'QuickBooks', desc: 'Internasjonal fakturering og regnskap' },
      ],
    },
    {
      icon: MessageSquare, title: 'Kommunikasjon', desc: 'SMS, e-post og chat — alt integrert.',
      tools: [
        { name: 'Twilio', desc: 'SMS og tale — global plattform' },
        { name: 'Sveve', desc: 'Norsk SMS-gateway for bedrifter' },
        { name: 'SendGrid', desc: 'E-postutsendelse i stor skala' },
        { name: 'Mailchimp', desc: 'Nyhetsbrev og e-postmarkedsføring' },
        { name: 'Slack', desc: 'Varsler om nye henvendelser i sanntid' },
        { name: 'Microsoft Teams', desc: 'Integrasjon med Teams-kanaler' },
        { name: 'WhatsApp Business', desc: 'Automatiske meldinger til kunder' },
        { name: 'Intercom', desc: 'Live chat og kundemeldinger' },
        { name: 'Zendesk', desc: 'Helpdesk og kundeservice-plattform' },
        { name: 'Freshdesk', desc: 'Kundeservice med AI-funksjoner' },
      ],
    },
    {
      icon: Phone, title: 'Telefoni og tale', desc: 'Fungerer med ditt eksisterende nummer.',
      tools: [
        { name: 'Telenor', desc: 'Norges største teleoperatør — full støtte' },
        { name: 'Telia', desc: 'Videresending og SIP-integrasjon' },
        { name: 'ice', desc: 'Funker med ice sine bedriftsløsninger' },
        { name: 'Puzzel', desc: 'Norsk kontaktsenter-plattform' },
        { name: 'Talkdesk', desc: 'Sky-basert kontaktsenter' },
        { name: 'Vapi', desc: 'AI-stemmeagent-plattform' },
        { name: 'Twilio Voice', desc: 'Programmerbar tale med SIP' },
        { name: 'Vonage', desc: 'Cloud-telefoni og UCaaS' },
      ],
    },
    {
      icon: BarChart3, title: 'Analyse og rapportering', desc: 'Full oversikt over alle samtaler og prosesser.',
      tools: [
        { name: 'Arxon Dashboard', desc: 'Innebygd analyse — ingen ekstra verktøy' },
        { name: 'Google Analytics', desc: 'Spor konverteringer fra AI-samtaler' },
        { name: 'Google Sheets', desc: 'Automatisk rapportering i regneark' },
        { name: 'Notion', desc: 'Dokumenter oppdateres automatisk' },
        { name: 'Power BI', desc: 'Avanserte dashboards og KPI-er' },
        { name: 'Webhook / API', desc: 'Koble til dine egne systemer' },
        { name: 'Looker Studio', desc: 'Google-drevne rapporter og visualisering' },
      ],
    },
    {
      icon: Zap, title: 'Automatisering og AI', desc: 'Drivkraften bak alle arbeidsflytene.',
      tools: [
        { name: 'n8n', desc: 'Open-source automasjon — 400+ noder' },
        { name: 'Make (Integromat)', desc: 'Visuell automasjonsplattform' },
        { name: 'Zapier', desc: '5 000+ app-tilkoblinger' },
        { name: 'OpenAI / GPT', desc: 'Tekstgenerering, analyse og oppsummering' },
        { name: 'Anthropic / Claude', desc: 'Avansert AI for dokumentbehandling' },
        { name: 'ElevenLabs', desc: 'Realistisk AI-stemme på norsk' },
        { name: 'Supabase', desc: 'Database og autentisering i skyen' },
        { name: 'Vercel', desc: 'Hosting og deployment av AI-løsninger' },
      ],
    },
    {
      icon: Settings, title: 'Prosjektstyring og oppgaver', desc: 'Hold orden på alt automatisk.',
      tools: [
        { name: 'Trello', desc: 'Kanban-tavler med automatiske kort' },
        { name: 'Asana', desc: 'Oppgavestyring med arbeidsflyter' },
        { name: 'Monday.com', desc: 'Visuell prosjektstyring' },
        { name: 'ClickUp', desc: 'Alt-i-ett prosjektverktøy' },
        { name: 'Jira', desc: 'For utviklingsteam og sprints' },
        { name: 'Todoist', desc: 'Enkel oppgaveliste med integrasjoner' },
        { name: 'Linear', desc: 'Moderne prosjektstyring for tech-team' },
      ],
    },
    {
      icon: Globe, title: 'Nettside og nettbutikk', desc: 'Koble AI til din digitale tilstedeværelse.',
      tools: [
        { name: 'Shopify', desc: 'Nettbutikk med ordreautomatisering' },
        { name: 'WooCommerce', desc: 'WordPress-basert nettbutikk' },
        { name: 'Squarespace', desc: 'Nettside med booking-widget' },
        { name: 'Webflow', desc: 'Avansert nettside-bygger' },
        { name: 'WordPress', desc: 'Chatbot og skjema-integrasjon' },
        { name: 'Wix', desc: 'Enkel nettside med AI-chat' },
      ],
    },
    {
      icon: FileText, title: 'Dokumenter og lagring', desc: 'AI leser, lager og organiserer filer.',
      tools: [
        { name: 'Google Drive', desc: 'Automatisk fillagring og deling' },
        { name: 'Dropbox', desc: 'Skylagring med automatisk backup' },
        { name: 'OneDrive', desc: 'Microsoft-skylagring integrert' },
        { name: 'Google Docs', desc: 'AI genererer dokumenter automatisk' },
        { name: 'PDF-verktøy', desc: 'AI leser og fyller ut PDF-skjemaer' },
        { name: 'DocuSign', desc: 'Elektronisk signering av kontrakter' },
      ],
    },
    {
      icon: TrendingUp, title: 'Markedsføring og sosiale medier', desc: 'Automatiser innhold og kampanjer.',
      tools: [
        { name: 'Facebook / Meta', desc: 'Automatisk annonsering og leadskjemaer' },
        { name: 'Instagram', desc: 'Automatisert innholdspublisering' },
        { name: 'LinkedIn', desc: 'AI-genererte poster og lead-scraping' },
        { name: 'Google Ads', desc: 'Automatisk kampanjeoptimalisering' },
        { name: 'Canva', desc: 'AI-generert visuelt innhold' },
        { name: 'Buffer', desc: 'Planlegg og publiser til alle kanaler' },
        { name: 'Hootsuite', desc: 'Sosiale medier-styring i stor skala' },
      ],
    },
  ] : [
    {
      icon: Calendar, title: 'Calendar & Booking', desc: 'AI books directly in your calendar.',
      tools: [
        { name: 'Google Calendar', desc: 'Automatic booking and availability check' },
        { name: 'Microsoft Outlook', desc: 'Full calendar synchronization' },
        { name: 'Cal.com', desc: 'Open-source booking with full API control' },
        { name: 'Calendly', desc: 'Connect your Calendly link' },
        { name: 'Planyo', desc: 'For businesses with advanced booking' },
        { name: 'Timely', desc: 'Popular among Norwegian salons' },
        { name: 'Acuity Scheduling', desc: 'Advanced scheduling with payment integration' },
        { name: 'SimplyBook.me', desc: 'Booking for health, beauty and services' },
        { name: 'Setmore', desc: 'Free scheduling for small businesses' },
      ],
    },
    {
      icon: Database, title: 'CRM & Customer Management', desc: 'All inquiries logged automatically.',
      tools: [
        { name: 'SuperOffice', desc: 'Norway\'s most popular CRM — full integration' },
        { name: 'HubSpot', desc: 'Contacts and deals updated automatically' },
        { name: 'Salesforce', desc: 'World\'s largest CRM — enterprise ready' },
        { name: 'Pipedrive', desc: 'New leads created directly in pipeline' },
        { name: 'Lime Go', desc: 'Popular in Scandinavia for B2B sales' },
        { name: 'Zoho CRM', desc: 'Affordable CRM with broad functionality' },
        { name: 'Monday CRM', desc: 'Visual CRM built on Monday.com' },
        { name: 'Freshsales', desc: 'AI-powered CRM with lead scoring' },
        { name: 'Airtable', desc: 'Flexible database for customer data' },
      ],
    },
    {
      icon: CreditCard, title: 'Accounting & Invoicing', desc: 'Connect to your Norwegian accounting system.',
      tools: [
        { name: 'Tripletex', desc: '40,000+ Norwegian businesses use this' },
        { name: 'Fiken', desc: 'Perfect for sole proprietors and small companies' },
        { name: '24SevenOffice', desc: 'Complete ERP from Oslo' },
        { name: 'PowerOffice', desc: 'Cloud accounting for growing businesses' },
        { name: 'Visma eAccounting', desc: 'Norway\'s most widespread accounting system' },
        { name: 'Xledger', desc: 'Advanced ERP for mid-size companies' },
        { name: 'Stripe', desc: 'Online payments and subscriptions' },
        { name: 'Vipps', desc: 'Norway\'s most popular payment solution' },
        { name: 'QuickBooks', desc: 'International invoicing and accounting' },
      ],
    },
    {
      icon: MessageSquare, title: 'Communication', desc: 'SMS, email and chat — all integrated.',
      tools: [
        { name: 'Twilio', desc: 'SMS and voice — global platform' },
        { name: 'Sveve', desc: 'Norwegian SMS gateway for businesses' },
        { name: 'SendGrid', desc: 'Email delivery at scale' },
        { name: 'Mailchimp', desc: 'Newsletters and email marketing' },
        { name: 'Slack', desc: 'Real-time notifications for new inquiries' },
        { name: 'Microsoft Teams', desc: 'Integration with Teams channels' },
        { name: 'WhatsApp Business', desc: 'Automated customer messages' },
        { name: 'Intercom', desc: 'Live chat and customer messaging' },
        { name: 'Zendesk', desc: 'Helpdesk and customer service platform' },
        { name: 'Freshdesk', desc: 'Customer service with AI features' },
      ],
    },
    {
      icon: Phone, title: 'Telephony & Voice', desc: 'Works with your existing number.',
      tools: [
        { name: 'Telenor', desc: 'Norway\'s largest telecom — full support' },
        { name: 'Telia', desc: 'Call forwarding and SIP integration' },
        { name: 'ice', desc: 'Works with ice business solutions' },
        { name: 'Puzzel', desc: 'Norwegian contact center platform' },
        { name: 'Talkdesk', desc: 'Cloud-based contact center' },
        { name: 'Vapi', desc: 'AI voice agent platform' },
        { name: 'Twilio Voice', desc: 'Programmable voice with SIP' },
        { name: 'Vonage', desc: 'Cloud telephony and UCaaS' },
      ],
    },
    {
      icon: BarChart3, title: 'Analytics & Reporting', desc: 'Full overview of all calls and processes.',
      tools: [
        { name: 'Arxon Dashboard', desc: 'Built-in analytics — no extra tools needed' },
        { name: 'Google Analytics', desc: 'Track conversions from AI calls' },
        { name: 'Google Sheets', desc: 'Automatic reporting in spreadsheets' },
        { name: 'Notion', desc: 'Documents updated automatically' },
        { name: 'Power BI', desc: 'Advanced dashboards and KPIs' },
        { name: 'Webhook / API', desc: 'Connect your own systems' },
        { name: 'Looker Studio', desc: 'Google-powered reports and visualizations' },
      ],
    },
    {
      icon: Zap, title: 'Automation & AI', desc: 'The engine behind all workflows.',
      tools: [
        { name: 'n8n', desc: 'Open-source automation — 400+ nodes' },
        { name: 'Make (Integromat)', desc: 'Visual automation platform' },
        { name: 'Zapier', desc: '5,000+ app connections' },
        { name: 'OpenAI / GPT', desc: 'Text generation, analysis and summarization' },
        { name: 'Anthropic / Claude', desc: 'Advanced AI for document processing' },
        { name: 'ElevenLabs', desc: 'Realistic AI voice in Norwegian' },
        { name: 'Supabase', desc: 'Cloud database and authentication' },
        { name: 'Vercel', desc: 'Hosting and deployment of AI solutions' },
      ],
    },
    {
      icon: Settings, title: 'Project Management & Tasks', desc: 'Keep everything organized automatically.',
      tools: [
        { name: 'Trello', desc: 'Kanban boards with automatic cards' },
        { name: 'Asana', desc: 'Task management with workflows' },
        { name: 'Monday.com', desc: 'Visual project management' },
        { name: 'ClickUp', desc: 'All-in-one project tool' },
        { name: 'Jira', desc: 'For development teams and sprints' },
        { name: 'Todoist', desc: 'Simple task list with integrations' },
        { name: 'Linear', desc: 'Modern project management for tech teams' },
      ],
    },
    {
      icon: Globe, title: 'Website & E-commerce', desc: 'Connect AI to your digital presence.',
      tools: [
        { name: 'Shopify', desc: 'E-commerce with order automation' },
        { name: 'WooCommerce', desc: 'WordPress-based online store' },
        { name: 'Squarespace', desc: 'Website with booking widget' },
        { name: 'Webflow', desc: 'Advanced website builder' },
        { name: 'WordPress', desc: 'Chatbot and form integration' },
        { name: 'Wix', desc: 'Simple website with AI chat' },
      ],
    },
    {
      icon: FileText, title: 'Documents & Storage', desc: 'AI reads, creates and organizes files.',
      tools: [
        { name: 'Google Drive', desc: 'Automatic file storage and sharing' },
        { name: 'Dropbox', desc: 'Cloud storage with automatic backup' },
        { name: 'OneDrive', desc: 'Microsoft cloud storage integrated' },
        { name: 'Google Docs', desc: 'AI generates documents automatically' },
        { name: 'PDF Tools', desc: 'AI reads and fills PDF forms' },
        { name: 'DocuSign', desc: 'Electronic contract signing' },
      ],
    },
    {
      icon: TrendingUp, title: 'Marketing & Social Media', desc: 'Automate content and campaigns.',
      tools: [
        { name: 'Facebook / Meta', desc: 'Automated advertising and lead forms' },
        { name: 'Instagram', desc: 'Automated content publishing' },
        { name: 'LinkedIn', desc: 'AI-generated posts and lead scraping' },
        { name: 'Google Ads', desc: 'Automatic campaign optimization' },
        { name: 'Canva', desc: 'AI-generated visual content' },
        { name: 'Buffer', desc: 'Schedule and publish to all channels' },
        { name: 'Hootsuite', desc: 'Social media management at scale' },
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
      <style>{globalStyles()}</style>
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

      <Footer lang={lang} minimal />
    </div>
  )
}
