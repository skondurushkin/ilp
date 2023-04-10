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
import ru.itone.ilp.openapi.model.ActivityStatisticResponse;
import ru.itone.ilp.openapi.model.PaginatedActivitiesStatisticResponse;
import ru.itone.ilp.openapi.model.PaginatedActivityResponse;
import ru.itone.ilp.persistence.entities.Activity;
import ru.itone.ilp.persistence.repositories.ActivityRepository.TopActivity;

@Mapper
public interface ActivityMapper {
    ActivityMapper INSTANCE = Mappers.getMapper(ActivityMapper.class);

    @Mapping(target = "startDate", expression = "java(this.nonVirtual(activity.getStartDate()))")
    @Mapping(target = "endDate", expression = "java(this.nonVirtual(activity.getEndDate()))")
    @Mapping(target = "active", expression = "java(this.isActive(activity))")
    @Mapping(target = "amount", source = "price")
    ActivityResponse activityToResponse(Activity activity);

    @Mapping(target = "price", source = "amount")
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

    default Activity topToActivity(TopActivity top) {
        return new Activity()
                .setId(top.getId())
                .setName(top.getName())
                .setDescription(top.getDescription())
                .setPrice(top.getPrice())
                .setStartDate(top.getStart_date())
                .setEndDate(top.getEnd_date())
                .setInfoLink(top.getInfo_link())
                .setExtension(top.getExtension());
    }

    default ActivityStatisticResponse activityToStatisticResponse(TopActivity top) {
        Activity activity = topToActivity(top);
        return new ActivityStatisticResponse()
                .active(activity.isActive(LocalDate.now()))
                .id(activity.getId().intValue())
                .price(activity.getPrice())
                .description(activity.getDescription())
                .name(activity.getName())
                .endDate(activity.getEndDate())
                .startDate(activity.getStartDate())
                .extension(activity.getExtension())
                .count(top.getCount())
                ;
    }

    default PaginatedActivitiesStatisticResponse toPaginatedStatisticResponse(Page<TopActivity> page) {
        List<ActivityStatisticResponse> results = page.getContent().stream().map(this::activityToStatisticResponse).toList();
        return new PaginatedActivitiesStatisticResponse()
                .total(page.getTotalPages())
                .page(page.getNumber())
                .pageSize(page.getSize())
                .hasNext(page.hasNext())
                .hasPrev(page.hasPrevious())
                .results(results);

    }
}
