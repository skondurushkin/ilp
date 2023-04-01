package ru.itone.ilp.persistence.mappers;

import java.time.LocalDate;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Page;
import ru.itone.ilp.common.ApiHelper;
import ru.itone.ilp.openapi.model.ActivityRequest;
import ru.itone.ilp.openapi.model.ActivityResponse;
import ru.itone.ilp.openapi.model.PaginatedActivityResponse;
import ru.itone.ilp.persistence.entities.Activity;

@Mapper
public interface ActivityMapper {
    ActivityMapper INSTANCE = Mappers.getMapper(ActivityMapper.class);

    @Mapping(target = "startDate", expression = "java(this.nonVirtual(activity.getStartDate()))")
    @Mapping(target = "endDate", expression = "java(this.nonVirtual(activity.getEndDate()))")
    @Mapping(target = "active", expression = "java(this.isActive(activity))")
    ActivityResponse activityToResponse(Activity activity);

    Activity activityFromRequest(ActivityRequest request);

    default boolean isActive(Activity activity) {
        return activity.isActive(LocalDate.now());
    }
    default LocalDate nonVirtual(LocalDate date) {
        return ApiHelper.virtualDate.equals(date)
                ? null
                : date;
    }

    default PaginatedActivityResponse toPaginatedResponse(Page<Activity> page) {
        List<ActivityResponse> results = page.getContent().stream().map(this::activityToResponse).toList();
        return new PaginatedActivityResponse()
                .total(page.getTotalPages())
                .page(page.getNumber())
                .pageSize(page.getSize())
                .hasNext(page.hasNext())
                .hasPrev(page.hasPrevious())
                .results(results);
    }

}
