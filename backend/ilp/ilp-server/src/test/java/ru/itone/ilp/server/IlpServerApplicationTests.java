package ru.itone.ilp.server;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
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
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import ru.itone.ilp.openapi.model.Greeting;
import ru.itone.ilp.openapi.model.JwtResponse;
import ru.itone.ilp.openapi.model.LoginRequest;
import ru.itone.ilp.server.configuration.WebSecurityConfig;
import ru.itone.ilp.server.controllers.AuthController;
import ru.itone.ilp.server.controllers.GreetingsController;
import ru.itone.ilp.services.configuration.GreetingsConfiguration;
import ru.itone.ilp.services.configuration.PersistenceConfiguration;

@Slf4j
@SpringBootTest(webEnvironment = WebEnvironment.MOCK, properties = {
		"jwt.refreshDuration=PT10S"
})
@WebAppConfiguration
@AutoConfigureMockMvc
@EnableAutoConfiguration
@ComponentScan({"ru.itone.ilp.services.jwt","ru.itone.ilp.server.controllers"})
@ContextConfiguration(classes = {PersistenceConfiguration.class, GreetingsConfiguration.class})
@Import(WebSecurityConfig.class)
class IlpServerApplicationTests {

	@Autowired
	protected MockMvc mockMvc;

	@Autowired
	GreetingsController greetingsController;

	@Autowired
	AuthController authController;

	@Autowired
	ObjectMapper objectMapper;

	@Test
	void testGET_sayHello() throws Exception {
		String contentAsString = mockMvc.perform(get("/api/ilp/hello")).andExpect(status().isOk()).andReturn().getResponse()
				.getContentAsString();

		Greeting greeting = objectMapper.readValue(contentAsString, Greeting.class);
		assertEquals("Hello client!", greeting.getGreeting());
	}

	@Test
	void testLogin() throws Exception {
		LoginRequest cred = new LoginRequest().email("skondurushkin@it-one.ru").password("test");
		String contentAsString = mockMvc.perform(
				post("/api/ilp/auth/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(cred))
				).andExpect(status().isOk()).andReturn().getResponse()
				.getContentAsString();
		log.info("RESPONSE: {}", contentAsString);

		contentAsString = mockMvc.perform(
						post("/api/ilp/auth/login")
								.contentType(MediaType.APPLICATION_JSON)
								.content(objectMapper.writeValueAsString(cred))
				).andExpect(status().isOk()).andReturn().getResponse()
				.getContentAsString();
		log.info("RESPONSE2: {}", contentAsString);
		JwtResponse jwtResponse = objectMapper.readValue(contentAsString, JwtResponse.class);
		contentAsString = mockMvc.perform(
						post("/api/ilp/auth/logout")
								.header("Authorization", "Bearer " + jwtResponse.getToken() )
				).andExpect(status().isOk()).andReturn().getResponse()
				.getContentAsString();
		log.info("RESPONSE3: {}", contentAsString);

	}

}
