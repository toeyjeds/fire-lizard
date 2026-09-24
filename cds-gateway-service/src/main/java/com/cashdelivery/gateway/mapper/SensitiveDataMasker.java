package com.cashdelivery.gateway.mapper;

import org.springframework.stereotype.Component;

@Component
public class SensitiveDataMasker {

    public String maskEmail(String email) {
        int atIndex = email.indexOf('@');
        if (atIndex <= 1) {
            return "***";
        }
        return email.charAt(0) + "***" + email.substring(atIndex);
    }
}