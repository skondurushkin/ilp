package ru.itone.ilp.services.articles;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ru.itone.ilp.openapi.model.ArticleRequest;
import ru.itone.ilp.openapi.model.ArticleResponse;
import ru.itone.ilp.persistence.entities.Article;
import ru.itone.ilp.persistence.mappers.ArticleMapper;
import ru.itone.ilp.persistence.repositories.ArticleRepository;

@Slf4j
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;

    public ArticleResponse createArticle(ArticleRequest request) {
        Article article = ArticleMapper.INSTANCE.articleFromRequest(request);
        article = articleRepository.save(article);
        return toResponse(article);
    }

    public Optional<ArticleResponse> getArticleById(Integer articleId) {
        return articleRepository.findById(articleId.longValue())
                .map(ArticleService::toResponse);
    }

    public Optional<ArticleResponse> getArticleByCode(String code) {
        return articleRepository.findByCode(code)
                .map(ArticleService::toResponse);
    }

    public static ArticleResponse toResponse(Article article) {
        return ArticleMapper.INSTANCE.articleToResponse(article);
    }

}
