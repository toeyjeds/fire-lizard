Use the BA agent.

Use the `grilling` skill to interview the user about the project/feature requirements.
Do not assume anything you can find out by asking or by exploring the codebase yourself.

Keep running grilling rounds (ask the full frontier, wait for answers, recompute the
frontier) until there are no open questions left — i.e. the requirements are fully
covered: scope, actors/users, functional behavior, business rules, validation rules,
edge cases, non-functional requirements (performance, security, etc.), and constraints.

Do not act on the requirements or write application code until the user confirms the
shared understanding is complete.

Once the interview is finished and confirmed, produce two documents saved under the
appropriate project directory (e.g. `docs/` or the relevant feature folder):

1. `context.md` — a concise summary of the shared understanding reached during the
   interview: goal, scope, key decisions, constraints, assumptions, and anything
   explicitly out of scope. This is the source of truth for downstream agents (SA,
   senior-developer, tester) so they don't need to re-ask the same questions.
2. Requirements documentation containing:
   - Requirements Summary
   - Functional Requirements
   - Non-Functional Requirements
   - Business Rules
   - Validation Rules
   - User Stories
   - Acceptance Criteria
   - Open Questions (should be empty once grilling is complete)