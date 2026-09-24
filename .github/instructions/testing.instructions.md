---
applyTo: "**/*.{java,ts,tsx}"
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

- JUnit 5
- Mockito
- Spring Boot Test (`@SpringBootTest`, `@WebMvcTest`)
- Testcontainers (SQL Server) for `cds-orch-service` integration tests
- A fake/local SMTP server (e.g. GreenMail or MailHog) for `cds-orch-service` email tests — never send real email during tests

Test per service:

**cds-gateway-service**

- Health endpoint
- Routing behavior
- Rate limit enforcement
- Request/response mapping
- Field masking
- Input/output validation

**cds-orch-service**

- Health endpoint
- API validation
- Service layer (business logic)
- Repository behavior
- Notification/email sending (mocked `JavaMailSender` or fake SMTP server)
- Error handling

Example (`cds-orch-service`):

```text
src/test/java/.../
├── HealthControllerTest.java
├── OrderControllerTest.java
├── OrderServiceTest.java
└── NotificationServiceTest.java
```

Tests must not require any external service credentials.