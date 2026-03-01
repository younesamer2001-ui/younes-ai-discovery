'use client'

import { Eye, EyeOff, ExternalLink, Link2, Check } from 'lucide-react'
import { gold, goldRgb, fonts } from '@/lib/constants'
import { IntegrationDef, IntegrationState } from './types'

interface IntegrationCardProps {
  integ: IntegrationDef
  state: IntegrationState
  relatedAutomations: string[]
  onUpdateField: (service: string, key: string, value: string) => void
  onToggleSecret: (service: string, key: string) => void
  onSave: (service: string) => void
  onDisconnect: (service: string) => void
  statusBadge: { bg: string; color: string; icon: React.ComponentType<any>; label: string }
}

export function IntegrationCard({
  integ,
  state,
  relatedAutomations,
  onUpdateField,
  onToggleSecret,
  onSave,
  onDisconnect,
  statusBadge,
}: IntegrationCardProps) {
  const BadgeIcon = statusBadge.icon
  const allFilled = integ.fields.every(f => state.fields[f.key]?.trim())

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid ${state.status === 'connected' ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.06)'}`,
      borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.3s',
    }}>
      {/* Header */}
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
          padding: '5px 12px', borderRadius: 20, background: statusBadge.bg, flexShrink: 0,
        }}>
          <BadgeIcon size={14} color={statusBadge.color} />
          <span style={{ fontSize: 12, fontWeight: 600, color: statusBadge.color }}>{statusBadge.label}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '18px 20px' }}>
        {/* Related automations */}
        {relatedAutomations.length > 0 && (
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
                ⚡ {auto}
              </span>
            ))}
          </div>
        )}

        {/* Form fields */}
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
                  onChange={e => onUpdateField(integ.service, field.key, e.target.value)}
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
                  <button onClick={() => onToggleSecret(integ.service, field.key)} style={{
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

        {/* Footer with link and buttons */}
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
              <button onClick={() => onDisconnect(integ.service)} style={{
                padding: '8px 16px', borderRadius: 8,
                background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)',
                color: '#f87171', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: fonts.body,
              }}>
                Koble fra
              </button>
            )}
            {state.status !== 'connected' && (
              <button
                onClick={() => onSave(integ.service)}
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
}
