# Lumen: AI Hackathon Demo

Lumen is a lightweight AI workspace for turning an unfinished thought into a clear next step. It demonstrates a Next.js frontend, a FastAPI backend, a replaceable LLM provider, PostgreSQL, and Redis in a small modular monolith.

## Architecture

```text
+------------------+       REST        +------------------+
| Next.js :3000    | ----------------> | FastAPI :8000    |
| chat workspace   |                   | API + AI service |
+------------------+                   +--------+---------+
                                               |
                         +---------------------+---------------------+
                         |                                           |
                  +------v------+                             +------v------+
                  | PostgreSQL  |                             | Redis        |
                  | :5432       |                             | :6379        |
                  +-------------+                             +-------------+
                                               |
                                      +--------v---------+
                                      | Mock LLM         |
                                      | provider         |
                                      +------------------+
```

## Tech Stack

- Next.js, React, TypeScript, App Router
- FastAPI, Pydantic, SQLAlchemy, Python 3.12
- PostgreSQL and Redis
- Podman Compose
- Mock LLM provider (no external API required)

## Requirements

- Podman
- Podman Compose
- Git

## Environment Setup

```bash
cp .env.example .env
```

The application always uses the built-in mock LLM provider and runs fully offline without any API key.

## Run

```bash
podman compose up --build
```

The demo is available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- Swagger: http://localhost:8000/docs
- Health: http://localhost:8000/api/v1/health

## Useful Commands

```bash
podman compose ps
podman compose logs -f
podman compose down
```

Or use the included Makefile:

```bash
make build
make up
make logs
make down
```

## Testing

Run backend tests locally after installing the dependencies:

```bash
cd backend
python -m pip install -r requirements.txt
python -m pytest
```

Tests use the mock provider and never require an external LLM API key.

## Project Layout

```text
frontend/       Next.js UI, components, API client, shared types
backend/app/    FastAPI routes, services, providers, database clients
backend/tests/  API and provider tests
docker-compose.yml
```
