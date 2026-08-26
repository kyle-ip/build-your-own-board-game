export const designerDiagrams = {
  milestones: `flowchart LR
  M0[M0 Concept] --> M1[M1 Core MVP]
  M1 --> M2[M2 Structure]
  M2 --> M3a[M3 Playtest]
  M3a --> Sim[Simulate]
  Sim --> Bal[Balance]
  Bal --> Kill{Kill gate}
  Kill -->|Restructure| M1b[Regress M1/M2]
  M1b --> M3b[Playtest again]
  M3b --> M4[M4 Polish]
  M4 --> M5[M5 Publish]
  Kill -->|Continue| M4`,

  createSequence: `sequenceDiagram
  participant U as User
  participant A as Agent
  participant S as Skill_KB
  participant P as ProjectFolder
  U->>A: Create prompt with constraints
  A->>S: Load euro profile workflow theme
  A->>P: Write concept-brief design-state skeleton
  A->>U: Compare chassis and recommend one`,

  stateMachine: `stateDiagram-v2
  direction LR
  [*] --> Open
  Open --> Locked: evidence
  Locked --> Open: contradict
  Open --> Rejected: failed idea
  Rejected --> [*]
  Locked --> Locked: session 2+`,

  fidelitySelect: `flowchart LR
  Hyp[Hypothesis] --> Need{Evidence needed?}
  Need -->|Equations| P0[P0 model]
  Need -->|Win rate| P1[P1 sim]
  Need -->|UI| P2[P2 digital]
  Need -->|Remote| P3[P3 tabletop]
  Need -->|Feel| P4[P4 paper]
  Need -->|Ship| P5[P5 production]
  P4 --> Usual[Usual first playable]`,

  artifactDeps: `flowchart LR
  DS[design-state] --> Brief[concept-brief]
  DS --> Skel[mechanism-skeleton]
  DS --> Exp[experiment]
  DS --> Sim[simulation-run]
  DS --> Dec[decision]
  Skel --> Rule[rulebook]
  Skel --> Comp[components]
  Comp --> PnP[pnp-checklist]
  Exp --> Log[playtest-log]`,

  symptomRoute: `flowchart LR
  Vague[Vague symptom] --> Index[symptom-index]
  Index --> Sys[System BG]
  Index --> Exp[Experience ED]
  Sys --> DiagS[One diagnostics file]
  Exp --> DiagE[One ED file]
  DiagS --> Hyp[Falsifiable hypothesis]
  DiagE --> Hyp`,

  diagnoseSequence: `sequenceDiagram
  participant U as User
  participant A as Agent
  participant R as Routing
  participant P as Project
  U->>A: Symptom plus playtest logs
  A->>P: Read design-state first
  A->>R: Route symptom-index
  A->>A: One diagnostic one hypothesis
  A->>P: Update state draft decision
  A->>U: Cheapest valid next test`,

  experimentLoop: `flowchart LR
  Base[Baseline] --> Var[One variable]
  Var --> Metric[Success metric]
  Metric --> Play[Playtests]
  Play --> Ev[Evidence]
  Ev --> Dec{Support reject revise}`,

  simBoundary: `sequenceDiagram
  participant U as User
  participant A as Agent
  participant Sim as Simulation
  participant P as Project
  U->>A: Length and seat win rates
  A->>Sim: Seeded runs
  Sim->>P: simulation-run.md SIM evidence
  A->>U: System evidence only
  Note over A,U: Do not auto-fix rules from anomaly
  U->>A: Human experiment still required for fun`,

  evidenceContrast: `flowchart LR
  subgraph system [SystemEvidence]
    S1[Win rates]
    S2[Length]
    S3[Dominance]
  end
  subgraph experience [ExperienceEvidence]
    E1[Tension]
    E2[Clarity]
    E3[Want rematch]
  end
  system -.->|never proves| experience`,

  mixedPriority: `flowchart LR
  Ask[Mixed ask] --> HasSym{Symptoms or balance?}
  HasSym -->|Yes| Diag[Diagnose or Balance]
  HasSym -->|System| Sim[Simulate first]
  HasSym -->|Clean| Create[Create then Prototype]
  Diag --> Proto[Prototype after hypothesis]
  Sim --> Proto
  Create --> Proto`,

  killGate: `flowchart LR
  Plays[3-plus playtests] --> Gate{kill-criteria}
  Gate -->|Core holds| Cont[Continue]
  Gate -->|Chassis fails| Restruct[Restructure]
  Gate -->|Premise fails| Kill[Pause or Kill]
  Restruct --> Reject[Rejected list]
  Reject --> Iter[iteration.md]`,

  polishPublish: `flowchart LR
  M4[M4 Polish] --> Blind[Blind rulebook]
  Blind --> Lint[lint checklist]
  Lint --> Export[CSV nanDECK PnP]
  Export --> M5[M5 print-specs]
  M5 --> Ext[Crowdfunding external]`,

  appendixSequence: `sequenceDiagram
  participant U as User
  participant A as Agent
  participant DS as design_state
  participant T as Table
  U->>A: Create Night Market
  A->>DS: brief state skeleton
  U->>A: P4 PnP bundle
  A->>DS: rulebook components
  U->>T: Playtests
  U->>A: Diagnose runaway leader
  A->>DS: HYP and decision
  U->>A: EXP single variable
  U->>T: Log results
  U->>A: Simulate seat win rates
  A->>DS: SIM evidence
  U->>A: Kill gate
  A->>DS: Restructure Rejected
  U->>A: Rebuild MVP then polish lint export
`,
} as const

export type DesignerDiagramId = keyof typeof designerDiagrams
