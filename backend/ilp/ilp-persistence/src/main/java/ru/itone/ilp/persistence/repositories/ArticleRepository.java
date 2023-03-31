package ru.itone.ilp.persistence.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.itone.ilp.persistence.entities.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    String SEARCH_ARTICLE = """
        SELECT DISTINCT a.* FROM articles a WHERE
            a.code ILIKE %:text% OR
            a.name ILIKE %:text% OR
            a.description ILIKE %:text%
        LIMIT 50
        """;

    Optional<Article> findByCode(String code);
    @Query(value = SEARCH_ARTICLE, nativeQuery = true)
    List<Article> searchByText(@Param("text")String text);
}
