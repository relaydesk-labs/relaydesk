package io.relaydesk.catalog;

import io.relaydesk.common.LifecycleStatus;

import java.util.List;

public final class CatalogModels {
    private CatalogModels() {
    }

    public record Organization(String id, String tenantId, String name) {
    }

    public record Person(String id, String tenantId, String organizationId, String displayName) {
    }

    public record BusinessService(
            String id,
            String tenantId,
            String domainName,
            String name,
            LifecycleStatus lifecycle,
            List<String> aliases
    ) {
    }

    public record Application(
            String id,
            String tenantId,
            String name,
            LifecycleStatus lifecycle,
            String replacementApplicationId,
            List<String> aliases
    ) {
    }

    public record ApplicationModule(
            String id,
            String tenantId,
            String applicationId,
            String code,
            String name,
            List<String> aliases
    ) {
    }
}
