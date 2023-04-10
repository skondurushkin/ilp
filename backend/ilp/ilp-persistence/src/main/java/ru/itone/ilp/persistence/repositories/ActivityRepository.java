package ru.itone.ilp.persistence.repositories;

import com.fasterxml.jackson.databind.node.ObjectNode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.itone.ilp.persistence.entities.Activity;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {

    String SEARCH_ACTIVITY = """
            SELECT DISTINCT a.* FROM activities a WHERE
            a.name ILIKE %:text% OR
            a.description ILIKE %:text%
        """;

    String PLAIN_SEARCH = SEARCH_ACTIVITY + " LIMIT :limit";
    String PAGEABLE_SEARCH = SEARCH_ACTIVITY + " /*#{#pageable}*/";

    @Query(value = PLAIN_SEARCH, nativeQuery = true)
    List<Activity> searchByText(@Param("text") String text, @Param("limit") int limit);

    @Query(value = PAGEABLE_SEARCH, nativeQuery = true)
    Page<Activity> searchByText(@Param("text") String text, Pageable pageable);

    Page<Activity> findAllByIdNot(@Param("id")Long id, Pageable pageable);

    @Modifying
    @Query("update Activity ac set ac.endDate = current_date where ac.id = :id")
    void markAsDeleted(@Param("id") Long id);


    interface TopActivity {
        Long getId();
        String getName();
        String getDescription();
        Integer getPrice();

        LocalDate getStart_date();

        LocalDate getEnd_date();

        String getInfo_link();

        ObjectNode getExtension();

        Integer getCount();
    }

    @Query(nativeQuery = true,
            value =
            """
                SELECT a.*, o.count AS count FROM activities a 
                inner join (
                    select a2.activity_id AS accid, count(1) AS count from operations ops
                    inner join accruals a2 on (ops.accrual_id = a2.id and a2.status = 'created')
                    where ops.type = 'accrual' 
                    and (ops.instant BETWEEN :start and :end)
                    group by a2.activity_id
                ) o on o.accid = a.id
                /*#{pageable}*/ 
            """
    )
    Page<TopActivity> findTop(
            @Param("start") LocalDateTime start,
            @Param("end")   LocalDateTime end,
            Pageable pageable
    );
}
