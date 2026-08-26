export const sharedDiagrams = {
  siteMap: `flowchart LR
  Install[Install] --> Tutorial[Tutorial]
  Install --> Example[Example]
  Example -->|deep dive| Tutorial
  Tutorial -->|full story| Example`,

  beginnerLifecycle: `flowchart LR
  Idea[Idea] --> Structure[PlainStructure]
  Structure --> PnP[HomePnP]
  PnP --> Play[PlayWithFriends]
  Play --> Diagnose[PlainDiagnose]
  Diagnose --> Change[OneChange]
  Change --> Gate{Keep_Rethink_Stop}`,

  designerLifecycle: `flowchart LR
  M0[M0_Create] --> M1[M1_MVP]
  M1 --> M2[M2_Structure]
  M2 --> M3[M3_Playtest]
  M3 --> Sim[Simulate]
  Sim --> Bal[Balance]
  Bal --> Kill{KillGate}
  Kill -->|Restructure| M1
  Kill -->|Continue| M4[M4_Polish]
  M4 --> M5[M5_Publish]`,
} as const

export type SharedDiagramId = keyof typeof sharedDiagrams
