package ru.itone.ilp.server;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Arrays;
import java.util.Collections;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.testcontainers.junit.jupiter.Testcontainers;
import ru.itone.ilp.openapi.model.ERole;
import ru.itone.ilp.openapi.model.Greeting;
import ru.itone.ilp.openapi.model.JwtResponse;
import ru.itone.ilp.openapi.model.LoginRequest;
import ru.itone.ilp.openapi.model.Name;
import ru.itone.ilp.openapi.model.SignupRequest;
import ru.itone.ilp.persistence.repositories.RefreshTokenRepository;
import ru.itone.ilp.server.configuration.WebSecurityConfig;
import ru.itone.ilp.server.controllers.AuthController;
import ru.itone.ilp.server.controllers.GreetingsController;
import ru.itone.ilp.services.configuration.GreetingsConfiguration;
import ru.itone.ilp.services.configuration.PersistenceConfiguration;

@Slf4j
@ActiveProfiles("test")
@SpringBootTest(webEnvironment = WebEnvironment.MOCK, properties = {
		"jwt.tokenDuration=PT5S",
		"jwt.refreshDuration=PT1S"
})
@WebAppConfiguration
@AutoConfigureMockMvc
@EnableAutoConfiguration
@ComponentScan({"ru.itone.ilp.services.jwt","ru.itone.ilp.server.controllers"})
@ContextConfiguration(classes = {PersistenceConfiguration.class, GreetingsConfiguration.class})
@Import(WebSecurityConfig.class)
@Testcontainers
class IlpServerApplicationTests {

	@Autowired
	protected MockMvc mockMvc;

	@Autowired
	GreetingsController greetingsController;

	@Autowired
	AuthController authController;

	@Autowired
	ObjectMapper objectMapper;

	@Autowired
	RefreshTokenRepository refreshTokenRepository;

	@Test
	void testGET_sayHello() throws Exception {
		String contentAsString = mockMvc.perform(get("/api/ilp/hello")).andExpect(status().isOk()).andReturn().getResponse()
				.getContentAsString();

		Greeting greeting = objectMapper.readValue(contentAsString, Greeting.class);
		assertEquals("Hello client!", greeting.getGreeting());
	}

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
				.roles(Collections.emptyList());
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
