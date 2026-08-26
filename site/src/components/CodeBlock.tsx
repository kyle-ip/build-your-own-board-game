import { CopyStatus, useCopyFeedback } from './CopyButton'

type Props = {
  text: string
  /** Dark ink panel (default), soft sky designer example, or soft blush beginner example */
  tone?: 'ink' | 'sky' | 'paper'
  className?: string
}

export function CodeBlock({ text, tone = 'ink', className = '' }: Props) {
  const { copied, copy } = useCopyFeedback()

  const shell =
    tone === 'ink'
      ? 'bg-ink text-coral-bright'
      : tone === 'sky'
        ? 'border border-sky/30 bg-sky-soft text-ink shadow-[inset_0_1px_0_rgb(255_255_255_/0.55)]'
        : 'border border-blush/30 bg-blush-soft text-ink shadow-[inset_0_1px_0_rgb(255_255_255_/0.55)]'

  const btn =
    tone === 'ink'
      ? 'border-cream/25 bg-paper/10 text-cream hover:bg-paper/20'
      : tone === 'sky'
        ? 'border-sky/25 bg-paper text-ink hover:border-sky/40'
        : 'border-blush/25 bg-paper text-ink hover:border-blush/40'

  return (
    <div className={`min-w-0 rounded-[var(--radius-card)] p-4 ${shell} ${className}`}>
      <pre className="font-mono text-sm leading-relaxed break-words whitespace-pre-wrap">
        {text}
      </pre>
      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={(event) => void copy(text, event)}
          onPointerDown={(event) => event.stopPropagation()}
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold transition active:translate-y-px ${btn}`}
        >
          <CopyStatus copied={copied} />
        </button>
      </div>
    </div>
  )
}
