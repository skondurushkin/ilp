package ru.itone.ilp.server.controllers;

import jakarta.validation.Valid;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Import;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
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
import ru.itone.ilp.common.ApiHelper;
import ru.itone.ilp.exception.ApiExceptions.TokenRefreshException;
import ru.itone.ilp.openapi.api.AuthApi;
import ru.itone.ilp.openapi.model.ERole;
import ru.itone.ilp.openapi.model.JwtResponse;
import ru.itone.ilp.openapi.model.LoginRequest;
import ru.itone.ilp.openapi.model.MessageResponse;
import ru.itone.ilp.openapi.model.SignupRequest;
import ru.itone.ilp.openapi.model.TokenRefreshRequest;
import ru.itone.ilp.openapi.model.TokenRefreshResponse;
import ru.itone.ilp.persistence.entities.RefreshToken;
import ru.itone.ilp.server.configuration.WebSecurityConfig;
import ru.itone.ilp.server.jwt.JwtHelper;
import ru.itone.ilp.services.jwt.RefreshTokenService;
import ru.itone.ilp.services.jwt.UserDetailsImpl;
import ru.itone.ilp.services.profiles.ProfileService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@Import({WebSecurityConfig.class})
public class AuthController implements AuthApi {
    private final AuthenticationManager authenticationManager;

    private final ProfileService profileService;

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
            Set<ERole> roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .map(ApiHelper::toERole)
                    .collect(Collectors.toSet());
            TokenRefreshResponse tokens = createTokens(null, userDetails.getEmail());
            profileService.onLogin(userDetails.getId());
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
    @Secured("hasRole('ADMIN')")
    public ResponseEntity<MessageResponse> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        profileService.registerUser(signUpRequest.password(encoder.encode(signUpRequest.getPassword())));
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
        profileService.onLogout(userId);
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
