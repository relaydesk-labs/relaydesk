package io.relaydesk.classification;

import io.relaydesk.ticket.RequestType;
import org.springframework.stereotype.Component;

@Component
public class MockRequestClassifier implements RequestClassifier {
    @Override
    public ClassificationResult classify(String tenantId, String message) {
        String normalized = message == null ? "" : message.toLowerCase();

        if (containsAny(normalized, "지난달", "통계", "신규회원", "회원 수", "데이터")) {
            return new ClassificationResult(
                    ResolutionMode.SELF_SERVICE,
                    RequestType.DATA_REQUEST,
                    "svc-member-analytics",
                    "app-data-portal",
                    null,
                    0.86,
                    "Data Product 후보와 매칭되었습니다."
            );
        }

        if (containsAny(normalized, "협력사", "거래처", "업체 등록", "업체 신규")) {
            return new ClassificationResult(
                    ResolutionMode.GUIDE,
                    RequestType.INQUIRY,
                    "svc-vendor-registration",
                    "app-erp",
                    "mod-erp-mm",
                    0.91,
                    "서비스 별칭이 업체등록 업무와 매칭되었습니다."
            );
        }

        if (containsAny(normalized, "erp", "전표", "저장", "오류", "안돼")) {
            return new ClassificationResult(
                    ResolutionMode.TICKET,
                    RequestType.INCIDENT,
                    "svc-journal-processing",
                    "app-erp",
                    "mod-erp-fi",
                    0.88,
                    "ERP/FI 전표 처리 Incident로 분류되었습니다."
            );
        }

        return new ClassificationResult(
                ResolutionMode.GUIDE,
                RequestType.INQUIRY,
                "svc-it-help",
                "app-internal-portal",
                null,
                0.42,
                "정확한 매칭이 없어 General IT Guide로 안내합니다."
        );
    }

    private boolean containsAny(String value, String... needles) {
        for (String needle : needles) {
            if (value.contains(needle)) {
                return true;
            }
        }
        return false;
    }
}
