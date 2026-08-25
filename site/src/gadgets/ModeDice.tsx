import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'

type ModeItem = {
  id: string
  name: string
  when: string
  load: string
  out: string
}

export function ModeDice() {
  const { t } = useTranslation('workshop')
  const items = t('modes.items', { returnObjects: true }) as ModeItem[]
  const [active, setActive] = useState(items[0]?.id ?? 'create')
  const current = items.find((m) => m.id === active) ?? items[0]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {items.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setActive(m.id)}
            className={[
              'min-w-0 rounded-[var(--radius-card)] border px-3 py-4 text-left transition',
              active === m.id
                ? 'border-coral bg-coral text-paper'
                : 'border-ink/10 bg-paper hover:border-coral/40',
            ].join(' ')}
          >
            <span className="font-display text-base sm:text-lg">{m.name}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="felt-surface rounded-[1.4rem] p-5 text-cream shadow-[0_18px_40px_rgb(15_36_48_/0.22)]"
          >
            <p className="font-display text-2xl text-coral-bright">{current.name}</p>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-cream/55">{t('modes.when')}</dt>
                <dd className="mt-1">{current.when}</dd>
              </div>
              <div>
                <dt className="text-cream/55">{t('modes.load')}</dt>
                <dd className="mt-1 break-words">{current.load}</dd>
              </div>
              <div>
                <dt className="text-cream/55">{t('modes.out')}</dt>
                <dd className="mt-1 break-words">{current.out}</dd>
              </div>
            </dl>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
