'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-3" role="list" aria-label="Vanlige spørsmål">
      {items.map((item, i) => (
        <div key={i} role="listitem"
          className="glass-card cursor-pointer"
          onClick={() => setOpen(open === i ? null : i)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(open === i ? null : i) } }}
          tabIndex={0}
          aria-expanded={open === i}
          style={{ padding: '16px 20px' }}>
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-semibold" style={{ color: '#f4f1eb' }}>{item.q}</span>
            <ChevronDown size={18} className={`transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
              style={{ color: 'rgba(244,241,235,0.55)' }} aria-hidden="true" />
          </div>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                className="overflow-hidden" role="region"
              >
                <p className="text-[14px] mt-3 leading-relaxed" style={{ color: 'rgba(244,241,235,0.7)' }}>{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
