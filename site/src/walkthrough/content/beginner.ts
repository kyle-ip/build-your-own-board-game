import type { TrackContent } from '../types'

export const beginnerContent: TrackContent = {
  caseName: 'Cat Cafe',
  caseBlurb:
    'A light 3-4 player game about running a cat cafe. Plain language throughout; the agent translates design jargon when needed.',
  chapters: [
    {
      id: 'b0',
      theme: 'overview',
      title: 'What your rhythm looks like',
      situation:
        'You have a theme and friends at the table, not a glossary. This track uses a short loop: idea, simple structure, home print, play, name what felt wrong, change one thing, then decide whether to continue.',
      roles: {
        user: [
          'Bring constraints and table feel, not mechanism names.',
          'Play for real and jot what people said.',
          'When energy drops, choose keep, rethink, or pause.',
        ],
        agent: [
          'Translate jargon and spell out trade-offs in plain language.',
          'Write project files so the next chat is not a cold start.',
          'Skip mechanism codes and sims unless they clearly help.',
        ],
      },
      prompt:
        'I am new to game design. Explain how we will work together on a small home project using a short loop: constraints, simple structure, paper print, play, one change at a time. Do not ask me for mechanism codes.',
      artifacts: ['Mental model only; no project folder yet'],
      diagramIds: ['beginner.shortLoop'],
      features: ['Core loop', 'Six modes as contact points', 'Hard invariants in plain words'],
      handbookAnchors: ['#loop', '#invariants'],
      advancedLink: {
        track: 'designer',
        chapterId: 'd0',
        label: 'Designer step 0: engineering map and full feature set',
      },
    },
    {
      id: 'b1',
      theme: 'create',
      title: 'Turn an idea into constraints (Create)',
      situation:
        'You want a cat cafe game for friends and do not know terms like worker placement. The agent may ask up to five short questions, then compare two or three simple structures.',
      roles: {
        user: [
          'State player count, length, who you play with, and target vibe.',
          'Say plainly if you do not know design jargon.',
          'Ask for files under ./cat-cafe/ so work does not live only in chat.',
        ],
        agent: [
          'Ask at most five clarifying questions if needed.',
          'Compare 2-3 plain-language structures and recommend one.',
          'Write concept-brief, design-state, and mechanism-skeleton. No full rulebook yet.',
        ],
      },
      prompt:
        'I want a light board game for 3-4 friends, about 30-45 minutes, set in a cozy cat cafe we run together.\nVibe: funny, relaxed, lightly competitive, no early elimination.\nReference games: Ticket to Ride (easy to learn) and Unstable Unicorns (silly cards). I do not know terms like worker placement.\nAsk up to 5 short questions if needed, then compare 2-3 simple structures in plain language and recommend one.\nWrite concept-brief, design-state, and mechanism-skeleton to ./cat-cafe/ using templates/examples/micro-scavenger/ as the file format.\nNo full rulebook yet.',
      artifacts: [
        './cat-cafe/concept-brief.md',
        './cat-cafe/design-state.md',
        './cat-cafe/mechanism-skeleton.md',
      ],
      diagramIds: ['beginner.createSequence'],
      features: ['Create mode', 'Genre without jargon', 'Target feel'],
      handbookAnchors: ['#modes', '#artifacts'],
      advancedLink: {
        track: 'designer',
        chapterId: 'd1',
        label: 'Designer step 1: Create with chassis compare and genre-profile',
      },
    },
    {
      id: 'b2',
      theme: 'state',
      title: 'Do not restart next chat (design-state)',
      situation:
        'A week later the chat is new. design-state holds locked choices such as player count and the structure you picked.',
      roles: {
        user: [
          'Open every return session with: read design-state first.',
          'Do not ask the agent to quietly change locked numbers or structure.',
        ],
        agent: [
          'Read design-state before proposing changes.',
          'Treat Locked as sticky; keep Open ideas labeled Open.',
        ],
      },
      prompt:
        'Read design-state first in ./cat-cafe/.\nLast time we picked a simple card-drafting loop. This session: flesh out turn structure only. Still no full rulebook.\nExplain changes in plain language. Do not reopen player count or the drafting choice.',
      artifacts: [
        './cat-cafe/design-state.md (updated)',
        './cat-cafe/mechanism-skeleton.md (turn structure)',
      ],
      diagramIds: ['beginner.notebookState'],
      features: ['Cross-session design-state', 'Locked vs Open', 'Read state first'],
      handbookAnchors: ['#objects', '#invariants'],
      advancedLink: {
        track: 'designer',
        chapterId: 'd2',
        label: 'Designer step 2: Locked / Open / Rejected and context-budget',
      },
    },
    {
      id: 'b3',
      theme: 'prototype',
      title: 'Ship a table-ready build (Prototype)',
      situation:
        'You need a printable for game night: index cards, paper tokens, no art. In Skill terms that is usually P4 paper PnP. The agent should call it a paper playtest build, not lecture the whole fidelity ladder.',
      roles: {
        user: [
          'Ask for a friend-readable rulebook and a cut list.',
          'Keep components cheap and physical.',
        ],
        agent: [
          'Pick paper PnP as the cheapest way to feel the game.',
          'Write rulebook-draft, components-sheet, and pnp-checklist in plain language.',
        ],
      },
      prompt:
        'I have a rough skeleton in ./cat-cafe/mechanism-skeleton.md. I want a printable for game night.\n2-4 players, about 30 minutes, index cards and paper tokens, no art.\nRead design-state first.\nWrite rulebook-draft, components-sheet, and pnp-checklist I can print.\nUse language a friend who has not read the design files can follow.',
      artifacts: [
        './cat-cafe/rulebook-draft.md',
        './cat-cafe/components-sheet.md',
        './cat-cafe/pnp-checklist.md',
      ],
      diagramIds: ['beginner.paperFidelity'],
      features: ['Prototype mode', 'Cheapest valid fidelity', 'P4 home PnP'],
      handbookAnchors: ['#fidelity', '#artifacts'],
      advancedLink: {
        track: 'designer',
        chapterId: 'd3',
        label: 'Designer step 3: full P0-P5 fidelity ladder',
      },
    },
    {
      id: 'b4',
      theme: 'diagnose',
      title: 'After "it was fine": name the failure (Diagnose)',
      situation:
        'Three plays in. By round two the same person leads and others check out. Or everyone says "fine" and nobody asks for a rematch. Do not ask the agent to "make it better" in one pass.',
      roles: {
        user: [
          'Describe observed behavior and point at play notes.',
          'Ask for one likely cause and one small next change.',
        ],
        agent: [
          'Separate fairness issues from flat or forgettable feel, in plain words.',
          'Draft one experiment. Do not rewrite the whole game.',
        ],
      },
      prompt:
        'We played my draft 3 times (notes in ./cat-cafe/playtests/).\nBy round 2 the same person is always ahead and the rest stop caring. Rules are in ./cat-cafe/mechanism-skeleton.md.\nRead design-state first.\nI am not sure what is wrong. Name the most likely problem in plain language, propose ONE small change, and write an experiment draft.\nDo not rewrite the whole game.',
      artifacts: [
        './cat-cafe/design-state.md (updated claims)',
        './cat-cafe/experiment.md (draft)',
      ],
      diagramIds: ['beginner.symptomFork'],
      features: ['Diagnose mode', 'Symptom routing (plain)', 'System vs experience'],
      handbookAnchors: ['#routing', '#modes'],
      advancedLink: {
        track: 'designer',
        chapterId: 'd5',
        label: 'Designer step 5: BG* / ED* routing and diagnose-before-change',
      },
    },
    {
      id: 'b5',
      theme: 'experiment',
      title: 'Change one thing, then play again (Experiment)',
      situation:
        'You will test dealing 5 cards instead of 7 at setup. Everything else stays fixed. The agent can own EXP/HYP IDs in the files.',
      roles: {
        user: [
          'Name the single change and a plain success check.',
          'Fill the play sheet after game night.',
        ],
        agent: [
          'Write experiment.md and a one-page playtest log template.',
          'Assign IDs in files; explain the test in plain language.',
        ],
      },
      prompt:
        'Last playtest everyone said the starting hand is too swingy: some open strong, others stall.\nRead design-state first in ./cat-cafe/.\nTest ONLY one change: deal 5 cards instead of 7 at start. Keep all other rules the same.\nSuccess: in the next 4 plays, at least 3 groups say everyone had a reasonable first turn.\nWrite experiment.md and a simple playtest-log I can fill in after game night.',
      artifacts: [
        './cat-cafe/experiment.md',
        './cat-cafe/playtest-log.md',
        'Experiment backlog in design-state',
      ],
      diagramIds: ['beginner.oneKnob'],
      features: ['Experiment mode', 'Single variable', 'Success metric'],
      handbookAnchors: ['#modes', '#invariants'],
      advancedLink: {
        track: 'designer',
        chapterId: 'd6',
        label: 'Designer step 6: EXP/HYP IDs and playtest frameworks',
      },
    },
    {
      id: 'b6',
      theme: 'simulate-balance',
      title: 'Metrics vs "was it fun?" (Simulate / Balance)',
      situation:
        'Someone mentions simulation. Early on, paper plays usually teach more. Sims help later for seat win rate or length. Balance here means flagging a few outlier cards and changing one.',
      roles: {
        user: [
          'Ask whether paper or metrics is the cheaper next step.',
          'When balancing cards, change only one card first.',
        ],
        agent: [
          'Default to more table plays unless the question is purely systemic.',
          'Flag 1-3 likely strong cards in plain language; light math only if useful.',
          'State clearly that win rates do not prove fun.',
        ],
      },
      prompt:
        'My game always ends too fast and first player wins too often, but I have not playtested enough to be sure.\nRead design-state first in ./cat-cafe/.\nIf a simulation can answer length and win-rate questions, say what it would tell me in plain language. If paper playtests are better now, say so and tell me what to track on the next 5 plays.\nAlso review ./cat-cafe/components-sheet.md, flag the 3 most likely overpowered cards, and suggest adjusting ONE first.\nDo not change rules from numbers alone.',
      artifacts: [
        'Optional simulation-run.md later',
        './cat-cafe/balance-notes.md (lightweight)',
        'Note: system evidence is not experience evidence',
      ],
      diagramIds: ['beginner.evidenceContrast'],
      features: ['Simulate contact', 'Balance contact', 'System ≠ experience'],
      handbookAnchors: ['#modes', '#invariants'],
      advancedLink: {
        track: 'designer',
        chapterId: 'd7',
        label: 'Designer step 7: Simulate, EVR, no auto-fix from sims',
      },
    },
    {
      id: 'b7',
      theme: 'mixed-kill',
      title: 'Mixed asks and whether to continue',
      situation:
        'You want a mid-game boredom fix and a Friday print in one prompt. Later, after several polite but flat nights, you need a keep / rethink / pause call. Done means friends can teach the game, not crowdfunding.',
      roles: {
        user: [
          'When asks mix, accept diagnosis before a rush print.',
          'Confirm keep, rethink core, or pause from what you observed.',
        ],
        agent: [
          'Clarify the dull mid-game before full PnP polish.',
          'Frame Continue / Restructure / Pause in everyday words.',
          'Skip print-specs and crowdfunding unless asked.',
        ],
      },
      prompt:
        'Playtests say the mid-game is dull AND I want a printable set by Friday.\nRead design-state first in ./cat-cafe/.\nDiagnose the dull mid-game first. Do not jump to a full fancy PnP until we pick one small change to test.\n---\nWe have playtested 5 times over a month. Friends are polite but enthusiasm is fading.\nRead design-state and playtest notes in ./cat-cafe/.\nIn plain language: continue tweaking, rethink the core, or pause? Cite what we observed, not guesses.',
      artifacts: [
        'decision.md or a short decision note',
        'Updated design-state',
        'Optional iteration note if rethinking',
      ],
      diagramIds: ['beginner.keepGate'],
      features: ['Mixed-request priority', 'Kill gate (plain)', 'Pause literacy'],
      handbookAnchors: ['#mixed', '#kill'],
      advancedLink: {
        track: 'designer',
        chapterId: 'd9',
        label: 'Designer steps 8-10: cheatsheet, kill-criteria, lint/export/publish',
      },
    },
  ],
  appendixSequenceDiagramId: 'beginner.appendixSequence',
  promptIndex: [
    {
      chapterId: 'b1',
      label: 'Create Cat Cafe',
      mode: 'Create',
      prompt:
        'I want a light board game for 3-4 friends, about 30-45 minutes, set in a cozy cat cafe we run together.\nVibe: funny, relaxed, lightly competitive, no early elimination.\nReference games: Ticket to Ride (easy to learn) and Unstable Unicorns (silly cards). I do not know terms like worker placement.\nAsk up to 5 short questions if needed, then compare 2-3 simple structures in plain language and recommend one.\nWrite concept-brief, design-state, and mechanism-skeleton to ./cat-cafe/ using templates/examples/micro-scavenger/ as the file format.\nNo full rulebook yet.',
    },
    {
      chapterId: 'b2',
      label: 'Continue from design-state',
      mode: 'Create / Structure',
      prompt:
        'Read design-state first in ./cat-cafe/.\nLast time we picked a simple card-drafting loop. This session: flesh out turn structure only. Still no full rulebook.\nExplain changes in plain language. Do not reopen player count or the drafting choice.',
    },
    {
      chapterId: 'b3',
      label: 'Home PnP',
      mode: 'Prototype',
      prompt:
        'I have a rough skeleton in ./cat-cafe/mechanism-skeleton.md. I want a printable for game night.\n2-4 players, about 30 minutes, index cards and paper tokens, no art.\nRead design-state first.\nWrite rulebook-draft, components-sheet, and pnp-checklist I can print.\nUse language a friend who has not read the design files can follow.',
    },
    {
      chapterId: 'b4',
      label: 'Plain diagnose',
      mode: 'Diagnose',
      prompt:
        'We played my draft 3 times (notes in ./cat-cafe/playtests/).\nBy round 2 the same person is always ahead and the rest stop caring.\nRead design-state first.\nName the most likely problem in plain language, propose ONE small change, write an experiment draft. Do not rewrite the whole game.',
    },
    {
      chapterId: 'b5',
      label: 'One-knob experiment',
      mode: 'Experiment',
      prompt:
        'Read design-state first in ./cat-cafe/.\nTest ONLY one change: deal 5 cards instead of 7 at start.\nSuccess: in the next 4 plays, at least 3 groups say everyone had a reasonable first turn.\nWrite experiment.md and a simple playtest-log.',
    },
    {
      chapterId: 'b6',
      label: 'Sim vs paper + light balance',
      mode: 'Simulate / Balance',
      prompt:
        'Read design-state first in ./cat-cafe/.\nGames feel short and first player wins often. Say whether paper or simulation is cheaper now. Flag 3 likely strong cards; adjust ONE first. Do not change rules from numbers alone.',
    },
    {
      chapterId: 'b7',
      label: 'Mixed ask + keep/rethink/pause',
      mode: 'Mixed / Kill gate',
      prompt:
        'Mid-game is dull AND I want a print by Friday. Diagnose first.\nAfter 5 polite but flat plays: continue, rethink core, or pause? Cite observations.',
    },
  ],
  matrix: [
    { feature: 'Create', coverage: 'Step 1' },
    { feature: 'Prototype (paper PnP)', coverage: 'Step 3' },
    { feature: 'Diagnose (plain dual path)', coverage: 'Step 4' },
    { feature: 'Experiment (one variable)', coverage: 'Step 5' },
    { feature: 'Simulate (contact / defer)', coverage: 'Step 6 → Designer step 7' },
    { feature: 'Balance (lightweight)', coverage: 'Step 6 → Designer step 7' },
    { feature: 'design-state memory', coverage: 'Step 2' },
    { feature: 'Fidelity ladder depth', coverage: 'See Designer step 3' },
    { feature: 'Symptom index BG*/ED*', coverage: 'See Designer step 5' },
    { feature: 'Kill / restructure formal', coverage: 'Step 7 → Designer step 9' },
    { feature: 'Lint / export / publish', coverage: 'See Designer step 10' },
    { feature: 'Hard invariants', coverage: 'Steps 0-7' },
  ],
}
