package io.relaydesk.ticket;

import io.relaydesk.classification.ClassificationResult;
import io.relaydesk.routing.RoutingModels.RoutingTarget;
import io.relaydesk.ticket.TicketModels.Ticket;
import io.relaydesk.ticket.TicketModels.TicketHistory;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class TicketService {
    private final Map<String, Ticket> tickets = new LinkedHashMap<>();

    public Ticket createIncidentTicket(String tenantId, String message, ClassificationResult classification, RoutingTarget routingTarget) {
        String id = "INC-" + Instant.now().toEpochMilli();
        Instant now = Instant.now();
        List<TicketHistory> history = new ArrayList<>();
        history.add(history(tenantId, id, "REQUEST_RECEIVED", "요청이 접수되었습니다.", now));
        history.add(history(tenantId, id, "REQUEST_CLASSIFIED", classification.reason(), now));
        history.add(history(tenantId, id, "ROUTED", "Routing matched: " + routingTarget.fallbackLevel(), now));

        Ticket ticket = new Ticket(
                id,
                tenantId,
                titleFrom(message),
                message,
                classification.requestType(),
                TicketStatus.ASSIGNED,
                classification.businessServiceId(),
                classification.applicationId(),
                classification.moduleId(),
                routingTarget.organizationId(),
                routingTarget.personId(),
                now,
                List.copyOf(history)
        );
        tickets.put(id, ticket);
        return ticket;
    }

    public List<Ticket> findByTenant(String tenantId) {
        return tickets.values().stream()
                .filter(ticket -> ticket.tenantId().equals(tenantId))
                .toList();
    }

    public Ticket transition(String tenantId, String ticketId, TicketStatus status) {
        Ticket current = tickets.get(ticketId);
        if (current == null || !current.tenantId().equals(tenantId)) {
            throw new IllegalArgumentException("Ticket not found");
        }
        List<TicketHistory> history = new ArrayList<>(current.history());
        history.add(history(tenantId, ticketId, "STATUS_CHANGED", "Status changed to " + status, Instant.now()));
        Ticket updated = new Ticket(
                current.id(),
                current.tenantId(),
                current.title(),
                current.description(),
                current.requestType(),
                status,
                current.businessServiceId(),
                current.applicationId(),
                current.moduleId(),
                current.ownerOrganizationId(),
                current.ownerPersonId(),
                current.createdAt(),
                List.copyOf(history)
        );
        tickets.put(ticketId, updated);
        return updated;
    }

    private TicketHistory history(String tenantId, String ticketId, String eventType, String message, Instant createdAt) {
        return new TicketHistory(UUID.randomUUID().toString(), tenantId, ticketId, eventType, message, createdAt);
    }

    private String titleFrom(String message) {
        if (message == null || message.isBlank()) {
            return "새 IT 요청";
        }
        return message.length() <= 40 ? message : message.substring(0, 40) + "...";
    }
}
