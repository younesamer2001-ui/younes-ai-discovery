'use client'

import { useState } from 'react'
import { gold, goldRgb, fonts } from '@/lib/constants'
import { Search, Star, Phone, Mail, Building2, MapPin, ChevronDown, ChevronUp } from 'lucide-react'

const demoLeads = [
  { id: 1, name: 'Ole Hansen', company: 'Hansen Bilservice', phone: '+47 912 34 567', email: 'ole@hansenbs.no', industry: 'Bilverksted', location: 'Bergen', score: 9, status: 'hot', source: 'AI-telefonsvarer', date: '28. feb 2026', notes: 'Bilverksted med 8 ansatte. Taper 10+ anrop daglig. Svært interessert i mobilsvarer + auto-booking. Har budsjett. Følg opp innen 24t.' },
  { id: 2, name: 'Maria Solberg', company: 'Salong Bella', phone: '+47 555 12 345', email: 'maria@salongbella.no', industry: 'Salong & Skjønnhet', location: 'Oslo', score: 8, status: 'hot', source: 'AI-telefonsvarer', date: '28. feb 2026', notes: 'Salong med 5 ansatte. Bruker 2-3 timer daglig på telefon for timebestilling. Vil ha auto-booking + påminnelser. Klar for demo.' },
  { id: 3, name: 'Per Johansen', company: 'Byggmester AS', phone: '+47 444 33 222', email: 'per@byggmester.no', industry: 'Bygg & Håndverk', location: 'Trondheim', score: 9, status: 'hot', source: 'AI-telefonsvarer', date: '28. feb 2026', notes: '12 ansatte. Taper mange anrop på byggeplasser. Ønsker AI-mobilsvarer + CRM-integrasjon. Stor kunde-potensial.' },
  { id: 4, name: 'Anne Kristiansen', company: 'Fjordreiser AS', phone: '+47 666 55 444', email: 'anne@fjordreiser.no', industry: 'Reiseliv & Overnatting', location: 'Stavanger', score: 7, status: 'warm', source: 'Nettside', date: '27. feb 2026', notes: 'Reisebyrå med booking-utfordringer. Ønsker auto-svar på vanlige spørsmål + booking-system. Litt usikker på budsjett.' },
  { id: 5, name: 'Thomas Berg', company: 'Berg Eiendom', phone: '+47 888 77 666', email: 'thomas@bergeiendom.no', industry: 'Eiendomsmegling', location: 'Oslo', score: 6, status: 'warm', source: 'Kartlegging', date: '26. feb 2026', notes: 'Eiendomsmegler med 3 ansatte. Vil automatisere visningspåmelding og oppfølging av leads. Tidlig fase.' },
  { id: 6, name: 'Lisa Strand', company: 'Strand Dekk & Felg', phone: '+47 999 11 222', email: 'lisa@stranddf.no', industry: 'Bilverksted', location: 'Drammen', score: 5, status: 'cold', source: 'AI-telefonsvarer', date: '25. feb 2026', notes: 'Liten bedrift, 2 ansatte. Interessert men begrenset budsjett. Kan være aktuell for startpakke.' },
]

const statusConfig: Record<string, { label: string, bg: string, color: string }> = {
  hot: { label: 'Varm', bg: 'rgba(248,113,113,0.12)', color: '#f87171' },
  warm: { label: 'Lun', bg: 'rgba(250,204,21,0.12)', color: '#facc15' },
  cold: { label: 'Kald', bg: 'rgba(96,165,250,0.12)', color: '#60a5fa' },
}

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'hot' | 'warm' | 'cold'>('all')
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const filtered = demoLeads.filter(l => {
    if (filterStatus !== 'all' && l.status !== filterStatus) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return l.name.toLowerCase().includes(q) || l.company.toLowerCase().includes(q) || l.industry.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div style={{ maxWidth: 900, fontFamily: fonts.body }}>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, margin: '0 0 20px' }}>
        Leads fanget og kvalifisert av AI — demo-data
      </p>

      {/* Search + Filter */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.25)' }} />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Søk leads..."
            style={{
              width: '100%', padding: '10px 16px 10px 38px',
              borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)', color: '#f0f0f0',
              fontSize: 14, outline: 'none', fontFamily: fonts.body, boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 3 }}>
          {([['all', 'Alle'], ['hot', 'Varme'], ['warm', 'Lune'], ['cold', 'Kalde']] as const).map(([val, label]) => (
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

      {/* Leads list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map(lead => {
          const expanded = expandedId === lead.id
          const st = statusConfig[lead.status]
          return (
            <div key={lead.id} style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${expanded ? `rgba(${goldRgb},0.15)` : 'rgba(255,255,255,0.06)'}`,
              borderRadius: 10, overflow: 'hidden',
            }}>
              <button
                onClick={() => setExpandedId(expanded ? null : lead.id)}
                style={{
                  width: '100%', padding: '14px 16px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 14,
                  fontFamily: fonts.body, textAlign: 'left',
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: `rgba(${goldRgb},0.08)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Building2 size={16} color={gold} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: '#f0f0f0', fontSize: 14, fontWeight: 500 }}>{lead.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>{lead.company} · {lead.industry}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Star size={14} color="#facc15" fill="#facc15" />
                    <span style={{ color: '#f0f0f0', fontSize: 13, fontWeight: 600 }}>{lead.score}</span>
                  </div>
                  <span style={{ padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600, background: st.bg, color: st.color }}>
                    {st.label}
                  </span>
                  {expanded ? <ChevronUp size={16} color="rgba(255,255,255,0.3)" /> : <ChevronDown size={16} color="rgba(255,255,255,0.3)" />}
                </div>
              </button>

              {expanded && (
                <div style={{ padding: '0 16px 16px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ padding: '14px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Phone size={14} color="rgba(255,255,255,0.3)" />
                      <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{lead.phone}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Mail size={14} color="rgba(255,255,255,0.3)" />
                      <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{lead.email}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <MapPin size={14} color="rgba(255,255,255,0.3)" />
                      <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{lead.location}</span>
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>
                      Kilde: {lead.source} · {lead.date}
                    </div>
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.02)', borderRadius: 8,
                    padding: '12px 14px', marginTop: 4,
                  }}>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
                      AI-notater
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                      {lead.notes}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
            Ingen leads funnet
          </div>
        )}
      </div>
    </div>
  )
}
