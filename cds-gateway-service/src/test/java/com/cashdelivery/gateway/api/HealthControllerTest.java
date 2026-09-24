package com.cashdelivery.gateway.api;

import org.junit.jupiter.api.Test;
import org.springframework.test.web.reactive.server.WebTestClient;

class HealthControllerTest {

    private final WebTestClient client = WebTestClient.bindToController(new HealthController()).build();

    @Test
    void returnsUpStatus() {
        client.get().uri("/health")
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$.success").isEqualTo(true)
                .jsonPath("$.data.status").isEqualTo("UP");
    }
}