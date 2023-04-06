package ru.itone.ilp.server.tests;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

@Slf4j
class SettingsControllerTest extends AbstractServerTest {

    @Test
    void test_getSettingUnauthorized() throws Exception {
        String contentAsString = mockMvc.perform(get("/api/ilp/setting?name=db.version")

        ).andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
        log.info("RESULT: {}", contentAsString);
    }

    @Test
    void test_getSettingUnauthorized_bad_request() throws Exception {
        String contentAsString = mockMvc.perform(get("/api/ilp/setting?no_name")

        ).andExpect(status().isBadRequest()).andReturn().getResponse().getContentAsString();
        log.info("RESULT: {}", contentAsString);
    }

    @Test
    void test_getSettingUnauthorized_not_found() throws Exception {
        String contentAsString = mockMvc.perform(get("/api/ilp/setting?name=no_name")

        ).andExpect(status().isNotFound()).andReturn().getResponse().getContentAsString();
        log.info("RESULT: {}", contentAsString);
    }

    @Test
    void test_deleteSettingUnauthorized_fails_with_401() throws Exception {
        String contentAsString = mockMvc.perform(delete("/api/ilp/setting?name=db.version")

        ).andExpect(status().isUnauthorized()).andReturn().getResponse().getContentAsString();
        log.info("RESULT: {}", contentAsString);
    }


}
