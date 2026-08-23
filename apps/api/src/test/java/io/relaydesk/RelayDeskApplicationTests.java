package io.relaydesk;

import io.relaydesk.classification.ResolutionMode;
import io.relaydesk.routing.RoutingService;
import io.relaydesk.ticket.TicketStatus;
import io.relaydesk.web.AskModels.AskResponse;
import io.relaydesk.web.AskService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class RelayDeskApplicationTests {
    @Autowired
    AskService askService;

    @Autowired
    RoutingService routingService;

    @Test
    void incidentCreatesRoutedTicketWithHistory() {
        AskResponse response = askService.ask("ERP 전표 저장이 안돼요.");

        assertThat(response.mode()).isEqualTo(ResolutionMode.TICKET);
        assertThat(response.ticket()).isNotNull();
        assertThat(response.ticket().status()).isEqualTo(TicketStatus.ASSIGNED);
        assertThat(response.ticket().ownerOrganizationId()).isEqualTo("org-erp-ops");
        assertThat(response.ticket().history()).hasSize(3);
    }

    @Test
    void vendorRegistrationReturnsGuideWithoutTicket() {
        AskResponse response = askService.ask("협력사 등록 어디서 해?");

        assertThat(response.mode()).isEqualTo(ResolutionMode.GUIDE);
        assertThat(response.ticket()).isNull();
        assertThat(response.guide().businessService()).isEqualTo("업체등록");
        assertThat(response.guide().module()).isEqualTo("MM");
    }

    @Test
    void memberMetricReturnsDataProductResult() {
        AskResponse response = askService.ask("지난달 신규회원 수 보여줘.");

        assertThat(response.mode()).isEqualTo(ResolutionMode.SELF_SERVICE);
        assertThat(response.ticket()).isNull();
        assertThat(response.data().columns()).contains("newMembers");
        assertThat(response.data().rows()).hasSize(3);
    }
}
