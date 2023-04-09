package ru.itone.ilp.persistence.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.itone.ilp.persistence.entities.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    String SEARCH_ARTICLE = """
        SELECT DISTINCT a.* FROM articles a WHERE
            (a.code ILIKE %:text% OR
            a.name ILIKE %:text% OR
            a.description ILIKE %:text%)
        """;

    String PLAIN_SEARCH = SEARCH_ARTICLE + " LIMIT :limit";
    String PAGEABLE_SEARCH = SEARCH_ARTICLE + " /*#{#pageable}*/";
    String PAGEABLE_ACTIVE_SEARCH = SEARCH_ARTICLE + " AND a.end_date IS NULL /*#{#pageable}*/";

    Optional<Article> findByCode(String code);

    @Query(value = PLAIN_SEARCH, nativeQuery = true)
    List<Article> searchByText(@Param("text") String text, @Param("limit") int limit);

    @Query(value = PAGEABLE_SEARCH, nativeQuery = true)
    Page<Article> searchByText(@Param("text") String text, Pageable pageable);

    @Query(value = PAGEABLE_ACTIVE_SEARCH, nativeQuery = true)
    Page<Article> searchByTextActive(@Param("text") String text, Pageable pageable);

    Page<Article> findAllByEndDateIsNull(Pageable pageable);

    @Modifying
    @Query("update Article ar set ar.endDate = current_date where ar.id = :id")
    void markAsDeleted(@Param("id") Long id);

}
