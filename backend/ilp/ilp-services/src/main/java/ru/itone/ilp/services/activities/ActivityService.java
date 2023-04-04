package ru.itone.ilp.services.activities;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import ru.itone.ilp.openapi.model.ActivityRequest;
import ru.itone.ilp.openapi.model.ActivityResponse;
import ru.itone.ilp.openapi.model.ActivityUpdateRequest;
import ru.itone.ilp.openapi.model.PageRequest;
import ru.itone.ilp.openapi.model.PaginatedActivityResponse;
import ru.itone.ilp.persistence.api.DbApi.DbApiException;
import ru.itone.ilp.persistence.entities.Activity;
import ru.itone.ilp.persistence.mappers.ActivityMapper;
import ru.itone.ilp.persistence.mappers.PageRequestMapper;
import ru.itone.ilp.persistence.repositories.ActivityRepository;

@RequiredArgsConstructor
public class ActivityService {
    private final ActivityRepository activityRepository;

    @Transactional(readOnly = true)
    public PaginatedActivityResponse paginate(PageRequest request) {
        Pageable pageable = PageRequestMapper.INSTANCE.toPageable(request);
        Page<Activity> page = activityRepository.findAll(pageable);
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
    public List<ActivityResponse> searchActivity(String text) {
        return activityRepository.searchByText(text).stream().map(ActivityService::toResponse).toList();
    }


    public static ActivityResponse toResponse(Activity activity) {
        return ActivityMapper.INSTANCE.activityToResponse(activity);
    }

    public static PaginatedActivityResponse toPaginatedResponse(Page<Activity> page) {
        return ActivityMapper.INSTANCE.toPaginatedResponse(page);
    }
}
