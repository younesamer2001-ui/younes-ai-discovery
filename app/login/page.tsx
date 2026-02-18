'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Language, t } from '@/lib/translations'
import { Mail, ArrowLeft, Sparkles, CheckCircle2, Loader2 } from 'lucide-react'

function LoginPageContent() {
  const searchParams = useSearchParams()
  const lang = (searchParams.get('lang') || 'no') as Language
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/callback?lang=${lang}`,
        },
      })

      if (authError) throw authError
      setSent(true)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('back', lang)}
        </button>

        <div className="glass rounded-2xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-brand-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('login_title', lang)}
            </h1>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('login_subtitle', lang)}
          </p>

          {sent ? (
            <div className="text-center py-8 animate-fade-in">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {t('login_check_email', lang)}
              </p>
              <p className="text-sm text-gray-500 mt-2">{email}</p>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('login_email_placeholder', lang)}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? t('loading', lang) : t('login_button', lang)}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-brand-500" /></div>}>
      <LoginPageContent />
    </Suspense>
  )
}
