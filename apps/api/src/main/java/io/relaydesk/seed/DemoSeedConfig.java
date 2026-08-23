package io.relaydesk.seed;

import io.relaydesk.catalog.CatalogModels.Application;
import io.relaydesk.catalog.CatalogModels.ApplicationModule;
import io.relaydesk.catalog.CatalogModels.BusinessService;
import io.relaydesk.catalog.CatalogModels.Organization;
import io.relaydesk.catalog.CatalogModels.Person;
import io.relaydesk.common.LifecycleStatus;
import io.relaydesk.routing.RoutingModels.RoutingRule;
import io.relaydesk.ticket.RequestType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DemoSeedConfig {
    public static final String TENANT_ID = "demo-company";

    @Bean
    List<Organization> organizations() {
        return List.of(
                new Organization("org-erp-ops", TENANT_ID, "ERP Operations"),
                new Organization("org-data-service", TENANT_ID, "Data Service Desk"),
                new Organization("org-general-it", TENANT_ID, "General IT Queue")
        );
    }

    @Bean
    List<Person> people() {
        return List.of(
                new Person("person-demo-agent-a", TENANT_ID, "org-erp-ops", "Demo Agent A"),
                new Person("person-demo-agent-b", TENANT_ID, "org-general-it", "Demo Agent B")
        );
    }

    @Bean
    List<BusinessService> businessServices() {
        return List.of(
                new BusinessService("svc-journal-processing", TENANT_ID, "회계", "전표 처리", LifecycleStatus.ACTIVE, List.of("전표", "전표 저장", "회계 전표")),
                new BusinessService("svc-vendor-registration", TENANT_ID, "구매", "업체등록", LifecycleStatus.ACTIVE, List.of("협력사 등록", "거래처 등록", "업체 신규 등록")),
                new BusinessService("svc-member-analytics", TENANT_ID, "데이터", "회원 통계", LifecycleStatus.ACTIVE, List.of("신규회원 수", "회원 통계")),
                new BusinessService("svc-it-help", TENANT_ID, "IT공통", "IT 문의", LifecycleStatus.ACTIVE, List.of("담당자", "시스템 문의"))
        );
    }

    @Bean
    List<Application> applications() {
        return List.of(
                new Application("app-erp", TENANT_ID, "ERP", LifecycleStatus.ACTIVE, null, List.of("전사 ERP")),
                new Application("app-internal-portal", TENANT_ID, "Internal Portal", LifecycleStatus.ACTIVE, null, List.of("포털", "사내 포털")),
                new Application("app-purchasing", TENANT_ID, "Purchasing System", LifecycleStatus.ACTIVE, null, List.of("구매 시스템")),
                new Application("app-hr", TENANT_ID, "HR System", LifecycleStatus.ACTIVE, null, List.of("인사 시스템")),
                new Application("app-data-portal", TENANT_ID, "Data Portal", LifecycleStatus.ACTIVE, null, List.of("데이터 포털"))
        );
    }

    @Bean
    List<ApplicationModule> applicationModules() {
        return List.of(
                new ApplicationModule("mod-erp-fi", TENANT_ID, "app-erp", "FI", "Financial Accounting", List.of("회계", "전표")),
                new ApplicationModule("mod-erp-mm", TENANT_ID, "app-erp", "MM", "Materials Management", List.of("구매", "협력사")),
                new ApplicationModule("mod-erp-sd", TENANT_ID, "app-erp", "SD", "Sales and Distribution", List.of("영업")),
                new ApplicationModule("mod-erp-co", TENANT_ID, "app-erp", "CO", "Controlling", List.of("관리회계"))
        );
    }

    @Bean
    List<RoutingRule> routingRules() {
        return List.of(
                new RoutingRule("route-erp-fi-incident", TENANT_ID, "svc-journal-processing", "app-erp", "mod-erp-fi", RequestType.INCIDENT, "org-erp-ops", "person-demo-agent-a", 10),
                new RoutingRule("route-vendor-inquiry", TENANT_ID, "svc-vendor-registration", "app-erp", null, RequestType.INQUIRY, "org-erp-ops", "person-demo-agent-a", 20),
                new RoutingRule("route-erp-incident", TENANT_ID, null, "app-erp", null, RequestType.INCIDENT, "org-erp-ops", "person-demo-agent-a", 50),
                new RoutingRule("route-data-request", TENANT_ID, "svc-member-analytics", "app-data-portal", null, RequestType.DATA_REQUEST, "org-data-service", "person-demo-agent-b", 30)
        );
    }
}
