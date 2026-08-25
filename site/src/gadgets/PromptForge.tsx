import { useTranslation } from 'react-i18next'
import { CopyButton } from '../components/CopyButton'

export function PromptForge() {
  const { t } = useTranslation('workshop')
  const strong = t('promptForge.strong')

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <article className="rounded-[var(--radius-card)] border border-dashed border-ink/20 bg-ink/5 p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/50">
          {t('promptForge.weakLabel')}
        </p>
        <p className="text-ink-soft">{t('promptForge.weak')}</p>
      </article>
      <article className="rounded-[var(--radius-card)] border border-mint/30 bg-mint/10 p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-felt">
            {t('promptForge.strongLabel')}
          </p>
          <CopyButton text={strong} />
        </div>
        <p className="text-ink">{t('promptForge.strong')}</p>
      </article>
      <p className="md:col-span-2 text-sm text-ink-soft">{t('promptForge.why')}</p>
    </div>
  )
}
