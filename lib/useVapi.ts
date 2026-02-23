'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Vapi from '@vapi-ai/web'

export type CallStatus = 'idle' | 'connecting' | 'active' | 'ending'

interface Message {
  role: 'user' | 'assistant'
  text: string
  timestamp: number
}

interface UseVapiReturn {
  status: CallStatus
  isMuted: boolean
  volume: number
  messages: Message[]
  start: () => Promise<void>
  stop: () => void
  toggleMute: () => void
}

const VAPI_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || ''
const VAPI_ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || ''

export function useVapi(): UseVapiReturn {
  const [status, setStatus] = useState<CallStatus>('idle')
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0)
  const [messages, setMessages] = useState<Message[]>([])
  const vapiRef = useRef<Vapi | null>(null)

  useEffect(() => {
    if (!VAPI_PUBLIC_KEY) return

    const vapi = new Vapi(VAPI_PUBLIC_KEY)
    vapiRef.current = vapi

    vapi.on('call-start', () => {
      setStatus('active')
    })

    vapi.on('call-end', () => {
      setStatus('idle')
      setVolume(0)
    })

    vapi.on('speech-start', () => {
      // User started speaking
    })

    vapi.on('speech-end', () => {
      // User stopped speaking
    })

    vapi.on('volume-level', (level: number) => {
      setVolume(level)
    })

    vapi.on('message', (msg: any) => {
      if (msg.type === 'transcript') {
        if (msg.transcriptType === 'final') {
          setMessages(prev => [...prev, {
            role: msg.role === 'assistant' ? 'assistant' : 'user',
            text: msg.transcript,
            timestamp: Date.now(),
          }])
        }
      }
    })

    vapi.on('error', (err: any) => {
      console.error('Vapi error:', err)
      setStatus('idle')
    })

    return () => {
      vapi.stop()
    }
  }, [])

  const start = useCallback(async () => {
    if (!vapiRef.current) return
    setStatus('connecting')
    setMessages([])

    try {
      if (VAPI_ASSISTANT_ID) {
        await vapiRef.current.start(VAPI_ASSISTANT_ID)
      } else {
        // Inline assistant config — great for demos without a saved assistant
        await vapiRef.current.start({
          model: {
            provider: 'openai',
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `Du er en vennlig AI-resepsjonist for Arxon, et norsk selskap som tilbyr AI-automatisering for bedrifter.

Dine oppgaver:
- Svar på spørsmål om Arxon sine tjenester (AI mobilsvarer, automatisering, integrasjoner)
- Forklar hvordan AI-mobilsvareren fungerer
- Hjelp med å booke en gratis kartlegging
- Svar kort og profesjonelt på norsk

Priser:
- Starter: 1-2 automatiseringer, 10-20 timer spart/uke
- Profesjonell: 3-5 automatiseringer, 20-35 timer spart/uke
- Vekst: 6+ automatiseringer, 35-50+ timer spart/uke

Viktig:
- Vær vennlig men profesjonell
- Hold svarene korte (maks 2-3 setninger)
- Snakk norsk med mindre kunden snakker engelsk
- Hvis kunden vil booke, si at de kan starte en gratis kartlegging på arxon.no`,
              },
            ],
          },
          voice: {
            provider: 'azure',
            voiceId: 'nb-NO-FinnNeural',
          },
          transcriber: {
            provider: 'deepgram',
            model: 'nova-2',
            language: 'no',
          },
          firstMessage: 'Hei! Velkommen til Arxon. Hvordan kan jeg hjelpe deg i dag?',
          name: 'Arxon AI Resepsjonist',
        })
      }
    } catch (err) {
      console.error('Failed to start call:', err)
      setStatus('idle')
    }
  }, [])

  const stop = useCallback(() => {
    if (!vapiRef.current) return
    setStatus('ending')
    vapiRef.current.stop()
  }, [])

  const toggleMute = useCallback(() => {
    if (!vapiRef.current) return
    const newMuted = !isMuted
    vapiRef.current.setMuted(newMuted)
    setIsMuted(newMuted)
  }, [isMuted])

  return { status, isMuted, volume, messages, start, stop, toggleMute }
}
