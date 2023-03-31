package ru.itone.ilp.services.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import ru.itone.ilp.persistence.repositories.AccrualRepository;
import ru.itone.ilp.persistence.repositories.WriteOffRepository;
import ru.itone.ilp.services.wallet.WalletService;

@Configuration
@RequiredArgsConstructor
@Import(PersistenceConfiguration.class)
public class WalletConfiguration {
    private final AccrualRepository accrualRepository;
    private final WriteOffRepository writeOffRepository;

    @Bean
    public WalletService walletService() {
        return new WalletService(accrualRepository, writeOffRepository);
    }
}
