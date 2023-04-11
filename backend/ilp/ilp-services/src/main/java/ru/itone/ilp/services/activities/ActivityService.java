package ru.itone.ilp.services.activities;

import static org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers.ignoreCase;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.transaction.annotation.Transactional;
import ru.itone.ilp.common.ApiHelper;
import ru.itone.ilp.exception.ApiExceptions;
import ru.itone.ilp.openapi.model.ActivityRequest;
import ru.itone.ilp.openapi.model.ActivityResponse;
import ru.itone.ilp.openapi.model.ActivityUpdateRequest;
import ru.itone.ilp.openapi.model.BrowseStatisticArticlesRequest;
import ru.itone.ilp.openapi.model.BrowseStatisticArticlesRequest.PeriodEnum;
import ru.itone.ilp.openapi.model.PageRequest;
import ru.itone.ilp.openapi.model.PageRequestConfig;
import ru.itone.ilp.openapi.model.PaginatedActivitiesStatisticResponse;
import ru.itone.ilp.openapi.model.PaginatedActivityResponse;
import ru.itone.ilp.persistence.api.DbApi.DbApiException;
import ru.itone.ilp.persistence.entities.Activity;
import ru.itone.ilp.persistence.mappers.ActivityMapper;
import ru.itone.ilp.persistence.mappers.PageRequestMapper;
import ru.itone.ilp.persistence.repositories.ActivityRepository;
import ru.itone.ilp.persistence.repositories.ActivityRepository.TopActivity;

@Slf4j
@RequiredArgsConstructor
public class ActivityService {
    private final ActivityRepository activityRepository;

    private final ExampleMatcher nameMatcher = ExampleMatcher
            .matching()
            .withIgnoreNullValues()
            .withMatcher("name", ignoreCase());

    @Transactional(readOnly = true)
    public PaginatedActivityResponse paginate(PageRequest request) {
        Pageable pageable = PageRequestMapper.INSTANCE.toPageable(request, Sort.by(Direction.ASC, "price"));
        String filter = Optional.ofNullable(request.getConfig()).map(PageRequestConfig::getGlobalFilter).orElse(StringUtils.EMPTY);
        Page<Activity> page = StringUtils.isBlank(filter)
                ? activityRepository.findAllActive(LocalDate.now(), pageable)
                : activityRepository.searchByTextActive(filter, LocalDate.now(), pageable);
        return toPaginatedResponse(page);
    }

    @Transactional(readOnly = true)
    public PaginatedActivityResponse paginateForAdmin(PageRequest request) {
        Pageable pageable = PageRequestMapper.INSTANCE.toPageable(request, Sort.by(Direction.ASC, "price"));
        String filter = Optional.ofNullable(request.getConfig()).map(PageRequestConfig::getGlobalFilter).orElse(StringUtils.EMPTY);
        Page<Activity> page = StringUtils.isBlank(filter)
                ? activityRepository.findAll(pageable)
                : activityRepository.searchByText(filter, pageable);
        return toPaginatedResponse(page);
    }


    @Transactional(readOnly = true)
    public Optional<ActivityResponse> getActivityById(Integer id) {
        return activityRepository.findById(id.longValue())
                .map(ActivityService::toResponse);
    }

    @Transactional
    public ActivityResponse createActivity(ActivityRequest request) {
        if (activityRepository.exists(Example.of(new Activity().setName(request.getName())
                .setStartDate(null)
                .setEndDate(null), nameMatcher))) {
            String message = String.format("Активность '%s' уже существует", request.getName());
            log.error("Невозможно создать запись: {}", message);
            throw new ApiExceptions.ConflictException(message);
        }

        Activity activity = activityRepository.save(
                ActivityMapper.INSTANCE.activityFromRequest(request)
                        .setStartDate(LocalDate.now())
        );
        return toResponse(activity);
    }

    @Transactional
    public ActivityResponse update(ActivityUpdateRequest request) {
        Activity activity = activityRepository.findById(request.getId().longValue())
                .orElseThrow(() -> new DbApiException("Запись не найдена"));
        activity = activityRepository.save(activity.setName(request.getName())
                    .setDescription(request.getDescription())
                    .setPrice(request.getAmount())
                    .setInfoLink(request.getInfoLink()));
        return toResponse(activity);
    }

    @Transactional
    public ActivityResponse delete(Long activityId) {
        activityRepository.markAsDeleted(activityId);
        return activityRepository.findById(activityId).map(ActivityService::toResponse).orElse(null);
    }

    @Transactional(readOnly = true)
    public List<ActivityResponse> searchActivity(String searchKey) {
        searchKey = ApiHelper.trimSearchKey(searchKey, 2, 50);
        if (StringUtils.isEmpty(searchKey)) {
            return Collections.emptyList();
        }
        return activityRepository.searchByText(searchKey, 50).stream().map(ActivityService::toResponse).toList();
    }


    public static ActivityResponse toResponse(Activity activity) {
        return ActivityMapper.INSTANCE.activityToResponse(activity);
    }

    public static PaginatedActivityResponse toPaginatedResponse(Page<Activity> page) {
        return ActivityMapper.INSTANCE.toPaginatedResponse(page);
    }

    public static PaginatedActivitiesStatisticResponse toPaginatedStatisticResponse(Page<TopActivity> page) {
        return ActivityMapper.INSTANCE.toPaginatedStatisticResponse(page);
    }

    public PaginatedActivitiesStatisticResponse topActivitiesPaginated(BrowseStatisticArticlesRequest request) {
        Sort defaultSort = Sort.by(Direction.DESC, "count");
        PageRequest pageRequest = new PageRequest().page(request.getPage()).pageSize(request.getPageSize()).config(request.getConfig());
        Pageable pageable = PageRequestMapper.INSTANCE.toPageable(pageRequest, defaultSort);
        LocalDateTime start = LocalDateTime.of(2000, 1, 1, 0, 0, 0);
        LocalDateTime end = LocalDateTime.of(3000, 1, 1, 0, 0, 0);
        if (request.getPeriod() == PeriodEnum.DAY) {
            start = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
            end = start.plus(1, ChronoUnit.DAYS);
        }
        Page<TopActivity> page = activityRepository.findTop(start, end, pageable);
        return toPaginatedStatisticResponse(page);
    }
}
