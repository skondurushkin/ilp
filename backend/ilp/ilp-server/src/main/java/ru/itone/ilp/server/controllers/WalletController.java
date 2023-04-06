package ru.itone.ilp.server.controllers;

import java.net.URI;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ru.itone.ilp.openapi.api.WalletApi;
import ru.itone.ilp.openapi.model.AccrualResponse;
import ru.itone.ilp.openapi.model.CreateNewAccrualRequest;
import ru.itone.ilp.openapi.model.PageRequest;
import ru.itone.ilp.openapi.model.PaginatedAccrualResponse;
import ru.itone.ilp.openapi.model.PaginatedOperationResponse;
import ru.itone.ilp.openapi.model.PaginatedWriteOffResponse;
import ru.itone.ilp.openapi.model.UpdateWriteOffRequest;
import ru.itone.ilp.openapi.model.WalletResponse;
import ru.itone.ilp.openapi.model.WriteOffRequest;
import ru.itone.ilp.openapi.model.WriteOffResponse;
import ru.itone.ilp.server.misc.Helpers;
import ru.itone.ilp.services.jwt.UserDetailsImpl;
import ru.itone.ilp.services.wallet.WalletService;

@Slf4j
@RestController
@RequiredArgsConstructor
public class WalletController implements WalletApi {

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
    public ResponseEntity<PaginatedWriteOffResponse> browseWriteOffs(PageRequest pageRequest) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(walletService.paginateWriteOffs(userDetails.getId(), pageRequest));
    }

    @Override
    @Secured("hasRole('ADMIN')")
    public ResponseEntity<PaginatedWriteOffResponse> browseWriteOffsForUserId(Integer userId, PageRequest pageRequest) {
        return ResponseEntity.ok(walletService.paginateWriteOffs(userId.longValue(), pageRequest));
    }

    @Override
    @Secured("hasRole('ADMIN')")
    public ResponseEntity<AccrualResponse> createNewAccrual(Integer userId, CreateNewAccrualRequest createNewAccrualRequest) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(walletService.createNewAccrual(userId.longValue(), createNewAccrualRequest));
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
        boolean isAdmin = Helpers.isAdmin(userDetails);
        return ResponseEntity.ok(walletService.getWalletHistory(isAdmin, userDetails.getId(), pageRequest));
    }

    @Override
    @Secured("hasRole('ADMIN')")
    public ResponseEntity<PaginatedOperationResponse> getWalletHistoryForUserId(Integer userId, PageRequest pageRequest) {
        return ResponseEntity.ok(walletService.getWalletHistory(true, userId.longValue(), pageRequest));
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
            return ResponseEntity.ok(walletService.getWriteOff(writeoffId.longValue()));
        } else {
            return ResponseEntity.ok(walletService.getWriteOffForUser(writeoffId.longValue(), userDetails.getId()));
        }
    }

    public ResponseEntity<WriteOffResponse> updateWriteOff(Integer writeOffId, UpdateWriteOffRequest updateWriteOffRequest) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(walletService.updateWriteOffStatus(userDetails.getId(), false, writeOffId.longValue(), updateWriteOffRequest.getStatus()));
    }

    @Override
    public ResponseEntity<WriteOffResponse> writeOff(WriteOffRequest writeOffRequest) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        WriteOffResponse response = walletService.writeOff(userDetails.getId(), writeOffRequest);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(response.getId()).toUri();
        log.info("CREATED: {}", uri);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
