package ru.itone.ilp.persistence.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.itone.ilp.persistence.entities.Accrual;

@Repository
public interface AccrualRepository extends JpaRepository<Accrual, Long> {
    Iterable<Accrual> findAllByUserIdOrderByDateDesc(Long userId);

    Page<Accrual> findAllByUserId(Long userId, Pageable pageable);

}
