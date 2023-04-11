package ru.itone.ilp.services.wallet;

import com.fasterxml.jackson.databind.JsonNode;
import java.io.IOException;
import java.io.Writer;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.io.output.FileWriterWithEncoding;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.transaction.annotation.Transactional;
import ru.itone.ilp.exception.ApiExceptions.PermissionDeniedException;
import ru.itone.ilp.exception.ApiExceptions.ResourceNotFoundException;
import ru.itone.ilp.exception.ApiExceptions.TransitionDeniedException;
import ru.itone.ilp.misc.Helpers;
import ru.itone.ilp.openapi.model.AccrualResponse;
import ru.itone.ilp.openapi.model.BalancePeriodRequest;
import ru.itone.ilp.openapi.model.BalancePeriodRequestPeriod;
import ru.itone.ilp.openapi.model.BalanceStatisticResponseInner;
import ru.itone.ilp.openapi.model.BalanceStatisticResponseInnerDataInner;
import ru.itone.ilp.openapi.model.CreateNewAccrualRequest;
import ru.itone.ilp.openapi.model.OperationResponse;
import ru.itone.ilp.openapi.model.PageRequestConfig;
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
import ru.itone.ilp.persistence.types.AccrualStatus;
import ru.itone.ilp.persistence.types.OperationType;
import ru.itone.ilp.persistence.types.OrderStatus;

@RequiredArgsConstructor
public class WalletService {

    private static final String PROFILE_NOT_FOUND = "Профиль не найден";
    private final DbApi dbApi;
    private final DbJpa dbJpa;
    private final Sort  dateDesc = Sort.by(Direction.DESC, "date");

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
        Pageable pageable = PageRequestMapper.INSTANCE.toPageable(pageRequest, dateDesc);
        Page<Accrual> page = dbJpa.getAccrualRepository().findAllByUserIdAndStatusEquals(userId, AccrualStatus.created, pageable);
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
        Pageable pageable = PageRequestMapper.INSTANCE.toPageable(pageRequest, dateDesc);
        String filter = Optional.ofNullable(pageRequest.getConfig()).map(PageRequestConfig::getGlobalFilter).orElse(StringUtils.EMPTY);
        Page<WriteOff> page = StringUtils.isBlank(filter)
            ? dbJpa.getWriteOffRepository().findAll(pageable)
            : dbJpa.getWriteOffRepository().searchByText(filter, pageable);
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
        Pageable pageable = PageRequestMapper.INSTANCE.toPageable(pageRequest, dateDesc);
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
    public PaginatedWriteOffResponse paginateWriteOffsWithStatus(Long userId, ru.itone.ilp.openapi.model.PageRequest pageRequest, Collection<OrderStatus> statuses) {
        dbJpa.getUserRepository().findById(userId).orElseThrow(() -> new DbApiException(PROFILE_NOT_FOUND));
        Pageable pageable = PageRequestMapper.INSTANCE.toPageable(pageRequest, dateDesc);
        Page<WriteOff> page = statuses.isEmpty()
                ? dbJpa.getWriteOffRepository().findAllByUserId(userId, pageable)
                : dbJpa.getWriteOffRepository().findAllByUserIdAndOrderStatusIsIn(userId, statuses, pageable);
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
    public PaginatedOperationResponse getWalletHistory(Long userId, ru.itone.ilp.openapi.model.PageRequest pageRequest) {
        dbJpa.getUserRepository().findById(userId).orElseThrow(() -> new DbApiException(PROFILE_NOT_FOUND));
        Pageable pageable = PageRequestMapper.INSTANCE.toPageable(pageRequest, Sort.by(Direction.DESC, "instant"));
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
                                .setAmount(activity.getPrice())
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
                                .setAmount(article.getPrice())
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

    @Transactional
    public AccrualResponse cancelAccrual(Long operationId) {
        if (!dbJpa.getOperationRepository().existsById(operationId)) {
              throw new ResourceNotFoundException("Запись об операции не найдена");
        }
        Optional<Long> accrualId = dbJpa.getOperationRepository().getAccrualId(operationId);
        if (accrualId.isEmpty()) {
            throw new RuntimeException("Операция не является начислением");
        }
        Accrual accrual = dbJpa.getAccrualRepository().findById(accrualId.get())
                .orElseThrow(() -> new ResourceNotFoundException("Запись о начислении не найдена"));
        accrual = dbJpa.getAccrualRepository().save(accrual.setStatus(AccrualStatus.cancelled));
        return AccrualMapper.INSTANCE.toResponse(accrual);
    }

    @Transactional(readOnly = true)
    public Path buildBalanceCsv() throws IOException {
        Path balance_csv = Files.createTempFile("balance_csv", null);
        Writer sw = new FileWriterWithEncoding(balance_csv.toString(), StandardCharsets.UTF_8);
        CSVFormat format = CSVFormat.DEFAULT.builder()
                .setHeader("Время", "email", "Тип операции", "Название", "Код", "Баллы")
                .build();
        List<Operation> operations = this.dbJpa.getOperationRepository().findAll(Sort.by(Direction.ASC, "instant"));
        try (CSVPrinter printer = new CSVPrinter(sw, format)) {
            List<String> rec = new ArrayList<>();
            for (Operation operation : operations) {
                rec.clear();
                rec.add(operation.getInstant().toString());
                rec.add(operation.getUser().getEmail());
                rec.add(toOpType(operation.getType()));
                rec.add(operation.getName());
                rec.add(operation.getType() == OperationType.writeOff ? operation.getWriteOff().getArticle().getCode() : StringUtils.EMPTY);
                rec.add(operation.getAmount().toString());
                printer.printRecord(rec);
            }
        }
        return balance_csv;
    }

    @Transactional(readOnly = true)
    public Path buildWriteOffCsv() throws IOException {
        Path balance_csv = Files.createTempFile("writeOff_csv", null);
        Writer sw = new FileWriterWithEncoding(balance_csv.toString(), StandardCharsets.UTF_8);
        CSVFormat format = CSVFormat.DEFAULT.builder()
                .setHeader("Время", "email", "Фамилия", "Имя", "Отчество", "УН Заказа", "Статус",  "Название", "Код", "Баллы")
                .build();
        List<Operation> operations = this.dbJpa.getOperationRepository()
                .selectWriteOffs(Sort.by(Direction.ASC, "instant"));
        try (CSVPrinter printer = new CSVPrinter(sw, format)) {
            List<String> rec = new ArrayList<>();
            for (Operation operation : operations) {
                rec.clear();

                rec.add(operation.getInstant().toString());
                rec.add(operation.getUser().getEmail());
                rec.add(operation.getUser().getLastName());
                rec.add(operation.getUser().getFirstName());
                rec.add(operation.getUser().getMiddleName());
                rec.add(operation.getWriteOff().getId().toString());
                rec.add(operation.getWriteOff().getOrderStatus().getLocalizedName());
                rec.add(operation.getName());
                rec.add(operation.getWriteOff().getArticle().getCode());
                rec.add(operation.getAmount().toString());
                printer.printRecord(rec);
            }
        }
        return balance_csv;
    }

    private static String toOpType(OperationType type) {
        if (type == null)
            return StringUtils.EMPTY;
        return switch(type) {
            case accrual -> "Начисление";
            case writeOff -> "Списание";
        };
    }

    record TSParam(Instant start, Instant end, ChronoUnit unit) {
        Instant getKey(Instant value) {
            if (unit == ChronoUnit.DAYS) {
                return LocalDate.ofInstant(value, ZoneId.systemDefault()).plus(1, ChronoUnit.DAYS).atStartOfDay().toInstant(Helpers.getSystemZoneOffset());
            } else {
                return LocalDateTime.ofInstant(value, ZoneId.systemDefault()).plus(1, ChronoUnit.HOURS).truncatedTo(ChronoUnit.HOURS).toInstant(Helpers.getSystemZoneOffset());
            }
        }
    }

    TSParam makeParam(BalancePeriodRequestPeriod period) {
        LocalDateTime start = LocalDate.parse(period.getStart()).atStartOfDay().plus(1, ChronoUnit.DAYS);
        LocalDateTime end = LocalDate.parse(period.getEnd()).atStartOfDay().plus(1, ChronoUnit.DAYS);
        ChronoUnit unit = switch(period.getInterval()) {
            case HOUR -> ChronoUnit.HOURS;
            case DAY -> ChronoUnit.DAYS;
        };

        return new TSParam(
                start.toInstant(Helpers.getSystemZoneOffset()),
                end.toInstant(Helpers.getSystemZoneOffset()),
                unit
        );
    }
    @Transactional(readOnly = true)
    public List<BalanceStatisticResponseInner> getTimeSeries(BalancePeriodRequest request) {
        TSParam param = makeParam(request.getPeriod());
        List<Operation> timeSerie = dbJpa.getOperationRepository().findAllInTimeRange(param.start(), param.end());
        List<Operation> accruals = new ArrayList<>();
        List<Operation> writeOffs = new ArrayList<>();
        for (Operation operation : timeSerie) {
            switch(operation.getType()) {
                case accrual -> accruals.add(operation);
                case writeOff -> writeOffs.add(operation);
            }
        }
        List<BalanceStatisticResponseInnerDataInner> groupedAccruals = groupByUnit(accruals, param);
        List<BalanceStatisticResponseInnerDataInner> groupedWriteOffs = groupByUnit(writeOffs, param);

        return List.of(
                new BalanceStatisticResponseInner()
                        .label("Начисления")
                        .data(groupedAccruals)
                ,
                new BalanceStatisticResponseInner()
                        .label("Списания")
                        .data(groupedWriteOffs)
                );
    }

    private List<BalanceStatisticResponseInnerDataInner> groupByUnit(List<Operation> serie, TSParam param) {

        Map<Instant, Long> slots = new LinkedHashMap<>();
        for(Instant next = param.start(); next.compareTo(param.end) <= 0; next = param.getKey(next.plus(1, ChronoUnit.MINUTES))) {
            slots.put(next, 0L);
        }
        LinkedHashMap<Instant, Long> values = serie.stream().map(e -> param.getKey(e.getInstant()))
                .collect(Collectors.groupingBy(Function.identity(), LinkedHashMap::new, Collectors.counting()));
        slots.putAll(values);

        return slots.entrySet().stream()
                .map( e -> toDataEntry(e.getKey(), e.getValue()))
                .toList();
    }

    static BalanceStatisticResponseInnerDataInner toDataEntry(Instant instant, Long count) {
        return new BalanceStatisticResponseInnerDataInner()
                .date(OffsetDateTime.ofInstant(instant, ZoneId.systemDefault()))
                .count(BigDecimal.valueOf(count));
    }
}
