package ru.itone.ilp.services.activities;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ru.itone.ilp.openapi.model.ActivityRequest;
import ru.itone.ilp.openapi.model.ActivityResponse;
import ru.itone.ilp.openapi.model.PageRequest;
import ru.itone.ilp.openapi.model.PaginatedActivityResponse;
import ru.itone.ilp.persistence.entities.Activity;
import ru.itone.ilp.persistence.mappers.ActivityMapper;
import ru.itone.ilp.persistence.mappers.PageRequestMapper;
import ru.itone.ilp.persistence.repositories.ActivityRepository;

@RequiredArgsConstructor
public class ActivityService {
    private final ActivityRepository activityRepository;

    public PaginatedActivityResponse paginate(PageRequest request) {
        Pageable pageable = PageRequestMapper.INSTANCE.toPageable(request);
        Page<Activity> page = activityRepository.findAll(pageable);
        return toPaginatedResponse(page);
    }

    public Optional<ActivityResponse> getActivityById(Integer id) {
        return activityRepository.findById(id.longValue())
                .map(ActivityService::toResponse);
    }

    public ActivityResponse createActivity(ActivityRequest request) {
        Activity activity = ActivityMapper.INSTANCE.activityFromRequest(request);
        activity = activityRepository.save(activity);
        return toResponse(activity);
    }

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
