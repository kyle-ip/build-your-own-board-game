import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost'

const styles: Record<Variant, string> = {
  primary:
    'bg-coral text-paper shadow-[0_12px_28px_rgb(231_111_81_/0.35)] hover:-translate-y-0.5 active:translate-y-px',
  secondary:
    'bg-ink text-foam hover:-translate-y-0.5 active:translate-y-px',
  ghost:
    'bg-paper text-ink border border-ink/15 hover:border-ink/30 active:translate-y-px',
}

type Common = {
  variant?: Variant
  children: ReactNode
  className?: string
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function ButtonLink({
  variant = 'primary',
  className = '',
  children,
  ...props
}: Common & LinkProps) {
  return (
    <Link
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  )
}
