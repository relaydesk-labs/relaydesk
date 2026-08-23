# RelayDesk

RelayDesk is an AI-first Internal Service Hub and agent-ready work hub.

The first product journey is:

```text
Ask -> Guide -> Self-Service -> Request / Ticket
```

The MVP starts with mock tenant data for `Demo Company`. It must not contain real company systems, people, URLs, schemas, documents, or customer data.

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
