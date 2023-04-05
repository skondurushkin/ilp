package ru.itone.ilp.server.tests;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import ru.itone.ilp.openapi.model.JwtResponse;

@Slf4j
class SearchTest extends AbstractServerTest {

    @Test
    void test_searchArticle() throws Exception {
        JwtResponse jwt = login("test@it-one.ru", "test");
        String content = mockMvc.perform(get("/api/ilp/article/search?search_key=12")
                        .header("Authorization", "Bearer " + jwt.getToken()))
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
        log.info("RESPONSE: {}", content);

    }

}
