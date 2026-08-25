import { useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, ButtonLink } from '../components/Button'
import { FidelityLadder } from '../gadgets/FidelityLadder'
import { PageShell } from '../components/PageShell'
import { loadProgress, markCleared } from '../lib/storage'

type Option = { id: string; label: string; correct: boolean }
type Note = { id: string; text: string; kind: string }
type Knob = { id: string; label: string; correct: boolean }
type FileOpt = { id: string; label: string; needed: boolean }
type Gate = { id: string; label: string; correct: boolean }

type Session = {
  id: string
  title: string
  goal: string
  story: string
  task: string
  options?: Option[]
  notes?: Note[]
  knobs?: Knob[]
  fidelityCorrect?: string
  files?: FileOpt[]
  gates?: Gate[]
  success: string
  fail: string
}

export function CampaignSessionPage() {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation('campaign')
  const { t: tc } = useTranslation('common')
  const sessions = t('sessions', { returnObjects: true }) as Session[]
  const session = sessions.find((s) => s.id === sessionId)
  const index = sessions.findIndex((s) => s.id === sessionId)
  const progress = loadProgress()

  const unlocked = useMemo(() => {
    if (!session || index < 0) return false
    if (index === 0) return true
    return progress.cleared.includes(sessions[index - 1].id)
  }, [index, progress.cleared, session, sessions])

  const [feedback, setFeedback] = useState<string | null>(null)
  const [passed, setPassed] = useState(false)
  const [selectedNotes, setSelectedNotes] = useState<string[]>([])
  const [knob, setKnob] = useState<string | null>(null)
  const [fidelityOk, setFidelityOk] = useState(false)
  const [files, setFiles] = useState<string[]>([])
  const [gate, setGate] = useState<string | null>(null)

  if (!session) return <Navigate to="/campaign" replace />
  if (!unlocked) return <Navigate to="/campaign" replace />

  function succeed() {
    setPassed(true)
    setFeedback(session!.success)
    markCleared(session!.id)
  }

  function fail() {
    setPassed(false)
    setFeedback(session!.fail)
  }

  function checkOptions(id: string) {
    const opt = session!.options?.find((o) => o.id === id)
    if (opt?.correct) succeed()
    else fail()
  }

  function checkNotes() {
    const lockedIds = (session!.notes ?? [])
      .filter((n) => n.kind === 'locked')
      .map((n) => n.id)
      .sort()
    const picked = [...selectedNotes].sort()
    const same =
      lockedIds.length === picked.length &&
      lockedIds.every((id, i) => id === picked[i])
    if (same) succeed()
    else fail()
  }

  function checkS4() {
    const knobOk = session!.knobs?.find((k) => k.id === knob)?.correct
    if (knobOk && fidelityOk) succeed()
    else fail()
  }

  function checkS5() {
    const needed = (session!.files ?? []).filter((f) => f.needed).map((f) => f.id)
    const extras = (session!.files ?? []).filter((f) => !f.needed).map((f) => f.id)
    const hasAll = needed.every((id) => files.includes(id))
    const noExtra = extras.every((id) => !files.includes(id))
    const gateOk = session!.gates?.find((g) => g.id === gate)?.correct
    if (hasAll && noExtra && gateOk) succeed()
    else fail()
  }

  function goNext() {
    const next = sessions[index + 1]
    if (next) navigate(`/campaign/${next.id}`)
    else navigate('/campaign')
  }

  return (
    <PageShell className="py-12">
      <Link to="/campaign" className="text-sm font-medium text-ink-soft hover:text-ink">
        {tc('cta.back')}
      </Link>
      <h1 className="mt-4 font-display text-3xl text-ink md:text-4xl">{session.title}</h1>
      <p className="mt-2 text-felt">{session.goal}</p>
      <p className="mt-4 rounded-[var(--radius-card)] bg-ink p-4 text-cream/90">
        {session.story}
      </p>
      <p className="mt-6 font-medium text-ink">{session.task}</p>

      {session.options && (
        <div className="mt-4 space-y-2">
          {session.options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => checkOptions(opt.id)}
              className="block w-full rounded-[var(--radius-card)] border border-ink/15 bg-paper px-4 py-3 text-left text-sm hover:border-coral/50"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {session.notes && (
        <div className="mt-4 space-y-3">
          <div className="grid gap-2 sm:grid-cols-2">
            {session.notes.map((note) => {
              const on = selectedNotes.includes(note.id)
              return (
                <button
                  key={note.id}
                  type="button"
                  onClick={() =>
                    setSelectedNotes((prev) =>
                      on ? prev.filter((x) => x !== note.id) : [...prev, note.id],
                    )
                  }
                  className={[
                    'rounded-xl border px-3 py-3 text-left text-sm',
                    on ? 'border-mint bg-mint/15' : 'border-ink/15 bg-paper',
                  ].join(' ')}
                >
                  {note.text}
                </button>
              )
            })}
          </div>
          <Button onClick={checkNotes}>{tc('cta.continue')}</Button>
        </div>
      )}

      {session.knobs && (
        <div className="mt-4 space-y-5">
          <div className="space-y-2">
            {session.knobs.map((k) => (
              <button
                key={k.id}
                type="button"
                onClick={() => setKnob(k.id)}
                className={[
                  'block w-full rounded-[var(--radius-card)] border px-4 py-3 text-left text-sm',
                  knob === k.id ? 'border-coral bg-coral/10' : 'border-ink/15 bg-paper',
                ].join(' ')}
              >
                {k.label}
              </button>
            ))}
          </div>
          <FidelityLadder
            correctId={session.fidelityCorrect ?? 'P4'}
            onCorrect={() => setFidelityOk(true)}
          />
          <Button onClick={checkS4}>{tc('cta.continue')}</Button>
        </div>
      )}

      {session.files && session.gates && (
        <div className="mt-4 space-y-5">
          <div className="grid gap-2 sm:grid-cols-2">
            {session.files.map((f) => {
              const on = files.includes(f.id)
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() =>
                    setFiles((prev) =>
                      on ? prev.filter((x) => x !== f.id) : [...prev, f.id],
                    )
                  }
                  className={[
                    'rounded-xl border px-3 py-3 text-left font-mono text-sm',
                    on ? 'border-mint bg-mint/15' : 'border-ink/15 bg-paper',
                  ].join(' ')}
                >
                  {f.label}
                </button>
              )
            })}
          </div>
          <div className="space-y-2">
            {session.gates.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setGate(g.id)}
                className={[
                  'block w-full rounded-[var(--radius-card)] border px-4 py-3 text-left text-sm',
                  gate === g.id ? 'border-coral bg-coral/10' : 'border-ink/15 bg-paper',
                ].join(' ')}
              >
                {g.label}
              </button>
            ))}
          </div>
          <Button onClick={checkS5}>{tc('cta.continue')}</Button>
        </div>
      )}

      {feedback && (
        <div
          className={[
            'mt-6 rounded-[var(--radius-card)] p-4 text-sm',
            passed ? 'bg-mint/15 text-felt' : 'bg-coral/15 text-coral',
          ].join(' ')}
        >
          {feedback}
          {passed && (
            <div className="mt-4">
              <Button onClick={goNext}>
                {index < sessions.length - 1 ? tc('cta.continue') : tc('nav.campaign')}
              </Button>
            </div>
          )}
        </div>
      )}

      {!session.options && !session.notes && !session.knobs && !session.files && (
        <ButtonLink to="/campaign" className="mt-6">
          {tc('cta.back')}
        </ButtonLink>
      )}
    </PageShell>
  )
}
