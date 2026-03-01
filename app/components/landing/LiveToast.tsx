'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { goldRgb } from '@/lib/constants'

export function LiveToast() {
  const names = ['Martin', 'Lena', 'Erik', 'Sara', 'Jonas', 'Ida', 'Anders', 'Nora']
  const cities = ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Kristiansand', 'Tromsø']
  const actions = ['startet gratis kartlegging', 'fikk sin AI-analyse', 'booket implementering']
  const [toast, setToast] = useState<{ name: string; city: string; action: string } | null>(null)

  useEffect(() => {
    const show = () => {
      setToast({ name: names[Math.floor(Math.random() * names.length)], city: cities[Math.floor(Math.random() * cities.length)], action: actions[Math.floor(Math.random() * actions.length)] })
      setTimeout(() => setToast(null), 4000)
    }
    const first = setTimeout(show, 8000)
    const interval = setInterval(show, 22000)
    return () => { clearTimeout(first); clearInterval(interval) }
  }, [])

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="fixed bottom-20 left-4 md:bottom-6 md:left-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{ background: 'rgba(13,26,45,0.9)', border: `1px solid rgba(${goldRgb},0.15)`, backdropFilter: 'blur(12px)', maxWidth: 320 }}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `rgba(${goldRgb},0.15)`, color: '#efc07b' }}>
            {toast.name[0]}
          </div>
          <div>
            <p className="text-xs" style={{ color: 'rgba(244,241,235,0.8)' }}><strong>{toast.name}</strong> fra {toast.city}</p>
            <p className="text-[11px]" style={{ color: 'rgba(244,241,235,0.6)' }}>{toast.action}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
