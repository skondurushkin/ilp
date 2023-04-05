package ru.itone.ilp.persistence.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.itone.ilp.persistence.entities.Operation;
import ru.itone.ilp.persistence.types.OrderStatus;

@Repository
public interface OperationRepository extends JpaRepository<Operation, Long> {

    Page<Operation> findAllByUserId(Long userId, Pageable pageable);

    Page<Operation> findAllByUserIdAndAccrualNotNullOrWriteOff_OrderStatusNot(Long userId, OrderStatus orderStatus, Pageable pageable);
}
