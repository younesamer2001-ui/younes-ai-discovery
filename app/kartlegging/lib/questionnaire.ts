import { pricingIndustries } from '@/lib/pricing'

export type QuestionOption = { value: string; label: string }
export type Question = { id: string; type: string; q: string; options?: QuestionOption[]; hasOther?: boolean; max?: number; optional?: boolean }

export const INDUSTRY_MAP: { id: string; no: string; en: string }[] = pricingIndustries.map((name, i) => ({
  id: name.toLowerCase().replace(/[^a-zæøå0-9]+/g, '-').replace(/-+$/, ''),
  no: name,
  en: name,
}))

export const buildQuestions = (lang: string): Question[] => [
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

export const getCompliance = (lang: string, t: (key: string, lang: string) => string) => [
  { title: t('compliance_gdpr', lang), desc: t('compliance_gdpr_desc', lang) },
  { title: t('compliance_datacenter', lang), desc: t('compliance_datacenter_desc', lang) },
  { title: t('compliance_aiact', lang), desc: t('compliance_aiact_desc', lang) },
  { title: t('compliance_dpa', lang), desc: t('compliance_dpa_desc', lang) },
]
