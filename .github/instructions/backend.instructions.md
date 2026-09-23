---
applyTo: "backend/**/*.py"
---

# Backend Development Standards

## Technology

Use:

- Python 3.12+
- FastAPI
- Pydantic
- SQLAlchemy
- PostgreSQL
- Redis
- Pytest

## Project Architecture

Follow:

API
→ Service
→ Repository
→ Database

AI:

API
→ Service
→ AIService
→ LLMProvider

## FastAPI

Routes should be thin.

Good:

```python
@router.post("/chat")
async def chat(request: ChatRequest):
    return await chat_service.process(request)