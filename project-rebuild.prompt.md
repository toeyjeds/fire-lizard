# Project Rebuild & Setup Prompt

## Role

You are a Senior Software Architect and Senior Next.js Engineer.

Your task is to analyze an existing application and rebuild it as a new modern application using Next.js and TypeScript.

The new application must preserve the existing application's business requirements, user flows, validations, API behavior, and important business rules while improving the frontend architecture.

---

# 1. Objective

Analyze the existing project first.

Then:

1. Understand the existing system.
2. Extract functional and business requirements.
3. Identify existing screens and user flows.
4. Identify API integrations.
5. Identify authentication and authorization behavior.
6. Design a new Next.js architecture.
7. Create the new Next.js project.
8. Implement the required features.
9. Integrate Microsoft Entra ID (Azure AD) authentication.
10. Integrate the existing backend APIs.
11. Add tests.
12. Run lint, type checking, tests, and production build.

Do not blindly convert the old code.

The goal is:

```text
Existing Project
      ↓
Analyze
      ↓
Understand Requirements
      ↓
Extract Business Rules
      ↓
Design New Architecture
      ↓
Next.js Implementation
      ↓
Microsoft Entra ID Authentication
      ↓
API Integration
      ↓
Testing
      ↓
Production Build
```

---

# 2. IMPORTANT RULE

## Analyze Before Coding

Do NOT start modifying or creating application code immediately.

First inspect the entire existing project.

Understand:

- Project structure
- Technology stack
- Application architecture
- Pages
- Components
- Business logic
- API integrations
- Authentication
- Authorization
- Validation
- State management
- Configuration
- Environment variables
- External services
- Error handling
- Loading states
- User flows

Do not make assumptions when the existing project contains the required information.

---

# 3. Phase 1 — Existing Project Analysis

Inspect the entire project.

## 3.1 Project Structure

Identify:

- Frontend
- Backend
- Shared libraries
- Configuration
- Tests
- Assets
- Utilities
- Services
- API clients

Document the existing structure.

## 3.2 Technology Stack

Identify:

- Programming languages
- Frameworks
- Libraries
- Package managers
- Build tools
- Testing frameworks
- UI libraries
- State management
- Authentication libraries
- API clients

Record important versions when available.

## 3.3 Application Features

Create a feature inventory.

Only include features that actually exist in the source project.

## 3.4 Screens / Pages

For each screen document:

```text
Screen:
Purpose:
URL / Route:
User Role:
Inputs:
Actions:
API:
Validation:
Navigation:
```

## 3.5 User Flows

Trace important user journeys.

Example:

```text
Login
 ↓
Dashboard
 ↓
Search
 ↓
Select Record
 ↓
Detail
 ↓
Edit
 ↓
Submit
 ↓
API
 ↓
Success
```

Document the actual flow from the existing application.

---

# 4. Phase 2 — Business Logic Analysis

Extract existing business rules.

Identify:

- Required fields
- Optional fields
- Validation rules
- Conditional rules
- Status transitions
- Permission rules
- Role-based behavior
- Error conditions
- Success conditions
- Date/time rules
- Data formatting rules

Do not lose business logic during migration.

Create a document/table:

```text
Business Rule
Condition
Expected Behavior
Affected Feature
Affected API
```

---

# 5. Phase 3 — API Analysis

Inspect all API integrations.

For each API document:

```text
API Name:
HTTP Method:
Endpoint:
Request:
Response:
Authentication:
Headers:
Query Parameters:
Path Parameters:
Validation:
Success Response:
Error Response:
Used By:
```

Preserve existing API contracts unless there is a documented reason to change them.

---

# 6. Phase 4 — Authentication Analysis

Analyze the existing authentication system.

Identify:

- Login mechanism
- Logout mechanism
- Session handling
- Token handling
- User identity
- Roles
- Permissions
- Protected pages
- Public pages
- Token expiration
- Unauthorized behavior

Then replace the existing frontend authentication implementation with:

**Microsoft Entra ID (Azure AD)**

---

# 7. Phase 5 — New Technology Stack

The new frontend must use:

```text
Next.js
TypeScript
React
Next.js App Router
Microsoft Entra ID
REST API
ESLint
```

Use the latest stable versions compatible with the project requirements.

Avoid unnecessary dependencies.

Before adding a dependency, verify whether the functionality can be implemented using the existing stack.

---

# 8. Next.js Architecture

Use Next.js App Router.

Recommended structure:

```text
src/
├── app/
│   ├── login/
│   ├── dashboard/
│   ├── api/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── common/
│   ├── layout/
│   └── ui/
│
├── features/
│   ├── authentication/
│   ├── dashboard/
│   └── [feature]/
│
├── services/
│   ├── api/
│   ├── auth/
│   └── ...
│
├── lib/
│   ├── auth/
│   ├── api/
│   ├── validation/
│   └── utils/
│
├── types/
├── config/
└── constants/
```

Adapt the structure based on the actual project.

Do not force features into unnecessary folders.

---

# 9. Authentication — Microsoft Entra ID

Use Microsoft Entra ID (Azure AD) for authentication.

Authentication must use a standard OAuth 2.0 / OpenID Connect implementation.

Do NOT manually implement authentication.

Architecture:

```text
User
  │
  ▼
Next.js
  │
  ▼
Microsoft Entra ID
  │
  ▼
Authentication
  │
  ▼
Session
  │
  ▼
Protected Next.js Application
```

---

# 10. Azure App Registration

Prepare the project to work with a Microsoft Entra ID App Registration.

Required configuration should include:

```env
AZURE_AD_CLIENT_ID=
AZURE_AD_CLIENT_SECRET=
AZURE_AD_TENANT_ID=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
```

Use the actual authentication library's required environment variable names if they differ.

Never hardcode:

- Client ID
- Client Secret
- Tenant ID
- Access Token
- Refresh Token
- Secrets

Sensitive values must only exist in environment configuration.

---

# 11. Authentication Requirements

## Login

```text
User
 ↓
Login
 ↓
Microsoft Entra ID
 ↓
Authentication
 ↓
Callback
 ↓
Session
 ↓
Application
```

## Logout

```text
Application
 ↓
Logout
 ↓
Clear Session
 ↓
Microsoft Entra ID Logout
```

## Protected Routes

Unauthenticated users must not access protected application pages.

Determine actual routes from the existing application.

---

# 12. Authorization

If the existing system contains roles or permissions, preserve them.

Example:

```text
User
Admin
Manager
Approver
Staff
```

Implement authorization separately from authentication.

```text
Authentication
    ↓
Who are you?

Authorization
    ↓
What are you allowed to do?
```

Do not assume every authenticated user has access to every feature.

---

# 13. Token Handling

Handle tokens securely.

Rules:

- Do not expose secrets to the browser.
- Do not store sensitive tokens in localStorage unless explicitly required and justified.
- Do not log access tokens.
- Do not log client secrets.
- Handle token expiration.
- Handle unauthorized API responses.
- Refresh tokens when required by the chosen authentication architecture.
- Keep server-side secrets server-side.

---

# 14. API Architecture

Next.js should primarily handle:

```text
UI
Routing
Authentication
Session
API Integration
```

The backend should remain responsible for:

```text
Business Logic
Database
Core APIs
Data Processing
External Services
```

Do NOT move backend business logic into React components.

---

# 15. API Service Layer

Do not directly write large API calls inside React components.

Use a service layer.

Example:

```text
components
    ↓
feature service
    ↓
API client
    ↓
Backend API
```

Example:

```text
src/services/api/
├── client.ts
├── customer-api.ts
├── request-api.ts
└── ...
```

The exact structure should follow the application's actual domain.

---

# 16. Error Handling

Implement consistent error handling.

Handle:

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Validation Error
500 Internal Server Error
Network Error
Timeout
Session Expired
```

The UI should provide meaningful feedback without exposing internal system details.

---

# 17. Loading State

Implement loading states for asynchronous operations.

Examples:

```text
Page Loading
API Loading
Button Loading
Form Submission
Authentication
Data Fetching
```

Prevent duplicate submissions where appropriate.

---

# 18. Form Validation

Preserve existing validation rules.

Validation should exist at the appropriate layers:

```text
UI Validation
     ↓
API Validation
     ↓
Backend Validation
```

Do not rely only on frontend validation.

---

# 19. UI Migration

Rebuild the existing UI in Next.js.

Preserve:

- User flow
- Important layout
- Navigation
- Form behavior
- Validation
- Business actions
- Error behavior

Improve code structure where appropriate.

Do not unnecessarily redesign the application unless explicitly requested.

---

# 20. Component Design

Create reusable components.

Examples:

```text
Button
Input
Select
Modal
Table
Pagination
Loading
ErrorMessage
ConfirmDialog
Header
Sidebar
Breadcrumb
```

Before creating a component:

1. Search for an existing equivalent.
2. Reuse it if possible.
3. Extend it if appropriate.
4. Create a new component only when necessary.

Avoid duplicate components.

---

# 21. State Management

Analyze the existing project first.

Use the simplest appropriate solution.

Prefer:

```text
React State
Server Components
URL State
Server-side data fetching
```

Use global state only when genuinely required.

Do not introduce Redux or another global state library without justification.

---

# 22. Environment Configuration

Create:

```text
.env.example
```

Example:

```env
NEXT_PUBLIC_APP_NAME=
NEXT_PUBLIC_API_BASE_URL=

AZURE_AD_CLIENT_ID=
AZURE_AD_CLIENT_SECRET=
AZURE_AD_TENANT_ID=

NEXTAUTH_URL=
NEXTAUTH_SECRET=
```

Never commit:

```text
.env
.env.local
client secrets
access tokens
private keys
```

---

# 23. Security Requirements

Follow secure development practices.

Must:

- Validate user input.
- Protect authenticated routes.
- Protect API access.
- Avoid secret exposure.
- Avoid sensitive logging.
- Handle unauthorized access.
- Handle expired sessions.
- Prevent accidental token leakage.
- Use HTTPS in production.
- Follow Microsoft Entra ID security recommendations.

---

# 24. Coding Standards

Use:

- TypeScript strict mode
- ESLint
- Clear naming
- Small focused functions
- Reusable components
- Separation of concerns
- Dependency inversion where useful
- Consistent error handling
- Consistent API handling

Avoid:

- `any` unless justified
- Duplicate code
- Large React components
- Hardcoded URLs
- Hardcoded credentials
- Business logic inside UI components
- Unnecessary abstractions
- Unnecessary dependencies

---

# 25. Testing

Create tests for:

## Authentication

```text
Login
Logout
Session
Protected Route
Unauthorized User
Expired Session
```

## Features

```text
Create
Read
Update
Delete
Search
Validation
Error Handling
```

## API

Test:

```text
Success
Validation Error
Unauthorized
Forbidden
Not Found
Server Error
Network Error
```

---

# 26. Quality Checks

Before finishing, run:

```bash
npm install
npm run lint
npm run type-check
npm test
npm run build
```

If scripts have different names, inspect `package.json` and use the project's actual scripts.

Fix all errors caused by the implementation.

---

# 27. Migration Rules

## DO

- Analyze first.
- Preserve business behavior.
- Preserve API contracts.
- Reuse existing logic where appropriate.
- Improve architecture.
- Use TypeScript.
- Use Next.js App Router.
- Use Microsoft Entra ID.
- Add tests.
- Keep changes maintainable.

## DO NOT

- Blindly copy the old architecture.
- Copy unnecessary legacy dependencies.
- Move backend logic into frontend.
- Hardcode secrets.
- Create duplicate API clients.
- Create duplicate components.
- Refactor unrelated functionality.
- Change business rules without justification.
- Remove existing functionality without documenting it.

---

# 28. Implementation Process

Follow this exact process.

```text
STEP 1
Read existing project
        ↓
STEP 2
Analyze architecture
        ↓
STEP 3
Extract requirements
        ↓
STEP 4
Extract business rules
        ↓
STEP 5
Analyze API
        ↓
STEP 6
Analyze authentication
        ↓
STEP 7
Design Next.js architecture
        ↓
STEP 8
Create Next.js project
        ↓
STEP 9
Implement Microsoft Entra ID
        ↓
STEP 10
Implement layout/navigation
        ↓
STEP 11
Implement features
        ↓
STEP 12
Implement API integration
        ↓
STEP 13
Implement authorization
        ↓
STEP 14
Add tests
        ↓
STEP 15
Run lint/typecheck/test/build
        ↓
STEP 16
Fix issues
        ↓
STEP 17
Final review
```

---

# 29. Required Analysis Output

Before implementation, produce:

```text
# Existing Project Analysis

## Architecture

## Technology Stack

## Project Structure

## Features

## Screens

## User Flows

## Business Rules

## API Inventory

## Authentication

## Authorization

## Dependencies

## Environment Configuration

## Migration Strategy

## New Next.js Architecture

## Proposed Project Structure

## Implementation Plan

## Risks

## Open Questions
```

---

# 30. Required Final Output

After implementation, provide:

```text
# Implementation Summary

## Architecture

## Features Implemented

## Authentication

## Authorization

## API Integration

## Project Structure

## Files Created

## Files Modified

## Environment Variables

## Azure App Registration Configuration

## Tests

## Build Result

## Known Issues

## TODO
```

---

# 31. Final Acceptance Criteria

The implementation is complete only when:

- [ ] Existing project has been analyzed.
- [ ] Existing features have been identified.
- [ ] Existing business rules have been identified.
- [ ] Existing APIs have been identified.
- [ ] Existing authentication has been analyzed.
- [ ] Next.js architecture has been defined.
- [ ] Next.js application has been created.
- [ ] TypeScript is enabled.
- [ ] Microsoft Entra ID authentication is implemented.
- [ ] Login works.
- [ ] Logout works.
- [ ] Protected routes work.
- [ ] Authorization works where required.
- [ ] Existing backend APIs are integrated.
- [ ] Existing business behavior is preserved.
- [ ] Error handling is implemented.
- [ ] Form validation is implemented.
- [ ] Tests are implemented.
- [ ] ESLint passes.
- [ ] Type checking passes.
- [ ] Tests pass.
- [ ] Production build passes.
- [ ] No secrets are committed.
- [ ] No unnecessary dependencies are introduced.
- [ ] No unrelated functionality is changed.

---

# 32. Start Command

Start by analyzing the existing project.

Do NOT modify files yet.

First return:

```text
1. Existing Architecture
2. Existing Features
3. Existing Screens
4. Existing User Flows
5. Business Rules
6. API Inventory
7. Authentication Analysis
8. Authorization Analysis
9. Proposed Next.js Architecture
10. Proposed Project Structure
11. Migration Plan
12. Risks
13. Open Questions
```

After the analysis is complete, wait for approval before implementation.
