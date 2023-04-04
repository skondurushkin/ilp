package ru.itone.ilp.persistence.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.itone.ilp.persistence.entities.Operation;

@Repository
public interface OperationRepository extends JpaRepository<Operation, Long> {

    Page<Operation> findAllByUserId(Long userId, Pageable pageable);
}
