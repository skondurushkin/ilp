package ru.itone.ilp.persistence.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import org.springframework.util.CollectionUtils;
import ru.itone.ilp.openapi.model.ERole;
import ru.itone.ilp.openapi.model.ProfileResponse;
import ru.itone.ilp.persistence.entities.Role;
import ru.itone.ilp.persistence.entities.User;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper
public interface ProfileMapper {
    ProfileMapper INSTANCE = Mappers.getMapper(ProfileMapper.class);

    @Mapping(target = "fio", expression= "java(user.toName())")
    @Mapping(target = "roles", qualifiedByName = "responseRoles")
    @Mapping(target = "endDate", conditionExpression = "java(!user.isActive())")
    ProfileResponse userToProfileResponse(User user);

    @Named("responseRoles")
    default Set<ERole> mapRoles(Set<Role> roles) {
        if (CollectionUtils.isEmpty(roles))
            return Collections.emptySet();

        return roles.stream().map(Role::getName).collect(Collectors.toSet());
    }
}
