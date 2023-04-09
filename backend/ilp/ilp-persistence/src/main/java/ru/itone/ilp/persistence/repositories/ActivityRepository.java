package ru.itone.ilp.persistence.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.itone.ilp.persistence.entities.Activity;

import java.util.List;

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

}
