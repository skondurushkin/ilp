package ru.itone.ilp.persistence.repositories;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.itone.ilp.persistence.entities.Operation;

@Repository
public interface OperationRepository extends JpaRepository<Operation, Long> {

    Page<Operation> findAllByUserId(Long userId, Pageable pageable);
    Page<Operation> findAllByUserIdAndActiveTrue(Long userId, Pageable pageable);

    @Query("select op from Operation op where op.instant >= :start and op.instant < :end ORDER BY op.instant asc")
    List<Operation> findAllInTimeRange(
            @Param("start") Instant start,
            @Param("end") Instant end);

    @Query("select op.accrual.id from Operation op where op.id = :operationId and op.type = 'accrual'")
    Optional<Long> getAccrualId(@Param("operationId") Long operationId);

    @Query("select op from Operation op where op.type = 'writeOff'")
    List<Operation> selectWriteOffs(Sort sort);

}
