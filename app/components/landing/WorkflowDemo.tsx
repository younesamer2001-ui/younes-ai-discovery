'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Bot, Calendar, Send, UserCheck, Receipt, Zap, CheckCircle2 } from 'lucide-react'
import { gold, goldRgb } from '@/lib/constants'

export function WorkflowDemo() {
  const [activeStep, setActiveStep] = useState(-1)
  const inViewRef = useRef<HTMLDivElement>(null)
  const inView = useInView(inViewRef, { once: false, amount: 0.4 })

  const steps = [
    { icon: <Phone size={18} />, label: 'Kunde ringer', detail: '+47 912 34 567', color: '#60a5fa' },
    { icon: <Bot size={18} />, label: 'AI svarer', detail: 'Kvalifiserer lead', color: gold },
    { icon: <Calendar size={18} />, label: 'Booking', detail: 'Onsdag kl. 10:00', color: '#a78bfa' },
    { icon: <Send size={18} />, label: 'SMS sendt', detail: 'Bekreftelse + påminnelse', color: '#4ade80' },
    { icon: <UserCheck size={18} />, label: 'Lead lagret', detail: 'CRM oppdatert', color: '#f472b6' },
    { icon: <Receipt size={18} />, label: 'Oppfølging', detail: 'Auto etter 24t', color: '#fb923c' },
  ]

  useEffect(() => {
    if (!inView) { setActiveStep(-1); return }
    setActiveStep(-1)
    const timers: NodeJS.Timeout[] = []
    steps.forEach((_, i) => {
      timers.push(setTimeout(() => setActiveStep(i), 800 + i * 1200))
    })
    timers.push(setTimeout(() => setActiveStep(-1), 800 + steps.length * 1200 + 2500))
    const interval = setInterval(() => {
      setActiveStep(-1)
      steps.forEach((_, i) => {
        timers.push(setTimeout(() => setActiveStep(i), 800 + i * 1200))
      })
    }, 800 + steps.length * 1200 + 3500)
    return () => { timers.forEach(clearTimeout); clearInterval(interval) }
  }, [inView])

  return (
    <div ref={inViewRef} className="demo-workflow-frame">
      <div className="demo-workflow-header">
        <Zap size={14} style={{ color: gold }} />
        <span className="text-[12px] font-semibold" style={{ color: '#f4f1eb' }}>Automatisk arbeidsflyt</span>
        <span className="demo-workflow-live">LIVE</span>
      </div>

      <div className="demo-workflow-steps">
        {steps.map((s, i) => (
          <div key={i} className="demo-workflow-step-row">
            {i > 0 && (
              <div className="demo-workflow-connector">
                <motion.div
                  className="demo-workflow-connector-fill"
                  initial={{ height: 0 }}
                  animate={{ height: activeStep >= i ? '100%' : '0%' }}
                  transition={{ duration: 0.4 }}
                  style={{ background: `rgba(${goldRgb},0.3)` }}
                />
              </div>
            )}

            <motion.div
              className="demo-workflow-step"
              animate={{
                borderColor: activeStep >= i ? s.color : 'rgba(244,241,235,0.08)',
                background: activeStep >= i ? `${s.color}10` : 'rgba(255,255,255,0.02)',
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="demo-workflow-icon"
                animate={{
                  background: activeStep >= i ? `${s.color}20` : 'rgba(244,241,235,0.05)',
                  scale: activeStep === i ? 1.1 : 1,
                }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
              >
                <span style={{ color: activeStep >= i ? s.color : 'rgba(244,241,235,0.35)' }}>{s.icon}</span>
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-semibold" style={{ color: activeStep >= i ? '#f4f1eb' : 'rgba(244,241,235,0.4)' }}>
                  {s.label}
                </div>
                <div className="text-[10px]" style={{ color: activeStep >= i ? 'rgba(244,241,235,0.6)' : 'rgba(244,241,235,0.25)' }}>
                  {s.detail}
                </div>
              </div>
              {activeStep >= i && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                  <CheckCircle2 size={14} style={{ color: s.color }} />
                </motion.div>
              )}
            </motion.div>
          </div>
        ))}
      </div>

      <div className="demo-workflow-footer">
        <motion.div
          animate={{ width: `${Math.max(0, ((activeStep + 1) / steps.length) * 100)}%` }}
          transition={{ duration: 0.4 }}
          className="demo-workflow-progress"
          style={{ background: `linear-gradient(90deg, rgba(${goldRgb},0.4), ${gold})` }}
        />
        <div className="text-[10px] text-center pt-2" style={{ color: 'rgba(244,241,235,0.45)' }}>
          {activeStep >= 0
            ? `${activeStep + 1}/${steps.length} steg fullført — ${activeStep >= steps.length - 1 ? 'Alt automatisert!' : 'Behandler…'}`
            : 'Venter på innkommende henvendelse…'
          }
        </div>
      </div>
    </div>
  )
}
