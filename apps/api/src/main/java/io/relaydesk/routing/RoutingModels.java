package io.relaydesk.routing;

import io.relaydesk.ticket.RequestType;

public final class RoutingModels {
    private RoutingModels() {
    }

    public record RoutingRule(
            String id,
            String tenantId,
            String businessServiceId,
            String applicationId,
            String moduleId,
            RequestType requestType,
            String organizationId,
            String personId,
            int priority
    ) {
    }

    public record RoutingTarget(String organizationId, String personId, String matchedRuleId, String fallbackLevel) {
    }
}
