package com.cashdelivery.orchestration.service;

import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

class EmailNotificationServiceTest {

    @Test
    void sendsMessageThroughConfiguredSender() {
        JavaMailSender mailSender = mock(JavaMailSender.class);
        EmailNotificationService service = new EmailNotificationService(mailSender, "sender@example.test");

        service.send("recipient@example.test", "Delivery update", "Your delivery is scheduled.");

        ArgumentCaptor<SimpleMailMessage> messageCaptor = ArgumentCaptor.forClass(SimpleMailMessage.class);
        verify(mailSender).send(messageCaptor.capture());
        SimpleMailMessage message = messageCaptor.getValue();
        assertThat(message.getFrom()).isEqualTo("sender@example.test");
        assertThat(message.getTo()).containsExactly("recipient@example.test");
    }
}