'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Vapi from '@vapi-ai/web'

/* ───────── constants ───────── */
const gold = '#c9a96e'
const bg = '#0d0d14'
const inputBg = '#1a1a28'
const textPrimary = '#e8e8ed'
const textSecondary = '#8a8a9a'

export default function ChatWidget() {
  const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY
  const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID

  /* state */
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isCallActive, setIsCallActive] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [volumeLevel, setVolumeLevel] = useState(0)
  const [isConnecting, setIsConnecting] = useState(false)
  const [statusText, setStatusText] = useState('')

  const vapiRef = useRef<Vapi | null>(null)

  /* wait for client mount to avoid hydration mismatch */
  useEffect(() => { setMounted(true) }, [])

  /* initialise Vapi */
  useEffect(() => {
    if (!publicKey) return
    const vapi = new Vapi(publicKey)
    vapiRef.current = vapi

    vapi.on('call-start', () => {
      setIsCallActive(true)
      setIsConnecting(false)
      setStatusText('Tilkoblet')
    })
    vapi.on('call-end', () => {
      setIsCallActive(false)
      setIsSpeaking(false)
      setIsListening(false)
      setVolumeLevel(0)
      setIsConnecting(false)
      setStatusText('')
    })
    vapi.on('speech-start', () => {
      setIsSpeaking(true)
      setIsListening(false)
      setStatusText('Finn snakker...')
    })
    vapi.on('speech-end', () => {
      setIsSpeaking(false)
      setStatusText('Lytter...')
    })
    vapi.on('volume-level', (level: number) => {
      setVolumeLevel(level)
    })
    vapi.on('message', (msg: any) => {
      if (msg.type === 'transcript') {
        if (msg.transcriptType === 'partial' && msg.role === 'user') {
          setIsListening(true)
          setStatusText('Lytter...')
        }
        if (msg.transcriptType === 'final' && msg.role === 'user') {
          setIsListening(false)
        }
      }
    })
    vapi.on('error', (err: any) => {
      console.error('Vapi error:', err)
      setIsConnecting(false)
      setStatusText('Noe gikk galt')
    })

    return () => { vapi.stop() }
  }, [publicKey])

  /* toggle voice call */
  const toggleCall = useCallback(async () => {
    if (!vapiRef.current || !assistantId) return
    if (isCallActive) {
      vapiRef.current.stop()
    } else {
      setIsConnecting(true)
      setStatusText('Kobler til...')
      try {
        await vapiRef.current.start(assistantId)
      } catch (e) {
        console.error('Failed to start call:', e)
        setIsConnecting(false)
        setStatusText('')
      }
    }
  }, [isCallActive, assistantId])

  /* send text message during call */
  const sendMessage = useCallback(() => {
    if (!inputValue.trim() || !vapiRef.current) return
    const text = inputValue.trim()
    setInputValue('')

    if (isCallActive) {
      vapiRef.current.send({
        type: 'add-message',
        message: { role: 'user', content: text },
      })
    } else {
      if (!assistantId) return
      setIsConnecting(true)
      setStatusText('Kobler til...')
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
        setStatusText('')
      })
    }
  }, [inputValue, isCallActive, assistantId])

  if (!publicKey || !assistantId || !mounted) return null

  /* ───────── orb visuals ───────── */
  const orbScale = 1 + volumeLevel * 0.35
  const isActive = isCallActive || isConnecting

  const orbColor1 = isActive
    ? isSpeaking ? gold : isListening ? '#7c6bff' : '#4a6aff'
    : gold
  const orbColor2 = isActive
    ? isSpeaking ? '#b8953f' : isListening ? '#5b4ccc' : '#2a4a88'
    : '#8a7340'
  const glowStrength = isActive
    ? isSpeaking ? 0.7 : isListening ? 0.5 : 0.3
    : 0.2

  return (
    <>
      {/* ── floating trigger button ── */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Snakk med Arxon AI"
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
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0a0a0f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        </button>
      )}

      {/* ── voice panel ── */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 9999,
          width: 340,
          maxWidth: 'calc(100vw - 32px)',
          borderRadius: 24,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          background: bg,
          border: '1px solid rgba(201,169,110,0.10)',
          boxShadow: '0 8px 48px rgba(0,0,0,0.6), 0 0 60px rgba(201,169,110,0.05)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}>

          {/* header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 18px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: `radial-gradient(circle at 40% 40%, ${gold}, #8a7340)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
                color: '#0a0a0f',
              }}>A</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: textPrimary }}>Finn — Arxon AI</div>
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
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = textPrimary }}
              onMouseLeave={(e) => { e.currentTarget.style.color = textSecondary }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* main orb area */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px 20px 24px',
            gap: 20,
          }}>
            {/* the orb — click to toggle call */}
            <button
              onClick={toggleCall}
              disabled={isConnecting}
              aria-label={isCallActive ? 'Avslutt samtale' : 'Start samtale'}
              style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                border: 'none',
                background: `radial-gradient(circle at 40% 40%, ${orbColor1}aa, ${orbColor2}66, transparent)`,
                boxShadow: `0 0 ${30 + volumeLevel * 50}px rgba(${isActive && !isSpeaking ? '100,100,255' : '201,169,110'},${glowStrength}),
                            0 0 ${60 + volumeLevel * 80}px rgba(${isActive && !isSpeaking ? '100,100,255' : '201,169,110'},${glowStrength * 0.4})`,
                transform: `scale(${orbScale})`,
                transition: 'transform 0.15s ease, box-shadow 0.3s ease, background 0.4s ease',
                cursor: isConnecting ? 'wait' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isConnecting ? (
                <div style={{
                  width: 28,
                  height: 28,
                  border: '2.5px solid rgba(255,255,255,0.15)',
                  borderTop: '2.5px solid rgba(255,255,255,0.8)',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
              ) : isCallActive ? (
                /* stop icon */
                <svg width="28" height="28" viewBox="0 0 24 24" fill="rgba(255,255,255,0.85)" stroke="none">
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
              ) : (
                /* mic icon */
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              )}
            </button>

            {/* status text */}
            <div style={{
              fontSize: 13,
              color: isActive ? (isSpeaking ? gold : textSecondary) : textSecondary,
              textAlign: 'center',
              minHeight: 20,
              transition: 'color 0.2s',
            }}>
              {isActive
                ? statusText
                : 'Trykk for å snakke med Finn'
              }
            </div>
          </div>

          {/* text input — for typing email, phone etc. when Finn asks */}
          <div style={{
            padding: '0 16px 16px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: inputBg,
              borderRadius: 22,
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '0 4px 0 16px',
            }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() }}
                placeholder={isCallActive ? 'Skriv svar her...' : 'Eller skriv en melding...'}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: textPrimary,
                  fontSize: 13,
                  padding: '10px 0',
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim()}
                aria-label="Send"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: 'none',
                  background: inputValue.trim() ? gold : 'transparent',
                  cursor: inputValue.trim() ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.15s',
                  flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
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

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}
