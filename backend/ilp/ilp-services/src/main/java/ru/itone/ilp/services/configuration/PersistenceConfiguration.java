package ru.itone.ilp.services.configuration;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@ComponentScan(basePackages = "ru.itone.ilp.persistence")
@EntityScan(basePackages = "ru.itone.ilp.persistence.entities")
@EnableJpaRepositories(basePackages = "ru.itone.ilp.persistence.repositories")
@EnableTransactionManagement
public class PersistenceConfiguration {
}
