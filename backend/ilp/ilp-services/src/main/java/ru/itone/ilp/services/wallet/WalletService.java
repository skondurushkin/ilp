package ru.itone.ilp.services.wallet;

import com.fasterxml.jackson.databind.JsonNode;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.transaction.annotation.Transactional;
import ru.itone.ilp.openapi.model.AccrualResponse;
import ru.itone.ilp.openapi.model.CreateNewAccrualRequest;
import ru.itone.ilp.openapi.model.CreateNewWriteOffRequest;
import ru.itone.ilp.openapi.model.OperationResponse;
import ru.itone.ilp.openapi.model.PaginatedAccrualResponse;
import ru.itone.ilp.openapi.model.PaginatedOperationResponse;
import ru.itone.ilp.openapi.model.PaginatedWriteOffResponse;
import ru.itone.ilp.openapi.model.WalletResponse;
import ru.itone.ilp.openapi.model.WriteOffResponse;
import ru.itone.ilp.openapi.model.WriteOffStatus;
import ru.itone.ilp.openapi.model.WriteOffUserResponse;
import ru.itone.ilp.persistence.api.DbApi;
import ru.itone.ilp.persistence.api.DbApi.DbApiException;
import ru.itone.ilp.persistence.api.DbJpa;
import ru.itone.ilp.persistence.entities.Accrual;
import ru.itone.ilp.persistence.entities.Activity;
import ru.itone.ilp.persistence.entities.Article;
import ru.itone.ilp.persistence.entities.Operation;
import ru.itone.ilp.persistence.entities.User;
import ru.itone.ilp.persistence.entities.WriteOff;
import ru.itone.ilp.persistence.mappers.AccrualMapper;
import ru.itone.ilp.persistence.mappers.OperationMapper;
import ru.itone.ilp.persistence.mappers.PageRequestMapper;
import ru.itone.ilp.persistence.mappers.WriteOffMapper;
import ru.itone.ilp.persistence.types.OrderStatus;

@RequiredArgsConstructor
public class WalletService {

    private final DbApi dbApi;
    private final DbJpa dbJpa;


    @Transactional(readOnly = true)
    public WalletResponse getWalletOverview(Long userId) {
        PageRequest pageable = PageRequest.of(0, 3, Sort.by(Direction.DESC, "instant"));
        Page<Operation> operationPage = dbJpa.getOperationRepository().findAllByUserId(userId, pageable);
        JsonNode balance = dbApi.getBalance(userId);

        List<OperationResponse> lastOperations = operationPage.getContent()
                .stream()
                .map(OperationMapper.INSTANCE::toResponse)
                .toList();

        return new WalletResponse()
                .balance(balance.path("balance").asInt())
                .totalEarned(balance.path("earned").asInt())
                .totalSpent(balance.path("spent").asInt())
                .operations(lastOperations);
    }

    @Transactional(readOnly = true)
    public PaginatedAccrualResponse paginateAccruals(Long userId, ru.itone.ilp.openapi.model.PageRequest pageRequest) {
        Pageable pageable = PageRequestMapper.INSTANCE.toPageable(pageRequest);
        Page<Accrual> page = dbJpa.getAccrualRepository().findAllByUserId(userId, pageable);
        List<AccrualResponse> results = page.getContent().stream().map(AccrualMapper.INSTANCE::toResponse).toList();
        return new PaginatedAccrualResponse()
                .total(page.getTotalPages())
                .page(page.getNumber())
                .pageSize(page.getSize())
                .hasNext(page.hasNext())
                .hasPrev(page.hasPrevious())
                .results(results);
    }

    @Transactional(readOnly = true)
    public PaginatedWriteOffResponse paginateWriteOffs(Long userId, ru.itone.ilp.openapi.model.PageRequest pageRequest) {
        Pageable pageable = PageRequestMapper.INSTANCE.toPageable(pageRequest);
        Page<WriteOff> page = dbJpa.getWriteOffRepository().findAllByUserId(userId, pageable);
        List<WriteOffUserResponse> results = page.getContent().stream().map(WriteOffMapper.INSTANCE::toUserResponse).toList();
        return new PaginatedWriteOffResponse()
                .total(page.getTotalPages())
                .page(page.getNumber())
                .pageSize(page.getSize())
                .hasNext(page.hasNext())
                .hasPrev(page.hasPrevious())
                .results(results);
    }

    @Transactional(readOnly = true)
    public PaginatedOperationResponse getWalletHistory(Long userId, ru.itone.ilp.openapi.model.PageRequest pageRequest) {
        Pageable pageable = PageRequestMapper.INSTANCE.toPageable(pageRequest);
        Page<Operation> operationPage = dbJpa.getOperationRepository().findAllByUserId(userId, pageable);
        List<OperationResponse> results = operationPage.getContent()
                .stream()
                .map(OperationMapper.INSTANCE::toResponse)
                .toList();
        return new PaginatedOperationResponse()
                .total(operationPage.getTotalPages())
                .page(operationPage.getNumber())
                .pageSize(operationPage.getSize())
                .hasNext(operationPage.hasNext())
                .hasPrev(operationPage.hasPrevious())
                .results(results);
    }

    @Transactional
    public AccrualResponse createNewAccrual(Long userId, CreateNewAccrualRequest createNewAccrualRequest) {
        User user = dbJpa.getUserRepository().findById(userId).orElseThrow(() -> new DbApiException("Профиль не найден"));
        Activity activity = dbJpa.getActivityRepository()
                .findById(createNewAccrualRequest.getActivityId().longValue())
                .orElseThrow(() -> new DbApiException("Активность не найдена"));
        Accrual ret = dbJpa.getAccrualRepository()
                .save(
                        new Accrual()
                                .setUser(user)
                                .setActivity(activity)
                                .setDate(LocalDate.now())
                                .setAmount(activity.getAmount())
                );

        return AccrualMapper.INSTANCE.toResponse(ret);
    }

    @Transactional
    public WriteOffUserResponse createNewWriteOff(Long userId, CreateNewWriteOffRequest createNewWriteOffRequest) {
        User user = dbJpa.getUserRepository().findById(userId).orElseThrow(() -> new DbApiException("Профиль не найден"));
        Article article = dbJpa.getArticleRepository().findById(createNewWriteOffRequest.getArticleId().longValue())
                .orElseThrow(() -> new DbApiException("Артикул не найден"));
        WriteOff writeOff = dbJpa.getWriteOffRepository()
                .save(
                        new WriteOff()
                                .setUser(user)
                                .setArticle(article)
                                .setDate(LocalDate.now())
                                .setAmount(article.getAmount())

                );
        return WriteOffMapper.INSTANCE.toUserResponse(writeOff);
    }

    @Transactional
    public WriteOffResponse updateWriteOffStatus(Long writeOffId, WriteOffStatus status) {
        WriteOff writeOff = dbJpa.getWriteOffRepository().findById(writeOffId)
                .orElseThrow(() -> new DbApiException("Объект списания не найден"));
        writeOff = dbJpa.getWriteOffRepository().save(writeOff.setOrderStatus(OrderStatus.valueOf(status.getValue())));
        return WriteOffMapper.INSTANCE.toResponse(writeOff);
    }
}
