Use the Tester agent.

Review the entire implementation against:
- BA requirements
- SA architecture
- Acceptance criteria

Run the available tests.

Test:
- Frontend
- Backend
- API
- PostgreSQL
- Redis
- AI mock provider
- Podman containers
- Container networking
- Error handling

Run:

podman compose up --build

Verify:

http://localhost:3000
http://localhost:8000/docs

Report:
- Passed
- Failed
- Bugs
- Missing requirements
- Recommended fixes

Fix issues that can be safely fixed automatically.