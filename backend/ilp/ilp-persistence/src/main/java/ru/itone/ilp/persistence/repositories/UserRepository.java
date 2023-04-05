package ru.itone.ilp.persistence.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.itone.ilp.persistence.entities.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    String SEARCH_USER = """
            SELECT DISTINCT u.* FROM users u WHERE
                            u.first_name ILIKE %:text% OR
                            u.middle_name ILIKE %:text% OR
                            u.last_name ILIKE %:text% OR
                            u.email ILIKE %:text%
        """;

    String PLAIN_SEARCH = SEARCH_USER + " LIMIT :limit";
    String PAGEABLE_SEARCH = SEARCH_USER + " /*#{#pageable}*/";

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    @Query(value = PLAIN_SEARCH, nativeQuery = true)
    List<User> searchByText(@Param("text") String text, @Param("limit") int limit);

    @Query(value = PAGEABLE_SEARCH, nativeQuery = true)
    Page<User> searchByText(@Param("text") String text, Pageable pageable);
}
