package ru.itone.ilp.persistence.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.itone.ilp.persistence.entities.Accrual;
import ru.itone.ilp.persistence.entities.User;

@Repository
public interface AccrualRepository extends JpaRepository<Accrual, Long> {
    Iterable<Accrual> findAllByUserIdOrderByDateDesc(Long userId);
    Iterable<Accrual> findAllByUser(User user);
}
