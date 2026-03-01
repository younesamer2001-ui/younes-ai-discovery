'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Bot, Phone } from 'lucide-react'
import { gold, goldRgb } from '@/lib/constants'

export function PhoneDemo() {
  const [step, setStep] = useState(0)
  const inViewRef = useRef<HTMLDivElement>(null)
  const inView = useInView(inViewRef, { once: false, amount: 0.4 })

  const messages = [
    { from: 'system', text: 'Innkommende anrop fra +47 912 34 567…' },
    { from: 'ai', text: 'Hei! Velkommen til Bygg & Montasje AS. Hvordan kan jeg hjelpe deg?' },
    { from: 'customer', text: 'Hei, jeg trenger tilbud på nytt bad. Er det mulig å få befaring?' },
    { from: 'ai', text: 'Selvfølgelig! Jeg ser at vi har ledig tid onsdag kl. 10:00 eller torsdag kl. 14:00. Hva passer best?' },
    { from: 'customer', text: 'Onsdag kl. 10 passer fint!' },
    { from: 'ai', text: 'Flott! Befaring booket onsdag kl. 10:00. Du får bekreftelse på SMS nå. Noe annet jeg kan hjelpe med?' },
  ]

  useEffect(() => {
    if (!inView) { setStep(0); return }
    setStep(0)
    const timers: NodeJS.Timeout[] = []
    messages.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i + 1), 1200 + i * 2000))
    })
    timers.push(setTimeout(() => setStep(0), 1200 + messages.length * 2000 + 3000))
    const interval = setInterval(() => {
      setStep(0)
      messages.forEach((_, i) => {
        timers.push(setTimeout(() => setStep(i + 1), 1200 + i * 2000))
      })
    }, 1200 + messages.length * 2000 + 4000)
    return () => { timers.forEach(clearTimeout); clearInterval(interval) }
  }, [inView])

  return (
    <div ref={inViewRef} className="demo-phone-frame">
      <div className="demo-phone-header">
        <div className="demo-phone-notch" />
        <div className="flex items-center justify-between px-5 pt-10 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `rgba(${goldRgb},0.15)` }}>
              <Bot size={14} style={{ color: gold }} />
            </div>
            <div>
              <div className="text-[12px] font-semibold" style={{ color: '#f4f1eb' }}>Arxon AI</div>
              <div className="text-[10px]" style={{ color: '#4ade80' }}>Aktiv 24/7</div>
            </div>
          </div>
          <Phone size={14} style={{ color: 'rgba(244,241,235,0.4)' }} />
        </div>
      </div>

      <div className="demo-phone-body">
        <AnimatePresence mode="sync">
          {messages.slice(0, step).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`demo-msg ${msg.from === 'customer' ? 'demo-msg-customer' : msg.from === 'ai' ? 'demo-msg-ai' : 'demo-msg-system'}`}
            >
              {msg.from === 'system' && <Phone size={11} className="inline mr-1.5" style={{ color: '#4ade80' }} />}
              {msg.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {step > 0 && step < messages.length && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="demo-msg demo-msg-ai demo-typing"
          >
            <span className="demo-dot" /><span className="demo-dot" /><span className="demo-dot" />
          </motion.div>
        )}
      </div>
    </div>
  )
}
