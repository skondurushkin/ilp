package ru.itone.ilp.persistence.mappers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.apache.commons.lang3.StringUtils;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import ru.itone.ilp.openapi.model.PageRequest;
import ru.itone.ilp.openapi.model.PageRequestConfig;
import ru.itone.ilp.openapi.model.PageRequestConfigSortInner;

@Mapper
public interface PageRequestMapper {

    PageRequestMapper INSTANCE = Mappers.getMapper(PageRequestMapper.class);

    default Pageable toPageable(PageRequest pageRequest) {
        Sort sort = Sort.unsorted();
        List<PageRequestConfigSortInner> sortConfig = Optional
                .ofNullable(pageRequest.getConfig())
                .map(PageRequestConfig::getSort)
                .orElse(Collections.emptyList());

        if (!sortConfig.isEmpty()) {
            List<Order> orders = new ArrayList<>();
            for (PageRequestConfigSortInner col : sortConfig) {
                if (col.getSortType() != null && !StringUtils.isBlank(col.getColName())) {
                    Direction direction = Direction.valueOf(col.getSortType().getValue());
                    orders.add(new Order(direction, col.getColName()));
                }
            }
            if (!orders.isEmpty()) {
                sort = Sort.by(orders);
            }
        }

        return org.springframework.data.domain.PageRequest.of(pageRequest.getPage(), pageRequest.getPageSize(), sort);
    }
}
