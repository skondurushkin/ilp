package ru.itone.ilp.server;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import ru.itone.ilp.openapi.api.IlpApi;
import ru.itone.ilp.openapi.model.Greeting;

@SpringBootTest(webEnvironment = WebEnvironment.MOCK)
@WebAppConfiguration
@AutoConfigureMockMvc
class IlpServerApplicationTests {

	@Autowired
	protected MockMvc mockMvc;

	@Autowired
	IlpApi controller;

	@Autowired
	ObjectMapper objectMapper;

	@Test
	void contextLoads() {
		assertNotNull(controller);
	}

	@Test
	void testGET_sayHello() throws Exception {
		String contentAsString = mockMvc.perform(get("/api/ilp/hello")).andExpect(status().isOk()).andReturn().getResponse()
				.getContentAsString();

		Greeting greeting = objectMapper.readValue(contentAsString, Greeting.class);
		assertEquals("Hello client!", greeting.getGreeting());
	}
}
