'use client'

import { useState, useEffect } from 'react'
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react'
import { fonts } from '@/lib/constants'
import { allIntegrations, automationToIntegrations } from './components/integrations-catalog'
import { IntegrationState, IntegrationDef } from './components/types'
import { LoadingState } from './components/LoadingState'
import { EmptyState } from './components/EmptyState'
import { IntegrationCard } from './components/IntegrationCard'
import { SecurityInfo } from './components/SecurityInfo'
import { ConnectionStatus } from './components/ConnectionStatus'
import { SupportFooter } from './components/SupportFooter'

export default function IntegrationsPage() {
  const [purchasedAutomations, setPurchasedAutomations] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [integrationState, setIntegrationState] = useState<Record<string, IntegrationState>>({})

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

  // Initialize integration state
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

  // Loading state
  if (loading) {
    return <LoadingState />
  }

  // Empty state: no purchased automations
  if (activeIntegrations.length === 0) {
    return <EmptyState />
  }

  // Active integrations (post-purchase)
  return (
    <div style={{ maxWidth: 800, fontFamily: fonts.body }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, margin: 0 }}>
          Fullfør oppsettet for å aktivere dine kjøpte automatiseringer
        </p>
        <ConnectionStatus connectedCount={connectedCount} totalCount={activeIntegrations.length} />
      </div>

      {/* Security Info */}
      <SecurityInfo />

      {/* Integration Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {activeIntegrations.map(integ => {
          const state = integrationState[integ.service]
          if (!state) return null
          const badge = statusBadge(state.status)
          const relatedAutomations = purchasedAutomations.filter(auto =>
            (automationToIntegrations[auto] || []).includes(integ.service)
          )

          return (
            <IntegrationCard
              key={integ.service}
              integ={integ}
              state={state}
              relatedAutomations={relatedAutomations}
              onUpdateField={updateField}
              onToggleSecret={toggleSecret}
              onSave={handleSave}
              onDisconnect={handleDisconnect}
              statusBadge={badge}
            />
          )
        })}
      </div>

      {/* Support Footer */}
      <SupportFooter />
    </div>
  )
}
