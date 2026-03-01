'use client'

import { useState } from 'react'
import { gold, goldRgb, fonts } from '@/lib/constants'
import {
  Phone, PhoneIncoming, PhoneMissed, Users, CalendarCheck,
  TrendingUp, Clock, ArrowUpRight, ArrowDownRight, BarChart3
} from 'lucide-react'

// Demo data — will be replaced with Supabase queries
const demoStats = {
  totalCalls: 342,
  answeredCalls: 318,
  missedCalls: 24,
  leadsCaptures: 87,
  bookingsMade: 43,
  avgResponseTime: '1.2s',
  callsChange: 12,
  leadsChange: 8,
  bookingsChange: -3,
}

interface ChartData {
  day: string
  calls: number
  leads: number
  bookings: number
}

const weeklyData: ChartData[] = [
  { day: 'Man', calls: 52, leads: 14, bookings: 7 },
  { day: 'Tir', calls: 48, leads: 12, bookings: 6 },
  { day: 'Ons', calls: 61, leads: 18, bookings: 9 },
  { day: 'Tor', calls: 44, leads: 10, bookings: 5 },
  { day: 'Fre', calls: 55, leads: 15, bookings: 8 },
  { day: 'Lør', calls: 32, leads: 8, bookings: 3 },
  { day: 'Søn', calls: 18, leads: 4, bookings: 2 },
]

const recentActivity = [
  { type: 'call', text: 'Innkommende anrop fra +47 912 34 567', time: '2 min siden', status: 'answered' },
  { type: 'lead', text: 'Ny lead: Byggmester Hansen AS', time: '15 min siden', status: 'new' },
  { type: 'booking', text: 'Møte booket: 3. mars kl. 14:00', time: '32 min siden', status: 'confirmed' },
  { type: 'call', text: 'Ubesvart anrop fra +47 987 65 432', time: '1 time siden', status: 'missed' },
  { type: 'lead', text: 'Lead kvalifisert: Salong Bella', time: '2 timer siden', status: 'qualified' },
  { type: 'booking', text: 'Møte booket: 4. mars kl. 10:00', time: '3 timer siden', status: 'confirmed' },
]

const automations = [
  { name: 'AI-telefonsvarer', status: 'active', uptime: '99.8%' },
  { name: 'Auto-booking', status: 'active', uptime: '99.5%' },
  { name: 'Lead-kvalifisering', status: 'active', uptime: '100%' },
  { name: 'Chatbot', status: 'setup', uptime: '—' },
]

function StatCard({ icon: Icon, label, value, change, suffix = '' }: {
  icon: any, label: string, value: string | number, change?: number, suffix?: string
}) {
  const positive = change && change > 0
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 12,
      padding: '20px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8,
          background: `rgba(${goldRgb},0.1)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={18} color={gold} />
        </div>
        {change !== undefined && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: 12, fontWeight: 600,
            color: positive ? '#4ade80' : '#f87171',
          }}>
            {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div style={{ color: '#f0f0f0', fontSize: 28, fontWeight: 700 }}>
        {value}{suffix}
      </div>
      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 4 }}>
        {label}
      </div>
    </div>
  )
}

function MiniBarChart({ data, dataKey, color }: { data: ChartData[], dataKey: keyof Omit<ChartData, 'day'>, color: string }) {
  const maxVal = Math.max(...data.map(d => d[dataKey]))
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 100 }}>
      {data.map((d, i) => {
        const val = d[dataKey]
        const height = maxVal > 0 ? (val / maxVal) * 100 : 0
        return (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{val}</div>
            <div style={{
              width: '100%',
              height: `${height}%`,
              minHeight: 4,
              background: color,
              borderRadius: '4px 4px 0 0',
              transition: 'height 0.3s ease',
            }} />
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{d.day}</div>
          </div>
        )
      })}
    </div>
  )
}

export default function DashboardOverview() {
  const [period, setPeriod] = useState<'week' | 'month'>('week')

  return (
    <div style={{ maxWidth: 1100, fontFamily: fonts.body }}>
      {/* Period toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, margin: 0 }}>
          Siste 7 dager — demo-data
        </p>
        <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 3 }}>
          {(['week', 'month'] as const).map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{
              padding: '6px 14px', borderRadius: 6, border: 'none',
              background: period === p ? `rgba(${goldRgb},0.15)` : 'transparent',
              color: period === p ? gold : 'rgba(255,255,255,0.4)',
              fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: fonts.body,
            }}>
              {p === 'week' ? 'Uke' : 'Måned'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16,
        marginBottom: 24,
      }}>
        <StatCard icon={PhoneIncoming} label="Besvarte anrop" value={demoStats.answeredCalls} change={demoStats.callsChange} />
        <StatCard icon={PhoneMissed} label="Tapte anrop" value={demoStats.missedCalls} />
        <StatCard icon={Users} label="Leads fanget" value={demoStats.leadsCaptures} change={demoStats.leadsChange} />
        <StatCard icon={CalendarCheck} label="Bookinger" value={demoStats.bookingsMade} change={demoStats.bookingsChange} />
        <StatCard icon={Clock} label="Snitt responstid" value={demoStats.avgResponseTime} />
        <StatCard icon={TrendingUp} label="Svarprosent" value="93" suffix="%" />
      </div>

      {/* Charts row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        marginBottom: 24,
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 12, padding: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <BarChart3 size={16} color={gold} />
            <span style={{ color: '#f0f0f0', fontSize: 14, fontWeight: 600 }}>Anrop denne uken</span>
          </div>
          <MiniBarChart data={weeklyData} dataKey="calls" color={`rgba(${goldRgb},0.6)`} />
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 12, padding: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Users size={16} color="#4ade80" />
            <span style={{ color: '#f0f0f0', fontSize: 14, fontWeight: 600 }}>Leads denne uken</span>
          </div>
          <MiniBarChart data={weeklyData} dataKey="leads" color="rgba(74,222,128,0.6)" />
        </div>
      </div>

      {/* Bottom row: Activity + Automations */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr',
        gap: 16,
      }}>
        {/* Recent activity */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 12, padding: '20px',
        }}>
          <h3 style={{ color: '#f0f0f0', fontSize: 14, fontWeight: 600, margin: '0 0 16px' }}>
            Siste aktivitet
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {recentActivity.map((a, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 0',
                borderBottom: i < recentActivity.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: a.status === 'missed' ? '#f87171'
                    : a.status === 'new' ? '#60a5fa'
                    : a.status === 'qualified' ? '#a78bfa'
                    : '#4ade80',
                  flexShrink: 0,
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {a.text}
                  </div>
                </div>
                <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12, whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {a.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Automations status */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 12, padding: '20px',
        }}>
          <h3 style={{ color: '#f0f0f0', fontSize: 14, fontWeight: 600, margin: '0 0 16px' }}>
            Dine automatiseringer
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {automations.map((a, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 12px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.04)',
              }}>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 500 }}>
                    {a.name}
                  </div>
                  {a.uptime !== '—' && (
                    <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 2 }}>
                      Oppetid: {a.uptime}
                    </div>
                  )}
                </div>
                <span style={{
                  padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                  background: a.status === 'active' ? 'rgba(74,222,128,0.12)' : 'rgba(250,204,21,0.12)',
                  color: a.status === 'active' ? '#4ade80' : '#facc15',
                }}>
                  {a.status === 'active' ? 'Aktiv' : 'Oppsett'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 1.5fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
