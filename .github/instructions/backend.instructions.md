---
applyTo: "{cds-gateway-service,cds-orch-service}/**/*.java"
---

# Backend Development Standards

> **CDS** stands for **Cash Delivery Service**.

## Technology

Use:

- Java 17
- Spring Boot 3.x
- Spring Cloud Gateway (`cds-gateway-service`)
- Resilience4j (rate limiting, circuit breaking)
- Spring Web / Bean Validation (`jakarta.validation`)
- MapStruct (`cds-gateway-service` field mapping)
- Spring Data JPA (`cds-orch-service`)
- SQL Server (Microsoft JDBC Driver, Hibernate `SQLServerDialect`)
- Spring Boot Starter Mail / `JavaMailSender` (`cds-orch-service` SMTP notifications)
- Spring Security OAuth2 Resource Server / MSAL4J (`cds-orch-service` Azure AAD integration)
- Maven
- JUnit 5 + Mockito

## Service Responsibilities

### cds-gateway-service

- Single entry point for all frontend requests.
- Applies rate limiting with Resilience4j in application memory.
- Handles authentication/authorization at the edge.
- Maps and transforms fields between frontend DTOs and orchestration DTOs (MapStruct mappers).
- Masks sensitive fields (e.g. national ID, phone number, email) before returning data to the frontend.
- Validates both inbound requests and outbound responses.
- Routes requests to `cds-orch-service`.
- Must never contain business logic and must never access the database directly.

### cds-orch-service

- Owns business logic and orchestration.
- Coordinates domain services and external APIs.
- Authenticates against Azure AAD (Entra ID) via OAuth2/OIDC for secured integrations.
- The only service allowed to access SQL Server and the SMTP relay.
- Sends transactional email/notifications via a `NotificationService` backed by `JavaMailSender`.
- Exposes internal APIs consumed by `cds-gateway-service`.

Do not add Redis dependencies, configuration, or network connections to either service.

## Project Architecture

Follow, per service:

Controller
→ Service
→ Repository (`cds-orch-service` only)
→ Database

## Spring Boot

Controllers should be thin.

Good:

```java
@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@Valid @RequestBody OrderRequest request) {
        return ResponseEntity.ok(orderService.createOrder(request));
    }
}
```

Avoid business logic, validation logic, or database queries inside controllers.

## Rate Limiting (cds-gateway-service)

Configure limits per route/client via `application.yml`. Never hard-code rate limit thresholds.

## Field Mapping & Masking (cds-gateway-service)

- Use dedicated MapStruct mappers to convert between frontend DTOs and orchestration DTOs.
- Mask sensitive fields in a dedicated masking utility, not inline in controllers.
- Validate inbound and outbound payloads using Bean Validation.

## Business Logic & Orchestration (cds-orch-service)

- Business rules live in `@Service` classes.
- Use Spring Data JPA `@Repository` interfaces for SQL Server access.
- Use `@Transactional` for operations spanning multiple repository calls.
- Send email through a `NotificationService` abstraction wrapping `JavaMailSender`; never build SMTP messages inline in controllers or repositories.
- Externalize SMTP host, port, credentials, and sender address via environment variables.

## Azure AAD Integration (cds-orch-service)

- Use Spring Security's OAuth2 client (client credentials flow) or MSAL4J to acquire tokens for outbound Azure AAD-secured calls.
- Use Spring Security's OAuth2 resource server support to validate inbound JWTs against the tenant's JWKS endpoint.
- Externalize tenant ID, client ID, client secret, and authority URL via environment variables; never hard-code them.
- Never log access tokens, refresh tokens, or client secrets.
- Use a mocked token provider or test double in automated tests; never call the real Azure AAD tenant.

## Dependency Injection

Use constructor injection. Avoid field injection (`@Autowired` on fields).

## Configuration

Externalize configuration via `application.yml` and environment variables. Never hard-code URLs, credentials, or rate limit thresholds.
