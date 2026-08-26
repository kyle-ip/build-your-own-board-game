import type { TrackContent } from '../types'

export const designerContent: TrackContent = {
  caseName: 'Night Market',
  caseBlurb:
    'A medium-light euro about competing stallholders (3-4p, ~40 min). Milestones 0-5 with one restructure, pro vocabulary, and every major Skill feature in the story.',
  chapters: [
    {
      id: 'd0',
      theme: 'overview',
      title: 'Engineering map and feature set',
      situation:
        'Treat the Skill as an evidence-driven design OS. design-state is the decision store; claims are falsifiable hypotheses; experiments are single-variable tests; fidelity is test-environment cost; the kill gate is go, pivot, or kill.',
      roles: {
        user: [
          'Bring constraints, symptoms, and gate confirmations.',
          'Run human playtests for experience claims.',
        ],
        agent: [
          'Pick one mode per session; load the smallest file set.',
          'Write templates into the project folder; never bulk-load all chapters.',
        ],
      },
      prompt:
        'Summarize how Board Game Design Skill maps to an engineering workflow for Night Market: milestones 0-5, six modes, and hard invariants. Do not create project files yet.',
      artifacts: ['Orientation only'],
      diagramIds: ['designer.milestones'],
      features: [
        'Milestones 0-5',
        'Six modes',
        'Context-budget',
        'bgd-sim noted, not executed here',
      ],
      handbookAnchors: ['#milestones', '#loop', '#modes'],
      reverseLink: {
        track: 'beginner',
        chapterId: 'b0',
        label: 'Beginner step 0: short-loop mental model',
      },
    },
    {
      id: 'd1',
      theme: 'create',
      title: 'Create · Milestone 0',
      situation:
        'Greenfield Night Market: scarcity tension, light conflict, hobby audience. Compare worker placement, action drafting, and open market before locking. Format reference: micro-scavenger templates.',
      roles: {
        user: [
          'Players, duration, audience, target feel (MDA aesthetics).',
          'Require 2-4 chassis comparisons and an output folder.',
        ],
        agent: [
          'Load one genre-profile plus workflow and theme-and-experience.',
          'Write concept-brief, design-state (including Target Player Model), mechanism-skeleton.',
          'Skip full rules on pass one.',
        ],
      },
      prompt:
        'Design a 3-4 player, 40-minute medium-light game about night-market stall logistics.\nTarget feel: scarcity tension, timing races, light direct conflict.\nAudience: hobby gamers who know Wingspan but not heavy euros.\nCompare worker placement vs action drafting vs open market. Recommend one with trade-offs.\nWrite concept-brief, design-state, and mechanism-skeleton to ./night-market/ using templates/examples/micro-scavenger/ as format reference.\nDo not write full rules yet.',
      artifacts: [
        './night-market/concept-brief.md',
        './night-market/design-state.md',
        './night-market/mechanism-skeleton.md',
      ],
      diagramIds: ['designer.createSequence'],
      features: ['Create', 'genre-profile', 'Theme/experience', 'Chassis comparison'],
      handbookAnchors: ['#modes', '#genres', '#artifacts'],
      reverseLink: {
        track: 'beginner',
        chapterId: 'b1',
        label: 'Beginner step 1: plain-language Create',
      },
    },
    {
      id: 'd2',
      theme: 'state',
      title: 'design-state and hard invariants',
      situation:
        'Session 2+. Action drafting is Locked. Deepen the core loop only. Context-budget: load what the mode needs, not all thirteen chapters.',
      roles: {
        user: [
          'Always read design-state first.',
          'Do not reopen Locked without contradicting evidence.',
        ],
        agent: [
          'Respect Locked / Open / Rejected.',
          'Update Claims, Evidence, and the experiment backlog only when warranted.',
        ],
      },
      prompt:
        'Read design-state first in ./night-market/.\nWe locked action drafting last session. Draft the core loop diagram and update mechanism-skeleton with the chosen chassis only.\nDo not reopen worker placement unless new evidence.',
      artifacts: ['./night-market/design-state.md', './night-market/mechanism-skeleton.md'],
      diagramIds: ['designer.stateMachine'],
      features: ['Hard invariants', 'Locked/Open/Rejected', 'context-budget'],
      handbookAnchors: ['#invariants', '#objects'],
      reverseLink: {
        track: 'beginner',
        chapterId: 'b2',
        label: 'Beginner step 2: notebook metaphor',
      },
    },
    {
      id: 'd3',
      theme: 'prototype',
      title: 'Prototype · Milestone 1 (P4 MVP)',
      situation:
        'Hypothesis: the drafting loop is teachable in one pass. Cheapest valid human test is P4 paper PnP.',
      roles: {
        user: [
          'Name fidelity target and component constraints.',
          'Expect a lint pass before calling the bundle done.',
        ],
        agent: [
          'Use prototype/selection.md; prefer P4 for the first human-playable.',
          'Emit rulebook-draft, components-sheet, pnp-checklist; mention lint/checklist.',
        ],
      },
      prompt:
        'Turn ./night-market/mechanism-skeleton.md into a paper PnP:\nrulebook-draft, components-sheet, pnp-checklist.\n3-4p, 40 min, index-card prototype, no art.\nExport cards.csv per tools/export-pipeline.md if batch cards are needed.\nRun lint/checklist before finishing.\nRead design-state first.',
      artifacts: [
        'rulebook-draft.md',
        'components-sheet.md',
        'pnp-checklist.md',
        'optional cards.csv',
      ],
      diagramIds: ['designer.fidelitySelect'],
      features: ['Prototype', 'Fidelity ladder P0-P5', 'Export pipeline'],
      handbookAnchors: ['#fidelity', '#artifacts'],
      reverseLink: {
        track: 'beginner',
        chapterId: 'b3',
        label: 'Beginner step 3: home paper build',
      },
    },
    {
      id: 'd4',
      theme: 'structure',
      title: 'Structure · Milestone 2 + invocation',
      situation:
        'Deepen turn structure and stall grid. Separately, look up WPL-03 vs soft blocking for a 2p note: mechanism invocation without dumping all chapters.',
      roles: {
        user: [
          'Keep structure work scoped; use mechanism codes when you know them.',
        ],
        agent: [
          'Update skeleton and design-state.',
          'On code or topic lookup, open only the matching chapter and patterns entry.',
        ],
      },
      prompt:
        'Read design-state first in ./night-market/.\nExpand mechanism-skeleton with turn structure and stall-grid interactions only. Freeze theme text.\nAlso: explain WPL-03 vs soft blocking (bumping) trade-offs for a possible 2p variant. Trade-offs only; no new project files for that lookup.',
      artifacts: [
        'Updated mechanism-skeleton.md',
        'design-state Project Status',
        'In-chat mechanism trade-offs',
      ],
      diagramIds: ['designer.artifactDeps'],
      features: ['Milestone 2', 'Invocation patterns', 'chapters / patterns'],
      handbookAnchors: ['#invocation', '#milestones', '#artifacts'],
    },
    {
      id: 'd5',
      theme: 'diagnose',
      title: 'Diagnose before changing rules',
      situation:
        'After four plays, the leader is obvious by round three. Route runaway leader. Side path: if the complaint is "nobody remembers the game," that is an experience (ED*) path. Still one diagnostic, one hypothesis.',
      roles: {
        user: [
          'Provide symptom plus log paths; forbid stacked rule rewrites.',
        ],
        agent: [
          'symptom-index → one diagnostics file → falsifiable HYP.',
          'Draft decision.md; pick cheapest valid fidelity for the test.',
        ],
      },
      prompt:
        'We playtested 4 times (logs in ./night-market/playtests/).\nLeader is usually decided by round 3; trailing players say they cannot catch up.\nRead design-state first.\nDiagnose snowball vs low agency vs endgame drag, propose one falsifiable hypothesis, and draft EXP-005.\nDo not change three rules at once.\n---\nAlternate experience path (for contrast):\nPeople say it is fine but nobody asks for a rematch. Route experience diagnostics (ED*) and propose one hypothesis. Still one change.',
      artifacts: ['design-state Claims/Evidence', 'decision.md', 'EXP-005 draft'],
      diagramIds: ['designer.symptomRoute', 'designer.diagnoseSequence'],
      features: ['Diagnose', 'Symptom routing', 'System BG* + Experience ED*'],
      handbookAnchors: ['#routing', '#modes'],
      reverseLink: {
        track: 'beginner',
        chapterId: 'b4',
        label: 'Beginner step 4: plain symptom fork',
      },
    },
    {
      id: 'd6',
      theme: 'experiment',
      title: 'Experiment · Milestone 3',
      situation:
        'HYP: lowering hand limit increases discard contest without adding AP. Framework: Good/Bad/Meh plus contest counts.',
      roles: {
        user: [
          'Fix baseline version, one variable, measurable success.',
        ],
        agent: [
          'Write experiment.md and playtest-log with EXP/HYP IDs.',
          'Update Experiment Backlog in design-state.',
        ],
      },
      prompt:
        'Set up EXP-002: test hand limit 4 to 3 only. Everything else stays v0.6.\nHypothesis: smaller hand increases discard-pile fights without adding AP.\nSuccess: in 4/5 playtests, both players contest discard at least twice; fun >= 3.5/5.\nRead design-state first.\nWrite experiment.md and a blank playtest-log template for the next session. Use Good/Bad/Meh plus contest tallies.',
      artifacts: ['experiment.md', 'playtest-log.md', 'Backlog update'],
      diagramIds: ['designer.experimentLoop'],
      features: ['Experiment', 'EXP/HYP IDs', 'Playtest frameworks'],
      handbookAnchors: ['#modes', '#invariants'],
      reverseLink: {
        track: 'beginner',
        chapterId: 'b5',
        label: 'Beginner step 5: one-knob test',
      },
    },
    {
      id: 'd7',
      theme: 'simulate-balance',
      title: 'Simulate + Balance (system ≠ experience)',
      situation:
        'You need seat win rates and length distributions. Sims write SIM evidence only. Separately, review stall cards for Effective Value Range outliers; one fix per pass. Never auto-fix from a sim anomaly.',
      roles: {
        user: [
          'Ask system questions with seed and sample size when useful.',
          'Require explicit "not fun evidence" language.',
        ],
        agent: [
          'Produce simulation-run.md; update Simulation Evidence.',
          'Balance notes / spreadsheet with confidence and dependencies.',
          'On anomaly: Observation → Diagnostic → Hypothesis → Experiment.',
        ],
      },
      prompt:
        'Run 1000 mixed-population simulations of Night Market with seed 42 (or describe the procedure if runtime is unavailable).\nFocus on length and seat win rates.\nWrite simulation-run.md and update design-state Evidence.\nState explicitly that this is system evidence, not experience evidence.\n---\nReview CARD-014 through CARD-022 in ./night-market/components-sheet.md.\nBuild balance-spreadsheet rows using value-budget; flag any card where cost vs total estimated value differs by >40%.\nOne fix recommendation only. State confidence and dependencies.',
      artifacts: [
        'simulation-run.md',
        'balance-notes.md',
        'balance-spreadsheet.md',
        'Simulation Evidence in design-state',
      ],
      diagramIds: ['designer.simBoundary', 'designer.evidenceContrast'],
      features: [
        'Simulate',
        'bgd-sim described, not executed here',
        'Balance / EVR',
        'No auto-fix from sim',
      ],
      handbookAnchors: ['#modes', '#invariants'],
      reverseLink: {
        track: 'beginner',
        chapterId: 'b6',
        label: 'Beginner step 6: when to skip sims',
      },
    },
    {
      id: 'd8',
      theme: 'mixed',
      title: 'Mixed requests and cheatsheet priority',
      situation:
        'One prompt asks to fix a dull mid-game and ship PnP by Friday. Cheatsheet priority: Diagnose before Prototype when symptoms exist.',
      roles: {
        user: [
          'Accept that mixed asks get sequenced, not parallelized.',
        ],
        agent: [
          'Follow Diagnose/Balance → Simulate (if systemic) → Create → Prototype → Polish.',
          'One mode focus per working pass.',
        ],
      },
      prompt:
        'Playtests say the mid-game is dull AND I want a PnP by Friday.\nRead design-state first in ./night-market/.\nDiagnose mid-game drag first. Do not jump to full PnP until we pick one hypothesis to test.',
      artifacts: ['Diagnosis first', 'Deferred PnP until HYP chosen'],
      diagramIds: ['designer.mixedPriority'],
      features: ['Mixed requests', 'Cheatsheet priority', 'One mode per pass'],
      handbookAnchors: ['#mixed'],
      reverseLink: {
        track: 'beginner',
        chapterId: 'b7',
        label: 'Beginner step 7: mixed-ask intuition',
      },
    },
    {
      id: 'd9',
      theme: 'kill',
      title: 'Kill gate and restructure',
      situation:
        'Fun scores 2.6 / 2.7 / 2.5 across three tests; feedback blames the chassis, not one card. Restructure: regress to M1/M2, move failed mechanisms to Rejected, keep history in iteration.md.',
      roles: {
        user: [
          'Confirm Continue / Restructure / Pause-or-Kill with the agent.',
        ],
        agent: [
          'Run kill-criteria.md and cite evidence.',
          'On Restructure: Rejected list plus iteration.md; keep prior files.',
        ],
      },
      prompt:
        'PT-001 through PT-004 done. Core loop is learnable but average fun was 2.8/5 twice in a row; comments blame the drafting chassis.\nRead design-state first.\nRun kill-criteria.md: Continue, Restructure, or Pause/Kill? Cite evidence.\nIf Restructure: move failed mechanisms to Rejected, write iteration.md, propose the next Create/Prototype pass without deleting history.',
      artifacts: ['kill decision', 'Rejected updates', 'iteration.md'],
      diagramIds: ['designer.killGate'],
      features: ['Kill gate', 'Milestone regression', 'Rejected + iteration history'],
      handbookAnchors: ['#kill', '#milestones'],
      reverseLink: {
        track: 'beginner',
        chapterId: 'b7',
        label: 'Beginner step 7: keep / rethink / pause',
      },
    },
    {
      id: 'd10',
      theme: 'polish',
      title: 'Polish · M4 → Publish · M5 boundary',
      situation:
        'After a healthier chassis, freeze mechanisms, blind-test the rulebook, run lint (sample BG items), export cards, then stop at print-specs. Crowdfunding sits outside the Skill.',
      roles: {
        user: [
          'Blind-test with someone who did not design the game.',
          'Treat M5 as specs plus an external production process.',
        ],
        agent: [
          'Polish balance pass; lint/checklist before P4 ship.',
          'Run export pipeline; point to print-specs.md; do not invent a full crowdfunding plan as Skill output.',
        ],
      },
      prompt:
        'Night Market v1.1 chassis is Locked after restructure. Prepare M4 polish:\n1) Blind-rulebook pass notes template\n2) One balance pass on economy numbers\n3) Run lint/checklist.md (call out any BG001-BG020 hits you can infer from files)\n4) Export cards.csv for nanDECK\nThen summarize what print-specs.md would cover for POD vs mass. Do not draft a Kickstarter page.\nRead design-state first. Freeze mechanisms unless lint forces a fix experiment.',
      artifacts: [
        'Updated rulebook',
        'balance-notes',
        'lint results',
        'cards.csv',
        'print-specs pointer',
      ],
      diagramIds: ['designer.polishPublish'],
      features: ['Milestone 4-5', 'Lint BG001-BG020', 'Export / nanDECK', 'print-specs boundary'],
      handbookAnchors: ['#milestones', '#artifacts', '#faq'],
    },
  ],
  appendixSequenceDiagramId: 'designer.appendixSequence',
  promptIndex: [
    {
      chapterId: 'd1',
      label: 'Create Night Market',
      mode: 'Create · M0',
      prompt:
        'Design a 3-4 player, 40-minute medium-light game about night-market stall logistics.\nTarget feel: scarcity tension, timing races, light direct conflict.\nCompare worker placement vs action drafting vs open market.\nWrite concept-brief, design-state, mechanism-skeleton to ./night-market/. No full rules yet.',
    },
    {
      chapterId: 'd2',
      label: 'Continue Locked chassis',
      mode: 'Structure',
      prompt:
        'Read design-state first in ./night-market/.\nAction drafting is Locked. Update mechanism-skeleton core loop only. Do not reopen worker placement.',
    },
    {
      chapterId: 'd3',
      label: 'P4 PnP bundle',
      mode: 'Prototype · M1',
      prompt:
        'Turn mechanism-skeleton into rulebook-draft, components-sheet, pnp-checklist. Index cards, no art. Lint before finish. Optional cards.csv.',
    },
    {
      chapterId: 'd4',
      label: 'Structure + mechanism lookup',
      mode: 'Structure / Invocation',
      prompt:
        'Expand turn structure and stall grid. Explain WPL-03 vs soft blocking for 2p. Trade-offs only; no new files for the lookup.',
    },
    {
      chapterId: 'd5',
      label: 'Diagnose runaway leader',
      mode: 'Diagnose',
      prompt:
        'Leader decided by round 3. Read design-state. Diagnose; one HYP; draft EXP-005. No stacked fixes.',
    },
    {
      chapterId: 'd6',
      label: 'EXP hand limit',
      mode: 'Experiment · M3',
      prompt:
        'EXP-002: hand limit 4→3 only. Success: contest discard ≥2 times in 4/5 plays; fun ≥3.5/5. Write experiment + log template.',
    },
    {
      chapterId: 'd7',
      label: 'Simulate + EVR balance',
      mode: 'Simulate / Balance',
      prompt:
        '1000 mixed-pop sims seed 42 → simulation-run.md (system evidence only).\nReview CARD-014 through CARD-022; flag EVR outliers; one fix.',
    },
    {
      chapterId: 'd8',
      label: 'Mixed dull + PnP',
      mode: 'Mixed',
      prompt:
        'Dull mid-game AND PnP by Friday. Diagnose first; defer full PnP until one HYP is chosen.',
    },
    {
      chapterId: 'd9',
      label: 'Kill gate restructure',
      mode: 'Kill gate',
      prompt:
        'Fun ~2.8/5 twice; chassis blamed. Run kill-criteria. If Restructure: Rejected + iteration.md; keep history.',
    },
    {
      chapterId: 'd10',
      label: 'Polish to publish boundary',
      mode: 'Prototype / Balance / Lint',
      prompt:
        'M4: blind rulebook, one balance pass, lint, cards.csv. Summarize print-specs POD vs mass. No Kickstarter page.',
    },
  ],
  matrix: [
    { feature: 'Create', coverage: 'Step 1' },
    { feature: 'Diagnose + dual diagnostics', coverage: 'Step 5' },
    { feature: 'Experiment', coverage: 'Step 6' },
    { feature: 'Simulate (+ bgd-sim noted)', coverage: 'Step 7' },
    { feature: 'Balance / EVR', coverage: 'Step 7' },
    { feature: 'Prototype', coverage: 'Step 3' },
    { feature: 'Milestones 0-5', coverage: 'Steps 0-10' },
    { feature: 'Restructure regression', coverage: 'Step 9' },
    { feature: 'Symptom routing', coverage: 'Step 5' },
    { feature: 'Fidelity ladder P0-P5', coverage: 'Step 3' },
    { feature: 'design-state Locked/Open/Rejected', coverage: 'Steps 2, 9' },
    { feature: 'Hard invariants', coverage: 'Steps 0, 2, 7' },
    { feature: 'context-budget', coverage: 'Steps 0, 2' },
    { feature: 'Invocation / chapters', coverage: 'Step 4' },
    { feature: 'Mixed-request priority', coverage: 'Step 8' },
    { feature: 'Kill gate', coverage: 'Step 9' },
    { feature: 'Lint BG001-BG020', coverage: 'Step 10' },
    { feature: 'Export pipeline', coverage: 'Steps 3, 10' },
    { feature: 'print-specs / M5 boundary', coverage: 'Step 10' },
    { feature: 'System ≠ experience evidence', coverage: 'Step 7' },
  ],
}
