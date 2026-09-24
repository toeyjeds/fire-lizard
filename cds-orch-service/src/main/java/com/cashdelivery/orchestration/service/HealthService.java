package com.cashdelivery.orchestration.service;

import com.cashdelivery.orchestration.dto.HealthStatus;
import org.springframework.stereotype.Service;

@Service
public class HealthService {

    public HealthStatus currentStatus() {
        return new HealthStatus("UP");
    }
}