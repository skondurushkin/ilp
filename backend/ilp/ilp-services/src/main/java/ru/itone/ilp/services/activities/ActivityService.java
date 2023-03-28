package ru.itone.ilp.services.activities;

import lombok.RequiredArgsConstructor;
import ru.itone.ilp.openapi.model.ActivityRequest;
import ru.itone.ilp.openapi.model.ActivityResponse;
import ru.itone.ilp.persistence.entities.Activity;
import ru.itone.ilp.persistence.mappers.ActivityMapper;
import ru.itone.ilp.persistence.repositories.ActivityRepository;

import java.util.Optional;

@RequiredArgsConstructor
public class ActivityService {
    private final ActivityRepository activityRepository;

    public Optional<ActivityResponse> getActivityById(Integer id) {
        return activityRepository.findById(id.longValue())
                .map(ActivityService::toResponse);
    }

    public ActivityResponse createActivity(ActivityRequest request) {
        Activity activity = ActivityMapper.INSTANCE.activityFromRequest(request);
        activity = activityRepository.save(activity);
        return toResponse(activity);
    }


    public static ActivityResponse toResponse(Activity activity) {
        return ActivityMapper.INSTANCE.activityToResponse(activity);
    }

}
