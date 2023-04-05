package ru.itone.ilp.persistence.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.itone.ilp.persistence.entities.WriteOff;
import ru.itone.ilp.persistence.types.OrderStatus;

@Repository
public interface WriteOffRepository extends JpaRepository<WriteOff, Long> {

    Page<WriteOff> findAllByUserId(Long userId, Pageable pageable);
    Page<WriteOff> findAllByUserIdAndOrderStatusNot(Long userId, OrderStatus orderStatus, Pageable pageable);
}
