package ru.itone.ilp.server.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;
import ru.itone.ilp.openapi.api.AdminApi;
import ru.itone.ilp.openapi.model.PageRequest;
import ru.itone.ilp.openapi.model.PaginatedWriteOffResponse;
import ru.itone.ilp.openapi.model.UpdateWriteOffRequest;
import ru.itone.ilp.openapi.model.WriteOffResponse;
import ru.itone.ilp.services.jwt.UserDetailsImpl;
import ru.itone.ilp.services.wallet.WalletService;

@Slf4j
@RestController
@RequiredArgsConstructor
@Secured("hasRole('ADMIN')")
public class AdminController implements AdminApi {

    private final WalletService walletService;

    @Override
    public ResponseEntity<PaginatedWriteOffResponse> browseWriteOffsAsAdmin(PageRequest pageRequest) {
        return ResponseEntity.ok(walletService.paginateWriteOffs(pageRequest));
    }

    @Override
    public ResponseEntity<WriteOffResponse> getWriteOff(Integer writeOffId) {
        return ResponseEntity.ok(walletService.getWriteOff(writeOffId.longValue()));
    }

    public ResponseEntity<WriteOffResponse> updateWriteOff(Integer writeOffId, UpdateWriteOffRequest updateWriteOffRequest) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(walletService.updateWriteOffStatus(userDetails.getId(), true, writeOffId.longValue(), updateWriteOffRequest.getStatus()));
    }
}
