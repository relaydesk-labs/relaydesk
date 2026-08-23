package io.relaydesk.data;

import java.util.List;
import java.util.Map;

public final class DataProductModels {
    private DataProductModels() {
    }

    public record DataProduct(
            String id,
            String tenantId,
            String name,
            List<String> allowedMetrics,
            List<String> allowedDimensions
    ) {
    }

    public record DataProductResult(
            String dataProductId,
            String title,
            List<String> columns,
            List<Map<String, Object>> rows
    ) {
    }
}
