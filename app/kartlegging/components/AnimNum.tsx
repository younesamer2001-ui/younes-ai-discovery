'use client'

import { useState, useEffect, useRef } from 'react'

export function AnimNum({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const dur = 800
    const startTime = Date.now()

    const tick = () => {
      const p = Math.min((Date.now() - startTime) / dur, 1)
      setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [value])

  return <span>{display.toLocaleString('nb-NO')}{suffix}</span>
}
