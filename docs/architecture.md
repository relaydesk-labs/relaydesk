# Architecture

RelayDesk is implemented as a monorepo:

```text
apps/api         Spring Boot Core API
apps/web         React + TypeScript + Vite web app
packages/ui      future shared design system
integrations/mcp future MCP adapter
integrations/agents future agent provider adapters
infra            local infrastructure
reference        non-runtime visual references
```

## Stack Decisions

- Backend: Java 21, Spring Boot, Gradle Wrapper. JDK 21 is installed locally and keeps the API aligned with modern Spring Boot.
- Persistence target: PostgreSQL with Flyway migrations. The current MVP uses seed-backed repositories for fast vertical slice delivery; the schema is already represented in Flyway.
- Frontend: React, TypeScript, Vite. The prototype is used as a visual reference, not copied directly into runtime code.
- AI: `RequestClassifier` is a port. The MVP uses `MockRequestClassifier`; future LLM providers must implement the same contract.
- Integrations: MCP, Slack, Teams, Email, and agent providers stay outside Core Domain and call the same Core API.

## SaaS Boundary

Core domain data is tenant-scoped. The first tenant is `Demo Company` with id `demo-company`.

Current implementation avoids real company names, people, emails, URLs, IPs, schemas, internal documents, and customer data.

## Routing Boundary

AI classification may identify service, application, module, and request type. It must not invent owners. Owners are resolved by routing rules with fallback:

```text
Service + Module + RequestType
Service + RequestType
Application + RequestType
Application
General IT Queue
```

## Agent-ready Boundary

Agent execution is future scope. The current model keeps extension points for:

- `Agent`
- `WorkItemContext`
- Agent provider adapters
- MCP tools for work item context
