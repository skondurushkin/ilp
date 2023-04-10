package ru.itone.ilp.server.controllers;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RestController;
import ru.itone.ilp.exception.ApiExceptions.ResourceNotFoundException;
import ru.itone.ilp.openapi.api.AdminApi;
import ru.itone.ilp.openapi.model.AccrualResponse;
import ru.itone.ilp.openapi.model.ArticleResponse;
import ru.itone.ilp.openapi.model.BalancePeriodRequest;
import ru.itone.ilp.openapi.model.BalanceStatisticResponseInner;
import ru.itone.ilp.openapi.model.BrowseStatisticArticlesRequest;
import ru.itone.ilp.openapi.model.CancelAccrualBody;
import ru.itone.ilp.openapi.model.CreateNewAccrualRequest;
import ru.itone.ilp.openapi.model.PageRequest;
import ru.itone.ilp.openapi.model.PageRequestConfig;
import ru.itone.ilp.openapi.model.PaginatedActivitiesStatisticResponse;
import ru.itone.ilp.openapi.model.PaginatedArticleResponse;
import ru.itone.ilp.openapi.model.PaginatedArticleStatisticResponse;
import ru.itone.ilp.openapi.model.PaginatedOperationResponse;
import ru.itone.ilp.openapi.model.PaginatedProfileResponse;
import ru.itone.ilp.openapi.model.PaginatedWriteOffResponse;
import ru.itone.ilp.openapi.model.ProfileResponse;
import ru.itone.ilp.openapi.model.ProfileResponseForAdmin;
import ru.itone.ilp.openapi.model.UpdateWriteOffRequest;
import ru.itone.ilp.openapi.model.UsersPeriodRequest;
import ru.itone.ilp.openapi.model.UsersStatisticResponse;
import ru.itone.ilp.openapi.model.WriteOffResponse;
import ru.itone.ilp.services.articles.ArticleService;
import ru.itone.ilp.services.jwt.UserDetailsImpl;
import ru.itone.ilp.services.profiles.ProfileService;
import ru.itone.ilp.services.wallet.WalletService;

@Slf4j
@RestController
@RequiredArgsConstructor
@Secured("hasRole('ADMIN')")
public class AdminController extends LinkResolver implements AdminApi {

    private final WalletService walletService;
    private final ProfileService profileService;
    private final ArticleService articleService;

    @Override
    public ResponseEntity<PaginatedArticleStatisticResponse> browseStatisticArticles(
            BrowseStatisticArticlesRequest browseStatisticArticlesRequest) {
        throw new IllegalStateException("Not yet implemented");
    }

    @Override
    public ResponseEntity<List<BalanceStatisticResponseInner>> browseStatisticBalance(BalancePeriodRequest balancePeriodRequest) {
        throw new IllegalStateException("Not yet implemented");
    }

    @Override
    public ResponseEntity<UsersStatisticResponse> browseStatisticUsers(UsersPeriodRequest usersPeriodRequest) {
        throw new IllegalStateException("Not yet implemented");
    }

    @Override
    public ResponseEntity<PaginatedWriteOffResponse> browseWriteOffsAsAdmin(PageRequest pageRequest) {
        return ResponseEntity.ok(resolveWriteOffLinks(walletService.paginateWriteOffs(pageRequest)));
    }

    @Override
    public ResponseEntity<PaginatedWriteOffResponse> browseWriteOffsForUserIdAsAdmin(Integer userId, PageRequest pageRequest) {
        return ResponseEntity.ok(resolveWriteOffLinks(walletService.paginateWriteOffs(userId.longValue(), pageRequest)));
    }

    @Override
    public ResponseEntity<AccrualResponse> cancelAccrualForUser(Integer userId, CancelAccrualBody cancelAccrualBody) {
        return ResponseEntity.ok(resolveLink(walletService.cancelAccrual(cancelAccrualBody.getAccrualId().longValue())));
    }

    @Override
    public ResponseEntity<PaginatedArticleResponse> browseArticlesForAdmin(PageRequest pageRequest) {
        return ResponseEntity.ok(resolveLinks(articleService.paginate(pageRequest)));
    }

    @Override
    public ResponseEntity<PaginatedActivitiesStatisticResponse> browseStatisticActivities(
            BrowseStatisticArticlesRequest browseStatisticArticlesRequest) {
        throw new IllegalStateException("Not yet implemented!");
    }

    @Override
    @Secured("hasRole('ADMIN')")
    public ResponseEntity<AccrualResponse> createNewAccrual(Integer userId, CreateNewAccrualRequest createNewAccrualRequest) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(walletService.createNewAccrual(userId.longValue(), createNewAccrualRequest));
    }

    @Override
    public ResponseEntity<String> downloadBalanceCsv() {
        try {
            Path balance = walletService.buildBalanceCsv();
            try {
                FileUtils.forceDeleteOnExit(balance.toFile());
                return ResponseEntity.ok(Files.readString(balance, StandardCharsets.UTF_8));
            } finally {
                try {
                    Files.deleteIfExists(balance);
                    log.debug("Deleted {}", balance);
                } catch (IOException ex) {
                    log.warn("Could not delete file {}", balance, ex);
                }
            }
        } catch (IOException e) {
            throw new RuntimeException(String.format("Не удалось создать отчет. Ошибка: %s", e.getMessage()), e);
        }
    }

    @Override
    public ResponseEntity<String> downloadWriteOffsCsv() {
        throw new IllegalStateException("Not yet implemented");
    }

    @Override
    public ResponseEntity<ProfileResponseForAdmin> getProfileByIdAsAdmin(Integer userId) {
        Optional<ProfileResponseForAdmin> user = profileService.getProfileByIdForAdmin(userId.longValue());
        return user.map(this::resolveLink).map(ResponseEntity::ok)
                .orElseThrow( () -> new ResourceNotFoundException("User profile not found."));
    }

    @Override
    @Secured("hasRole('ADMIN')")
    public ResponseEntity<PaginatedOperationResponse> getWalletHistoryForUserId(Integer userId, PageRequest pageRequest) {
        return ResponseEntity.ok(walletService.getWalletHistory(userId.longValue(), pageRequest));
    }


    @Override
    public ResponseEntity<WriteOffResponse> getWriteOff(Integer writeOffId) {
        return ResponseEntity.ok(walletService.getWriteOff(writeOffId.longValue()));
    }

    @Override
    public ResponseEntity<PaginatedProfileResponse> searchProfileAsAdmin(String searchKey, Integer pageSize, Integer page) {
        PageRequest pageRequest = new PageRequest()
                .config(new PageRequestConfig().globalFilter(searchKey))
                .pageSize(pageSize)
                .page(page);
        return ResponseEntity.ok(resolveProfileLinks(profileService.paginate(pageRequest)));
    }

    public ResponseEntity<WriteOffResponse> updateWriteOff(Integer writeOffId, UpdateWriteOffRequest updateWriteOffRequest) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(walletService.updateWriteOffStatus(userDetails.getId(), true, writeOffId.longValue(), updateWriteOffRequest.getStatus()));
    }

    private ProfileResponse resolveLink(ProfileResponse profile) {
        profile.setAvatarLink(resolve(profile.getAvatarLink()));
        return profile;
    }

    private ArticleResponse resolveLink(ArticleResponse article) {
        article.setImageLink(resolve(article.getImageLink()));
        return article;
    }

    private AccrualResponse resolveLink(AccrualResponse accrual) {
        accrual.setInfoLink(resolve(accrual.getInfoLink()));
        return accrual;
    }


    private WriteOffResponse resolveLink(WriteOffResponse writeOff) {
        resolveLink(writeOff.getArticle());
        return writeOff;
    }


    private ProfileResponseForAdmin resolveLink(ProfileResponseForAdmin profile) {
        profile.setAvatarLink(resolve(profile.getAvatarLink()));
        return profile;
    }

    private List<ProfileResponse> resolveProfileLinks(List<ProfileResponse> profiles) {
        if (!CollectionUtils.isEmpty(profiles)) {
            profiles.forEach(this::resolveLink);
        }
        return profiles;
    }

    private List<WriteOffResponse> resolveWriteOffLinks(List<WriteOffResponse> writeOffs) {
        if (!CollectionUtils.isEmpty(writeOffs)) {
            writeOffs.forEach(this::resolveLink);
        }
        return writeOffs;
    }

    private PaginatedProfileResponse resolveProfileLinks(PaginatedProfileResponse page) {
        this.resolveProfileLinks(page.getResults());
        return page;
    }

    private PaginatedWriteOffResponse resolveWriteOffLinks(PaginatedWriteOffResponse page) {
        resolveWriteOffLinks(page.getResults());
        return page;
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
