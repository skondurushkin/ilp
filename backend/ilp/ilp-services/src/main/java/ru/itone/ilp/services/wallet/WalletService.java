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
import ru.itone.ilp.exception.ApiExceptions.PermissionDeniedException;
import ru.itone.ilp.exception.ApiExceptions.ResourceNotFoundException;
import ru.itone.ilp.exception.ApiExceptions.TransitionDeniedException;
import ru.itone.ilp.openapi.model.AccrualResponse;
import ru.itone.ilp.openapi.model.CreateNewAccrualRequest;
import ru.itone.ilp.openapi.model.OperationResponse;
import ru.itone.ilp.openapi.model.PaginatedAccrualResponse;
import ru.itone.ilp.openapi.model.PaginatedOperationResponse;
import ru.itone.ilp.openapi.model.PaginatedWriteOffResponse;
import ru.itone.ilp.openapi.model.WalletResponse;
import ru.itone.ilp.openapi.model.WriteOffRequest;
import ru.itone.ilp.openapi.model.WriteOffResponse;
import ru.itone.ilp.openapi.model.WriteOffStatus;
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

    private static final String PROFILE_NOT_FOUND = "Профиль не найден";
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
    public PaginatedWriteOffResponse paginateWriteOffs(ru.itone.ilp.openapi.model.PageRequest pageRequest) {
        Pageable pageable = PageRequestMapper.INSTANCE.toPageable(pageRequest);
        Page<WriteOff> page = dbJpa.getWriteOffRepository().findAll(pageable);
        List<WriteOffResponse> results = page.getContent().stream().map(WriteOffMapper.INSTANCE::toResponse).toList();
        return new PaginatedWriteOffResponse()
                .total(page.getTotalPages())
                .page(page.getNumber())
                .pageSize(page.getSize())
                .hasNext(page.hasNext())
                .hasPrev(page.hasPrevious())
                .results(results);
    }

    @Transactional(readOnly = true)
    public PaginatedWriteOffResponse paginateWriteOffs(Long userId, ru.itone.ilp.openapi.model.PageRequest pageRequest) {
        dbJpa.getUserRepository().findById(userId).orElseThrow(() -> new DbApiException(PROFILE_NOT_FOUND));
        Pageable pageable = PageRequestMapper.INSTANCE.toPageable(pageRequest);
        Page<WriteOff> page = dbJpa.getWriteOffRepository().findAllByUserId(userId, pageable);
        List<WriteOffResponse> results = page.getContent().stream().map(WriteOffMapper.INSTANCE::toResponse).toList();
        return new PaginatedWriteOffResponse()
                .total(page.getTotalPages())
                .page(page.getNumber())
                .pageSize(page.getSize())
                .hasNext(page.hasNext())
                .hasPrev(page.hasPrevious())
                .results(results);
    }

    @Transactional(readOnly = true)
    public PaginatedOperationResponse getWalletHistory(boolean isAdmin, Long userId, ru.itone.ilp.openapi.model.PageRequest pageRequest) {
        dbJpa.getUserRepository().findById(userId).orElseThrow(() -> new DbApiException(PROFILE_NOT_FOUND));
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
        User user = dbJpa.getUserRepository().findById(userId).orElseThrow(() -> new DbApiException(PROFILE_NOT_FOUND));
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
    public WriteOffResponse updateWriteOffStatus(Long userId, boolean admin, Long writeOffId, WriteOffStatus status) {
        WriteOff writeOff = dbJpa.getWriteOffRepository().findById(writeOffId)
                .orElseThrow(() -> new DbApiException("Объект списания не найден"));
        if (writeOff.getUser().getId().equals(userId) || admin) {
            OrderStatus orderStatus = OrderStatus.valueOf(status.getValue());
            if (writeOff.getOrderStatus() != orderStatus) {
                if (!(admin || orderStatus == OrderStatus.cancelled)) {
                    throw new PermissionDeniedException("Отсутствуют права на изменение статуса списания (" + orderStatus + ")");
                }
                if (isTerminalStatus(writeOff.getOrderStatus())) {
                    throw new TransitionDeniedException("Изменение статуса невозможно. Текущий статус: " + writeOff.getOrderStatus());
                }
                writeOff = dbJpa.getWriteOffRepository().save(writeOff.setOrderStatus(orderStatus));
            }
            return WriteOffMapper.INSTANCE.toResponse(writeOff);
        }
        throw new PermissionDeniedException("Отсутствуют права на редактирование списаний других пользователей");
    }

    private boolean isTerminalStatus(OrderStatus fromStatus) {
        return (fromStatus == OrderStatus.completed || fromStatus == OrderStatus.cancelled);
    }

    @Transactional
    public WriteOffResponse writeOff(Long userId, WriteOffRequest writeOffRequest) {
        User user = dbJpa.getUserRepository().findById(userId).orElseThrow(() -> new DbApiException(PROFILE_NOT_FOUND));
        Article article = dbJpa.getArticleRepository().findById(writeOffRequest.getArticleId().longValue())
                .orElseThrow(() -> new DbApiException("Артикул не найден"));
        WriteOff writeOff = dbJpa.getWriteOffRepository()
                .save(
                        new WriteOff()
                                .setUser(user)
                                .setArticle(article)
                                .setDate(LocalDate.now())
                                .setAmount(article.getAmount())
                                .setOrderStatus(OrderStatus.created)
                );
        return WriteOffMapper.INSTANCE.toResponse(writeOff);
    }

    @Transactional
    public AccrualResponse getAccrual(Long accrualId) {
        return dbJpa.getAccrualRepository().findById(accrualId)
                .map(AccrualMapper.INSTANCE::toResponse)
                .orElseThrow( () -> new ResourceNotFoundException("Запись о начислении не найдена"));
    }
    @Transactional
    public AccrualResponse getAccrualForUser(Long accrualId, Long userId) {
        return dbJpa.getAccrualRepository()
                .findById(accrualId).filter(a -> a.getUser().getId().equals(userId))
                .map(AccrualMapper.INSTANCE::toResponse)
                .orElseThrow( () -> new ResourceNotFoundException("Запись о начислении не найдена"));
    }

    @Transactional
    public WriteOffResponse getWriteOff(Long writeOffId) {
        return dbJpa.getWriteOffRepository().findById(writeOffId)
                .map(WriteOffMapper.INSTANCE::toResponse)
                .orElseThrow( () -> new ResourceNotFoundException("Запись о списании не найдена"));
    }
    @Transactional
    public WriteOffResponse getWriteOffForUser(Long writeOffId, Long userId) {
        return dbJpa.getWriteOffRepository().findById(writeOffId)
                .filter(a -> a.getUser().getId().equals(userId))
                .map(WriteOffMapper.INSTANCE::toResponse)
                .orElseThrow( () -> new ResourceNotFoundException("Запись о списании не найдена"));
    }
}
