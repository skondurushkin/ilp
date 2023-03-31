package ru.itone.ilp.server.tests;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.junit.jupiter.Testcontainers;
import ru.itone.ilp.openapi.model.JwtResponse;
import ru.itone.ilp.openapi.model.LoginRequest;
import ru.itone.ilp.server.configuration.WebSecurityConfig;


@ActiveProfiles("test")
@SpringBootTest(webEnvironment = WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Testcontainers
@Import({WebSecurityConfig.class})
public abstract class AbstractServerTest {
    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;


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

}
