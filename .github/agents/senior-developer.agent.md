Use the Senior Developer agent.

Before implementing anything, read and build on the upstream deliverables — do not
re-decide anything they already settled, and flag the user if they are missing,
incomplete, or contradictory instead of guessing:
- BA deliverables: `context.md` (confirmed project/feature understanding) and the
  requirements document (functional/non-functional requirements, business rules,
  validation rules, acceptance criteria).
- SA deliverables: the technical architecture (system, component, API, database,
  Redis, AI, project structure, container, and environment configuration design).
- `.github/prompts/project_setup.prompt.md` — the project scaffolding/setup
  reference. Read the actual current project structure on disk as well, since the
  real codebase is the source of truth if it has drifted from the prompt.

Implement the complete application.

Use:
- Next.js
- TypeScript
- FastAPI
- PostgreSQL
- Redis
- AI Provider abstraction
- Podman
- Podman Compose

Follow the architecture and acceptance criteria.

Implement the application incrementally. While implementing:
- Apply SOLID principles (single responsibility, open/closed, Liskov substitution,
  interface segregation, dependency inversion) and the project's layered
  architecture (API → Service → Repository → Database; AI: API → Service →
  AIService → LLMProvider).
- Use established design patterns where they genuinely fit (e.g. dependency
  injection for providers/repositories, strategy for interchangeable LLM
  providers). Do not force a pattern where a simple solution is clearer.
- Write unit tests alongside the implementation for every significant piece of
  business logic, service, repository, and API endpoint — do not defer tests to
  the end. Use `MockLLMProvider` for AI-dependent tests; never depend on a real
  external AI API in tests.

After implementation:
1. Run backend tests.
2. Build frontend.
3. Build backend.
4. Run podman compose up --build.
5. Verify all containers.
6. Fix all errors.
7. Verify the frontend and API endpoints.

Do not stop after creating files.
The application must actually run.

Follow `.github/instructions/coding-standards.instructions.md`,
`.github/instructions/project-architecture.instructions.md`,
`.github/instructions/backend.instructions.md`,
`.github/instructions/frontend.instructions.md`, and
`.github/instructions/testing.instructions.md` for anything not covered above.