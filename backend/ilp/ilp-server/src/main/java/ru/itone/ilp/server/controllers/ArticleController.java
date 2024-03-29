package ru.itone.ilp.server.controllers;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpServerErrorException;
import ru.itone.ilp.exception.ApiExceptions;
import ru.itone.ilp.openapi.api.ArticleApi;
import ru.itone.ilp.openapi.model.ArticleDeleteRequest;
import ru.itone.ilp.openapi.model.ArticleRequest;
import ru.itone.ilp.openapi.model.ArticleResponse;
import ru.itone.ilp.openapi.model.ArticleUpdateRequest;
import ru.itone.ilp.openapi.model.PageRequest;
import ru.itone.ilp.openapi.model.PaginatedArticleResponse;
import ru.itone.ilp.services.articles.ArticleService;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ArticleController extends LinkResolver implements ArticleApi {

    private final ArticleService articleService;

    @Override
    public ResponseEntity<PaginatedArticleResponse> browseArticles(PageRequest pageRequest) {
        return ResponseEntity.ok(resolveLinks(articleService.paginateActive(pageRequest)));
    }

    @Override
    @Secured("hasRole('ADMIN')")
    public ResponseEntity<ArticleResponse> createArticle(ArticleRequest articleRequest) {
        return Optional.ofNullable(articleService.createArticle(relativizeLink(articleRequest))).map(this::resolveLink)
                .map(a -> new ResponseEntity<>(a, HttpStatus.CREATED))
                .orElseThrow(() -> new HttpServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR));
    }

    @Override
    @Secured("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteArticle(ArticleDeleteRequest articleDeleteRequest) {
        articleService.delete(articleDeleteRequest.getId().longValue());
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<ArticleResponse> getArticleById(Integer articleId) {
        return articleService.getArticleById(articleId).map(this::resolveLink).map(ResponseEntity::ok)
                .orElseThrow(() -> new ApiExceptions.ResourceNotFoundException("Article record not found."));
    }

    @Override
    public ResponseEntity<List<ArticleResponse>> searchArticles(String searchKey) {
        return ResponseEntity.ok(resolveLinks(articleService.searchArticleByText(searchKey)));
    }

    @Override
    @Secured("hasRole('ADMIN')")
    public ResponseEntity<ArticleResponse> updateArticle(ArticleUpdateRequest articleUpdateRequest) {
        return ResponseEntity.ok(resolveLink(articleService.update(relativizeLink(articleUpdateRequest))));
    }

    private ArticleRequest relativizeLink(ArticleRequest articleRequest) {
        return articleRequest.imageLink(relativize(articleRequest.getImageLink()));
    }

    private ArticleUpdateRequest relativizeLink(ArticleUpdateRequest articleRequest) {
        return articleRequest.imageLink(relativize(articleRequest.getImageLink()));
    }


    ArticleResponse resolveLink(ArticleResponse response) {
        return response.imageLink(resolve(response.getImageLink()));
    }

    List<ArticleResponse> resolveLinks(List<ArticleResponse> articles) {
        if (!CollectionUtils.isEmpty(articles)) {
            articles.forEach(this::resolveLink);
        }
        return articles;
    }

    PaginatedArticleResponse resolveLinks(PaginatedArticleResponse page) {
        resolveLinks(page.getResults());
        return page;
    }
}
