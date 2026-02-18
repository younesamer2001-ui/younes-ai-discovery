'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Language, t } from '@/lib/translations'
import { AIQuestion, DiscoveryAnswer } from '@/lib/types'
import { ArrowRight, Brain, FileText, Sparkles, Loader2 } from 'lucide-react'

export default function DiscoverPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session')
  const lang = (searchParams.get('lang') || 'no') as Language
  const router = useRouter()

  const [session, setSession] = useState<any>(null)
  const [answers, setAnswers] = useState<{ question: string; answer: string; ai_note: string }[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<AIQuestion | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [customAnswer, setCustomAnswer] = useState('')
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [summary, setSummary] = useState<{ findings: string[]; direction: string[] }>({
    findings: [],
    direction: [],
  })

  // Load session
  useEffect(() => {
    if (!sessionId) return
    const loadSession = async () => {
      const { data } = await supabase
        .from('discovery_sessions')
        .select('*')
        .eq('id', sessionId)
        .single()
      if (data) {
        setSession(data)
        // Load existing answers
        const { data: existingAnswers } = await supabase
          .from('discovery_answers')
          .select('*')
          .eq('session_id', sessionId)
          .order('step_number', { ascending: true })
        if (existingAnswers && existingAnswers.length > 0) {
          setAnswers(existingAnswers.map(a => ({
            question: a.question,
            answer: a.answer,
            ai_note: a.ai_note || '',
          })))
        }
      }
      setLoading(false)
    }
    loadSession()
  }, [sessionId])

  // Fetch next question when session or answers change
  const fetchNextQuestion = useCallback(async () => {
    if (!session) return
    setGenerating(true)
    try {
      const res = await fetch('/api/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session,
          previousAnswers: answers,
          action: 'next_question',
          language: lang,
        }),
      })
      const data = await res.json()
      setCurrentQuestion(data)
    } catch (err) {
      console.error('Error fetching question:', err)
    } finally {
      setGenerating(false)
    }
  }, [session, answers, lang])

  useEffect(() => {
    if (session && !loading) {
      fetchNextQuestion()
    }
  }, [session, loading, answers.length])

  // Update summary periodically
  useEffect(() => {
    if (answers.length > 0 && answers.length % 3 === 0) {
      updateSummary()
    }
  }, [answers.length])

  const updateSummary = async () => {
    if (!session) return
    try {
      const res = await fetch('/api/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session,
          previousAnswers: answers,
          action: 'generate_summary',
          language: lang,
        }),
      })
      const data = await res.json()
      setSummary(data)
    } catch (err) {
      console.error('Error updating summary:', err)
    }
  }

  const handleAnswer = async () => {
    if (!currentQuestion || !sessionId) return

    const answer = selectedAnswer.includes('Annet') || selectedAnswer.includes('Other')
      ? customAnswer
      : selectedAnswer

    if (!answer.trim()) return

    // Save to database
    const { error } = await supabase.from('discovery_answers').insert({
      session_id: sessionId,
      step_number: answers.length + 1,
      question: currentQuestion.question,
      question_type: currentQuestion.question_type,
      options: currentQuestion.options,
      answer,
      ai_note: '',
    })

    if (error) {
      console.error('Error saving answer:', error)
      return
    }

    const newAnswers = [...answers, { question: currentQuestion.question, answer, ai_note: '' }]
    setAnswers(newAnswers)
    setSelectedAnswer('')
    setCustomAnswer('')

    // Check if AI said this is the final question
    if (currentQuestion.is_final) {
      // Go to results
      await generateFinalRecommendation(newAnswers)
    }
    // Otherwise fetchNextQuestion will trigger via useEffect
  }

  const generateFinalRecommendation = async (allAnswers: typeof answers) => {
    setGenerating(true)
    setCurrentQuestion(null)

    try {
      const res = await fetch('/api/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session,
          previousAnswers: allAnswers,
          action: 'final_recommendation',
          language: lang,
        }),
      })
      const recommendation = await res.json()

      // Update session in database
      await supabase.from('discovery_sessions').update({
        status: 'completed',
        final_recommendation: JSON.stringify(recommendation),
        priority_score: recommendation.priority_score,
        ai_summary: {
          ...session.ai_summary,
          findings: summary.findings,
          direction: summary.direction,
        },
        completed_at: new Date().toISOString(),
      }).eq('id', sessionId)

      // Create submission
      const { data: { user } } = await supabase.auth.getUser()
      await supabase.from('submissions').insert({
        session_id: sessionId,
        business_id: user?.id,
        status: 'new',
        full_report: {
          business: {
            name: session.ai_summary?.company_name || '',
            company: session.ai_summary?.company_name || '',
            email: user?.email || '',
          },
          profile: {
            industry: session.industry,
            size: session.company_size,
            challenge: session.primary_challenge,
            budget: session.budget,
            ai_experience: session.ai_experience,
            tools: session.tools || [],
          },
          discovery_answers: allAnswers.map(a => ({
            question: a.question,
            answer: a.answer,
          })),
          ai_summary: session.ai_summary,
          recommendation: recommendation.full_text || JSON.stringify(recommendation),
          priority_score: recommendation.priority_score,
        },
      })

      // Send email notification
      try {
        await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            recommendation,
            session,
            answers: allAnswers,
            userEmail: user?.email,
          }),
        })
      } catch (e) {
        console.error('Email failed:', e)
      }

      // Navigate to results
      router.push(`/result?session=${sessionId}&lang=${lang}`)
    } catch (err) {
      console.error('Error generating recommendation:', err)
      setGenerating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
      </div>
    )
  }

  const progress = Math.min(((answers.length) / 12) * 100, 95)
  const isOtherSelected = selectedAnswer.includes('Annet') || selectedAnswer.includes('Other')

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-brand-500" />
              <span>{t('discover_title', lang)}</span>
            </div>
            <span>{lang === 'no' ? 'Spørsmål' : 'Question'} {answers.length + 1}</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-brand-500 rounded-full progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main question area */}
          <div className="md:col-span-2">
            <div className="glass rounded-2xl p-8 shadow-xl">
              {generating ? (
                <div className="text-center py-16 animate-fade-in">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-brand-500 pulse-dot" />
                    <div className="w-3 h-3 rounded-full bg-brand-500 pulse-dot" />
                    <div className="w-3 h-3 rounded-full bg-brand-500 pulse-dot" />
                  </div>
                  <p className="text-gray-500">{t('discover_thinking', lang)}</p>
                </div>
              ) : currentQuestion ? (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    {currentQuestion.question}
                  </h2>

                  <div className="space-y-3 mb-6">
                    {currentQuestion.options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedAnswer(option)
                          if (!option.includes('Annet') && !option.includes('Other')) {
                            setCustomAnswer('')
                          }
                        }}
                        className={`option-card text-left w-full ${selectedAnswer === option ? 'selected' : ''}`}
                      >
                        <span className="text-gray-900 dark:text-white">{option}</span>
                      </button>
                    ))}
                  </div>

                  {/* Custom answer input for "Other" */}
                  {isOtherSelected && (
                    <div className="mb-6 animate-fade-in">
                      <input
                        type="text"
                        value={customAnswer}
                        onChange={(e) => setCustomAnswer(e.target.value)}
                        placeholder={lang === 'no' ? 'Skriv ditt svar her...' : 'Type your answer here...'}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  )}

                  <button
                    onClick={handleAnswer}
                    disabled={!selectedAnswer || (isOtherSelected && !customAnswer.trim())}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all ml-auto"
                  >
                    {t('next', lang)}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : null}
            </div>

            {/* Previous answers */}
            {answers.length > 0 && (
              <div className="mt-6 space-y-3">
                {answers.map((a, i) => (
                  <div key={i} className="glass rounded-xl p-4 opacity-70">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{a.question}</p>
                    <p className="text-sm text-brand-600 dark:text-brand-400 mt-1">{a.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary sidebar */}
          <div className="md:col-span-1">
            <div className="glass rounded-2xl p-6 shadow-xl sticky top-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-brand-500" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {t('discover_summary_title', lang)}
                </h3>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-500">{lang === 'no' ? 'Bedrift' : 'Company'}:</span>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {session?.ai_summary?.company_name || '—'}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">{lang === 'no' ? 'Bransje' : 'Industry'}:</span>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {session?.industry ? t(session.industry as any, lang) : '—'}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">{lang === 'no' ? 'Utfordring' : 'Challenge'}:</span>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {session?.primary_challenge ? t(session.primary_challenge as any, lang) : '—'}
                  </p>
                </div>

                {summary.findings.length > 0 && (
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-gray-500 font-medium">
                      {lang === 'no' ? 'Funn:' : 'Findings:'}
                    </span>
                    <ul className="mt-2 space-y-1.5">
                      {summary.findings.map((f, i) => (
                        <li key={i} className="flex gap-2 text-gray-700 dark:text-gray-300">
                          <Sparkles className="w-3 h-3 text-brand-500 mt-1 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {summary.direction.length > 0 && (
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-gray-500 font-medium">
                      {lang === 'no' ? 'Mulig retning:' : 'Possible direction:'}
                    </span>
                    <ul className="mt-2 space-y-1.5">
                      {summary.direction.map((d, i) => (
                        <li key={i} className="flex gap-2 text-brand-600 dark:text-brand-400">
                          <ArrowRight className="w-3 h-3 mt-1 flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-3 text-xs text-gray-400">
                  {lang === 'no'
                    ? `${answers.length} svar registrert`
                    : `${answers.length} answers recorded`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
