package ru.itone.ilp.persistence.mappers;

import java.time.LocalDate;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Page;
import ru.itone.ilp.openapi.model.ArticleRequest;
import ru.itone.ilp.openapi.model.ArticleResponse;
import ru.itone.ilp.openapi.model.PaginatedArticleResponse;
import ru.itone.ilp.persistence.entities.Article;

@Mapper
public interface ArticleMapper {
    ArticleMapper INSTANCE = Mappers.getMapper(ArticleMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "extension", ignore = true)
    Article articleFromRequest(ArticleRequest request);

    @Mapping(target = "available", expression = "java(this.isAvailable(article))")
    @Mapping(target = "active", expression = "java(this.isActive(article))")
    ArticleResponse articleToResponse(Article article);

    default boolean isAvailable(Article article) {
        return Boolean.TRUE.equals(article.getAvailable()) && isActive(article);
    }

    default boolean isActive(Article article) {
        return article.isActive(LocalDate.now());
    }

    default PaginatedArticleResponse toPaginatedResponse(Page<Article> page) {
        List<ArticleResponse> results = page.getContent().stream().map(this::articleToResponse).toList();
        return new PaginatedArticleResponse()
                .total(page.getTotalPages())
                .page(page.getNumber())
                .pageSize(page.getSize())
                .hasNext(page.hasNext())
                .hasPrev(page.hasPrevious())
                .results(results);
    }
}
