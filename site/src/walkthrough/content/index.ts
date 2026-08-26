import { beginnerContent } from './beginner'
import { designerContent } from './designer'
import type { TrackContent, WalkthroughTrack } from '../types'

export { beginnerContent, designerContent }

export function getTrackContent(track: WalkthroughTrack): TrackContent {
  return track === 'beginner' ? beginnerContent : designerContent
}
