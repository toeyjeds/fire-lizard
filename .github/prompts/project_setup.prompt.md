# Project Setup Prompt

Act as the Senior Full-Stack Developer for this project.

Read and follow all applicable instructions under:

- `.github/instructions/coding-standards.instructions.md`
- `.github/instructions/project-architecture.instructions.md`
- `.github/instructions/backend.instructions.md`
- `.github/instructions/frontend.instructions.md`
- `.github/instructions/testing.instructions.md`

These instruction files are the single source of truth for the technology stack, architecture, folder structure, and coding standards. Do not duplicate or restate them here — follow them directly.

## Goal

Generate the initial project scaffolding for the Cash Delivery Service (CDS) application:

- `frontend/` — Next.js + TypeScript
- `cds-gateway-service/` — Java 17 / Spring Boot API gateway
- `cds-orch-service/` — Java 17 / Spring Boot orchestration service
- `docker-compose.yml` — SQL Server, Redis, SMTP relay (MailHog), both backend services, and the frontend

## Required Behavior

1. Follow the folder structure and layered architecture defined in `project-architecture.instructions.md` for each service.
2. Implement a `GET /health` endpoint for both backend services.
3. Wire `cds-gateway-service` to route to `cds-orch-service` using service names (not `localhost`) inside Podman Compose.
4. Externalize all configuration (SQL Server, Redis, SMTP, Azure AAD, rate limit) via environment variables; never hard-code secrets.
5. Add a `.env.example` with placeholder values for every required variable.
6. Add tests per service following `testing.instructions.md`.

## Verification

```bash
podman compose config
podman compose up --build
podman compose ps
```

Verify:

- Frontend: `http://localhost:3000`
- Gateway: `http://localhost:8080`
- Orchestration: `http://localhost:8082`
- Health endpoint returns UP for both backend services.
- SQL Server, Redis, and SMTP containers start successfully.

Fix any build, networking, dependency, or runtime issues found during verification before considering the task complete.

## Completion Report

At the end, report:

- Files created
- Files modified
- Build result
- Runtime verification result
- Remaining issues or risks

