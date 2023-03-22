package ru.itone.ilp.services;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import ru.itone.ilp.persistence.entities.Role;
import ru.itone.ilp.persistence.repositories.RoleRepository;
import ru.itone.ilp.services.configuration.GreetingsConfiguration;
import ru.itone.ilp.services.configuration.PersistenceConfiguration;
import ru.itone.ilp.services.greetings.GreetingsService;
import ru.itone.ilp.services.jwt.RefreshTokenService;

@Slf4j
@ActiveProfiles("test")
@SpringBootTest
@ComponentScan({
        "ru.itone.ilp.services.jwt"
})
@EnableAutoConfiguration
@ContextConfiguration(classes = {PersistenceConfiguration.class, GreetingsConfiguration.class})
class IlpServicesApplicationTests {

    @Autowired
    GreetingsService greetingsService;

    @Autowired
    RefreshTokenService refreshTokenService;

    @Autowired
    RoleRepository roleRepository;

    @Test
    void testGreetings() {
        assertEquals("Hello client!", greetingsService.getDefaultGreeting());
    }

    @Test
    void testRoles() {
        List<Role> all = roleRepository.findAll();
        log.info("ROLES: {}", all);
    }
}
