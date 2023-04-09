package ru.itone.ilp.services.profiles;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import ru.itone.ilp.common.ApiHelper;
import ru.itone.ilp.exception.ApiExceptions.ConflictException;
import ru.itone.ilp.openapi.model.CreateNewAccrualRequest;
import ru.itone.ilp.openapi.model.ERole;
import ru.itone.ilp.openapi.model.PageRequest;
import ru.itone.ilp.openapi.model.PageRequestConfig;
import ru.itone.ilp.openapi.model.PaginatedProfileResponse;
import ru.itone.ilp.openapi.model.ProfileResponse;
import ru.itone.ilp.openapi.model.ProfileResponseForAdmin;
import ru.itone.ilp.openapi.model.SignupRequest;
import ru.itone.ilp.persistence.api.DbApi;
import ru.itone.ilp.persistence.entities.Role;
import ru.itone.ilp.persistence.entities.User;
import ru.itone.ilp.persistence.mappers.PageRequestMapper;
import ru.itone.ilp.persistence.mappers.ProfileMapper;
import ru.itone.ilp.persistence.repositories.EventLogRepository;
import ru.itone.ilp.persistence.repositories.RoleRepository;
import ru.itone.ilp.persistence.repositories.UserRepository;
import ru.itone.ilp.persistence.types.EventType;
import ru.itone.ilp.services.wallet.WalletService;

@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final EventLogRepository eventLogRepository;
    private final DbApi dbApi;
    private final WalletService walletService;

    @Transactional
    public void registerUser(SignupRequest signUpRequest) {

        if (Boolean.TRUE.equals(userRepository.existsByEmail(signUpRequest.getEmail()))) {
            throw new ConflictException("Error: Email is already in use!");
        }

        // Create new user's account
        User user = new User(signUpRequest.getName(), signUpRequest.getEmail(), signUpRequest.getPassword());

        Set<ERole> strRoles = signUpRequest.getRoles();

        if (CollectionUtils.isEmpty(strRoles) || !strRoles.contains(ERole.USER)) {
            strRoles.add(ERole.USER);
        }

        Set<Role> roles = new HashSet<>();
        strRoles.forEach(roleName -> {
            Role role = roleRepository.findByName(roleName)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(role);
        });

        user.setRoles(roles);
        userRepository.save(user);
    }

    @Transactional
    public void onLogin(Long userId) {
        if (eventLogRepository.firstLogin(userId)) {
            dbApi.logEvent(userId, EventType.LOGIN, "Первый вход в программу лояльности");
            walletService.createNewAccrual(userId, new CreateNewAccrualRequest().activityId(1));
        } else {
            dbApi.logEvent(userId, EventType.LOGIN, "Выполнен вход");
        }
    }

    @Transactional
    public void onLogout(Long userId) {
        dbApi.logEvent(userId, EventType.LOGOUT, "Выполнен выход из аккаунта");
    }


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
    public Optional<ProfileResponseForAdmin> getProfileByIdForAdmin(Long userId) {
        return  userRepository.findById(userId)
                .map( u -> toResponseForAdmin(u, dbApi.getBalance(userId).path("balance").asInt()));
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

    public static ProfileResponseForAdmin toResponseForAdmin(User user, Integer balance) {
        return  ProfileMapper.INSTANCE.userToProfileResponseForAdmin(user).balance(balance);
    }


    public static PaginatedProfileResponse toPaginatedResponse(Page<User> page) {
        return ProfileMapper.INSTANCE.toPaginatedResponse(page);
    }

}
