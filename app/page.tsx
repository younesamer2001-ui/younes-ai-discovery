'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Language, t } from '@/lib/translations'
import { ArrowRight, Bot, Shield, Clock, Globe, Sparkles, BarChart3, CheckCircle2 } from 'lucide-react'

export default function LandingPage() {
  const [lang, setLang] = useState<Language>('no')
  const router = useRouter()

  const toggleLang = () => setLang(lang === 'no' ? 'en' : 'no')

  const features = lang === 'no' ? [
    { icon: Bot, title: 'AI-drevet analyse', desc: 'Intelligente spørsmål tilpasset din bransje og utfordringer' },
    { icon: BarChart3, title: 'Personlig rapport', desc: 'Få en skreddersydd AI-integrasjonsplan for din bedrift' },
    { icon: Clock, title: 'Kun 10 minutter', desc: 'Rask og effektiv prosess — svar når det passer deg' },
    { icon: Shield, title: 'Ekspert-gjennomgang', desc: 'Vårt team vurderer og følger opp innen 48 timer' },
  ] : [
    { icon: Bot, title: 'AI-powered analysis', desc: 'Smart questions tailored to your industry and challenges' },
    { icon: BarChart3, title: 'Personal report', desc: 'Get a custom AI integration plan for your business' },
    { icon: Clock, title: 'Only 10 minutes', desc: 'Quick and efficient — answer at your convenience' },
    { icon: Shield, title: 'Expert review', desc: 'Our team reviews and follows up within 48 hours' },
  ]

  const steps = lang === 'no' ? [
    { num: '01', title: 'Svar på spørsmål', desc: 'AI-en stiller smarte, tilpassede spørsmål om din bedrift' },
    { num: '02', title: 'Få din analyse', desc: 'En detaljert rapport med anbefalinger for AI-integrasjon' },
    { num: '03', title: 'Vi tar kontakt', desc: 'Vårt team vurderer og diskuterer muligheter med deg' },
  ] : [
    { num: '01', title: 'Answer questions', desc: 'The AI asks smart, adaptive questions about your business' },
    { num: '02', title: 'Get your analysis', desc: 'A detailed report with AI integration recommendations' },
    { num: '03', title: 'We follow up', desc: 'Our team reviews and discusses possibilities with you' },
  ]

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-brand-500" />
          <span className="font-bold text-xl text-gray-900 dark:text-white">Younes AI</span>
        </div>
        <button
          onClick={toggleLang}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300 transition"
        >
          <Globe className="w-4 h-4" />
          {t('language_toggle', lang)}
        </button>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 text-sm font-medium mb-8 dark:bg-brand-950 dark:text-brand-400">
          <Sparkles className="w-4 h-4" />
          {lang === 'no' ? 'Gratis AI-analyse for din bedrift' : 'Free AI analysis for your business'}
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
          {t('hero_title', lang)}
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
          {t('hero_subtitle', lang)}
        </p>

        <button
          onClick={() => router.push(`/login?lang=${lang}`)}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg shadow-lg shadow-brand-600/25 hover:shadow-brand-600/40 transition-all"
        >
          {t('hero_cta', lang)}
          <ArrowRight className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            {t('hero_trust_1', lang)}
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            {t('hero_trust_2', lang)}
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            {t('hero_trust_3', lang)}
          </span>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div key={i} className="glass rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900 flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          {lang === 'no' ? 'Slik fungerer det' : 'How it works'}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-5xl font-extrabold text-brand-200 dark:text-brand-800 mb-4">{s.num}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{s.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="glass rounded-3xl p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {lang === 'no' ? 'Klar til å komme i gang?' : 'Ready to get started?'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {lang === 'no'
              ? 'Det tar bare 10 minutter, og det er helt gratis.'
              : 'It only takes 10 minutes, and it\'s completely free.'}
          </p>
          <button
            onClick={() => router.push(`/login?lang=${lang}`)}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg shadow-lg shadow-brand-600/25 transition-all"
          >
            {t('hero_cta', lang)}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span>Younes AI Co.</span>
          </div>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  )
}
