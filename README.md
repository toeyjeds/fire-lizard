# AI Hackathon Demo

A lightweight full-stack AI demo app built with Next.js, FastAPI, PostgreSQL, Redis, and a mock LLM provider. The app is designed to be easy to run with Podman and straightforward to extend for hackathon demos or future AI integrations.

## Project Overview

The app includes:

- A Next.js frontend for a simple chat experience
- A FastAPI backend with a health check and AI chat endpoint
- PostgreSQL as the primary data store
- Redis for temporary/shared state
- A pluggable AI provider abstraction with a mock provider for offline development

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
                    │      FastAPI        │
                    │      Backend        │
                    │       :8000         │
                    └──────┬───────┬──────┘
                           │       │
                  ┌────────▼──┐ ┌──▼────────┐
                  │ PostgreSQL│ │   Redis   │
                  │   :5432   │ │   :6379   │
                  └───────────┘ └───────────┘
                           │
                           ▼
                    ┌─────────────────────┐
                    │     AI / LLM API    │
                    │   External Provider  │
                    └─────────────────────┘
```

## Tech Stack

- Next.js
- TypeScript
- FastAPI
- Python
- PostgreSQL
- Redis
- Podman
- LLM API abstraction

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
- Backend: http://localhost:8000
- Swagger: http://localhost:8000/docs

## Stop

```bash
podman compose down
```

## Testing

Run the backend test suite with:

```bash
cd backend
python -m pytest
```
