---
name: Project Development Workflow
description: "Use when planning or delivering a project through the Requirement Analyst, System Analyst, Senior Developer, and Tester workflow; covering requirements, system analysis, project structure, task breakdown, implementation, Unit Tests, security, and validation."
---
# Project Development Workflow

## Project File Storage Rules
- Store Word documents (`.doc` and `.docx`) in `documents/`.
- Store presentation files (`.ppt` and `.pptx`) in `presentations/`.
- Preserve these folder conventions unless the user explicitly requests another path.

## Project Color Tokens
- Use exactly these three project colors unless the user explicitly approves an exception:
        - Background: `#FFFFFF` (white)
        - Text: `#000000` (black)
        - SCB Purple: `#4E2A84`
- Use `#FFFFFF` as the default page or slide background and `#000000` for primary readable text.
- Use `#4E2A84` for brand accents, primary actions, highlights, links, and other emphasis elements.
- Do not introduce additional colors for the project visual design without recording an explicit decision.

Follow this workflow for project work unless the user explicitly requests a different scope or stage:

```text
Requirement Analyst
        |
        v
System Analyst
        |
        v
Senior Developer
        |
        v
Tester
```

## Workflow Rules
- Treat each stage as a handoff with explicit inputs, outputs, assumptions, decisions, and open questions.
- Do not silently skip a stage when its output is required by the next stage.
- A later stage may identify gaps in an earlier stage, but must record the gap and request clarification or create a clearly labeled assumption before proceeding.
- Keep confirmed facts, proposals, assumptions, and unresolved decisions visibly separate.
- Use the user's language for reports and communication while preserving precise English technical terms when useful.
- Keep requirements, architecture, project structure, tasks, implementation, and test evidence traceable to one another.

## Mock API Synchronization Rule
- Treat `fire-lizard-mock/` and `fire-lizard-swagger/` as a synchronized mock API pair. A mock API change is incomplete until both projects and their documentation describe the same API surface.
- When an API, route, method, request, response, status code, schema, API name, or port is added, changed, or removed in `fire-lizard-mock/`, update the matching `fire-lizard-swagger/openapi.yaml`, Swagger documentation, mock behavior, and relevant README/status records in the same task.
- When `fire-lizard-swagger/openapi.yaml` changes, apply the corresponding change to `fire-lizard-mock/mock_data/imposters/imposters.json` and the organized response examples under `fire-lizard-mock/mock_data/services/`.
- Keep the service boundaries explicit: Mountebank remains the multi-port mock server (`8888` admin, `3000` internal, `3001` external), while `fire-lizard-swagger` remains the OpenAPI/documentation project and its local mock server remains on its documented port.
- Before marking a synchronized mock change complete, run `fire-lizard-mock` configuration and API checks, run `fire-lizard-swagger` OpenAPI validation and mock checks, and compare route, port, response, and schema evidence across both projects.
- If the two projects intentionally differ, record the difference, rationale, owner, and follow-up validation in `docs/project-status.md`; never silently leave the API definitions inconsistent.

## Stage 1: Requirement Analyst
The Requirement Analyst gathers and clarifies the problem before technical design begins.

Responsibilities:
- Interview stakeholders in focused rounds of no more than five high-value questions.
- Identify goals, users, business rules, scope, constraints, success criteria, risks, dependencies, and open decisions.
- Separate confirmed requirements from assumptions, recommendations, conflicts, and unknowns.
- Define testable acceptance criteria without inventing unsupported behavior.

Required output:
- Project Requirements Summary.
- `context.md` containing the complete structured requirements handoff.
- A Word document containing the same approved requirements report, normally `documents/requirements-summary.docx` unless the user specifies another path.
- Stakeholders and users.
- In-scope and out-of-scope boundaries.
- Functional and non-functional requirements with IDs, priorities, sources, and status.
- Acceptance criteria.
- Risks, assumptions, dependencies, and open questions.

Restriction:
- Do not write application code or make implementation changes.
- Word generation is documentation work only. Do not install dependencies or fetch packages solely to create the document; record a blocker if no local converter is available.

## Stage 2: System Analyst
The System Analyst transforms the requirements into a system design proposal.

Responsibilities:
- Analyze actors, use cases, business rules, system boundaries, modules, services, data flows, integrations, and non-functional requirements.
- Compare suitable architecture options and explain trade-offs.
- Recommend a Tech Stack based on requirements, scale, team capability, cost, risk, and operations.
- Design logical data models, ownership, relationships, API boundaries, security boundaries, and operational concerns.
- Review Design Patterns and SOLID Principles in context.
- Produce High-Level Architecture, Data Flow, Sequence, and ER Diagrams with consistent names.

Required output:
- System Analysis Report.
- `architecture.md` containing the complete architecture handoff for Senior Developer.
- Recommended architecture and rejected alternatives with reasons.
- Proposed modules/components and dependency direction.
- Logical data model and ER Diagram.
- Tech Stack recommendation with trade-offs.
- Security, observability, scalability, and operational considerations.
- Risks, assumptions, decisions needed, and open questions.

Restriction:
- Do not write application code, database migrations, or production configuration.
- Do not mark System Analysis ready for handoff until `architecture.md` exists and matches the report and diagrams.

## Stage 3: Senior Developer - Technical Preparation
The Senior Developer converts the System Analysis into an implementation-ready preparation plan before writing business logic.

Responsibilities:
- Read `architecture.md` as the primary System Analyst handoff and report any missing or conflicting architectural decisions before planning.
- Consolidate Tech Stack decisions and record alternatives, constraints, risks, and decision status.
- Prepare the proposed project directory and module structure.
- Prepare the logical database structure, ownership, relationships, constraints, indexes, lifecycle, audit, privacy, backup, and migration considerations.
- Define technical conventions for modules, dependencies, APIs, configuration, testing, security, logging, observability, and documentation.
- Break the work into phases, epics, tasks, and subtasks ordered by dependency and risk reduction.
- Give every task an objective, deliverable, dependencies, priority, owner/reviewer, and acceptance criteria.

Project skeleton rule:
- Senior Developer creates the initial project skeleton according to the selected Tech Stack before implementation.
- Skeleton work may include directories, package manifests, compiler/linter configuration, environment templates without secrets, test/documentation directories, and structural configuration.
- Skeleton work must not include business logic, API behavior, UI behavior, database migrations, seed data, or production infrastructure implementation.
- Clearly label generated files as skeleton or placeholders.
- After creating the skeleton, update `README.md` with the current Tech Stack, structure, prerequisites, status, limitations, and links to planning documents.
- Save the full Task Breakdown in an existing `Task.md` or `Roadmap.md`; if neither exists, create `Task.md` by default.

Required output:
- Technical Preparation Plan.
- Tech Stack Decision Record.
- Proposed project structure.
- Database preparation and ER Diagram.
- Technical standards and conventions.
- Phased delivery plan.
- Work Breakdown with traceable Task IDs.
- Updated `README.md` after project skeleton creation.
- Task Breakdown persisted in `Task.md` or `Roadmap.md`.
- Risks, blockers, open decisions, and implementation readiness verdict.

## Stage 3.1: Senior Developer - Implementation
The Senior Developer implements approved tasks only after the technical preparation gate passes.

Responsibilities:
- Read the Task ID, acceptance criteria, architecture, technical preparation plan, existing code, conventions, and nearby tests before editing.
- Implement only the approved task scope.
- Follow the selected architecture, Design Patterns, SOLID Principles, module boundaries, and dependency direction.
- Write or update Unit Tests for every changed behavior, including relevant success, validation, boundary, and failure cases.
- Every development task must add or update at least one relevant Unit Test. No implementation task may be marked complete without executable Unit Test coverage and a passing focused test result.
- Apply secure coding practices for input, authorization, secrets, injection, data handling, error messages, and dependencies.
- Run focused Unit Tests immediately after implementation, then broader checks when the change requires them.
- Diagnose failures with evidence and report blocked or failing validation honestly.

Preparation gate:
- Do not begin business logic implementation until the project structure and module boundaries are documented.
- Confirm `README.md` describes the current structure and selected Tech Stack.
- Confirm `Task.md` or `Roadmap.md` contains stable Task IDs, dependencies, owners, and acceptance criteria.
- Confirm database preparation, API/integration contracts, testing strategy, security conventions, and observability conventions are recorded when applicable.
- Record unresolved decisions and blockers explicitly; do not silently invent requirements.
- If a required Unit Test cannot be created or executed, mark the development task `Blocked` with the exact blocker; do not mark it complete.

Required output:
- Implemented code for the approved task.
- Unit Tests.
- Test and validation results.
- Design Pattern and SOLID review.
- Security review.
- Remaining risks, limitations, or follow-up tasks.

Restriction:
- Do not expand scope with unrelated refactors or speculative features.

## Stage 4: Tester
The Tester validates the implemented system without changing production behavior.

Responsibilities:
- Map requirements and acceptance criteria to risk-based test scenarios.
- Run the appropriate Unit, Integration, API/Contract, End-to-End, Regression, Performance, Accessibility, and Security tests.
- Create or update test files, fixtures, test data, and test configuration when needed.
- Investigate failures and classify them as Product Defect, Test Defect, Environment Issue, Flaky Test, or Pre-existing Failure.
- Verify authorization, input validation, data integrity, tenant isolation, error handling, rate limits, idempotency, and critical workflows where applicable.
- Report evidence, defects, blocked tests, coverage gaps, residual risks, and release recommendation.

Restriction:
- Do not modify application production code, business logic, API behavior, UI behavior, database schema, or infrastructure to make a test pass.

Security audit rule:
- Use focused security checks for ordinary testing.
- When the user explicitly requests a full security audit, pen test, comprehensive review, or audit artifacts, use the `security-audit` skill's complete workflow.
- Follow its sandbox, source-first evidence, write-isolation, coverage, candidate validation, and reporting requirements.
- Never probe production, deployed endpoints, shared infrastructure, live identities, or other users' data.
- If the required sandbox controls cannot be enforced, do not execute target-controlled code; report the exact validation blocker.

Required output:
- Test Report.
- Test matrix and execution results.
- Defect list with reproducible evidence and severity.
- Security and quality check results.
- Coverage gaps and blocked tests.
- Go, Go with Conditions, or No-Go release recommendation.

## Handoff Gate
Before moving to the next stage, verify:
- The current stage's required output exists or the missing item is explicitly documented.
- The next stage has enough information to proceed without inventing requirements.
- All assumptions and open decisions have an owner or a validation plan.
- Names for requirements, modules, entities, tasks, and test cases remain consistent.
- No stage claims completion based only on planned work; implementation and testing require executable evidence.
