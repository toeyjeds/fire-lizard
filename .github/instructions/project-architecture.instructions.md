---
applyTo: "**"
description: Project architecture rules for the AI Hackathon application
---
# Project Architecture Instructions

> **CDS** stands for **Cash Delivery Service**. The two backend services (`cds-gateway-service`, `cds-orch-service`) together implement the Cash Delivery Service domain.

## Objective

Build a maintainable, production-ready application composed of two independently deployable Java Spring Boot services (gateway, orchestration) plus a Next.js frontend.

Prioritize:

- Clear separation of concerns (gateway / orchestration)
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

There are six primary services:

- frontend
- cds-gateway-service
- cds-orch-service
- sqlserver
- smtp (local dev relay, e.g. MailHog)

Azure AAD (Entra ID) is an external identity provider, not a containerized service.

Do not introduce microservices beyond these two backend services without justification.

---

# Service Responsibilities

## cds-gateway-service

- Single entry point for all frontend requests.
- Applies rate limiting per client/route.
- Handles authentication/authorization at the edge.
- Maps and transforms request/response fields for frontend consumption.
- Masks sensitive fields before returning data to the frontend.
- Validates input and output payloads.
- Routes requests to `cds-orch-service`.
- Must never contain business logic and must never access the database directly.

## cds-orch-service

- Owns business logic and orchestration.
- Coordinates domain services and external APIs.
- Authenticates against Azure AAD (Entra ID) via OAuth2/OIDC for secured integrations.
- The only service allowed to access SQL Server and the SMTP relay.
- Exposes internal APIs consumed by `cds-gateway-service`.

---

# Layered Architecture

Each backend service must follow this dependency flow internally.

```text
Controller
 ↓
Service
 ↓
Repository   (cds-orch-service only)
 ↓
Database
```

Rules:

- Controllers must never contain business logic.
- Services contain business rules.
- Repositories only access data and exist only in `cds-orch-service`.

---

# Backend Structure

Use this folder structure for each Java service.

```text
<service-name>/src/main/java/.../
├── api/            (controllers)
├── config/
├── dto/
├── service/
├── repository/     (cds-orch-service only)
├── model/          (cds-orch-service only)
└── mapper/         (cds-gateway-service only)
```

Responsibilities:

| Folder | Responsibility |
|---------|----------------|
| api | HTTP endpoints |
| dto | Request/Response models |
| service | Business logic |
| repository | Database access (`cds-orch-service` only) |
| mapper | Field mapping & masking (`cds-gateway-service` only) |
| config | Framework & security configuration |

Never mix responsibilities across services (e.g. do not add a repository to `cds-gateway-service`).

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

# Database Rules

Primary database:

- SQL Server (Microsoft JDBC Driver, Hibernate `SQLServerDialect`)

Rules:

- Only `cds-orch-service` may connect to SQL Server.
- Use Spring Data JPA
- Repository handles persistence
- Service handles business rules
- Never create SQL inside controllers

Do not add Redis dependencies, configuration, or network connections. Gateway rate limiting must use an in-memory mechanism.

---

# Email / SMTP Rules

- Only `cds-orch-service` may send email; other services must never connect to SMTP directly.
- Send email through a `NotificationService` abstraction backed by Spring Boot's `JavaMailSender`, not inline in controllers or repositories.
- Externalize SMTP host, port, credentials, and sender address via environment variables.
- Never log SMTP credentials or full email bodies containing sensitive data.
- Use a fake/local SMTP relay (e.g. MailHog) for local development and automated tests; never send real email during tests.

---

# Authentication / Azure AAD Rules

- Only `cds-orch-service` may authenticate directly against Azure AAD (Entra ID); other services must not hold AAD credentials.
- Use OAuth2 client credentials flow (Spring Security `oauth2Client` / MSAL4J) for service-to-service calls that require an Azure AAD token.
- Validate inbound tokens using Spring Security's OAuth2 resource server support against the tenant's JWKS endpoint.
- Externalize tenant ID, client ID, client secret, and authority URL via environment variables. Never hard-code them.
- Never log access tokens, refresh tokens, or client secrets.
- Use a test double or mocked token provider for automated tests; never call the real Azure AAD tenant during tests.

---

# API Standards

Base path per service:

```text
/api/v1
```

Required endpoints (both services):

```text
GET  /health
```

Business endpoint example (owned by `cds-orch-service`, exposed to the frontend through `cds-gateway-service`):

```text
POST /api/v1/orders
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

Keep response formats consistent across both services.

---

# Environment Configuration

Never hard-code configuration.

Required variables:

```env
SQLSERVER_DB=
SQLSERVER_USER=
SQLSERVER_PASSWORD=
SQLSERVER_HOST=
SQLSERVER_PORT=

SMTP_HOST=
SMTP_PORT=
SMTP_USERNAME=
SMTP_PASSWORD=
SMTP_FROM_ADDRESS=

AZURE_AAD_TENANT_ID=
AZURE_AAD_CLIENT_ID=
AZURE_AAD_CLIENT_SECRET=
AZURE_AAD_AUTHORITY=

GATEWAY_RATE_LIMIT_PER_SECOND=
ORCH_SERVICE_URL=

NEXT_PUBLIC_API_URL=
```

Only frontend variables may use `NEXT_PUBLIC_`.

---

# Container Architecture

All services communicate through Podman Compose.

Use service names instead of localhost.

Correct:

```text
sqlserver:1433
cds-gateway-service:8080
cds-orch-service:8082
```

Incorrect:

```text
localhost:1433
```

Use one shared network.

Persist SQL Server using a named volume.

---

# Dependency Rules

Allowed dependency direction:

```text
Frontend
    │
    ▼
cds-gateway-service
    │
    ▼
cds-orch-service
    │
    ▼
Repository
    │
    ▼
Database
```

Forbidden:

- `cds-gateway-service` accessing the database directly.
- `cds-gateway-service` containing business logic.
- Repository calling Service.
- Database calling API.
- Components accessing Database.
- Routes accessing Database directly.

---

# Error Handling

Centralize exception handling per service.

Requirements:

- Validation errors
- Business errors
- Database errors
- Email/SMTP delivery errors
- Azure AAD authentication errors
- Rate limit exceeded errors (`cds-gateway-service`)

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
- Database failures
- Email/SMTP delivery failures
- Rate limit rejections (`cds-gateway-service`)

Do not log:

- Secrets
- Tokens
- Passwords
- Personal sensitive data (mask before logging)

---

# Testing Architecture

Tests mirror each service's structure.

```text
<service-name>/src/test/java/.../
├── api/
├── service/
└── repository/     (cds-orch-service only)
```

Tests must not require any external service credentials.

---

# Definition of Done

A feature is complete only when:

- [ ] Architecture follows this document.
- [ ] Business logic is inside Services (`cds-orch-service`).
- [ ] Database access is inside Repositories (`cds-orch-service` only).
- [ ] Field mapping, masking, and validation live in `cds-gateway-service`.
- [ ] Rate limiting is enforced in `cds-gateway-service`.
- [ ] Frontend uses Service layer for API calls.
- [ ] Environment variables are externalized.
- [ ] Podman Compose builds successfully.
- [ ] All containers start successfully.
- [ ] Health endpoint returns UP for both services.
- [ ] Swagger is accessible.
- [ ] Tests pass.
