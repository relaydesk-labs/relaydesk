package io.relaydesk.data;

import io.relaydesk.data.DataProductModels.DataProductResult;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class DataProductService {
    public DataProductResult queryNewMembersLastMonth(String tenantId) {
        return new DataProductResult(
                "dp-member-growth",
                "지난달 신규회원 수",
                List.of("month", "newMembers", "channel"),
                List.of(
                        Map.of("month", "2026-07", "newMembers", 1240, "channel", "Web"),
                        Map.of("month", "2026-07", "newMembers", 430, "channel", "Mobile"),
                        Map.of("month", "2026-07", "newMembers", 95, "channel", "Partner")
                )
        );
    }
}
