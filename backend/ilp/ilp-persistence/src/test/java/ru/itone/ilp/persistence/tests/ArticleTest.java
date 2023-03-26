package ru.itone.ilp.persistence.tests;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import ru.itone.ilp.persistence.entities.Article;
import ru.itone.ilp.persistence.repositories.ArticleRepository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@Slf4j
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class ArticleTest extends AbstractPersistenceTest {

    @Autowired
    ArticleRepository articleRepository;

    @Test
    @Order(1)
    void testCreateArticle() {
        Article article = new Article()
            .setName("Футболка")
            .setPrice(10L)
            .setExists(true)
            .setDescription("Футболка черная с принтом")
            .setImgLink("/img/thirt_black/1.img")
            .setAttribute("""
                {
                    "images": ["/img/thirt_black/2.img", "/img/thirt_black/3.img", "/img/thirt_black/4.img"]
                }
                """);

        Article save = articleRepository.save(article);
        assertNotNull(save);
        assertEquals(1L, save.getId());
    }

    @Test
    @Order(2)
    void testFindAllArticle() {
        var articles = articleRepository.findAll();
        assertEquals(1L, articles.size());
        assertEquals(1L, articles.get(0).getId());
        log.info(articles.get(0).getAttribute());
    }

    @Test
    @Order(3)
    void testUpdateArticle() {
        var article = articleRepository.findById(1L).orElseThrow();
        article.setExists(false);
        Article save = articleRepository.save(article);
        assertFalse(save.getExists());
    }
}
