const SKILL_REPO = 'https://github.com/kyle-ip/board-game-design'
const PROGRESS_KEY = 'bgd-guide-campaign'

export { SKILL_REPO, PROGRESS_KEY }

export type Progress = {
  cleared: string[]
}

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    if (!raw) return { cleared: [] }
    const parsed = JSON.parse(raw) as Progress
    return { cleared: Array.isArray(parsed.cleared) ? parsed.cleared : [] }
  } catch {
    return { cleared: [] }
  }
}

export function saveProgress(progress: Progress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
}

export function clearProgress() {
  localStorage.removeItem(PROGRESS_KEY)
}

export function markCleared(sessionId: string) {
  const p = loadProgress()
  if (!p.cleared.includes(sessionId)) {
    p.cleared.push(sessionId)
    saveProgress(p)
  }
  return p
}

export async function copyText(text: string) {
  await navigator.clipboard.writeText(text)
}
