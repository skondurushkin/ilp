package ru.itone.ilp.services.profiles;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import ru.itone.ilp.common.ApiHelper;
import ru.itone.ilp.openapi.model.PageRequest;
import ru.itone.ilp.openapi.model.PageRequestConfig;
import ru.itone.ilp.openapi.model.PaginatedProfileResponse;
import ru.itone.ilp.openapi.model.ProfileResponse;
import ru.itone.ilp.persistence.entities.User;
import ru.itone.ilp.persistence.mappers.PageRequestMapper;
import ru.itone.ilp.persistence.mappers.ProfileMapper;
import ru.itone.ilp.persistence.repositories.UserRepository;

@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public PaginatedProfileResponse paginate(PageRequest request) {
        Pageable pageable = PageRequestMapper.INSTANCE.toPageable(request);
        String filter = Optional.ofNullable(request.getConfig()).map(PageRequestConfig::getGlobalFilter).orElse(StringUtils.EMPTY);
        Page<User> page = StringUtils.isBlank(filter)
                ? userRepository.findAll(pageable)
                : userRepository.searchByText(filter, pageable);
        return toPaginatedResponse(page);
    }

    @Transactional(readOnly = true)
    public Optional<ProfileResponse> getProfileById(Long userId) {
        return  userRepository.findById(userId)
                .map(ProfileService::toResponse);
    }

    @Transactional(readOnly = true)
    public Optional<ProfileResponse> getProfileByEmail(String email) {
        return  userRepository.findByEmail(email)
                .map(ProfileService::toResponse);
    }

    @Transactional(readOnly = true)
    public List<ProfileResponse> searchProfile(String searchKey) {
        searchKey = ApiHelper.trimSearchKey(searchKey, 2, 50);
        if (StringUtils.isEmpty(searchKey)) {
            return Collections.emptyList();
        }
        return userRepository.searchByText(searchKey, 50).stream()
            .map(ProfileService::toResponse)
            .toList();
    }

    public static ProfileResponse toResponse(User user) {
        return  ProfileMapper.INSTANCE.userToProfileResponse(user);
    }

    public static PaginatedProfileResponse toPaginatedResponse(Page<User> page) {
        return ProfileMapper.INSTANCE.toPaginatedResponse(page);
    }

}
