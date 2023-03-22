package ru.itone.ilp.server.controllers;

import jakarta.validation.Valid;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Import;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.itone.ilp.openapi.api.AuthApi;
import ru.itone.ilp.openapi.common.ApiHelper;
import ru.itone.ilp.openapi.exception.TokenRefreshException;
import ru.itone.ilp.openapi.model.ERole;
import ru.itone.ilp.openapi.model.JwtResponse;
import ru.itone.ilp.openapi.model.LoginRequest;
import ru.itone.ilp.openapi.model.MessageResponse;
import ru.itone.ilp.openapi.model.SignupRequest;
import ru.itone.ilp.openapi.model.TokenRefreshRequest;
import ru.itone.ilp.openapi.model.TokenRefreshResponse;
import ru.itone.ilp.persistence.entities.RefreshToken;
import ru.itone.ilp.persistence.entities.Role;
import ru.itone.ilp.persistence.entities.User;
import ru.itone.ilp.persistence.repositories.RoleRepository;
import ru.itone.ilp.persistence.repositories.UserRepository;
import ru.itone.ilp.server.configuration.WebSecurityConfig;
import ru.itone.ilp.server.jwt.JwtHelper;
import ru.itone.ilp.services.jwt.RefreshTokenService;
import ru.itone.ilp.services.jwt.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@Import({WebSecurityConfig.class})
public class AuthController implements AuthApi {
    private final AuthenticationManager authenticationManager;

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder encoder;

    private final JwtHelper jwtHelper;

    private final RefreshTokenService refreshTokenService;

    @Override
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        try {
            List<ERole> roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .map(ApiHelper::toERole)
                    .toList();
            TokenRefreshResponse tokens = createTokens(null, userDetails.getEmail());

            return ResponseEntity.ok(
                    new JwtResponse().token(tokens.getAcceptToken())
                            .refreshToken(tokens.getRefreshToken())
                            .email(userDetails.getEmail())
                            .roles(roles));
        } catch (Exception ex) {
            throw new AuthenticationServiceException("Invalid login or password", ex);
        }
    }

    @Override
    public ResponseEntity<MessageResponse> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {

        if (Boolean.TRUE.equals(userRepository.existsByEmail(signUpRequest.getEmail()))) {
            return ResponseEntity.badRequest().body(new MessageResponse().message("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getName(), signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        List<ERole> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                    Role adminRole = roleRepository.findByName(ERole.ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(adminRole);
                });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse().message("User registered successfully!"));
    }


    @Override
    public ResponseEntity<TokenRefreshResponse> refreshToken(@Valid @RequestBody TokenRefreshRequest request) {
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(token -> ResponseEntity.ok(createTokens(token, token.getUser().getEmail())))
                .orElseThrow(() -> new TokenRefreshException(requestRefreshToken, "Refresh token is not in database!"));
    }

    @Override
    public ResponseEntity<MessageResponse> logoutUser() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId = userDetails.getId();
        refreshTokenService.deleteByUserId(userId);
        return ResponseEntity.ok(new MessageResponse().message("Successfully logged out."));
    }

    private TokenRefreshResponse createTokens(RefreshToken refreshToken, String subject) {
        RefreshToken currentToken = refreshToken;
        if (currentToken != null) {
            refreshTokenService.verifyExpiration(currentToken);
        }
        try {
            Instant expiration = Instant.now().plus(refreshTokenService.getTokenDuration().toSeconds(), ChronoUnit.SECONDS);
            String token = jwtHelper.builder()
                    .subject(subject)
                    .duration(refreshTokenService.getTokenDuration()).build();

            currentToken = refreshTokenService.createRefreshToken(subject, expiration);

            return new TokenRefreshResponse()
                    .acceptToken(token)
                    .refreshToken(currentToken.getToken());
        } catch (Exception e) {
            throw new TokenRefreshException(Optional.ofNullable(currentToken)
                    .map(RefreshToken::getToken)
                    .orElse("<no_refresh_token>"),
                    "Cannot create new JWT");
        }
    }

}
