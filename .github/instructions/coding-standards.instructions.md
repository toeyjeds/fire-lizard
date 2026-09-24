---
applyTo: "**"
description: General coding standards and development rules for the AI Hackathon project
---

# Coding Standards

## 1. General Principles

Write code that is:

- Clean
- Readable
- Maintainable
- Testable
- Consistent
- Simple
- Secure

Prioritize readability over clever implementations.

Prefer simple solutions over unnecessary abstraction.

Do not introduce libraries, frameworks, patterns, or infrastructure unless they provide clear value.

---

# 2. SOLID Principles

Follow SOLID principles where appropriate.

## Single Responsibility Principle

Each class, function, module, and component should have one clear responsibility.

Avoid large classes or functions that handle multiple concerns.

Bad:

```text
Controller
 ├── Validate request
 ├── Business logic
 ├── Database query
 ├── Redis operation
 └── AI API call
```

Good:

```text
Controller
    ↓
Service
    ↓
Repository / AI Provider
```

---

## Open/Closed Principle

Design components so new behavior can be added without modifying existing business logic when practical.

Example:

```text
LLMProvider
├── MockLLMProvider
└── FutureProvider
```

---

## Liskov Substitution Principle

Implementations of an abstraction must be safely replaceable without breaking the expected behavior.

Example:

```text
LLMProvider
    ↓
MockLLMProvider
```

All providers should follow the same contract.

---

## Interface Segregation Principle

Prefer small focused interfaces over large interfaces.

Avoid interfaces containing unrelated functionality.

---

## Dependency Inversion Principle

High-level business logic should depend on abstractions rather than concrete implementations.

Example:

```text
Service
  ↓
LLMProvider
  ↓
MockLLMProvider
```

Do not make business logic directly depend on a concrete external SDK.

---

# 3. DRY

Avoid unnecessary duplication.

If the same business logic appears in multiple places, extract it into a reusable function, service, or utility.

However, do not over-abstract code merely because two pieces of code look similar.

Prefer meaningful reuse over forced reuse.

---

# 4. KISS

Keep implementations simple.

Avoid:

- Unnecessary design patterns
- Over-engineering
- Excessive abstraction
- Complex inheritance
- Unnecessary configuration
- Premature optimization

For Hackathon development, prefer the simplest implementation that satisfies the requirement.

---

# 5. Naming

Use meaningful and descriptive names.

Good:

```text
getUserProfile()
createChatSession()
validateChatRequest()
MockLLMProvider
ChatService
UserRepository
```

Bad:

```text
doStuff()
process()
handle()
data()
obj()
temp()
```

Avoid unclear abbreviations.

Prefer:

```text
customerRepository
```

over:

```text
custRepo
```

unless the abbreviation is an established project convention.

---

# 6. Functions and Methods

Functions should have one clear purpose.

Avoid very large functions.

Prefer:

```text
validateRequest()
loadUser()
generateResponse()
saveConversation()
```

over one function that performs all operations.

Avoid excessive nesting.

Prefer early returns when they improve readability.

---

# 7. Constants

Do not use magic numbers or magic strings.

Bad:

```python
if retry_count > 3:
```

Prefer:

```python
MAX_RETRY_COUNT = 3

if retry_count > MAX_RETRY_COUNT:
```

Centralize configuration values when appropriate.

---

# 8. Comments

Write comments only when they provide useful context.

Good comments explain:

- Why something is implemented a certain way
- Business rules
- Technical limitations
- Non-obvious behavior

Avoid comments that simply repeat the code.

Bad:

```python
# Increment counter
counter += 1
```

Good:

```python
# External AI provider allows a maximum of three retries.
retry_count += 1
```

Do not leave unnecessary commented-out code.

---

# 9. Error Handling

Handle errors explicitly.

Do not silently ignore exceptions.

Bad:

```python
try:
    process()
except Exception:
    pass
```

Prefer:

```python
try:
    process()
except ExternalServiceError as error:
    logger.error("External service failed", exc_info=error)
    raise
```

Use meaningful error types.

Do not expose internal implementation details to API clients.

Never expose:

- Stack traces
- Database credentials
- API keys
- Internal paths
- Infrastructure details

---

# 10. Logging

Use the project's logging mechanism.

Log important events such as:

- Request failures
- External API failures
- Database failures
- Unexpected application errors
- Important business events

Never log:

- Passwords
- API keys
- Access tokens
- Refresh tokens
- Database credentials
- Sensitive personal information

Avoid excessive debug logging in production code.

---

# 11. Security

Never hard-code secrets.

Never put secrets directly into source code.

Bad:

```python
DATABASE_PASSWORD = "hardcoded-secret"
```

Good:

```python
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")
```

Use environment variables or a secure secret-management mechanism.

Never commit:

```text
.env
```

to Git.

Maintain:

```text
.env.example
```

with placeholder values.

---

# 12. Configuration

Separate configuration from business logic.

Configuration should come from:

- Environment variables
- Configuration files
- Runtime configuration

Do not hard-code:

- URLs
- Ports
- API keys
- Database credentials
- Environment-specific values

---

# 13. API Design

API endpoints must have:

- Clear naming
- Consistent HTTP methods
- Request validation
- Response schemas
- Consistent error handling

Use REST conventions.

Examples:

```text
GET    /api/v1/users
GET    /api/v1/users/{id}
POST   /api/v1/users
PUT    /api/v1/users/{id}
DELETE /api/v1/users/{id}
```

Use API versioning:

```text
/api/v1
```

Do not expose internal implementation details through API naming.

---

# 14. Validation

Validate input at the system boundary.

Examples:

```text
HTTP Request
     ↓
Validation
     ↓
Service
     ↓
Business Logic
```

Do not assume that frontend validation is sufficient.

Backend must always validate external input.

---

# 15. Type Safety

Use strong typing whenever supported by the language.

For TypeScript:

Prefer:

```typescript
interface ChatRequest {
  message: string;
}
```

Avoid:

```typescript
const request: any = {};
```

For Python:

Prefer:

```python
def generate_response(message: str) -> str:
    ...
```

Use type hints consistently.

---

# 16. Null / Optional Handling

Handle nullable values explicitly.

Do not assume values are always present.

Bad:

```python
user.name.upper()
```

when `user` or `name` may be null.

Prefer explicit validation or safe handling.

---

# 17. Dependency Management

Do not add dependencies without justification.

Before adding a library:

1. Check whether the existing stack already provides the functionality.
2. Check whether the library is necessary.
3. Prefer mature and actively maintained libraries.
4. Keep dependencies minimal.

After adding a dependency:

- Update dependency files.
- Verify the application builds.
- Verify tests still pass.

---

# 18. File Organization

Keep files focused.

Avoid extremely large files.

Group files by responsibility.

Backend:

```text
api/
services/
repositories/
models/
schemas/
```

Frontend:

```text
components/
services/
hooks/
types/
```

Do not place unrelated functionality into generic files such as:

```text
utils.py
helpers.py
common.ts
```

unless the contents genuinely belong together.

---

# 19. Frontend Standards

Frontend components should:

- Have one clear responsibility
- Be reusable where appropriate
- Avoid unnecessary state
- Handle loading states
- Handle error states
- Handle empty states

Keep API communication outside UI components when practical.

Prefer:

```text
Component
    ↓
Service
    ↓
Backend API
```

instead of:

```text
Component
    ↓
Direct API implementation
```

---

# 20. Backend Standards

Backend code should follow:

```text
API
 ↓
Service
 ↓
Repository
 ↓
Database
```

Business logic belongs in the Service layer.

Database access belongs in the Repository layer.

External service integrations should use dedicated clients or providers.

---

# 21. AI Integration Standards

AI functionality must be isolated behind an abstraction.

Use:

```text
LLMProvider
└── MockLLMProvider
```

Business logic should depend on:

```text
LLMProvider
```

not a concrete external AI SDK.

This allows:

- Unit testing
- Mocking
- Provider replacement
- Offline development

Never place an API key in frontend code.

---

# 22. Database Standards

Database access must be separated from business logic.

Prefer:

```text
Service
    ↓
Repository
    ↓
Database
```

Do not write database queries directly inside API routes.

Use transactions when multiple related database operations must succeed or fail together.

---

# 23. Redis Standards

Redis should be accessed through a dedicated abstraction or service.

Use Redis for:

- Cache
- Temporary data
- Rate limiting
- Session-like state

Do not make Redis the source of truth for persistent business data unless explicitly required.

---

# 24. Testing

Every significant feature should have tests.

Prioritize:

1. Business logic
2. API behavior
3. Validation
4. Error handling
5. AI provider abstraction

Tests should be deterministic.

Do not depend on real external AI APIs for normal unit tests.

Use:

```text
MockLLMProvider
```

for AI tests.

---

# 25. Testability

Write code that is easy to test.

Prefer dependency injection over hard-coded dependencies.

Good:

```text
ChatService
    ↓
LLMProvider
```

The test can provide:

```text
MockLLMProvider
```

instead of the real provider.

---

# 26. Performance

Do not prematurely optimize.

First ensure:

1. Correctness
2. Maintainability
3. Testability

Optimize only when there is evidence of a performance problem.

For expensive operations:

- Use caching where appropriate
- Avoid unnecessary database queries
- Avoid unnecessary API calls
- Use asynchronous operations when appropriate

---

# 27. Git Standards

Use small and meaningful commits.

Recommended format:

```text
feat: add AI chat endpoint
fix: resolve Redis connection issue
test: add chat service tests
refactor: simplify AI provider
docs: update project setup
chore: update dependencies
```

Do not commit:

```text
.env
node_modules/
__pycache__/
.next/
coverage/
IDE-specific temporary files
```

---

# 28. Code Review Rules

Before considering code complete, verify:

- [ ] Naming is clear
- [ ] No unnecessary duplication
- [ ] No unnecessary abstraction
- [ ] Error handling exists
- [ ] Secrets are not exposed
- [ ] Types are defined
- [ ] Business logic is in the correct layer
- [ ] Tests exist for important behavior
- [ ] No dead code
- [ ] No unnecessary dependencies

---

# 29. Definition of Done

Code is considered complete only when:

- [ ] Implementation follows project architecture
- [ ] Coding standards are followed
- [ ] Input validation exists
- [ ] Error handling exists
- [ ] Sensitive information is protected
- [ ] Tests are added where appropriate
- [ ] Existing tests pass
- [ ] Application builds successfully
- [ ] Podman containers build successfully
- [ ] No obvious lint/type errors remain
- [ ] Documentation is updated when necessary

---

# 30. Priority Rules

When rules conflict, follow this priority:

```text
1. Security
2. Correctness
3. Project Architecture
4. Maintainability
5. Testability
6. Performance
7. Convenience
```

Do not sacrifice security or correctness for implementation speed.