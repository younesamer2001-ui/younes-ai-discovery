'use client'

import { useState } from 'react'
import { gold, goldRgb, fonts } from '@/lib/constants'
import {
  PhoneIncoming, PhoneOutgoing, PhoneMissed, Clock,
  Search, Filter, Play, ChevronDown, ChevronUp
} from 'lucide-react'

const demoCalls = [
  { id: 1, number: '+47 912 34 567', name: 'Ole Hansen', direction: 'incoming', status: 'answered', duration: '2:34', time: '14:32', date: '28. feb 2026', summary: 'Spurte om pris på AI-telefonsvarer for bilverksted. Interessert i pakke med auto-booking. Følg opp med tilbud.', sentiment: 'positive' },
  { id: 2, number: '+47 987 65 432', name: 'Ukjent', direction: 'incoming', status: 'missed', duration: '—', time: '14:15', date: '28. feb 2026', summary: 'Ingen samtale — ubesvart anrop.', sentiment: 'neutral' },
  { id: 3, number: '+47 456 78 901', name: 'Kari Nordmann', direction: 'incoming', status: 'answered', duration: '4:12', time: '13:45', date: '28. feb 2026', summary: 'Eksisterende kunde — spørsmål om faktura og utvidelse av tjenester. Ønsker chatbot i tillegg til telefonsvarer.', sentiment: 'positive' },
  { id: 4, number: '+47 321 54 876', name: 'Erik Bakken', direction: 'incoming', status: 'answered', duration: '1:08', time: '12:20', date: '28. feb 2026', summary: 'Kort samtale — ville bekrefte møtetidspunkt. AI bekreftet booking for torsdag kl. 10.', sentiment: 'neutral' },
  { id: 5, number: '+47 555 12 345', name: 'Salong Bella', direction: 'incoming', status: 'answered', duration: '3:22', time: '11:50', date: '28. feb 2026', summary: 'Ny kunde — eier av salong med 5 ansatte. Bruker mye tid på telefon for timebestilling. Kvalifisert lead.', sentiment: 'positive' },
  { id: 6, number: '+47 777 88 999', name: 'Ukjent', direction: 'incoming', status: 'answered', duration: '0:45', time: '10:30', date: '28. feb 2026', summary: 'Feil nummer — samtalen ble avsluttet raskt.', sentiment: 'neutral' },
  { id: 7, number: '+47 444 33 222', name: 'Byggmester AS', direction: 'incoming', status: 'answered', duration: '5:17', time: '09:15', date: '28. feb 2026', summary: 'Stor interesse — byggfirma med 12 ansatte. Taper mange anrop på byggeplasser. Vil ha demo av mobilsvarer + CRM-integrasjon.', sentiment: 'positive' },
  { id: 8, number: '+47 666 55 444', name: 'Reisebyrå Fjord', direction: 'incoming', status: 'missed', duration: '—', time: '08:45', date: '27. feb 2026', summary: 'Ubesvart — ringte tilbake via AI 2 min senere.', sentiment: 'neutral' },
]

export default function CallLogsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'answered' | 'missed'>('all')
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const filtered = demoCalls.filter(c => {
    if (filterStatus !== 'all' && c.status !== filterStatus) return false
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase()) && !c.number.includes(searchQuery)) return false
    return true
  })

  const statusIcon = (status: string) => {
    if (status === 'missed') return <PhoneMissed size={16} color="#f87171" />
    return <PhoneIncoming size={16} color="#4ade80" />
  }

  return (
    <div style={{ maxWidth: 900, fontFamily: fonts.body }}>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, margin: '0 0 20px' }}>
        Alle innkommende anrop håndtert av AI-telefonsvareren — demo-data
      </p>

      {/* Search + Filter */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={16} style={{
            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
            color: 'rgba(255,255,255,0.25)',
          }} />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Søk på navn eller nummer..."
            style={{
              width: '100%', padding: '10px 16px 10px 38px',
              borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)', color: '#f0f0f0',
              fontSize: 14, outline: 'none', fontFamily: fonts.body,
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 3 }}>
          {([['all', 'Alle'], ['answered', 'Besvart'], ['missed', 'Tapte']] as const).map(([val, label]) => (
            <button key={val} onClick={() => setFilterStatus(val)} style={{
              padding: '8px 14px', borderRadius: 6, border: 'none',
              background: filterStatus === val ? `rgba(${goldRgb},0.15)` : 'transparent',
              color: filterStatus === val ? gold : 'rgba(255,255,255,0.4)',
              fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: fonts.body,
            }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Call list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map(call => {
          const expanded = expandedId === call.id
          return (
            <div key={call.id} style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${expanded ? `rgba(${goldRgb},0.15)` : 'rgba(255,255,255,0.06)'}`,
              borderRadius: 10,
              overflow: 'hidden',
              transition: 'border-color 0.2s',
            }}>
              <button
                onClick={() => setExpandedId(expanded ? null : call.id)}
                style={{
                  width: '100%', padding: '14px 16px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 14,
                  fontFamily: fonts.body, textAlign: 'left',
                }}
              >
                {statusIcon(call.status)}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#f0f0f0', fontSize: 14, fontWeight: 500 }}>{call.name}</span>
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>{call.number}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
                  {call.duration !== '—' && (
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={12} /> {call.duration}
                    </span>
                  )}
                  <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>{call.time}</span>
                  <span style={{
                    padding: '3px 8px', borderRadius: 12, fontSize: 11, fontWeight: 600,
                    background: call.status === 'answered' ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)',
                    color: call.status === 'answered' ? '#4ade80' : '#f87171',
                  }}>
                    {call.status === 'answered' ? 'Besvart' : 'Tapt'}
                  </span>
                  {expanded ? <ChevronUp size={16} color="rgba(255,255,255,0.3)" /> : <ChevronDown size={16} color="rgba(255,255,255,0.3)" />}
                </div>
              </button>

              {expanded && (
                <div style={{
                  padding: '0 16px 16px',
                  borderTop: '1px solid rgba(255,255,255,0.04)',
                }}>
                  <div style={{ padding: '14px 0' }}>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
                      AI-oppsummering
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                      {call.summary}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
                      <span style={{
                        padding: '3px 10px', borderRadius: 12, fontSize: 11,
                        background: call.sentiment === 'positive' ? 'rgba(74,222,128,0.1)' : 'rgba(255,255,255,0.05)',
                        color: call.sentiment === 'positive' ? '#4ade80' : 'rgba(255,255,255,0.4)',
                      }}>
                        {call.sentiment === 'positive' ? 'Positiv' : 'Nøytral'}
                      </span>
                      <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>
                        {call.date}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '40px 20px',
            color: 'rgba(255,255,255,0.3)', fontSize: 14,
          }}>
            Ingen anrop funnet
          </div>
        )}
      </div>
    </div>
  )
}
