package ru.itone.ilp.persistence.repositories;

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
                            LIMIT 50
        """;

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    @Query(value = SEARCH_USER, nativeQuery = true)
    List<User> searchByText(@Param("text") String text);
}
