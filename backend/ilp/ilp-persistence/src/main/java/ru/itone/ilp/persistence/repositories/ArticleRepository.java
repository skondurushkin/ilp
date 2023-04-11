package ru.itone.ilp.persistence.repositories;

import com.fasterxml.jackson.databind.node.ObjectNode;
import java.time.LocalDate;
import java.time.LocalDateTime;
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

    interface TopArticle {
        Long getId();

        String getCode();

        String getName();

        String getDescription();

        Integer getPrice();

        String getImage_link();

        Boolean getAvailable();

        LocalDate getEnd_date();

        ObjectNode getExtension();

        Integer getCount();
    }

    @Query(nativeQuery = true,
            value =
                    """
                        SELECT a.*, o.count AS count FROM articles a
                        inner join (
                            select wo.article_id AS accid, count(1) AS count from operations ops
                            inner join write_offs wo on (ops.writeoff_id = wo.id and wo.status <> 'cancelled')
                            where ops.type = 'writeOff'
                            and (ops.instant BETWEEN :start and :end)
                            group by wo.article_id
                        ) o on o.accid = a.id
                        /*#{pageable}*/
                    """
    )

    Page<TopArticle> findTop(LocalDateTime start, LocalDateTime end, Pageable pageable);
}
