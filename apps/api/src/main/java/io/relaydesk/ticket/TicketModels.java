package io.relaydesk.ticket;

import java.time.Instant;
import java.util.List;

public final class TicketModels {
    private TicketModels() {
    }

    public record Ticket(
            String id,
            String tenantId,
            String title,
            String description,
            RequestType requestType,
            TicketStatus status,
            String businessServiceId,
            String applicationId,
            String moduleId,
            String ownerOrganizationId,
            String ownerPersonId,
            Instant createdAt,
            List<TicketHistory> history
    ) {
    }

    public record TicketHistory(
            String id,
            String tenantId,
            String ticketId,
            String eventType,
            String message,
            Instant createdAt
    ) {
    }
}
