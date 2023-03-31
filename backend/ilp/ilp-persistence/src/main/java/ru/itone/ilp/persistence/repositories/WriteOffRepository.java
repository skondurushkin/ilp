package ru.itone.ilp.persistence.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.itone.ilp.persistence.entities.User;
import ru.itone.ilp.persistence.entities.WriteOff;

@Repository
public interface WriteOffRepository extends JpaRepository<WriteOff, Long> {

    Iterable<WriteOff> findAllByUserId(Long userId);
    Iterable<WriteOff> findAllByUser(User user);
}
