package com.cashdelivery.gateway.service;

import com.cashdelivery.gateway.config.GatewayRateLimitProperties;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class RateLimitServiceTest {

    @Test
    void rejectsRequestsAboveConfiguredLimit() {
        GatewayRateLimitProperties properties = new GatewayRateLimitProperties();
        properties.setRequestsPerSecond(1);
        RateLimitService service = new RateLimitService(properties);

        assertThat(service.tryAcquire("client:/api/v1/orders")).isTrue();
        assertThat(service.tryAcquire("client:/api/v1/orders")).isFalse();
    }
}