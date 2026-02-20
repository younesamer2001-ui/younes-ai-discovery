'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Language, t } from '@/lib/translations'
import { CheckCircle2, Sparkles, Clock, TrendingUp, Zap, ArrowRight, Star, Loader2 } from 'lucide-react'

function ResultPageContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session')
  const lang = (searchParams.get('lang') || 'no') as Language

  const [recommendation, setRecommendation] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!sessionId) return
    const load = async () => {
      const { data } = await supabase
        .from('discovery_sessions')
        .select('*')
        .eq('id', sessionId)
        .single()

      if (data?.final_recommendation) {
        try {
          setRecommendation(JSON.parse(data.final_recommendation))
        } catch {
          setRecommendation(data.final_recommendation)
        }
      }
      setLoading(false)
    }
    load()
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
      </div>
    )
  }

  if (!recommendation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No recommendation found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Success banner */}
        <div className="glass rounded-2xl p-6 mb-8 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
            <div>
              <p className="font-semibold text-green-800 dark:text-green-200 text-lg">
                {t('result_submitted', lang)}
              </p>
            </div>
          </div>
        </div>

        {/* Main recommendation card */}
        <div className="glass rounded-2xl p-8 shadow-xl mb-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('result_title', lang)}
              </h1>
              {recommendation.priority_score && (
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: Math.min(recommendation.priority_score, 10) }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">
                    {recommendation.priority_score}/10
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Executive summary */}
          {recommendation.executive_summary && (
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-8 leading-relaxed">
              {recommendation.executive_summary}
            </p>
          )}

          {/* Primary solution */}
          {recommendation.primary_solution && (
            <div className="bg-brand-50 dark:bg-brand-950/50 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-brand-600" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {recommendation.primary_solution.name}
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {recommendation.primary_solution.description}
              </p>
              {recommendation.primary_solution.how_it_works && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {recommendation.primary_solution.how_it_works}
                </p>
              )}
            </div>
          )}

          {/* Expected impact */}
          {recommendation.expected_impact && recommendation.expected_impact.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {lang === 'no' ? 'Forventet effekt' : 'Expected Impact'}
                </h3>
              </div>
              <div className="space-y-2">
                {recommendation.expected_impact.map((impact: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{impact}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline & Investment */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {recommendation.timeline && (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-500">
                    {lang === 'no' ? 'Tidsramme' : 'Timeline'}
                  </span>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {recommendation.timeline}
                </p>
              </div>
            )}
            {recommendation.investment && (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-500">
                    {lang === 'no' ? 'Estimert investering' : 'Estimated Investment'}
                  </span>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {recommendation.investment}
                </p>
              </div>
            )}
          </div>

          {/* Add-ons */}
          {recommendation.add_ons && recommendation.add_ons.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                {lang === 'no' ? 'Valgfrie tillegg' : 'Optional Add-ons'}
              </h3>
              <div className="space-y-3">
                {recommendation.add_ons.map((addon: any, i: number) => (
                  <div key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <ArrowRight className="w-4 h-4 text-brand-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium">{addon.name}</span>
                      {addon.description && <span className="text-gray-500"> — {addon.description}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next steps */}
          {recommendation.next_steps && (
            <div className="bg-brand-50 dark:bg-brand-950/30 rounded-xl p-6 border border-brand-200 dark:border-brand-800">
              <h3 className="font-semibold text-brand-800 dark:text-brand-200 mb-2">
                {lang === 'no' ? 'Neste steg' : 'Next Steps'}
              </h3>
              <p className="text-brand-700 dark:text-brand-300">
                {recommendation.next_steps}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span>Arxon</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-brand-500" /></div>}>
      <ResultPageContent />
    </Suspense>
  )
}
