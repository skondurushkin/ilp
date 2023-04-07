package ru.itone.ilp.services.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import ru.itone.ilp.persistence.api.DbJpa;
import ru.itone.ilp.services.filestore.ExtensionService;

@Configuration
@RequiredArgsConstructor
@Import(PersistenceConfiguration.class)
public class ExtensionConfiguration {
    private final DbJpa dbJpa;

    @Bean
    public ExtensionService extensionService() {
        return new ExtensionService(dbJpa);
    }
}
