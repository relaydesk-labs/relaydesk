package io.relaydesk.knowledge;

import java.util.List;

public final class KnowledgeModels {
    private KnowledgeModels() {
    }

    public record KnowledgeArticle(
            String id,
            String tenantId,
            String title,
            String symptom,
            String cause,
            List<String> checks,
            List<String> resolutionSteps
    ) {
    }
}
