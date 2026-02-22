'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowRight, Sparkles, Target, Heart, Shield, Users, MapPin, ArrowUpRight, Lightbulb
} from 'lucide-react'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'
import { gold, goldRgb, bg, fadeUp, globalStyles } from '@/lib/constants'

export default function AboutPage() {
  const [lang, setLang] = useState<'no'|'en'>('no')
  const router = useRouter()

  const values = lang === 'no' ? [
    { icon: Heart, title: 'Ærlighet først', desc: 'Vi anbefaler aldri AI hvis det ikke gir nok verdi for din bedrift. Ingen bindingstid, ingen skjulte kostnader.' },
    { icon: Target, title: 'Resultater teller', desc: 'Vi måler suksess i tapte kunder du fanger opp, tid du sparer, og omsetning du beholder.' },
    { icon: Shield, title: 'Personvern er ufravikelig', desc: 'GDPR, EU AI Act og Datatilsynets retningslinjer — vi tar datasikkerhet på alvor.' },
    { icon: Lightbulb, title: 'Norsk for norske bedrifter', desc: 'Vi forstår det norske markedet, dialekter, og hvordan norske bedrifter faktisk jobber.' },
  ] : [
    { icon: Heart, title: 'Honesty first', desc: 'We never recommend AI if it won\'t provide enough value for your business. No lock-in, no hidden costs.' },
    { icon: Target, title: 'Results matter', desc: 'We measure success in lost customers you capture, time you save, and revenue you keep.' },
    { icon: Shield, title: 'Privacy is non-negotiable', desc: 'GDPR, EU AI Act and Datatilsynet guidelines — we take data security seriously.' },
    { icon: Lightbulb, title: 'Norwegian for Norwegian businesses', desc: 'We understand the Norwegian market, dialects, and how Norwegian businesses actually work.' },
  ]

  const stats = lang === 'no' ? [
    { value: '#1', label: 'Norge er nr. 1 i Europa på AI-adopsjon' },
    { value: '46%', label: 'av nordmenn bruker AI i hverdagen' },
    { value: '700 mrd', label: 'NOK årlig verdiskaping fra norske SMB-er' },
  ] : [
    { value: '#1', label: 'Norway is #1 in Europe for AI adoption' },
    { value: '46%', label: 'of Norwegians use AI in daily life' },
    { value: '700B', label: 'NOK annual value creation from Norwegian SMEs' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(180deg, ${bg} 0%, #0d0d15 50%, ${bg} 100%)`, color: '#f0f0f0', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{globalStyles()}</style>
      <Nav lang={lang} setLang={setLang} />

      {/* Hero */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 40px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 30, background: `rgba(${goldRgb},0.06)`, border: `1px solid rgba(${goldRgb},0.15)`, fontSize: 13, color: gold, marginBottom: 24 }}>
          <Users size={14} />
          {lang === 'no' ? 'Om Arxon' : 'About Arxon'}
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.4 }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px, 5vw, 50px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 16, letterSpacing: '-0.02em' }}>
          {lang === 'no' ? (<>Vi bygger <span style={{ color: gold }}>fremtidens kundeservice</span> for norske bedrifter</>) : (<>We&apos;re building <span style={{ color: gold }}>the future of customer service</span> for Norwegian businesses</>)}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.35 }}
          style={{ fontSize: 'clamp(15px, 2.2vw, 17px)', color: 'rgba(255,255,255,0.5)', maxWidth: 580, margin: '0 auto', lineHeight: 1.7 }}>
          {lang === 'no'
            ? 'Arxon startet med en enkel observasjon: norske bedrifter mister tusenvis av kroner hver måned på telefoner som ingen svarer. Vi mente det fantes en bedre løsning — og bygde den.'
            : 'Arxon started with a simple observation: Norwegian businesses lose thousands of kroner every month on phones nobody answers. We believed there was a better solution — and we built it.'}
        </motion.p>
      </section>

      {/* Mission */}
      <section style={{ maxWidth: 750, margin: '0 auto', padding: '40px 24px 60px' }}>
        <motion.div {...fadeUp} style={{
          background: `linear-gradient(135deg, rgba(${goldRgb},0.05) 0%, rgba(${goldRgb},0.01) 100%)`,
          border: `1px solid rgba(${goldRgb},0.12)`, borderRadius: 22, padding: '40px 32px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <Target size={22} color={gold} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700 }}>
              {lang === 'no' ? 'Vår misjon' : 'Our mission'}
            </h2>
          </div>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 16 }}>
            {lang === 'no'
              ? 'Å gjøre avansert AI-teknologi tilgjengelig for alle norske bedrifter — uansett størrelse. Ingen skal tape kunder fordi telefonen ringer når de er opptatt.'
              : 'To make advanced AI technology accessible to all Norwegian businesses — regardless of size. No one should lose customers because the phone rings when they\'re busy.'}
          </p>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
            {lang === 'no'
              ? 'Vi tror på at norske SMB-er fortjener de samme verktøyene som store selskaper. Med AI-mobilsvarer kan en rørlegger, frisør eller advokat gi like god kundeservice som en bedrift med 50 ansatte i kundesenteret.'
              : 'We believe Norwegian SMEs deserve the same tools as large companies. With AI phone answering, a plumber, hairdresser or lawyer can provide the same quality customer service as a company with 50 customer service employees.'}
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 60px' }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3.5vw, 28px)', fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>
          {lang === 'no' ? 'Norge leder AI-revolusjonen' : 'Norway leads the AI revolution'}
        </motion.h2>
        <motion.p {...fadeUp} style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: 14, marginBottom: 32 }}>
          {lang === 'no' ? 'Kilde: Microsoft AI Economy Institute 2025' : 'Source: Microsoft AI Economy Institute 2025'}
        </motion.p>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {stats.map((s, i) => (
            <motion.div key={i} {...fadeUp} style={{ textAlign: 'center', padding: '28px 16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 18 }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: gold, fontFamily: "'Playfair Display', serif", marginBottom: 6 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '20px 24px 70px' }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 700, textAlign: 'center', marginBottom: 36 }}>
          {lang === 'no' ? 'Hva vi står for' : 'What we stand for'}
        </motion.h2>
        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {values.map((v, i) => (
            <motion.div key={i} {...fadeUp} style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '28px 24px',
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `rgba(${goldRgb},0.08)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <v.icon size={22} color={gold} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{v.title}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.55 }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Location */}
      <section style={{ maxWidth: 600, margin: '0 auto', padding: '0 24px 70px', textAlign: 'center' }}>
        <motion.div {...fadeUp} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
          <MapPin size={18} color={gold} />
          <span style={{ fontSize: 15, fontWeight: 600 }}>{lang === 'no' ? 'Basert i Oslo, Norge' : 'Based in Oslo, Norway'}</span>
        </motion.div>
        <motion.p {...fadeUp} style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
          {lang === 'no'
            ? 'Vi er et norsk selskap som betjener norske bedrifter. All data lagres innen EØS, og vi følger norske lover og regelverk.'
            : 'We are a Norwegian company serving Norwegian businesses. All data is stored within the EEA, and we follow Norwegian laws and regulations.'}
        </motion.p>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 650, margin: '0 auto', padding: '0 24px 80px', textAlign: 'center' }}>
        <motion.div {...fadeUp} style={{
          background: `linear-gradient(135deg, rgba(${goldRgb},0.06) 0%, rgba(${goldRgb},0.02) 100%)`,
          border: `1px solid rgba(${goldRgb},0.15)`, borderRadius: 24, padding: '48px 32px',
        }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 700, marginBottom: 12 }}>
            {lang === 'no' ? 'La oss snakke om din bedrift' : 'Let\'s talk about your business'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, marginBottom: 28, maxWidth: 420, margin: '0 auto 28px', lineHeight: 1.6 }}>
            {lang === 'no' ? 'Start en gratis kartlegging, eller ta kontakt direkte. Vi svarer innen 24 timer.' : 'Start a free assessment, or contact us directly. We respond within 24 hours.'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
            <button onClick={() => router.push('/kartlegging')} style={{
              background: gold, color: bg, border: 'none', borderRadius: 14, padding: '16px 36px',
              fontWeight: 700, fontSize: 16, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            }}>
              {lang === 'no' ? 'Gratis kartlegging' : 'Free assessment'}
              <ArrowRight size={16} style={{ display: 'inline', marginLeft: 8, verticalAlign: 'middle' }} />
            </button>
            <a href="mailto:kontakt@arxon.no" style={{
              background: 'transparent', border: `1px solid rgba(${goldRgb},0.2)`, color: gold, borderRadius: 14, padding: '16px 28px',
              fontWeight: 600, fontSize: 16, textDecoration: 'none', fontFamily: "'DM Sans', sans-serif",
            }}>
              kontakt@arxon.no
            </a>
          </div>
        </motion.div>
      </section>

      <Footer lang={lang} minimal />
    </div>
  )
}
