'use client'

import { motion } from 'framer-motion'
import { TechLogos } from './TechLogos'
import { useLanguage } from '@/lib/language-context'

const sAnim = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

export function TrustBarSection() {
  const { lang } = useLanguage()
  const no = lang === 'no'

  return (
    <motion.section id="trust-bar" {...sAnim} className="py-16 md:py-20 relative overflow-hidden" style={{ borderTop: '1px solid rgba(244,241,235,0.04)' }}>
      <div className="max-w-4xl mx-auto px-5 text-center">
        <p className="text-[12px] tracking-[3px] uppercase mb-8" style={{ color: 'rgba(244,241,235,0.7)' }}>{no ? 'Bygget med teknologi fra verdensledende selskaper' : 'Built with technology from world-leading companies'}</p>
        <TechLogos />
      </div>
      <div className="gold-divider mt-16" />
    </motion.section>
  )
}
