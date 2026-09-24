---
applyTo: "**"
description: Project architecture rules for the AI Hackathon application
---

# Project Architecture Instructions

## Objective

Build a maintainable, production-ready AI Hackathon application using a modular monolithic architecture.

Prioritize:

- Simplicity
- Scalability
- Clean Architecture
- SOLID principles
- Podman compatibility

The application must be runnable with a single command:

```bash
podman compose up --build
```

---

# System Architecture

Always follow this architecture.

```text
                 Next.js Frontend
                        │
                        │ REST API
                        ▼
                FastAPI Backend
                        │
          ┌─────────────┼─────────────┐
          │             │             │
          ▼             ▼             ▼
     PostgreSQL      Redis      AI Provider
                                      │
                                      ▼
                                Mock LLM
```

There are only four primary services:

- frontend
- backend
- postgres
- redis

Do not introduce unnecessary microservices.

---

# Layered Architecture

The backend must always follow this dependency flow.

```text
API
 ↓
Service
 ↓
Repository
 ↓
Database
```

For AI features:

```text
API
 ↓
Service
 ↓
AI Service
 ↓
LLM Provider
 ↓
External AI API
```

Rules:

- Routes must never contain business logic.
- Services contain business rules.
- Repositories only access data.
- Providers communicate with external AI services.

---

# Backend Structure

Use this folder structure.

```text
backend/app/
├── api/
├── core/
├── db/
├── models/
├── schemas/
├── repositories/
├── services/
└── ai/
```

Responsibilities:

| Folder | Responsibility |
|---------|----------------|
| api | HTTP endpoints |
| schemas | Request/Response models |
| services | Business logic |
| repositories | Database access |
| db | Database & Redis connection |
| ai | AI abstraction layer |
| core | Config & logging |

Never mix responsibilities.

---

# Frontend Structure

```text
frontend/
├── app/
├── components/
├── services/
├── hooks/
├── types/
└── public/
```

Rules:

- UI lives in `components`
- API calls live in `services`
- Shared types live in `types`
- Hooks contain reusable client logic

Do not call `fetch()` directly inside large UI components.

---

# AI Provider Pattern

Always use provider abstraction.

```text
LLMProvider
├── MockLLMProvider
```

The Service layer depends only on `LLMProvider`.

Never couple business logic directly to a concrete external SDK.

The mock provider is the only supported provider and allows the application to run fully offline without any API key.

---

# Database Rules

Primary database:

- PostgreSQL

Cache:

- Redis

Rules:

- Use SQLAlchemy ORM
- Repository handles persistence
- Service handles business rules
- Never create SQL inside route handlers

Redis usage:

- Cache
- Temporary state
- Session-like data
- Rate limiting

Do not use Redis as the primary database.

---

# API Standards

Base path:

```text
/api/v1
```

Required endpoints:

```text
GET  /health
POST /ai/chat
```

Response format:

Success

```json
{
  "success": true,
  "data": {}
}
```

Error

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message"
  }
}
```

Keep response formats consistent.

---

# Environment Configuration

Never hard-code configuration.

Required variables:

```env
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_HOST=
POSTGRES_PORT=

REDIS_HOST=
REDIS_PORT=

NEXT_PUBLIC_API_URL=
```

Only frontend variables may use `NEXT_PUBLIC_`.

---

# Container Architecture

All services communicate through Podman Compose.

Use service names instead of localhost.

Correct:

```text
postgres:5432
redis:6379
backend:8000
```

Incorrect:

```text
localhost:5432
```

Use one shared network.

Persist PostgreSQL using a named volume.

---

# Dependency Rules

Allowed dependency direction:

```text
Frontend
    │
    ▼
Backend API
    │
    ▼
Service
    │
    ▼
Repository
    │
    ▼
Database
```

Forbidden:

- Repository calling Service
- Database calling API
- Components accessing Database
- Routes accessing Database directly

---

# Error Handling

Centralize exception handling.

Requirements:

- Validation errors
- Business errors
- AI provider errors
- Database errors

Never expose:

- stack traces
- API keys
- passwords
- internal implementation details

---

# Logging

Log:

- Request
- Response status
- AI failures
- Database failures

Do not log:

- Secrets
- Tokens
- Passwords
- Personal sensitive data

---

# Testing Architecture

Tests mirror the application structure.

```text
tests/
├── api/
├── services/
├── repositories/
└── ai/
```

The MockLLMProvider must be used during automated tests.

Tests must not require any external LLM API key.

---

# Definition of Done

A feature is complete only when:

- [ ] Architecture follows this document.
- [ ] Business logic is inside Services.
- [ ] Database access is inside Repositories.
- [ ] AI uses Provider abstraction.
- [ ] Frontend uses Service layer for API calls.
- [ ] Environment variables are externalized.
- [ ] Podman Compose builds successfully.
- [ ] All containers start successfully.
- [ ] Health endpoint returns UP.
- [ ] Swagger is accessible.
- [ ] Tests pass.