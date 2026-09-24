package com.cashdelivery.orchestration.service;

public interface NotificationService {

    void send(String recipient, String subject, String content);
}