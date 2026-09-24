# Cash Delivery Service (CDS) Demo

> **CDS** stands for **Cash Delivery Service** — the name behind the `cds-gateway-service` and `cds-orch-service` backend services.

A lightweight full-stack demo app built with Next.js, two Java Spring Boot services (gateway, orchestration), SQL Server, and Redis. The app is designed to be easy to run with Podman and straightforward to extend for hackathon demos.

## Project Overview

The app includes:

- A Next.js frontend
- `cds-gateway-service` — Spring Boot API gateway with rate limiting, routing, field mapping, masking, and input/output validation
- `cds-orch-service` — Spring Boot orchestration service owning business logic, SQL Server access, email notifications, and Azure AAD authentication
- SQL Server as the primary data store
- Redis for temporary/shared state and rate limiting
- A local SMTP relay (MailHog) for email notifications during development
- Azure AAD (Entra ID) as the external identity provider for `cds-orch-service`

## Architecture

```text
                    ┌─────────────────────┐
                    │      Next.js        │
                    │      Frontend       │
                    │       :3000         │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │  cds-gateway-service │
                    │  (rate limit, route, │
                    │  mapping, masking)    │
                    │       :8080          │
                    └──────────┬──────────┘
                               ▼
                    ┌─────────────────────┐
                    │  cds-orch-service    │
                    │ (business logic)     │
                    │       :8082          │
                    └──────┬───────┬──────┘
                           │       │
                  ┌────────▼──┐ ┌──▼────────┐
                  │ SQL Server│ │   Redis   │
                  │   :1433   │ │   :6379   │
                  └───────────┘ └───────────┘
```

The orchestration service also sends email notifications through a local SMTP relay (MailHog at `:1025`/`:8025`) during development.

## Tech Stack

- Next.js
- TypeScript
- Java 17
- Spring Boot
- SQL Server
- Redis
- SMTP (JavaMailSender)
- Podman

## Requirements

- Podman
- Podman Compose
- Git

## Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

## Run Application

```bash
podman compose up --build
```

## Check Containers

```bash
podman ps
```

## URLs

- Frontend: http://localhost:3000
- Gateway: http://localhost:8080
- Orchestration: http://localhost:8082
- Swagger (orchestration): http://localhost:8082/swagger-ui.html

## Stop

```bash
podman compose down
```

## Testing

Run each backend service's test suite with:

```bash
cd cds-gateway-service && ./mvnw test
cd cds-orch-service && ./mvnw test
```

