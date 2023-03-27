package ru.itone.ilp.persistence.tests;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.node.ObjectNode;
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
    void testCreateArticle() throws JsonProcessingException {
        Article article = new Article()
                .setCode("t-shirt-black")
            .setName("Футболка")
            .setPrice(10)
            .setAvailable(true)
            .setDescription("Футболка черная с принтом")
            .setImageLink("/img/t-shirt_black/1.img")
            .setExtension(objectMapper.readValue("""
                {
                    "images": ["/img/t-shirt_black/2.img", "/img/t-shirt_black/3.img", "/img/t-shirt_black/4.img"]
                }
                """, ObjectNode.class));

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
        log.info(articles.get(0).getExtension().toString());
    }

    @Test
    @Order(3)
    void testUpdateArticle() {
        var article = articleRepository.findById(1L).orElseThrow();
        article.setAvailable(false);
        Article save = articleRepository.save(article);
        assertFalse(save.getAvailable());
    }
}
