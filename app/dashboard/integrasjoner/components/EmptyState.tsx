'use client'

import { useState } from 'react'
import { Lock, Search, ShoppingCart, Package } from 'lucide-react'
import { gold, goldRgb, fonts } from '@/lib/constants'
import { allIntegrations, categories, categoryIcons } from './integrations-catalog'
import { IntegrationDef } from './types'

export function EmptyState() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAllIntegrations = searchQuery
    ? allIntegrations.filter(i =>
        i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allIntegrations

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
                <IntegrationItem key={integ.service} integ={integ} />
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

function IntegrationItem({ integ }: { integ: IntegrationDef }) {
  return (
    <div style={{
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
  )
}
