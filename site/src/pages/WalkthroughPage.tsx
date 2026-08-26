import { useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, ButtonLink } from '../components/Button'
import { CodeBlock } from '../components/CodeBlock'
import { MermaidBlock } from '../components/MermaidBlock'
import { PageShell } from '../components/PageShell'
import { PageSideNav, useSectionSpy } from '../components/PageSideNav'
import { getTrackContent } from '../walkthrough/content'
import type { Chapter, WalkthroughTrack } from '../walkthrough/types'
import { loadWalkthroughTrack, saveWalkthroughTrack } from '../lib/storage'

function isTrack(value: string | null): value is WalkthroughTrack {
  return value === 'beginner' || value === 'designer'
}

function stepNumber(chapterId: string): string {
  const match = chapterId.match(/(\d+)$/)
  return match?.[1] ?? chapterId
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function ChapterSection({
  chapter,
  tone,
  step,
  onJumpTrack,
}: {
  chapter: Chapter
  tone: 'paper' | 'sky'
  step: string
  onJumpTrack: (track: WalkthroughTrack, chapterId: string) => void
}) {
  const { t } = useTranslation('walkthrough')

  return (
    <section id={chapter.id} className="scroll-mt-24 border-t border-ink/10 pt-10">
      <p className="text-xs font-semibold tracking-wide text-mint uppercase">
        {t('ui.step')} {step}
      </p>
      <h3 className="mt-1 font-display text-2xl text-ink md:text-3xl">{chapter.title}</h3>

      <div className="mt-4">
        <h4 className="text-sm font-semibold text-ink/70">{t('ui.situation')}</h4>
        <p className="mt-1 leading-relaxed text-ink-soft">{chapter.situation}</p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-blush/25 bg-blush-soft px-4 py-3">
          <p className="font-display text-lg text-blush-ink">{t('ui.you')}</p>
          <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink-soft">
            {chapter.roles.user.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-sky/25 bg-sky-soft px-4 py-3">
          <p className="font-display text-lg text-sky-ink">{t('ui.agent')}</p>
          <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink-soft">
            {chapter.roles.agent.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5">
        <h4 className="mb-2 text-sm font-semibold text-ink/70">{t('ui.prompt')}</h4>
        <CodeBlock text={chapter.prompt} tone={tone} />
      </div>

      <div className="mt-5">
        <h4 className="text-sm font-semibold text-ink/70">{t('ui.artifacts')}</h4>
        <ul className="mt-2 space-y-1">
          {chapter.artifacts.map((item) => (
            <li key={item}>
              <code className="rounded-full bg-ink/5 px-2.5 py-1 text-xs text-ink-soft sm:text-sm">
                {item}
              </code>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 space-y-3">
        {chapter.diagramIds.map((id) => (
          <MermaidBlock key={id} diagramId={id} />
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {chapter.features.map((feature) => (
          <span
            key={feature}
            className="rounded-full border border-ink/10 bg-paper px-3 py-1 text-xs text-ink-soft sm:text-sm"
          >
            {feature}
          </span>
        ))}
      </div>

      {chapter.handbookAnchors && chapter.handbookAnchors.length > 0 ? (
        <p className="mt-3 text-sm text-ink-soft">
          {t('ui.handbook')}:{' '}
          {chapter.handbookAnchors.map((anchor, i) => {
            const section = anchor.replace(/^#/, '')
            return (
              <span key={anchor}>
                {i > 0 ? ' · ' : null}
                <Link
                  className="text-mint underline-offset-2 hover:underline"
                  to={`/handbook?section=${section}`}
                >
                  {section}
                </Link>
              </span>
            )
          })}
        </p>
      ) : null}

      {chapter.advancedLink ? (
        <p className="mt-3 rounded-xl border border-sky/30 bg-sky-soft px-4 py-3 text-sm text-ink-soft">
          {t('ui.advanced')}:{' '}
          <button
            type="button"
            className="font-semibold text-sky-ink underline-offset-2 hover:underline"
            onClick={() =>
              onJumpTrack(chapter.advancedLink!.track, chapter.advancedLink!.chapterId)
            }
          >
            {chapter.advancedLink.label}
          </button>
        </p>
      ) : null}

      {chapter.reverseLink ? (
        <p className="mt-3 rounded-xl border border-blush/30 bg-blush-soft px-4 py-3 text-sm text-ink-soft">
          {t('ui.simpler')}:{' '}
          <button
            type="button"
            className="font-semibold text-blush-ink underline-offset-2 hover:underline"
            onClick={() =>
              onJumpTrack(chapter.reverseLink!.track, chapter.reverseLink!.chapterId)
            }
          >
            {chapter.reverseLink.label}
          </button>
        </p>
      ) : null}
    </section>
  )
}

export function WalkthroughPage() {
  const { t } = useTranslation('walkthrough')
  const { t: tc } = useTranslation('common')
  const [params, setParams] = useSearchParams()

  const track: WalkthroughTrack | null = useMemo(() => {
    const fromQuery = params.get('track')
    if (isTrack(fromQuery)) return fromQuery
    return loadWalkthroughTrack()
  }, [params])

  useEffect(() => {
    const fromQuery = params.get('track')
    if (isTrack(fromQuery)) {
      saveWalkthroughTrack(fromQuery)
      return
    }
    const stored = loadWalkthroughTrack()
    if (stored) {
      const next = new URLSearchParams(params)
      next.set('track', stored)
      setParams(next, { replace: true })
    }
  }, [params, setParams])

  const content = track ? getTrackContent(track) : null
  const tone = track === 'beginner' ? 'paper' : 'sky'
  const objects = t('shared.objects', { returnObjects: true }) as {
    name: string
    body: string
  }[]
  const invariants = t('shared.invariants', { returnObjects: true }) as string[]

  const navItems = useMemo(
    () => [
      { id: 'shared-top', label: t('ui.overview'), short: '•' },
      ...(content?.chapters.map((chapter) => ({
        id: chapter.id,
        label: chapter.title,
        short: stepNumber(chapter.id),
      })) ?? []),
      ...(content
        ? [{ id: 'appendix', label: t('ui.appendix'), short: 'A' }]
        : []),
    ],
    [content, t],
  )

  const sectionIds = useMemo(() => navItems.map((item) => item.id), [navItems])
  const activeId = useSectionSpy(sectionIds)

  function selectTrack(next: WalkthroughTrack, chapterId?: string) {
    saveWalkthroughTrack(next)
    const nextParams = new URLSearchParams(params)
    nextParams.set('track', next)
    setParams(nextParams, { replace: true })
    requestAnimationFrame(() => {
      scrollToId(chapterId ?? 'track-top')
    })
  }

  return (
    <>
      <PageSideNav
        items={navItems}
        activeId={activeId}
        ariaLabel={tc('sideNav.aria')}
        title={tc('sideNav.title')}
      />

      <PageShell className="py-10 sm:py-12">
        <div id="shared-top" className="scroll-mt-24">
          <p className="text-sm font-medium text-mint">Skill v{t('version')}</p>
          <h1 className="font-display text-4xl text-ink md:text-5xl">{t('title')}</h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-soft">{t('lead')}</p>
          <p className="mt-3 rounded-xl border border-mint/30 bg-mint/10 px-4 py-3 text-sm text-felt">
            {t('ui.demoNote')}
          </p>
        </div>

        <section className="mt-10 space-y-4">
          <h2 className="font-display text-2xl md:text-3xl">{t('shared.title')}</h2>
          <p className="leading-relaxed text-ink-soft">{t('shared.body')}</p>

          <div className="grid gap-3 md:grid-cols-2">
            {(['beginner', 'designer'] as const).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => selectTrack(id)}
                className={[
                  'rounded-[1.2rem] border px-5 py-4 text-left transition',
                  track === id
                    ? id === 'beginner'
                      ? 'border-blush/50 bg-blush-soft shadow-[0_10px_24px_rgb(184_120_136_/0.2)]'
                      : 'border-sky/50 bg-sky-soft shadow-[0_10px_24px_rgb(106_148_176_/0.2)]'
                    : 'border-ink/10 bg-paper hover:border-ink/25',
                ].join(' ')}
              >
                <p
                  className={`font-display text-2xl ${id === 'beginner' ? 'text-blush-ink' : 'text-sky-ink'}`}
                >
                  {t(`tracks.${id}.name`)}
                </p>
                <p className="mt-1 text-sm font-medium text-ink">{t(`tracks.${id}.tagline`)}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {t(`tracks.${id}.summary`)}
                </p>
              </button>
            ))}
          </div>

          <div>
            <h3 className="font-display text-xl text-ink">{t('shared.objectsTitle')}</h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {objects.map((item) => (
                <div key={item.name} className="rounded-xl border border-ink/10 bg-paper px-4 py-3">
                  <p className="font-display text-lg text-coral">{item.name}</p>
                  <p className="mt-1 text-sm text-ink-soft">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl text-ink">{t('shared.invariantsTitle')}</h3>
            <ol className="mt-3 space-y-2">
              {invariants.map((item, i) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-xl border border-ink/10 bg-paper px-3 py-2 text-sm"
                >
                  <span className="font-display text-coral">{i + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="mb-3 font-display text-xl text-ink">{t('shared.diagramTitle')}</h3>
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-semibold text-blush-ink">
                  {t('shared.beginnerDiagramLabel')}
                </p>
                <MermaidBlock diagramId="shared.beginnerLifecycle" />
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold text-sky-ink">
                  {t('shared.designerDiagramLabel')}
                </p>
                <MermaidBlock diagramId="shared.designerLifecycle" />
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-3 font-display text-xl text-ink">{t('shared.siteMapTitle')}</h3>
            <MermaidBlock diagramId="shared.siteMap" />
          </div>
        </section>

        {track && content ? (
          <div id="track-top" className="mt-14 scroll-mt-24">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-mint">
                  {t('ui.caseLabel')}: {content.caseName}
                </p>
                <h2 className="font-display text-3xl text-ink">
                  {t(`tracks.${track}.name`)} {t('title')}
                </h2>
                <p className="mt-2 text-ink-soft">{content.caseBlurb}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={track === 'beginner' ? 'primary' : 'ghost'}
                  onClick={() => selectTrack('beginner')}
                >
                  {t('tracks.beginner.name')}
                </Button>
                <Button
                  variant={track === 'designer' ? 'primary' : 'ghost'}
                  onClick={() => selectTrack('designer')}
                >
                  {t('tracks.designer.name')}
                </Button>
              </div>
            </div>

            <nav aria-label={t('ui.toc')} className="mt-6 overflow-x-auto xl:hidden">
              <ul className="flex min-w-max gap-2 pb-1">
                {content.chapters.map((chapter) => (
                  <li key={chapter.id}>
                    <button
                      type="button"
                      onClick={() => scrollToId(chapter.id)}
                      className="inline-flex rounded-full bg-ink/5 px-3 py-1.5 text-xs font-medium text-ink-soft hover:bg-ink/10 sm:text-sm"
                    >
                      {stepNumber(chapter.id)}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToId('appendix')}
                    className="inline-flex rounded-full border border-mint/25 bg-mint/10 px-3 py-1.5 text-xs font-medium text-felt sm:text-sm"
                  >
                    {t('ui.appendix')}
                  </button>
                </li>
              </ul>
            </nav>

            <div className="mt-4 space-y-2">
              {content.chapters.map((chapter) => (
                <ChapterSection
                  key={chapter.id}
                  chapter={chapter}
                  tone={tone}
                  step={stepNumber(chapter.id)}
                  onJumpTrack={selectTrack}
                />
              ))}
            </div>

            <section id="appendix" className="mt-14 scroll-mt-24 border-t border-ink/10 pt-10">
              <h2 className="font-display text-3xl text-ink">{t('ui.appendix')}</h2>

              <div className="mt-8">
                <h3 className="font-display text-2xl text-ink">{t('ui.appendixA')}</h3>
                <div className="mt-4">
                  <MermaidBlock diagramId={content.appendixSequenceDiagramId} />
                </div>
              </div>

              <div className="mt-10">
                <h3 className="font-display text-2xl text-ink">{t('ui.appendixB')}</h3>
                <div className="mt-4 space-y-3">
                  {content.promptIndex.map((item) => (
                    <details
                      key={item.chapterId + item.label}
                      className="rounded-[var(--radius-card)] border border-ink/10 bg-foam/90"
                    >
                      <summary className="cursor-pointer px-4 py-3 text-sm font-medium">
                        <span className="text-coral">{item.mode}</span>
                        {' · '}
                        {item.label}
                      </summary>
                      <div className="border-t border-ink/10 px-4 pb-4 pt-3">
                        <CodeBlock text={item.prompt} tone={tone} />
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h3 className="font-display text-2xl text-ink">{t('ui.appendixC')}</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[28rem] border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-ink/10 text-left">
                        <th className="py-2 pr-4 font-medium">Feature</th>
                        <th className="py-2 font-medium">Coverage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.matrix.map((row) => (
                        <tr key={row.feature} className="border-b border-ink/5">
                          <td className="py-2.5 pr-4 align-top text-ink">{row.feature}</td>
                          <td className="py-2.5 align-top text-ink-soft">{row.coverage}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <div className="mt-12 flex flex-wrap gap-3">
              <ButtonLink to="/handbook">{tc('cta.readHandbook')}</ButtonLink>
              <ButtonLink to="/install" variant="secondary">
                {tc('cta.installSkill')}
              </ButtonLink>
            </div>
          </div>
        ) : (
          <p className="mt-10 text-ink-soft">{t('ui.changeTrack')}</p>
        )}
      </PageShell>
    </>
  )
}
