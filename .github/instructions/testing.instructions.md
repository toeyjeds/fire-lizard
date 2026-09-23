
---

# 4. `testing.instructions.md`

อันนี้สำคัญ เพราะจะควบคุม Tester Agent และ Developer Agent เวลาทำ test

```md
---
applyTo: "**/*.{py,ts,tsx}"
---

# Testing Standards

## General

Every significant feature should have tests.

Tests must verify behavior, not implementation details.

Prioritize:

1. Business logic
2. API behavior
3. Validation
4. Error handling
5. Integration between components

## Backend Testing

Use:

- Pytest
- FastAPI TestClient

Test:

- Health endpoint
- API validation
- Service layer
- Repository behavior
- AI provider
- Error handling

Example:

```text
tests/
├── test_health.py
├── test_chat_api.py
├── test_chat_service.py
└── test_ai_provider.py