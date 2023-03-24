package ru.itone.ilp.persistence;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@ActiveProfiles("test")
@SpringBootApplication
@EntityScan(basePackages = "ru.itone.ilp.persistence.entities")
@EnableJpaRepositories(basePackages = "ru.itone.ilp.persistence.repositories")
@EnableTransactionManagement
public class TestConfiguration {
}
