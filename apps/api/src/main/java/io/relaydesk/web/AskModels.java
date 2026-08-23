package io.relaydesk.web;

import io.relaydesk.classification.ClassificationResult;
import io.relaydesk.classification.ResolutionMode;
import io.relaydesk.data.DataProductModels.DataProductResult;
import io.relaydesk.routing.RoutingModels.RoutingTarget;
import io.relaydesk.ticket.TicketModels.Ticket;

import java.util.List;

public final class AskModels {
    private AskModels() {
    }

    public record AskRequest(String message) {
    }

    public record AskResponse(
            ResolutionMode mode,
            String title,
            String summary,
            ClassificationResult classification,
            RoutingTarget routing,
            GuidePayload guide,
            DataProductResult data,
            Ticket ticket
    ) {
    }

    public record GuidePayload(
            String businessService,
            String application,
            String module,
            List<String> steps,
            String ownerOrganization
    ) {
    }

    public record StatusUpdateRequest(String status) {
    }
}
