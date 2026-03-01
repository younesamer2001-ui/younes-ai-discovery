/* ============================================================
   Arxon AI – Integration API Key Validator
   Validates customer API keys before activating workflows.
   Each service has its own validation logic.
   ============================================================ */

import { ValidationResult } from './workflow-types'

// ---- Validation functions per service ----

type ValidatorFn = (credentials: Record<string, string>) => Promise<ValidationResult>

const makeResult = (service: string, valid: boolean, message: string): ValidationResult => ({
  service,
  valid,
  message,
  tested_at: new Date().toISOString(),
})

/* --- Vipps MobilePay --- */
const validateVipps: ValidatorFn = async (creds) => {
  const { client_id, client_secret, subscription_key } = creds
  if (!client_id || !client_secret || !subscription_key) {
    return makeResult('vipps', false, 'Mangler påkrevde felt (Client ID, Client Secret, Subscription Key)')
  }
  try {
    const res = await fetch('https://api.vipps.no/accesstoken/get', {
      method: 'POST',
      headers: {
        'client_id': client_id,
        'client_secret': client_secret,
        'Ocp-Apim-Subscription-Key': subscription_key,
      },
    })
    if (res.ok) return makeResult('vipps', true, 'Vipps-tilkobling verifisert')
    return makeResult('vipps', false, `Vipps avviste nøklene (HTTP ${res.status})`)
  } catch {
    return makeResult('vipps', false, 'Kunne ikke nå Vipps API – sjekk nettverkstilgang')
  }
}

/* --- Tripletex --- */
const validateTripletex: ValidatorFn = async (creds) => {
  const { employee_token, consumer_token } = creds
  if (!employee_token || !consumer_token) {
    return makeResult('tripletex', false, 'Mangler Employee Token eller Consumer Token')
  }
  try {
    const basic = Buffer.from(`0:${employee_token}`).toString('base64')
    const res = await fetch('https://tripletex.no/v2/token/session/:create?consumerToken=' + consumer_token + '&employeeToken=' + employee_token + '&expirationDate=2099-01-01', {
      method: 'PUT',
      headers: { 'Authorization': `Basic ${basic}` },
    })
    if (res.ok) return makeResult('tripletex', true, 'Tripletex-tilkobling verifisert')
    return makeResult('tripletex', false, `Tripletex avviste nøklene (HTTP ${res.status})`)
  } catch {
    return makeResult('tripletex', false, 'Kunne ikke nå Tripletex API')
  }
}

/* --- Fiken --- */
const validateFiken: ValidatorFn = async (creds) => {
  const { api_token } = creds
  if (!api_token) return makeResult('fiken', false, 'Mangler API-token')
  try {
    const res = await fetch('https://api.fiken.no/api/v2/user', {
      headers: { 'Authorization': `Bearer ${api_token}` },
    })
    if (res.ok) return makeResult('fiken', true, 'Fiken-tilkobling verifisert')
    return makeResult('fiken', false, `Fiken avviste tokenet (HTTP ${res.status})`)
  } catch {
    return makeResult('fiken', false, 'Kunne ikke nå Fiken API')
  }
}

/* --- Google Calendar --- */
const validateGoogleCalendar: ValidatorFn = async (creds) => {
  const { access_token } = creds
  if (!access_token) return makeResult('google_calendar', false, 'Mangler Access Token (OAuth)')
  try {
    const res = await fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList?maxResults=1', {
      headers: { 'Authorization': `Bearer ${access_token}` },
    })
    if (res.ok) return makeResult('google_calendar', true, 'Google Calendar-tilkobling verifisert')
    return makeResult('google_calendar', false, `Google Calendar avviste tokenet (HTTP ${res.status})`)
  } catch {
    return makeResult('google_calendar', false, 'Kunne ikke nå Google Calendar API')
  }
}

/* --- HubSpot --- */
const validateHubspot: ValidatorFn = async (creds) => {
  const { api_key } = creds
  if (!api_key) return makeResult('hubspot', false, 'Mangler API-nøkkel')
  try {
    const res = await fetch('https://api.hubapi.com/crm/v3/objects/contacts?limit=1', {
      headers: { 'Authorization': `Bearer ${api_key}` },
    })
    if (res.ok) return makeResult('hubspot', true, 'HubSpot-tilkobling verifisert')
    return makeResult('hubspot', false, `HubSpot avviste nøkkelen (HTTP ${res.status})`)
  } catch {
    return makeResult('hubspot', false, 'Kunne ikke nå HubSpot API')
  }
}

/* --- Slack --- */
const validateSlack: ValidatorFn = async (creds) => {
  const { bot_token } = creds
  if (!bot_token) return makeResult('slack', false, 'Mangler Bot Token')
  try {
    const res = await fetch('https://slack.com/api/auth.test', {
      headers: { 'Authorization': `Bearer ${bot_token}` },
    })
    const data = await res.json()
    if (data.ok) return makeResult('slack', true, `Slack verifisert (workspace: ${data.team})`)
    return makeResult('slack', false, `Slack-feil: ${data.error}`)
  } catch {
    return makeResult('slack', false, 'Kunne ikke nå Slack API')
  }
}

/* --- Stripe --- */
const validateStripe: ValidatorFn = async (creds) => {
  const { secret_key } = creds
  if (!secret_key) return makeResult('stripe', false, 'Mangler Secret Key')
  try {
    const res = await fetch('https://api.stripe.com/v1/balance', {
      headers: { 'Authorization': `Bearer ${secret_key}` },
    })
    if (res.ok) return makeResult('stripe', true, 'Stripe-tilkobling verifisert')
    return makeResult('stripe', false, `Stripe avviste nøkkelen (HTTP ${res.status})`)
  } catch {
    return makeResult('stripe', false, 'Kunne ikke nå Stripe API')
  }
}

/* --- Meta (Facebook/Instagram) --- */
const validateMeta: ValidatorFn = async (creds) => {
  const { access_token } = creds
  if (!access_token) return makeResult('meta', false, 'Mangler Access Token')
  try {
    const res = await fetch(`https://graph.facebook.com/v18.0/me?access_token=${access_token}`)
    if (res.ok) return makeResult('meta', true, 'Meta-tilkobling verifisert')
    return makeResult('meta', false, `Meta avviste tokenet (HTTP ${res.status})`)
  } catch {
    return makeResult('meta', false, 'Kunne ikke nå Meta Graph API')
  }
}

/* --- Mailchimp --- */
const validateMailchimp: ValidatorFn = async (creds) => {
  const { api_key } = creds
  if (!api_key) return makeResult('mailchimp', false, 'Mangler API-nøkkel')
  const dc = api_key.split('-').pop() || 'us1'
  try {
    const res = await fetch(`https://${dc}.api.mailchimp.com/3.0/ping`, {
      headers: { 'Authorization': `Bearer ${api_key}` },
    })
    if (res.ok) return makeResult('mailchimp', true, 'Mailchimp-tilkobling verifisert')
    return makeResult('mailchimp', false, `Mailchimp avviste nøkkelen (HTTP ${res.status})`)
  } catch {
    return makeResult('mailchimp', false, 'Kunne ikke nå Mailchimp API')
  }
}

/* --- Generic validator (checks if all required fields are present) --- */
const validateGeneric = (service: string): ValidatorFn => async (creds) => {
  const hasValues = Object.values(creds).every(v => v && v.trim().length > 0)
  if (!hasValues) return makeResult(service, false, 'Alle felt må fylles ut')
  return makeResult(service, true, `${service}-nøkler lagret (manuell verifisering anbefalt)`)
}

// ---- Registry ----

const validators: Record<string, ValidatorFn> = {
  vipps: validateVipps,
  tripletex: validateTripletex,
  fiken: validateFiken,
  google_calendar: validateGoogleCalendar,
  hubspot: validateHubspot,
  slack: validateSlack,
  stripe: validateStripe,
  meta: validateMeta,
  mailchimp: validateMailchimp,
}

/**
 * Validate integration credentials for a given service.
 * Falls back to generic validation if no specific validator exists.
 */
export async function validateIntegration(
  service: string,
  credentials: Record<string, string>
): Promise<ValidationResult> {
  const validator = validators[service] || validateGeneric(service)
  return validator(credentials)
}

/**
 * Validate multiple integrations in parallel.
 */
export async function validateMultipleIntegrations(
  integrations: { service: string; credentials: Record<string, string> }[]
): Promise<ValidationResult[]> {
  return Promise.all(
    integrations.map(({ service, credentials }) => validateIntegration(service, credentials))
  )
}

/**
 * Check if all required integrations for an automation are valid.
 */
export async function checkAutomationReadiness(
  requiredServices: string[],
  credentialsMap: Record<string, Record<string, string>>
): Promise<{ ready: boolean; results: ValidationResult[] }> {
  const results = await Promise.all(
    requiredServices.map(service => {
      const creds = credentialsMap[service]
      if (!creds) {
        return Promise.resolve(makeResult(service, false, `${service} er ikke koblet til enda`))
      }
      return validateIntegration(service, creds)
    })
  )
  return {
    ready: results.every(r => r.valid),
    results,
  }
}
