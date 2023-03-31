package ru.itone.ilp.persistence.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface WriteOffMapper {

    WriteOffMapper INSTANCE = Mappers.getMapper(WriteOffMapper.class);

}
