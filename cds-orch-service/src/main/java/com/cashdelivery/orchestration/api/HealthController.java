package com.cashdelivery.orchestration.api;

import com.cashdelivery.orchestration.dto.ApiResponse;
import com.cashdelivery.orchestration.dto.HealthStatus;
import com.cashdelivery.orchestration.service.HealthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    private final HealthService healthService;

    public HealthController(HealthService healthService) {
        this.healthService = healthService;
    }

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<HealthStatus>> health() {
        return ResponseEntity.ok(ApiResponse.success(healthService.currentStatus()));
    }
}