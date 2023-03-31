package ru.itone.ilp.services.configuration;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.testcontainers.junit.jupiter.Testcontainers;

@Slf4j
@ActiveProfiles("test")
@SpringBootTest(webEnvironment = WebEnvironment.NONE)
@EnableAutoConfiguration
@EnableTransactionManagement
@ContextConfiguration(classes = {
        PersistenceConfiguration.class,
        ActivityConfiguration.class,
        ProfileConfiguration.class,
        ArticleConfiguration.class,
        SettingsConfiguration.class,
        WalletConfiguration.class
})
@Testcontainers
public abstract class ServicesTestConfiguration {
}
