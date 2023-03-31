package ru.itone.ilp.persistence.repositories;

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
        LIMIT 50
        """;

    @Query(value = SEARCH_ACTIVITY, nativeQuery = true)
    List<Activity> searchByText(@Param("text") String text);


}
