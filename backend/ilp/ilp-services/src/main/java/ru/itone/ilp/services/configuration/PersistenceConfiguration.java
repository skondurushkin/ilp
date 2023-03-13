package ru.itone.ilp.services.configuration;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EntityScan(basePackages = "ru.itone.ilp.persistence")
@EnableJpaRepositories(basePackages = "ru.itone.ilp.persistence")
@EnableTransactionManagement
public class PersistenceConfiguration {
}
