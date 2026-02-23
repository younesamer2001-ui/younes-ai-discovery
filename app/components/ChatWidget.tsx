'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Vapi from '@vapi-ai/web'

/* ───────── types ───────── */
interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

/* ───────── fix common STT misspellings ───────── */
const sttFixes: [RegExp, string][] = [
  [/\b(AKS+on|Aksen|Akson|Arkson|Axon|Arx[oe]n)\b/gi, 'Arxon'],
]
function fixStt(text: string): string {
  let fixed = text
  for (const [pattern, replacement] of sttFixes) {
    fixed = fixed.replace(pattern, replacement)
  }
  return fixed
}

/* ───────── constants ───────── */
const gold = '#c9a96e'
const bg = '#0d0d14'
const cardBg = '#15151f'
const inputBg = '#1a1a28'
const textPrimary = '#e8e8ed'
const textSecondary = '#8a8a9a'

export default function ChatWidget() {
  const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY
  const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID

  /* state */
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isCallActive, setIsCallActive] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [volumeLevel, setVolumeLevel] = useState(0)
  const [isConnecting, setIsConnecting] = useState(false)

  /* wait for client mount to avoid hydration mismatch */
  useEffect(() => { setMounted(true) }, [])

  const vapiRef = useRef<Vapi | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  /* scroll to bottom */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  /* initialise Vapi */
  useEffect(() => {
    if (!publicKey) return
    const vapi = new Vapi(publicKey)
    vapiRef.current = vapi

    vapi.on('call-start', () => {
      setIsCallActive(true)
      setIsConnecting(false)
    })
    vapi.on('call-end', () => {
      setIsCallActive(false)
      setIsSpeaking(false)
      setIsListening(false)
      setVolumeLevel(0)
      setIsConnecting(false)
    })
    vapi.on('speech-start', () => {
      setIsSpeaking(true)
      setIsListening(false)
    })
    vapi.on('speech-end', () => {
      setIsSpeaking(false)
    })
    vapi.on('volume-level', (level: number) => {
      setVolumeLevel(level)
    })
    vapi.on('message', (msg: any) => {
      /* Use transcript events ONLY for speaking/listening indicators — not for messages */
      if (msg.type === 'transcript') {
        if (msg.transcriptType === 'partial' && msg.role === 'user') {
          setIsListening(true)
        }
        if (msg.transcriptType === 'final' && msg.role === 'user') {
          setIsListening(false)
        }
      }
      /* Use conversation-update for actual message display (accurate LLM text, no STT errors) */
      if (msg.type === 'conversation-update' && msg.conversation) {
        setMessages(prev => {
          const conv = msg.conversation.filter(
            (m: any) => (m.role === 'user' || m.role === 'assistant') && m.content
          )
          /* Only update if conversation has grown */
          if (conv.length <= prev.length) return prev
          return conv.map((m: any) => ({
            role: m.role as 'user' | 'assistant',
            content: fixStt(m.content),
            timestamp: new Date(),
          }))
        })
      }
    })
    vapi.on('error', (err: any) => {
      console.error('Vapi error:', err)
      setIsConnecting(false)
    })

    return () => {
      vapi.stop()
    }
  }, [publicKey])

  /* toggle voice call */
  const toggleCall = useCallback(async () => {
    if (!vapiRef.current || !assistantId) return
    if (isCallActive) {
      vapiRef.current.stop()
    } else {
      setIsConnecting(true)
      try {
        await vapiRef.current.start(assistantId)
      } catch (e) {
        console.error('Failed to start call:', e)
        setIsConnecting(false)
      }
    }
  }, [isCallActive, assistantId])

  /* send text message */
  const sendMessage = useCallback(() => {
    if (!inputValue.trim() || !vapiRef.current) return
    const text = inputValue.trim()
    setInputValue('')

    if (isCallActive) {
      /* during active call, inject the message */
      vapiRef.current.send({
        type: 'add-message',
        message: { role: 'user', content: text },
      })
      setMessages(prev => [...prev, { role: 'user', content: text, timestamp: new Date() }])
    } else {
      /* start call then inject message */
      if (!assistantId) return
      setMessages(prev => [...prev, { role: 'user', content: text, timestamp: new Date() }])
      setIsConnecting(true)
      vapiRef.current.start(assistantId).then(() => {
        setTimeout(() => {
          vapiRef.current?.send({
            type: 'add-message',
            message: { role: 'user', content: text },
          })
        }, 1500)
      }).catch((e) => {
        console.error('Failed to start call for message:', e)
        setIsConnecting(false)
      })
    }
  }, [inputValue, isCallActive, assistantId])

  if (!publicKey || !assistantId || !mounted) return null

  /* ───────── orb glow ───────── */
  const orbScale = 1 + volumeLevel * 0.3
  const glowIntensity = isCallActive
    ? isSpeaking ? 0.8 : isListening ? 0.5 : 0.3
    : 0.15
  const orbColor1 = isCallActive
    ? isSpeaking ? gold : isListening ? '#7c6bff' : '#4a4aff'
    : gold
  const orbColor2 = isCallActive
    ? isSpeaking ? '#d4a843' : isListening ? '#5b4ccc' : '#2a2a88'
    : '#8a7340'

  return (
    <>
      {/* ── floating trigger button ── */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Åpne chat"
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 9999,
            width: 60,
            height: 60,
            borderRadius: '50%',
            border: 'none',
            background: `radial-gradient(circle at 40% 40%, ${gold}, #8a7340)`,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 4px 24px rgba(201,169,110,0.4), 0 0 40px rgba(201,169,110,0.15)`,
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)'
            e.currentTarget.style.boxShadow = `0 6px 32px rgba(201,169,110,0.5), 0 0 60px rgba(201,169,110,0.2)`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = `0 4px 24px rgba(201,169,110,0.4), 0 0 40px rgba(201,169,110,0.15)`
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0a0a0f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}

      {/* ── chat panel ── */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 9999,
          width: 380,
          maxWidth: 'calc(100vw - 32px)',
          height: 560,
          maxHeight: 'calc(100vh - 48px)',
          borderRadius: 20,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          background: bg,
          border: '1px solid rgba(201,169,110,0.12)',
          boxShadow: '0 8px 48px rgba(0,0,0,0.6), 0 0 80px rgba(201,169,110,0.06)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}>

          {/* header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: `radial-gradient(circle at 40% 40%, ${gold}, #8a7340)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 700,
                color: '#0a0a0f',
              }}>A</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: textPrimary }}>Arxon AI</div>
                <div style={{ fontSize: 11, color: isCallActive ? '#4ade80' : textSecondary }}>
                  {isCallActive ? 'Tilkoblet' : 'Online'}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                if (isCallActive) vapiRef.current?.stop()
                setOpen(false)
              }}
              aria-label="Lukk"
              style={{
                background: 'none',
                border: 'none',
                color: textSecondary,
                cursor: 'pointer',
                padding: 4,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = textPrimary }}
              onMouseLeave={(e) => { e.currentTarget.style.color = textSecondary }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* messages area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 16px 8px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}>
            {messages.length === 0 && !isCallActive && !isConnecting && (
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                padding: 20,
                textAlign: 'center',
              }}>
                {/* static orb for empty state */}
                <div style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: `radial-gradient(circle at 40% 40%, ${gold}40, ${gold}10)`,
                  border: `2px solid ${gold}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                </div>
                <div style={{ fontSize: 15, fontWeight: 500, color: textPrimary }}>
                  Hei! Jeg er Arxon AI
                </div>
                <div style={{ fontSize: 13, color: textSecondary, lineHeight: 1.5 }}>
                  Trykk på mikrofonen for å snakke,<br />eller skriv en melding nedenfor.
                </div>
              </div>
            )}

            {/* voice orb — shown during active call when there are no/few messages */}
            {(isCallActive || isConnecting) && messages.length < 2 && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px 0',
                gap: 16,
              }}>
                <div style={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: `radial-gradient(circle at 40% 40%, ${orbColor1}90, ${orbColor2}60, transparent)`,
                  boxShadow: `0 0 ${40 + volumeLevel * 40}px ${orbColor1}${Math.round(glowIntensity * 255).toString(16).padStart(2, '0')},
                              0 0 ${80 + volumeLevel * 60}px ${orbColor1}${Math.round(glowIntensity * 128).toString(16).padStart(2, '0')}`,
                  transform: `scale(${orbScale})`,
                  transition: 'transform 0.15s ease, box-shadow 0.3s ease, background 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {isConnecting ? (
                    <div style={{
                      width: 24,
                      height: 24,
                      border: '2px solid rgba(255,255,255,0.2)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite',
                    }} />
                  ) : (
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="23" />
                      <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                  )}
                </div>
                <div style={{ fontSize: 13, color: textSecondary }}>
                  {isConnecting ? 'Kobler til...' : isSpeaking ? 'Arxon snakker...' : isListening ? 'Lytter...' : 'Tilkoblet — snakk eller skriv'}
                </div>
              </div>
            )}

            {/* chat bubbles */}
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div style={{
                  maxWidth: '80%',
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user'
                    ? `linear-gradient(135deg, ${gold}, #b8953f)`
                    : cardBg,
                  color: msg.role === 'user' ? '#0a0a0f' : textPrimary,
                  fontSize: 13.5,
                  lineHeight: 1.5,
                  boxShadow: msg.role === 'user'
                    ? '0 2px 8px rgba(201,169,110,0.2)'
                    : '0 1px 4px rgba(0,0,0,0.2)',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* bottom bar */}
          <div style={{
            padding: '12px 16px 16px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            {/* mic button */}
            <button
              onClick={toggleCall}
              disabled={isConnecting}
              aria-label={isCallActive ? 'Avslutt samtale' : 'Start samtale'}
              style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                border: 'none',
                background: isCallActive
                  ? '#ef4444'
                  : `linear-gradient(135deg, ${gold}, #b8953f)`,
                cursor: isConnecting ? 'wait' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'transform 0.15s, opacity 0.15s',
                opacity: isConnecting ? 0.7 : 1,
                boxShadow: isCallActive
                  ? '0 2px 12px rgba(239,68,68,0.4)'
                  : `0 2px 12px rgba(201,169,110,0.3)`,
              }}
              onMouseEnter={(e) => { if (!isConnecting) e.currentTarget.style.transform = 'scale(1.08)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              {isConnecting ? (
                <div style={{
                  width: 18,
                  height: 18,
                  border: '2px solid rgba(10,10,15,0.3)',
                  borderTop: '2px solid #0a0a0f',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
              ) : isCallActive ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" stroke="none">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0a0a0f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              )}
            </button>

            {/* text input */}
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              background: inputBg,
              borderRadius: 22,
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '0 4px 0 16px',
              transition: 'border-color 0.2s',
            }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() }}
                placeholder="Skriv en melding..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: textPrimary,
                  fontSize: 13.5,
                  padding: '10px 0',
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim()}
                aria-label="Send"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  border: 'none',
                  background: inputValue.trim() ? gold : 'transparent',
                  cursor: inputValue.trim() ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.15s, transform 0.1s',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => { if (inputValue.trim()) e.currentTarget.style.transform = 'scale(1.05)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke={inputValue.trim() ? '#0a0a0f' : textSecondary}
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* keyframes */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}
