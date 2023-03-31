package ru.itone.ilp.server.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;
import ru.itone.ilp.openapi.api.WalletApi;
import ru.itone.ilp.openapi.model.PaginatedAccrualResponse;
import ru.itone.ilp.openapi.model.PaginatedWriteOffResponse;
import ru.itone.ilp.openapi.model.WalletResponse;
import ru.itone.ilp.services.jwt.UserDetailsImpl;
import ru.itone.ilp.services.wallet.WalletService;

@Slf4j
@RestController
@RequiredArgsConstructor
public class WalletController implements WalletApi {

    private final WalletService walletService;

    @Override
    public ResponseEntity<PaginatedAccrualResponse> browseAccruals(Integer userId) {
        return ResponseEntity.ok(walletService.paginateAccruals(userId.longValue()));
    }

    @Override
    public ResponseEntity<PaginatedWriteOffResponse> browseWriteOffs(Integer userId) {
        return ResponseEntity.ok(walletService.paginateWriteOffs(userId.longValue()));
    }

    @Override
    public ResponseEntity<WalletResponse> getWalletOverview() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(walletService.getWalletOverview(userDetails.getId()));
    }
}
