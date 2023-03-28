package ru.itone.ilp.server.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpServerErrorException;
import ru.itone.ilp.openapi.api.ActivityApi;
import ru.itone.ilp.exception.ApiExceptions;
import ru.itone.ilp.openapi.model.ActivityRequest;
import ru.itone.ilp.openapi.model.ActivityResponse;
import ru.itone.ilp.openapi.model.PageRequest;
import ru.itone.ilp.openapi.model.PaginatedActivityResponse;
import ru.itone.ilp.server.configuration.WebSecurityConfig;
import ru.itone.ilp.services.activities.ActivityService;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Import({WebSecurityConfig.class})
public class ActivityController implements ActivityApi {

    private final ActivityService activityService;
    @Override
    public ResponseEntity<PaginatedActivityResponse> browseActivities(PageRequest pageRequest) {
        return ResponseEntity.ok(activityService.paginate(pageRequest));
    }

    @Override
    @Secured("hasRole('ADMIN')")
    public ResponseEntity<ActivityResponse> createActivity(ActivityRequest activityRequest) {
        return Optional.ofNullable(activityService.createActivity(activityRequest))
                .map( a -> new ResponseEntity<>(a, HttpStatus.CREATED))
                .orElseThrow(() -> new HttpServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR));
    }

    @Override
    public ResponseEntity<ActivityResponse> getActivityById(Integer activityId) {
        return activityService.getActivityById(activityId)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ApiExceptions.ResourceNotFoundException("Activity record not found."));
    }
}
