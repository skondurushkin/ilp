package ru.itone.ilp.persistence.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.itone.ilp.persistence.entities.WriteOff;
import ru.itone.ilp.persistence.types.OrderStatus;

import java.util.Collection;

@Repository
public interface WriteOffRepository extends JpaRepository<WriteOff, Long> {

    String SEARCH_WRITE_OFF = """
        SELECT wo.* FROM write_offs wo
            JOIN users u ON u.id = wo.user_id
            JOIN articles a ON a.id = wo.article_id
        WHERE u.first_name ILIKE %:text% OR u.middle_name ILIKE %:text% OR u.last_name ILIKE %:text% OR u.email ILIKE %:text%
           OR a.code ILIKE %:text% OR a.name ILIKE %:text% OR a.description ILIKE %:text%
           OR wo.status\\:\\:text ILIKE %:text%
        """;
    String PAGEABLE_SEARCH = SEARCH_WRITE_OFF + " /*#{#pageable}*/";

    Page<WriteOff> findAllByUserId(Long userId, Pageable pageable);

    Page<WriteOff> findAllByUserIdAndOrderStatusIsIn(Long userId, Collection<OrderStatus> statuses, Pageable pageable);

    @Query(value = PAGEABLE_SEARCH, nativeQuery = true)
    Page<WriteOff> searchByText(@Param("text") String text, Pageable pageable);
}
