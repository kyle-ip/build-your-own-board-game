import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'

type Level = { id: string; name: string; ok: boolean; why: string }

export function FidelityLadder({
  interactive = true,
  correctId = 'P4',
  onCorrect,
}: {
  interactive?: boolean
  correctId?: string
  onCorrect?: () => void
}) {
  const { t } = useTranslation('workshop')
  const levels = t('fidelity.levels', { returnObjects: true }) as Level[]
  const [picked, setPicked] = useState<string | null>(null)
  const [msg, setMsg] = useState<string | null>(null)

  function choose(id: string) {
    if (!interactive) return
    setPicked(id)
    if (id === correctId) {
      setMsg(t('fidelity.success'))
      onCorrect?.()
    } else {
      setMsg(t('fidelity.fail'))
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-soft">{t('fidelity.prompt')}</p>
      <ol className="grid gap-2">
        {levels.map((level, i) => (
          <motion.li key={level.id} whileTap={interactive ? { scale: 0.99 } : undefined}>
            <button
              type="button"
              disabled={!interactive}
              onClick={() => choose(level.id)}
              className={[
                'flex w-full items-center gap-3 rounded-[var(--radius-card)] border px-3 py-3 text-left transition',
                picked === level.id
                  ? level.id === correctId
                    ? 'border-mint bg-mint/15'
                    : 'border-coral bg-coral/10'
                  : 'border-ink/10 bg-paper hover:border-ink/25',
              ].join(' ')}
              style={{ marginInlineStart: `${Math.min(i, 3) * 0.25}rem` }}
            >
              <span className="font-display text-lg text-coral">{level.id}</span>
              <span className="font-medium">{level.name}</span>
              {picked === level.id && (
                <span className="ml-auto text-sm text-ink-soft">{level.why}</span>
              )}
            </button>
          </motion.li>
        ))}
      </ol>
      {msg && <p className="text-sm font-medium text-felt">{msg}</p>}
    </div>
  )
}
