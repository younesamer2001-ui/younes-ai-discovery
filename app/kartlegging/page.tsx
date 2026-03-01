'use client'

import { useState, useEffect, useCallback, useRef, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Check, ChevronDown, Zap, Clock, AlertTriangle,
  Shield, Phone, Sparkles, Package, ShoppingCart, CalendarDays,
  Info, Globe, X,
} from 'lucide-react'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'
import {
  pricingAutomations, pricingIndustries, PricingAutomation,
  PRICING, getDiscountRate, formatKr,
} from '@/lib/pricing'
import { gold, goldRgb, bg as bgConst, fonts, BOOKING_URL } from '@/lib/constants'
import { useLanguage } from '@/lib/language-context'

/* ────────────────────────────────────────────
   DESIGN TOKENS (Midnight Opulence)
   ──────────────────────────────────────────── */
const bgDark = '#0f1b27'
const cardBg = '#16213e'
const cardBorder = 'rgba(255,255,255,0.06)'
const textPrimary = '#f4f1eb'
const textSecondary = 'rgba(255,255,255,0.6)'
const textMuted = 'rgba(255,255,255,0.35)'

const complexityColor: Record<string, string> = {
  'Lav': '#4ade80', 'Middels': '#fbbf24', 'Høy': '#f87171',
}
const complexityIcon: Record<string, any> = {
  'Lav': Zap, 'Middels': Clock, 'Høy': AlertTriangle,
}

/* ────────────────────────────────────────────
   TRANSLATIONS
   ──────────────────────────────────────────── */
const T: Record<string, Record<string, string>> = {
  phase1_title: { no: "Gratis AI-kartlegging", en: "Free AI Assessment" },
  phase1_subtitle: { no: "Fyll inn kontaktinfo for å starte. Vi analyserer din bedrift og foreslår automatiseringer som sparer deg tid og penger.", en: "Enter your contact info to get started. We analyze your business and suggest automations that save you time and money." },
  company_name: { no: "Bedriftsnavn", en: "Company name" },
  contact_name: { no: "Kontaktperson", en: "Contact name" },
  email: { no: "E-post", en: "Email" },
  phone: { no: "Telefon", en: "Phone" },
  gdpr_note: { no: "Vi behandler dine data i henhold til GDPR. Informasjonen brukes kun til å utarbeide din AI-analyse.", en: "We process your data in accordance with GDPR. Information is used solely to prepare your AI analysis." },
  start_btn: { no: "Start kartlegging", en: "Start assessment" },
  next: { no: "Neste", en: "Next" },
  back: { no: "Tilbake", en: "Back" },
  step_of: { no: "Steg {c} av {t}", en: "Step {c} of {t}" },
  select_one: { no: "Velg ett alternativ", en: "Select one option" },
  select_multi: { no: "Velg opptil {n} alternativer", en: "Select up to {n} options" },
  select_multi_any: { no: "Velg alle som passer", en: "Select all that apply" },
  free_text_ph: { no: "Beskriv her...", en: "Describe here..." },
  optional: { no: "(Valgfritt)", en: "(Optional)" },
  results_title: { no: "Anbefalte automatiseringer for din bransje", en: "Recommended automations for your industry" },
  roi_title: { no: "Beregn din potensielle avkastning", en: "Calculate your potential return" },
  roi_missed: { no: "Anslåtte tapte henvendelser per måned", en: "Estimated missed inquiries per month" },
  roi_value: { no: "Gjennomsnittlig jobbverdi (NOK)", en: "Average job value (NOK)" },
  roi_conv: { no: "Konverteringsrate", en: "Conversion rate" },
  roi_lost_month: { no: "Tapt omsetning per måned", en: "Lost revenue per month" },
  roi_lost_year: { no: "Tapt omsetning per år", en: "Lost revenue per year" },
  compliance_title: { no: "Sikkerhet og regelverk", en: "Security and compliance" },
  generate_btn: { no: "Generer AI-analyse", en: "Generate AI analysis" },
  generating: { no: "Genererer din personlige analyse...", en: "Generating your personalized analysis..." },
  summary_title: { no: "Din AI-analyse", en: "Your AI analysis" },
  confirm_title: { no: "Takk for din henvendelse!", en: "Thank you for your inquiry!" },
  confirm_ref: { no: "Referansenummer", en: "Reference number" },
}

const t = (key: string, lang: string) => T[key]?.[lang] || T[key]?.['no'] || key

/* ────────────────────────────────────────────
   INDUSTRY MAPPING (pricing.ts → questionnaire)
   ──────────────────────────────────────────── */
const INDUSTRY_MAP: { id: string; no: string; en: string }[] = pricingIndustries.map((name, i) => ({
  id: name.toLowerCase().replace(/[^a-zæøå0-9]+/g, '-').replace(/-+$/, ''),
  no: name,
  en: name, // Norwegian names kept — English can be added later
}))

/* ────────────────────────────────────────────
   QUESTIONNAIRE STEPS
   ──────────────────────────────────────────── */
type QuestionOption = { value: string; label: string }
type Question = { id: string; type: string; q: string; options?: QuestionOption[]; hasOther?: boolean; max?: number; optional?: boolean }

const buildQuestions = (lang: string): Question[] => [
  {
    id: 'industry', type: 'single',
    q: lang === 'no' ? 'Hvilken bransje tilhører bedriften din?' : 'What industry is your business in?',
    options: INDUSTRY_MAP.map(ind => ({ value: ind.no, label: ind.no })),
    hasOther: true,
  },
  {
    id: 'size', type: 'single',
    q: lang === 'no' ? 'Hvor stort er teamet ditt?' : 'How big is your team?',
    options: [
      { value: 'solo', label: lang === 'no' ? 'Bare meg (enkeltpersonforetak)' : 'Just me (sole proprietor)' },
      { value: '2-5', label: lang === 'no' ? '2–5 ansatte' : '2–5 employees' },
      { value: '6-15', label: lang === 'no' ? '6–15 ansatte' : '6–15 employees' },
      { value: '16-50', label: lang === 'no' ? '16–50 ansatte' : '16–50 employees' },
      { value: '50+', label: lang === 'no' ? 'Over 50 ansatte' : 'Over 50 employees' },
    ],
  },
  {
    id: 'contact_methods', type: 'multi',
    q: lang === 'no' ? 'Hvordan når kundene dere i dag?' : 'How do customers reach you today?',
    options: [
      { value: 'phone', label: lang === 'no' ? 'Telefon' : 'Phone' },
      { value: 'email', label: lang === 'no' ? 'E-post' : 'Email' },
      { value: 'form', label: lang === 'no' ? 'Kontaktskjema på nett' : 'Online form' },
      { value: 'social', label: lang === 'no' ? 'Sosiale medier / DM' : 'Social media / DM' },
      { value: 'walkin', label: lang === 'no' ? 'Drop-in / fysisk besøk' : 'Walk-in' },
      { value: 'chatbot', label: lang === 'no' ? 'Chat / chatbot' : 'Chat / chatbot' },
    ],
  },
  {
    id: 'tech', type: 'multi',
    q: lang === 'no' ? 'Hvilke verktøy og systemer bruker dere?' : 'What tools and systems do you use?',
    options: [
      { value: 'fiken', label: 'Fiken' }, { value: 'tripletex', label: 'Tripletex' },
      { value: 'visma', label: 'Visma' }, { value: 'poweroffice', label: 'PowerOffice' },
      { value: 'm365', label: 'Microsoft 365' }, { value: 'google', label: 'Google Workspace' },
      { value: 'slack', label: 'Slack / Teams' }, { value: 'hubspot', label: 'HubSpot / CRM' },
      { value: 'shopify', label: 'Shopify / Nettbutikk' }, { value: 'vipps', label: 'Vipps' },
      { value: 'calendly', label: 'Calendly / Cal.com' }, { value: 'facebook', label: 'Meta Business Suite' },
      { value: 'none', label: lang === 'no' ? 'Få / ingen digitale verktøy' : 'Few / none' },
    ],
    hasOther: true,
  },
  {
    id: 'pain', type: 'multi', max: 3,
    q: lang === 'no' ? 'Hvor vil dere frigjøre mest tid? (velg opptil 3)' : 'Where would you free up the most time? (pick up to 3)',
    options: [
      { value: 'phone_email', label: lang === 'no' ? 'Svare telefon og e-post' : 'Answering phone & email' },
      { value: 'invoicing', label: lang === 'no' ? 'Fakturering og purring' : 'Invoicing & reminders' },
      { value: 'customer_tracking', label: lang === 'no' ? 'Følge opp kunder' : 'Following up with customers' },
      { value: 'booking', label: lang === 'no' ? 'Timebestilling og kalender' : 'Booking & scheduling' },
      { value: 'marketing', label: lang === 'no' ? 'Markedsføring og innhold' : 'Marketing & content' },
      { value: 'leads', label: lang === 'no' ? 'Finne og følge opp nye kunder' : 'Finding & following up leads' },
      { value: 'reporting', label: lang === 'no' ? 'Rapportering og oversikt' : 'Reporting & dashboards' },
      { value: 'onboarding', label: lang === 'no' ? 'Onboarding av kunder' : 'Customer onboarding' },
      { value: 'internal', label: lang === 'no' ? 'Interne rutiner og oppgaver' : 'Internal routines & tasks' },
    ],
  },
  {
    id: 'missed', type: 'single',
    q: lang === 'no' ? 'Hender det at henvendelser ikke blir fulgt opp i tide?' : 'Do inquiries sometimes go unanswered or get delayed?',
    options: [
      { value: 'daily', label: lang === 'no' ? 'Ja, det skjer ofte' : 'Yes, quite often' },
      { value: 'weekly', label: lang === 'no' ? 'Noen ganger i uken' : 'A few times a week' },
      { value: 'occasionally', label: lang === 'no' ? 'Av og til' : 'Occasionally' },
      { value: 'rarely', label: lang === 'no' ? 'Sjelden' : 'Rarely' },
      { value: 'unsure', label: lang === 'no' ? 'Vet ikke — har ikke oversikt' : 'Not sure — no tracking' },
    ],
  },
  { id: 'goals', type: 'text', q: lang === 'no' ? 'Hvis alt kunne gå på autopilot — hva ville du brukt tiden din på?' : 'If everything ran on autopilot — what would you spend your time on?' },
  {
    id: 'timeline', type: 'single',
    q: lang === 'no' ? 'Når er det aktuelt å starte?' : 'When would it make sense to start?',
    options: [
      { value: 'asap', label: lang === 'no' ? 'Jo før, jo bedre' : 'The sooner, the better' },
      { value: '1month', label: lang === 'no' ? 'I løpet av en måned' : 'Within a month' },
      { value: '3months', label: lang === 'no' ? 'I løpet av et kvartal' : 'Within a quarter' },
      { value: 'later', label: lang === 'no' ? 'Senere i år' : 'Later this year' },
      { value: 'exploring', label: lang === 'no' ? 'Bare nysgjerrig' : 'Just curious' },
    ],
  },
  {
    id: 'investment', type: 'single',
    q: lang === 'no' ? 'Hvor mye er det verdt å investere for å spare 15–20 timer i uken?' : 'How much would it be worth investing to save 15–20 hours per week?',
    options: [
      { value: 'low', label: lang === 'no' ? 'Ønsker å starte lite og skalere' : 'Start small and scale' },
      { value: 'medium', label: lang === 'no' ? 'Klar for en skikkelig løsning' : 'Ready for a proper solution' },
      { value: 'high', label: lang === 'no' ? 'Vil ha full pakke — alt automatisert' : 'Full package — automate everything' },
      { value: 'roi_first', label: lang === 'no' ? 'Vis meg avkastningen først' : 'Show me the ROI first' },
    ],
  },
  { id: 'additional', type: 'text', optional: true, q: lang === 'no' ? 'Noe spesifikt du vil at vi tar hensyn til?' : 'Anything specific you\'d like us to consider?' },
]

const MISSED_DEFAULTS: Record<string, number> = { daily: 60, weekly: 12, occasionally: 4, rarely: 1, unsure: 8 }
const JOB_VALUE_DEFAULT = 3000

/* ────────────────────────────────────────────
   COMPLIANCE
   ──────────────────────────────────────────── */
const COMPLIANCE = [
  { title: 'GDPR-kompatibel', desc: 'All databehandling følger personopplysningsloven og GDPR.' },
  { title: 'Norsk datasenter', desc: 'Data lagres innenfor EØS via EU-baserte API-endepunkter.' },
  { title: 'EU AI Act-klar', desc: 'Full AI-transparens i henhold til Art. 50.' },
  { title: 'Databehandleravtale', desc: 'DPA inkludert i alle kontrakter.' },
]

/* ────────────────────────────────────────────
   RECOMMENDATION ENGINE
   Maps questionnaire answers → automation relevance scores
   ──────────────────────────────────────────── */
const PAIN_KEYWORDS: Record<string, string[]> = {
  phone_email: ['telefon', 'e-post', 'svar', 'chatbot', 'henvendels', 'kundeservice', 'AI-resepsjonist', 'AI-telefonsvarer', 'inbox', 'support'],
  invoicing: ['faktur', 'purring', 'økonomi', 'betaling', 'regnskap', 'kredittnota', 'inkasso'],
  customer_tracking: ['oppfølging', 'CRM', 'kundeoppfølging', 'relasjon', 'etter salg', 'tilbakemelding', 'review', 'vurdering'],
  booking: ['booking', 'time', 'kalender', 'avtale', 'bestilling', 'reservasjon', 'påminnelse', 'no-show'],
  marketing: ['markedsføring', 'innhold', 'sosiale medier', 'nyhetsbrev', 'SEO', 'annonse', 'kampanje', 'blogg', 'LinkedIn', 'Instagram', 'Facebook', 'TikTok'],
  leads: ['lead', 'prospekt', 'ny kunde', 'salg', 'pipeline', 'konvertering', 'tilbud'],
  reporting: ['rapport', 'dashboard', 'oversikt', 'analyse', 'statistikk', 'KPI'],
  onboarding: ['onboarding', 'velkomst', 'ny kunde', 'oppstart'],
  internal: ['intern', 'rutine', 'oppgave', 'workflow', 'automatiser', 'prosjekt', 'varsling', 'team'],
}

const CONTACT_KEYWORDS: Record<string, string[]> = {
  phone: ['telefon', 'ring', 'anrop', 'samtale', 'telefonsvarer'],
  email: ['e-post', 'inbox', 'mail', 'svar'],
  social: ['sosiale medier', 'Facebook', 'Instagram', 'LinkedIn', 'DM', 'messenger'],
  form: ['skjema', 'kontaktskjema', 'nettside', 'web'],
  chatbot: ['chat', 'chatbot', 'widget'],
}

function scoreAutomation(auto: PricingAutomation, answers: Record<string, any>): number {
  let score = 0
  const text = `${auto.name} ${auto.desc} ${auto.category} ${auto.benefit}`.toLowerCase()

  // Pain points matching (heaviest weight)
  const pains: string[] = answers.pain || []
  for (const pain of pains) {
    const keywords = PAIN_KEYWORDS[pain] || []
    for (const kw of keywords) {
      if (text.includes(kw.toLowerCase())) { score += 10; break }
    }
  }

  // Contact methods matching
  const contacts: string[] = answers.contact_methods || []
  for (const method of contacts) {
    const keywords = CONTACT_KEYWORDS[method] || []
    for (const kw of keywords) {
      if (text.includes(kw.toLowerCase())) { score += 5; break }
    }
  }

  // Missed inquiries → boost phone/email/chatbot automations
  const missed = answers.missed || ''
  if (['daily', 'weekly'].includes(missed)) {
    const urgentKw = ['telefon', 'e-post', 'chatbot', 'henvendels', 'kundeservice', 'svar', 'AI-telefonsvarer', 'AI-resepsjonist']
    for (const kw of urgentKw) {
      if (text.includes(kw.toLowerCase())) { score += 8; break }
    }
  }

  // Investment level → complexity preference
  const investment = answers.investment || ''
  if (investment === 'low' && auto.complexity === 'Lav') score += 3
  if (investment === 'medium' && auto.complexity !== 'Høy') score += 2
  if (investment === 'high') score += 1 // everything is fair game

  // Team size → smaller teams benefit more from low-complexity
  const size = answers.size || ''
  if (['solo', '2-5'].includes(size) && auto.complexity === 'Lav') score += 2
  if (['16-50', '51-200', '200+'].includes(size) && auto.complexity !== 'Lav') score += 2

  return score
}

function getRecommendations(automations: PricingAutomation[], answers: Record<string, any>): { recommended: PricingAutomation[]; others: PricingAutomation[] } {
  const scored = automations.map(a => ({ auto: a, score: scoreAutomation(a, answers) }))
  scored.sort((a, b) => b.score - a.score)
  const threshold = 5 // minimum score to be "recommended"
  const maxRec = 6 // max recommended items
  const recommended = scored.filter(s => s.score >= threshold).slice(0, maxRec).map(s => s.auto)
  const recSet = new Set(recommended.map(r => r.name))
  const others = scored.filter(s => !recSet.has(s.auto.name)).map(s => s.auto)
  return { recommended, others }
}

/* ────────────────────────────────────────────
   ANIMATED NUMBER
   ──────────────────────────────────────────── */
function AnimNum({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0)
  const frameRef = useRef<number>(0)
  useEffect(() => {
    const dur = 800, startTime = Date.now()
    const tick = () => {
      const p = Math.min((Date.now() - startTime) / dur, 1)
      setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [value])
  return <span>{display.toLocaleString('nb-NO')}{suffix}</span>
}

const fmtNOK = (n: number) => n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1).replace('.', ',')} mill kr` : n.toLocaleString('nb-NO') + ' kr'

/* ────────────────────────────────────────────
   AUTOMATION ROW (reusable)
   ──────────────────────────────────────────── */
function AutoRow({ auto, selected, onToggle }: { auto: PricingAutomation; selected: boolean; onToggle: () => void }) {
  const [showInfo, setShowInfo] = useState(false)
  const CIcon = complexityIcon[auto.complexity] || Zap
  const cColor = complexityColor[auto.complexity] || '#fbbf24'

  return (
    <div style={{
      background: selected ? `rgba(${goldRgb},0.06)` : cardBg,
      borderRadius: 12,
      border: `1px solid ${selected ? `rgba(${goldRgb},0.25)` : cardBorder}`,
      transition: 'all 0.2s', overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer' }} onClick={onToggle}>
        <div style={{
          width: 22, height: 22, borderRadius: 6, flexShrink: 0,
          background: selected ? gold : 'transparent',
          border: `2px solid ${selected ? gold : 'rgba(255,255,255,0.2)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
        }}>
          {selected && <Check size={14} color={bgDark} strokeWidth={3} />}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: textPrimary }}>{auto.name}</div>
          <div style={{ fontSize: 11, color: textMuted, marginTop: 2 }}>{auto.category}</div>
        </div>
        <span style={{
          display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: cColor, fontWeight: 500,
          background: `${cColor}12`, borderRadius: 16, padding: '2px 8px', whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          <CIcon size={11} /> {auto.complexity}
        </span>
        <div style={{ textAlign: 'right', flexShrink: 0, minWidth: 80 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: gold }}>{formatKr(auto.monthlyPrice)}</div>
          <div style={{ fontSize: 10, color: textMuted }}>/mnd</div>
        </div>
        <button onClick={e => { e.stopPropagation(); setShowInfo(!showInfo) }} style={{
          background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: 4, flexShrink: 0,
        }}>
          <Info size={16} />
        </button>
      </div>
      <div style={{ maxHeight: showInfo ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
        <div style={{ padding: '0 16px 14px', borderTop: `1px solid rgba(255,255,255,0.04)` }}>
          {auto.desc && <p style={{ fontSize: 13, color: textSecondary, margin: '10px 0 0', lineHeight: 1.5 }}>{auto.desc}</p>}
          {auto.benefit && <p style={{ fontSize: 12, color: `rgba(${goldRgb},0.75)`, margin: '8px 0 0', lineHeight: 1.4, fontStyle: 'italic' }}>{auto.benefit}</p>}
          <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 11, color: textMuted }}>
            <span>Oppsett: {formatKr(auto.setupPrice)}</span>
            <span>Implementering: {auto.implTime}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════ */
type BillingMode = 'monthly' | 'annual'

function KartleggingApp() {
  const { lang } = useLanguage()
  const searchParams = useSearchParams()
  const [phase, setPhase] = useState(1)
  const [contact, setContact] = useState({ company: '', name: '', email: '', phone: '' })
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [otherIndustry, setOtherIndustry] = useState('')
  const [roiInputs, setRoiInputs] = useState({ missed: 8, jobValue: JOB_VALUE_DEFAULT, convRate: 25 })
  const [aiSummary, setAiSummary] = useState('')
  const [generating, setGenerating] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [refNumber, setRefNumber] = useState('')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [billing, setBilling] = useState<BillingMode>('monthly')
  const [showResumeBanner, setShowResumeBanner] = useState(false)

  /* Pre-select from URL */
  useEffect(() => {
    const b = searchParams.get('bransje')
    if (b && pricingIndustries.some(ind => ind.toLowerCase().includes(b.toLowerCase()))) {
      const match = pricingIndustries.find(ind => ind.toLowerCase().includes(b.toLowerCase()))
      if (match) setAnswers(prev => ({ ...prev, industry: match }))
    }
  }, [searchParams])

  /* Resume from localStorage */
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kartlegging_v2')
      if (saved) {
        const d = JSON.parse(saved)
        if (d.contact?.email && d.phase > 1 && d.phase < 8) setShowResumeBanner(true)
      }
    } catch {}
  }, [])

  const resumeProgress = () => {
    try {
      const saved = localStorage.getItem('kartlegging_v2')
      if (saved) {
        const d = JSON.parse(saved)
        if (d.contact) setContact(d.contact)
        if (d.answers) setAnswers(d.answers)
        if (d.step !== undefined) setStep(d.step)
        if (d.phase) setPhase(d.phase)
        if (d.selectedIds) setSelectedIds(new Set(d.selectedIds))
        if (d.billing) setBilling(d.billing)
      }
    } catch {}
    setShowResumeBanner(false)
  }

  const dismissResume = () => { localStorage.removeItem('kartlegging_v2'); setShowResumeBanner(false) }

  useEffect(() => {
    if (phase >= 2 && phase < 8) {
      try {
        localStorage.setItem('kartlegging_v2', JSON.stringify({
          contact, answers, step, phase, selectedIds: Array.from(selectedIds), billing,
        }))
      } catch {}
    }
    if (phase === 8) localStorage.removeItem('kartlegging_v2')
  }, [contact, answers, step, phase, selectedIds, billing])

  const questions = buildQuestions(lang)
  const selectedIndustry = answers.industry || ''

  /* Automations for selected industry */
  const industryAutomations = useMemo(() =>
    selectedIndustry ? pricingAutomations.filter(a => a.industry === selectedIndustry) : [],
    [selectedIndustry]
  )

  /* Recommendations based on questionnaire answers */
  const { recommended, others: otherAutomations } = useMemo(
    () => getRecommendations(industryAutomations, answers),
    [industryAutomations, answers]
  )

  /* Auto-select recommended automations when entering Phase 3 */
  const hasAutoSelected = useRef(false)
  useEffect(() => {
    if (phase === 3 && recommended.length > 0 && !hasAutoSelected.current) {
      hasAutoSelected.current = true
      setSelectedIds(prev => {
        const next = new Set(prev)
        recommended.forEach(r => next.add(r.name))
        return next
      })
    }
  }, [phase, recommended])

  /* Selected automation objects */
  const selectedAutomations = useMemo(() =>
    industryAutomations.filter(a => selectedIds.has(a.name)),
    [industryAutomations, selectedIds]
  )

  /* Pricing calculations */
  const count = selectedAutomations.length
  const discountRate = getDiscountRate(count)
  const totalSetup = selectedAutomations.reduce((s, a) => s + a.setupPrice, 0)
  const totalMonthlyRaw = selectedAutomations.reduce((s, a) => s + a.monthlyPrice, 0)
  const monthlyAfterQuantity = totalMonthlyRaw * (1 - discountRate)
  const monthlyFinal = billing === 'annual' ? monthlyAfterQuantity * (1 - PRICING.annualDiscount) : monthlyAfterQuantity
  const annualTotal = monthlyFinal * 12

  useEffect(() => {
    const missedKey = answers.missed || 'unsure'
    setRoiInputs(prev => ({ ...prev, missed: MISSED_DEFAULTS[missedKey] || 8 }))
  }, [answers.missed])

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
  const validatePhone = (p: string) => /^[\d\s+()-]{8,}$/.test(p.trim())

  const handleContactSubmit = () => {
    if (!contact.company.trim() || !contact.name.trim() || !contact.email.trim() || !contact.phone.trim()) return
    if (!validateEmail(contact.email)) { setEmailError(lang === 'no' ? 'Ugyldig e-postadresse' : 'Invalid email'); return }
    if (!validatePhone(contact.phone)) { setPhoneError(lang === 'no' ? 'Ugyldig telefonnummer' : 'Invalid phone'); return }
    setEmailError(''); setPhoneError('')
    setPhase(2)
  }

  const currentQ = questions[step]
  const canNext = () => {
    if (!currentQ) return false
    const a = answers[currentQ.id]
    if (currentQ.optional) return true
    if (currentQ.type === 'text') return a && a.trim().length > 0
    if (currentQ.type === 'single') return !!a
    if (currentQ.type === 'multi') return Array.isArray(a) && a.length > 0
    return false
  }

  const handleAnswer = (qId: string, value: string, type: string) => {
    if (type === 'single') {
      setAnswers(p => ({ ...p, [qId]: value }))
    } else if (type === 'multi') {
      setAnswers(p => {
        const prev = p[qId] || []
        const max = currentQ?.max
        if (prev.includes(value)) return { ...p, [qId]: prev.filter((v: string) => v !== value) }
        if (max && prev.length >= max) return p
        return { ...p, [qId]: [...prev, value] }
      })
    } else {
      setAnswers(p => ({ ...p, [qId]: value }))
    }
  }

  const nextStep = () => { if (step < questions.length - 1) setStep(step + 1); else setPhase(3) }
  const prevStep = () => { if (step > 0) setStep(step - 1); else setPhase(1) }

  function toggleAutomation(name: string) {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name); else next.add(name)
      return next
    })
  }

  /* ROI calc */
  const roiCalc = () => {
    const lostMonth = roiInputs.missed * roiInputs.jobValue * (roiInputs.convRate / 100)
    return { lostMonth: Math.round(lostMonth), lostYear: Math.round(lostMonth * 12) }
  }
  const roi = roiCalc()

  /* AI summary */
  const generateSummary = async () => {
    setGenerating(true)
    const prompt = `Du er en AI-forretningsrådgiver for Arxon, et norsk selskap som selger AI-automatisering til SMB-er. Generer en profesjonell analyse på norsk:\n\nBedrift: ${contact.company}\nBransje: ${selectedIndustry}\nStørrelse: ${answers.size}\nØnsker å frigjøre tid på: ${(answers.pain || []).join(', ')}\nNåværende systemer: ${(answers.tech || []).join(', ')}\nKundekontaktmetoder: ${(answers.contact_methods || []).join(', ')}\nHenvendelser ikke fulgt opp: ${answers.missed}\nInvesteringsvilje: ${answers.investment}\nTidslinje: ${answers.timeline}\nDrømmescenario: ${answers.goals || 'Ikke spesifisert'}\nValgte automasjoner: ${Array.from(selectedIds).join(', ') || 'Ingen valgt'}\nTilleggsinformasjon: ${answers.additional || 'Ingen'}\n\nGi analyse i dette formatet:\nOPPSUMMERING: 3-4 setninger\nANBEFALINGER: 3-5 spesifikke AI-løsninger\nPRIORITET: Hvilken løsning bør implementeres først\nESTIMERT ROI: Forventet avkastning`

    try {
      const res = await fetch('/api/kartlegging', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'analyze', prompt }),
      })
      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      setAiSummary(data.summary || '')
    } catch {
      const topAutos = selectedAutomations.slice(0, 3)
      setAiSummary(
        `OPPSUMMERING:\n${contact.company} er en ${selectedIndustry.toLowerCase()}-bedrift med ${answers.size} ansatte. Basert på kartleggingen ser vi betydelige muligheter for effektivisering.\n\nANBEFALINGER:\n${topAutos.map((a, i) => `${i + 1}. ${a.name}: ${a.desc}`).join('\n')}\n\nPRIORITET:\nVi anbefaler å starte med ${topAutos[0]?.name || 'den enkleste automatiseringen'} da dette gir raskest avkastning.\n\nPOTENSIAL:\nEstimert tapt omsetning uten AI: ca. ${fmtNOK(roi.lostYear)} årlig.\nAnbefalt månedspris: ${formatKr(Math.round(monthlyFinal))}/mnd med ${count} automatiseringer.`
      )
    }
    setGenerating(false)
    setPhase(6)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/kartlegging', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'submit', contact,
          answers: { ...answers, industryOther: otherIndustry },
          selectedAutomations: Array.from(selectedIds),
          aiSummary, pricing: { totalSetup, monthlyFinal: Math.round(monthlyFinal), billing, count, discountRate },
          language: lang,
        }),
      })
      const data = await res.json()
      setRefNumber(data.refNumber || 'ARX-' + Math.random().toString(36).substr(2, 8).toUpperCase())
    } catch {
      setRefNumber('ARX-' + Math.random().toString(36).substr(2, 8).toUpperCase())
    }
    setSubmitting(false); setPhase(8)
  }

  /* ── Styles ── */
  const cardStyle: React.CSSProperties = {
    background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 16, padding: '28px 24px',
  }
  const btnPrimary: React.CSSProperties = {
    background: `linear-gradient(110deg, ${gold} 0%, #e0c88a 25%, ${gold} 50%, #a8884d 75%, ${gold} 100%)`,
    backgroundSize: '200% 100%', color: bgDark, border: 'none', borderRadius: 12,
    padding: '14px 32px', fontWeight: 600, fontSize: 16, cursor: 'pointer',
    fontFamily: fonts.body, width: '100%', transition: 'all 0.2s',
  }
  const btnSecondary: React.CSSProperties = {
    background: 'transparent', color: textSecondary, border: `1px solid ${cardBorder}`,
    borderRadius: 10, padding: '10px 20px', fontWeight: 500, fontSize: 14, cursor: 'pointer', fontFamily: fonts.body,
  }
  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)', border: `1px solid ${cardBorder}`, borderRadius: 10,
    padding: '12px 16px', color: textPrimary, fontSize: 15, width: '100%', boxSizing: 'border-box',
    fontFamily: fonts.body, outline: 'none',
  }
  const optionBase: React.CSSProperties = {
    background: 'rgba(255,255,255,0.03)', border: `1px solid ${cardBorder}`, borderRadius: 10,
    padding: '12px 16px', cursor: 'pointer', transition: 'all 0.15s', fontSize: 14, textAlign: 'left',
  }
  const optionSelected: React.CSSProperties = {
    ...optionBase, border: `1.5px solid ${gold}`, background: `rgba(${goldRgb},0.08)`,
  }

  const pageV = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
  }

  return (
    <div style={{ background: bgDark, minHeight: '100vh', color: textPrimary, fontFamily: fonts.body }}>
      <Nav />

      {/* Resume banner */}
      <AnimatePresence>
        {showResumeBanner && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{
              maxWidth: 720, margin: '12px auto 0', padding: '12px 20px',
              background: `rgba(${goldRgb},0.1)`, border: `1px solid rgba(${goldRgb},0.25)`,
              borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap',
            }}>
            <span style={{ fontSize: 14 }}>Du har en ufullstendig kartlegging. Vil du fortsette?</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={resumeProgress} className="cta-shimmer" style={{
                color: bgDark, border: 'none', borderRadius: 8, padding: '6px 16px',
                fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: fonts.body,
              }}>Fortsett</button>
              <button onClick={dismissResume} style={{ ...btnSecondary, padding: '6px 12px', fontSize: 13 }}>Start på nytt</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px 20px 60px' }}>
        <AnimatePresence mode="wait">

          {/* ═══════════ PHASE 1: CONTACT ═══════════ */}
          {phase === 1 && (
            <motion.div key="p1" variants={pageV} initial="initial" animate="animate" exit="exit">
              <div style={{ textAlign: 'center', marginBottom: 36, marginTop: 40 }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: `rgba(${goldRgb},0.08)`, border: `1px solid rgba(${goldRgb},0.15)`,
                  borderRadius: 24, padding: '6px 16px', fontSize: 13, color: gold, marginBottom: 16, fontWeight: 500,
                }}>
                  <Sparkles size={14} /> 53+ automatiseringer tilgjengelig
                </motion.div>
                <h1 style={{ fontSize: 'clamp(26px, 5vw, 38px)', fontWeight: 700, lineHeight: 1.2, marginBottom: 14 }}>
                  {t('phase1_title', lang)}
                </h1>
                <p style={{ color: textSecondary, fontSize: 15, maxWidth: 540, margin: '0 auto', lineHeight: 1.6 }}>
                  {t('phase1_subtitle', lang)}
                </p>
              </div>
              <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 13, color: textSecondary, marginBottom: 6, display: 'block' }}>{t('company_name', lang)}</label>
                  <input autoComplete="organization" style={inputStyle} value={contact.company} onChange={e => setContact({ ...contact, company: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: 13, color: textSecondary, marginBottom: 6, display: 'block' }}>{t('contact_name', lang)}</label>
                  <input autoComplete="name" style={inputStyle} value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: 13, color: textSecondary, marginBottom: 6, display: 'block' }}>{t('email', lang)}</label>
                  <input type="email" autoComplete="email" style={{ ...inputStyle, borderColor: emailError ? '#ef4444' : cardBorder }} value={contact.email} onChange={e => { setContact({ ...contact, email: e.target.value }); setEmailError('') }} />
                  {emailError && <span style={{ color: '#ef4444', fontSize: 12, marginTop: 4, display: 'block' }}>{emailError}</span>}
                </div>
                <div>
                  <label style={{ fontSize: 13, color: textSecondary, marginBottom: 6, display: 'block' }}>{t('phone', lang)}</label>
                  <input type="tel" autoComplete="tel" style={{ ...inputStyle, borderColor: phoneError ? '#ef4444' : cardBorder }} value={contact.phone} onChange={e => { setContact({ ...contact, phone: e.target.value }); setPhoneError('') }} placeholder="412 34 567" />
                  {phoneError && <span style={{ color: '#ef4444', fontSize: 12, marginTop: 4, display: 'block' }}>{phoneError}</span>}
                </div>
                <button style={{ ...btnPrimary, marginTop: 8, opacity: (!contact.company || !contact.name || !contact.email || !contact.phone) ? 0.4 : 1 }} onClick={handleContactSubmit} disabled={!contact.company || !contact.name || !contact.email || !contact.phone}>
                  {t('start_btn', lang)} <ArrowRight size={16} style={{ display: 'inline', marginLeft: 6, verticalAlign: 'middle' }} />
                </button>
                <p style={{ color: textMuted, fontSize: 12, lineHeight: 1.5, textAlign: 'center', marginTop: 4 }}>{t('gdpr_note', lang)}</p>

                {/* Trust badges */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 8, flexWrap: 'wrap' }}>
                  {['Gratis kartlegging', 'Ferdig på ca. 14 dager', 'Norsk support'].map(txt => (
                    <span key={txt} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: textMuted }}>
                      <Check size={12} color="#4ade80" /> {txt}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══════════ PHASE 2: QUESTIONNAIRE ═══════════ */}
          {phase === 2 && currentQ && (
            <motion.div key={`p2-${step}`} variants={pageV} initial="initial" animate="animate" exit="exit">
              <div style={{ marginTop: 32, marginBottom: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: textSecondary }}>{t('step_of', lang).replace('{c}', String(step + 1)).replace('{t}', String(questions.length))}</span>
                  <span style={{ fontSize: 13, color: gold }}>{Math.round(((step + 1) / questions.length) * 100)}%</span>
                </div>
                <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                  <div style={{ height: '100%', width: `${((step + 1) / questions.length) * 100}%`, background: `linear-gradient(90deg, ${gold}, #a8884d)`, borderRadius: 2, transition: 'width 0.4s ease' }} />
                </div>
              </div>

              <div style={cardStyle}>
                <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 6, lineHeight: 1.35 }}>{currentQ.q}</h2>
                {currentQ.optional && <span style={{ fontSize: 12, color: textMuted }}>{t('optional', lang)}</span>}
                {currentQ.type === 'single' && <p style={{ fontSize: 13, color: textMuted, marginBottom: 16, marginTop: 4 }}>{t('select_one', lang)}</p>}
                {currentQ.type === 'multi' && <p style={{ fontSize: 13, color: textMuted, marginBottom: 16, marginTop: 4 }}>{currentQ.max ? t('select_multi', lang).replace('{n}', String(currentQ.max)) : t('select_multi_any', lang)}</p>}

                {(currentQ.type === 'single' || currentQ.type === 'multi') && (
                  <div style={{ display: 'grid', gridTemplateColumns: (currentQ.options?.length || 0) > 6 ? '1fr 1fr' : '1fr', gap: 8, marginTop: 16 }}>
                    {currentQ.options?.map(opt => {
                      const isSel = currentQ.type === 'single' ? answers[currentQ.id] === opt.value : (answers[currentQ.id] || []).includes(opt.value)
                      return (
                        <motion.div key={opt.value} style={isSel ? optionSelected : optionBase}
                          onClick={() => handleAnswer(currentQ.id, opt.value, currentQ.type)}
                          whileHover={{ borderColor: 'rgba(255,255,255,0.12)' }} whileTap={{ scale: 0.98 }}>
                          <span style={{ color: isSel ? gold : textPrimary }}>{opt.label}</span>
                        </motion.div>
                      )
                    })}
                  </div>
                )}

                {currentQ.type === 'text' && (
                  <textarea rows={4} placeholder={t('free_text_ph', lang)} style={{ ...inputStyle, resize: 'vertical', marginTop: 16, minHeight: 100 }} value={answers[currentQ.id] || ''} onChange={e => handleAnswer(currentQ.id, e.target.value, 'text')} />
                )}

                <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                  <button style={btnSecondary} onClick={prevStep}>{t('back', lang)}</button>
                  <button style={{ ...btnPrimary, opacity: canNext() || currentQ.optional ? 1 : 0.4 }} onClick={nextStep} disabled={!canNext() && !currentQ.optional}>
                    {step === questions.length - 1 ? 'Se resultater' : t('next', lang)}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══════════ PHASE 3: RESULTS + ROI + PACKAGE BUILDER ═══════════ */}
          {phase === 3 && (
            <motion.div key="p3" variants={pageV} initial="initial" animate="animate" exit="exit">
              <div style={{ marginTop: 32, marginBottom: 24, textAlign: 'center' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: `rgba(${goldRgb},0.08)`, border: `1px solid rgba(${goldRgb},0.15)`,
                  borderRadius: 24, padding: '6px 16px', fontSize: 13, color: gold, marginBottom: 16, fontWeight: 500,
                }}>
                  <Package size={14} /> {selectedIndustry}
                </motion.div>
                <h2 style={{ fontSize: 'clamp(22px, 4vw, 30px)', fontWeight: 700, marginBottom: 8 }}>{t('results_title', lang)}</h2>
                <p style={{ color: textSecondary, fontSize: 14, maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
                  Velg automatiseringene som passer din bedrift. Se nøyaktig pris live — ingen skjulte kostnader.
                </p>
              </div>

              {/* ROI Calculator */}
              <div style={{ ...cardStyle, marginBottom: 24, padding: '24px' }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Sparkles size={18} color={gold} /> {t('roi_title', lang)}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 13, color: textSecondary, display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span>{t('roi_missed', lang)}</span><span style={{ color: gold }}>{roiInputs.missed}</span>
                    </label>
                    <input type="range" min={1} max={100} value={roiInputs.missed} onChange={e => setRoiInputs({ ...roiInputs, missed: +e.target.value })} style={{ width: '100%', accentColor: gold }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, color: textSecondary, display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span>{t('roi_value', lang)}</span><span style={{ color: gold }}>{roiInputs.jobValue.toLocaleString('nb-NO')}</span>
                    </label>
                    <input type="range" min={200} max={100000} step={100} value={roiInputs.jobValue} onChange={e => setRoiInputs({ ...roiInputs, jobValue: +e.target.value })} style={{ width: '100%', accentColor: gold }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, color: textSecondary, display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span>{t('roi_conv', lang)}</span><span style={{ color: gold }}>{roiInputs.convRate}%</span>
                    </label>
                    <input type="range" min={5} max={80} value={roiInputs.convRate} onChange={e => setRoiInputs({ ...roiInputs, convRate: +e.target.value })} style={{ width: '100%', accentColor: gold }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 20 }}>
                  <div style={{ background: `rgba(${goldRgb},0.04)`, borderRadius: 10, padding: 16, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: textMuted, marginBottom: 6 }}>{t('roi_lost_month', lang)}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#ef4444' }}><AnimNum value={roi.lostMonth} suffix=" kr" /></div>
                  </div>
                  <div style={{ background: `rgba(${goldRgb},0.04)`, borderRadius: 10, padding: 16, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: textMuted, marginBottom: 6 }}>{t('roi_lost_year', lang)}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#ef4444' }}><AnimNum value={roi.lostYear} suffix=" kr" /></div>
                  </div>
                </div>
              </div>

              {/* ── Package Builder (integrated) ── */}
              <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                {/* Automations list */}
                <div style={{ flex: 1, minWidth: 300 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <label style={{ fontSize: 14, fontWeight: 600 }}>
                      Velg automatiseringer ({industryAutomations.length} tilgjengelig)
                    </label>
                    {count > 0 && <span style={{ fontSize: 12, color: gold, fontWeight: 500 }}>{count} valgt</span>}
                  </div>

                  {/* ── Recommended section ── */}
                  {recommended.length > 0 && (
                    <div style={{ marginBottom: 20 }}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10,
                        padding: '8px 14px', borderRadius: 10,
                        background: `linear-gradient(135deg, rgba(${goldRgb},0.08), rgba(${goldRgb},0.03))`,
                        border: `1px solid rgba(${goldRgb},0.15)`,
                      }}>
                        <Sparkles size={15} color={gold} />
                        <span style={{ fontSize: 14, fontWeight: 600, color: gold }}>Anbefalte for deg</span>
                        <span style={{ fontSize: 11, color: textMuted, marginLeft: 'auto' }}>Basert på dine svar</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {recommended.map(auto => (
                          <AutoRow key={auto.name} auto={auto} selected={selectedIds.has(auto.name)} onToggle={() => toggleAutomation(auto.name)} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── Other automations section ── */}
                  {otherAutomations.length > 0 && (
                    <div>
                      {recommended.length > 0 && (
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10,
                          padding: '6px 14px',
                        }}>
                          <Package size={14} color={textMuted} />
                          <span style={{ fontSize: 13, fontWeight: 500, color: textSecondary }}>Andre automatiseringer</span>
                        </div>
                      )}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {otherAutomations.map(auto => (
                          <AutoRow key={auto.name} auto={auto} selected={selectedIds.has(auto.name)} onToggle={() => toggleAutomation(auto.name)} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Price summary panel */}
                <div style={{ width: 300, flexShrink: 0, position: 'sticky', top: 80 }} className="price-summary-panel">
                  <div style={{ background: cardBg, borderRadius: 16, border: `1px solid rgba(${goldRgb},0.12)`, overflow: 'hidden' }}>
                    <div style={{ background: `rgba(${goldRgb},0.06)`, padding: '18px 20px', borderBottom: `1px solid rgba(${goldRgb},0.1)` }}>
                      <div style={{ fontSize: 16, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Sparkles size={18} color={gold} /> Din pakke
                      </div>
                    </div>
                    <div style={{ padding: 20 }}>
                      {/* Billing toggle */}
                      <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 3, marginBottom: 20 }}>
                        <button onClick={() => setBilling('monthly')} style={{
                          flex: 1, padding: '8px 12px', borderRadius: 6, border: 'none',
                          background: billing === 'monthly' ? `rgba(${goldRgb},0.15)` : 'transparent',
                          color: billing === 'monthly' ? gold : 'rgba(255,255,255,0.5)',
                          fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
                        }}>Månedlig</button>
                        <button onClick={() => setBilling('annual')} style={{
                          flex: 1, padding: '8px 12px', borderRadius: 6, border: 'none',
                          background: billing === 'annual' ? `rgba(${goldRgb},0.15)` : 'transparent',
                          color: billing === 'annual' ? gold : 'rgba(255,255,255,0.5)',
                          fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', position: 'relative',
                        }}>
                          Årlig
                          <span style={{ position: 'absolute', top: -8, right: -4, background: '#4ade80', color: bgDark, fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 10 }}>-20%</span>
                        </button>
                      </div>

                      {count === 0 ? (
                        <p style={{ fontSize: 14, color: textMuted, textAlign: 'center', padding: '20px 0' }}>Velg automatiseringer for å se prisen</p>
                      ) : (
                        <>
                          <div style={{ marginBottom: 16 }}>
                            {selectedAutomations.slice(0, 5).map(a => (
                              <div key={a.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 12, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                <span style={{ color: 'rgba(255,255,255,0.7)', flex: 1, marginRight: 8 }}>{a.name}</span>
                                <span style={{ color: textMuted, whiteSpace: 'nowrap' }}>{formatKr(a.monthlyPrice)}</span>
                              </div>
                            ))}
                            {count > 5 && <div style={{ fontSize: 11, color: textMuted, marginTop: 4 }}>+ {count - 5} til</div>}
                          </div>

                          <div style={{ borderTop: `1px solid rgba(${goldRgb},0.1)`, paddingTop: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                              <span style={{ color: textSecondary }}>Engangskostnad oppsett</span>
                              <span style={{ fontWeight: 500 }}>{formatKr(totalSetup)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                              <span style={{ color: textSecondary }}>Månedspris ({count} stk)</span>
                              <span>{formatKr(totalMonthlyRaw)}</span>
                            </div>
                            {discountRate > 0 && (
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                                <span style={{ color: '#4ade80' }}>Kvantumsrabatt ({Math.round(discountRate * 100)}%)</span>
                                <span style={{ color: '#4ade80' }}>-{formatKr(Math.round(totalMonthlyRaw * discountRate))}</span>
                              </div>
                            )}
                            {billing === 'annual' && (
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                                <span style={{ color: '#4ade80' }}>Årsrabatt (20%)</span>
                                <span style={{ color: '#4ade80' }}>-{formatKr(Math.round(monthlyAfterQuantity * 0.20))}</span>
                              </div>
                            )}
                          </div>

                          <div style={{ background: `rgba(${goldRgb},0.06)`, borderRadius: 10, padding: 14, marginTop: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                              <span style={{ fontSize: 13, color: textSecondary }}>{billing === 'annual' ? 'Per måned (årlig)' : 'Per måned'}</span>
                              <span style={{ fontSize: 22, fontWeight: 700, color: gold }}>{formatKr(Math.round(monthlyFinal))}</span>
                            </div>
                            {billing === 'annual' && (
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                                <span style={{ fontSize: 12, color: textMuted }}>Årlig totalt</span>
                                <span style={{ fontSize: 13, color: textSecondary }}>{formatKr(Math.round(annualTotal))}</span>
                              </div>
                            )}
                          </div>

                          {/* Trust */}
                          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <span style={{ fontSize: 11, color: textMuted, display: 'flex', alignItems: 'center', gap: 6 }}>
                              <Shield size={11} /> Ingen binding — kanseller når som helst
                            </span>
                            {billing === 'annual' && (
                              <span style={{ fontSize: 11, color: '#4ade80', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Shield size={11} /> 14 dagers åpent kjøp ved årlig betaling
                              </span>
                            )}
                            <span style={{ fontSize: 11, color: textMuted, display: 'flex', alignItems: 'center', gap: 6 }}>
                              <Phone size={11} /> Norsk support inkludert
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Compliance */}
              <div style={{ ...cardStyle, marginTop: 24, marginBottom: 24, padding: '22px' }}>
                <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Shield size={16} color={gold} /> {t('compliance_title', lang)}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {COMPLIANCE.map((c, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <Check size={12} color="#4ade80" style={{ marginTop: 3, flexShrink: 0 }} />
                      <div>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{c.title}</span>
                        <span style={{ fontSize: 12.5, color: textSecondary }}> — {c.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA to generate analysis */}
              <button
                style={{ ...btnPrimary, opacity: count > 0 ? 1 : 0.4 }}
                disabled={count === 0}
                onClick={() => setPhase(5)}
              >
                {t('generate_btn', lang)} <ArrowRight size={16} style={{ display: 'inline', marginLeft: 6, verticalAlign: 'middle' }} />
              </button>
              {count === 0 && (
                <p style={{ textAlign: 'center', fontSize: 13, color: textMuted, marginTop: 8 }}>Velg minst én automatisering for å fortsette</p>
              )}
            </motion.div>
          )}

          {/* ═══════════ PHASE 5: GENERATING ═══════════ */}
          {phase === 5 && (
            <motion.div key="p5" variants={pageV} initial="initial" animate="animate" exit="exit" style={{ textAlign: 'center', marginTop: 120 }}>
              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: `linear-gradient(135deg, ${gold}, #a8884d)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 24px', fontSize: 22, fontWeight: 700, color: bgDark,
                }}>AI</motion.div>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>{t('generating', lang)}</h2>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 20 }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: gold, animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                ))}
              </div>
              {!generating && !aiSummary && <div style={{ display: 'none' }}>{(() => { setTimeout(() => generateSummary(), 500); return '' })()}</div>}
              <style>{`@keyframes pulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}`}</style>
            </motion.div>
          )}

          {/* ═══════════ PHASE 6: AI SUMMARY + BOOKING ═══════════ */}
          {phase === 6 && (
            <motion.div key="p6" variants={pageV} initial="initial" animate="animate" exit="exit">
              <div style={{ marginTop: 32, marginBottom: 24, textAlign: 'center' }}>
                <h2 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 700 }}>{t('summary_title', lang)}</h2>
              </div>
              <div style={{ ...cardStyle, marginBottom: 24 }}>
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: fonts.body, fontSize: 14, lineHeight: 1.65, color: textSecondary }}>{aiSummary}</pre>
              </div>

              {/* Selected summary with pricing */}
              {count > 0 && (
                <div style={{ ...cardStyle, marginBottom: 24, padding: '20px' }}>
                  <span style={{ fontSize: 15, fontWeight: 600, display: 'block', marginBottom: 12 }}>Din pakke ({count} automatiseringer)</span>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                    <div style={{ background: `rgba(${goldRgb},0.04)`, borderRadius: 10, padding: 14, textAlign: 'center' }}>
                      <div style={{ fontSize: 11, color: textMuted, marginBottom: 4 }}>Engangskostnad</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: gold }}>{formatKr(totalSetup)}</div>
                    </div>
                    <div style={{ background: `rgba(${goldRgb},0.04)`, borderRadius: 10, padding: 14, textAlign: 'center' }}>
                      <div style={{ fontSize: 11, color: textMuted, marginBottom: 4 }}>Månedspris</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: gold }}>{formatKr(Math.round(monthlyFinal))}/mnd</div>
                    </div>
                  </div>
                  {selectedAutomations.map((a, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '5px 0' }}>
                      <Check size={12} color={gold} />
                      <span style={{ fontSize: 13 }}>{a.name}</span>
                      <span style={{ fontSize: 11, color: textMuted, marginLeft: 'auto' }}>{formatKr(a.monthlyPrice)}/mnd</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Booking CTA */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                style={{ ...cardStyle, marginBottom: 24, padding: '32px 24px', textAlign: 'center', border: `1.5px solid ${gold}`, background: `rgba(${goldRgb},0.04)` }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Book en gratis samtale</h3>
                <p style={{ fontSize: 13.5, color: textSecondary, marginBottom: 20, lineHeight: 1.55 }}>
                  Vi gjennomgår analysen din og gir deg et tilpasset tilbud basert på pakken du har bygget.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320, margin: '0 auto' }}>
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="cta-shimmer"
                    onClick={() => { if (!submitting && !refNumber) handleSubmit() }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 20px', borderRadius: 10, fontWeight: 600, fontSize: 14, textDecoration: 'none', color: bgDark }}>
                    <CalendarDays size={16} /> Book tid i kalenderen
                  </a>
                  <button style={{ ...btnSecondary, fontSize: 13 }} onClick={() => { if (!submitting && !refNumber) handleSubmit(); setPhase(8) }}>
                    Send inn uten å booke — vi ringer deg
                  </button>
                </div>
                <div style={{ marginTop: 16 }}>
                  {['30 min uforpliktende samtale', 'Vi diskuterer pris og løsning', 'Du forplikter deg til ingenting'].map((s, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 4 }}>
                      <Check size={11} color="#4ade80" />
                      <span style={{ fontSize: 12.5, color: textMuted }}>{s}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ═══════════ PHASE 8: CONFIRMATION ═══════════ */}
          {phase === 8 && (
            <motion.div key="p8" variants={pageV} initial="initial" animate="animate" exit="exit" style={{ textAlign: 'center', marginTop: 60 }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: `rgba(${goldRgb},0.12)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 24px', border: `2px solid ${gold}`,
                }}>
                <Check size={28} color={gold} />
              </motion.div>
              <h2 style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 700, marginBottom: 12 }}>{t('confirm_title', lang)}</h2>
              <div style={{ ...cardStyle, display: 'inline-block', padding: '10px 24px', marginBottom: 20 }}>
                <span style={{ fontSize: 13, color: textMuted }}>{t('confirm_ref', lang)}: </span>
                <span style={{ fontSize: 15, fontWeight: 600, color: gold, letterSpacing: 1 }}>{refNumber}</span>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                style={{ ...cardStyle, maxWidth: 500, margin: '0 auto 28px', padding: '32px 28px', border: `1.5px solid ${gold}`, background: `rgba(${goldRgb},0.04)` }}>
                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Book en gratis samtale</h3>
                <p style={{ color: textSecondary, fontSize: 14, lineHeight: 1.6, marginBottom: 24, maxWidth: 380, margin: '0 auto 24px' }}>
                  Kartleggingen din er sendt! Book en samtale så diskuterer vi pris og løsning.
                </p>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="cta-shimmer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    color: bgDark, borderRadius: 12, padding: '16px 36px', fontWeight: 700, fontSize: 16,
                    textDecoration: 'none', boxShadow: `0 8px 32px rgba(${goldRgb},0.25)`,
                  }}>
                  <CalendarDays size={18} /> Velg tid i kalenderen
                </a>
                <p style={{ fontSize: 12, color: textMuted, marginTop: 14 }}>15 min · Gratis · Uforpliktende</p>
              </motion.div>

              <div style={{ ...cardStyle, textAlign: 'left', maxWidth: 500, margin: '0 auto' }}>
                <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Slik fungerer det videre</h4>
                {['Book en tid som passer deg', 'Vi gjennomgår AI-analysen din', 'Du får et skreddersydd tilbud'].map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'center' }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: '50%',
                      background: `rgba(${goldRgb},0.1)`, color: gold,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700, flexShrink: 0,
                    }}>{i + 1}</div>
                    <p style={{ fontSize: 13.5, color: textSecondary, lineHeight: 1.5, margin: 0 }}>{s}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <Footer />

      <style jsx global>{`
        @media (max-width: 768px) {
          .price-summary-panel {
            width: 100% !important;
            position: static !important;
            order: -1;
          }
        }
      `}</style>
    </div>
  )
}

/* ════════════════════════════════════════════
   LOADING FALLBACK
   ════════════════════════════════════════════ */
function KartleggingFallback() {
  return (
    <div style={{ minHeight: '100vh', background: bgDark, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: 48, height: 48, border: `3px solid rgba(${goldRgb},0.15)`, borderTopColor: gold, borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: 24 }} />
      <div style={{ color: gold, fontSize: 18, fontFamily: fonts.body, marginBottom: 8 }}>Laster kartlegging...</div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

/* ════════════════════════════════════════════
   PAGE EXPORT WITH SUSPENSE
   ════════════════════════════════════════════ */
export default function KartleggingPage() {
  return (
    <Suspense fallback={<KartleggingFallback />}>
      <KartleggingApp />
    </Suspense>
  )
}
