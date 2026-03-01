'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { gold, goldRgb, fonts } from '@/lib/constants'
import { User, Building2, Phone, Mail, Globe, Bell, Shield, Save, Check } from 'lucide-react'

interface SettingsForm {
  companyName: string
  contactName: string
  phone: string
  website: string
  notifyEmail: boolean
  notifySms: boolean
  notifyNewLead: boolean
  notifyMissedCall: boolean
  notifyBooking: boolean
}

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState<SettingsForm>({
    companyName: '',
    contactName: '',
    phone: '',
    website: '',
    notifyEmail: true,
    notifySms: false,
    notifyNewLead: true,
    notifyMissedCall: true,
    notifyBooking: true,
  })

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser(session.user)
        // In production, load from Supabase customer profile table
        setForm(prev => ({
          ...prev,
          companyName: 'Din Bedrift AS',
          contactName: session.user.email?.split('@')[0] || '',
        }))
      }
    }
    getUser()
  }, [])

  const handleSave = () => {
    // In production: save to Supabase
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px',
    borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.03)', color: '#f0f0f0',
    fontSize: 14, outline: 'none', fontFamily: fonts.body,
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 500,
    display: 'block', marginBottom: 6,
  }

  return (
    <div style={{ maxWidth: 640, fontFamily: fonts.body }}>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, margin: '0 0 24px' }}>
        Administrer bedriftsprofil og varslingsinnstillinger
      </p>

      {/* Company info */}
      <section style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 12, padding: '24px', marginBottom: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <Building2 size={18} color={gold} />
          <h3 style={{ color: '#f0f0f0', fontSize: 15, fontWeight: 600, margin: 0 }}>Bedriftsinformasjon</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={labelStyle}>Bedriftsnavn</label>
            <input value={form.companyName} onChange={e => setForm({ ...form, companyName: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Kontaktperson</label>
            <input value={form.contactName} onChange={e => setForm({ ...form, contactName: e.target.value })} style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelStyle}>Telefon</label>
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+47 ..." style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Nettside</label>
              <input value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} placeholder="https://..." style={inputStyle} />
            </div>
          </div>
        </div>
      </section>

      {/* Email */}
      <section style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 12, padding: '24px', marginBottom: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <Mail size={18} color={gold} />
          <h3 style={{ color: '#f0f0f0', fontSize: 15, fontWeight: 600, margin: 0 }}>Konto</h3>
        </div>
        <div>
          <label style={labelStyle}>E-post (innlogging)</label>
          <input value={user?.email || ''} disabled style={{ ...inputStyle, opacity: 0.5, cursor: 'not-allowed' }} />
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12, marginTop: 6 }}>
            Kontakt support@arxon.no for å endre e-postadresse
          </p>
        </div>
      </section>

      {/* Notifications */}
      <section style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 12, padding: '24px', marginBottom: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <Bell size={18} color={gold} />
          <h3 style={{ color: '#f0f0f0', fontSize: 15, fontWeight: 600, margin: 0 }}>Varsler</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { key: 'notifyNewLead' as const, label: 'Nye leads', desc: 'Få varsel når en ny lead er kvalifisert' },
            { key: 'notifyMissedCall' as const, label: 'Tapte anrop', desc: 'Bli varslet om anrop som ikke ble besvart' },
            { key: 'notifyBooking' as const, label: 'Nye bookinger', desc: 'Varsel når et møte er booket automatisk' },
          ].map(n => (
            <div key={n.key} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 0',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{n.label}</div>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>{n.desc}</div>
              </div>
              <button
                onClick={() => setForm({ ...form, [n.key]: !form[n.key] })}
                style={{
                  width: 44, height: 24, borderRadius: 12, border: 'none',
                  background: form[n.key] ? gold : 'rgba(255,255,255,0.1)',
                  cursor: 'pointer', position: 'relative', transition: 'background 0.2s',
                  flexShrink: 0,
                }}
              >
                <div style={{
                  width: 18, height: 18, borderRadius: '50%',
                  background: '#fff',
                  position: 'absolute', top: 3,
                  left: form[n.key] ? 23 : 3,
                  transition: 'left 0.2s',
                }} />
              </button>
            </div>
          ))}

          <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.notifyEmail} onChange={e => setForm({ ...form, notifyEmail: e.target.checked })}
                style={{ accentColor: gold }} />
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>E-post</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.notifySms} onChange={e => setForm({ ...form, notifySms: e.target.checked })}
                style={{ accentColor: gold }} />
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>SMS</span>
            </label>
          </div>
        </div>
      </section>

      {/* Save button */}
      <button onClick={handleSave} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        width: '100%', padding: '14px',
        borderRadius: 10, border: 'none',
        background: saved ? '#4ade80' : `linear-gradient(135deg, ${gold}, #d4a85a)`,
        color: saved ? '#fff' : '#0f1b27',
        fontWeight: 700, fontSize: 15,
        cursor: 'pointer', fontFamily: fonts.body,
        transition: 'all 0.2s',
      }}>
        {saved ? <><Check size={18} /> Lagret!</> : <><Save size={16} /> Lagre endringer</>}
      </button>
    </div>
  )
}
