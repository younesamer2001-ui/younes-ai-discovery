'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Globe, Menu, X, Clock, ArrowUpRight, BookOpen } from 'lucide-react'

const gold = '#c9a96e'
const goldRgb = '201,169,110'
const bg = '#0a0a0f'

function Nav({ lang, setLang }: { lang: 'no'|'en'; setLang: (l: 'no'|'en') => void }) {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const links = lang === 'no'
    ? [{ href: '/', label: 'Hjem' }, { href: '/mobilsvarer', label: 'Mobilsvarer' }, { href: '/blogg', label: 'Blogg' }, { href: '/om-oss', label: 'Om oss' }]
    : [{ href: '/', label: 'Home' }, { href: '/mobilsvarer', label: 'AI Answering' }, { href: '/blogg', label: 'Blog' }, { href: '/om-oss', label: 'About' }]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        ::selection{background:rgba(${goldRgb},0.3)}
        .show-mob{display:none!important}
        @media(max-width:768px){.hide-mob{display:none!important}.show-mob{display:flex!important}}
      `}</style>
      <nav style={{ position: 'relative', zIndex: 10, maxWidth: 1100, margin: '0 auto', padding: '16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div onClick={() => router.push('/')} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <img src="/arxon-icon.png" alt="Arxon" style={{ width: 34, height: 34 }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' as const, color: '#f0f0f0' }}>Arxon</span>
          </div>
          <div className="hide-mob" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {links.map(l => (
              <button key={l.href} onClick={() => router.push(l.href)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>{l.label}</button>
            ))}
            <button onClick={() => setLang(lang === 'no' ? 'en' : 'no')} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.45)', borderRadius: 8, padding: '6px 12px', fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
              <Globe size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />{lang === 'no' ? 'EN' : 'NO'}
            </button>
            <button onClick={() => router.push('/kartlegging')} style={{ background: gold, color: bg, border: 'none', borderRadius: 10, padding: '9px 22px', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
              {lang === 'no' ? 'Gratis kartlegging' : 'Free assessment'}<ArrowRight size={14} style={{ display: 'inline', marginLeft: 6, verticalAlign: 'middle' }} />
            </button>
          </div>
          <div className="show-mob" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={() => router.push('/kartlegging')} style={{ background: gold, color: bg, border: 'none', borderRadius: 8, padding: '7px 16px', fontWeight: 600, fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Start</button>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 6, cursor: 'pointer', display: 'flex' }}>
              {menuOpen ? <X size={20} color="rgba(255,255,255,0.7)" /> : <Menu size={20} color="rgba(255,255,255,0.7)" />}
            </button>
          </div>
        </div>
      </nav>
      {menuOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 95, background: 'rgba(10,10,15,0.98)', padding: '80px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 7, cursor: 'pointer', display: 'flex' }}><X size={20} color="rgba(255,255,255,0.7)" /></button>
          {links.map(l => (
            <button key={l.href} onClick={() => { setMenuOpen(false); router.push(l.href) }} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 18, fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", textAlign: 'left', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{l.label}</button>
          ))}
        </div>
      )}
    </>
  )
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: 'easeOut' },
}

const articles = [
  {
    slug: 'ubesvarte-anrop-koster',
    title: 'Hvor mye koster ubesvarte anrop norske bedrifter?',
    titleEn: 'How much do missed calls cost Norwegian businesses?',
    excerpt: 'Norske SMB-er taper potensielt hundretusenvis av kroner årlig på telefoner som ingen svarer. Vi ser på tallene.',
    excerptEn: 'Norwegian SMEs potentially lose hundreds of thousands of NOK annually on unanswered phones. We look at the numbers.',
    date: '2025-02-15',
    readTime: '5 min',
    tag: 'Innsikt',
    tagEn: 'Insight',
  },
  {
    slug: 'ai-norge-2025',
    title: 'Norge leder AI-revolusjonen i Europa — hva betyr det for din bedrift?',
    titleEn: 'Norway leads the AI revolution in Europe — what does it mean for your business?',
    excerpt: 'Med 46% AI-adopsjon er Norge nummer 1 i Europa. Slik kan du utnytte denne trenden for å få et konkurransefortrinn.',
    excerptEn: 'With 46% AI adoption, Norway is #1 in Europe. Here\'s how you can leverage this trend for a competitive edge.',
    date: '2025-02-10',
    readTime: '6 min',
    tag: 'Trender',
    tagEn: 'Trends',
  },
  {
    slug: 'gdpr-ai-telefon',
    title: 'GDPR og AI-telefonsvar: Alt du trenger å vite',
    titleEn: 'GDPR and AI phone answering: Everything you need to know',
    excerpt: 'Kan du bruke AI til å svare telefonen og samtidig følge GDPR? Ja — her er hvordan vi gjør det trygt og lovlig.',
    excerptEn: 'Can you use AI to answer phones while following GDPR? Yes — here\'s how we do it safely and legally.',
    date: '2025-02-05',
    readTime: '7 min',
    tag: 'Juridisk',
    tagEn: 'Legal',
  },
]

export default function BlogPage() {
  const [lang, setLang] = useState<'no'|'en'>('no')
  const router = useRouter()

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(180deg, ${bg} 0%, #0d0d15 50%, ${bg} 100%)`, color: '#f0f0f0', fontFamily: "'DM Sans', sans-serif" }}>
      <Nav lang={lang} setLang={setLang} />

      <section style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 40px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 30, background: `rgba(${goldRgb},0.06)`, border: `1px solid rgba(${goldRgb},0.15)`, fontSize: 13, color: gold, marginBottom: 24 }}>
          <BookOpen size={14} />
          {lang === 'no' ? 'Arxon Blogg' : 'Arxon Blog'}
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.4 }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px, 5vw, 46px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 16 }}>
          {lang === 'no' ? (<>Innsikt om <span style={{ color: gold }}>AI og norsk næringsliv</span></>) : (<>Insights on <span style={{ color: gold }}>AI and Norwegian business</span></>)}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.35 }}
          style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '0 auto', lineHeight: 1.6 }}>
          {lang === 'no' ? 'Praktiske artikler om AI-automatisering, tapt omsetning og digitalisering for norske bedrifter.' : 'Practical articles on AI automation, lost revenue and digitalization for Norwegian businesses.'}
        </motion.p>
      </section>

      <section style={{ maxWidth: 750, margin: '0 auto', padding: '0 24px 80px' }}>
        {articles.map((article, i) => (
          <motion.article key={i} {...fadeUp}
            onClick={() => router.push(`/blogg/${article.slug}`)}
            style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 18, padding: '32px 28px', marginBottom: 16, cursor: 'pointer',
              transition: 'all 0.3s', position: 'relative',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `rgba(${goldRgb},0.2)`; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 11, color: gold, background: `rgba(${goldRgb},0.08)`, padding: '3px 10px', borderRadius: 6, fontWeight: 600 }}>
                {lang === 'no' ? article.tag : article.tagEn}
              </span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Clock size={11} />{article.readTime}
              </span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>{article.date}</span>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 600, fontFamily: "'Playfair Display', serif", marginBottom: 8, lineHeight: 1.3 }}>
              {lang === 'no' ? article.title : article.titleEn}
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: 12 }}>
              {lang === 'no' ? article.excerpt : article.excerptEn}
            </p>
            <span style={{ fontSize: 13, color: gold, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
              {lang === 'no' ? 'Les artikkelen' : 'Read article'} <ArrowUpRight size={14} />
            </span>
          </motion.article>
        ))}
      </section>

      <footer style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>&copy; {new Date().getFullYear()} Arxon. {lang === 'no' ? 'Alle rettigheter reservert.' : 'All rights reserved.'}</span>
      </footer>
    </div>
  )
}
