package ru.itone.ilp.server.tests;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import ru.itone.ilp.openapi.model.ActivityRequest;
import ru.itone.ilp.openapi.model.JwtResponse;

@Slf4j
class ActivityControllerTest extends AbstractServerTest {

    @Test
    void test_createActivity_with_duplicated_name_is_conflict() throws Exception {
        JwtResponse jwt = login("skondurushkin@it-one.ru", "test");
        ActivityRequest activity = new ActivityRequest()
                .name("Добро пожаловать!")
                .amount(20)
                .description("Description")
                .infoLink("https://yandex.ru");
        String response = mockMvc.perform(post("/api/ilp/activity")
                        .header("Authorization", "Bearer " + jwt.getToken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(activity))
                )
                .andExpect(status().isConflict()).andReturn().getResponse().getContentAsString();

        log.info("RESPONSE: {}", response);

    }
}
