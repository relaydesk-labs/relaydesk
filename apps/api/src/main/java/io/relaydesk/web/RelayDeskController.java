package io.relaydesk.web;

import io.relaydesk.seed.DemoSeedConfig;
import io.relaydesk.ticket.TicketModels.Ticket;
import io.relaydesk.ticket.TicketService;
import io.relaydesk.ticket.TicketStatus;
import io.relaydesk.web.AskModels.AskRequest;
import io.relaydesk.web.AskModels.AskResponse;
import io.relaydesk.web.AskModels.StatusUpdateRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class RelayDeskController {
    private final String tenantId;
    private final AskService askService;
    private final TicketService ticketService;

    public RelayDeskController(
            @Value("${relaydesk.tenant-id:" + DemoSeedConfig.TENANT_ID + "}") String tenantId,
            AskService askService,
            TicketService ticketService
    ) {
        this.tenantId = tenantId;
        this.askService = askService;
        this.ticketService = ticketService;
    }

    @GetMapping("/health")
    public String health() {
        return "ok";
    }

    @PostMapping("/ask")
    public AskResponse ask(@Valid @RequestBody AskRequest request) {
        return askService.ask(request.message());
    }

    @GetMapping("/tickets")
    public List<Ticket> tickets() {
        return ticketService.findByTenant(tenantId);
    }

    @PatchMapping("/tickets/{ticketId}/status")
    public Ticket updateStatus(@PathVariable String ticketId, @RequestBody StatusUpdateRequest request) {
        return ticketService.transition(tenantId, ticketId, TicketStatus.valueOf(request.status()));
    }
}
