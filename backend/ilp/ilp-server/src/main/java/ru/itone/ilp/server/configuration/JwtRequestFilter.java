package ru.itone.ilp.server.configuration;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jose4j.jwt.consumer.InvalidJwtException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import ru.itone.ilp.server.jwt.JwtHelper;
import ru.itone.ilp.server.jwt.JwtInstance;


@Slf4j
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {

    private static final String TOKEN_PREFIX = "Bearer ";
    private final JwtHelper jwtHelper;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        tryAuthorize(request);

        filterChain.doFilter(request, response);

    }

    private void tryAuthorize(HttpServletRequest request) {
        String tokenHeader = request.getHeader("Authorization");
        if (!StringUtils.startsWithIgnoreCase(tokenHeader, TOKEN_PREFIX))
            return;
        String token = tokenHeader.substring(TOKEN_PREFIX.length());
        try {
            JwtInstance jwt = jwtHelper.parse(token);
            String subject = jwt.getSubject();
            UserDetails userDetails = userDetailsService.loadUserByUsername(subject);
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null,
                    userDetails.getAuthorities());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (InvalidJwtException e) {
            String message = e.getMessage();
            if (CollectionUtils.isEmpty(e.getErrorDetails())) {
                message = e.getErrorDetails().get(0).getErrorMessage();
            }
            log.error("Cannot parse JWT: {}", message);
        } catch (Exception e) {
            log.error("Cannot set user authentication: {}", e.getMessage());
        }
    }
}
