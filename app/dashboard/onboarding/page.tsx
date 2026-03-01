'use client'

import { useState, useEffect } from 'react'
import { gold, goldRgb, fonts } from '@/lib/constants'
import {
  CheckCircle2, Circle, ArrowRight, Link2, Shield, Zap, Loader2,
  AlertTriangle, ChevronRight, Package, Play, Lock, Unlock
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Step = 'purchased' | 'integrations_pending' | 'integrations_validated' | 'review' | 'activated' | 'completed'

interface OnboardingItem {
  id: string
  purchaseId: string
  automationName: string
  automationKey: string
  step: Step
  requiredServices: string[]
  connectedServices: string[]
  activatedByUser: boolean
}

const stepOrder: Step[] = ['purchased', 'integrations_pending', 'integrations_validated', 'review', 'activated', 'completed']

const stepLabels: Record<Step, string> = {
  purchased: 'Kjøpt',
  integrations_pending: 'Koble til tjenester',
  integrations_validated: 'Verifisert',
  review: 'Gjennomgang',
  activated: 'Aktivering',
  completed: 'Aktiv',
}

const stepDescriptions: Record<Step, string> = {
  purchased: 'Automatiseringen er kjøpt og klar for oppsett.',
  integrations_pending: 'Koble til de nødvendige integrasjonene.',
  integrations_validated: 'Alle API-nøkler er verifisert og fungerer.',
  review: 'Gjennomgå innstillingene før aktivering.',
  activated: 'Workflowen opprettes i bakgrunnen.',
  completed: 'Alt er oppe og kjører!',
}

/* ------------------------------------------------------------------ */
/*  Demo data (replace with Supabase in production)                    */
/* ------------------------------------------------------------------ */

const demoOnboarding: OnboardingItem[] = [
  {
    id: '1',
    purchaseId: 'p1',
    automationName: 'Automatisk Fakturering',
    automationKey: 'fakturering',
    step: 'integrations_pending',
    requiredServices: ['vipps', 'tripletex'],
    connectedServices: ['vipps'],
    activatedByUser: false,
  },
  {
    id: '2',
    purchaseId: 'p2',
    automationName: 'AI Booking System',
    automationKey: 'booking',
    step: 'completed',
    requiredServices: ['google_calendar'],
    connectedServices: ['google_calendar'],
    activatedByUser: true,
  },
  {
    id: '3',
    purchaseId: 'p3',
    automationName: 'Automatisk SoMe-posting',
    automationKey: 'some-posting',
    step: 'purchased',
    requiredServices: ['meta', 'linkedin'],
    connectedServices: [],
    activatedByUser: false,
  },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function OnboardingPage() {
  const [items, setItems] = useState<OnboardingItem[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [validating, setValidating] = useState(false)
  const [activating, setActivating] = useState(false)

  useEffect(() => {
    // TODO: Fetch from Supabase
    setItems(demoOnboarding)
  }, [])

  const selectedItem = items.find(i => i.id === selected)
  const pendingItems = items.filter(i => i.step !== 'completed')
  const completedItems = items.filter(i => i.step === 'completed')

  const getStepIndex = (step: Step) => stepOrder.indexOf(step)

  const handleValidate = async (item: OnboardingItem) => {
    setValidating(true)
    // Simulate validation
    await new Promise(r => setTimeout(r, 2000))
    setItems(prev => prev.map(i =>
      i.id === item.id ? { ...i, step: 'integrations_validated', connectedServices: [...i.requiredServices] } : i
    ))
    setValidating(false)
  }

  const handleActivate = async (item: OnboardingItem) => {
    setActivating(true)
    // Step through: review → activated → completed
    setItems(prev => prev.map(i =>
      i.id === item.id ? { ...i, step: 'activated', activatedByUser: true } : i
    ))
    await new Promise(r => setTimeout(r, 3000))
    setItems(prev => prev.map(i =>
      i.id === item.id ? { ...i, step: 'completed' } : i
    ))
    setActivating(false)
  }

  return (
    <div style={{ fontFamily: fonts.body, color: '#e2e8f0', minHeight: '100vh' }}>
      <style>{`
        .onb-card { background: rgba(${goldRgb},0.03); border: 1px solid rgba(${goldRgb},0.1); border-radius: 16px; transition: all 0.3s; cursor: pointer; }
        .onb-card:hover { border-color: rgba(${goldRgb},0.25); transform: translateY(-2px); }
        .onb-card.active { border-color: ${gold}; box-shadow: 0 0 30px rgba(${goldRgb},0.1); }
        .step-dot { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; transition: all 0.3s; }
        .step-line { height: 2px; flex: 1; min-width: 20px; transition: background 0.3s; }
        .btn-gold { background: ${gold}; color: #080c14; border: none; padding: 10px 24px; border-radius: 10px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 14px; transition: all 0.3s; }
        .btn-gold:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(${goldRgb},0.3); }
        .btn-gold:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .service-badge { padding: 6px 12px; border-radius: 8px; font-size: 13px; display: flex; align-items: center; gap: 6px; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0 }}>
          <Package size={28} style={{ display: 'inline', marginRight: 10, color: gold }} />
          Oppsett & Aktivering
        </h1>
        <p style={{ color: '#94a3b8', marginTop: 8, fontSize: 15 }}>
          Følg stegene for å aktivere dine automatiseringer. Vi verifiserer alt før vi setter i gang.
        </p>
      </div>

      {/* Stats bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Venter på oppsett', value: pendingItems.length, color: '#f59e0b' },
          { label: 'Aktive', value: completedItems.length, color: '#10b981' },
          { label: 'Totalt kjøpt', value: items.length, color: gold },
        ].map(stat => (
          <div key={stat.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '16px 20px' }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1.2fr' : '1fr', gap: 24 }}>
        {/* Left: List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {pendingItems.length > 0 && (
            <div style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
              Venter på oppsett ({pendingItems.length})
            </div>
          )}
          {pendingItems.map(item => (
            <div
              key={item.id}
              className={`onb-card ${selected === item.id ? 'active' : ''}`}
              onClick={() => setSelected(item.id)}
              style={{ padding: '20px 24px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>{item.automationName}</div>
                  <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>
                    {item.connectedServices.length}/{item.requiredServices.length} integrasjoner koblet til
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    fontSize: 12,
                    padding: '4px 10px',
                    borderRadius: 6,
                    background: item.step === 'integrations_validated' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)',
                    color: item.step === 'integrations_validated' ? '#10b981' : '#f59e0b',
                    fontWeight: 600,
                  }}>
                    {stepLabels[item.step]}
                  </span>
                  <ChevronRight size={16} style={{ color: '#64748b' }} />
                </div>
              </div>
            </div>
          ))}

          {completedItems.length > 0 && (
            <>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginTop: 16, marginBottom: 4 }}>
                Aktive ({completedItems.length})
              </div>
              {completedItems.map(item => (
                <div
                  key={item.id}
                  className={`onb-card ${selected === item.id ? 'active' : ''}`}
                  onClick={() => setSelected(item.id)}
                  style={{ padding: '20px 24px', opacity: 0.7 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle2 size={20} style={{ color: '#10b981' }} />
                      <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>{item.automationName}</span>
                    </div>
                    <span style={{
                      fontSize: 12, padding: '4px 10px', borderRadius: 6,
                      background: 'rgba(16,185,129,0.15)', color: '#10b981', fontWeight: 600,
                    }}>
                      Aktiv
                    </span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Right: Detail panel */}
        {selectedItem && (
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            padding: 32,
          }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginTop: 0, marginBottom: 8 }}>
              {selectedItem.automationName}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 28 }}>
              {stepDescriptions[selectedItem.step]}
            </p>

            {/* Progress steps */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 32 }}>
              {stepOrder.map((step, i) => {
                const currentIdx = getStepIndex(selectedItem.step)
                const isDone = i <= currentIdx
                const isCurrent = i === currentIdx
                return (
                  <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < stepOrder.length - 1 ? 1 : 0 }}>
                    <div className="step-dot" style={{
                      background: isDone ? gold : 'rgba(255,255,255,0.06)',
                      color: isDone ? '#080c14' : '#64748b',
                      border: isCurrent ? `2px solid ${gold}` : 'none',
                      boxShadow: isCurrent ? `0 0 12px rgba(${goldRgb},0.4)` : 'none',
                    }}>
                      {isDone && i < currentIdx ? <CheckCircle2 size={16} /> : (i + 1)}
                    </div>
                    {i < stepOrder.length - 1 && (
                      <div className="step-line" style={{
                        background: i < currentIdx ? gold : 'rgba(255,255,255,0.08)',
                      }} />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Required integrations */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 12 }}>
                <Link2 size={16} style={{ display: 'inline', marginRight: 8, color: gold }} />
                Nødvendige integrasjoner
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {selectedItem.requiredServices.map(svc => {
                  const connected = selectedItem.connectedServices.includes(svc)
                  return (
                    <div key={svc} className="service-badge" style={{
                      background: connected ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                      border: `1px solid ${connected ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}`,
                      color: connected ? '#10b981' : '#f59e0b',
                    }}>
                      {connected ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
                      {svc.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Action buttons based on current step */}
            {selectedItem.step === 'purchased' && (
              <a
                href="/dashboard/integrasjoner"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: gold, color: '#080c14', padding: '12px 24px',
                  borderRadius: 10, fontWeight: 600, textDecoration: 'none', fontSize: 14,
                }}
              >
                <Link2 size={16} />
                Koble til integrasjoner
                <ArrowRight size={16} />
              </a>
            )}

            {selectedItem.step === 'integrations_pending' && (
              <div style={{ display: 'flex', gap: 12 }}>
                <a
                  href="/dashboard/integrasjoner"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: 'rgba(255,255,255,0.06)', color: '#e2e8f0', padding: '12px 24px',
                    borderRadius: 10, fontWeight: 600, textDecoration: 'none', fontSize: 14,
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <Link2 size={16} />
                  Koble til manglende
                </a>
                <button
                  className="btn-gold"
                  disabled={validating || selectedItem.connectedServices.length < selectedItem.requiredServices.length}
                  onClick={() => handleValidate(selectedItem)}
                >
                  {validating ? <Loader2 size={16} className="spin" /> : <Shield size={16} />}
                  {validating ? 'Verifiserer...' : 'Verifiser nøkler'}
                </button>
              </div>
            )}

            {selectedItem.step === 'integrations_validated' && (
              <button className="btn-gold" onClick={() => handleActivate(selectedItem)} disabled={activating}>
                {activating ? <Loader2 size={16} className="spin" /> : <Play size={16} />}
                {activating ? 'Aktiverer...' : 'Aktiver automatisering'}
              </button>
            )}

            {selectedItem.step === 'activated' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#f59e0b' }}>
                <Loader2 size={20} className="spin" />
                <span style={{ fontSize: 14 }}>Workflowen opprettes... dette tar vanligvis under ett minutt.</span>
              </div>
            )}

            {selectedItem.step === 'completed' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#10b981' }}>
                <CheckCircle2 size={20} />
                <span style={{ fontSize: 14, fontWeight: 600 }}>Automatiseringen er aktiv og kjører!</span>
              </div>
            )}

            {/* Security note */}
            <div style={{
              marginTop: 24, padding: '12px 16px', borderRadius: 10,
              background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)',
              display: 'flex', alignItems: 'flex-start', gap: 10,
            }}>
              <Shield size={16} style={{ color: '#10b981', marginTop: 2, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
                API-nøklene dine krypteres og lagres sikkert. Vi verifiserer at alt fungerer før vi aktiverer workflowen.
                Du kan når som helst pause eller stoppe automatiseringen.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
