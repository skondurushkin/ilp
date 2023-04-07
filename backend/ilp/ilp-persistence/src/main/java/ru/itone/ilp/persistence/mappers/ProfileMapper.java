package ru.itone.ilp.persistence.mappers;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Page;
import org.springframework.util.CollectionUtils;
import ru.itone.ilp.openapi.model.ERole;
import ru.itone.ilp.openapi.model.PaginatedProfileResponse;
import ru.itone.ilp.openapi.model.ProfileResponse;
import ru.itone.ilp.openapi.model.ProfileResponseForAdmin;
import ru.itone.ilp.persistence.entities.Role;
import ru.itone.ilp.persistence.entities.User;

@Mapper
public interface ProfileMapper {
    ProfileMapper INSTANCE = Mappers.getMapper(ProfileMapper.class);

    @Mapping(target = "fio", expression= "java(user.toName())")
    @Mapping(target = "roles", qualifiedByName = "responseRoles")
    @Mapping(target = "endDate", conditionExpression = "java(!user.isActive())")
    ProfileResponse userToProfileResponse(User user);

    default ProfileResponseForAdmin userToProfileResponseForAdmin(User user) {
        if ( user == null ) {
            return null;
        }

        ProfileResponseForAdmin profileResponse = new ProfileResponseForAdmin();

        profileResponse.setRoles( mapRoles( user.getRoles() ) );
        if ( !user.isActive() ) {
            profileResponse.setEndDate( user.getEndDate() );
        }
        if ( user.getId() != null ) {
            profileResponse.setId( user.getId().intValue() );
        }
        profileResponse.setEmail( user.getEmail() );
        profileResponse.setAvatarLink( user.getAvatarLink() );
        profileResponse.setActive( user.isActive() );
        profileResponse.setStartDate( user.getStartDate() );
        profileResponse.setFio( user.toName() );
        profileResponse.jobPosition("Sr. Java Developer")
                .country("Россия")
                .city("Москва")
                .phone("+7(905)123-45-67");

        return profileResponse;

    }

    @Named("responseRoles")
    default Set<ERole> mapRoles(Set<Role> roles) {
        if (CollectionUtils.isEmpty(roles))
            return Collections.emptySet();

        return roles.stream().map(Role::getName).collect(Collectors.toSet());
    }

    default PaginatedProfileResponse toPaginatedResponse(Page<User> page) {
        List<ProfileResponse> results = page.getContent().stream().map(this::userToProfileResponse).toList();
        return new PaginatedProfileResponse()
                .total(page.getTotalPages())
                .page(page.getNumber())
                .pageSize(page.getSize())
                .hasNext(page.hasNext())
                .hasPrev(page.hasPrevious())
                .results(results);
    }
}
