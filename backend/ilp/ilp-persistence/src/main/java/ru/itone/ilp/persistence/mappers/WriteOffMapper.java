package ru.itone.ilp.persistence.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import ru.itone.ilp.openapi.model.UserInfo;
import ru.itone.ilp.openapi.model.WriteOffResponse;
import ru.itone.ilp.openapi.model.WriteOffStatus;
import ru.itone.ilp.persistence.entities.WriteOff;

@Mapper
public interface WriteOffMapper {

    WriteOffMapper INSTANCE = Mappers.getMapper(WriteOffMapper.class);

    default WriteOffResponse toResponse(WriteOff writeOff) {
        if (writeOff == null)
            return null;

        return new WriteOffResponse()
                .id(writeOff.getId().intValue())
                .article(ArticleMapper.INSTANCE.articleToResponse(writeOff.getArticle()))
                .date(writeOff.getDate())
                .user(new UserInfo()
                        .id(writeOff.getUser().getId().intValue())
                        .name(writeOff.getUser().toName())
                )
                .amount(writeOff.getAmount())
                .status(WriteOffStatus.fromValue(writeOff.getOrderStatus().name()));
    }

}
