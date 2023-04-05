package ru.itone.ilp.server.tests;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import ru.itone.ilp.openapi.model.ArticleRequest;
import ru.itone.ilp.openapi.model.JwtResponse;

@Slf4j
class ArticleControllerTest extends AbstractServerTest {

    @Test
    void test_createArticle() throws Exception {
        JwtResponse jwt = login("skondurushkin@it-one.ru", "test");
        ArticleRequest request = new ArticleRequest().name("Test Article").description("Test Article description").price(30)
                .code("test-nothing-0001");
        String content = mockMvc.perform(post("/api/ilp/article")
                        .header("Authorization", "Bearer " + jwt.getToken())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isCreated()).andReturn().getResponse().getContentAsString();
        log.info("RESPONSE: {}", content);
    }
}
