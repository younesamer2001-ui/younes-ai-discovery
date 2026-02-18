export type Language = 'no' | 'en'

export const translations = {
  // Landing page
  hero_title: {
    no: 'Finn ut hvordan AI kan revolusjonere din bedrift',
    en: 'Discover how AI can transform your business',
  },
  hero_subtitle: {
    no: 'Svar på noen smarte spørsmål og få en personlig AI-integrasjonsplan, gjennomgått av ekte eksperter.',
    en: 'Answer a few smart questions and get a personalized AI integration plan, reviewed by real experts.',
  },
  hero_cta: {
    no: 'Start din gratis AI-analyse',
    en: 'Start your free AI analysis',
  },
  hero_trust_1: {
    no: 'Ingen forpliktelser',
    en: 'No obligations',
  },
  hero_trust_2: {
    no: 'Svar innen 48 timer',
    en: 'Response within 48 hours',
  },
  hero_trust_3: {
    no: 'Tilpasset din bransje',
    en: 'Tailored to your industry',
  },
  // Auth
  login_title: {
    no: 'Logg inn eller opprett konto',
    en: 'Log in or create account',
  },
  login_subtitle: {
    no: 'Vi sender deg en innloggingslenke på e-post',
    en: 'We\'ll send you a login link via email',
  },
  login_email_placeholder: {
    no: 'din@epost.no',
    en: 'your@email.com',
  },
  login_button: {
    no: 'Send innloggingslenke',
    en: 'Send login link',
  },
  login_check_email: {
    no: 'Sjekk e-posten din for innloggingslenke!',
    en: 'Check your email for a login link!',
  },
  // Start / Profile
  start_title: {
    no: 'Fortell oss om din bedrift',
    en: 'Tell us about your business',
  },
  start_name: {
    no: 'Fullt navn',
    en: 'Full name',
  },
  start_company: {
    no: 'Bedriftsnavn',
    en: 'Company name',
  },
  start_phone: {
    no: 'Telefonnummer (valgfritt)',
    en: 'Phone number (optional)',
  },
  start_website: {
    no: 'Nettside (valgfritt)',
    en: 'Website (optional)',
  },
  start_continue: {
    no: 'Fortsett',
    en: 'Continue',
  },
  // Industry
  industry_title: {
    no: 'Hvilken bransje er dere i?',
    en: 'What industry are you in?',
  },
  industry_retail: { no: 'Butikk / Netthandel', en: 'Retail / E-commerce' },
  industry_healthcare: { no: 'Helse', en: 'Healthcare' },
  industry_finance: { no: 'Finans / Bank', en: 'Finance / Banking' },
  industry_realestate: { no: 'Eiendom', en: 'Real Estate' },
  industry_education: { no: 'Utdanning', en: 'Education' },
  industry_logistics: { no: 'Logistikk / Frakt', en: 'Logistics / Shipping' },
  industry_restaurant: { no: 'Restaurant / Hotell', en: 'Restaurant / Hospitality' },
  industry_construction: { no: 'Bygg og anlegg', en: 'Construction' },
  industry_legal: { no: 'Jus / Advokat', en: 'Legal' },
  industry_marketing: { no: 'Markedsføring / Byrå', en: 'Marketing / Agency' },
  industry_tech: { no: 'Teknologi / SaaS', en: 'Technology / SaaS' },
  industry_manufacturing: { no: 'Produksjon', en: 'Manufacturing' },
  industry_other: { no: 'Annet', en: 'Other' },
  // Company size
  size_title: {
    no: 'Hvor mange ansatte har bedriften?',
    en: 'How many employees does your company have?',
  },
  size_1_5: { no: '1-5 (Startup)', en: '1-5 (Startup)' },
  size_6_20: { no: '6-20 (Liten)', en: '6-20 (Small)' },
  size_21_100: { no: '21-100 (Mellomstor)', en: '21-100 (Medium)' },
  size_101_500: { no: '101-500 (Stor)', en: '101-500 (Large)' },
  size_500plus: { no: '500+ (Enterprise)', en: '500+ (Enterprise)' },
  // Challenge
  challenge_title: {
    no: 'Hva er bedriftens største utfordring akkurat nå?',
    en: 'What is your company\'s primary challenge right now?',
  },
  challenge_manual: { no: 'For mange manuelle/repetitive oppgaver', en: 'Too many manual/repetitive tasks' },
  challenge_support: { no: 'Kundeservice er overveldende', en: 'Customer support is overwhelming' },
  challenge_sales: { no: 'Salg/leadgenerering er tregt', en: 'Sales/lead generation is slow' },
  challenge_communication: { no: 'Intern kommunikasjon er kaotisk', en: 'Internal communication is chaotic' },
  challenge_data: { no: 'Dataanalyse tar for lang tid', en: 'Data analysis takes too long' },
  challenge_content: { no: 'Innholdsproduksjon er en flaskehals', en: 'Content creation is a bottleneck' },
  challenge_hr: { no: 'Rekruttering/HR er tregt', en: 'Hiring/HR processes are slow' },
  challenge_other: { no: 'Annet', en: 'Other' },
  // Budget
  budget_title: {
    no: 'Hva er omtrentlig månedlig budsjett for AI-verktøy?',
    en: 'What is your approximate monthly budget for AI tools?',
  },
  budget_exploring: { no: 'Bare utforsker (ingen budsjett ennå)', en: 'Just exploring (no budget yet)' },
  budget_1k_5k: { no: '1 000 - 5 000 NOK / mnd', en: '1,000 - 5,000 NOK / month' },
  budget_5k_20k: { no: '5 000 - 20 000 NOK / mnd', en: '5,000 - 20,000 NOK / month' },
  budget_20k_100k: { no: '20 000 - 100 000 NOK / mnd', en: '20,000 - 100,000 NOK / month' },
  budget_100kplus: { no: '100 000+ NOK / mnd', en: '100,000+ NOK / month' },
  // AI Experience
  ai_exp_title: {
    no: 'Har dere brukt AI-verktøy før?',
    en: 'Have you used any AI tools before?',
  },
  ai_exp_never: { no: 'Nei, aldri', en: 'No, never' },
  ai_exp_basic: { no: 'Ja, grunnleggende (ChatGPT, Copilot osv.)', en: 'Yes, basic (ChatGPT, Copilot, etc.)' },
  ai_exp_some: { no: 'Ja, vi har noe AI integrert', en: 'Yes, we have some AI integrated' },
  ai_exp_advanced: { no: 'Ja, vi er avanserte AI-brukere', en: 'Yes, we are advanced AI users' },
  // Tools
  tools_title: {
    no: 'Hvilke verktøy/programvare bruker dere i dag?',
    en: 'What tools/software do you currently use?',
  },
  // Discovery
  discover_title: {
    no: 'AI-analyse pågår',
    en: 'AI analysis in progress',
  },
  discover_summary_title: {
    no: 'Oppdagelsesoppsummering',
    en: 'Discovery Summary',
  },
  discover_thinking: {
    no: 'AI-en analyserer svarene dine...',
    en: 'AI is analyzing your answers...',
  },
  // Results
  result_title: {
    no: 'Din AI-integrasjonsanbefaling',
    en: 'Your AI Integration Recommendation',
  },
  result_submitted: {
    no: 'Rapporten er sendt til vårt team! Vi tar kontakt innen 48 timer.',
    en: 'Report submitted to our team! We\'ll be in touch within 48 hours.',
  },
  result_download: {
    no: 'Last ned rapport',
    en: 'Download report',
  },
  // General
  back: { no: 'Tilbake', en: 'Back' },
  next: { no: 'Neste', en: 'Next' },
  submit: { no: 'Send inn', en: 'Submit' },
  loading: { no: 'Laster...', en: 'Loading...' },
  step: { no: 'Steg', en: 'Step' },
  of: { no: 'av', en: 'of' },
  language_toggle: { no: 'English', en: 'Norsk' },
} as const

export type TranslationKey = keyof typeof translations

export function t(key: TranslationKey, lang: Language): string {
  return translations[key]?.[lang] || key
}
