'use client'

import { Link2 } from 'lucide-react'
import { goldRgb } from '@/lib/constants'

interface ConnectionStatusProps {
  connectedCount: number
  totalCount: number
}

export function ConnectionStatus({ connectedCount, totalCount }: ConnectionStatusProps) {
  const isComplete = connectedCount === totalCount && connectedCount > 0

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '6px 14px', borderRadius: 20,
      background: isComplete ? 'rgba(74,222,128,0.08)' : 'rgba(255,255,255,0.04)',
      border: '1px solid ' + (isComplete ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.06)'),
    }}>
      <Link2 size={14} color={isComplete ? '#4ade80' : 'rgba(255,255,255,0.3)'} />
      <span style={{
        fontSize: 13, fontWeight: 600,
        color: isComplete ? '#4ade80' : 'rgba(255,255,255,0.4)',
      }}>
        {connectedCount}/{totalCount} tilkoblet
      </span>
    </div>
  )
}
