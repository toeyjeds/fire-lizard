package com.cashdelivery.gateway.api;

import com.cashdelivery.gateway.dto.ApiResponse;
import com.cashdelivery.gateway.dto.HealthStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<HealthStatus>> health() {
        return ResponseEntity.ok(ApiResponse.success(new HealthStatus("UP")));
    }
}