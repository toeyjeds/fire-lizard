package com.cashdelivery.gateway.service;

import com.cashdelivery.gateway.config.GatewayRateLimitProperties;
import io.github.resilience4j.ratelimiter.RateLimiter;
import io.github.resilience4j.ratelimiter.RateLimiterConfig;
import java.time.Duration;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Service;

@Service
public class RateLimitService {

    private final ConcurrentHashMap<String, RateLimiter> rateLimiters = new ConcurrentHashMap<>();
    private final GatewayRateLimitProperties properties;

    public RateLimitService(GatewayRateLimitProperties properties) {
        this.properties = properties;
    }

    public boolean tryAcquire(String clientAndRoute) {
        return rateLimiters.computeIfAbsent(clientAndRoute, this::newRateLimiter).acquirePermission();
    }

    private RateLimiter newRateLimiter(String name) {
        RateLimiterConfig configuration = RateLimiterConfig.custom()
                .limitForPeriod(properties.getRequestsPerSecond())
                .limitRefreshPeriod(Duration.ofSeconds(1))
                .timeoutDuration(Duration.ZERO)
                .build();
        return RateLimiter.of(name, configuration);
    }
}