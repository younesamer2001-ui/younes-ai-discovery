'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Language, t } from '@/lib/translations'
import { ArrowRight, ArrowLeft, User, Building2, Phone, Globe, Sparkles } from 'lucide-react'

type Step = 'profile' | 'industry' | 'size' | 'challenge' | 'budget' | 'ai_exp'

const industries = [
  'industry_retail', 'industry_healthcare', 'industry_finance', 'industry_realestate',
  'industry_education', 'industry_logistics', 'industry_restaurant', 'industry_construction',
  'industry_legal', 'industry_marketing', 'industry_tech', 'industry_manufacturing', 'industry_other'
] as const

const sizes = ['size_1_5', 'size_6_20', 'size_21_100', 'size_101_500', 'size_500plus'] as const
const challenges = ['challenge_manual', 'challenge_support', 'challenge_sales', 'challenge_communication', 'challenge_data', 'challenge_content', 'challenge_hr', 'challenge_other'] as const
const budgets = ['budget_exploring', 'budget_1k_5k', 'budget_5k_20k', 'budget_20k_100k', 'budget_100kplus'] as const
const aiExps = ['ai_exp_never', 'ai_exp_basic', 'ai_exp_some', 'ai_exp_advanced'] as const

export default function StartPage() {
  const searchParams = useSearchParams()
  const lang = (searchParams.get('lang') || 'no') as Language
  const router = useRouter()

  const [step, setStep] = useState<Step>('profile')
  const [loading, setLoading] = useState(false)

  // Profile fields
  const [fullName, setFullName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [phone, setPhone] = useState('')
  const [website, setWebsite] = useState('')

  // Selection fields
  const [industry, setIndustry] = useState('')
  const [companySize, setCompanySize] = useState('')
  const [challenge, setChallenge] = useState('')
  const [budget, setBudget] = useState('')
  const [aiExperience, setAiExperience] = useState('')

  const stepOrder: Step[] = ['profile', 'industry', 'size', 'challenge', 'budget', 'ai_exp']
  const currentIndex = stepOrder.indexOf(step)
  const progress = ((currentIndex + 1) / stepOrder.length) * 100

  const goBack = () => {
    if (currentIndex > 0) setStep(stepOrder[currentIndex - 1])
  }

  const goNext = () => {
    if (currentIndex < stepOrder.length - 1) {
      setStep(stepOrder[currentIndex + 1])
    } else {
      handleSubmitProfile()
    }
  }

  const canProceed = () => {
    switch (step) {
      case 'profile': return fullName.trim() && companyName.trim()
      case 'industry': return !!industry
      case 'size': return !!companySize
      case 'challenge': return !!challenge
      case 'budget': return !!budget
      case 'ai_exp': return !!aiExperience
    }
  }

  const handleSubmitProfile = async () => {
    setLoading(true)
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push(`/login?lang=${lang}`)
        return
      }

      // Upsert business record
      const { data: business, error: bizError } = await supabase
        .from('businesses')
        .upsert({
          id: user.id,
          email: user.email,
          full_name: fullName,
          company_name: companyName,
          phone: phone || null,
          website: website || null,
          language: lang,
        }, { onConflict: 'id' })
        .select()
        .single()

      if (bizError) throw bizError

      // Create discovery session
      const { data: session, error: sessError } = await supabase
        .from('discovery_sessions')
        .insert({
          business_id: user.id,
          status: 'in_progress',
          industry,
          company_size: companySize,
          primary_challenge: challenge,
          budget,
          ai_experience: aiExperience,
          tools: [],
          current_step: 0,
          total_steps: 12,
          ai_summary: {
            company_name: companyName,
            industry,
            size: companySize,
            challenge,
            findings: [],
            direction: [],
          },
          language: lang,
        })
        .select()
        .single()

      if (sessError) throw sessError

      // Navigate to discovery
      router.push(`/discover?session=${session.id}&lang=${lang}`)
    } catch (err) {
      console.error('Error creating profile:', err)
    } finally {
      setLoading(false)
    }
  }

  const OptionCard = ({ value, label, selected, onClick }: {
    value: string; label: string; selected: boolean; onClick: () => void
  }) => (
    <button
      onClick={onClick}
      className={`option-card text-left w-full ${selected ? 'selected' : ''}`}
    >
      <span className="text-gray-900 dark:text-white font-medium">{label}</span>
    </button>
  )

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>{t('step', lang)} {currentIndex + 1} {t('of', lang)} {stepOrder.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-brand-500 rounded-full progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="glass rounded-2xl p-8 shadow-xl animate-fade-in" key={step}>
          {/* Profile step */}
          {step === 'profile' && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-brand-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t('start_title', lang)}
                </h1>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('start_name', lang)} *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('start_company', lang)} *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('start_phone', lang)}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('start_website', lang)}
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Industry step */}
          {step === 'industry' && (
            <>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('industry_title', lang)}
              </h1>
              <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {industries.map((key) => (
                  <OptionCard
                    key={key}
                    value={key}
                    label={t(key, lang)}
                    selected={industry === key}
                    onClick={() => setIndustry(key)}
                  />
                ))}
              </div>
            </>
          )}

          {/* Size step */}
          {step === 'size' && (
            <>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('size_title', lang)}
              </h1>
              <div className="space-y-3">
                {sizes.map((key) => (
                  <OptionCard
                    key={key}
                    value={key}
                    label={t(key, lang)}
                    selected={companySize === key}
                    onClick={() => setCompanySize(key)}
                  />
                ))}
              </div>
            </>
          )}

          {/* Challenge step */}
          {step === 'challenge' && (
            <>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('challenge_title', lang)}
              </h1>
              <div className="space-y-3">
                {challenges.map((key) => (
                  <OptionCard
                    key={key}
                    value={key}
                    label={t(key, lang)}
                    selected={challenge === key}
                    onClick={() => setChallenge(key)}
                  />
                ))}
              </div>
            </>
          )}

          {/* Budget step */}
          {step === 'budget' && (
            <>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('budget_title', lang)}
              </h1>
              <div className="space-y-3">
                {budgets.map((key) => (
                  <OptionCard
                    key={key}
                    value={key}
                    label={t(key, lang)}
                    selected={budget === key}
                    onClick={() => setBudget(key)}
                  />
                ))}
              </div>
            </>
          )}

          {/* AI Experience step */}
          {step === 'ai_exp' && (
            <>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('ai_exp_title', lang)}
              </h1>
              <div className="space-y-3">
                {aiExps.map((key) => (
                  <OptionCard
                    key={key}
                    value={key}
                    label={t(key, lang)}
                    selected={aiExperience === key}
                    onClick={() => setAiExperience(key)}
                  />
                ))}
              </div>
            </>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={goBack}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('back', lang)}
            </button>
            <button
              onClick={goNext}
              disabled={!canProceed() || loading}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? t('loading', lang) : currentIndex === stepOrder.length - 1 ? t('start_continue', lang) : t('next', lang)}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
