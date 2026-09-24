package com.cashdelivery.orchestration.repository;

import com.cashdelivery.orchestration.model.DeliveryOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeliveryOrderRepository extends JpaRepository<DeliveryOrder, Long> {
}