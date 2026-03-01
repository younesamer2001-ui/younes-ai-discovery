'use client'

import { useState, useEffect } from 'react'
import { gold, goldRgb, fonts } from '@/lib/constants'
import {
  Activity, CheckCircle2, AlertTriangle, XCircle, Clock, TrendingUp,
  Zap, DollarSign, BarChart3, RefreshCw, Pause, Play, Settings,
  ChevronRight, ArrowUpRight, Timer, Server, Wifi, WifiOff,
  Shield, Eye
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type HealthStatus = 'healthy' | 'degraded' | 'failing' | 'offline' | 'unknown'
type WorkflowStatus = 'active' | 'paused' | 'error' | 'creating' | 'stopped'

interface WorkflowCard {
  id: string
  name: string
  automationKey: string
  status: WorkflowStatus
  health: HealthStatus
  lastRun: string | null
  nextRun: string | null
  totalExecutions: number
  successRate: number
  itemsProcessed: number
  hoursSaved: number
  nokSaved: number
  errorCount: number
  lastError: string | null
  templateVersion: number
  uptime: number
  avgDurationMs: number
}

/* ------------------------------------------------------------------ */
/*  Demo data                                                          */
/* ------------------------------------------------------------------ */

const demoWorkflows: WorkflowCard[] = [
  {
    id: 'w1', name: 'Automatisk Fakturering', automationKey: 'fakturering',
    status: 'active', health: 'healthy', lastRun: '2026-02-28T14:30:00', nextRun: '2026-03-01T09:00:00',
    totalExecutions: 347, successRate: 99.1, itemsProcessed: 1204,
    hoursSaved: 86.8, nokSaved: 39060, errorCount: 3, lastError: null,
    templateVersion: 1, uptime: 99.7, avgDurationMs: 2300,
  },
  {
    id: 'w2', name: 'AI Booking System', automationKey: 'booking',
    status: 'active', health: 'healthy', lastRun: '2026-02-28T16:45:00', nextRun: null,
    totalExecutions: 892, successRate: 98.5, itemsProcessed: 892,
    hoursSaved: 118.9, nokSaved: 53505, errorCount: 13, lastError: null,
    templateVersion: 1, uptime: 98.5, avgDurationMs: 1800,
  },
  {
    id: 'w3', name: 'SoMe-posting', automationKey: 'some-posting',
    status: 'active', health: 'degraded', lastRun: '2026-02-28T08:00:00', nextRun: '2026-03-01T08:00:00',
    totalExecutions: 56, successRate: 91.1, itemsProcessed: 112,
    hoursSaved: 18.7, nokSaved: 8415, errorCount: 5,
    lastError: 'LinkedIn API rate limit nådd – prøver igjen om 15 min',
    templateVersion: 1, uptime: 91.1, avgDurationMs: 8500,
  },
  {
    id: 'w4', name: 'KPI-rapporter', automationKey: 'kpi-rapporter',
    status: 'active', health: 'healthy', lastRun: '2026-02-24T07:00:00', nextRun: '2026-03-03T07:00:00',
    totalExecutions: 12, successRate: 100, itemsProcessed: 12,
    hoursSaved: 9, nokSaved: 4050, errorCount: 0, lastError: null,
    templateVersion: 1, uptime: 100, avgDurationMs: 45000,
  },
  {
    id: 'w5', name: 'Lead-innhenting', automationKey: 'lead-scraping',
    status: 'error', health: 'failing', lastRun: '2026-02-27T06:00:00', nextRun: null,
    totalExecutions: 28, successRate: 75, itemsProcessed: 420,
    hoursSaved: 14, nokSaved: 6300, errorCount: 7,
    lastError: 'Finn.no blokkerte forespørsel – oppdaterer scraping-metode',
    templateVersion: 1, uptime: 75, avgDurationMs: 120000,
  },
  {
    id: 'w6', name: 'SMS-påminnelser', automationKey: 'sms-paminnelse',
    status: 'paused', health: 'offline', lastRun: '2026-02-20T09:00:00', nextRun: null,
    totalExecutions: 180, successRate: 100, itemsProcessed: 540,
    hoursSaved: 9, nokSaved: 4050, errorCount: 0, lastError: null,
    templateVersion: 1, uptime: 100, avgDurationMs: 800,
  },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const healthConfig: Record<HealthStatus, { color: string; icon: typeof CheckCircle2; label: string }> = {
  healthy: { color: '#10b981', icon: CheckCircle2, label: 'Frisk' },
  degraded: { color: '#f59e0b', icon: AlertTriangle, label: 'Ustabil' },
  failing: { color: '#ef4444', icon: XCircle, label: 'Feil' },
  offline: { color: '#64748b', icon: WifiOff, label: 'Offline' },
  unknown: { color: '#64748b', icon: Clock, label: 'Ukjent' },
}

const statusConfig: Record<WorkflowStatus, { color: string; label: string }> = {
  active: { color: '#10b981', label: 'Aktiv' },
  paused: { color: '#64748b', label: 'Pauset' },
  error: { color: '#ef4444', label: 'Feil' },
  creating: { color: '#3b82f6', label: 'Opprettes' },
  stopped: { color: '#64748b', label: 'Stoppet' },
}

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return 'Aldri'
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m siden`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}t siden`
  const days = Math.floor(hours / 24)
  return `${days}d siden`
}

function formatNok(nok: number): string {
  return new Intl.NumberFormat('nb-NO', { style: 'currency', currency: 'NOK', maximumFractionDigits: 0 }).format(nok)
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function AutomatiseringerPage() {
  const [workflows, setWorkflows] = useState<WorkflowCard[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    setWorkflows(demoWorkflows)
  }, [])

  const selectedWf = workflows.find(w => w.id === selected)

  // Aggregated stats
  const totalHoursSaved = workflows.reduce((s, w) => s + w.hoursSaved, 0)
  const totalNokSaved = workflows.reduce((s, w) => s + w.nokSaved, 0)
  const totalExecutions = workflows.reduce((s, w) => s + w.totalExecutions, 0)
  const totalItems = workflows.reduce((s, w) => s + w.itemsProcessed, 0)
  const activeCount = workflows.filter(w => w.status === 'active').length
  const errorCount = workflows.filter(w => w.health === 'failing' || w.health === 'degraded').length

  const handleRefresh = async () => {
    setRefreshing(true)
    await new Promise(r => setTimeout(r, 1500))
    setRefreshing(false)
  }

  const handlePauseResume = (wfId: string) => {
    setWorkflows(prev => prev.map(w => {
      if (w.id !== wfId) return w
      if (w.status === 'active') return { ...w, status: 'paused' as WorkflowStatus, health: 'offline' as HealthStatus }
      if (w.status === 'paused') return { ...w, status: 'active' as WorkflowStatus, health: 'healthy' as HealthStatus }
      return w
    }))
  }

  const handleRetry = (wfId: string) => {
    setWorkflows(prev => prev.map(w => {
      if (w.id !== wfId) return w
      return { ...w, status: 'active' as WorkflowStatus, health: 'healthy' as HealthStatus, lastError: null, errorCount: 0 }
    }))
  }

  return (
    <div style={{ fontFamily: fonts.body, color: '#e2e8f0', minHeight: '100vh' }}>
      <style>{`
        .wf-card { background: rgba(${goldRgb},0.03); border: 1px solid rgba(${goldRgb},0.08); border-radius: 14px; padding: 20px; cursor: pointer; transition: all 0.3s; }
        .wf-card:hover { border-color: rgba(${goldRgb},0.2); transform: translateY(-2px); }
        .wf-card.sel { border-color: ${gold}; box-shadow: 0 0 24px rgba(${goldRgb},0.08); }
        .stat-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 20px 24px; }
        .btn-sm { padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s; }
        .btn-sm:hover { transform: translateY(-1px); }
        .progress-bar { height: 6px; border-radius: 3px; overflow: hidden; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Zap size={28} style={{ color: gold }} />
            Mine Automatiseringer
          </h1>
          <p style={{ color: '#94a3b8', marginTop: 6, fontSize: 14 }}>
            Overvåk status, helse og ROI for alle dine aktive automatiseringer.
          </p>
        </div>
        <button
          className="btn-sm"
          onClick={handleRefresh}
          style={{ background: 'rgba(255,255,255,0.06)', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <RefreshCw size={14} className={refreshing ? 'spin' : ''} />
          {refreshing ? 'Oppdaterer...' : 'Oppdater helse'}
        </button>
      </div>

      {/* ROI Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Timer size={18} style={{ color: '#10b981' }} />
            <span style={{ fontSize: 13, color: '#94a3b8' }}>Timer spart</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#10b981' }}>{totalHoursSaved.toFixed(1)}</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>totalt denne perioden</div>
        </div>
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <DollarSign size={18} style={{ color: gold }} />
            <span style={{ fontSize: 13, color: '#94a3b8' }}>Penger spart</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: gold }}>{formatNok(totalNokSaved)}</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>basert på {totalHoursSaved.toFixed(0)}t × 450 kr/t</div>
        </div>
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <BarChart3 size={18} style={{ color: '#3b82f6' }} />
            <span style={{ fontSize: 13, color: '#94a3b8' }}>Kjøringer</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#3b82f6' }}>{totalExecutions.toLocaleString('nb-NO')}</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{totalItems.toLocaleString('nb-NO')} elementer behandlet</div>
        </div>
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Activity size={18} style={{ color: activeCount === workflows.length ? '#10b981' : '#f59e0b' }} />
            <span style={{ fontSize: 13, color: '#94a3b8' }}>Status</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: errorCount > 0 ? '#f59e0b' : '#10b981' }}>
            {activeCount}/{workflows.length}
          </div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
            {errorCount > 0 ? `${errorCount} trenger oppmerksomhet` : 'Alle kjører normalt'}
          </div>
        </div>
      </div>

      {/* Workflow grid + detail */}
      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: 20 }}>
        {/* Workflow cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {workflows.map(wf => {
            const hc = healthConfig[wf.health]
            const sc = statusConfig[wf.status]
            const HealthIcon = hc.icon
            return (
              <div
                key={wf.id}
                className={`wf-card ${selected === wf.id ? 'sel' : ''}`}
                onClick={() => setSelected(wf.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <HealthIcon size={16} style={{ color: hc.color }} />
                      {wf.name}
                    </div>
                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
                      Sist kjørt: {timeAgo(wf.lastRun)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <span style={{
                      fontSize: 11, padding: '3px 8px', borderRadius: 6, fontWeight: 600,
                      background: `${sc.color}15`, color: sc.color,
                    }}>
                      {sc.label}
                    </span>
                    <span style={{
                      fontSize: 11, padding: '3px 8px', borderRadius: 6, fontWeight: 600,
                      background: `${hc.color}15`, color: hc.color,
                    }}>
                      {hc.label}
                    </span>
                  </div>
                </div>

                {/* Mini stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{wf.totalExecutions}</div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>kjøringer</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#10b981' }}>{wf.hoursSaved.toFixed(1)}t</div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>spart</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: gold }}>{formatNok(wf.nokSaved)}</div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>verdi</div>
                  </div>
                </div>

                {/* Uptime bar */}
                <div style={{ marginTop: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b', marginBottom: 4 }}>
                    <span>Oppetid</span>
                    <span style={{ color: wf.uptime >= 95 ? '#10b981' : wf.uptime >= 80 ? '#f59e0b' : '#ef4444' }}>
                      {wf.uptime}%
                    </span>
                  </div>
                  <div className="progress-bar" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div style={{
                      width: `${wf.uptime}%`,
                      height: '100%',
                      borderRadius: 3,
                      background: wf.uptime >= 95 ? '#10b981' : wf.uptime >= 80 ? '#f59e0b' : '#ef4444',
                    }} />
                  </div>
                </div>

                {/* Error alert */}
                {wf.lastError && (
                  <div style={{
                    marginTop: 12, padding: '8px 12px', borderRadius: 8,
                    background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                    fontSize: 12, color: '#fca5a5', display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <AlertTriangle size={14} style={{ flexShrink: 0, color: '#ef4444' }} />
                    {wf.lastError}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Detail panel */}
        {selectedWf && (
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            padding: 28,
            position: 'sticky',
            top: 20,
            alignSelf: 'start',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: 0 }}>{selectedWf.name}</h2>
                <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
                  Template v{selectedWf.templateVersion} · {selectedWf.automationKey}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {selectedWf.status === 'error' && (
                  <button className="btn-sm" onClick={() => handleRetry(selectedWf.id)}
                    style={{ background: '#ef4444', color: '#fff' }}>
                    <RefreshCw size={13} /> Prøv igjen
                  </button>
                )}
                <button className="btn-sm" onClick={() => handlePauseResume(selectedWf.id)}
                  style={{
                    background: selectedWf.status === 'paused' ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.06)',
                    color: selectedWf.status === 'paused' ? '#10b981' : '#e2e8f0',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}>
                  {selectedWf.status === 'paused' ? <><Play size={13} /> Gjenoppta</> : <><Pause size={13} /> Pause</>}
                </button>
              </div>
            </div>

            {/* Health indicator */}
            {(() => {
              const hc = healthConfig[selectedWf.health]
              const HealthIcon = hc.icon
              return (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
                  borderRadius: 10, marginBottom: 20,
                  background: `${hc.color}08`, border: `1px solid ${hc.color}25`,
                }}>
                  <HealthIcon size={20} style={{ color: hc.color }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: hc.color }}>{hc.label}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>
                      {selectedWf.health === 'healthy' && 'Alle systemer kjører normalt'}
                      {selectedWf.health === 'degraded' && 'Noen kjøringer feiler – overvåkes'}
                      {selectedWf.health === 'failing' && 'Kritisk feil – automatisk retry aktiv'}
                      {selectedWf.health === 'offline' && 'Workflowen er pauset eller stoppet'}
                    </div>
                  </div>
                </div>
              )
            })()}

            {/* Detailed stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 20 }}>
              {[
                { label: 'Totalt kjørt', value: selectedWf.totalExecutions.toString(), icon: BarChart3, color: '#3b82f6' },
                { label: 'Suksessrate', value: `${selectedWf.successRate}%`, icon: CheckCircle2, color: '#10b981' },
                { label: 'Elementer', value: selectedWf.itemsProcessed.toLocaleString('nb-NO'), icon: TrendingUp, color: gold },
                { label: 'Snitt varighet', value: `${(selectedWf.avgDurationMs / 1000).toFixed(1)}s`, icon: Timer, color: '#8b5cf6' },
                { label: 'Timer spart', value: `${selectedWf.hoursSaved.toFixed(1)}`, icon: Clock, color: '#10b981' },
                { label: 'Verdi spart', value: formatNok(selectedWf.nokSaved), icon: DollarSign, color: gold },
                { label: 'Feil totalt', value: selectedWf.errorCount.toString(), icon: AlertTriangle, color: selectedWf.errorCount > 0 ? '#ef4444' : '#64748b' },
                { label: 'Oppetid', value: `${selectedWf.uptime}%`, icon: Wifi, color: selectedWf.uptime >= 95 ? '#10b981' : '#f59e0b' },
              ].map(stat => (
                <div key={stat.label} style={{
                  padding: '12px 14px', borderRadius: 10,
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <stat.icon size={14} style={{ color: stat.color }} />
                    <span style={{ fontSize: 12, color: '#94a3b8' }}>{stat.label}</span>
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: stat.color }}>{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Last error */}
            {selectedWf.lastError && (
              <div style={{
                padding: '14px 16px', borderRadius: 10, marginBottom: 20,
                background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)',
              }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#ef4444', marginBottom: 6 }}>Siste feil</div>
                <div style={{ fontSize: 13, color: '#fca5a5', lineHeight: 1.5 }}>{selectedWf.lastError}</div>
                <div style={{ fontSize: 11, color: '#64748b', marginTop: 8 }}>
                  Automatisk retry er aktiv · {selectedWf.errorCount} forsøk gjort
                </div>
              </div>
            )}

            {/* Timing info */}
            <div style={{
              padding: '14px 16px', borderRadius: 10,
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 10 }}>Kjøringsinfo</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: '#94a3b8' }}>Sist kjørt</span>
                  <span style={{ color: '#e2e8f0' }}>{timeAgo(selectedWf.lastRun)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: '#94a3b8' }}>Neste kjøring</span>
                  <span style={{ color: '#e2e8f0' }}>{selectedWf.nextRun ? timeAgo(selectedWf.nextRun) : 'Webhook-basert'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
