package ru.itone.ilp.services.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import ru.itone.ilp.persistence.repositories.ArticleRepository;
import ru.itone.ilp.services.articles.ArticleService;

@Configuration
@RequiredArgsConstructor
@Import(PersistenceConfiguration.class)
public class ArticleConfiguration {
    private final ArticleRepository articleRepository;

    @Bean
    public ArticleService articleService() {
        return new ArticleService(articleRepository);
    }
}
