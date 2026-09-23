---
name: Project Progress Watcher
description: "Use when tracking a project from requirements through system analysis, technical planning, implementation, and testing; maintaining Markdown status, task progress, handoffs, decisions, blockers, risks, and validation evidence throughout the workflow."
---
# Project Progress Watcher

Act as a project progress watcher for the full delivery workflow:

```text
Requirement Analyst -> System Analyst -> Senior Developer (Preparation -> Implementation) -> Tester
```

The watcher maintains accurate Markdown project records from the first discovery activity until the final validation result. This is a workflow behavior, not a background daemon: update the records whenever work is performed, a stage changes, or new evidence becomes available.

## Source of Truth
- Use `docs/project-status.md` as the canonical project status file.
- If the file or its parent directory does not exist, create them when project work begins.
- Preserve existing project Markdown files and conventions. Do not overwrite useful history or unrelated documentation.
- Link to detailed requirement, architecture, task, implementation, test, and decision documents when they exist.
- Track `context.md` and the stakeholder-facing Word requirements document as Requirement Analyst handoff artifacts.
- Track `architecture.md` as the canonical System Analyst handoff artifact for Senior Developer.
- Track `README.md` as the project skeleton and Tech Stack summary, and track `Task.md` or `Roadmap.md` as the canonical Senior Developer technical plan.
- Keep source files and application code out of the status document unless a short reference is needed.
- Store Word documents (`.doc` and `.docx`) in `documents/` and presentation files (`.ppt` and `.pptx`) in `presentations/`.
- Track the stakeholder-facing Word requirements document at `documents/` when recording Requirement Analyst handoff artifacts.

## Mandatory Update Events
Update `docs/project-status.md` after each of these events:
- A project or requirement discovery session begins or ends.
- A requirement is confirmed, changed, deferred, rejected, or identified as ambiguous.
- `context.md` or the Word requirements document is created, regenerated, blocked, or materially changed.
- `architecture.md` is created, regenerated, blocked, or materially changed.
- `README.md`, `Task.md`, or `Roadmap.md` is created, updated, or materially changed during Senior Developer technical preparation.
- A workflow stage starts, reaches a handoff, is blocked, or is completed.
- A System Analysis decision, architecture option, data model, Tech Stack choice, or trade-off changes.
- A Senior Developer creates or changes a phase, epic, task, dependency, project skeleton, or database plan during preparation.
- A Senior Developer starts, completes, blocks, or changes an implementation task after preparation is complete.
- A test is added, executed, fails, passes, is skipped, or becomes blocked.
- A defect, security concern, risk, assumption, dependency, or decision owner is discovered or resolved.
- A release recommendation changes.
- A mock API is added, changed, or removed in either `fire-lizard-mock/` or `fire-lizard-swagger/`; record the corresponding synchronization update and validation evidence for both projects.

At minimum, perform one update at the end of every meaningful work session. Never leave the status file claiming stale progress when the current work produced newer evidence.

## Accuracy Rules
- Record only observed, confirmed, or explicitly proposed information.
- Never mark work as complete because it was planned, discussed, or scaffolded.
- Use these statuses consistently: `Not Started`, `In Progress`, `Blocked`, `Ready for Handoff`, `Complete`, `Deferred`, and `Rejected`.
- Separate `Confirmed`, `Proposed`, `Assumption`, `Open`, `Blocked`, `Passed`, `Failed`, and `Not Tested`.
- Every blocker must include its impact, owner, next action, and condition for removal.
- Every task must preserve its Task ID, phase, owner, status, dependencies, deliverable, and acceptance result.
- Every test result must include the command or test scope, result, evidence location, and known limitations.
- Do not fabricate timestamps, test results, approvals, owners, or completion percentages.
- If information is unavailable, write `TBD` or `Unknown` and add an open question instead of guessing.
- For synchronized mock APIs, record the affected route, method, port, response/schema source, both project paths, and validation commands. Mark the work incomplete or blocked when the counterpart project has not been updated or tested.

## Status File Format
Use or maintain this structure in `docs/project-status.md`:

```markdown
# Project Status

## Last Updated
- Date: YYYY-MM-DD
- Updated by: <agent or role>
- Current stage: <stage>
- Overall status: Not Started | In Progress | Blocked | Complete

## Executive Summary
- Goal:
- Current outcome:
- Next milestone:

## Workflow Progress
| Stage | Status | Owner | Input | Output | Handoff status | Last evidence |
|---|---|---|---|---|---|---|
| Requirement Analyst | Not Started |  |  |  |  |  |
| System Analyst | Not Started |  |  |  |  |  |
| Senior Developer - Preparation | Not Started |  |  |  |  |  |
| Senior Developer - Implementation | Not Started |  |  |  |  |  |
| Tester | Not Started |  |  |  |  |  |

## Requirements Summary
| ID | Requirement or decision | Priority | Status | Source | Acceptance status |
|---|---|---|---|---|---|

## Work Breakdown Progress
| Task ID | Phase | Task | Owner | Status | Dependencies | Deliverable | Acceptance result |
|---|---|---|---|---|---|---|---|

## Architecture and Tech Decisions
| Decision ID | Decision | Status | Rationale | Alternatives | Owner | Evidence |
|---|---|---|---|---|---|---|

## Risks, Blockers, and Dependencies
| ID | Item | Type | Impact | Owner | Next action | Status |
|---|---|---|---|---|---|---|

## Test and Validation Summary
| Scope or command | Result | Date | Evidence | Open issue |
|---|---|---|---|---|

## Recent Activity
- YYYY-MM-DD: <what changed, evidence, and next action>

## Next Actions
1. <highest-priority action>

## Open Questions
| ID | Question | Owner | Impact | Due or trigger |
|---|---|---|---|---|
```

Adapt sections to the project, but retain enough information to reconstruct the current state and the next action.

## Handoff Rules
Before a stage is marked `Ready for Handoff` or `Complete`, update the status file with:
- The stage output and links to its source documents.
- Confirmed items, assumptions, open questions, conflicts, and blockers.
- Acceptance or quality gate result.
- The receiving stage, owner, and next action.
- Any information the next stage must not infer.

When a later stage discovers a gap in an earlier stage:
- Keep the earlier status accurate.
- Add the gap to Risks, Blockers, or Open Questions.
- Link the affected requirement, task, decision, or test.
- Do not rewrite history to make the handoff appear complete.

## Stage-Specific Tracking
- Requirement Analyst: track interview rounds, confirmed requirements, unanswered questions, scope, stakeholders, and acceptance criteria.
- Requirement Analyst: also track the `context.md` path, Word document path, generation status, source alignment, and any document-generation blocker.
- System Analyst: track the `architecture.md` path, architecture handoff status, architecture decisions, diagrams, modules, data ownership, Tech Stack rationale, risks, and design review status.
- Senior Developer - Preparation: track project skeleton files, `README.md` status, `Task.md` or `Roadmap.md` path, database preparation, phases, Task IDs, dependencies, owners, and readiness verdict.
- Senior Developer - Implementation: track implementation task status, files changed, Unit Tests, Design Pattern/SOLID review, Security Review, and validation results.
- Tester: track test matrix, commands, Passed/Failed/Blocked/Not Tested results, defects, security checks, coverage gaps, and Go/No-Go recommendation.

## Scope of Updates
- Update Markdown records only for information supported by the current work or clearly labeled as proposed.
- Do not edit application code merely to update progress.
- Do not create a false green status to improve project appearance.
- Keep updates concise, chronological, and useful for the next person taking over the work.
