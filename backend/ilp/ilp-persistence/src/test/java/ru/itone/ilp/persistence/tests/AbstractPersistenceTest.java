package ru.itone.ilp.persistence.tests;

import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.testcontainers.junit.jupiter.Testcontainers;
import ru.itone.ilp.persistence.TestConfiguration;

@SpringBootTest(properties = {
        "spring.config.location=classpath:persistence-test.yml"
})
@Testcontainers
@ImportAutoConfiguration(TestConfiguration.class)
public abstract class AbstractPersistenceTest {

}
