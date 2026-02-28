'use client'

import { useState } from 'react'
import { gold, goldRgb, fonts } from '@/lib/constants'
import { CalendarCheck, Clock, User, MapPin, Search, Video, Phone as PhoneIcon } from 'lucide-react'

const demoBookings = [
  { id: 1, client: 'Ole Hansen', company: 'Hansen Bilservice', type: 'Demo', date: '3. mars 2026', time: '14:00 – 14:30', method: 'video', status: 'confirmed', bookedVia: 'AI-telefonsvarer' },
  { id: 2, client: 'Per Johansen', company: 'Byggmester AS', type: 'Kartlegging', date: '3. mars 2026', time: '15:00 – 15:45', method: 'phone', status: 'confirmed', bookedVia: 'AI-telefonsvarer' },
  { id: 3, client: 'Maria Solberg', company: 'Salong Bella', type: 'Demo', date: '4. mars 2026', time: '10:00 – 10:30', method: 'video', status: 'confirmed', bookedVia: 'AI-telefonsvarer' },
  { id: 4, client: 'Anne Kristiansen', company: 'Fjordreiser AS', type: 'Oppfølging', date: '4. mars 2026', time: '13:00 – 13:30', method: 'video', status: 'pending', bookedVia: 'Nettside' },
  { id: 5, client: 'Thomas Berg', company: 'Berg Eiendom', type: 'Kartlegging', date: '5. mars 2026', time: '09:00 – 09:45', method: 'phone', status: 'confirmed', bookedVia: 'Kartlegging' },
  { id: 6, client: 'Lisa Strand', company: 'Strand Dekk & Felg', type: 'Demo', date: '5. mars 2026', time: '11:00 – 11:30', method: 'video', status: 'pending', bookedVia: 'AI-telefonsvarer' },
  { id: 7, client: 'Kari Nordmann', company: 'Nordmann Eiendom', type: 'Oppfølging', date: '6. mars 2026', time: '14:00 – 14:30', method: 'phone', status: 'confirmed', bookedVia: 'AI-telefonsvarer' },
  { id: 8, client: 'Erik Bakken', company: 'Bakken Auto', type: 'Implementering', date: '7. mars 2026', time: '10:00 – 11:00', method: 'video', status: 'confirmed', bookedVia: 'Manuell' },
]

const typeColors: Record<string, { bg: string, color: string }> = {
  Demo: { bg: 'rgba(167,139,250,0.12)', color: '#a78bfa' },
  Kartlegging: { bg: 'rgba(96,165,250,0.12)', color: '#60a5fa' },
  Oppfølging: { bg: `rgba(${goldRgb},0.12)`, color: gold },
  Implementering: { bg: 'rgba(74,222,128,0.12)', color: '#4ade80' },
}

export default function BookingsPage() {
  const [filterType, setFilterType] = useState<string>('all')

  const filtered = demoBookings.filter(b => filterType === 'all' || b.type === filterType)

  const stats = {
    total: demoBookings.length,
    confirmed: demoBookings.filter(b => b.status === 'confirmed').length,
    thisWeek: demoBookings.filter(b => b.date.includes('mars')).length,
    aiBooked: demoBookings.filter(b => b.bookedVia === 'AI-telefonsvarer').length,
  }

  return (
    <div style={{ maxWidth: 900, fontFamily: fonts.body }}>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, margin: '0 0 20px' }}>
        Kommende møter booket av AI og manuelt — demo-data
      </p>

      {/* Quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Totalt', value: stats.total },
          { label: 'Bekreftet', value: stats.confirmed },
          { label: 'Denne uken', value: stats.thisWeek },
          { label: 'AI-booket', value: stats.aiBooked },
        ].map((s, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 10, padding: '14px 16px',
          }}>
            <div style={{ color: '#f0f0f0', fontSize: 22, fontWeight: 700 }}>{s.value}</div>
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 3, marginBottom: 20, flexWrap: 'wrap' }}>
        {['all', 'Demo', 'Kartlegging', 'Oppfølging', 'Implementering'].map(t => (
          <button key={t} onClick={() => setFilterType(t)} style={{
            padding: '8px 14px', borderRadius: 6, border: 'none',
            background: filterType === t ? `rgba(${goldRgb},0.15)` : 'transparent',
            color: filterType === t ? gold : 'rgba(255,255,255,0.4)',
            fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: fonts.body,
          }}>
            {t === 'all' ? 'Alle' : t}
          </button>
        ))}
      </div>

      {/* Bookings list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map(booking => {
          const tc = typeColors[booking.type] || typeColors.Demo
          return (
            <div key={booking.id} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 10,
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}>
              {/* Date block */}
              <div style={{
                width: 56, height: 56, borderRadius: 10,
                background: `rgba(${goldRgb},0.06)`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <div style={{ color: gold, fontSize: 16, fontWeight: 700 }}>
                  {booking.date.split('.')[0]}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, textTransform: 'uppercase' }}>
                  mar
                </div>
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ color: '#f0f0f0', fontSize: 14, fontWeight: 500 }}>{booking.client}</span>
                  <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>— {booking.company}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
                    <Clock size={12} /> {booking.time}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
                    {booking.method === 'video' ? <Video size={12} /> : <PhoneIcon size={12} />}
                    {booking.method === 'video' ? 'Videomøte' : 'Telefonmøte'}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>
                    via {booking.bookedVia}
                  </span>
                </div>
              </div>

              {/* Status badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                <span style={{ padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600, background: tc.bg, color: tc.color }}>
                  {booking.type}
                </span>
                <span style={{
                  padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600,
                  background: booking.status === 'confirmed' ? 'rgba(74,222,128,0.1)' : 'rgba(250,204,21,0.1)',
                  color: booking.status === 'confirmed' ? '#4ade80' : '#facc15',
                }}>
                  {booking.status === 'confirmed' ? 'Bekreftet' : 'Venter'}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <style>{`
        @media (max-width: 640px) {
          div[style*="display: flex"][style*="gap: 16"] { flex-direction: column !important; gap: 8px !important; }
        }
      `}</style>
    </div>
  )
}
