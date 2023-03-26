package ru.itone.ilp.persistence.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.itone.ilp.persistence.entities.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
}
