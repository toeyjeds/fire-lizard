# AI Hackathon Full-Stack Project Generation Prompt

## Role

You are a senior full-stack software engineer and solution architect.

Build a production-ready but lightweight **AI Hackathon Demo Application** using the architecture, technology stack, coding standards, and project structure defined below.

The application must be easy to:

* Develop locally
* Run with Podman
* Demo during an AI Hackathon
* Deploy to another machine
* Extend with additional AI capabilities

Prioritize simplicity, maintainability, clean architecture, and fast development.

---

# 1. Technology Stack

## Frontend

* Next.js
* TypeScript
* React
* App Router
* ESLint
* Modern responsive UI
* REST API integration

## Backend

* Python
* FastAPI
* Pydantic
* SQLAlchemy
* PostgreSQL
* Redis
* HTTP client for third-party APIs
* Environment-based configuration

## AI

The application must support integration with an external LLM API.

Design the AI layer so that the provider can be replaced without modifying the business logic.

Example:

```text
AIService
    ↓
LLMProvider
    ├── OpenAIProvider
    ├── MockLLMProvider
    └── FutureProvider
```

The API key must NEVER be hard-coded.

Use:

```text
OPENAI_API_KEY
```

from environment variables.

---

# 2. Architecture

Use the following architecture:

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

The application consists of four primary containers:

```text
frontend
backend
postgres
redis
```

Do not create unnecessary microservices.

Keep the architecture simple enough for a Hackathon demo.

---

# 3. Project Structure

Create the following structure:

```text
ai-hackathon/
│
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   ├── services/
│   ├── hooks/
│   ├── types/
│   ├── public/
│   │
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   └── .env.example
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   │
│   │   ├── api/
│   │   │   └── routes/
│   │   │
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── logging.py
│   │   │
│   │   ├── models/
│   │   │
│   │   ├── schemas/
│   │   │
│   │   ├── repositories/
│   │   │
│   │   ├── services/
│   │   │
│   │   ├── ai/
│   │   │   ├── base.py
│   │   │   ├── service.py
│   │   │   └── providers/
│   │   │       ├── openai.py
│   │   │       └── mock.py
│   │   │
│   │   └── db/
│   │       ├── database.py
│   │       └── redis.py
│   │
│   ├── tests/
│   │
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .env.example
│
├── docker-compose.yml
├── .env.example
├── .gitignore
├── README.md
└── Makefile
```

---

# 4. Backend Architecture

Follow this dependency direction:

```text
API
 ↓
Service
 ↓
Repository
 ↓
Database
```

AI-related functionality:

```text
API
 ↓
Service
 ↓
AIService
 ↓
LLMProvider
 ↓
External AI API
```

Do not put business logic directly inside FastAPI route handlers.

Bad:

```python
@router.post("/ask")
def ask(request):
    # business logic
    # database logic
    # AI logic
```

Good:

```python
@router.post("/ask")
def ask(request):
    return service.process(request)
```

---

# 5. FastAPI Requirements

Create:

```text
GET /api/v1/health
```

Response:

```json
{
  "status": "UP"
}
```

Create an example AI endpoint:

```text
POST /api/v1/ai/chat
```

Request:

```json
{
  "message": "Hello AI"
}
```

Response:

```json
{
  "message": "Hello! How can I help you?"
}
```

The endpoint must use the AI service abstraction.

---

# 6. AI Provider Abstraction

Create an interface/abstract class:

```python
class LLMProvider:
    async def generate(self, prompt: str) -> str:
        raise NotImplementedError
```

Implement:

```text
OpenAIProvider
MockLLMProvider
```

The application should be able to switch between providers using configuration.

Example:

```text
AI_PROVIDER=openai
```

or:

```text
AI_PROVIDER=mock
```

The mock provider is required so that the application can run without an API key during development/demo preparation.

---

# 7. PostgreSQL

Use PostgreSQL as the primary relational database.

Configuration:

```text
POSTGRES_DB=ai_app
POSTGRES_USER=hackathon
POSTGRES_PASSWORD=password
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
```

Use SQLAlchemy for database access.

Do not use raw SQL unless necessary.

Create database connection management separately from business logic.

---

# 8. Redis

Use Redis for:

* Caching
* Temporary data
* Session-related data
* Rate limiting if needed

Configuration:

```text
REDIS_HOST=redis
REDIS_PORT=6379
```

Create a reusable Redis client/service.

Do not connect to Redis directly from API routes.

---

# 9. Frontend Requirements

Use Next.js App Router.

Create:

```text
/
```

as the main demo page.

The page should contain:

```text
AI Hackathon Demo
        ↓
Input message
        ↓
Send button
        ↓
Loading state
        ↓
AI response
```

Create reusable components.

Example:

```text
components/
├── ChatInput.tsx
├── ChatMessage.tsx
├── ChatWindow.tsx
└── Loading.tsx
```

API calls must be separated from UI components.

Example:

```text
services/
└── api.ts
```

Do not place `fetch()` calls directly throughout React components.

---

# 10. Environment Variables

Never hard-code:

* API keys
* Database passwords
* Redis configuration
* External service URLs

Use `.env`.

Provide:

```text
.env.example
```

Example:

```env
OPENAI_API_KEY=

AI_PROVIDER=mock

POSTGRES_DB=ai_app
POSTGRES_USER=hackathon
POSTGRES_PASSWORD=password
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

REDIS_HOST=redis
REDIS_PORT=6379

NEXT_PUBLIC_API_URL=http://localhost:8000
```

Do not commit `.env`.

---

# 11. Backend Dockerfile

Create a production-oriented but simple Dockerfile.

Requirements:

* Python 3.12+
* Small base image
* Non-root user if practical
* Install dependencies efficiently
* Expose port 8000
* Run FastAPI with Uvicorn

Example runtime command:

```text
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

---

# 12. Frontend Dockerfile

Use a multi-stage build.

Requirements:

* Node.js 22+
* Install dependencies
* Build Next.js
* Run production server
* Expose port 3000

Use:

```text
npm run build
npm start
```

---

# 13. Podman Compose

Create:

```text
docker-compose.yml
```

The file must work with:

```bash
podman compose up --build
```

Services:

```text
frontend
backend
postgres
redis
```

Port mapping:

```text
frontend → 3000
backend  → 8000
postgres → 5432
redis    → 6379
```

Use a named PostgreSQL volume:

```text
postgres_data
```

All services should communicate using service names.

For example:

```text
postgres:5432
redis:6379
backend:8000
```

Do NOT use `localhost` for container-to-container communication.

---

# 14. Health Checks

Add health checks where practical.

Backend:

```text
GET /api/v1/health
```

PostgreSQL:

```text
pg_isready
```

Redis:

```text
redis-cli ping
```

The application should start reliably even when services take a few seconds to become ready.

---

# 15. Networking

Create a shared application network.

Example:

```text
ai-network
```

All application containers must be connected to this network.

Expected communication:

```text
frontend
   ↓
backend:8000

backend
   ↓
postgres:5432

backend
   ↓
redis:6379
```

---

# 16. Makefile

Create convenient commands:

```makefile
build:
	podman compose build

up:
	podman compose up -d

down:
	podman compose down

restart:
	podman compose down
	podman compose up -d

logs:
	podman compose logs -f

logs-backend:
	podman compose logs -f backend

ps:
	podman compose ps

clean:
	podman compose down -v
```

---

# 17. Testing

Backend tests must include:

```text
tests/
├── test_health.py
├── test_ai_service.py
└── test_api.py
```

At minimum test:

1. Health endpoint
2. AI service
3. Mock AI provider
4. API validation
5. Error handling

The test suite must not require a real OpenAI API key.

---

# 18. Error Handling

Implement consistent API error responses.

Example:

```json
{
  "success": false,
  "error": {
    "code": "AI_SERVICE_ERROR",
    "message": "Unable to process AI request"
  }
}
```

Do not expose:

* API keys
* stack traces
* database credentials
* internal implementation details

to the frontend.

---

# 19. Logging

Implement structured application logging.

Log:

* Request
* Response status
* Error
* AI request failure
* Database failure

Do NOT log:

* API keys
* Passwords
* Sensitive user data
* Full authentication tokens

---

# 20. SOLID Principles

Apply SOLID principles where they provide real value.

Especially:

### Single Responsibility

Separate:

```text
API
Service
Repository
AI Provider
```

### Open/Closed

AI providers must be replaceable:

```text
LLMProvider
├── OpenAIProvider
├── MockLLMProvider
└── FutureProvider
```

### Dependency Inversion

Business logic must depend on abstractions rather than concrete implementations.

---

# 21. README

Generate a complete README containing:

## Project Overview

Explain the application.

## Architecture

Include an ASCII architecture diagram.

## Tech Stack

List:

```text
Next.js
TypeScript
FastAPI
Python
PostgreSQL
Redis
Podman
LLM API
```

## Requirements

Example:

```text
Podman
Podman Compose
Git
```

## Environment Setup

Explain:

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

```text
Frontend:
http://localhost:3000

Backend:
http://localhost:8000

Swagger:
http://localhost:8000/docs
```

## Stop

```bash
podman compose down
```

## Testing

Explain how to run backend tests.

---

# 22. Development Principles

Follow these rules:

1. Keep implementation simple.
2. Avoid unnecessary abstraction.
3. Avoid unnecessary microservices.
4. Use clear naming.
5. Use type hints.
6. Validate API input with Pydantic.
7. Keep secrets in environment variables.
8. Do not hard-code credentials.
9. Keep frontend and backend independently testable.
10. Make the entire application runnable with one command.

Primary goal:

```text
git clone
    ↓
configure .env
    ↓
podman compose up --build
    ↓
Demo ready
```

---

# 23. Final Acceptance Criteria

The implementation is complete only when all of the following work:

### Infrastructure

* [ ] Podman builds all images
* [ ] Podman Compose starts all services
* [ ] PostgreSQL starts successfully
* [ ] Redis starts successfully

### Backend

* [ ] FastAPI starts
* [ ] `/api/v1/health` works
* [ ] Swagger works
* [ ] PostgreSQL connection works
* [ ] Redis connection works
* [ ] Mock AI provider works
* [ ] AI provider abstraction exists
* [ ] Error handling works

### Frontend

* [ ] Next.js starts
* [ ] UI is accessible on port 3000
* [ ] Frontend can call backend
* [ ] AI request works
* [ ] Loading state works
* [ ] Error state works
* [ ] Responsive UI works

### Demo

The following command must be sufficient to start the application:

```bash
podman compose up --build
```

After startup:

```text
http://localhost:3000
```

must display the working AI Hackathon Demo.

---

# 24. Implementation Order

Implement in this order:

```text
1. Create project structure
        ↓
2. Create FastAPI application
        ↓
3. Create PostgreSQL connection
        ↓
4. Create Redis connection
        ↓
5. Create AI provider abstraction
        ↓
6. Create Mock AI provider
        ↓
7. Create AI API
        ↓
8. Create Next.js frontend
        ↓
9. Connect frontend → backend
        ↓
10. Create Dockerfiles
        ↓
11. Create Podman Compose
        ↓
12. Add health checks
        ↓
13. Add tests
        ↓
14. Add README
        ↓
15. Build and run the complete system
        ↓
16. Verify all acceptance criteria
```

Before finishing, actually build the containers and verify that the application can start successfully with:

```bash
podman compose up --build
```

Fix any build, networking, dependency, or runtime issues found during verification.
