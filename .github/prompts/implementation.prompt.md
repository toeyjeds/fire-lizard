# Implementation Prompt

Act as the Senior Full-Stack Developer for this project.

Read the requirement analysis and architecture documentation before writing code.

Read and follow all applicable instructions under:

- `.github/instructions/coding-standards.instructions.md`
- `.github/instructions/project-architecture.instructions.md`
- `.github/instructions/backend.instructions.md`
- `.github/instructions/frontend.instructions.md`
- `.github/instructions/testing.instructions.md`

## Goal

Implement the approved requirement and architecture end-to-end.

## Required Behavior

1. Inspect the existing repository before modifying it.
2. Reuse existing code when it is correct and maintainable.
3. Do not rewrite unrelated working code.
4. Keep business logic in the appropriate service layer.
5. Keep database access in repositories.
6. Keep external AI integrations behind the `LLMProvider` abstraction.
7. Use `MockLLMProvider` for development and automated tests.
8. Never hard-code secrets.
9. Follow the existing project architecture.
10. Add or update tests for new behavior.
11. Update documentation when behavior or setup changes.

## Implementation Order

1. Review requirement and acceptance criteria.
2. Review architecture.
3. Implement backend models / schemas if needed.
4. Implement repository layer if needed.
5. Implement services and business rules.
6. Implement API endpoints.
7. Implement or update AI provider integration.
8. Implement frontend components and pages.
9. Connect frontend to backend through the service layer.
10. Add tests.
11. Update environment examples.
12. Build and run the complete stack.

## Verification

Run the relevant checks, then run:

```bash
podman compose config
podman compose build
podman compose up -d
podman compose ps
```

Verify:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`
- Swagger: `http://localhost:8000/docs`
- Health endpoint works.
- PostgreSQL connection works.
- Redis connection works.
- AI mock mode works.

Fix build, dependency, networking, configuration, or runtime errors before considering the task complete.

## Completion Report

At the end, report:

- Files created
- Files modified
- Tests executed
- Build result
- Runtime verification result
- Remaining issues or risks
