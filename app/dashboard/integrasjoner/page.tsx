'use client'

import { useState, useEffect } from 'react'
import { gold, goldRgb, fonts } from '@/lib/constants'
import {
  Link2, CheckCircle2, AlertCircle, Clock, Eye, EyeOff,
  ExternalLink, Shield, Zap, Check, ShoppingCart, Package, Lock,
  Search
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface IntegrationField {
  key: string
  label: string
  placeholder: string
  type: 'text' | 'password'
  helpText?: string
}

interface IntegrationDef {
  service: string
  name: string
  description: string
  icon: string
  color: string
  category: string          // which industry/group
  fields: IntegrationField[]
  helpUrl: string
  helpLabel: string
  usedFor: string[]
}

/* ------------------------------------------------------------------ */
/*  Full integration catalog                                           */
/* ------------------------------------------------------------------ */

const allIntegrations: IntegrationDef[] = [

  /* ===== FELLES (alle bransjer) ===== */
  {
    service: 'vipps',
    name: 'Vipps MobilePay',
    description: 'Automatisk fakturering og betalingspåminnelser via Vipps.',
    icon: '💳',
    color: '#ff5b24',
    category: 'Felles',
    fields: [
      { key: 'client_id', label: 'Client ID', placeholder: 'Lim inn din Vipps Client ID', type: 'text' },
      { key: 'client_secret', label: 'Client Secret', placeholder: 'Lim inn din Vipps Client Secret', type: 'password' },
      { key: 'merchant_serial', label: 'Merchant Serial Number (MSN)', placeholder: 'F.eks. 123456', type: 'text', helpText: 'Finner du i Vipps-portalen under Utvikler → API-nøkler' },
      { key: 'subscription_key', label: 'Ocp-Apim-Subscription-Key', placeholder: 'Lim inn subscription key', type: 'password' },
    ],
    helpUrl: 'https://developer.vippsmobilepay.com/docs/getting-started/',
    helpLabel: 'Hvordan finner jeg API-nøklene?',
    usedFor: ['Automatisk fakturering', 'Betalingspåminnelser', 'Refusjon-håndtering'],
  },
  {
    service: 'tripletex',
    name: 'Tripletex',
    description: 'Synkroniser faktura, kunder og regnskap automatisk.',
    icon: '📊',
    color: '#2563eb',
    category: 'Felles',
    fields: [
      { key: 'consumer_token', label: 'Consumer Token', placeholder: 'Lim inn din consumer token', type: 'password', helpText: 'Opprett en integrasjon i Tripletex under Innstillinger → API-tilgang' },
      { key: 'employee_token', label: 'Employee Token', placeholder: 'Lim inn din employee token', type: 'password' },
    ],
    helpUrl: 'https://tripletex.no/v2-docs/',
    helpLabel: 'Hvordan oppretter jeg API-tilgang?',
    usedFor: ['Auto-fakturering', 'Kundesynkronisering', 'Regnskapseksport'],
  },
  {
    service: 'fiken',
    name: 'Fiken',
    description: 'Regnskap og fakturering for små bedrifter.',
    icon: '🧾',
    color: '#00b4d8',
    category: 'Felles',
    fields: [
      { key: 'api_token', label: 'API-token', placeholder: 'Lim inn din Fiken API-token', type: 'password', helpText: 'Generer token i Fiken under Innstillinger → API' },
      { key: 'company_slug', label: 'Firma-slug', placeholder: 'F.eks. mitt-firma-as', type: 'text', helpText: 'Finner du i URL-en når du er logget inn i Fiken' },
    ],
    helpUrl: 'https://api.fiken.no/api/v2/docs/',
    helpLabel: 'Hvordan finner jeg API-token?',
    usedFor: ['Auto-fakturering', 'Regnskapsføring', 'Kundesynkronisering'],
  },
  {
    service: 'google_calendar',
    name: 'Google Calendar',
    description: 'Automatisk booking og møtepåminnelser koblet til kalenderen din.',
    icon: '📅',
    color: '#16a34a',
    category: 'Felles',
    fields: [
      { key: 'calendar_id', label: 'Kalender-ID', placeholder: 'din@gmail.com eller kalender-ID', type: 'text', helpText: 'Finner du i Google Calendar → Innstillinger → Kalender-ID' },
    ],
    helpUrl: 'https://support.google.com/calendar/answer/37083',
    helpLabel: 'Hvordan finner jeg min kalender-ID?',
    usedFor: ['Auto-booking', 'Møtepåminnelser', 'Kalender-synkronisering'],
  },
  {
    service: 'outlook',
    name: 'Microsoft Outlook',
    description: 'Synkroniser kalender, e-post og kontakter via Microsoft 365.',
    icon: '📧',
    color: '#0078d4',
    category: 'Felles',
    fields: [
      { key: 'client_id', label: 'Application (Client) ID', placeholder: 'Lim inn Azure AD Client ID', type: 'text', helpText: 'Opprett en app i Azure Portal → App Registrations' },
      { key: 'client_secret', label: 'Client Secret', placeholder: 'Lim inn client secret', type: 'password' },
      { key: 'tenant_id', label: 'Tenant ID', placeholder: 'Lim inn din Azure Tenant ID', type: 'text' },
    ],
    helpUrl: 'https://learn.microsoft.com/en-us/graph/auth-register-app-v2',
    helpLabel: 'Hvordan setter jeg opp Microsoft-integrasjon?',
    usedFor: ['Kalender-synkronisering', 'E-post-automatisering', 'Kontaktsynkronisering'],
  },
  {
    service: 'twilio',
    name: 'Twilio',
    description: 'SMS-varsler og telefonintegrasjon for kundeoppfølging.',
    icon: '📱',
    color: '#e11d48',
    category: 'Felles',
    fields: [
      { key: 'account_sid', label: 'Account SID', placeholder: 'Lim inn din Twilio Account SID', type: 'text' },
      { key: 'auth_token', label: 'Auth Token', placeholder: 'Lim inn din auth token', type: 'password' },
      { key: 'phone_number', label: 'Twilio-telefonnummer', placeholder: '+47XXXXXXXX', type: 'text', helpText: 'Telefonnummeret du har kjøpt i Twilio' },
    ],
    helpUrl: 'https://www.twilio.com/docs/usage/api',
    helpLabel: 'Hvor finner jeg Account SID og Auth Token?',
    usedFor: ['SMS-påminnelser', 'Kundevarsler', 'Telefon-integrasjon'],
  },
  {
    service: 'sendgrid',
    name: 'SendGrid',
    description: 'Automatiske e-poster, bekreftelser og nyhetsbrev.',
    icon: '✉️',
    color: '#1a82e2',
    category: 'Felles',
    fields: [
      { key: 'api_key', label: 'API Key', placeholder: 'Lim inn din SendGrid API key', type: 'password', helpText: 'Opprett en API key i SendGrid under Settings → API Keys' },
    ],
    helpUrl: 'https://docs.sendgrid.com/for-developers/sending-email/api-getting-started',
    helpLabel: 'Hvordan oppretter jeg en API-nøkkel?',
    usedFor: ['Auto-epost', 'Bookingbekreftelser', 'Nyhetsbrev'],
  },
  {
    service: 'hubspot',
    name: 'HubSpot CRM',
    description: 'Kundebehandling, salg og markedsføring i ett system.',
    icon: '🔶',
    color: '#ff7a59',
    category: 'Felles',
    fields: [
      { key: 'api_key', label: 'Private App Token', placeholder: 'Lim inn din HubSpot private app token', type: 'password', helpText: 'Opprett en Private App i HubSpot under Settings → Integrations → Private Apps' },
    ],
    helpUrl: 'https://developers.hubspot.com/docs/api/private-apps',
    helpLabel: 'Hvordan oppretter jeg en Private App?',
    usedFor: ['Lead-håndtering', 'Kundeoppfølging', 'Salgspipeline'],
  },

  /* ===== BYGG & HÅNDVERK ===== */
  {
    service: 'bygglet',
    name: 'Bygglet',
    description: 'Prosjektstyring, tidsregistrering og dokumenthåndtering for bygg.',
    icon: '🏗️',
    color: '#f59e0b',
    category: 'Bygg & Håndverk',
    fields: [
      { key: 'api_key', label: 'API-nøkkel', placeholder: 'Lim inn din Bygglet API-nøkkel', type: 'password', helpText: 'Kontakt Bygglet support for API-tilgang' },
      { key: 'company_id', label: 'Firma-ID', placeholder: 'Din Bygglet firma-ID', type: 'text' },
    ],
    helpUrl: 'https://www.bygglet.com/',
    helpLabel: 'Hvordan får jeg API-tilgang?',
    usedFor: ['Prosjektstyring', 'Tidsregistrering', 'Dokumenthåndtering'],
  },
  {
    service: 'fonn',
    name: 'Fonn',
    description: 'Kvalitetssikring, avvikshåndtering og sjekklister for byggeplassen.',
    icon: '📋',
    color: '#10b981',
    category: 'Bygg & Håndverk',
    fields: [
      { key: 'api_key', label: 'API-nøkkel', placeholder: 'Lim inn din Fonn API-nøkkel', type: 'password' },
    ],
    helpUrl: 'https://www.fonn.com/',
    helpLabel: 'Hvordan får jeg API-tilgang?',
    usedFor: ['Kvalitetssikring', 'Avvikshåndtering', 'Sjekklister'],
  },

  /* ===== EIENDOMSMEGLING ===== */
  {
    service: 'vitec_next',
    name: 'Vitec Next',
    description: 'Meglersystem for eiendomshåndtering, visninger og budgivning.',
    icon: '🏠',
    color: '#6366f1',
    category: 'Eiendomsmegling',
    fields: [
      { key: 'api_key', label: 'API-nøkkel', placeholder: 'Lim inn din Vitec API-nøkkel', type: 'password' },
      { key: 'customer_id', label: 'Kunde-ID', placeholder: 'Din Vitec kunde-ID', type: 'text', helpText: 'Får du fra din Vitec-kontakt' },
    ],
    helpUrl: 'https://www.vitec.com/',
    helpLabel: 'Hvordan får jeg API-tilgang?',
    usedFor: ['Eiendomsannonser', 'Visningshåndtering', 'Budgivning'],
  },
  {
    service: 'finn_eiendom',
    name: 'Finn.no Eiendom',
    description: 'Publiser og synkroniser eiendomsannonser automatisk.',
    icon: '🔍',
    color: '#0063fb',
    category: 'Eiendomsmegling',
    fields: [
      { key: 'client_id', label: 'Client ID', placeholder: 'Lim inn din Finn Client ID', type: 'text' },
      { key: 'client_secret', label: 'Client Secret', placeholder: 'Lim inn din client secret', type: 'password', helpText: 'Søk om API-tilgang via Finn for Bedrift' },
    ],
    helpUrl: 'https://github.com/finn-no/api-docs',
    helpLabel: 'Hvordan får jeg Finn API-tilgang?',
    usedFor: ['Annonsepublisering', 'Eiendomssynkronisering', 'Statistikk'],
  },
  {
    service: 'signicat',
    name: 'Signicat',
    description: 'E-signering av kontrakter og dokumenter med BankID.',
    icon: '✍️',
    color: '#1e3a5f',
    category: 'Eiendomsmegling',
    fields: [
      { key: 'client_id', label: 'Client ID', placeholder: 'Lim inn din Signicat Client ID', type: 'text' },
      { key: 'client_secret', label: 'Client Secret', placeholder: 'Lim inn din client secret', type: 'password' },
    ],
    helpUrl: 'https://developer.signicat.com/',
    helpLabel: 'Hvordan oppretter jeg API-tilgang?',
    usedFor: ['E-signering', 'Kontraktshåndtering', 'BankID-verifisering'],
  },

  /* ===== SALONG & SKJØNNHET ===== */
  {
    service: 'timely',
    name: 'Timely',
    description: 'Online booking, kundehistorikk og salongstyring.',
    icon: '💇',
    color: '#8b5cf6',
    category: 'Salong & Skjønnhet',
    fields: [
      { key: 'api_key', label: 'API-nøkkel', placeholder: 'Lim inn din Timely API-nøkkel', type: 'password', helpText: 'Finner du i Timely under Innstillinger → Integrasjoner' },
    ],
    helpUrl: 'https://www.gettimely.com/',
    helpLabel: 'Hvor finner jeg min API-nøkkel?',
    usedFor: ['Online booking', 'Kundehistorikk', 'Påminnelser'],
  },
  {
    service: 'fixit',
    name: 'Fixit',
    description: 'Alt-i-ett salong- og bookingsystem for norske salonger.',
    icon: '💅',
    color: '#ec4899',
    category: 'Salong & Skjønnhet',
    fields: [
      { key: 'api_key', label: 'API-nøkkel', placeholder: 'Lim inn din Fixit API-nøkkel', type: 'password' },
      { key: 'salon_id', label: 'Salong-ID', placeholder: 'Din Fixit salong-ID', type: 'text' },
    ],
    helpUrl: 'https://www.fixit.no/',
    helpLabel: 'Hvordan får jeg API-tilgang?',
    usedFor: ['Bookingstyring', 'Kundebehandling', 'Betalinger'],
  },
  {
    service: 'square',
    name: 'Square',
    description: 'Betaling, POS-system og salgsrapporter.',
    icon: '⬜',
    color: '#006aff',
    category: 'Salong & Skjønnhet',
    fields: [
      { key: 'access_token', label: 'Access Token', placeholder: 'Lim inn din Square access token', type: 'password', helpText: 'Opprett en applikasjon i Square Developer Dashboard' },
      { key: 'location_id', label: 'Location ID', placeholder: 'Din Square location ID', type: 'text' },
    ],
    helpUrl: 'https://developer.squareup.com/docs/build-basics/access-tokens',
    helpLabel: 'Hvordan oppretter jeg API-tilgang?',
    usedFor: ['Betalingshåndtering', 'POS-synkronisering', 'Salgsrapporter'],
  },

  /* ===== BILVERKSTED & BILFORHANDLER ===== */
  {
    service: 'autodata',
    name: 'Autodata',
    description: 'Teknisk informasjon, serviceplaner og diagnoseverktøy.',
    icon: '🔧',
    color: '#ea580c',
    category: 'Bilverksted & Bilforhandler',
    fields: [
      { key: 'username', label: 'Brukernavn', placeholder: 'Ditt Autodata brukernavn', type: 'text' },
      { key: 'api_key', label: 'API-nøkkel', placeholder: 'Lim inn din Autodata API-nøkkel', type: 'password' },
    ],
    helpUrl: 'https://www.autodata-group.com/',
    helpLabel: 'Hvordan får jeg API-tilgang?',
    usedFor: ['Teknisk oppslag', 'Serviceplaner', 'Diagnose'],
  },
  {
    service: 'infomedia',
    name: 'Infomedia',
    description: 'Delekataloger og illustrasjoner for bilverksteder.',
    icon: '🚗',
    color: '#0284c7',
    category: 'Bilverksted & Bilforhandler',
    fields: [
      { key: 'api_key', label: 'API-nøkkel', placeholder: 'Lim inn din Infomedia API-nøkkel', type: 'password' },
      { key: 'dealer_id', label: 'Forhandler-ID', placeholder: 'Din Infomedia forhandler-ID', type: 'text' },
    ],
    helpUrl: 'https://www.infomedia.com/',
    helpLabel: 'Hvordan får jeg API-tilgang?',
    usedFor: ['Delekatalog', 'Illustrasjoner', 'Bestilling'],
  },
  {
    service: 'finn_bil',
    name: 'Finn.no Bil',
    description: 'Publiser og synkroniser bilannonser automatisk.',
    icon: '🚙',
    color: '#0063fb',
    category: 'Bilverksted & Bilforhandler',
    fields: [
      { key: 'client_id', label: 'Client ID', placeholder: 'Lim inn din Finn Client ID', type: 'text' },
      { key: 'client_secret', label: 'Client Secret', placeholder: 'Lim inn din client secret', type: 'password' },
    ],
    helpUrl: 'https://github.com/finn-no/api-docs',
    helpLabel: 'Hvordan får jeg Finn API-tilgang?',
    usedFor: ['Annonsepublisering', 'Bilsynkronisering', 'Prisstatistikk'],
  },

  /* ===== REISELIV & OVERNATTING ===== */
  {
    service: 'booking_com',
    name: 'Booking.com',
    description: 'Synkroniser tilgjengelighet, priser og reservasjoner.',
    icon: '🏨',
    color: '#003580',
    category: 'Reiseliv & Overnatting',
    fields: [
      { key: 'hotel_id', label: 'Hotel ID', placeholder: 'Din Booking.com property ID', type: 'text' },
      { key: 'api_key', label: 'API Key', placeholder: 'Lim inn din Connectivity API key', type: 'password', helpText: 'Søk om tilgang via Booking.com Connectivity Partner Program' },
    ],
    helpUrl: 'https://connect.booking.com/',
    helpLabel: 'Hvordan får jeg API-tilgang?',
    usedFor: ['Reservasjoner', 'Prissynkronisering', 'Tilgjengelighet'],
  },
  {
    service: 'airbnb',
    name: 'Airbnb',
    description: 'Administrer Airbnb-oppføringer, kalender og gjester.',
    icon: '🏡',
    color: '#ff385c',
    category: 'Reiseliv & Overnatting',
    fields: [
      { key: 'ical_url', label: 'iCal-lenke', placeholder: 'Lim inn din Airbnb iCal-URL', type: 'text', helpText: 'Finner du i Airbnb under Oppføring → Tilgjengelighet → Eksporter kalender' },
    ],
    helpUrl: 'https://www.airbnb.com/help/article/99',
    helpLabel: 'Hvordan eksporterer jeg Airbnb-kalenderen?',
    usedFor: ['Kalendersynkronisering', 'Bookingstyring', 'Gjestkommunikasjon'],
  },
  {
    service: 'visbook',
    name: 'Visbook',
    description: 'Booking og eiendomsstyring for norske overnattingsbedrifter.',
    icon: '🛏️',
    color: '#059669',
    category: 'Reiseliv & Overnatting',
    fields: [
      { key: 'api_key', label: 'API-nøkkel', placeholder: 'Lim inn din Visbook API-nøkkel', type: 'password' },
      { key: 'property_id', label: 'Eiendom-ID', placeholder: 'Din Visbook eiendom-ID', type: 'text' },
    ],
    helpUrl: 'https://www.visbook.com/',
    helpLabel: 'Hvordan får jeg API-tilgang?',
    usedFor: ['Bookingstyring', 'Channel manager', 'Gjestehåndtering'],
  },
  {
    service: 'tripadvisor',
    name: 'TripAdvisor',
    description: 'Synkroniser anmeldelser og oppføringsinformasjon.',
    icon: '🦉',
    color: '#34e0a1',
    category: 'Reiseliv & Overnatting',
    fields: [
      { key: 'api_key', label: 'API Key', placeholder: 'Lim inn din TripAdvisor API key', type: 'password', helpText: 'Søk om tilgang via TripAdvisor Content API' },
      { key: 'location_id', label: 'Location ID', placeholder: 'Din TripAdvisor location ID', type: 'text' },
    ],
    helpUrl: 'https://tripadvisor-content-api.readme.io/',
    helpLabel: 'Hvordan får jeg API-tilgang?',
    usedFor: ['Anmeldelser', 'Oppføringssynkronisering', 'Omdømmehåndtering'],
  },
]

/* ------------------------------------------------------------------ */
/*  Map automation types → required integrations                       */
/* ------------------------------------------------------------------ */

const automationToIntegrations: Record<string, string[]> = {
  // Felles
  'fakturering':            ['vipps', 'tripletex', 'fiken'],
  'betalingspåminnelser':   ['vipps'],
  'regnskap':               ['tripletex', 'fiken'],
  'booking':                ['google_calendar', 'outlook'],
  'møtepåminnelser':        ['google_calendar', 'outlook'],
  'kundesynkronisering':    ['tripletex', 'fiken', 'hubspot'],
  'sms-varsler':            ['twilio'],
  'e-post-automatisering':  ['sendgrid'],
  'crm':                    ['hubspot'],
  // Bygg & Håndverk
  'prosjektstyring':        ['bygglet', 'fonn'],
  'kvalitetssikring':       ['fonn'],
  'tidsregistrering':       ['bygglet'],
  // Eiendomsmegling
  'eiendomsannonser':       ['vitec_next', 'finn_eiendom'],
  'e-signering':            ['signicat'],
  'visninger':              ['vitec_next', 'google_calendar'],
  // Salong & Skjønnhet
  'salongbooking':          ['timely', 'fixit'],
  'pos-betaling':           ['square'],
  'kundebehandling-salong': ['timely', 'fixit'],
  // Bilverksted & Bilforhandler
  'teknisk-oppslag':        ['autodata', 'infomedia'],
  'bilannonser':            ['finn_bil'],
  'serviceplanlegging':     ['autodata', 'google_calendar'],
  // Reiseliv & Overnatting
  'channel-manager':        ['booking_com', 'airbnb', 'visbook'],
  'gjestehåndtering':       ['visbook', 'booking_com'],
  'anmeldelser':            ['tripadvisor'],
  'overnattingsbooking':    ['booking_com', 'airbnb', 'visbook'],
}

/* ------------------------------------------------------------------ */
/*  Categories for display                                             */
/* ------------------------------------------------------------------ */

const categories = [
  'Felles',
  'Bygg & Håndverk',
  'Eiendomsmegling',
  'Salong & Skjønnhet',
  'Bilverksted & Bilforhandler',
  'Reiseliv & Overnatting',
]

const categoryIcons: Record<string, string> = {
  'Felles': '⚡',
  'Bygg & Håndverk': '🏗️',
  'Eiendomsmegling': '🏠',
  'Salong & Skjønnhet': '💇',
  'Bilverksted & Bilforhandler': '🚗',
  'Reiseliv & Overnatting': '🏨',
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function IntegrationsPage() {
  const [purchasedAutomations, setPurchasedAutomations] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Production: fetch from Supabase automations table
    // const { data } = await supabase.from('automations').select('name').eq('customer_id', userId)
    setTimeout(() => {
      setPurchasedAutomations([
        // DEMO: uncomment to simulate purchased automations
        // 'fakturering',
        // 'booking',
        // 'salongbooking',
        // 'channel-manager',
      ])
      setLoading(false)
    }, 500)
  }, [])

  // Determine which integrations to show based on purchases
  const requiredServices = new Set<string>()
  purchasedAutomations.forEach(auto => {
    const services = automationToIntegrations[auto] || []
    services.forEach(s => requiredServices.add(s))
  })
  const activeIntegrations = allIntegrations.filter(i => requiredServices.has(i.service))

  // State per integration
  const [integrationState, setIntegrationState] = useState<Record<string, {
    fields: Record<string, string>
    status: 'pending' | 'connected' | 'error'
    showSecrets: Record<string, boolean>
    saving: boolean
    saved: boolean
  }>>({})

  useEffect(() => {
    const newState: typeof integrationState = {}
    activeIntegrations.forEach(i => {
      newState[i.service] = integrationState[i.service] || {
        fields: Object.fromEntries(i.fields.map(f => [f.key, ''])),
        status: 'pending' as const,
        showSecrets: {},
        saving: false,
        saved: false,
      }
    })
    setIntegrationState(newState)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchasedAutomations])

  const updateField = (service: string, key: string, value: string) => {
    setIntegrationState(prev => ({
      ...prev,
      [service]: { ...prev[service], fields: { ...prev[service].fields, [key]: value }, saved: false },
    }))
  }

  const toggleSecret = (service: string, key: string) => {
    setIntegrationState(prev => ({
      ...prev,
      [service]: { ...prev[service], showSecrets: { ...prev[service].showSecrets, [key]: !prev[service].showSecrets[key] } },
    }))
  }

  const handleSave = (service: string) => {
    const state = integrationState[service]
    const def = allIntegrations.find(i => i.service === service)!
    const allFilled = def.fields.every(f => state.fields[f.key]?.trim())
    setIntegrationState(prev => ({ ...prev, [service]: { ...prev[service], saving: true } }))
    setTimeout(() => {
      setIntegrationState(prev => ({
        ...prev,
        [service]: { ...prev[service], saving: false, saved: true, status: allFilled ? 'connected' : 'pending' },
      }))
    }, 1000)
  }

  const handleDisconnect = (service: string) => {
    const def = allIntegrations.find(i => i.service === service)!
    setIntegrationState(prev => ({
      ...prev,
      [service]: { fields: Object.fromEntries(def.fields.map(f => [f.key, ''])), status: 'pending', showSecrets: {}, saving: false, saved: false },
    }))
  }

  const statusBadge = (status: string) => {
    if (status === 'connected') return { bg: 'rgba(74,222,128,0.12)', color: '#4ade80', icon: CheckCircle2, label: 'Tilkoblet' }
    if (status === 'error') return { bg: 'rgba(248,113,113,0.12)', color: '#f87171', icon: AlertCircle, label: 'Feil' }
    return { bg: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', icon: Clock, label: 'Venter på oppsett' }
  }

  const connectedCount = Object.values(integrationState).filter(s => s.status === 'connected').length

  // Filter integrations in empty state by search
  const filteredAllIntegrations = searchQuery
    ? allIntegrations.filter(i =>
        i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allIntegrations

  /* ---- Loading ---- */
  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300, fontFamily: fonts.body }}>
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>Laster integrasjoner...</div>
      </div>
    )
  }

  /* ---- Empty state: no purchased automations ---- */
  if (activeIntegrations.length === 0) {
    return (
      <div style={{ maxWidth: 700, margin: '0 auto', fontFamily: fonts.body, paddingTop: 40 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%', margin: '0 auto 20px',
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Lock size={28} color="rgba(255,255,255,0.15)" />
          </div>
          <h2 style={{ color: '#f0f0f0', fontSize: 22, fontWeight: 700, marginBottom: 8, fontFamily: fonts.body }}>
            Ingen integrasjoner ennå
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, lineHeight: 1.6, maxWidth: 480, margin: '0 auto' }}>
            Integrasjoner blir tilgjengelige etter at du har kjøpt en automatiseringspakke.
            Velg en automatisering, og det relevante oppsettet dukker opp her automatisk.
          </p>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 20 }}>
          <Search size={16} color="rgba(255,255,255,0.25)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Søk i integrasjoner..."
            style={{
              width: '100%', padding: '10px 14px 10px 40px',
              borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)', color: '#f0f0f0', fontSize: 13,
              outline: 'none', fontFamily: fonts.body, boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Grouped integrations */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 14, overflow: 'hidden',
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
              {searchQuery ? `${filteredAllIntegrations.length} treff` : `${allIntegrations.length} tilgjengelige integrasjoner`}
            </span>
          </div>

          {categories.map(cat => {
            const catIntegrations = filteredAllIntegrations.filter(i => i.category === cat)
            if (catIntegrations.length === 0) return null
            return (
              <div key={cat}>
                <div style={{
                  padding: '10px 20px',
                  background: 'rgba(255,255,255,0.02)',
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span style={{ fontSize: 14 }}>{categoryIcons[cat]}</span>
                  <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, fontWeight: 600 }}>{cat}</span>
                </div>
                {catIntegrations.map(integ => (
                  <div key={integ.service} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 20px',
                    borderBottom: '1px solid rgba(255,255,255,0.03)',
                    opacity: 0.55,
                  }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: 8,
                      background: `${integ.color}10`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16, flexShrink: 0,
                    }}>
                      {integ.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 600 }}>{integ.name}</div>
                      <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>{integ.description}</div>
                    </div>
                    <Lock size={13} color="rgba(255,255,255,0.12)" />
                  </div>
                ))}
              </div>
            )
          })}

          <div style={{
            padding: '14px 20px',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <ShoppingCart size={14} color="rgba(255,255,255,0.25)" />
            <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>
              Kjøp en automatisering for å låse opp integrasjoner
            </span>
          </div>
        </div>

        {/* Contact */}
        <div style={{
          marginTop: 20, padding: '14px 20px',
          background: `rgba(${goldRgb},0.04)`,
          borderRadius: 10, border: `1px solid rgba(${goldRgb},0.08)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <Package size={14} color={gold} />
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
            Usikker på hva du trenger?{' '}
            <a href="mailto:support@arxon.no" style={{ color: gold, textDecoration: 'none', fontWeight: 600 }}>Kontakt oss</a>
            {' '}for en gratis kartlegging.
          </span>
        </div>
      </div>
    )
  }

  /* ---- Active integrations (post-purchase) ---- */
  return (
    <div style={{ maxWidth: 800, fontFamily: fonts.body }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, margin: 0 }}>
          Fullfør oppsettet for å aktivere dine kjøpte automatiseringer
        </p>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 14px', borderRadius: 20,
          background: connectedCount === activeIntegrations.length && connectedCount > 0
            ? 'rgba(74,222,128,0.08)' : 'rgba(255,255,255,0.04)',
          border: '1px solid ' + (connectedCount === activeIntegrations.length && connectedCount > 0
            ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.06)'),
        }}>
          <Link2 size={14} color={connectedCount === activeIntegrations.length && connectedCount > 0 ? '#4ade80' : 'rgba(255,255,255,0.3)'} />
          <span style={{
            fontSize: 13, fontWeight: 600,
            color: connectedCount === activeIntegrations.length && connectedCount > 0 ? '#4ade80' : 'rgba(255,255,255,0.4)',
          }}>
            {connectedCount}/{activeIntegrations.length} tilkoblet
          </span>
        </div>
      </div>

      <div style={{
        background: `rgba(${goldRgb},0.04)`,
        border: `1px solid rgba(${goldRgb},0.1)`,
        borderRadius: 12, padding: '16px 20px', marginBottom: 24,
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <Shield size={20} color={gold} style={{ flexShrink: 0 }} />
        <div>
          <div style={{ color: '#f0f0f0', fontSize: 13, fontWeight: 600, marginBottom: 2 }}>Trygt og kryptert</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
            API-nøklene dine lagres kryptert og brukes kun av Arxon for å koble til tjenestene dine. Vi deler aldri nøklene med tredjeparter.
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {activeIntegrations.map(integ => {
          const state = integrationState[integ.service]
          if (!state) return null
          const badge = statusBadge(state.status)
          const BadgeIcon = badge.icon
          const allFilled = integ.fields.every(f => state.fields[f.key]?.trim())
          const relatedAutomations = purchasedAutomations.filter(auto =>
            (automationToIntegrations[auto] || []).includes(integ.service)
          )

          return (
            <div key={integ.service} style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${state.status === 'connected' ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.06)'}`,
              borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.3s',
            }}>
              <div style={{
                padding: '18px 20px',
                display: 'flex', alignItems: 'center', gap: 14,
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: `${integ.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, flexShrink: 0,
                }}>
                  {integ.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#f0f0f0', fontSize: 16, fontWeight: 600 }}>{integ.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>{integ.description}</div>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '5px 12px', borderRadius: 20, background: badge.bg, flexShrink: 0,
                }}>
                  <BadgeIcon size={14} color={badge.color} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: badge.color }}>{badge.label}</span>
                </div>
              </div>

              <div style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: 500, display: 'flex', alignItems: 'center', marginRight: 4 }}>
                    Kreves for:
                  </span>
                  {relatedAutomations.map((auto, i) => (
                    <span key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      padding: '3px 10px', borderRadius: 12, fontSize: 11,
                      background: `rgba(${goldRgb},0.06)`, color: gold, textTransform: 'capitalize',
                    }}>
                      <Zap size={10} /> {auto}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {integ.fields.map(field => (
                    <div key={field.key}>
                      <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 500, marginBottom: 5 }}>
                        {field.label}
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type={field.type === 'password' && !state.showSecrets[field.key] ? 'password' : 'text'}
                          value={state.fields[field.key]}
                          onChange={e => updateField(integ.service, field.key, e.target.value)}
                          placeholder={field.placeholder}
                          disabled={state.status === 'connected'}
                          style={{
                            width: '100%', padding: '10px 50px 10px 14px',
                            borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)',
                            background: state.status === 'connected' ? 'rgba(74,222,128,0.04)' : 'rgba(255,255,255,0.03)',
                            color: '#f0f0f0', fontSize: 13, outline: 'none',
                            fontFamily: field.type === 'password' && !state.showSecrets[field.key] ? 'monospace' : fonts.body,
                            boxSizing: 'border-box', opacity: state.status === 'connected' ? 0.6 : 1,
                          }}
                        />
                        {field.type === 'password' && (
                          <button onClick={() => toggleSecret(integ.service, field.key)} style={{
                            position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                            background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                            color: 'rgba(255,255,255,0.3)',
                          }}>
                            {state.showSecrets[field.key] ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                        )}
                      </div>
                      {field.helpText && (
                        <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, marginTop: 4 }}>{field.helpText}</div>
                      )}
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, gap: 12 }}>
                  <a href={integ.helpUrl} target="_blank" rel="noopener noreferrer" style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    color: 'rgba(255,255,255,0.35)', fontSize: 12, textDecoration: 'none',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = gold}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
                  >
                    <ExternalLink size={12} />
                    {integ.helpLabel}
                  </a>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {state.status === 'connected' && (
                      <button onClick={() => handleDisconnect(integ.service)} style={{
                        padding: '8px 16px', borderRadius: 8,
                        background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)',
                        color: '#f87171', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: fonts.body,
                      }}>
                        Koble fra
                      </button>
                    )}
                    {state.status !== 'connected' && (
                      <button
                        onClick={() => handleSave(integ.service)}
                        disabled={!allFilled || state.saving}
                        style={{
                          padding: '8px 20px', borderRadius: 8, border: 'none',
                          background: !allFilled ? 'rgba(255,255,255,0.06)' : state.saved ? '#4ade80' : `linear-gradient(135deg, ${gold}, #d4a85a)`,
                          color: !allFilled ? 'rgba(255,255,255,0.2)' : state.saved ? '#fff' : '#0f1b27',
                          fontSize: 13, fontWeight: 600,
                          cursor: allFilled && !state.saving ? 'pointer' : 'not-allowed',
                          fontFamily: fonts.body, display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s',
                        }}
                      >
                        {state.saving ? 'Kobler til...' : state.saved ? <><Check size={14} /> Tilkoblet</> : <><Link2 size={14} /> Koble til</>}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{
        marginTop: 24, padding: '16px 20px',
        background: 'rgba(255,255,255,0.02)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.04)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <Zap size={16} color="rgba(255,255,255,0.3)" />
        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>
          Trenger du hjelp med oppsett?{' '}
          <a href="mailto:support@arxon.no" style={{ color: gold, textDecoration: 'none' }}>Kontakt oss</a>
          {' '}— vi hjelper deg med å finne riktige API-nøkler.
        </div>
      </div>
    </div>
  )
}
