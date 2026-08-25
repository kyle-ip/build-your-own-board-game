import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'

type Complaint = { id: string; label: string }

export function SymptomRouter() {
  const { t } = useTranslation('workshop')
  const complaints = t('symptom.complaints', { returnObjects: true }) as Complaint[]
  const [picked, setPicked] = useState<string | null>(null)

  const result = useMemo(() => {
    if (!picked) return null
    return {
      code: t(`symptom.results.${picked}.code`),
      hint: t(`symptom.results.${picked}.hint`),
    }
  }, [picked, t])

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-ink-soft">{t('symptom.pick')}</p>
      <div className="flex flex-wrap gap-2">
        {complaints.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setPicked(c.id)}
            className={[
              'rounded-[var(--radius-card)] border px-3 py-2 text-left text-sm transition',
              picked === c.id
                ? 'border-coral bg-coral text-paper'
                : 'border-ink/15 bg-paper hover:border-coral/40',
            ].join(' ')}
          >
            {c.label}
          </button>
        ))}
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[var(--radius-card)] bg-ink p-4 text-cream"
        >
          <p className="font-display text-xl text-coral-bright">{result.code}</p>
          <p className="mt-1 text-cream/85">{result.hint}</p>
          <p className="mt-3 text-sm text-cream/60">{t('symptom.rule')}</p>
        </motion.div>
      )}
    </div>
  )
}
