package ru.itone.ilp.persistence.mappers;

import java.time.LocalDate;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import ru.itone.ilp.openapi.model.OperationResponse;
import ru.itone.ilp.openapi.model.OperationResponse.TypeEnum;
import ru.itone.ilp.persistence.entities.Operation;

@Mapper
public interface OperationMapper {
    OperationMapper INSTANCE = Mappers.getMapper(OperationMapper.class);

    default OperationResponse toResponse(Operation source) {
        if (source == null)
            return null;

        OperationResponse ret = new OperationResponse()
                .id(source.getId().intValue())
                .type(source.getType().getType())
                .name(source.getName())
                .amount(source.getAmount());
        LocalDate opDate = switch(ret.getType()) {
            case ACCRUAL -> source.getAccrual().getDate();
            case WRITEOFF -> source.getWriteOff().getDate();
        };

        if (ret.getType() == TypeEnum.ACCRUAL) {
            ret.active(source.getAccrual().isActive());
        }

        return ret.date(opDate);
    }
}
