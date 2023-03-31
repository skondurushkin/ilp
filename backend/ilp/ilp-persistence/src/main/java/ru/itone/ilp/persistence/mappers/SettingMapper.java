package ru.itone.ilp.persistence.mappers;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import ru.itone.ilp.openapi.model.SettingResponse;
import ru.itone.ilp.persistence.entities.Setting;

@Mapper
public interface SettingMapper {
    SettingMapper INSTANCE = Mappers.getMapper(SettingMapper.class);

    @Mapping(target = "name", source = "key")
    SettingResponse toResponse(Setting source);

}
