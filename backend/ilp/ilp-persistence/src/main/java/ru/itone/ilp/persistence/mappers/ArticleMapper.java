package ru.itone.ilp.persistence.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import ru.itone.ilp.openapi.model.ArticleRequest;
import ru.itone.ilp.openapi.model.ArticleResponse;
import ru.itone.ilp.persistence.entities.Article;

@Mapper
public interface ArticleMapper {
    ArticleMapper INSTANCE = Mappers.getMapper(ArticleMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "imageLink", ignore = true)
    @Mapping(target = "extension", ignore = true)
    Article articleFromRequest(ArticleRequest request);

    ArticleResponse articleToResponse(Article article);
}
