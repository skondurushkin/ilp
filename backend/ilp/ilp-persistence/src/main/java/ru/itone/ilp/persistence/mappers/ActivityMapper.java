package ru.itone.ilp.persistence.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import ru.itone.ilp.openapi.common.ApiHelper;
import ru.itone.ilp.openapi.model.ActivityRequest;
import ru.itone.ilp.openapi.model.ActivityResponse;
import ru.itone.ilp.persistence.entities.Activity;

import java.time.LocalDate;

@Mapper
public interface ActivityMapper {
    ActivityMapper INSTANCE = Mappers.getMapper(ActivityMapper.class);

    @Mapping(target = "startDate", expression = "java(this.nonVirtual(activity.getStartDate()))")
    @Mapping(target = "endDate", expression = "java(this.nonVirtual(activity.getEndDate()))")
    ActivityResponse activityToResponse(Activity activity);

    @Mapping(target = "startDate", source = "startDate", conditionExpression = "java(request.getStartDate() != null)")
    Activity activityFromRequest(ActivityRequest request);

    default LocalDate nonVirtual(LocalDate date) {
        return ApiHelper.virtualDate.equals(date)
                ? null
                : date;
    }
}
