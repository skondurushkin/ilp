package ru.itone.ilp.server.configuration;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.fasterxml.jackson.module.paramnames.ParameterNamesModule;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import ru.itone.ilp.persistence.repositories.UserRepository;
import ru.itone.ilp.server.jwt.JwtHelper;
import ru.itone.ilp.server.jwt.advice.ApiControllerAdvice;
import ru.itone.ilp.server.jwt.security.AuthEntryPointJwt;
import ru.itone.ilp.services.configuration.ActivityConfiguration;
import ru.itone.ilp.services.configuration.PersistenceConfiguration;
import ru.itone.ilp.services.configuration.ProfileConfiguration;
import ru.itone.ilp.services.jwt.UserDetailsServiceImpl;

@Slf4j
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
@Import({AuthenticationConfiguration.class,
        ProfileConfiguration.class,
        ActivityConfiguration.class,
        PersistenceConfiguration.class})
public class WebSecurityConfig {

    static final String LOGIN_URL = "/api/ilp/auth/login";

    protected static final String[] ENDPOINTS_WHITELIST = {
            LOGIN_URL
    };
    @Value("${jwt.secret}")
    String secret;

    private final UserRepository userRepository;

    @Bean
    public ApiControllerAdvice controllerAdvice() {
        return new ApiControllerAdvice();
    }

    @Bean
    @Primary
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper()
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                .configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT,true)
                .registerModule(new ParameterNamesModule())
                .registerModule(new Jdk8Module());

        JavaTimeModule javaTimeModule = new JavaTimeModule();
        javaTimeModule.addSerializer(LocalDate.class, new LocalDateSerializer(DateTimeFormatter.ISO_LOCAL_DATE));
        javaTimeModule.addDeserializer(LocalDate.class, new LocalDateDeserializer(DateTimeFormatter.ISO_LOCAL_DATE));

        objectMapper.registerModule(javaTimeModule);
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        return objectMapper;
    }

    @Bean
    public JwtHelper jwtHelper() {
        return new JwtHelper(secret);
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserDetailsServiceImpl(userRepository);
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthEntryPointJwt unauthorizedHandler() {
        return new AuthEntryPointJwt(objectMapper());
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors().and().csrf().disable()
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler())

                .and()
                // deactivate session creation
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()

                .authorizeHttpRequests(request -> request
                        .requestMatchers(ENDPOINTS_WHITELIST).permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtRequestFilter(), UsernamePasswordAuthenticationFilter.class)
                .authenticationProvider(authenticationProvider());

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public JwtRequestFilter jwtRequestFilter() {
        return new JwtRequestFilter(jwtHelper(), userDetailsService());
    }
}
