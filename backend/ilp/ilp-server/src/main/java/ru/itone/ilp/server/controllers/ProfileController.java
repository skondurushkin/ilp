package ru.itone.ilp.server.controllers;

import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Import;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;
import ru.itone.ilp.openapi.api.ProfileApi;
import ru.itone.ilp.openapi.model.ProfileResponse;
import ru.itone.ilp.persistence.entities.Role;
import ru.itone.ilp.persistence.entities.User;
import ru.itone.ilp.persistence.repositories.UserRepository;
import ru.itone.ilp.server.configuration.WebSecurityConfig;
import ru.itone.ilp.openapi.exception.ApiExceptions.ResourceNotFoundException;
import ru.itone.ilp.services.jwt.UserDetailsImpl;

@RestController
@RequiredArgsConstructor
@Import({WebSecurityConfig.class})
public class ProfileController implements ProfileApi {

    private final UserRepository userRepository;

    @Override
    public ResponseEntity<ProfileResponse> getProfile() {
        SecurityContext context = SecurityContextHolder.getContext();
        UserDetailsImpl principal = (UserDetailsImpl) context.getAuthentication().getPrincipal();
        Optional<User> user = userRepository.findByEmail(principal.getEmail());
        if (user.isPresent()) {
            User me = user.get();
            return ResponseEntity.ok(
                    new ProfileResponse()
                            .fio(me.toName())
                            .email(me.getEmail())
                            .roles(me.getRoles().stream().map(Role::getName).collect(Collectors.toSet()))
                            .avatarUrl(me.getAvatarUrl())
            );
        }
        throw new ResourceNotFoundException("User profile not found.");
    }
}
