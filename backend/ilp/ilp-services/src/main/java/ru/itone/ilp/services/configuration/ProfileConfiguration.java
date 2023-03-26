package ru.itone.ilp.services.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ru.itone.ilp.persistence.repositories.UserRepository;
import ru.itone.ilp.services.profiles.ProfileService;

@Configuration
@RequiredArgsConstructor
public class ProfileConfiguration {
    private final UserRepository userRepository;

    @Bean
    public ProfileService profileService() {
        return new ProfileService(userRepository);
    }
}
