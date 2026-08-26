import { beginnerDiagrams } from './beginner'
import { designerDiagrams } from './designer'
import { sharedDiagrams } from './shared'

export { beginnerDiagrams, designerDiagrams, sharedDiagrams }

const allDiagrams = {
  ...Object.fromEntries(
    Object.entries(sharedDiagrams).map(([k, v]) => [`shared.${k}`, v]),
  ),
  ...Object.fromEntries(
    Object.entries(beginnerDiagrams).map(([k, v]) => [`beginner.${k}`, v]),
  ),
  ...Object.fromEntries(
    Object.entries(designerDiagrams).map(([k, v]) => [`designer.${k}`, v]),
  ),
} as Record<string, string>

export function getDiagram(diagramId: string): string | undefined {
  return allDiagrams[diagramId]
}
