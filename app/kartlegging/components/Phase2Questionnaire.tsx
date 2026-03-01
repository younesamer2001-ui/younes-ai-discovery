'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'
import { fonts } from '@/lib/constants'
import { gold, goldRgb } from '@/lib/constants'
import { bgDark, cardBg, cardBorder, textPrimary, textSecondary, textMuted } from '../lib/constants'
import { t } from '../translations'
import type { Question } from '../lib/questionnaire'

interface Phase2QuestionnaireProps {
  step: number
  questions: Question[]
  currentQ: Question | undefined
  answers: Record<string, any>
  canNext: () => boolean
  onAnswer: (qId: string, value: string, type: string) => void
  onNext: () => void
  onPrev: () => void
}

export function Phase2Questionnaire({
  step,
  questions,
  currentQ,
  answers,
  canNext,
  onAnswer,
  onNext,
  onPrev,
}: Phase2QuestionnaireProps) {
  const { lang } = useLanguage()

  const cardStyle: React.CSSProperties = {
    background: cardBg,
    border: `1px solid ${cardBorder}`,
    borderRadius: 16,
    padding: '28px 24px',
  }

  const btnPrimary: React.CSSProperties = {
    background: `linear-gradient(110deg, ${gold} 0%, #e0c88a 25%, ${gold} 50%, #a8884d 75%, ${gold} 100%)`,
    backgroundSize: '200% 100%',
    color: bgDark,
    border: 'none',
    borderRadius: 12,
    padding: '14px 32px',
    fontWeight: 600,
    fontSize: 16,
    cursor: 'pointer',
    fontFamily: fonts.body,
    width: '100%',
    transition: 'all 0.2s',
  }

  const btnSecondary: React.CSSProperties = {
    background: 'transparent',
    color: textSecondary,
    border: `1px solid ${cardBorder}`,
    borderRadius: 10,
    padding: '10px 20px',
    fontWeight: 500,
    fontSize: 14,
    cursor: 'pointer',
    fontFamily: fonts.body,
  }

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${cardBorder}`,
    borderRadius: 10,
    padding: '12px 16px',
    color: textPrimary,
    fontSize: 15,
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: fonts.body,
    outline: 'none',
    resize: 'vertical',
  }

  const optionBase: React.CSSProperties = {
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${cardBorder}`,
    borderRadius: 10,
    padding: '12px 16px',
    cursor: 'pointer',
    transition: 'all 0.15s',
    fontSize: 14,
    textAlign: 'left',
  }

  const optionSelected: React.CSSProperties = {
    ...optionBase,
    border: `1.5px solid ${gold}`,
    background: `rgba(${goldRgb},0.08)`,
  }

  const pageV = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
  }

  if (!currentQ) return null

  return (
    <motion.div key={`p2-${step}`} variants={pageV} initial="initial" animate="animate" exit="exit">
      <div style={{ marginTop: 32, marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: textSecondary }}>
            {t('step_of', lang).replace('{c}', String(step + 1)).replace('{t}', String(questions.length))}
          </span>
          <span style={{ fontSize: 13, color: gold }}>{Math.round(((step + 1) / questions.length) * 100)}%</span>
        </div>
        <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
          <div
            style={{
              height: '100%',
              width: `${((step + 1) / questions.length) * 100}%`,
              background: `linear-gradient(90deg, ${gold}, #a8884d)`,
              borderRadius: 2,
              transition: 'width 0.4s ease',
            }}
          />
        </div>
      </div>

      <div style={cardStyle}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 6, lineHeight: 1.35 }}>{currentQ.q}</h2>
        {currentQ.optional && <span style={{ fontSize: 12, color: textMuted }}>{t('optional', lang)}</span>}
        {currentQ.type === 'single' && <p style={{ fontSize: 13, color: textMuted, marginBottom: 16, marginTop: 4 }}>{t('select_one', lang)}</p>}
        {currentQ.type === 'multi' && (
          <p style={{ fontSize: 13, color: textMuted, marginBottom: 16, marginTop: 4 }}>
            {currentQ.max ? t('select_multi', lang).replace('{n}', String(currentQ.max)) : t('select_multi_any', lang)}
          </p>
        )}

        {(currentQ.type === 'single' || currentQ.type === 'multi') && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: (currentQ.options?.length || 0) > 6 ? '1fr 1fr' : '1fr',
              gap: 8,
              marginTop: 16,
            }}>
            {currentQ.options?.map(opt => {
              const isSel =
                currentQ.type === 'single'
                  ? answers[currentQ.id] === opt.value
                  : (answers[currentQ.id] || []).includes(opt.value)

              return (
                <motion.div
                  key={opt.value}
                  style={isSel ? optionSelected : optionBase}
                  onClick={() => onAnswer(currentQ.id, opt.value, currentQ.type)}
                  whileHover={{ borderColor: 'rgba(255,255,255,0.12)' }}
                  whileTap={{ scale: 0.98 }}>
                  <span style={{ color: isSel ? gold : textPrimary }}>{opt.label}</span>
                </motion.div>
              )
            })}
          </div>
        )}

        {currentQ.type === 'text' && (
          <textarea
            rows={4}
            placeholder={t('free_text_ph', lang)}
            style={{ ...inputStyle, marginTop: 16, minHeight: 100 }}
            value={answers[currentQ.id] || ''}
            onChange={e => onAnswer(currentQ.id, e.target.value, 'text')}
          />
        )}

        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <button style={btnSecondary} onClick={onPrev}>
            {t('back', lang)}
          </button>
          <button
            style={{ ...btnPrimary, opacity: canNext() || currentQ.optional ? 1 : 0.4 }}
            onClick={onNext}
            disabled={!canNext() && !currentQ.optional}>
            {step === questions.length - 1 ? t('see_results', lang) : t('next', lang)}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
