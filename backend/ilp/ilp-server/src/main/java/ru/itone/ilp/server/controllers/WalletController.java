package ru.itone.ilp.server.controllers;

import java.net.URI;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ru.itone.ilp.openapi.api.WalletApi;
import ru.itone.ilp.openapi.model.AccrualResponse;
import ru.itone.ilp.openapi.model.ArticleResponse;
import ru.itone.ilp.openapi.model.BrowseWriteOffsRequest;
import ru.itone.ilp.openapi.model.PageRequest;
import ru.itone.ilp.openapi.model.PaginatedAccrualResponse;
import ru.itone.ilp.openapi.model.PaginatedOperationResponse;
import ru.itone.ilp.openapi.model.PaginatedWriteOffResponse;
import ru.itone.ilp.openapi.model.UpdateWriteOffRequest;
import ru.itone.ilp.openapi.model.WalletResponse;
import ru.itone.ilp.openapi.model.WriteOffRequest;
import ru.itone.ilp.openapi.model.WriteOffResponse;
import ru.itone.ilp.openapi.model.WriteOffStatus;
import ru.itone.ilp.persistence.types.OrderStatus;
import ru.itone.ilp.server.misc.Helpers;
import ru.itone.ilp.services.jwt.UserDetailsImpl;
import ru.itone.ilp.services.wallet.WalletService;

@Slf4j
@RestController
@RequiredArgsConstructor
public class WalletController extends LinkResolver implements WalletApi {

    private final WalletService walletService;

    @Override
    public ResponseEntity<PaginatedAccrualResponse> browseAccruals(PageRequest pageRequest) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(walletService.paginateAccruals(userDetails.getId(), pageRequest));
    }

    @Override
    @Secured("hasRole('ADMIN')")
    public ResponseEntity<PaginatedAccrualResponse> browseAccrualsForUserId(Integer userId, PageRequest pageRequest) {
        return ResponseEntity.ok(walletService.paginateAccruals(userId.longValue(), pageRequest));
    }

    @Override
    public ResponseEntity<PaginatedWriteOffResponse> browseWriteOffs(BrowseWriteOffsRequest request) {
        Set<WriteOffStatus> statuses = Optional.ofNullable(request.getStatus()).orElse(Collections.emptySet());
        Set<OrderStatus> statusFilter = statuses.stream().map(e -> OrderStatus.valueOf(e.getValue())).collect(Collectors.toSet());
        PageRequest pageRequest = new PageRequest().page(request.getPage()).pageSize(request.getPageSize()).config(request.getConfig());
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(resolveLinks(walletService.paginateWriteOffsWithStatus(userDetails.getId(), pageRequest, statusFilter)));
    }

    @Override
    public ResponseEntity<AccrualResponse> getAccrual(Integer accrualId) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        boolean isAdmin = Helpers.isAdmin(userDetails);
        if (isAdmin) {
            return ResponseEntity.ok(walletService.getAccrual(accrualId.longValue()));
        } else {
            return ResponseEntity.ok(walletService.getAccrualForUser(accrualId.longValue(), userDetails.getId()));
        }
    }

    @Override
    public ResponseEntity<PaginatedOperationResponse> getWalletHistory(PageRequest pageRequest) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(walletService.getWalletHistory(userDetails.getId(), pageRequest));
    }

    @Override
    public ResponseEntity<WalletResponse> getWalletOverview() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(walletService.getWalletOverview(userDetails.getId()));
    }

    @Override
    public ResponseEntity<WriteOffResponse> getOwnWriteOff(Integer writeoffId) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        boolean isAdmin = Helpers.isAdmin(userDetails);
        if (isAdmin) {
            return ResponseEntity.ok(resolveLink(walletService.getWriteOff(writeoffId.longValue())));
        } else {
            return ResponseEntity.ok(resolveLink(walletService.getWriteOffForUser(writeoffId.longValue(), userDetails.getId())));
        }
    }

    public ResponseEntity<WriteOffResponse> updateWriteOff(Integer writeOffId, UpdateWriteOffRequest updateWriteOffRequest) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(resolveLink(walletService.updateWriteOffStatus(userDetails.getId(), false, writeOffId.longValue(), updateWriteOffRequest.getStatus())));
    }

    @Override
    public ResponseEntity<WriteOffResponse> writeOff(WriteOffRequest writeOffRequest) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        WriteOffResponse response = resolveLink(walletService.writeOff(userDetails.getId(), writeOffRequest));
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(response.getId()).toUri();
        log.info("CREATED: {}", uri);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    WriteOffResponse resolveLink(WriteOffResponse response) {
        return response.article(resolveLink(response.getArticle()));
    }

    ArticleResponse resolveLink(ArticleResponse response) {
        return response.imageLink(resolve(response.getImageLink()));
    }

    PaginatedWriteOffResponse resolveLinks(PaginatedWriteOffResponse response) {
        return response.results(resolveLinks(response.getResults()));
    }

    List<WriteOffResponse> resolveLinks(List<WriteOffResponse> list) {
        if (!CollectionUtils.isEmpty(list)) {
            list.forEach(this::resolveLink);
        }
        return list;
    }


}
