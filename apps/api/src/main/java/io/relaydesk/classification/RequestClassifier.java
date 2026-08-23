package io.relaydesk.classification;

public interface RequestClassifier {
    ClassificationResult classify(String tenantId, String message);
}
