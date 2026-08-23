package io.relaydesk.web;

import io.relaydesk.catalog.CatalogModels.Application;
import io.relaydesk.catalog.CatalogModels.ApplicationModule;
import io.relaydesk.catalog.CatalogModels.BusinessService;
import io.relaydesk.catalog.CatalogModels.Organization;
import io.relaydesk.classification.ClassificationResult;
import io.relaydesk.classification.RequestClassifier;
import io.relaydesk.classification.ResolutionMode;
import io.relaydesk.data.DataProductService;
import io.relaydesk.routing.RoutingModels.RoutingTarget;
import io.relaydesk.routing.RoutingService;
import io.relaydesk.seed.DemoSeedConfig;
import io.relaydesk.ticket.TicketModels.Ticket;
import io.relaydesk.ticket.TicketService;
import io.relaydesk.web.AskModels.AskResponse;
import io.relaydesk.web.AskModels.GuidePayload;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AskService {
    private final String tenantId;
    private final RequestClassifier classifier;
    private final RoutingService routingService;
    private final TicketService ticketService;
    private final DataProductService dataProductService;
    private final List<BusinessService> businessServices;
    private final List<Application> applications;
    private final List<ApplicationModule> modules;
    private final List<Organization> organizations;

    public AskService(
            @Value("${relaydesk.tenant-id:" + DemoSeedConfig.TENANT_ID + "}") String tenantId,
            RequestClassifier classifier,
            RoutingService routingService,
            TicketService ticketService,
            DataProductService dataProductService,
            List<BusinessService> businessServices,
            List<Application> applications,
            List<ApplicationModule> modules,
            List<Organization> organizations
    ) {
        this.tenantId = tenantId;
        this.classifier = classifier;
        this.routingService = routingService;
        this.ticketService = ticketService;
        this.dataProductService = dataProductService;
        this.businessServices = businessServices;
        this.applications = applications;
        this.modules = modules;
        this.organizations = organizations;
    }

    public AskResponse ask(String message) {
        ClassificationResult classification = classifier.classify(tenantId, message);

        if (classification.resolutionMode() == ResolutionMode.SELF_SERVICE) {
            return new AskResponse(
                    ResolutionMode.SELF_SERVICE,
                    "Data Self-Service로 해결할 수 있습니다.",
                    "허용된 Data Product 기준으로 Mock Dataset을 조회했습니다.",
                    classification,
                    null,
                    null,
                    dataProductService.queryNewMembersLastMonth(tenantId),
                    null
            );
        }

        RoutingTarget routing = routingService.resolve(tenantId, classification);
        if (classification.resolutionMode() == ResolutionMode.TICKET) {
            Ticket ticket = ticketService.createIncidentTicket(tenantId, message, classification, routing);
            return new AskResponse(
                    ResolutionMode.TICKET,
                    "담당자 처리가 필요한 요청입니다.",
                    "Routing Rule에 따라 담당 조직과 담당자를 배정하고 Ticket을 생성했습니다.",
                    classification,
                    routing,
                    null,
                    null,
                    ticket
            );
        }

        return new AskResponse(
                ResolutionMode.GUIDE,
                "Ticket 없이 안내로 해결할 수 있습니다.",
                "시스템, 모듈, 처리 절차를 안내합니다.",
                classification,
                routing,
                guideFor(classification, routing),
                null,
                null
        );
    }

    private GuidePayload guideFor(ClassificationResult classification, RoutingTarget routing) {
        return new GuidePayload(
                businessServiceName(classification.businessServiceId()),
                applicationName(classification.applicationId()),
                moduleName(classification.moduleId()),
                List.of(
                        "Internal Portal에서 ERP 업무 메뉴를 엽니다.",
                        "ERP > MM > 업체등록 메뉴로 이동합니다.",
                        "신규 업체 기본정보와 필요 첨부파일을 확인합니다.",
                        "권한 또는 예외 상황은 공식 담당 조직으로 문의합니다."
                ),
                organizationName(routing.organizationId())
        );
    }

    private String businessServiceName(String id) {
        return businessServices.stream().filter(item -> item.id().equals(id)).findFirst().map(BusinessService::name).orElse(id);
    }

    private String applicationName(String id) {
        return applications.stream().filter(item -> item.id().equals(id)).findFirst().map(Application::name).orElse(id);
    }

    private String moduleName(String id) {
        if (id == null) {
            return null;
        }
        return modules.stream().filter(item -> item.id().equals(id)).findFirst().map(ApplicationModule::code).orElse(id);
    }

    private String organizationName(String id) {
        return organizations.stream().filter(item -> item.id().equals(id)).findFirst().map(Organization::name).orElse(id);
    }
}
