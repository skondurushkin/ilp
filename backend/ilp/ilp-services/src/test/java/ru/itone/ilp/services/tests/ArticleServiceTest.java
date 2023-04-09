package ru.itone.ilp.services.tests;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import ru.itone.ilp.openapi.model.PageRequest;
import ru.itone.ilp.openapi.model.PageRequestConfig;
import ru.itone.ilp.openapi.model.PaginatedArticleResponse;
import ru.itone.ilp.services.articles.ArticleService;
import ru.itone.ilp.services.configuration.ServicesTestConfiguration;

@Slf4j
class ArticleServiceTest extends ServicesTestConfiguration {

    @Autowired
    ArticleService articleService;

    @Test
    void testArticlePaginate() {
        PageRequest request = new PageRequest().page(0).pageSize(2).config(new PageRequestConfig());
        PaginatedArticleResponse response = articleService.paginate(request);
        log.info("RESPONSE: {}", response);
        assertTrue(response.getHasNext());

    }

    @Test
    void testArticlePaginateActive() {
        articleService.delete(1L);
        PageRequest request = new PageRequest().page(0).pageSize(2).config(new PageRequestConfig());
        PaginatedArticleResponse response = articleService.paginateActive(request);
        log.info("RESPONSE: {}", response);
        assertFalse(response.getHasNext());

    }
}
