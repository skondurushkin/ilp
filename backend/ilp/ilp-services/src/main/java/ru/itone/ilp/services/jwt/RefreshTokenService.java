package ru.itone.ilp.services.jwt;

import java.time.Duration;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Import;
import org.springframework.context.event.EventListener;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import ru.itone.ilp.exception.ApiExceptions.TokenRefreshException;
import ru.itone.ilp.persistence.entities.RefreshToken;
import ru.itone.ilp.persistence.entities.User;
import ru.itone.ilp.persistence.repositories.RefreshTokenRepository;
import ru.itone.ilp.persistence.repositories.UserRepository;
import ru.itone.ilp.services.configuration.PersistenceConfiguration;

@Slf4j
@Service
@Import({PersistenceConfiguration.class})
@RequiredArgsConstructor
public class RefreshTokenService {
    @Value("${jwt.tokenDuration:PT30M}")
    @Getter
    private Duration tokenDuration;
    @Value("${jwt.refreshDuration:PT12H}")
    @Getter
    private Duration refreshTokenDuration;

    private final RefreshTokenRepository refreshTokenRepository;

    private final UserRepository userRepository;

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void onReady() {
        if (refreshTokenDuration.compareTo(tokenDuration) < 0) {
           refreshTokenDuration = Duration.ofMillis(tokenDuration.toMillis() * 2);
           log.warn("Updating jwt.refreshDuration to {}", refreshTokenDuration.toString());
        }
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public RefreshToken createRefreshToken(String subject, Instant expiration) {
        User user = userRepository.findByEmail(subject)
                .orElseThrow( () -> new UsernameNotFoundException("User not found in database"));
        Iterable<RefreshToken> allExisting = refreshTokenRepository.findByUser(user);
        for (RefreshToken existingToken : allExisting) {
            if (existingToken.getExpiryTs().compareTo(Instant.now()) > 0 &&
                    existingToken.getExpiryTs().compareTo(expiration) > 0) {
                return existingToken;
            }
        }

        RefreshToken refreshToken = new RefreshToken();

        refreshToken.setUser(user);
        refreshToken.setExpiryTs(Instant.now().plusMillis(refreshTokenDuration.toMillis()));
        refreshToken.setToken(UUID.randomUUID().toString());

        refreshTokenRepository.deleteByUser(user);
        refreshToken = refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryTs().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException(token.getToken(), "Refresh token was expired. Please login again");
        }

        return token;
    }

    @Transactional
    public int deleteByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow( () -> new UsernameNotFoundException("User not found in database"));
        return refreshTokenRepository.deleteByUser(user);
    }
}
