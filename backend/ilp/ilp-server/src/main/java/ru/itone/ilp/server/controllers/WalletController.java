package ru.itone.ilp.server.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;
import ru.itone.ilp.openapi.api.WalletApi;
import ru.itone.ilp.openapi.model.AccrualResponse;
import ru.itone.ilp.openapi.model.CreateNewAccrualRequest;
import ru.itone.ilp.openapi.model.CreateNewWriteOffRequest;
import ru.itone.ilp.openapi.model.PageRequest;
import ru.itone.ilp.openapi.model.PaginatedAccrualResponse;
import ru.itone.ilp.openapi.model.PaginatedOperationResponse;
import ru.itone.ilp.openapi.model.PaginatedWriteOffResponse;
import ru.itone.ilp.openapi.model.UpdateWriteOffRequest;
import ru.itone.ilp.openapi.model.WalletResponse;
import ru.itone.ilp.openapi.model.WriteOffResponse;
import ru.itone.ilp.openapi.model.WriteOffUserResponse;
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
    public ResponseEntity<PaginatedAccrualResponse> browseAccrualsForUserId(Integer userId, PageRequest pageRequest) {
        return ResponseEntity.ok(walletService.paginateAccruals(userId.longValue(), pageRequest));
    }

    @Override
    public ResponseEntity<PaginatedWriteOffResponse> browseWriteOffs(PageRequest pageRequest) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(walletService.paginateWriteOffs(userDetails.getId(), pageRequest));
    }

    @Override
    public ResponseEntity<PaginatedWriteOffResponse> browseWriteOffsForUserId(Integer userId, PageRequest pageRequest) {
        return ResponseEntity.ok(walletService.paginateWriteOffs(userId.longValue(), pageRequest));
    }

    @Override
    public ResponseEntity<AccrualResponse> createNewAccrual(Integer userId, CreateNewAccrualRequest createNewAccrualRequest) {
        return ResponseEntity.ok(walletService.createNewAccrual(userId.longValue(), createNewAccrualRequest));
    }

    @Override
    public ResponseEntity<WriteOffUserResponse> createNewWriteOff(Integer userId, CreateNewWriteOffRequest createNewWriteOffRequest) {
        return ResponseEntity.ok(walletService.createNewWriteOff(userId.longValue(), createNewWriteOffRequest));
    }

    @Override
    public ResponseEntity<PaginatedOperationResponse> getWalletHistory(PageRequest pageRequest) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(walletService.getWalletHistory(userDetails.getId(), pageRequest));
    }

    @Override
    public ResponseEntity<PaginatedOperationResponse> getWalletHistoryForUserId(Integer userId, PageRequest pageRequest) {
        return ResponseEntity.ok(walletService.getWalletHistory(userId.longValue(), pageRequest));
    }

    @Override
    public ResponseEntity<WalletResponse> getWalletOverview() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(walletService.getWalletOverview(userDetails.getId()));
    }

    @Override
    public ResponseEntity<WriteOffResponse> updateWriteOff(Integer writeOffId, UpdateWriteOffRequest updateWriteOffRequest) {
        return ResponseEntity.ok(walletService.updateWriteOffStatus(writeOffId.longValue(), updateWriteOffRequest.getStatus()));
    }
}
