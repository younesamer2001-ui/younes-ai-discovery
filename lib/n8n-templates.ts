/* ============================================================
   Arxon AI – n8n Workflow Template Registry
   Maps automation keys → n8n workflow templates with versioning.
   Each template includes:
   - The n8n JSON definition
   - Required integrations
   - Version history
   ============================================================ */

export interface TemplateDefinition {
  automation_key: string
  version: number
  name: string
  description: string
  required_services: string[]
  category: string
  /** Estimated manual minutes saved per execution */
  minutes_saved: number
  /** n8n workflow JSON (simplified – full JSON imported at deploy time) */
  n8n_skeleton: {
    nodes: Array<{
      name: string
      type: string
      position: [number, number]
      parameters: Record<string, unknown>
      credentials?: Record<string, string>
    }>
    connections: Record<string, unknown>
    settings?: Record<string, unknown>
  }
}

// ---- Template Definitions ----

export const templateRegistry: TemplateDefinition[] = [
  /* ===== BOOKING & AVTALER ===== */
  {
    automation_key: 'booking',
    version: 1,
    name: 'Automatisk Booking',
    description: 'AI-telefonsvarer som sjekker ledig tid og booker time automatisk',
    required_services: ['google_calendar'],
    category: 'Booking & Avtaler',
    minutes_saved: 8,
    n8n_skeleton: {
      nodes: [
        { name: 'Webhook', type: 'n8n-nodes-base.webhook', position: [0, 0], parameters: { path: 'booking-webhook' } },
        { name: 'Check Availability', type: 'n8n-nodes-base.googleCalendar', position: [200, 0], parameters: { operation: 'getAll' }, credentials: { googleCalendarOAuth2Api: '{{google_calendar}}' } },
        { name: 'Create Event', type: 'n8n-nodes-base.googleCalendar', position: [400, 0], parameters: { operation: 'create' }, credentials: { googleCalendarOAuth2Api: '{{google_calendar}}' } },
        { name: 'Send Confirmation', type: 'n8n-nodes-base.twilio', position: [600, 0], parameters: { operation: 'send' } },
      ],
      connections: { 'Webhook': { main: [[{ node: 'Check Availability', type: 'main', index: 0 }]] }, 'Check Availability': { main: [[{ node: 'Create Event', type: 'main', index: 0 }]] }, 'Create Event': { main: [[{ node: 'Send Confirmation', type: 'main', index: 0 }]] } },
    },
  },

  {
    automation_key: 'sms-paminnelse',
    version: 1,
    name: 'SMS-påminnelser',
    description: 'Automatisk SMS-påminnelse før avtaler',
    required_services: ['google_calendar'],
    category: 'Booking & Avtaler',
    minutes_saved: 3,
    n8n_skeleton: {
      nodes: [
        { name: 'Schedule', type: 'n8n-nodes-base.scheduleTrigger', position: [0, 0], parameters: { rule: { interval: [{ field: 'hours', hoursInterval: 1 }] } } },
        { name: 'Get Upcoming', type: 'n8n-nodes-base.googleCalendar', position: [200, 0], parameters: { operation: 'getAll' }, credentials: { googleCalendarOAuth2Api: '{{google_calendar}}' } },
        { name: 'Filter Tomorrow', type: 'n8n-nodes-base.filter', position: [400, 0], parameters: {} },
        { name: 'Send SMS', type: 'n8n-nodes-base.twilio', position: [600, 0], parameters: { operation: 'send' } },
      ],
      connections: { 'Schedule': { main: [[{ node: 'Get Upcoming', type: 'main', index: 0 }]] }, 'Get Upcoming': { main: [[{ node: 'Filter Tomorrow', type: 'main', index: 0 }]] }, 'Filter Tomorrow': { main: [[{ node: 'Send SMS', type: 'main', index: 0 }]] } },
    },
  },

  /* ===== LEADS & SALG ===== */
  {
    automation_key: 'lead-scraping',
    version: 1,
    name: 'Automatisk Lead-innhenting',
    description: 'Henter nye leads fra Finn.no, Google Maps og andre kilder',
    required_services: ['finn_generell', 'google_maps', 'hubspot'],
    category: 'Leads & Salg',
    minutes_saved: 30,
    n8n_skeleton: {
      nodes: [
        { name: 'Schedule', type: 'n8n-nodes-base.scheduleTrigger', position: [0, 0], parameters: { rule: { interval: [{ field: 'days', daysInterval: 1 }] } } },
        { name: 'Scrape Finn', type: 'n8n-nodes-base.httpRequest', position: [200, 0], parameters: { url: 'https://api.arxon.no/scrape/finn' } },
        { name: 'Scrape Maps', type: 'n8n-nodes-base.httpRequest', position: [200, 200], parameters: { url: 'https://api.arxon.no/scrape/google-maps' } },
        { name: 'Merge', type: 'n8n-nodes-base.merge', position: [400, 100], parameters: {} },
        { name: 'Deduplicate', type: 'n8n-nodes-base.removeDuplicates', position: [600, 100], parameters: {} },
        { name: 'Push to CRM', type: 'n8n-nodes-base.hubspot', position: [800, 100], parameters: { operation: 'create' }, credentials: { hubspotApi: '{{hubspot}}' } },
      ],
      connections: { 'Schedule': { main: [[{ node: 'Scrape Finn', type: 'main', index: 0 }, { node: 'Scrape Maps', type: 'main', index: 0 }]] }, 'Scrape Finn': { main: [[{ node: 'Merge', type: 'main', index: 0 }]] }, 'Scrape Maps': { main: [[{ node: 'Merge', type: 'main', index: 1 }]] }, 'Merge': { main: [[{ node: 'Deduplicate', type: 'main', index: 0 }]] }, 'Deduplicate': { main: [[{ node: 'Push to CRM', type: 'main', index: 0 }]] } },
    },
  },

  /* ===== ØKONOMI & FAKTURA ===== */
  {
    automation_key: 'fakturering',
    version: 1,
    name: 'Automatisk Fakturering',
    description: 'Oppretter og sender fakturaer automatisk etter utført jobb',
    required_services: ['tripletex', 'vipps'],
    category: 'Økonomi & Faktura',
    minutes_saved: 15,
    n8n_skeleton: {
      nodes: [
        { name: 'Webhook', type: 'n8n-nodes-base.webhook', position: [0, 0], parameters: { path: 'invoice-trigger' } },
        { name: 'Create Invoice', type: 'n8n-nodes-base.httpRequest', position: [200, 0], parameters: { method: 'POST', url: 'https://tripletex.no/v2/invoice' }, credentials: { httpBasicAuth: '{{tripletex}}' } },
        { name: 'Send Vipps', type: 'n8n-nodes-base.httpRequest', position: [400, 0], parameters: { method: 'POST', url: 'https://api.vipps.no/epayment/v1/payments' }, credentials: { httpHeaderAuth: '{{vipps}}' } },
        { name: 'Notify Customer', type: 'n8n-nodes-base.twilio', position: [600, 0], parameters: { operation: 'send' } },
      ],
      connections: { 'Webhook': { main: [[{ node: 'Create Invoice', type: 'main', index: 0 }]] }, 'Create Invoice': { main: [[{ node: 'Send Vipps', type: 'main', index: 0 }]] }, 'Send Vipps': { main: [[{ node: 'Notify Customer', type: 'main', index: 0 }]] } },
    },
  },

  /* ===== MARKEDSFØRING ===== */
  {
    automation_key: 'some-posting',
    version: 1,
    name: 'Automatisk SoMe-posting',
    description: 'AI lager innhold og poster på Facebook, Instagram og LinkedIn',
    required_services: ['meta', 'linkedin'],
    category: 'Markedsføring',
    minutes_saved: 20,
    n8n_skeleton: {
      nodes: [
        { name: 'Schedule', type: 'n8n-nodes-base.scheduleTrigger', position: [0, 0], parameters: { rule: { interval: [{ field: 'days', daysInterval: 1 }] } } },
        { name: 'AI Generate', type: 'n8n-nodes-base.httpRequest', position: [200, 0], parameters: { url: 'https://api.arxon.no/ai/generate-post' } },
        { name: 'Post Meta', type: 'n8n-nodes-base.httpRequest', position: [400, -100], parameters: { method: 'POST' }, credentials: { httpHeaderAuth: '{{meta}}' } },
        { name: 'Post LinkedIn', type: 'n8n-nodes-base.httpRequest', position: [400, 100], parameters: { method: 'POST' }, credentials: { httpHeaderAuth: '{{linkedin}}' } },
      ],
      connections: { 'Schedule': { main: [[{ node: 'AI Generate', type: 'main', index: 0 }]] }, 'AI Generate': { main: [[{ node: 'Post Meta', type: 'main', index: 0 }, { node: 'Post LinkedIn', type: 'main', index: 0 }]] } },
    },
  },

  {
    automation_key: 'epost-kampanje',
    version: 1,
    name: 'Automatisk E-postkampanje',
    description: 'Segmenterte nyhetsbrev og drip-kampanjer',
    required_services: ['mailchimp'],
    category: 'Markedsføring',
    minutes_saved: 25,
    n8n_skeleton: {
      nodes: [
        { name: 'Schedule', type: 'n8n-nodes-base.scheduleTrigger', position: [0, 0], parameters: { rule: { interval: [{ field: 'weeks', weeksInterval: 1 }] } } },
        { name: 'Get Segments', type: 'n8n-nodes-base.mailchimp', position: [200, 0], parameters: { operation: 'getAll', resource: 'listGroup' }, credentials: { mailchimpApi: '{{mailchimp}}' } },
        { name: 'AI Content', type: 'n8n-nodes-base.httpRequest', position: [400, 0], parameters: { url: 'https://api.arxon.no/ai/generate-email' } },
        { name: 'Send Campaign', type: 'n8n-nodes-base.mailchimp', position: [600, 0], parameters: { operation: 'send', resource: 'campaign' }, credentials: { mailchimpApi: '{{mailchimp}}' } },
      ],
      connections: { 'Schedule': { main: [[{ node: 'Get Segments', type: 'main', index: 0 }]] }, 'Get Segments': { main: [[{ node: 'AI Content', type: 'main', index: 0 }]] }, 'AI Content': { main: [[{ node: 'Send Campaign', type: 'main', index: 0 }]] } },
    },
  },

  /* ===== RAPPORTERING ===== */
  {
    automation_key: 'kpi-rapporter',
    version: 1,
    name: 'Automatiske KPI-rapporter',
    description: 'Ukentlige/månedlige KPI-rapporter sendt til Slack eller e-post',
    required_services: ['slack', 'tripletex'],
    category: 'Rapportering',
    minutes_saved: 45,
    n8n_skeleton: {
      nodes: [
        { name: 'Schedule', type: 'n8n-nodes-base.scheduleTrigger', position: [0, 0], parameters: { rule: { interval: [{ field: 'weeks', weeksInterval: 1 }] } } },
        { name: 'Fetch Revenue', type: 'n8n-nodes-base.httpRequest', position: [200, 0], parameters: { url: 'https://tripletex.no/v2/ledger' }, credentials: { httpBasicAuth: '{{tripletex}}' } },
        { name: 'AI Analyze', type: 'n8n-nodes-base.httpRequest', position: [400, 0], parameters: { url: 'https://api.arxon.no/ai/kpi-analysis' } },
        { name: 'Send to Slack', type: 'n8n-nodes-base.slack', position: [600, 0], parameters: { operation: 'send', channel: '#rapporter' }, credentials: { slackApi: '{{slack}}' } },
      ],
      connections: { 'Schedule': { main: [[{ node: 'Fetch Revenue', type: 'main', index: 0 }]] }, 'Fetch Revenue': { main: [[{ node: 'AI Analyze', type: 'main', index: 0 }]] }, 'AI Analyze': { main: [[{ node: 'Send to Slack', type: 'main', index: 0 }]] } },
    },
  },

  /* ===== KUNDEOPPFØLGING ===== */
  {
    automation_key: 'kundeoppfolging',
    version: 1,
    name: 'Automatisk Kundeoppfølging',
    description: 'Følg opp kunder automatisk etter kjøp, besøk eller behandling',
    required_services: ['hubspot'],
    category: 'Kundeoppfølging',
    minutes_saved: 10,
    n8n_skeleton: {
      nodes: [
        { name: 'Schedule', type: 'n8n-nodes-base.scheduleTrigger', position: [0, 0], parameters: { rule: { interval: [{ field: 'days', daysInterval: 1 }] } } },
        { name: 'Get Due Followups', type: 'n8n-nodes-base.hubspot', position: [200, 0], parameters: { operation: 'search', resource: 'contact' }, credentials: { hubspotApi: '{{hubspot}}' } },
        { name: 'AI Personalize', type: 'n8n-nodes-base.httpRequest', position: [400, 0], parameters: { url: 'https://api.arxon.no/ai/personalize-followup' } },
        { name: 'Send SMS', type: 'n8n-nodes-base.twilio', position: [600, 0], parameters: { operation: 'send' } },
      ],
      connections: { 'Schedule': { main: [[{ node: 'Get Due Followups', type: 'main', index: 0 }]] }, 'Get Due Followups': { main: [[{ node: 'AI Personalize', type: 'main', index: 0 }]] }, 'AI Personalize': { main: [[{ node: 'Send SMS', type: 'main', index: 0 }]] } },
    },
  },

  /* ===== ANMELDELSER ===== */
  {
    automation_key: 'anmeldelse-foresporsler',
    version: 1,
    name: 'Automatiske Anmeldelses-forespørsler',
    description: 'Ber kunder om Google-anmeldelse etter besøk',
    required_services: ['google_business'],
    category: 'Kundeoppfølging',
    minutes_saved: 5,
    n8n_skeleton: {
      nodes: [
        { name: 'Webhook', type: 'n8n-nodes-base.webhook', position: [0, 0], parameters: { path: 'review-request' } },
        { name: 'Delay', type: 'n8n-nodes-base.wait', position: [200, 0], parameters: { amount: 24, unit: 'hours' } },
        { name: 'Send SMS', type: 'n8n-nodes-base.twilio', position: [400, 0], parameters: { operation: 'send' } },
      ],
      connections: { 'Webhook': { main: [[{ node: 'Delay', type: 'main', index: 0 }]] }, 'Delay': { main: [[{ node: 'Send SMS', type: 'main', index: 0 }]] } },
    },
  },

  /* ===== BRANSJE-SPESIFIKKE ===== */
  {
    automation_key: 'salongbooking',
    version: 1,
    name: 'Salong Booking System',
    description: 'AI-booking for salong med Timely/Fixit-integrasjon',
    required_services: ['timely', 'google_calendar'],
    category: 'Salong & Skjønnhet',
    minutes_saved: 8,
    n8n_skeleton: {
      nodes: [
        { name: 'Webhook', type: 'n8n-nodes-base.webhook', position: [0, 0], parameters: { path: 'salon-booking' } },
        { name: 'Check Timely', type: 'n8n-nodes-base.httpRequest', position: [200, 0], parameters: { url: 'https://api.gettimely.com/availability' }, credentials: { httpHeaderAuth: '{{timely}}' } },
        { name: 'Create Booking', type: 'n8n-nodes-base.httpRequest', position: [400, 0], parameters: { method: 'POST', url: 'https://api.gettimely.com/bookings' }, credentials: { httpHeaderAuth: '{{timely}}' } },
        { name: 'Confirm SMS', type: 'n8n-nodes-base.twilio', position: [600, 0], parameters: { operation: 'send' } },
      ],
      connections: { 'Webhook': { main: [[{ node: 'Check Timely', type: 'main', index: 0 }]] }, 'Check Timely': { main: [[{ node: 'Create Booking', type: 'main', index: 0 }]] }, 'Create Booking': { main: [[{ node: 'Confirm SMS', type: 'main', index: 0 }]] } },
    },
  },

  {
    automation_key: 'channel-manager',
    version: 1,
    name: 'Channel Manager Sync',
    description: 'Synkroniser priser og tilgjengelighet på tvers av Booking.com, Airbnb og Visbook',
    required_services: ['booking_com', 'airbnb', 'visbook'],
    category: 'Reiseliv & Overnatting',
    minutes_saved: 12,
    n8n_skeleton: {
      nodes: [
        { name: 'Schedule', type: 'n8n-nodes-base.scheduleTrigger', position: [0, 0], parameters: { rule: { interval: [{ field: 'minutes', minutesInterval: 15 }] } } },
        { name: 'Get Visbook', type: 'n8n-nodes-base.httpRequest', position: [200, 0], parameters: { url: 'https://api.visbook.com/availability' }, credentials: { httpHeaderAuth: '{{visbook}}' } },
        { name: 'Sync Booking.com', type: 'n8n-nodes-base.httpRequest', position: [400, -100], parameters: { method: 'PUT' }, credentials: { httpHeaderAuth: '{{booking_com}}' } },
        { name: 'Sync Airbnb', type: 'n8n-nodes-base.httpRequest', position: [400, 100], parameters: { method: 'PUT' }, credentials: { httpHeaderAuth: '{{airbnb}}' } },
      ],
      connections: { 'Schedule': { main: [[{ node: 'Get Visbook', type: 'main', index: 0 }]] }, 'Get Visbook': { main: [[{ node: 'Sync Booking.com', type: 'main', index: 0 }, { node: 'Sync Airbnb', type: 'main', index: 0 }]] } },
    },
  },

  {
    automation_key: 'verksted-deler',
    version: 1,
    name: 'Automatisk Delebestilling',
    description: 'Sjekk deler via Autodata/Infomedia og bestill automatisk',
    required_services: ['autodata', 'infomedia'],
    category: 'Bilverksted & Bilforhandler',
    minutes_saved: 25,
    n8n_skeleton: {
      nodes: [
        { name: 'Webhook', type: 'n8n-nodes-base.webhook', position: [0, 0], parameters: { path: 'parts-order' } },
        { name: 'Lookup Autodata', type: 'n8n-nodes-base.httpRequest', position: [200, 0], parameters: { url: 'https://api.autodata-group.com/parts' }, credentials: { httpHeaderAuth: '{{autodata}}' } },
        { name: 'Check Price', type: 'n8n-nodes-base.httpRequest', position: [400, 0], parameters: { url: 'https://api.infomedia.com/prices' }, credentials: { httpHeaderAuth: '{{infomedia}}' } },
        { name: 'Create Order', type: 'n8n-nodes-base.httpRequest', position: [600, 0], parameters: { method: 'POST' } },
        { name: 'Notify', type: 'n8n-nodes-base.twilio', position: [800, 0], parameters: { operation: 'send' } },
      ],
      connections: { 'Webhook': { main: [[{ node: 'Lookup Autodata', type: 'main', index: 0 }]] }, 'Lookup Autodata': { main: [[{ node: 'Check Price', type: 'main', index: 0 }]] }, 'Check Price': { main: [[{ node: 'Create Order', type: 'main', index: 0 }]] }, 'Create Order': { main: [[{ node: 'Notify', type: 'main', index: 0 }]] } },
    },
  },

  {
    automation_key: 'visningsbooking',
    version: 1,
    name: 'Automatisk Visningsbooking',
    description: 'AI-telefonsvarer og Finn.no-sync for eiendomsvisninger',
    required_services: ['finn_eiendom', 'vitec_next', 'google_calendar'],
    category: 'Eiendomsmegling',
    minutes_saved: 15,
    n8n_skeleton: {
      nodes: [
        { name: 'Webhook', type: 'n8n-nodes-base.webhook', position: [0, 0], parameters: { path: 'showing-booking' } },
        { name: 'Check Vitec', type: 'n8n-nodes-base.httpRequest', position: [200, 0], parameters: { url: 'https://api.vitec.net/properties' }, credentials: { httpHeaderAuth: '{{vitec_next}}' } },
        { name: 'Book Showing', type: 'n8n-nodes-base.googleCalendar', position: [400, 0], parameters: { operation: 'create' }, credentials: { googleCalendarOAuth2Api: '{{google_calendar}}' } },
        { name: 'Update Finn', type: 'n8n-nodes-base.httpRequest', position: [600, 0], parameters: { method: 'PUT' }, credentials: { httpHeaderAuth: '{{finn_eiendom}}' } },
        { name: 'Confirm SMS', type: 'n8n-nodes-base.twilio', position: [800, 0], parameters: { operation: 'send' } },
      ],
      connections: { 'Webhook': { main: [[{ node: 'Check Vitec', type: 'main', index: 0 }]] }, 'Check Vitec': { main: [[{ node: 'Book Showing', type: 'main', index: 0 }]] }, 'Book Showing': { main: [[{ node: 'Update Finn', type: 'main', index: 0 }]] }, 'Update Finn': { main: [[{ node: 'Confirm SMS', type: 'main', index: 0 }]] } },
    },
  },

  /* ===== ADMIN & DRIFT ===== */
  {
    automation_key: 'prosjektstyring',
    version: 1,
    name: 'Automatisk Prosjektstyring',
    description: 'Synk oppgaver mellom Trello/Asana og kalendere',
    required_services: ['trello', 'google_calendar'],
    category: 'Admin & Drift',
    minutes_saved: 15,
    n8n_skeleton: {
      nodes: [
        { name: 'Trello Trigger', type: 'n8n-nodes-base.trelloTrigger', position: [0, 0], parameters: {}, credentials: { trelloApi: '{{trello}}' } },
        { name: 'Create Event', type: 'n8n-nodes-base.googleCalendar', position: [200, 0], parameters: { operation: 'create' }, credentials: { googleCalendarOAuth2Api: '{{google_calendar}}' } },
        { name: 'Notify Slack', type: 'n8n-nodes-base.slack', position: [400, 0], parameters: { operation: 'send' }, credentials: { slackApi: '{{slack}}' } },
      ],
      connections: { 'Trello Trigger': { main: [[{ node: 'Create Event', type: 'main', index: 0 }]] }, 'Create Event': { main: [[{ node: 'Notify Slack', type: 'main', index: 0 }]] } },
    },
  },

  /* ===== COMPLIANCE ===== */
  {
    automation_key: 'gdpr-sletting',
    version: 1,
    name: 'GDPR Automatisk Sletting',
    description: 'Automatisk sletting av kundedata etter oppbevaringsperiode',
    required_services: ['hubspot', 'tripletex'],
    category: 'Compliance & GDPR',
    minutes_saved: 15,
    n8n_skeleton: {
      nodes: [
        { name: 'Schedule', type: 'n8n-nodes-base.scheduleTrigger', position: [0, 0], parameters: { rule: { interval: [{ field: 'days', daysInterval: 1 }] } } },
        { name: 'Find Expired', type: 'n8n-nodes-base.hubspot', position: [200, 0], parameters: { operation: 'search', resource: 'contact' }, credentials: { hubspotApi: '{{hubspot}}' } },
        { name: 'Delete CRM', type: 'n8n-nodes-base.hubspot', position: [400, 0], parameters: { operation: 'delete', resource: 'contact' }, credentials: { hubspotApi: '{{hubspot}}' } },
        { name: 'Delete Accounting', type: 'n8n-nodes-base.httpRequest', position: [400, 200], parameters: { method: 'DELETE' }, credentials: { httpBasicAuth: '{{tripletex}}' } },
        { name: 'Log Deletion', type: 'n8n-nodes-base.httpRequest', position: [600, 100], parameters: { method: 'POST', url: 'https://api.arxon.no/gdpr/log' } },
      ],
      connections: { 'Schedule': { main: [[{ node: 'Find Expired', type: 'main', index: 0 }]] }, 'Find Expired': { main: [[{ node: 'Delete CRM', type: 'main', index: 0 }, { node: 'Delete Accounting', type: 'main', index: 0 }]] }, 'Delete CRM': { main: [[{ node: 'Log Deletion', type: 'main', index: 0 }]] }, 'Delete Accounting': { main: [[{ node: 'Log Deletion', type: 'main', index: 0 }]] } },
    },
  },
]

// ---- Helper functions ----

/** Get the latest version of a template for an automation */
export function getLatestTemplate(automationKey: string): TemplateDefinition | undefined {
  return templateRegistry
    .filter(t => t.automation_key === automationKey)
    .sort((a, b) => b.version - a.version)[0]
}

/** Get all templates for an automation (version history) */
export function getTemplateVersions(automationKey: string): TemplateDefinition[] {
  return templateRegistry
    .filter(t => t.automation_key === automationKey)
    .sort((a, b) => b.version - a.version)
}

/** Get all unique automation keys that have templates */
export function getAvailableAutomations(): string[] {
  return [...new Set(templateRegistry.map(t => t.automation_key))]
}

/** Get required services for an automation */
export function getRequiredServices(automationKey: string): string[] {
  const template = getLatestTemplate(automationKey)
  return template?.required_services || []
}
