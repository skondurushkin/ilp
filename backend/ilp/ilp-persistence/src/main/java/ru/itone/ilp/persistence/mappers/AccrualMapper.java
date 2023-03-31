package ru.itone.ilp.persistence.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import ru.itone.ilp.openapi.model.AccrualResponse;
import ru.itone.ilp.persistence.entities.Accrual;

@Mapper
public interface AccrualMapper {
    AccrualMapper INSTANCE = Mappers.getMapper(AccrualMapper.class);

    @Mapping(target = "activityId", expression = "java(source.getActivity().getId().intValue())")
    @Mapping(target = "activityName", expression = "java(source.getActivity().getName())")
    @Mapping(target = "infoLink", expression = "java(source.getActivity().getInfoLink())")
    AccrualResponse toResponse(Accrual source);
}
