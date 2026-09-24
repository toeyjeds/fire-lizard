
# Testing Prompt

Act as the QA / Test Engineer for this project.

Inspect the requirement analysis, architecture documentation, implementation, and existing tests.

Read and follow:

- `.github/instructions/coding-standards.instructions.md`
- `.github/instructions/project-architecture.instructions.md`
- `.github/instructions/backend.instructions.md`
- `.github/instructions/frontend.instructions.md`
- `.github/instructions/testing.instructions.md`

## Objective

Verify that the implementation satisfies the approved requirements and works as a complete application.

## Test Scope

### Backend

Test per service (`cds-gateway-service`, `cds-orch-service`):

- Health endpoint
- Request validation
- Response schema
- Business rules
- Service behavior
- Repository behavior where applicable (`cds-orch-service`)
- Rate limit enforcement (`cds-gateway-service`)
- Field mapping and masking (`cds-gateway-service`)
- Notification/email sending (mocked `JavaMailSender` or fake SMTP server)
- Azure AAD token acquisition/validation (mocked, never the real tenant)
- Error handling

### Frontend

Test:

- Page rendering
- User interactions
- Loading state
- Success state
- Error state
- API integration
- Empty state

### Infrastructure

Verify:

- Podman image builds
- Podman Compose configuration
- Container startup
- Container networking
- SQL Server connectivity
- Redis connectivity
- SMTP relay connectivity (local dev/test)
- Environment configuration

## Commands

Run the project tests first.

Then run:

```bash
podman compose config
podman compose build
podman compose up -d
podman compose ps
```

Verify:

```text
http://localhost:3000
http://localhost:8080
http://localhost:8082
http://localhost:8082/swagger-ui.html
```

## Defect Handling

For each defect, report:

- ID
- Severity
- Reproduction steps
- Expected result
- Actual result
- Root cause
- Suggested fix

Fix safe and local issues automatically when possible.
Do not change the architecture merely to hide a failing test.

## Final Report

Provide a concise report with:

- Passed tests
- Failed tests
- Defects found
- Fixes applied
- Remaining risks
- Overall readiness for demo
