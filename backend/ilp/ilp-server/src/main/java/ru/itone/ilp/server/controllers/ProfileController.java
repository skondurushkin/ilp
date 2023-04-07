package ru.itone.ilp.server.controllers;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Import;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RestController;
import ru.itone.ilp.exception.ApiExceptions.ResourceNotFoundException;
import ru.itone.ilp.openapi.api.ProfileApi;
import ru.itone.ilp.openapi.model.PageRequest;
import ru.itone.ilp.openapi.model.PaginatedProfileResponse;
import ru.itone.ilp.openapi.model.ProfileResponse;
import ru.itone.ilp.server.configuration.WebSecurityConfig;
import ru.itone.ilp.services.jwt.UserDetailsImpl;
import ru.itone.ilp.services.profiles.ProfileService;

@RestController
@RequiredArgsConstructor
@Import({WebSecurityConfig.class})
public class ProfileController extends LinkResolver implements ProfileApi {

    private final ProfileService profileService;


    @Override
    public ResponseEntity<PaginatedProfileResponse> browseProfiles(PageRequest pageRequest) {
        return ResponseEntity.ok(resolveLinks(profileService.paginate(pageRequest)));
    }

    @Override
    public ResponseEntity<ProfileResponse> getProfile() {
        SecurityContext context = SecurityContextHolder.getContext();
        UserDetailsImpl principal = (UserDetailsImpl) context.getAuthentication().getPrincipal();
        Optional<ProfileResponse> user = profileService.getProfileByEmail(principal.getEmail());
        return user.map(this::resolveLink).map(ResponseEntity::ok)
                .orElseThrow( () -> new ResourceNotFoundException("User profile not found."));
    }

    @Override
    @Secured("hasRole('ADMIN')")
    public ResponseEntity<ProfileResponse> getProfileById(Integer userId) {
        Optional<ProfileResponse> user = profileService.getProfileById(userId.longValue());
        return user.map(this::resolveLink).map(ResponseEntity::ok)
                .orElseThrow( () -> new ResourceNotFoundException("User profile not found."));    }

    @Override
    public ResponseEntity<List<ProfileResponse>> searchProfile(String searchKey) {
        return ResponseEntity.ok(resolveLinks(profileService.searchProfile(searchKey)));
    }

    private ProfileResponse resolveLink(ProfileResponse profile) {
        profile.setAvatarLink(resolve(profile.getAvatarLink()));
        return profile;
    }

    private List<ProfileResponse> resolveLinks(List<ProfileResponse> profiles) {
        if (!CollectionUtils.isEmpty(profiles)) {
            profiles.forEach(this::resolveLink);
        }
        return profiles;
    }

    private PaginatedProfileResponse resolveLinks(PaginatedProfileResponse page) {
        resolveLinks(page.getResults());
        return page;
    }
}
