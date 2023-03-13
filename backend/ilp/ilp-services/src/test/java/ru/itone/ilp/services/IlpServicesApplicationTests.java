package ru.itone.ilp.services;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import ru.itone.ilp.services.configuration.GreetingsConfiguration;
import ru.itone.ilp.services.configuration.PersistenceConfiguration;
import ru.itone.ilp.services.greetings.GreetingsService;

@ActiveProfiles("test")
@SpringBootTest
@EnableAutoConfiguration
@ContextConfiguration(classes = {PersistenceConfiguration.class, GreetingsConfiguration.class})
class IlpServicesApplicationTests {

    @Autowired
    GreetingsService greetingsService;

    @Test
    void testGreetings() {
        assertEquals("Hello client!", greetingsService.getDefaultGreeting());
    }

}
