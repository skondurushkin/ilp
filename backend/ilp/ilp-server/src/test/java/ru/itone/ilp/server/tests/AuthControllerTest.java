package ru.itone.ilp.server.tests;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Collections;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import ru.itone.ilp.openapi.model.ERole;
import ru.itone.ilp.openapi.model.JwtResponse;
import ru.itone.ilp.openapi.model.LoginRequest;
import ru.itone.ilp.openapi.model.Name;
import ru.itone.ilp.openapi.model.SignupRequest;
import ru.itone.ilp.persistence.repositories.RefreshTokenRepository;

@Slf4j
class AuthControllerTest extends AbstractServerTest {

    @Autowired
    RefreshTokenRepository refreshTokenRepository;

    @Test
    @Transactional
    void testLoginLogout() throws Exception {
        JwtResponse jwt = login("skondurushkin@it-one.ru", "test");
        assertTrue(refreshTokenRepository.findByToken(jwt.getRefreshToken()).isPresent());
        mockMvc.perform(
                post("/api/ilp/auth/logout")
                        .header("Authorization", "Bearer " + jwt.getToken() )
        ).andExpect(status().isOk());
        assertFalse(refreshTokenRepository.findByToken(jwt.getRefreshToken()).isPresent());
    }

    @Test
    void testRegister() throws Exception {
        JwtResponse jwtAdmin = login("skondurushkin@it-one.ru", "test");
        SignupRequest signup = new SignupRequest()
                .name(new Name()
                        .firstName("Иван")
                        .middleName("Иванович")
                        .lastName("Иванов")
                )
                .email("iivanov@mail.ru")
                .password("12345")
                .roles(Collections.emptySet());
        register(signup, jwtAdmin.getToken());
        JwtResponse jwtUser = login("iivanov@mail.ru", "12345");
        assertTrue(jwtUser.getRoles().contains(ERole.USER));
        assertFalse(jwtUser.getRoles().contains(ERole.ADMIN));
        logout(jwtUser.getToken());
    }

    JwtResponse login(String email, String password) throws Exception {
        LoginRequest cred = new LoginRequest().email(email).password(password);
        String contentAsString = mockMvc.perform(
                        post("/api/ilp/auth/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(cred))
                ).andExpect(status().isOk()).andReturn().getResponse()
                .getContentAsString();
        return objectMapper.readValue(contentAsString, JwtResponse.class);
    }

    void logout(String token) throws Exception {
        mockMvc.perform(
                post("/api/ilp/auth/logout")
                        .header("Authorization", "Bearer " + token )
        ).andExpect(status().isOk());

    }

    void register(SignupRequest request, String token) throws Exception {
        mockMvc.perform(
                post("/api/ilp/auth/register")
                        .header("Authorization", "Bearer " + token )
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
        ).andExpect(status().isOk());
    }



}
