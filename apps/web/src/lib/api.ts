import type { AskResponse, Ticket } from "../types/api";

const demoTickets: Ticket[] = [];

export async function askRelayDesk(message: string): Promise<AskResponse> {
  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      throw new Error("RelayDesk API request failed");
    }

    return response.json();
  } catch {
    return mockAskResponse(message);
  }
}

export async function getTickets(): Promise<Ticket[]> {
  try {
    const response = await fetch("/api/tickets");
    if (!response.ok) {
      throw new Error("Ticket API request failed");
    }
    return response.json();
  } catch {
    return demoTickets;
  }
}

function mockAskResponse(message: string): AskResponse {
  const normalized = message.toLowerCase();
  if (normalized.includes("지난달") || normalized.includes("통계") || normalized.includes("신규회원")) {
    return {
      mode: "SELF_SERVICE",
      title: "Data Self-Service로 해결할 수 있습니다.",
      summary: "허용된 Data Product 기준으로 데모 데이터를 조회했습니다.",
      classification: {
        resolutionMode: "SELF_SERVICE",
        requestType: "DATA_REQUEST",
        businessServiceId: "svc-member-analytics",
        applicationId: "app-data-portal",
        moduleId: null,
        confidence: 0.86,
        reason: "Data Product 후보와 매칭되었습니다."
      },
      routing: null,
      guide: null,
      data: {
        title: "지난달 신규회원 수",
        columns: ["month", "newMembers", "channel"],
        rows: [
          { month: "2026-07", newMembers: 1240, channel: "Web" },
          { month: "2026-07", newMembers: 430, channel: "Mobile" },
          { month: "2026-07", newMembers: 95, channel: "Partner" }
        ]
      },
      ticket: null
    };
  }

  if (normalized.includes("협력사") || normalized.includes("거래처") || normalized.includes("업체")) {
    return {
      mode: "GUIDE",
      title: "Ticket 없이 안내로 해결할 수 있습니다.",
      summary: "시스템, 모듈, 처리 절차를 안내합니다.",
      classification: {
        resolutionMode: "GUIDE",
        requestType: "INQUIRY",
        businessServiceId: "svc-vendor-registration",
        applicationId: "app-erp",
        moduleId: "mod-erp-mm",
        confidence: 0.91,
        reason: "서비스 별칭이 업체등록 업무와 매칭되었습니다."
      },
      routing: {
        organizationId: "org-erp-ops",
        personId: "person-demo-agent-a",
        matchedRuleId: "route-vendor-inquiry",
        fallbackLevel: "Service + RequestType"
      },
      guide: {
        businessService: "업체등록",
        application: "ERP",
        module: "MM",
        ownerOrganization: "ERP Operations",
        steps: [
          "Internal Portal에서 ERP 업무 메뉴를 엽니다.",
          "ERP > MM > 업체등록 메뉴로 이동합니다.",
          "신규 업체 기본정보와 필요 첨부파일을 확인합니다.",
          "권한 또는 예외 상황은 공식 담당 조직으로 문의합니다."
        ]
      },
      data: null,
      ticket: null
    };
  }

  const ticket: Ticket = {
    id: `INC-${Date.now()}`,
    title: message || "ERP 전표 저장 오류",
    description: message || "ERP 전표 저장이 안돼요.",
    requestType: "INCIDENT",
    status: "ASSIGNED",
    ownerOrganizationId: "org-erp-ops",
    ownerPersonId: "person-demo-agent-a",
    history: [
      { id: crypto.randomUUID(), eventType: "REQUEST_RECEIVED", message: "요청이 접수되었습니다.", createdAt: new Date().toISOString() },
      { id: crypto.randomUUID(), eventType: "REQUEST_CLASSIFIED", message: "ERP/FI 전표 처리 Incident로 분류되었습니다.", createdAt: new Date().toISOString() },
      { id: crypto.randomUUID(), eventType: "ROUTED", message: "Routing matched: Service + Module + RequestType", createdAt: new Date().toISOString() }
    ]
  };
  demoTickets.unshift(ticket);

  return {
    mode: "TICKET",
    title: "담당자 처리가 필요한 요청입니다.",
    summary: "Routing Rule에 따라 담당 조직과 담당자를 배정하고 Ticket을 생성했습니다.",
    classification: {
      resolutionMode: "TICKET",
      requestType: "INCIDENT",
      businessServiceId: "svc-journal-processing",
      applicationId: "app-erp",
      moduleId: "mod-erp-fi",
      confidence: 0.88,
      reason: "ERP/FI 전표 처리 Incident로 분류되었습니다."
    },
    routing: {
      organizationId: "org-erp-ops",
      personId: "person-demo-agent-a",
      matchedRuleId: "route-erp-fi-incident",
      fallbackLevel: "Service + Module + RequestType"
    },
    guide: null,
    data: null,
    ticket
  };
}
