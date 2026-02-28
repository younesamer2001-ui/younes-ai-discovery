'use client'

import { useState, useEffect } from 'react'
import { gold, goldRgb, fonts } from '@/lib/constants'
import {
  Link2, CheckCircle2, AlertCircle, Clock, Eye, EyeOff,
  ExternalLink, Shield, Zap, Check, ShoppingCart, Package, Lock
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
  fields: IntegrationField[]
  helpUrl: string
  helpLabel: string
  usedFor: string[]
}

/* ------------------------------------------------------------------ */
/*  All available integrations (full catalog)                          */
/* ------------------------------------------------------------------ */

const allIntegrations: IntegrationDef[] = [
  {
    service: 'vipps',
    name: 'Vipps MobilePay',
    description: 'Automatisk fakturering og betalingspåminnelser via Vipps.',
    icon: '💳',
    color: '#ff5b24',
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
    fields: [
      { key: 'consumer_token', label: 'Consumer Token', placeholder: 'Lim inn din consumer token', type: 'password', helpText: 'Opprett en integrasjon i Tripletex under Innstillinger → API-tilgang' },
      { key: 'employee_token', label: 'Employee Token', placeholder: 'Lim inn din employee token', type: 'password' },
    ],
    helpUrl: 'https://tripletex.no/v2-docs/',
    helpLabel: 'Hvordan oppretter jeg API-tilgang?',
    usedFor: ['Auto-fakturering', 'Kundesynkronisering', 'Regnskapseksport'],
  },
  {
    service: 'google_calendar',
    name: 'Google Calendar',
    description: 'Automatisk booking og møtepåminnelser koblet til kalenderen din.',
    icon: '📅',
    color: '#16a34a',
    fields: [
      { key: 'calendar_id', label: 'Kalender-ID', placeholder: 'din@gmail.com eller kalender-ID', type: 'text', helpText: 'Finner du i Google Calendar → Innstillinger → Kalender-ID' },
    ],
    helpUrl: 'https://support.google.com/calendar/answer/37083',
    helpLabel: 'Hvordan finner jeg min kalender-ID?',
    usedFor: ['Auto-booking', 'Møtepåminnelser', 'Kalender-synkronisering'],
  },
]

/* ------------------------------------------------------------------ */
/*  Map automation names → required integrations                       */
/* ------------------------------------------------------------------ */

const automationToIntegrations: Record<string, string[]> = {
  'fakturering':         ['vipps', 'tripletex'],
  'betalingspåminnelser': ['vipps'],
  'regnskap':            ['tripletex'],
  'booking':             ['google_calendar'],
  'møtepåminnelser':     ['google_calendar'],
  'kundesynkronisering': ['tripletex'],
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function IntegrationsPage() {
  // In production: fetch from Supabase `automations` table where customer_id = current user
  // For now: demo data simulating purchased automations
  const [purchasedAutomations, setPurchasedAutomations] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching purchased automations from Supabase
    // Replace this with: const { data } = await supabase.from('automations').select('name').eq('customer_id', userId)
    setTimeout(() => {
      setPurchasedAutomations([
        // DEMO: uncomment lines below to simulate purchased automations
        // 'fakturering',
        // 'booking',
        // 'regnskap',
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

  // Initialize state when active integrations change
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
      [service]: {
        ...prev[service],
        fields: { ...prev[service].fields, [key]: value },
        saved: false,
      },
    }))
  }

  const toggleSecret = (service: string, key: string) => {
    setIntegrationState(prev => ({
      ...prev,
      [service]: {
        ...prev[service],
        showSecrets: { ...prev[service].showSecrets, [key]: !prev[service].showSecrets[key] },
      },
    }))
  }

  const handleSave = (service: string) => {
    const state = integrationState[service]
    const def = allIntegrations.find(i => i.service === service)!
    const allFilled = def.fields.every(f => state.fields[f.key]?.trim())

    setIntegrationState(prev => ({
      ...prev,
      [service]: { ...prev[service], saving: true },
    }))

    // Simulate save (production: save to Supabase integrations table)
    setTimeout(() => {
      setIntegrationState(prev => ({
        ...prev,
        [service]: {
          ...prev[service],
          saving: false,
          saved: true,
          status: allFilled ? 'connected' : 'pending',
        },
      }))
    }, 1000)
  }

  const handleDisconnect = (service: string) => {
    const def = allIntegrations.find(i => i.service === service)!
    setIntegrationState(prev => ({
      ...prev,
      [service]: {
        fields: Object.fromEntries(def.fields.map(f => [f.key, ''])),
        status: 'pending',
        showSecrets: {},
        saving: false,
        saved: false,
      },
    }))
  }

  const statusBadge = (status: string) => {
    if (status === 'connected') return { bg: 'rgba(74,222,128,0.12)', color: '#4ade80', icon: CheckCircle2, label: 'Tilkoblet' }
    if (status === 'error') return { bg: 'rgba(248,113,113,0.12)', color: '#f87171', icon: AlertCircle, label: 'Feil' }
    return { bg: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', icon: Clock, label: 'Venter på oppsett' }
  }

  const connectedCount = Object.values(integrationState).filter(s => s.status === 'connected').length

  /* ---- Loading state ---- */
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
      <div style={{ maxWidth: 600, margin: '0 auto', fontFamily: fonts.body, textAlign: 'center', paddingTop: 60 }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%', margin: '0 auto 24px',
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Lock size={32} color="rgba(255,255,255,0.15)" />
        </div>

        <h2 style={{ color: '#f0f0f0', fontSize: 22, fontWeight: 700, marginBottom: 10, fontFamily: fonts.body }}>
          Ingen integrasjoner ennå
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, lineHeight: 1.6, maxWidth: 440, margin: '0 auto 32px' }}>
          Integrasjoner blir tilgjengelige etter at du har kjøpt en automatiseringspakke.
          Velg en automatisering — som fakturering, booking eller regnskap — og det
          relevante oppsettet vil dukke opp her automatisk.
        </p>

        {/* Show what's available */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 14, padding: '24px 20px',
          textAlign: 'left',
        }}>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
            Tilgjengelige integrasjoner ved kjøp
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {allIntegrations.map(integ => (
              <div key={integ.service} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 16px', borderRadius: 10,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
                opacity: 0.6,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: `${integ.color}10`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, flexShrink: 0,
                }}>
                  {integ.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: 600 }}>{integ.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>{integ.description}</div>
                </div>
                <Lock size={14} color="rgba(255,255,255,0.15)" />
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 20, paddingTop: 16,
            borderTop: '1px solid rgba(255,255,255,0.04)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <ShoppingCart size={14} color="rgba(255,255,255,0.3)" />
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>
              Kjøp en automatisering for å låse opp integrasjoner
            </span>
          </div>
        </div>

        {/* Contact support */}
        <div style={{
          marginTop: 24, padding: '14px 20px',
          background: `rgba(${goldRgb},0.04)`,
          borderRadius: 10, border: `1px solid rgba(${goldRgb},0.08)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <Package size={14} color={gold} />
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
            Usikker på hva du trenger?{' '}
            <a href="mailto:support@arxon.no" style={{ color: gold, textDecoration: 'none', fontWeight: 600 }}>
              Kontakt oss
            </a>
            {' '}for en gratis kartlegging.
          </span>
        </div>
      </div>
    )
  }

  /* ---- Active integrations (post-purchase) ---- */
  return (
    <div style={{ maxWidth: 800, fontFamily: fonts.body }}>
      {/* Header stats */}
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

      {/* Security note */}
      <div style={{
        background: `rgba(${goldRgb},0.04)`,
        border: `1px solid rgba(${goldRgb},0.1)`,
        borderRadius: 12, padding: '16px 20px', marginBottom: 24,
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <Shield size={20} color={gold} style={{ flexShrink: 0 }} />
        <div>
          <div style={{ color: '#f0f0f0', fontSize: 13, fontWeight: 600, marginBottom: 2 }}>
            Trygt og kryptert
          </div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
            API-nøklene dine lagres kryptert og brukes kun av Arxon for å koble til tjenestene dine. Vi deler aldri nøklene med tredjeparter.
          </div>
        </div>
      </div>

      {/* Integration cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {activeIntegrations.map(integ => {
          const state = integrationState[integ.service]
          if (!state) return null
          const badge = statusBadge(state.status)
          const BadgeIcon = badge.icon
          const allFilled = integ.fields.every(f => state.fields[f.key]?.trim())

          // Which purchased automations need this integration
          const relatedAutomations = purchasedAutomations.filter(auto =>
            (automationToIntegrations[auto] || []).includes(integ.service)
          )

          return (
            <div key={integ.service} style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${state.status === 'connected' ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.06)'}`,
              borderRadius: 14,
              overflow: 'hidden',
              transition: 'border-color 0.3s',
            }}>
              {/* Card header */}
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
                  padding: '5px 12px', borderRadius: 20,
                  background: badge.bg,
                  flexShrink: 0,
                }}>
                  <BadgeIcon size={14} color={badge.color} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: badge.color }}>{badge.label}</span>
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: '18px 20px' }}>
                {/* Related purchased automations */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                  <span style={{
                    color: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: 500,
                    display: 'flex', alignItems: 'center', marginRight: 4,
                  }}>
                    Kreves for:
                  </span>
                  {relatedAutomations.map((auto, i) => (
                    <span key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      padding: '3px 10px', borderRadius: 12, fontSize: 11,
                      background: `rgba(${goldRgb},0.06)`, color: gold,
                      textTransform: 'capitalize',
                    }}>
                      <Zap size={10} /> {auto}
                    </span>
                  ))}
                </div>

                {/* Input fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {integ.fields.map(field => (
                    <div key={field.key}>
                      <label style={{
                        display: 'block', color: 'rgba(255,255,255,0.5)',
                        fontSize: 12, fontWeight: 500, marginBottom: 5,
                      }}>
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
                            width: '100%', padding: '10px 80px 10px 14px',
                            borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)',
                            background: state.status === 'connected' ? 'rgba(74,222,128,0.04)' : 'rgba(255,255,255,0.03)',
                            color: '#f0f0f0', fontSize: 13, outline: 'none',
                            fontFamily: field.type === 'password' && !state.showSecrets[field.key] ? 'monospace' : fonts.body,
                            boxSizing: 'border-box',
                            opacity: state.status === 'connected' ? 0.6 : 1,
                          }}
                        />
                        <div style={{
                          position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                          display: 'flex', gap: 4,
                        }}>
                          {field.type === 'password' && (
                            <button onClick={() => toggleSecret(integ.service, field.key)} style={{
                              background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                              color: 'rgba(255,255,255,0.3)',
                            }}>
                              {state.showSecrets[field.key] ? <EyeOff size={14} /> : <Eye size={14} />}
                            </button>
                          )}
                        </div>
                      </div>
                      {field.helpText && (
                        <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, marginTop: 4 }}>
                          {field.helpText}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, gap: 12 }}>
                  <a href={integ.helpUrl} target="_blank" rel="noopener noreferrer" style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    color: 'rgba(255,255,255,0.35)', fontSize: 12, textDecoration: 'none',
                    transition: 'color 0.2s',
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
                        background: 'rgba(248,113,113,0.1)',
                        border: '1px solid rgba(248,113,113,0.2)',
                        color: '#f87171', fontSize: 13, fontWeight: 500,
                        cursor: 'pointer', fontFamily: fonts.body,
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
                          background: !allFilled ? 'rgba(255,255,255,0.06)' :
                            state.saved ? '#4ade80' :
                            `linear-gradient(135deg, ${gold}, #d4a85a)`,
                          color: !allFilled ? 'rgba(255,255,255,0.2)' :
                            state.saved ? '#fff' : '#0f1b27',
                          fontSize: 13, fontWeight: 600,
                          cursor: allFilled && !state.saving ? 'pointer' : 'not-allowed',
                          fontFamily: fonts.body,
                          display: 'flex', alignItems: 'center', gap: 6,
                          transition: 'all 0.2s',
                        }}
                      >
                        {state.saving ? 'Kobler til...' :
                         state.saved ? <><Check size={14} /> Tilkoblet</> :
                         <><Link2 size={14} /> Koble til</>}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom help note */}
      <div style={{
        marginTop: 24, padding: '16px 20px',
        background: 'rgba(255,255,255,0.02)',
        borderRadius: 10, border: '1px solid rgba(255,255,255,0.04)',
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
