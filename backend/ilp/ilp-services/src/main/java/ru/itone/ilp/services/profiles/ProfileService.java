package ru.itone.ilp.services.profiles;

import lombok.RequiredArgsConstructor;
import ru.itone.ilp.openapi.model.ProfileResponse;
import ru.itone.ilp.persistence.entities.User;
import ru.itone.ilp.persistence.mappers.ProfileMapper;
import ru.itone.ilp.persistence.repositories.UserRepository;

import java.util.Optional;

@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;

    public Optional<ProfileResponse> getProfileById(Long userId) {
        return  userRepository.findById(userId)
                .map(ProfileService::toResponse);
    }

    public Optional<ProfileResponse> getProfileByEmail(String email) {
        return  userRepository.findByEmail(email)
                .map(ProfileService::toResponse);
    }



    public static ProfileResponse toResponse(User user) {
        return  ProfileMapper.INSTANCE.userToProfileResponse(user);
    }
}
