package ru.itone.ilp.services.filestore;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.transaction.annotation.Transactional;
import ru.itone.ilp.openapi.model.EScope;
import ru.itone.ilp.persistence.api.DbJpa;
import ru.itone.ilp.persistence.entities.Activity;
import ru.itone.ilp.persistence.entities.Article;
import ru.itone.ilp.persistence.entities.User;

@Slf4j
@RequiredArgsConstructor
public class ExtensionService {

    private final DbJpa dbJpa;

    @Transactional
    public void setLink(String scopeName, Integer id, String link) {
        EScope scope = EScope.fromValue(StringUtils.lowerCase(scopeName));
        if (scope == EScope.ACTIVITY) {
            Optional<Activity> optActivity = dbJpa.getActivityRepository().findById(id.longValue());
            optActivity.ifPresent( activity ->
                dbJpa.getActivityRepository().save(activity.setInfoLink(link))
            );
        } else if (scope == EScope.ARTICLE) {
            Optional<Article> optArticle = dbJpa.getArticleRepository().findById(id.longValue());
            optArticle.ifPresent(article ->
                dbJpa.getArticleRepository().save(article.setImageLink(link))
            );
        } else if (scope == EScope.PROFILE) {
            Optional<User> optUser = dbJpa.getUserRepository().findById(id.longValue());
            optUser.ifPresent(user ->
                dbJpa.getUserRepository().save(user.setAvatarLink(link))
            );
        }
    }
}
