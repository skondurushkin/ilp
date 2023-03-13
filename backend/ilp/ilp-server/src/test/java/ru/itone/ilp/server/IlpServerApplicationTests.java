package ru.itone.ilp.server;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import ru.itone.ilp.openapi.model.Greeting;
import ru.itone.ilp.server.controllers.GreetingsController;
import ru.itone.ilp.services.configuration.GreetingsConfiguration;
import ru.itone.ilp.services.configuration.PersistenceConfiguration;

@SpringBootTest(webEnvironment = WebEnvironment.MOCK)
@WebAppConfiguration
@AutoConfigureMockMvc
@EnableAutoConfiguration
@ComponentScan({"ru.itone.ilp.server.controllers"})
@ContextConfiguration(classes = {PersistenceConfiguration.class, GreetingsConfiguration.class})
class IlpServerApplicationTests {

	@Autowired
	protected MockMvc mockMvc;

	@Autowired
	GreetingsController greetingsController;

	@Autowired
	ObjectMapper objectMapper;

	@Test
	void testGET_sayHello() throws Exception {
		String contentAsString = mockMvc.perform(get("/api/ilp/hello")).andExpect(status().isOk()).andReturn().getResponse()
				.getContentAsString();

		Greeting greeting = objectMapper.readValue(contentAsString, Greeting.class);
		assertEquals("Hello client!", greeting.getGreeting());
	}
}
