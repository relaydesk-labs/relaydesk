package io.relaydesk.classification;

import io.relaydesk.ticket.RequestType;

public record ClassificationResult(
        ResolutionMode resolutionMode,
        RequestType requestType,
        String businessServiceId,
        String applicationId,
        String moduleId,
        double confidence,
        String reason
) {
}
