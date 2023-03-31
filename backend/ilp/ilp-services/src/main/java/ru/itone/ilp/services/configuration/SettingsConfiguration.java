package ru.itone.ilp.services.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import ru.itone.ilp.persistence.repositories.SettingsRepository;
import ru.itone.ilp.services.settings.SettingsService;

@Configuration
@RequiredArgsConstructor
@Import(PersistenceConfiguration.class)
public class SettingsConfiguration {

    private final SettingsRepository settingsRepository;

    @Bean
    public SettingsService settingsService() {
        return new SettingsService(settingsRepository);
    }
}
