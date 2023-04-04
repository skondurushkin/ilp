package ru.itone.ilp.services.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import javax.sql.DataSource;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import ru.itone.ilp.persistence.api.DbApi;
import ru.itone.ilp.persistence.api.DbJpa;
import ru.itone.ilp.persistence.repositories.AccrualRepository;
import ru.itone.ilp.persistence.repositories.ActivityRepository;
import ru.itone.ilp.persistence.repositories.ArticleRepository;
import ru.itone.ilp.persistence.repositories.OperationRepository;
import ru.itone.ilp.persistence.repositories.UserRepository;
import ru.itone.ilp.persistence.repositories.WriteOffRepository;
import ru.itone.ilp.services.wallet.WalletService;

@Configuration
@RequiredArgsConstructor
@Import(PersistenceConfiguration.class)
public class WalletConfiguration {

    private final ObjectMapper objectMapper;
    private final DataSource dataSource;

    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;
    private final ArticleRepository articleRepository;
    private final OperationRepository operationRepository;
    private final AccrualRepository accrualRepository;
    private final WriteOffRepository writeOffRepository;

    @Bean
    public DbApi dbApi() {
        return new DbApi(objectMapper, dataSource);
    }

    @Bean
    public DbJpa dbJpa() {
        return new DbJpa(userRepository, activityRepository, articleRepository, operationRepository, accrualRepository, writeOffRepository);
    }

    @Bean
    public WalletService walletService() {
        return new WalletService(dbApi(), dbJpa());
    }
}
