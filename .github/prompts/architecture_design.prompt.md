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
5. Backend Architecture
6. API Design
7. Database Design
8. Redis Usage
9. AI / LLM Architecture
10. External Integrations
11. Security Considerations
12. Error Handling Strategy
13. Container Architecture
14. Environment Configuration
15. Project Structure
16. Technical Decisions and Rationale
17. Risks and Trade-offs
18. Implementation Order

## Required Architecture

Use the existing project architecture unless the requirement explicitly requires a change:

```text
Next.js Frontend
        |
        | REST API
        v
FastAPI Backend
   |         |         |
   v         v         v
PostgreSQL  Redis   AI Provider
                       |
                 OpenAI / Mock
```

Backend dependency flow:

```text
API -> Service -> Repository -> Database
API -> Service -> AI Service -> LLM Provider -> External AI API
```

## Rules

- Prefer a modular monolith for Hackathon scope.
- Do not introduce unnecessary microservices.
- Respect existing coding standards and architecture.
- Every API must identify request, response, validation, and error behavior.
- Every persistent entity should identify its key fields and relationships.
- Clearly label assumptions and unresolved decisions.

Save the result as architecture documentation when a suitable documentation location exists.
