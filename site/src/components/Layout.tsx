import { NavLink, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { GithubLogo } from '@phosphor-icons/react'
import { BrandMark } from './BrandMark'
import { PageShell } from './PageShell'
import { SKILL_REPO } from '../lib/storage'

const links = [
  { to: '/', end: true, key: 'home' },
  { to: '/handbook', key: 'handbook' },
  { to: '/install', key: 'install' },
] as const

export function Layout() {
  const { t } = useTranslation('common')

  return (
    <div className="relative z-0 flex min-h-[100dvh] flex-col">
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-foam/95 backdrop-blur-md">
        <PageShell className="flex h-14 items-center gap-2 sm:h-16 sm:gap-3">
          <NavLink
            to="/"
            aria-label={t('brand')}
            className="flex shrink-0 items-center sm:gap-2.5"
          >
            <BrandMark className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" />
            <span className="hidden truncate font-display text-xl font-semibold tracking-tight text-ink sm:inline">
              {t('brand')}
            </span>
          </NavLink>

          <nav
            aria-label="Main"
            className="flex min-w-0 flex-1 items-center justify-end gap-0.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] md:justify-center [&::-webkit-scrollbar]:hidden"
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={'end' in link ? link.end : false}
                className={({ isActive }) =>
                  [
                    'shrink-0 rounded-full px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition sm:px-3 sm:text-sm',
                    isActive
                      ? 'bg-ink text-foam'
                      : 'text-ink-soft hover:bg-ink/5',
                  ].join(' ')
                }
              >
                {t(`nav.${link.key}`)}
              </NavLink>
            ))}
          </nav>

          <a
            href={SKILL_REPO}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-coral px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap text-paper shadow-[0_8px_20px_rgb(231_111_81_/0.35)] transition hover:-translate-y-px active:translate-y-px sm:gap-2 sm:px-3 sm:text-sm"
          >
            <GithubLogo size={16} weight="bold" className="sm:hidden" />
            <span className="hidden sm:inline">{t('cta.github')}</span>
            <span className="sm:hidden">GitHub</span>
          </a>
        </PageShell>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-ink/10 bg-ink text-cream">
        <PageShell className="flex flex-col gap-3 py-8 text-sm">
          <div className="flex flex-wrap items-center gap-3">
            <BrandMark className="h-8 w-8" />
            <strong className="font-display text-lg">{t('brand')}</strong>
            <a
              className="underline decoration-coral/60 underline-offset-4 hover:text-coral-bright"
              href={SKILL_REPO}
              target="_blank"
              rel="noreferrer"
            >
              {t('footer.skillLink')}
            </a>
          </div>
          <p className="max-w-3xl text-cream/75">{t('footer.attribution')}</p>
          <p className="text-cream/55">{t('footer.license')}</p>
        </PageShell>
      </footer>
    </div>
  )
}
