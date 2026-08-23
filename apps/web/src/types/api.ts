export type ResolutionMode = "GUIDE" | "SELF_SERVICE" | "TICKET";

export interface ClassificationResult {
  resolutionMode: ResolutionMode;
  requestType: string;
  businessServiceId: string;
  applicationId: string;
  moduleId: string | null;
  confidence: number;
  reason: string;
}

export interface TicketHistory {
  id: string;
  eventType: string;
  message: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  requestType: string;
  status: string;
  ownerOrganizationId: string;
  ownerPersonId: string;
  history: TicketHistory[];
}

export interface GuidePayload {
  businessService: string;
  application: string;
  module: string | null;
  steps: string[];
  ownerOrganization: string;
}

export interface DataProductResult {
  title: string;
  columns: string[];
  rows: Record<string, string | number>[];
}

export interface AskResponse {
  mode: ResolutionMode;
  title: string;
  summary: string;
  classification: ClassificationResult;
  routing: { organizationId: string; personId: string; matchedRuleId: string | null; fallbackLevel: string } | null;
  guide: GuidePayload | null;
  data: DataProductResult | null;
  ticket: Ticket | null;
}
