'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Vapi from '@vapi-ai/web'

/* ───────── constants ───────── */
const gold = '#c9a96e'
const bg = '#0d0d14'
const inputBg = '#1a1a28'
const textPrimary = '#e8e8ed'
const textSecondary = '#8a8a9a'

const labels = {
  no: {
    title: 'Finn — Arxon AI',
    tapToTalk: 'Trykk for å snakke med Finn',
    connecting: 'Kobler til...',
    connected: 'Tilkoblet',
    speaking: 'Finn snakker...',
    listening: 'Lytter...',
    error: 'Noe gikk galt',
    inputActive: 'Skriv svar her...',
    inputIdle: 'Eller skriv en melding...',
  },
  en: {
    title: 'Finn — Arxon AI',
    tapToTalk: 'Tap to talk to Finn',
    connecting: 'Connecting...',
    connected: 'Connected',
    speaking: 'Finn is speaking...',
    listening: 'Listening...',
    error: 'Something went wrong',
    inputActive: 'Type your answer...',
    inputIdle: 'Or type a message...',
  },
} as const

type Lang = keyof typeof labels

export default function ChatWidget() {
  const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY
  const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID

  /* state */
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState<Lang>('no')
  const [langOpen, setLangOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isCallActive, setIsCallActive] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [volumeLevel, setVolumeLevel] = useState(0)
  const [isConnecting, setIsConnecting] = useState(false)
  const [statusKey, setStatusKey] = useState<keyof typeof labels['no'] | ''>('')

  const vapiRef = useRef<Vapi | null>(null)
  const langRef = useRef(lang)
  langRef.current = lang

  /* initialise Vapi */
  useEffect(() => {
    if (!publicKey) return
    const vapi = new Vapi(publicKey)
    vapiRef.current = vapi

    vapi.on('call-start', () => { setIsCallActive(true); setIsConnecting(false); setStatusKey('connected') })
    vapi.on('call-end', () => { setIsCallActive(false); setIsSpeaking(false); setIsListening(false); setVolumeLevel(0); setIsConnecting(false); setStatusKey('') })
    vapi.on('speech-start', () => { setIsSpeaking(true); setIsListening(false); setStatusKey('speaking') })
    vapi.on('speech-end', () => { setIsSpeaking(false); setStatusKey('listening') })
    vapi.on('volume-level', (level: number) => { setVolumeLevel(level) })
    vapi.on('message', (msg: any) => {
      if (msg.type === 'transcript') {
        if (msg.transcriptType === 'partial' && msg.role === 'user') { setIsListening(true); setStatusKey('listening') }
        if (msg.transcriptType === 'final' && msg.role === 'user') { setIsListening(false) }
      }
    })
    vapi.on('error', () => { setIsConnecting(false); setStatusKey('error') })

    return () => { vapi.stop() }
  }, [publicKey])

  /* get firstMessage based on language */
  const getFirstMessage = (selectedLang: Lang) =>
    selectedLang === 'en'
      ? "Hi, and welcome to Arxon! My name is Finn, and I'm Arxon's AI assistant. How can I help you today?"
      : "Hei, og velkommen til Arxon! Mitt navn er Finn, og jeg er Arxons AI-assistent. Hvordan kan jeg hjelpe deg i dag?"

  /* when language changes mid-call, tell the assistant */
  const switchLang = useCallback((newLang: Lang) => {
    setLang(newLang)
    setLangOpen(false)
    if (isCallActive && vapiRef.current) {
      vapiRef.current.send({
        type: 'add-message',
        message: {
          role: 'user',
          content: newLang === 'en'
            ? '[System: The user has switched to English. Please respond only in English from now on.]'
            : '[System: Brukeren har byttet til norsk. Svar kun på norsk fra nå av.]',
        },
      })
    }
  }, [isCallActive])

  /* toggle voice call */
  const toggleCall = useCallback(async () => {
    if (!vapiRef.current || !assistantId) return
    if (isCallActive) {
      vapiRef.current.stop()
    } else {
      setIsConnecting(true)
      setStatusKey('connecting')
      try {
        await vapiRef.current.start(assistantId, {
          assistantOverrides: {
            firstMessage: getFirstMessage(lang),
          },
        })
      } catch (e) {
        console.error('Failed to start call:', e)
        setIsConnecting(false)
        setStatusKey('')
      }
    }
  }, [isCallActive, assistantId, lang])

  /* send text message during call */
  const sendMessage = useCallback(() => {
    if (!inputValue.trim() || !vapiRef.current) return
    const text = inputValue.trim()
    setInputValue('')

    if (isCallActive) {
      vapiRef.current.send({ type: 'add-message', message: { role: 'user', content: text } })
    } else {
      if (!assistantId) return
      setIsConnecting(true)
      setStatusKey('connecting')
      vapiRef.current.start(assistantId, {
        assistantOverrides: {
          firstMessage: getFirstMessage(lang),
        },
      }).then(() => {
        setTimeout(() => {
          vapiRef.current?.send({ type: 'add-message', message: { role: 'user', content: text } })
        }, 1500)
      }).catch(() => { setIsConnecting(false); setStatusKey('') })
    }
  }, [inputValue, isCallActive, assistantId, lang])

  if (!publicKey || !assistantId) return null

  const t = labels[lang]
  const statusText = statusKey ? t[statusKey] || '' : ''

  /* ───────── orb visuals ───────── */
  const orbScale = 1 + volumeLevel * 0.35
  const isActive = isCallActive || isConnecting
  const orbColor1 = isActive ? (isSpeaking ? gold : isListening ? '#7c6bff' : '#4a6aff') : gold
  const orbColor2 = isActive ? (isSpeaking ? '#b8953f' : isListening ? '#5b4ccc' : '#2a4a88') : '#8a7340'
  const glowStrength = isActive ? (isSpeaking ? 0.7 : isListening ? 0.5 : 0.3) : 0.2

  return (
    <>
      {/* ── floating trigger button ── */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Snakk med Arxon AI"
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 9999,
            width: 56,
            height: 56,
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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a0a0f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        </button>
      )}

      {/* ── voice panel ── */}
      {open && (
        <div className="arxon-widget" style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 9999,
          width: 320,
          maxWidth: 'calc(100vw - 24px)',
          borderRadius: 20,
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
            padding: '12px 14px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: `radial-gradient(circle at 40% 40%, ${gold}, #8a7340)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                fontWeight: 700,
                color: '#0a0a0f',
              }}>A</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: textPrimary }}>{t.title}</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {/* language dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  aria-label="Velg språk"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 8,
                    padding: '4px 8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    color: textSecondary,
                    fontSize: 12,
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                >
                  <span>{lang === 'no' ? '🇳🇴' : '🇬🇧'}</span>
                  <span>{lang === 'no' ? 'NO' : 'EN'}</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {langOpen && (
                  <>
                    {/* backdrop to close */}
                    <div
                      onClick={() => setLangOpen(false)}
                      style={{ position: 'fixed', inset: 0, zIndex: 1 }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: 4,
                      background: '#1a1a28',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 10,
                      overflow: 'hidden',
                      zIndex: 2,
                      minWidth: 120,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                    }}>
                      {(['no', 'en'] as Lang[]).map((l) => (
                        <button
                          key={l}
                          onClick={() => switchLang(l)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            width: '100%',
                            padding: '10px 14px',
                            background: lang === l ? 'rgba(201,169,110,0.1)' : 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: lang === l ? gold : textPrimary,
                            fontSize: 13,
                            textAlign: 'left',
                            transition: 'background 0.1s',
                          }}
                          onMouseEnter={(e) => { if (lang !== l) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                          onMouseLeave={(e) => { if (lang !== l) e.currentTarget.style.background = 'transparent' }}
                        >
                          <span>{l === 'no' ? '🇳🇴' : '🇬🇧'}</span>
                          <span>{l === 'no' ? 'Norsk' : 'English'}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* close button */}
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* main orb area */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 16px 18px',
            gap: 16,
          }}>
            <button
              onClick={toggleCall}
              disabled={isConnecting}
              aria-label={isCallActive ? 'Avslutt samtale' : 'Start samtale'}
              style={{
                width: 100,
                height: 100,
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
                  width: 24,
                  height: 24,
                  border: '2.5px solid rgba(255,255,255,0.15)',
                  borderTop: '2.5px solid rgba(255,255,255,0.8)',
                  borderRadius: '50%',
                  animation: 'arxon-spin 0.8s linear infinite',
                }} />
              ) : isCallActive ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(255,255,255,0.85)" stroke="none">
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              )}
            </button>

            <div style={{
              fontSize: 12,
              color: isActive ? (isSpeaking ? gold : textSecondary) : textSecondary,
              textAlign: 'center',
              minHeight: 18,
              transition: 'color 0.2s',
            }}>
              {isActive ? statusText : t.tapToTalk}
            </div>
          </div>

          {/* quick-action suggestion buttons — shown when idle */}
          {!isActive && (
            <div style={{ padding: '0 14px 10px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginBottom: 2 }}>
                {lang === 'no' ? 'Eller velg et tema:' : 'Or pick a topic:'}
              </div>
              {(lang === 'no' ? [
                { label: 'Hva koster det?', msg: 'Hva koster Arxon sine tjenester?' },
                { label: 'Hvilken pakke passer meg?', msg: 'Jeg vil finne ut hvilken pakke som passer for min bedrift.' },
                { label: 'Hvordan fungerer det?', msg: 'Kan du forklare hvordan Arxon fungerer i praksis?' },
                { label: 'Book en samtale', msg: 'Jeg vil gjerne booke en uforpliktende samtale med dere.' },
              ] : [
                { label: 'What does it cost?', msg: 'What are Arxon\'s prices?' },
                { label: 'Which package fits me?', msg: 'I want to find out which package fits my business.' },
                { label: 'How does it work?', msg: 'Can you explain how Arxon works in practice?' },
                { label: 'Book a call', msg: 'I\'d like to book a free consultation call.' },
              ]).map((btn, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInputValue(btn.msg)
                    setTimeout(() => {
                      if (!vapiRef.current || !assistantId) return
                      setIsConnecting(true)
                      setStatusKey('connecting')
                      vapiRef.current.start(assistantId, {
                        assistantOverrides: { firstMessage: getFirstMessage(lang) },
                      }).then(() => {
                        setTimeout(() => {
                          vapiRef.current?.send({ type: 'add-message', message: { role: 'user', content: btn.msg } })
                        }, 1500)
                        setInputValue('')
                      }).catch(() => { setIsConnecting(false); setStatusKey(''); setInputValue('') })
                    }, 100)
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 10,
                    color: textPrimary,
                    fontSize: 12,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `rgba(201,169,110,0.08)`
                    e.currentTarget.style.borderColor = `rgba(201,169,110,0.15)`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          )}

          {/* privacy note */}
          <div style={{ padding: '0 14px 6px', textAlign: 'center' }}>
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.18)', lineHeight: 1.4 }}>
              {lang === 'no'
                ? 'Finn bruker mikrofon for samtale. Ingen data lagres.'
                : 'Finn uses your microphone for conversation. No data is stored.'}
            </span>
          </div>
          {/* text input */}
          <div style={{ padding: '0 14px 14px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: inputBg,
              borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '0 4px 0 14px',
            }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() }}
                placeholder={isCallActive ? t.inputActive : t.inputIdle}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: textPrimary,
                  fontSize: 12.5,
                  padding: '9px 0',
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim()}
                aria-label="Send"
                style={{
                  width: 30,
                  height: 30,
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
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
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
        @keyframes arxon-spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 480px) {
          .arxon-widget {
            bottom: 10px !important;
            right: 10px !important;
            width: calc(100vw - 20px) !important;
            max-width: 300px !important;
            border-radius: 16px !important;
          }
        }
      `}</style>
    </>
  )
}
