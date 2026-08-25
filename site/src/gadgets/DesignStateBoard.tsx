import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type Sample = { locked: string[]; evidence: string[]; backlog: string[] }

function NoteColumn({
  title,
  tint,
  notes,
  onChange,
}: {
  title: string
  tint: string
  notes: string[]
  onChange: (next: string[]) => void
}) {
  return (
    <div className={`rounded-[var(--radius-card)] p-3 ${tint}`}>
      <h3 className="mb-2 font-display text-lg">{title}</h3>
      <ul className="space-y-2">
        {notes.map((note, i) => (
          <li key={`${title}-${i}`}>
            <textarea
              value={note}
              rows={2}
              onChange={(e) => {
                const next = [...notes]
                next[i] = e.target.value
                onChange(next)
              }}
              className="w-full resize-none rounded-xl border border-ink/10 bg-paper/90 p-2 text-sm text-ink outline-none focus:border-coral"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function DesignStateBoard() {
  const { t } = useTranslation('workshop')
  const sample = t('state.sample', { returnObjects: true }) as Sample
  const [locked, setLocked] = useState(sample.locked)
  const [evidence, setEvidence] = useState(sample.evidence)
  const [backlog, setBacklog] = useState(sample.backlog)

  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-soft">{t('state.hint')}</p>
      <div className="grid gap-3 md:grid-cols-3">
        <NoteColumn
          title={t('state.locked')}
          tint="bg-mint/15"
          notes={locked}
          onChange={setLocked}
        />
        <NoteColumn
          title={t('state.evidence')}
          tint="bg-coral-bright/15"
          notes={evidence}
          onChange={setEvidence}
        />
        <NoteColumn
          title={t('state.backlog')}
          tint="bg-chip/10"
          notes={backlog}
          onChange={setBacklog}
        />
      </div>
    </div>
  )
}
