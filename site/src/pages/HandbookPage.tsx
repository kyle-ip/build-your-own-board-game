import { useTranslation } from 'react-i18next'
import { CaretDown } from '@phosphor-icons/react'
import { ButtonLink } from '../components/Button'
import { CodeBlock } from '../components/CodeBlock'
import { PageShell } from '../components/PageShell'

type ModeItem = {
  id: string
  name: string
  when: string
  load: string
  writes: string
  do: string
  designerExample: string
  beginnerExample: string
}

type ExtraExample = {
  label: string
  text: string
}

type ObjectItem = {
  name: string
  body: string
}

type InvocationItem = {
  trigger: string
  action: string
}

type KillPath = {
  name: string
  body: string
}

type MilestoneItem = {
  id: string
  name: string
  body: string
}

export function HandbookPage() {
  const { t } = useTranslation('handbook')
  const { t: tc } = useTranslation('common')
  const loopSteps = t('loop.steps', { returnObjects: true }) as string[]
  const checklist = t('checklist.items', { returnObjects: true }) as string[]
  const objects = t('objects.items', { returnObjects: true }) as ObjectItem[]
  const modes = t('modes.items', { returnObjects: true }) as ModeItem[]
  const extraDesigner = t('modes.extraExamples.designerItems', {
    returnObjects: true,
  }) as ExtraExample[]
  const extraBeginner = t('modes.extraExamples.beginnerItems', {
    returnObjects: true,
  }) as ExtraExample[]
  const invariants = t('invariants.items', { returnObjects: true }) as string[]
  const milestones = t('milestones.items', { returnObjects: true }) as MilestoneItem[]
  const genres = t('genres.items', { returnObjects: true }) as string[]
  const invocation = t('invocation.items', { returnObjects: true }) as InvocationItem[]
  const artifacts = t('artifacts.items', {
    returnObjects: true,
  }) as { name: string; why: string }[]
  const fidelity = t('fidelity.items', {
    returnObjects: true,
  }) as { id: string; name: string }[]
  const killPaths = t('kill.paths', { returnObjects: true }) as KillPath[]
  const faq = t('faq.items', {
    returnObjects: true,
  }) as { q: string; a: string }[]

  return (
    <PageShell className="py-10 sm:py-12">
      <p className="text-sm font-medium text-mint">Skill v{t('version')}</p>
      <h1 className="font-display text-4xl text-ink md:text-5xl">{t('title')}</h1>
      <p className="mt-3 max-w-3xl text-lg leading-relaxed text-ink-soft">{t('lead')}</p>

      <section className="mt-10 space-y-3">
        <h2 className="font-display text-2xl md:text-3xl">{t('start.title')}</h2>
        <p className="max-w-3xl leading-relaxed text-ink-soft">{t('start.body')}</p>
        <p className="rounded-xl border border-mint/30 bg-mint/10 px-4 py-3 text-sm text-felt">
          {t('start.habit')}
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl md:text-3xl">{t('loop.title')}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {loopSteps.map((step, i) => (
            <span
              key={step}
              className="inline-flex max-w-full items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-sm text-foam"
            >
              <span className="text-coral-bright">{i + 1}</span>
              <span className="min-w-0">{step}</span>
            </span>
          ))}
        </div>
        <p className="mt-3 text-ink-soft">{t('loop.note')}</p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl md:text-3xl">{t('objects.title')}</h2>
        <p className="mt-2 text-ink-soft">{t('objects.lead')}</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {objects.map((item) => (
            <div
              key={item.name}
              className="rounded-xl border border-ink/10 bg-paper px-4 py-3"
            >
              <p className="font-display text-lg text-coral">{item.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl md:text-3xl">{t('checklist.title')}</h2>
        <ul className="mt-4 space-y-2">
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

      <section className="mt-12">
        <h2 className="font-display text-2xl md:text-3xl">{t('modes.title')}</h2>
        <p className="mt-2 max-w-3xl text-ink-soft">{t('modes.lead')}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-blush/25 bg-blush-soft px-4 py-3">
            <p className="font-display text-lg text-blush-ink">
              {t('modes.audiences.beginner.title')}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">
              {t('modes.audiences.beginner.lead')}
            </p>
          </div>
          <div className="rounded-xl border border-sky/25 bg-sky-soft px-4 py-3">
            <p className="font-display text-lg text-sky-ink">{t('modes.audiences.designer.title')}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">
              {t('modes.audiences.designer.lead')}
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {modes.map((mode) => (
            <details
              key={mode.id}
              className="group rounded-[1.2rem] border border-ink/10 bg-foam/90 open:bg-foam"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-3 px-4 py-4 md:px-5">
                <div className="min-w-0">
                  <p className="font-display text-xl text-coral">{mode.name}</p>
                  <p className="mt-1 text-sm text-ink-soft">{mode.when}</p>
                  <dl className="mt-3 space-y-1.5 text-sm">
                    <div>
                      <dt className="font-medium text-ink/70">Load first</dt>
                      <dd className="text-ink-soft">{mode.load}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-ink/70">Write / update</dt>
                      <dd className="text-ink-soft">{mode.writes}</dd>
                    </div>
                  </dl>
                  <p className="mt-2 text-sm text-ink">{mode.do}</p>
                </div>
                <CaretDown
                  className="mt-1 shrink-0 text-ink-soft transition group-open:rotate-180"
                  size={20}
                />
              </summary>
              <div className="grid gap-4 border-t border-ink/10 px-4 pb-4 pt-3 md:grid-cols-2 md:px-5">
                <div>
                  <p className="mb-2 text-xs font-semibold tracking-wide text-blush-ink uppercase">
                    {t('modes.exampleLabels.beginner')}
                  </p>
                  <CodeBlock text={mode.beginnerExample} tone="paper" />
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold tracking-wide text-sky-ink uppercase">
                    {t('modes.exampleLabels.designer')}
                  </p>
                  <CodeBlock text={mode.designerExample} tone="sky" />
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl md:text-3xl">{t('modes.extraExamples.title')}</h2>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-xl text-blush-ink">
              {t('modes.extraExamples.beginnerTitle')}
            </h3>
            <div className="mt-4 space-y-3">
              {extraBeginner.map((item) => (
                <details
                  key={item.label}
                  className="rounded-[var(--radius-card)] border border-blush/25 bg-blush-soft"
                >
                  <summary className="cursor-pointer px-4 py-3 text-sm font-medium">
                    {item.label}
                  </summary>
                  <div className="border-t border-blush/20 px-4 pb-4 pt-3">
                    <CodeBlock text={item.text} tone="paper" />
                  </div>
                </details>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-xl text-sky-ink">{t('modes.extraExamples.designerTitle')}</h3>
            <div className="mt-4 space-y-3">
              {extraDesigner.map((item) => (
                <details
                  key={item.label}
                  className="rounded-[var(--radius-card)] border border-sky/25 bg-sky-soft"
                >
                  <summary className="cursor-pointer px-4 py-3 text-sm font-medium">
                    {item.label}
                  </summary>
                  <div className="border-t border-sky/20 px-4 pb-4 pt-3">
                    <CodeBlock text={item.text} tone="sky" />
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl md:text-3xl">{t('mixed.title')}</h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-ink-soft">{t('mixed.body')}</p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl md:text-3xl">{t('invariants.title')}</h2>
        <ol className="mt-4 space-y-2">
          {invariants.map((item, i) => (
            <li
              key={item}
              className="flex gap-3 rounded-xl border border-ink/10 bg-paper px-3 py-2 text-sm leading-relaxed"
            >
              <span className="font-display text-coral">{i + 1}</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl md:text-3xl">{t('milestones.title')}</h2>
        <p className="mt-2 text-ink-soft">{t('milestones.lead')}</p>
        <div className="mt-4 space-y-2">
          {milestones.map((m) => (
            <div
              key={m.id}
              className="grid gap-1 rounded-xl bg-ink px-4 py-3 text-cream sm:grid-cols-[auto_1fr]"
            >
              <span className="font-display text-coral-bright">
                {m.id} · {m.name}
              </span>
              <span className="text-sm text-cream/75">{m.body}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl md:text-3xl">{t('genres.title')}</h2>
        <p className="mt-2 text-ink-soft">{t('genres.lead')}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {genres.map((g) => (
            <code
              key={g}
              className="rounded-full bg-ink/5 px-3 py-1 text-sm text-ink-soft"
            >
              genre-profile/{g}.md
            </code>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl md:text-3xl">{t('routing.title')}</h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-ink-soft">{t('routing.body')}</p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl md:text-3xl">{t('invocation.title')}</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[28rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-left">
                <th className="py-2 pr-4 font-medium text-ink">You say</th>
                <th className="py-2 font-medium text-ink">Agent loads</th>
              </tr>
            </thead>
            <tbody>
              {invocation.map((row) => (
                <tr key={row.trigger} className="border-b border-ink/5">
                  <td className="py-2.5 pr-4 align-top font-mono text-xs text-coral sm:text-sm">
                    {row.trigger}
                  </td>
                  <td className="py-2.5 align-top text-ink-soft">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl md:text-3xl">{t('artifacts.title')}</h2>
        <div className="mt-4 grid gap-2">
          {artifacts.map((a) => (
            <div
              key={a.name}
              className="grid gap-1 rounded-xl bg-ink px-4 py-3 text-cream sm:grid-cols-[1.2fr_1fr]"
            >
              <code className="break-all font-mono text-sm text-coral-bright">{a.name}</code>
              <span className="text-sm text-cream/75">{a.why}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl md:text-3xl">{t('fidelity.title')}</h2>
        <p className="mt-2 text-ink-soft">{t('fidelity.lead')}</p>
        <ul className="mt-4 space-y-2">
          {fidelity.map((f) => (
            <li key={f.id} className="flex items-start gap-3 text-sm">
              <span className="font-display text-lg text-coral">{f.id}</span>
              <span className="leading-relaxed">{f.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl md:text-3xl">{t('kill.title')}</h2>
        <p className="mt-2 max-w-3xl text-ink-soft">{t('kill.lead')}</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {killPaths.map((path) => (
            <div
              key={path.name}
              className="rounded-xl border border-ink/10 bg-paper px-4 py-3"
            >
              <p className="font-display text-lg text-coral">{path.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{path.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-ink-soft">{t('kill.note')}</p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl md:text-3xl">{t('faq.title')}</h2>
        <div className="mt-4 space-y-3">
          {faq.map((item) => (
            <details
              key={item.q}
              className="rounded-[var(--radius-card)] border border-ink/10 bg-foam px-4 py-3"
            >
              <summary className="cursor-pointer font-medium">{item.q}</summary>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="mt-12">
        <ButtonLink to="/install">{tc('cta.installSkill')}</ButtonLink>
      </div>
    </PageShell>
  )
}
