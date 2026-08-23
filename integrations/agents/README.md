# RelayDesk Agent Integration

Agent execution is intentionally outside Core Domain.

Target shape:

```text
Work Item Core
  -> Agent Integration Port
  -> Provider Adapter
     -> Codex
     -> Claude
     -> Kiro
     -> Custom
```

RelayDesk should keep a human owner as final accountable owner and model agents as contributors.

Future timeline events:

- Agent delegated
- Agent analysis started
- Root cause hypothesis
- Code change
- Test result
- Pull request attached
- Human review
- Completed
