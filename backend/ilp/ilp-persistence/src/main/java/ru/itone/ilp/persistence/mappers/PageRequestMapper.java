package ru.itone.ilp.persistence.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Pageable;
import ru.itone.ilp.openapi.model.PageRequest;

@Mapper
public interface PageRequestMapper {

    PageRequestMapper INSTANCE = Mappers.getMapper(PageRequestMapper.class);

    default Pageable toPageable(PageRequest pageRequest) {
        return org.springframework.data.domain.PageRequest.of(pageRequest.getPage(), pageRequest.getPageSize());
    }
}
