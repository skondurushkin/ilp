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

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

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
    }

    @Test
    @Order(2)
    void testFindAllArticle() {
        var articles = articleRepository.findByCode("t-shirt-black");
        assertTrue(articles.isPresent());
        assertEquals("Футболка", articles.get().getName());
        log.info(articles.get().getExtension().toString());
    }

    @Test
    @Order(3)
    void testUpdateArticle() {
        var article = articleRepository.findByCode("t-shirt-black").orElseThrow();
        article.setAvailable(false);
        articleRepository.save(article);
        article = articleRepository.findByCode("t-shirt-black").orElseThrow();
        assertFalse(article.getAvailable());
    }

    @Test
    @Order(4)
    void testContextSearch() throws JsonProcessingException {
        Article article = new Article()
            .setCode("t-shirt-red")
            .setName("Футболка")
            .setPrice(10)
            .setAvailable(true)
            .setDescription("Футболка красная с принтом")
            .setImageLink("/img/t-shirt_red/1.img")
            .setExtension(objectMapper.readValue("""
                {
                    "images": ["/img/t-shirt_red/2.img", "/img/t-shirt_red/3.img", "/img/t-shirt_red/4.img"]
                }
                """, ObjectNode.class));
        articleRepository.save(article);

        var text = "фу";
        List<Article> articles = articleRepository.searchByText(text);
        assertEquals(3, articles.size());  //3, т.к. в миграциях добавили 1 футболку
    }
}
