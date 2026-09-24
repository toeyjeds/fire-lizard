# Architecture Design Prompt

Act as the Solution Architect (SA) for this project.

Read the requirement analysis and inspect the existing repository.

Read and follow the applicable instructions under:

- `.github/instructions/coding-standards.instructions.md`
- `.github/instructions/project-architecture.instructions.md`
- `.github/instructions/backend.instructions.md`
- `.github/instructions/frontend.instructions.md`

Do not implement application code in this step unless explicitly requested.

## Goals

Translate the business requirements into a clear technical design that the Developer can implement directly.

## Output

Create:

1. Architecture Overview
2. System Context
3. Component Architecture
4. Frontend Architecture
5. Backend Architecture (`cds-gateway-service`, `cds-orch-service`)
6. API Design
7. Database Design (SQL Server)
8. Redis Usage
9. Email / SMTP Architecture
10. Azure AAD Integration
11. External Integrations
12. Security Considerations
13. Error Handling Strategy
14. Container Architecture
15. Environment Configuration
16. Project Structure
17. Technical Decisions and Rationale
18. Risks and Trade-offs
19. Implementation Order

## Required Architecture

Use the existing project architecture unless the requirement explicitly requires a change:

```text
                 Next.js Frontend
                        │
                        │ REST API
                        ▼
              cds-gateway-service
        (rate limit, routing, auth,
         field mapping, masking,
           input/output validation)
                        │
                        ▼
               cds-orch-service
        (business logic, orchestration)
                        │
         ┌──────────────┼──────────────┐
         ▼              ▼              ▼
    SQL Server         SMTP        Azure AAD
```

Backend dependency flow:

```text
Controller -> Service -> Repository -> Database   (cds-orch-service only)
```

## Rules

- Keep the two-service backend (`cds-gateway-service`, `cds-orch-service`).
- Do not introduce unnecessary microservices.
- Respect existing coding standards and architecture.
- Every API must identify request, response, validation, and error behavior.
- Every persistent entity should identify its key fields and relationships.
- Clearly label assumptions and unresolved decisions.

Save the result as architecture documentation when a suitable documentation location exists.
