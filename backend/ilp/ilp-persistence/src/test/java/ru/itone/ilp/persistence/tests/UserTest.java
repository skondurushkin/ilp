package ru.itone.ilp.persistence.tests;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import ru.itone.ilp.persistence.entities.User;
import ru.itone.ilp.persistence.repositories.UserRepository;

@Slf4j
class UserTest extends AbstractPersistenceTest {
    @Autowired
    UserRepository userRepository;


    @Test
    void testAvatar() {
        User user = userRepository.findById(1L).orElse(null);
        assertNotNull(user);
        assertTrue(StringUtils.hasLength(user.getAvatarLink()));
        log.info("avatar: {}", user.getAvatarLink());
    }
}
