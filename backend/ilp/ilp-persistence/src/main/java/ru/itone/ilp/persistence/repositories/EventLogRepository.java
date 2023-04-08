package ru.itone.ilp.persistence.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.itone.ilp.persistence.entities.EventLog;
import ru.itone.ilp.persistence.types.EventType;

@Repository
public interface EventLogRepository extends JpaRepository<EventLog, Long> {

    @Query(value = "select 1 from event_log el where user_id=:userId and ev_type = :evType fetch first 1 rows only", nativeQuery = true)
    Optional<Integer> eventExists(@Param("userId") Long userId, @Param("evType") String evType);
    default boolean firstLogin(Long userId) {
        return eventExists(userId, EventType.LOGIN.getValue()).isEmpty();
    }
}
