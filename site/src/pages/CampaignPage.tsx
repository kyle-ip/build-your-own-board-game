import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LockSimple, CheckCircle, Play } from '@phosphor-icons/react'
import { Button, ButtonLink } from '../components/Button'
import { PageShell } from '../components/PageShell'
import { clearProgress, loadProgress } from '../lib/storage'

type SessionMeta = { id: string; title: string; goal: string }

export function CampaignPage() {
  const { t } = useTranslation('campaign')
  const { t: tc } = useTranslation('common')
  const sessions = t('sessions', { returnObjects: true }) as SessionMeta[]
  const [progress, setProgress] = useState(loadProgress)
  const done = progress.cleared.length
  const graduated = done >= 5

  const statusOf = useMemo(() => {
    return (id: string, index: number) => {
      if (progress.cleared.includes(id)) return 'done' as const
      const prevOk = index === 0 || progress.cleared.includes(sessions[index - 1].id)
      return prevOk ? ('current' as const) : ('locked' as const)
    }
  }, [progress.cleared, sessions])

  return (
    <PageShell className="py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-4xl text-ink md:text-5xl">{t('title')}</h1>
          <p className="mt-3 max-w-2xl text-lg text-ink-soft">{t('lead')}</p>
          <p className="mt-2 text-sm font-medium text-felt">
            {t('progress', { done })}
          </p>
        </div>
        <Button
          variant="ghost"
          className="shrink-0"
          onClick={() => {
            clearProgress()
            setProgress({ cleared: [] })
          }}
        >
          {tc('cta.resetProgress')}
        </Button>
      </div>

      <ol className="mt-10 space-y-3">
        {sessions.map((session, index) => {
          const status = statusOf(session.id, index)
          const inner = (
            <div
              className={[
                'flex items-start gap-4 rounded-[1.2rem] border p-4 transition md:p-5',
                status === 'done' && 'border-mint/40 bg-mint/10',
                status === 'current' && 'border-coral/40 bg-paper shadow-[0_16px_40px_rgb(15_36_48_/0.1)]',
                status === 'locked' && 'border-ink/10 bg-ink/5 opacity-70',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <div className="mt-1 text-coral">
                {status === 'done' && <CheckCircle size={28} weight="fill" />}
                {status === 'current' && <Play size={28} weight="fill" />}
                {status === 'locked' && <LockSimple size={28} weight="fill" />}
              </div>
              <div>
                <p className="font-display text-xl text-ink">{session.title}</p>
                <p className="mt-1 text-sm text-ink-soft">{session.goal}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-ink/45">
                  {status === 'done' && t('done')}
                  {status === 'current' && t('current')}
                  {status === 'locked' && t('locked')}
                </p>
              </div>
            </div>
          )

          return (
            <li key={session.id}>
              {status === 'locked' ? (
                inner
              ) : (
                <Link to={`/campaign/${session.id}`}>{inner}</Link>
              )}
            </li>
          )
        })}
      </ol>

      {graduated && (
        <section className="mt-10 rounded-[1.4rem] bg-ink p-6 text-cream md:p-8">
          <h2 className="font-display text-3xl text-coral-bright">
            {t('graduation.title')}
          </h2>
          <p className="mt-2 text-cream/80">{t('graduation.body')}</p>
          <p className="mt-5 text-sm text-cream/55">{t('graduation.spellTitle')}</p>
          <pre className="mt-2 whitespace-pre-wrap rounded-xl bg-paper/10 p-4 text-sm text-coral-bright">
            {t('graduation.spell')}
          </pre>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink to="/install">{t('graduation.ctaInstall')}</ButtonLink>
            <ButtonLink to="/workshop" variant="ghost" className="!border-cream/30 !bg-transparent !text-cream">
              {t('graduation.ctaWorkshop')}
            </ButtonLink>
          </div>
        </section>
      )}
    </PageShell>
  )
}
