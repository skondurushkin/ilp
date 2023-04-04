package ru.itone.ilp.services.articles;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import ru.itone.ilp.openapi.model.ArticleRequest;
import ru.itone.ilp.openapi.model.ArticleResponse;
import ru.itone.ilp.openapi.model.ArticleUpdateRequest;
import ru.itone.ilp.openapi.model.PageRequest;
import ru.itone.ilp.openapi.model.PaginatedArticleResponse;
import ru.itone.ilp.persistence.api.DbApi.DbApiException;
import ru.itone.ilp.persistence.entities.Article;
import ru.itone.ilp.persistence.mappers.ArticleMapper;
import ru.itone.ilp.persistence.mappers.PageRequestMapper;
import ru.itone.ilp.persistence.repositories.ArticleRepository;

@Slf4j
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;

    @Transactional(readOnly = true)
    public PaginatedArticleResponse paginate(PageRequest request) {
        Pageable pageable = PageRequestMapper.INSTANCE.toPageable(request);
        Page<Article> page = articleRepository.findAll(pageable);
        return toPaginatedResponse(page);
    }

    @Transactional
    public ArticleResponse createArticle(ArticleRequest request) {
        Article article = ArticleMapper.INSTANCE.articleFromRequest(request);
        article = articleRepository.save(article);
        return toResponse(article);
    }

    @Transactional(readOnly = true)
    public Optional<ArticleResponse> getArticleById(Integer articleId) {
        return articleRepository.findById(articleId.longValue())
                .map(ArticleService::toResponse);
    }

    @Transactional
    public ArticleResponse update(ArticleUpdateRequest request) {
        Article article = articleRepository.findById(request.getId().longValue()).orElseThrow(() -> new DbApiException("Артикул не найден"));
        article = articleRepository.save(
                article.setAmount(request.getPrice())
                        .setCode(request.getCode())
                        .setName(request.getName())
                        .setDescription(request.getDescription())
                        .setAvailable(request.getAvailable())
        );
        return toResponse(article);
    }

    @Transactional
    public void delete(Long articleId) {
        articleRepository.deleteById(articleId);
    }

    @Transactional(readOnly = true)
    public Optional<ArticleResponse> getArticleByCode(String code) {
        return articleRepository.findByCode(code)
                .map(ArticleService::toResponse);
    }

    @Transactional(readOnly = true)
    public List<ArticleResponse> searchArticleByText(String text) {
        return articleRepository.searchByText(text).stream()
            .map(ArticleService::toResponse)
            .toList();
    }

    public static ArticleResponse toResponse(Article article) {
        return ArticleMapper.INSTANCE.articleToResponse(article);
    }
    public static PaginatedArticleResponse toPaginatedResponse(Page<Article> page) {
        return ArticleMapper.INSTANCE.toPaginatedResponse(page);
    }
}
