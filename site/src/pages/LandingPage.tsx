import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Sparkle } from '@phosphor-icons/react'
import { ButtonLink } from '../components/Button'
import { PageShell } from '../components/PageShell'

export function LandingPage() {
  const { t } = useTranslation('landing')
  const { t: tc } = useTranslation('common')
  const reduce = useReducedMotion()
  const pains = t('pain.items', { returnObjects: true }) as { title: string; body: string }[]
  const steps = t('loop.steps', { returnObjects: true }) as string[]
  const modes = t('modes.items', { returnObjects: true }) as {
    id: string
    name: string
    blurb: string
  }[]

  return (
    <div>
      <PageShell as="section" className="pb-16 pt-10 md:pb-20 md:pt-14">
        <div className="flex min-w-0 max-w-3xl flex-col justify-center">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl font-semibold leading-[1.06] tracking-tight text-ink md:text-6xl lg:text-7xl"
          >
            {t('hero.title')}
          </motion.h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft md:text-lg">
            {t('hero.sub')}
          </p>
          <p className="mt-3 font-display text-lg text-coral md:text-xl">
            {tc('tagline')}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink to="/handbook">
              {t('hero.primary')}
              <ArrowRight weight="bold" />
            </ButtonLink>
            <ButtonLink to="/install" variant="secondary">
              {t('hero.secondary')}
            </ButtonLink>
          </div>
        </div>
      </PageShell>

      <section className="border-y border-ink/10 bg-paper/60 py-14">
        <PageShell>
          <h2 className="font-display text-3xl text-ink md:text-4xl">{t('pain.title')}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {pains.map((item, i) => (
              <motion.article
                key={item.title}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.06 }}
                className="min-w-0 rounded-[var(--radius-card)] border border-ink/10 bg-foam p-5"
              >
                <p className="font-display text-xl text-coral">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.body}</p>
              </motion.article>
            ))}
          </div>
        </PageShell>
      </section>

      <section className="py-14">
        <PageShell>
          <h2 className="font-display text-3xl text-ink md:text-4xl">{t('loop.title')}</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {steps.map((step, i) => (
              <span
                key={step}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-sm text-foam"
              >
                <span className="text-coral-bright">{i + 1}</span>
                {step}
              </span>
            ))}
          </div>
          <p className="mt-4 max-w-2xl text-ink-soft">{t('loop.note')}</p>
        </PageShell>
      </section>

      <section className="pb-14">
        <PageShell>
          <h2 className="font-display text-3xl text-ink md:text-4xl">{t('modes.title')}</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {modes.map((m) => (
              <div
                key={m.id}
                className="min-w-0 rounded-[var(--radius-card)] bg-ink p-4 text-cream"
              >
                <p className="font-display text-xl text-coral-bright">{m.name}</p>
                <p className="mt-1 text-sm text-cream/75">{m.blurb}</p>
              </div>
            ))}
          </div>
        </PageShell>
      </section>

      <section className="pb-20">
        <PageShell>
          <div className="overflow-hidden rounded-[1.6rem] border border-coral/20 bg-gradient-to-br from-coral to-coral-bright p-6 text-paper md:p-10">
            <Sparkle size={28} weight="fill" />
            <h2 className="mt-3 font-display text-3xl md:text-4xl">{t('promo.title')}</h2>
            <p className="mt-3 max-w-2xl text-paper/90">{t('promo.body')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to="/handbook" variant="secondary">
                {t('promo.cta')}
              </ButtonLink>
              <ButtonLink
                to="/install"
                variant="ghost"
                className="!border-paper/40 !bg-paper/15 !text-paper"
              >
                {tc('cta.installSkill')}
              </ButtonLink>
            </div>
          </div>
        </PageShell>
      </section>
    </div>
  )
}
