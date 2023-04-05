package ru.itone.ilp.server.tests;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import ru.itone.ilp.openapi.model.JwtResponse;
import ru.itone.ilp.openapi.model.WriteOffRequest;

@Slf4j
class WalletControllerTest extends AbstractServerTest {

    @Test
    void test_walletOverview() throws Exception {
        JwtResponse jwt = login("test@it-one.ru", "test");
        String walletInfo = mockMvc.perform(get("/api/ilp/wallet/overview").header("Authorization", "Bearer " + jwt.getToken()))
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

        log.info("RESPONSE: {}", walletInfo);
    }

    @Test
    void test_walletWriteOff() throws Exception {

        JwtResponse jwt = login("test@it-one.ru", "test");
        String walletInfo = mockMvc.perform(post("/api/ilp/wallet/write-off")
                        .header("Authorization", "Bearer " + jwt.getToken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(
                                new WriteOffRequest()
                                        .articleId(1)
                        ))
                )
                .andExpect(status().isCreated()).andReturn().getResponse().getContentAsString();

        log.info("RESPONSE: {}", walletInfo);
    }

    @Test
    void test_walletAccruals() throws Exception {

        JwtResponse jwt = login("skondurushkin@it-one.ru", "test");
        String walletInfo = mockMvc.perform(post("/api/ilp/wallet/accruals/4")
                        .header("Authorization", "Bearer " + jwt.getToken())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(
                                new WriteOffRequest()
                                        .articleId(1)
                        ))
                )
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

        log.info("RESPONSE: {}", walletInfo);
    }
}
