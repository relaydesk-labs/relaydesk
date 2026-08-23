package io.relaydesk.routing;

import io.relaydesk.classification.ClassificationResult;
import io.relaydesk.routing.RoutingModels.RoutingRule;
import io.relaydesk.routing.RoutingModels.RoutingTarget;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class RoutingService {
    private final List<RoutingRule> routingRules;

    public RoutingService(List<RoutingRule> routingRules) {
        this.routingRules = routingRules;
    }

    public RoutingTarget resolve(String tenantId, ClassificationResult classification) {
        return match(tenantId, classification, true, true, true)
                .or(() -> match(tenantId, classification, true, false, true))
                .or(() -> match(tenantId, classification, false, false, true))
                .or(() -> match(tenantId, classification, false, false, false))
                .orElseGet(() -> new RoutingTarget("org-general-it", "person-demo-agent-b", null, "General IT Queue"));
    }

    private Optional<RoutingTarget> match(
            String tenantId,
            ClassificationResult classification,
            boolean includeService,
            boolean includeModule,
            boolean includeRequestType
    ) {
        return routingRules.stream()
                .filter(rule -> rule.tenantId().equals(tenantId))
                .filter(rule -> !includeService || equalsNullable(rule.businessServiceId(), classification.businessServiceId()))
                .filter(rule -> !includeModule || equalsNullable(rule.moduleId(), classification.moduleId()))
                .filter(rule -> !includeRequestType || rule.requestType() == classification.requestType())
                .filter(rule -> includeService || equalsNullable(rule.applicationId(), classification.applicationId()))
                .min(Comparator.comparingInt(RoutingRule::priority))
                .map(rule -> new RoutingTarget(rule.organizationId(), rule.personId(), rule.id(), fallbackName(includeService, includeModule, includeRequestType)));
    }

    private boolean equalsNullable(String left, String right) {
        return left != null && left.equals(right);
    }

    private String fallbackName(boolean service, boolean module, boolean requestType) {
        if (service && module && requestType) {
            return "Service + Module + RequestType";
        }
        if (service && requestType) {
            return "Service + RequestType";
        }
        if (requestType) {
            return "Application + RequestType";
        }
        return "Application";
    }
}
