package ru.itone.ilp.persistence.tests;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest(
        webEnvironment = WebEnvironment.NONE,
        properties = {
            "spring.config.location=classpath:persistence-test.yml"
        }
)
@EntityScan(basePackages = "ru.itone.ilp.persistence.entities")
@EnableJpaRepositories(basePackages = "ru.itone.ilp.persistence.repositories")
@EnableTransactionManagement
@Testcontainers
public abstract class AbstractPersistenceTest {

}
