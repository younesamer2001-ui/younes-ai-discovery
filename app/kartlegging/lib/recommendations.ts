import { PricingAutomation } from '@/lib/pricing'

export const PAIN_KEYWORDS: Record<string, string[]> = {
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

export const CONTACT_KEYWORDS: Record<string, string[]> = {
  phone: ['telefon', 'ring', 'anrop', 'samtale', 'telefonsvarer'],
  email: ['e-post', 'inbox', 'mail', 'svar'],
  social: ['sosiale medier', 'Facebook', 'Instagram', 'LinkedIn', 'DM', 'messenger'],
  form: ['skjema', 'kontaktskjema', 'nettside', 'web'],
  chatbot: ['chat', 'chatbot', 'widget'],
}

export function scoreAutomation(auto: PricingAutomation, answers: Record<string, any>): number {
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
  if (investment === 'high') score += 1

  // Team size → smaller teams benefit more from low-complexity
  const size = answers.size || ''
  if (['solo', '2-5'].includes(size) && auto.complexity === 'Lav') score += 2
  if (['16-50', '51-200', '200+'].includes(size) && auto.complexity !== 'Lav') score += 2

  return score
}

export function getRecommendations(automations: PricingAutomation[], answers: Record<string, any>): { recommended: PricingAutomation[]; others: PricingAutomation[] } {
  const scored = automations.map(a => ({ auto: a, score: scoreAutomation(a, answers) }))
  scored.sort((a, b) => b.score - a.score)
  const threshold = 5
  const maxRec = 6
  const recommended = scored.filter(s => s.score >= threshold).slice(0, maxRec).map(s => s.auto)
  const recSet = new Set(recommended.map(r => r.name))
  const others = scored.filter(s => !recSet.has(s.auto.name)).map(s => s.auto)
  return { recommended, others }
}
