export type WalkthroughTrack = 'beginner' | 'designer'

export type RoleBlock = {
  user: string[]
  agent: string[]
}

export type Chapter = {
  id: string
  theme: string
  title: string
  situation: string
  roles: RoleBlock
  prompt: string
  artifacts: string[]
  diagramIds: string[]
  features: string[]
  handbookAnchors?: string[]
  advancedLink?: {
    track: WalkthroughTrack
    chapterId: string
    label: string
  }
  reverseLink?: {
    track: WalkthroughTrack
    chapterId: string
    label: string
  }
}

export type PromptIndexItem = {
  chapterId: string
  label: string
  mode: string
  prompt: string
}

export type MatrixRow = {
  feature: string
  coverage: string
}

export type TrackContent = {
  caseName: string
  caseBlurb: string
  chapters: Chapter[]
  appendixSequenceDiagramId: string
  promptIndex: PromptIndexItem[]
  matrix: MatrixRow[]
}
