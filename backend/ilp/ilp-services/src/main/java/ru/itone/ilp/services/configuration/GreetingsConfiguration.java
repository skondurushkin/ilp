package ru.itone.ilp.services.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ru.itone.ilp.persistence.repositories.SettingsRepository;
import ru.itone.ilp.services.greetings.GreetingsService;

@Configuration
@RequiredArgsConstructor
public class GreetingsConfiguration {

    private final SettingsRepository settingsRepository;

    @Bean
    public GreetingsService greetingsService() {
        return new GreetingsService(settingsRepository);
    }
}
