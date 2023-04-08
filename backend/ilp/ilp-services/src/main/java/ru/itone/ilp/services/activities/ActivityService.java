package ru.itone.ilp.services.activities;

import static org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers.ignoreCase;

import java.time.LocalDate;
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
import org.springframework.transaction.annotation.Transactional;
import ru.itone.ilp.common.ApiHelper;
import ru.itone.ilp.exception.ApiExceptions;
import ru.itone.ilp.openapi.model.ActivityRequest;
import ru.itone.ilp.openapi.model.ActivityResponse;
import ru.itone.ilp.openapi.model.ActivityUpdateRequest;
import ru.itone.ilp.openapi.model.PageRequest;
import ru.itone.ilp.openapi.model.PageRequestConfig;
import ru.itone.ilp.openapi.model.PaginatedActivityResponse;
import ru.itone.ilp.persistence.api.DbApi.DbApiException;
import ru.itone.ilp.persistence.entities.Activity;
import ru.itone.ilp.persistence.mappers.ActivityMapper;
import ru.itone.ilp.persistence.mappers.PageRequestMapper;
import ru.itone.ilp.persistence.repositories.ActivityRepository;

@Slf4j
@RequiredArgsConstructor
public class ActivityService {
    private final ActivityRepository activityRepository;

    private final ExampleMatcher nameMatcher = ExampleMatcher.matching()
            .withIgnorePaths("id", "description", "amount", "startDate", "endDate", "infoLink")
            .withMatcher("name", ignoreCase());

    @Transactional(readOnly = true)
    public PaginatedActivityResponse paginate(PageRequest request) {
        Pageable pageable = PageRequestMapper.INSTANCE.toPageable(request);
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
        Activity activity = ActivityMapper.INSTANCE.activityFromRequest(request)
                .setStartDate(LocalDate.now());
        if (activityRepository.exists(Example.of(activity, nameMatcher))) {
            String message = String.format("Активность '%s' уже существует", activity.getName());
            log.error("Невозможно создать запись: {}", message);
            throw new ApiExceptions.ConflictException(message);
        }
        activity = activityRepository.save(activity);
        return toResponse(activity);
    }

    @Transactional
    public ActivityResponse update(ActivityUpdateRequest request) {
        Activity activity = activityRepository.findById(request.getId().longValue())
                .orElseThrow(() -> new DbApiException("Запись не найдена"));
        activity = activityRepository.save(activity.setName(request.getName())
                    .setDescription(request.getDescription())
                    .setAmount(request.getAmount())
                    .setInfoLink(request.getInfoLink()));
        return toResponse(activity);
    }

    @Transactional
    public void delete(Long activityId) {
        activityRepository.deleteById(activityId);
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
}
