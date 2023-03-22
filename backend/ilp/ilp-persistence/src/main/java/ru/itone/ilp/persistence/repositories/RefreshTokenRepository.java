package ru.itone.ilp.persistence.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import ru.itone.ilp.persistence.entities.RefreshToken;
import ru.itone.ilp.persistence.entities.User;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String token);

    Iterable<RefreshToken> findByUser(User user);

    @Modifying
    int deleteByUser(User user);
}
