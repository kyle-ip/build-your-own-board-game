import { useTranslation } from 'react-i18next'
import { PromptForge } from '../gadgets/PromptForge'
import { SymptomRouter } from '../gadgets/SymptomRouter'
import { FidelityLadder } from '../gadgets/FidelityLadder'
import { DesignStateBoard } from '../gadgets/DesignStateBoard'
import { ModeDice } from '../gadgets/ModeDice'
import { PageShell } from '../components/PageShell'

const sections = [
  { id: 'prompt', Comp: PromptForge },
  { id: 'symptom', Comp: SymptomRouter },
  { id: 'fidelity', Comp: FidelityLadder },
  { id: 'state', Comp: DesignStateBoard },
  { id: 'modes', Comp: ModeDice },
] as const

export function WorkshopPage() {
  const { t } = useTranslation('workshop')

  return (
    <PageShell className="py-12">
      <h1 className="font-display text-4xl text-ink md:text-5xl">{t('title')}</h1>
      <p className="mt-3 max-w-2xl text-lg text-ink-soft">{t('lead')}</p>

      <div className="mt-10 space-y-10">
        {sections.map(({ id, Comp }) => (
          <section
            key={id}
            id={id}
            className="overflow-visible rounded-[1.4rem] border border-ink/10 bg-foam/80 p-5 md:p-7"
          >
            <h2 className="font-display text-2xl text-ink md:text-3xl">
              {t(`tools.${id}.title`)}
            </h2>
            <p className="mt-1 text-ink-soft">{t(`tools.${id}.desc`)}</p>
            <div className="mt-5 min-w-0">
              <Comp />
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  )
}
