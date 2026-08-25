# RelayDesk

RelayDesk is an AI-first Internal Service Hub and agent-ready work hub.

It is not positioned as a classic ITSM or ticket management system. The product starts from a simpler operating problem:

- employees do not know which internal system to use
- employees do not know who owns a task
- request procedures are scattered across chat, email, and tribal knowledge
- repeated IT inquiries consume human operators
- simple data requests still depend on IT staff

The first product journey is:

```text
Ask -> Guide -> Self-Service -> Request / Ticket
```

Tickets are the last step, not the center of the product. RelayDesk should first try to guide the user or resolve the request through approved self-service paths.

The MVP starts with mock tenant data for `Demo Company`. It must not contain real company systems, people, URLs, schemas, documents, or customer data.

## Internal Improvement Use Case

RelayDesk can be framed as an internal improvement project for organizations that do not yet have a formal ITSM process.

The project should not start by saying, "we need a ticket system." A better framing is:

> We need a lightweight internal service hub that reduces repeated IT requests and helps employees find the right system, owner, procedure, or self-service path before creating a ticket.

Recommended rollout:

```text
1. Collect repeated IT questions from email, messenger, and ad hoc requests
2. Build a service catalog from generic categories, not company-specific hardcoded names
3. Add aliases that match how employees actually ask questions
4. Define official ownership and routing rules
5. Convert repeated inquiries into guides
6. Convert repeated data requests into Data Products
7. Create tickets only when human judgment or action is required
8. Measure ticket deflection and self-service resolution
```

The expected improvement is not "more tickets managed." The expected improvement is:

```text
fewer repeated human-handled IT requests
faster routing when a ticket is required
less dependency on knowing system names or owners
better visibility into automation and knowledge candidates
```

This repository intentionally uses `Demo Company` mock data. When adapting RelayDesk inside a company, company-specific data should be added as configuration, seed data, and connector implementation outside the generic core product.

## Local Run

API:

```bash
JAVA_HOME=$(/usr/libexec/java_home -v 21) ./gradlew :apps:api:bootRun
```

Web:

```bash
cd apps/web
npm install
npm run dev
```

PostgreSQL profile, once Docker Compose is available:

```bash
docker compose -f infra/docker-compose.yml up -d
JAVA_HOME=$(/usr/libexec/java_home -v 21) ./gradlew :apps:api:bootRun --args='--spring.profiles.active=postgres'
```
