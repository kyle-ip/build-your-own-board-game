export const beginnerDiagrams = {
  shortLoop: `flowchart LR
  Idea[Idea and constraints] --> Structure[Plain-language structure]
  Structure --> PnP[Home paper PnP]
  PnP --> Play[Play with friends]
  Play --> Diagnose[Plain diagnosis]
  Diagnose --> OneChange[Change one rule]
  OneChange --> Gate{Keep rethink pause}
  Gate -->|Keep| Play
  Gate -->|Rethink| Structure
  Gate -->|Pause| Archive[Park the project]`,

  createSequence: `sequenceDiagram
  participant U as User
  participant A as Agent
  participant P as ProjectFolder
  U->>A: Idea plus players time feel
  A->>U: Up to 5 short clarifying questions
  U->>A: Answers in plain language
  A->>A: Compare 2 to 3 simple structures
  A->>P: Write brief design-state skeleton
  A->>U: Recommend one structure explain why`,

  notebookState: `stateDiagram-v2
  direction LR
  [*] --> Open: new idea
  Open --> Locked: confirm players time structure
  Locked --> Locked: later sessions respect it
  Open --> Open: still exploring`,

  paperFidelity: `flowchart LR
  Q[What question] --> Table{Need table feel?}
  Table -->|Yes| Paper[Paper print-and-play]
  Table -->|System numbers| Later[Maybe simulate later]
  Paper --> Enough[Index cards no art]
  Later --> Paper`,

  symptomFork: `flowchart LR
  Symptom[Table feedback] --> Unfair[Always ahead early]
  Symptom --> Flat[Fine but no rematch]
  Unfair --> Sys[Fairness or catch-up]
  Flat --> Exp[Feel or memory]
  Sys --> OneFix[ONE small change]
  Exp --> OneFix`,

  oneKnob: `flowchart LR
  Baseline[Rules before] --> Knob[Twist one knob only]
  Knob --> Log[Fill play notes]
  Log --> Decide{Keep or revert?}
  Decide -->|Keep| Update[Update notebook]
  Decide -->|Revert| Baseline`,

  evidenceContrast: `flowchart LR
  subgraph humans [TableTalk]
    H1[Was it tense?]
    H2[Want to play again?]
  end
  subgraph numbers [SystemNumbers]
    N1[Who wins how often]
    N2[How long games run]
  end
  humans -.->|does not equal| numbers`,

  keepGate: `flowchart LR
  Evidence[Several plays logged] --> Gate{How is enthusiasm?}
  Gate -->|Still curious| Keep[Keep tweaking]
  Gate -->|Theme ok loop flat| Rethink[Rethink the core]
  Gate -->|Energy gone| Pause[Pause or stop]`,

  appendixSequence: `sequenceDiagram
  participant U as User
  participant A as Agent
  participant N as Notebook
  participant T as Table
  U->>A: Create Cat Cafe idea
  A->>N: brief design-state skeleton
  U->>A: Make a printable version
  A->>N: rulebook components checklist
  U->>T: Play with friends
  U->>A: Describe what felt wrong
  A->>N: experiment draft
  U->>T: Test one change
  U->>A: Keep rethink or pause
`,
} as const

export type BeginnerDiagramId = keyof typeof beginnerDiagrams
