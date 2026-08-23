package io.relaydesk.agent;

import java.util.List;

public final class AgentModels {
    private AgentModels() {
    }

    public record Agent(
            String id,
            String tenantId,
            String name,
            String provider,
            String type,
            List<String> capabilities,
            String status
    ) {
    }

    public record WorkItemContext(
            String id,
            String tenantId,
            String ticketId,
            String contextType,
            String title,
            String content,
            String referenceType,
            String referenceId,
            String referenceUrl
    ) {
    }
}
