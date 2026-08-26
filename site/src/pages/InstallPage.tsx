import { useTranslation } from 'react-i18next'
import { ButtonLink } from '../components/Button'
import { CodeBlock } from '../components/CodeBlock'
import { PageShell } from '../components/PageShell'
import { SKILL_REPO } from '../lib/storage'

type HostSection = {
  title: string
  body: string
  userWide: string
  project: string
  command: string
  cliCommand?: string
}

export function InstallPage() {
  const { t } = useTranslation('install')
  const { t: tc } = useTranslation('common')
  const checklist = t('prompt.items', { returnObjects: true }) as string[]

  const hosts: HostSection[] = [
    t('cursor', { returnObjects: true }) as HostSection,
    t('claude', { returnObjects: true }) as HostSection,
    t('codex', { returnObjects: true }) as HostSection,
  ]

  return (
    <PageShell className="py-10 sm:py-12">
      <p className="text-sm font-medium text-mint">Skill v{t('version')}</p>
      <h1 className="font-display text-4xl text-ink md:text-5xl">{t('title')}</h1>
      <p className="mt-3 text-lg leading-relaxed text-ink-soft">{t('lead')}</p>
      <p className="mt-2 text-sm text-ink-soft">{t('note')}</p>

      {hosts.map((host) => (
        <section key={host.title} className="mt-10 space-y-3">
          <h2 className="font-display text-2xl md:text-3xl">{host.title}</h2>
          <p className="text-ink-soft">{host.body}</p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-ink-soft">
            <li>{host.userWide}</li>
            <li>{host.project}</li>
          </ul>
          {host.cliCommand ? (
            <>
              <p className="text-sm font-medium text-ink">Skills CLI</p>
              <CodeBlock text={host.cliCommand} />
            </>
          ) : null}
          <CodeBlock text={host.command} />
        </section>
      ))}

      <section className="mt-10 space-y-3">
        <h2 className="font-display text-2xl md:text-3xl">{t('prompt.title')}</h2>
        <ul className="space-y-2">
          {checklist.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-ink/10 bg-paper px-3 py-2 text-sm leading-relaxed"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="font-display text-2xl md:text-3xl">{t('example.title')}</h2>
        <CodeBlock text={t('example.text')} tone="sky" />
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="font-display text-2xl md:text-3xl">{t('runtime.title')}</h2>
        <p className="text-ink-soft">{t('runtime.body')}</p>
        <CodeBlock text={t('runtime.command')} />
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href={SKILL_REPO}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-paper shadow-[0_12px_28px_rgb(231_111_81_/0.35)]"
        >
          {tc('cta.github')}
        </a>
        <ButtonLink to="/handbook" variant="secondary">
          {tc('cta.readHandbook')}
        </ButtonLink>
      </div>
    </PageShell>
  )
}
