package ru.itone.ilp.services.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import ru.itone.ilp.persistence.api.DbApi;
import ru.itone.ilp.persistence.repositories.EventLogRepository;
import ru.itone.ilp.persistence.repositories.RoleRepository;
import ru.itone.ilp.persistence.repositories.UserRepository;
import ru.itone.ilp.services.profiles.ProfileService;
import ru.itone.ilp.services.wallet.WalletService;

@Configuration
@RequiredArgsConstructor
@Import(WalletConfiguration.class)
public class ProfileConfiguration {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final EventLogRepository eventLogRepository;
    private final DbApi dbApi;

    @Bean
    public ProfileService profileService(WalletService walletService) {
        return new ProfileService(userRepository, roleRepository, eventLogRepository,  dbApi, walletService);
    }
}
