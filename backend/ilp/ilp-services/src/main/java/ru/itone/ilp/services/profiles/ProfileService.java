package ru.itone.ilp.services.profiles;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import ru.itone.ilp.openapi.model.PageRequest;
import ru.itone.ilp.openapi.model.PaginatedProfileResponse;
import ru.itone.ilp.openapi.model.ProfileResponse;
import ru.itone.ilp.persistence.entities.User;
import ru.itone.ilp.persistence.mappers.PageRequestMapper;
import ru.itone.ilp.persistence.mappers.ProfileMapper;
import ru.itone.ilp.persistence.repositories.UserRepository;

@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;

    public PaginatedProfileResponse paginate(PageRequest request) {
        Pageable pageable = PageRequestMapper.INSTANCE.toPageable(request);
        Page<User> page = userRepository.findAll(pageable);
        return toPaginatedResponse(page);
    }

    public Optional<ProfileResponse> getProfileById(Long userId) {
        return  userRepository.findById(userId)
                .map(ProfileService::toResponse);
    }

    public Optional<ProfileResponse> getProfileByEmail(String email) {
        return  userRepository.findByEmail(email)
                .map(ProfileService::toResponse);
    }

    @Transactional(readOnly = true)
    public List<ProfileResponse> searchProfile(String text) {
        return userRepository.searchByText(text).stream()
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
