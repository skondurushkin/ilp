package ru.itone.ilp.services.wallet;

import static java.lang.Integer.min;

import java.util.List;
import lombok.RequiredArgsConstructor;
import ru.itone.ilp.misc.Helpers;
import ru.itone.ilp.openapi.model.AccrualResponse;
import ru.itone.ilp.openapi.model.PaginatedAccrualResponse;
import ru.itone.ilp.openapi.model.PaginatedWriteOffResponse;
import ru.itone.ilp.openapi.model.WalletResponse;
import ru.itone.ilp.persistence.entities.Accrual;
import ru.itone.ilp.persistence.entities.WriteOff;
import ru.itone.ilp.persistence.mappers.AccrualMapper;
import ru.itone.ilp.persistence.repositories.AccrualRepository;
import ru.itone.ilp.persistence.repositories.WriteOffRepository;

@RequiredArgsConstructor
public class WalletService {
    private final AccrualRepository accrualRepository;
    private final WriteOffRepository writeOffRepository;
    public WalletResponse getWalletOverview(Long userId) {
        List<Accrual> accrualsByUserId = Helpers.asList(accrualRepository.findAllByUserIdOrderByDateDesc(userId));
        Integer totalEarned = accrualsByUserId.stream().map(Accrual::getAmount).reduce(0, Integer::sum);
        Integer totalSpent = Helpers.asStream(writeOffRepository.findAllByUserId(userId), WriteOff::getAmount).reduce(0, Integer::sum);

        List<AccrualResponse> lastAccruals = accrualsByUserId
                .subList(0, min(accrualsByUserId.size(), 3))
                .stream()
                .map(AccrualMapper.INSTANCE::toResponse)
                .toList();

        return new WalletResponse()
                .balance(totalEarned - totalSpent)
                .totalEarned(totalEarned)
                .totalSpent(totalSpent)
                .accruals(lastAccruals);
    }

    public PaginatedAccrualResponse paginateAccruals(Long userId) {
        List<Accrual> accrualsByUserId = Helpers.asList(accrualRepository.findAllByUserIdOrderByDateDesc(userId));
        return new PaginatedAccrualResponse();
    }

    public PaginatedWriteOffResponse paginateWriteOffs(Long userId) {
        return new PaginatedWriteOffResponse();
    }
}
