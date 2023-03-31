package ru.itone.ilp.server.tests;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import ru.itone.ilp.openapi.model.JwtResponse;

@Slf4j
class WalletControllerTest extends AbstractServerTest {

    @Test
    void test_walletOverview() throws Exception {
        JwtResponse jwt = login("test@it-one.ru", "test");
        String walletInfo = mockMvc.perform(get("/api/ilp/wallet/overview").header("Authorization", "Bearer " + jwt.getToken()))
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

        log.info("RESPONSE: {}", walletInfo);


    }
}
