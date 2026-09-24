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
4. Keep business logic in the appropriate service layer (`cds-orch-service`).
5. Keep database access in repositories (`cds-orch-service` only).
6. Keep field mapping, masking, and validation in `cds-gateway-service`.
7. Send email through the `NotificationService` abstraction backed by `JavaMailSender`; use a fake SMTP relay (e.g. MailHog) for local development and tests.
8. Keep Azure AAD integration behind Spring Security's OAuth2 client/resource-server abstractions; never call the real tenant in tests.
9. Never hard-code secrets.
10. Follow the existing project architecture.
11. Add or update tests for new behavior.
12. Update documentation when behavior or setup changes.

## Implementation Order

1. Review requirement and acceptance criteria.
2. Review architecture.
3. Implement backend models / DTOs if needed.
4. Implement repository layer if needed (`cds-orch-service`).
5. Implement services and business rules.
6. Implement API endpoints.
7. Implement or update field mapping, masking, and rate limiting (`cds-gateway-service`).
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
- Gateway: `http://localhost:8080`
- Orchestration: `http://localhost:8082`
- Swagger (orchestration): `http://localhost:8082/swagger-ui.html`
- Health endpoint works for both backend services.
- SQL Server connection works.
- Redis connection works.
- Email sends through the local SMTP relay (MailHog).

Fix build, dependency, networking, configuration, or runtime errors before considering the task complete.

## Completion Report

At the end, report:

- Files created
- Files modified
- Tests executed
- Build result
- Runtime verification result
- Remaining issues or risks
